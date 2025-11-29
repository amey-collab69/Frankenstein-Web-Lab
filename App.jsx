import RetroTerminal from './components/RetroTerminal/RetroTerminal';
import PixelCanvas from './components/PixelCanvas/PixelCanvas';
import Dashboard from './components/Dashboard/Dashboard';
import FusionEngine from './components/FusionEngine/FusionEngine';
import './App.css';

function App() {
  return (
    <div className="frankenstein-lab crt-effect">
      <header className="lab-header">
        <h1 className="glow-text electric-arc">
          ⚡ FRANKENSTEIN WEB LAB ⚡
        </h1>
        <p className="lab-subtitle">A Chimera Web Application - Technology Fusion Machine</p>
      </header>

      <div className="lab-grid">
        <div className="lab-section">
          <RetroTerminal />
        </div>
        
        <div className="lab-section">
          <PixelCanvas />
        </div>
        
        <div className="lab-section full-width">
          <FusionEngine />
        </div>
        
        <div className="lab-section full-width">
          <Dashboard />
        </div>
      </div>

      <footer className="lab-footer">
        <p>🧪 Powered by Kiro AI • Built with React + Node.js + MongoDB</p>
      </footer>
    </div>
  );
}

export default App;
