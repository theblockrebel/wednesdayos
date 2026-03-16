/**
 * WednesdayOS — Logger
 * Structured logging with wednesday-aware log levels
 */

const LEVELS = { debug: 0, info: 1, warn: 2, error: 3 };
const LEVEL_COLORS = {
  debug: '\x1b[2m',
  info:  '\x1b[32m',
  warn:  '\x1b[33m',
  error: '\x1b[31m'
};

export class Logger {
  constructor(options = {}) {
    this.namespace = options.namespace || 'wednesdayos';
    this.level = LEVELS[options.level || 'info'];
    this.entries = [];
  }

  _log(level, message, meta = {}) {
    if (LEVELS[level] < this.level) return;
    const entry = {
      timestamp: new Date().toISOString(),
      level,
      namespace: this.namespace,
      message,
      ...meta
    };
    this.entries.push(entry);
    const color = LEVEL_COLORS[level] || '';
    const reset = '\x1b[0m';
    const ts = new Date().toLocaleTimeString('en', { hour12: false });
    console.log(`${color}${ts} [${this.namespace}] ${level.toUpperCase()} ${message}${reset}`);
  }

  debug(msg, meta) { this._log('debug', msg, meta); }
  info(msg, meta)  { this._log('info', msg, meta); }
  warn(msg, meta)  { this._log('warn', msg, meta); }
  error(msg, meta) { this._log('error', msg, meta); }

  getEntries(n = 50) {
    return this.entries.slice(-n);
  }

  child(namespace) {
    return new Logger({ namespace: `${this.namespace}:${namespace}`, level: Object.keys(LEVELS)[this.level] });
  }
}

export const logger = new Logger({ namespace: 'wednesdayos' });
export default logger;
