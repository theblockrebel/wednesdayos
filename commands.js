/**
 * WednesdayOS — Command Parser
 * Parses and routes slash commands from terminal input
 */

export const COMMANDS = {
  '/help':      { description: 'list all commands', args: [] },
  '/status':    { description: 'session and agent status', args: [] },
  '/wednesday': { description: 'wednesday proximity report', args: [] },
  '/frog':      { description: 'summon ascii frog', args: ['--index'] },
  '/vibe':      { description: 'current vibe report', args: ['--set'] },
  '/reset':     { description: 'wipe memory and restart session', args: [] },
  '/compact':   { description: 'compress conversation context', args: [] },
  '/think':     { description: 'set reasoning depth', args: ['--level'] },
  '/model':     { description: 'switch model mid-session', args: ['<model>'] },
  '/usage':     { description: 'token usage and cost', args: [] },
};

export class CommandParser {
  constructor() {
    this.history = [];
    this.aliases = {
      '/h': '/help',
      '/s': '/status',
      '/w': '/wednesday',
      '/f': '/frog',
      '/r': '/reset'
    };
  }

  parse(input) {
    if (!input.startsWith('/')) return null;

    const parts = input.trim().split(/\s+/);
    const raw = parts[0].toLowerCase();
    const cmd = this.aliases[raw] || raw;
    const args = parts.slice(1);

    if (!COMMANDS[cmd]) {
      return { type: 'unknown', cmd, raw: input };
    }

    this.history.push({ cmd, args, timestamp: Date.now() });
    return { type: 'command', cmd, args, raw: input };
  }

  isCommand(input) {
    return input.trim().startsWith('/');
  }

  getHelp() {
    return Object.entries(COMMANDS).map(([cmd, meta]) => ({
      cmd,
      description: meta.description,
      args: meta.args
    }));
  }

  getHistory(n = 10) {
    return this.history.slice(-n);
  }
}

export default CommandParser;
