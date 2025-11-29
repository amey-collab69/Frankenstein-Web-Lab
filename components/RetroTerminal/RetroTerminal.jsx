import { useState, useEffect, useRef } from 'react';
import { useFrankensteinStore } from '../../context/FrankensteinStore';
import { terminalAPI } from '../../services/api';
import './RetroTerminal.css';

const RetroTerminal = () => {
  const [input, setInput] = useState('');
  const { terminalLogs, addTerminalLog } = useFrankensteinStore();
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLogs]);

  const handleCommand = async (cmd) => {
    const command = cmd.trim();
    let output = '';

    switch (command.toLowerCase()) {
      case 'help':
        output = `Available commands:
- help: Show this message
- clear: Clear terminal
- status: System status
- fusion: Show fusion options
- patterns: List all 31 AI patterns
- save: Save terminal log`;
        break;
      case 'clear':
        useFrankensteinStore.getState().clearTerminal();
        return;
      case 'status':
        output = '⚡ Frankenstein Lab: OPERATIONAL\n🧪 All systems: ACTIVE\n💚 Power level: 100%';
        break;
      case 'fusion':
        output = 'Fusion Engine Ready:\n- pixel-to-ascii\n- terminal-to-dashboard\n- ai-generate\n\nTry: "list patterns" in Fusion Engine';
        break;
      case 'patterns':
        output = `31 AI Patterns Available:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👻 ghost      ❤️ heart      ⚡ lightning
🐍 snake      💀 skull      ⭐ star
😊 smiley     👽 alien      🍄 mushroom
🌲 tree       🌸 flower     🐱 cat
🐶 dog        🐟 fish       🦋 butterfly
🚀 rocket     🌙 moon       ☀️ sun
☁️ cloud      ☂️ umbrella   🏠 house
🚗 car        🍕 pizza      🍎 apple
🍒 cherry     💎 diamond    👑 crown
🔑 key        🔒 lock       💣 bomb
🎁 gift
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Use Fusion Engine: "draw a [name]"`;
        break;
      default:
        output = `Command not found: ${command}\nType 'help' for available commands`;
    }

    const log = { command, output, timestamp: new Date() };
    addTerminalLog(log);

    try {
      await terminalAPI.saveLogs(log);
    } catch (error) {
      console.error('Failed to save log:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput('');
    }
  };

  return (
    <div className="retro-terminal lab-container neon-border crt-effect">
      <div className="terminal-header glow-text">
        <span>⚡ FRANKENSTEIN TERMINAL v1.0 ⚡</span>
      </div>
      
      <div className="terminal-output" ref={terminalRef}>
        <div className="terminal-line">
          <span className="prompt">$</span> Welcome to Frankenstein Lab
        </div>
        <div className="terminal-line">
          <span className="prompt">$</span> Type 'help' for commands
        </div>
        
        {terminalLogs.map((log, idx) => (
          <div key={idx}>
            <div className="terminal-line">
              <span className="prompt">$</span> {log.command}
            </div>
            <div className="terminal-output-text">{log.output}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="terminal-input-form">
        <span className="prompt">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="terminal-input"
          autoFocus
          placeholder="Enter command..."
        />
      </form>
    </div>
  );
};

export default RetroTerminal;
