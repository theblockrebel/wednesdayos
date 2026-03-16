/**
 * WednesdayOS — Test Suite
 * Unit tests for core wednesday detection and agent logic
 */

import { isWednesday, daysUntilWednesday, wednesdayPowerFactor, wednesdayStatus } from '../src/utils/wednesday.js';
import { VibeController, VIBES } from '../src/core/vibe.js';
import { CommandParser } from '../src/terminal/commands.js';
import { MemoryStore } from '../src/core/memory.js';

// ── Wednesday Detection ──────────────────────────────────────────────────────

describe('Wednesday Detection', () => {
  test('correctly identifies Wednesday', () => {
    const wed = new Date('2024-01-03'); // a Wednesday
    expect(isWednesday(wed)).toBe(true);
  });

  test('correctly rejects non-Wednesday', () => {
    const mon = new Date('2024-01-01'); // a Monday
    expect(isWednesday(mon)).toBe(false);
  });

  test('days until wednesday is 0 on wednesday', () => {
    const wed = new Date('2024-01-03');
    expect(daysUntilWednesday(wed)).toBe(0);
  });

  test('days until wednesday from monday is 2', () => {
    const mon = new Date('2024-01-01');
    expect(daysUntilWednesday(mon)).toBe(2);
  });

  test('power factor is 1.0 on wednesday', () => {
    const wed = new Date('2024-01-03');
    expect(wednesdayPowerFactor(wed)).toBe(1.0);
  });

  test('power factor decreases with distance', () => {
    const mon = new Date('2024-01-01');
    const sun = new Date('2023-12-31');
    expect(wednesdayPowerFactor(mon)).toBeGreaterThan(wednesdayPowerFactor(sun));
  });
});

// ── Vibe Controller ──────────────────────────────────────────────────────────

describe('VibeController', () => {
  test('initializes with default vibe', () => {
    const vc = new VibeController('wholesome');
    expect(vc.current).toBe('wholesome');
  });

  test('throws on unknown vibe', () => {
    expect(() => new VibeController('cursed')).toThrow();
  });

  test('all vibes are defined', () => {
    ['wholesome', 'unhinged', 'zen', 'hype'].forEach(v => {
      expect(VIBES[v]).toBeDefined();
    });
  });

  test('unhinged has higher temperature than zen', () => {
    expect(VIBES.unhinged.temperature).toBeGreaterThan(VIBES.zen.temperature);
  });
});

// ── Command Parser ───────────────────────────────────────────────────────────

describe('CommandParser', () => {
  let parser;
  beforeEach(() => { parser = new CommandParser(); });

  test('parses /frog command', () => {
    const result = parser.parse('/frog');
    expect(result.type).toBe('command');
    expect(result.cmd).toBe('/frog');
  });

  test('returns null for non-commands', () => {
    expect(parser.parse('hello dudes')).toBeNull();
  });

  test('resolves aliases', () => {
    const result = parser.parse('/f');
    expect(result.cmd).toBe('/frog');
  });

  test('returns unknown for unrecognized commands', () => {
    const result = parser.parse('/notacommand');
    expect(result.type).toBe('unknown');
  });
});

// ── Memory Store ─────────────────────────────────────────────────────────────

describe('MemoryStore', () => {
  test('starts empty', async () => {
    const mem = new MemoryStore();
    await mem.load();
    expect(mem.size).toBe(0);
  });

  test('appends entries', async () => {
    const mem = new MemoryStore();
    await mem.load();
    await mem.append({ role: 'user', content: 'it is wednesday my dudes' });
    expect(mem.size).toBe(1);
  });

  test('getRecent returns correct count', async () => {
    const mem = new MemoryStore();
    await mem.load();
    for (let i = 0; i < 5; i++) {
      await mem.append({ role: 'user', content: `message ${i}` });
    }
    expect(mem.getRecent(3).length).toBe(3);
  });

  test('flush empties the store', async () => {
    const mem = new MemoryStore();
    await mem.load();
    await mem.append({ role: 'user', content: 'test' });
    await mem.flush();
    expect(mem.size).toBe(0);
  });
});
