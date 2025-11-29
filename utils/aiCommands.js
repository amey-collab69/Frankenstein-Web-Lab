  import { generatePattern, pixelToAscii, analyzePixelArt } from './transformers';

// List of all available patterns
export const AVAILABLE_PATTERNS = [
  'ghost', 'heart', 'lightning', 'snake', 'skull', 'star', 'smiley', 'alien',
  'mushroom', 'tree', 'flower', 'cat', 'dog', 'fish', 'butterfly', 'rocket',
  'moon', 'sun', 'cloud', 'umbrella', 'house', 'car', 'pizza', 'apple',
  'cherry', 'diamond', 'crown', 'key', 'lock', 'bomb', 'gift'
];

const PATTERN_EMOJIS = {
  ghost: '👻', heart: '❤️', lightning: '⚡', snake: '🐍', skull: '💀',
  star: '⭐', smiley: '😊', alien: '👽', mushroom: '🍄', tree: '🌲',
  flower: '🌸', cat: '🐱', dog: '🐶', fish: '🐟', butterfly: '🦋',
  rocket: '🚀', moon: '🌙', sun: '☀️', cloud: '☁️', umbrella: '☂️',
  house: '🏠', car: '🚗', pizza: '🍕', apple: '🍎', cherry: '🍒',
  diamond: '💎', crown: '👑', key: '🔑', lock: '🔒', bomb: '💣', gift: '🎁'
};

export const processAiCommand = async (command, context) => {
  const cmd = command.toLowerCase().trim();
  const { 
    pixelGrid, 
    setPixel, 
    addTerminalLog, 
    addCard,
    clearCanvas 
  } = context;

  // List all patterns command
  if (cmd.includes('list') || cmd.includes('patterns') || cmd.includes('commands')) {
    const patternList = AVAILABLE_PATTERNS.map(p => `  ${PATTERN_EMOJIS[p]} ${p}`).join('\n');
    addTerminalLog({
      command: 'list-patterns',
      output: `Available Patterns (${AVAILABLE_PATTERNS.length}):\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${patternList}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\nUsage: "draw a [pattern]"\nExample: "draw a snake"`,
      timestamp: new Date()
    });
    return { success: true, message: 'Pattern list displayed!' };
  }

  // Check for pattern generation commands
  for (const patternName of AVAILABLE_PATTERNS) {
    if (cmd.includes(patternName)) {
      const pattern = generatePattern(patternName, pixelGrid.length);
      pattern.forEach((row, y) => {
        row.forEach((color, x) => {
          if (color !== '#000000') {
            setPixel(x, y, color);
          }
        });
      });
      
      const emoji = PATTERN_EMOJIS[patternName] || '✨';
      addTerminalLog({
        command: `ai-generate-${patternName}`,
        output: `${emoji} ${patternName.charAt(0).toUpperCase() + patternName.slice(1)} pattern generated!\n⚡ Created on canvas!`,
        timestamp: new Date()
      });
      
      return { success: true, message: `${patternName} generated!` };
    }
  }

  // Conversion commands
  if (cmd.includes('ascii') || (cmd.includes('convert') && cmd.includes('terminal'))) {
    const ascii = pixelToAscii(pixelGrid);
    
    addTerminalLog({
      command: 'ai-pixel-to-ascii',
      output: `ASCII Art:\n${ascii}`,
      timestamp: new Date()
    });
    
    return { success: true, message: 'Converted to ASCII!' };
  }

  // Analysis commands
  if (cmd.includes('analyze') || cmd.includes('stats')) {
    const analysis = analyzePixelArt(pixelGrid);
    const output = `
Pixel Art Analysis:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Total Pixels: ${analysis.totalPixels}
Filled: ${analysis.filledPixels}
Empty: ${analysis.emptyPixels}
Fill Rate: ${analysis.fillPercentage}%
Colors Used: ${analysis.colors}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();
    
    addTerminalLog({
      command: 'ai-analyze-canvas',
      output,
      timestamp: new Date()
    });
    
    return { success: true, message: 'Analysis complete!' };
  }

  // Dashboard export commands
  if (cmd.includes('dashboard') || (cmd.includes('save') && cmd.includes('card'))) {
    const card = {
      title: 'AI Generated Art',
      type: 'pixel',
      content: { pixels: pixelGrid, gridSize: pixelGrid.length },
      timestamp: new Date()
    };
    
    addCard(card);
    
    addTerminalLog({
      command: 'ai-export-dashboard',
      output: '✓ Pixel art exported to dashboard!',
      timestamp: new Date()
    });
    
    return { success: true, message: 'Exported to dashboard!' };
  }

  // Clear commands
  if (cmd.includes('clear') || cmd.includes('reset')) {
    clearCanvas();
    
    addTerminalLog({
      command: 'ai-clear-canvas',
      output: '✓ Canvas cleared!',
      timestamp: new Date()
    });
    
    return { success: true, message: 'Canvas cleared!' };
  }

  // Random generation
  if (cmd.includes('random') || cmd.includes('surprise')) {
    const randomPattern = AVAILABLE_PATTERNS[Math.floor(Math.random() * AVAILABLE_PATTERNS.length)];
    const pattern = generatePattern(randomPattern, pixelGrid.length);
    
    pattern.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color !== '#000000') {
          setPixel(x, y, color);
        }
      });
    });
    
    const emoji = PATTERN_EMOJIS[randomPattern] || '✨';
    addTerminalLog({
      command: 'ai-random-generate',
      output: `🎲 Random pattern generated: ${randomPattern}!\n${emoji} Surprise!`,
      timestamp: new Date()
    });
    
    return { success: true, message: `Generated ${randomPattern}!` };
  }

  // Default response
  addTerminalLog({
    command: `ai: ${command}`,
    output: `AI Processing: "${command}"\n\nAvailable commands:\n- "list patterns" - Show all ${AVAILABLE_PATTERNS.length} patterns\n- "draw a [pattern]" - Generate pattern\n- "convert to ascii" - Convert to ASCII\n- "analyze canvas" - Show statistics\n- "save to dashboard" - Export to dashboard\n- "clear canvas" - Clear canvas\n- "random pattern" - Surprise me!`,
    timestamp: new Date()
  });
  
  return { success: true, message: 'Command processed' };
};
