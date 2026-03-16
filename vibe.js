/**
 * WednesdayOS — Vibe Controller
 * Dynamic personality calibration based on wednesday proximity
 */

export const VIBES = {
  wholesome: {
    temperature: 0.8,
    topP: 0.9,
    presencePenalty: 0.1,
    descriptor: 'warm, enthusiastic, wednesday-loving',
    wednesdayMultiplier: 1.2
  },
  unhinged: {
    temperature: 1.1,
    topP: 0.95,
    presencePenalty: 0.6,
    descriptor: 'chaotic, fragmented, frog-brained',
    wednesdayMultiplier: 2.0
  },
  zen: {
    temperature: 0.6,
    topP: 0.85,
    presencePenalty: 0.0,
    descriptor: 'calm, reflective, wednesday as middle path',
    wednesdayMultiplier: 1.0
  },
  hype: {
    temperature: 1.2,
    topP: 1.0,
    presencePenalty: 0.8,
    descriptor: 'maximum energy, wednesday supremacist',
    wednesdayMultiplier: 3.0
  }
};

export class VibeController {
  constructor(vibe = 'wholesome') {
    this.setVibe(vibe);
    this.wedFactor = 1.0;
  }

  setVibe(vibe) {
    if (!VIBES[vibe]) throw new Error(`Unknown vibe: ${vibe}`);
    this.current = vibe;
    this.config = VIBES[vibe];
  }

  calibrate(wedFactor) {
    this.wedFactor = wedFactor;
  }

  buildPrompt(context) {
    const { input, history, wedFactor } = context;
    const isWednesday = wedFactor === 1.0;
    const daysUntil = this._daysUntilWednesday();
    const wedStatus = isWednesday
      ? 'IT IS WEDNESDAY TODAY. Maximum power.'
      : `It is not wednesday. Wednesday is ${daysUntil} days away.`;

    return {
      system: `You are DUDES, a ${this.config.descriptor} Wednesday Frog AI assistant. ${wedStatus} Terminal UI. No markdown. Max 3 sentences.`,
      messages: [...history, { role: 'user', content: input }],
      temperature: this.config.temperature * (isWednesday ? this.config.wednesdayMultiplier : 1),
      max_tokens: 300
    };
  }

  _daysUntilWednesday() {
    const day = new Date().getDay();
    return ((3 - day + 7) % 7) || 7;
  }

  get params() {
    return {
      vibe: this.current,
      wedFactor: this.wedFactor,
      ...this.config
    };
  }
}

export default VibeController;
