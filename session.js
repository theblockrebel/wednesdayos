/**
 * WednesdayOS — Session Manager
 * Tracks active sessions, token usage, and costs
 */

let sessionCounter = 0;

export class SessionManager {
  constructor() {
    this.id = null;
    this.startTime = null;
    this.tokens = { input: 0, output: 0 };
    this.messageCount = 0;
    this.active = false;
  }

  async create() {
    this.id = `wed_${Date.now()}_${++sessionCounter}`;
    this.startTime = Date.now();
    this.active = true;
    return this.id;
  }

  recordUsage(inputTokens, outputTokens) {
    this.tokens.input += inputTokens;
    this.tokens.output += outputTokens;
    this.messageCount++;
  }

  getCost() {
    // claude-haiku-4-5 pricing
    const inputCost = (this.tokens.input / 1_000_000) * 0.25;
    const outputCost = (this.tokens.output / 1_000_000) * 1.25;
    return (inputCost + outputCost).toFixed(6);
  }

  getDuration() {
    return Math.floor((Date.now() - this.startTime) / 1000);
  }

  async close() {
    this.active = false;
  }

  toJSON() {
    return {
      id: this.id,
      active: this.active,
      duration: this.getDuration(),
      messages: this.messageCount,
      tokens: this.tokens,
      estimatedCost: `$${this.getCost()}`
    };
  }
}

export default SessionManager;
