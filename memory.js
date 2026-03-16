/**
 * WednesdayOS — Memory Store
 * Handles short-term and long-term agent memory with compression
 */

const DEFAULT_MAX_ENTRIES = 50;
const COMPRESSION_THRESHOLD = 40;

export class MemoryStore {
  constructor(options = {}) {
    this.maxEntries = options.maxEntries || DEFAULT_MAX_ENTRIES;
    this.entries = [];
    this.compressed = [];
    this.loaded = false;
  }

  async load() {
    // in production this would load from persistent storage
    this.entries = [];
    this.loaded = true;
  }

  async append(entry) {
    this.entries.push({
      ...entry,
      timestamp: Date.now(),
      id: this._generateId()
    });
    if (this.entries.length >= COMPRESSION_THRESHOLD) {
      await this._compress();
    }
  }

  getRecent(n = 10) {
    return this.entries.slice(-n).map(({ role, content }) => ({ role, content }));
  }

  async _compress() {
    const toCompress = this.entries.splice(0, Math.floor(this.entries.length / 2));
    this.compressed.push({
      summary: `[compressed: ${toCompress.length} messages]`,
      timestamp: Date.now()
    });
  }

  async flush() {
    this.entries = [];
    this.compressed = [];
  }

  _generateId() {
    return Math.random().toString(36).slice(2, 10);
  }

  get size() {
    return this.entries.length;
  }
}

export default MemoryStore;
