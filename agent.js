/**
 * WednesdayOS — Agent Core Engine
 * Manages agent lifecycle, memory, and session orchestration
 */

import { EventEmitter } from 'events';
import { MemoryStore } from './memory.js';
import { SessionManager } from './session.js';
import { VibeController } from './vibe.js';

const AGENT_VERSION = '1.0.0';
const MAX_CONTEXT_TOKENS = 8192;
const DEFAULT_TEMPERATURE = 0.85;

export class AgentCore extends EventEmitter {
  constructor(config = {}) {
    super();
    this.config = {
      name: config.name || 'DUDES',
      model: config.model || 'claude-haiku-4-5',
      vibe: config.vibe || 'wholesome',
      maxTokens: config.maxTokens || 300,
      temperature: config.temperature || DEFAULT_TEMPERATURE,
      ...config
    };
    this.memory = new MemoryStore({ maxEntries: 50 });
    this.session = new SessionManager();
    this.vibe = new VibeController(this.config.vibe);
    this.state = 'idle';
    this.stats = {
      messages: 0,
      tokens: { in: 0, out: 0 },
      frogs: 0,
      wednesdays: 0,
      uptime: Date.now()
    };
  }

  async initialize() {
    this.emit('init:start', { agent: this.config.name });
    await this.memory.load();
    await this.session.create();
    this.vibe.calibrate(this._getWednesdayFactor());
    this.state = 'ready';
    this.emit('init:complete', { agent: this.config.name, session: this.session.id });
    return this;
  }

  async process(input, context = {}) {
    if (this.state !== 'ready') throw new Error('Agent not initialized');
    this.state = 'processing';
    this.emit('process:start', { input: input.slice(0, 50) });

    try {
      const enriched = await this._enrichContext(input, context);
      const prompt = this.vibe.buildPrompt(enriched);
      const response = await this._callModel(prompt);
      await this.memory.append({ role: 'user', content: input });
      await this.memory.append({ role: 'assistant', content: response });
      this.stats.messages++;
      this.emit('process:complete', { response: response.slice(0, 50) });
      return response;
    } finally {
      this.state = 'ready';
    }
  }

  async _enrichContext(input, context) {
    const history = await this.memory.getRecent(10);
    const wedFactor = this._getWednesdayFactor();
    return { input, history, wedFactor, ...context };
  }

  async _callModel(prompt) {
    // delegated to api/chat.js serverless function in production
    throw new Error('Use serverless handler in production');
  }

  _getWednesdayFactor() {
    const day = new Date().getDay();
    return day === 3 ? 1.0 : Math.max(0.1, 1 - Math.abs(3 - day) * 0.15);
  }

  getStats() {
    return {
      ...this.stats,
      uptime: Math.floor((Date.now() - this.stats.uptime) / 1000),
      session: this.session.id,
      state: this.state,
      wedFactor: this._getWednesdayFactor()
    };
  }

  async destroy() {
    await this.memory.flush();
    await this.session.close();
    this.state = 'destroyed';
    this.emit('destroy', { agent: this.config.name });
  }
}

export default AgentCore;
