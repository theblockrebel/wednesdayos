/**
 * WednesdayOS — Terminal Renderer
 * Handles all terminal output formatting, colors, and ASCII art
 */

export const COLORS = {
  green: '\x1b[32m',
  brightGreen: '\x1b[92m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
  reset: '\x1b[0m'
};

export const FROG_SPRITES = [
  `    (  )   (   )  )
     ) (   )  (  (
     _____________
    <  MY  DUDES  >
     ~~~~~~~~~~~~~
      (  o     o )
       |    ^    |
       |  \\___/  |
        \\_______/`,
  `      @..@
     (----)
    ( >WW< )
    ^^ ~~ ^^`,
  `      .---.
     ( o o )
     |  W  |
      \\___/`
];

export class TerminalRenderer {
  constructor(options = {}) {
    this.width = options.width || 80;
    this.colorEnabled = options.color !== false;
    this.lineBuffer = [];
  }

  color(text, colorName) {
    if (!this.colorEnabled) return text;
    return `${COLORS[colorName] || ''}${text}${COLORS.reset}`;
  }

  line(text, colorName) {
    const colored = colorName ? this.color(text, colorName) : text;
    this.lineBuffer.push(colored);
    return this;
  }

  box(title, lines) {
    const width = this.width - 4;
    this.line(`┌${'─'.repeat(width)}┐`, 'dim');
    this.line(`│  ${title.padEnd(width - 2)}│`, 'green');
    this.line(`├${'─'.repeat(width)}┤`, 'dim');
    lines.forEach(l => this.line(`│  ${l.padEnd(width - 2)}│`, 'dim'));
    this.line(`└${'─'.repeat(width)}┘`, 'dim');
    return this;
  }

  frog(index = 0) {
    const sprite = FROG_SPRITES[index % FROG_SPRITES.length];
    sprite.split('\n').forEach(l => this.line(l, 'green'));
    return this;
  }

  flush() {
    const output = this.lineBuffer.join('\n');
    this.lineBuffer = [];
    return output;
  }

  static formatDuration(seconds) {
    if (seconds < 60) return `${seconds}s`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;
    return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
  }
}

export default TerminalRenderer;
