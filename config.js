/**
 * WednesdayOS — Configuration
 * Central config with environment variable support
 */

export const config = {
  agent: {
    name: process.env.AGENT_NAME || 'DUDES',
    model: process.env.MODEL || 'claude-haiku-4-5',
    defaultVibe: process.env.DEFAULT_VIBE || 'wholesome',
    maxTokens: parseInt(process.env.MAX_TOKENS || '300'),
    maxHistory: parseInt(process.env.MAX_HISTORY || '20'),
  },
  api: {
    anthropicKey: process.env.ANTHROPIC_API_KEY,
    anthropicVersion: '2023-06-01',
    baseUrl: 'https://api.anthropic.com/v1',
    timeout: 30000,
    retries: 3,
  },
  server: {
    port: parseInt(process.env.PORT || '3000'),
    host: process.env.HOST || 'localhost',
    corsOrigins: process.env.CORS_ORIGINS?.split(',') || ['*'],
  },
  wednesday: {
    powerBoost: parseFloat(process.env.WEDNESDAY_BOOST || '1.5'),
    enableCountdown: process.env.WEDNESDAY_COUNTDOWN !== 'false',
    timezone: process.env.TZ || 'UTC',
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'pretty',
  }
};

export function validateConfig() {
  if (!config.api.anthropicKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable is required');
  }
  return true;
}

export default config;
