import { useState } from 'react';
import { useFrankensteinStore } from '../../context/FrankensteinStore';
import { processAiCommand } from '../../utils/aiCommands';
import './FusionEngine.css';

const FusionEngine = () => {
  const [aiCommand, setAiCommand] = useState('');
  const store = useFrankensteinStore();
  const { aiProcessing, setAiProcessing } = store;

  const handleAiCommand = async () => {
    if (!aiCommand.trim()) return;

    setAiProcessing(true);

    try {
      await processAiCommand(aiCommand, store);
    } catch (error) {
      store.addTerminalLog({
        command: `ai: ${aiCommand}`,
        output: `Error: ${error.message}`,
        timestamp: new Date()
      });
    }

    setAiCommand('');
    setTimeout(() => setAiProcessing(false), 500);
  };

  return (
    <div className="fusion-engine lab-container neon-border electric-arc">
      <h2 className="glow-text">⚡ FUSION ENGINE ⚡</h2>
      
      <div className="fusion-status">
        <div className={`status-indicator ${aiProcessing ? 'active' : ''}`}></div>
        <span>{aiProcessing ? 'PROCESSING...' : 'READY'}</span>
      </div>

      <div className="ai-command-section">
        <label>Natural Language Command:</label>
        <input
          type="text"
          value={aiCommand}
          onChange={(e) => setAiCommand(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAiCommand()}
          placeholder="e.g., 'Draw a pixel ghost' or 'Convert canvas to ASCII'"
          className="ai-input"
          disabled={aiProcessing}
        />
        <button 
          className="lab-button"
          onClick={handleAiCommand}
          disabled={aiProcessing}
        >
          Execute
        </button>
      </div>

      <div className="fusion-examples">
        <h3>Example Commands (31 Patterns Available):</h3>
        <ul>
          <li>"List patterns" - Show all 31 patterns</li>
          <li>"Draw a snake" 🐍</li>
          <li>"Draw a rocket" 🚀</li>
          <li>"Draw a pizza" 🍕</li>
          <li>"Random pattern" - Surprise me!</li>
          <li>"Convert to ASCII"</li>
          <li>"Analyze canvas"</li>
        </ul>
      </div>
    </div>
  );
};

export default FusionEngine;
