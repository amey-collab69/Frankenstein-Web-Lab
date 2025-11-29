import { useFrankensteinStore } from '../../context/FrankensteinStore';
import { canvasAPI, fusionAPI } from '../../services/api';
import './PixelCanvas.css';

const PixelCanvas = () => {
  const { 
    pixelGrid, 
    selectedColor, 
    setPixel, 
    setSelectedColor,
    clearCanvas,
    addTerminalLog,
    addCard
  } = useFrankensteinStore();

  const colors = ['#000000', '#00ff00', '#9d00ff', '#00d4ff', '#ff0055', '#ffff00', '#ffffff'];

  const handlePixelClick = (x, y) => {
    setPixel(x, y, selectedColor);
  };

  const handleSave = async () => {
    try {
      const art = {
        name: `Art_${Date.now()}`,
        gridSize: pixelGrid.length,
        pixels: pixelGrid
      };
      await canvasAPI.save(art);
      addTerminalLog({
        command: 'save-pixel-art',
        output: `✓ Pixel art saved: ${art.name}`,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleExportToAscii = async () => {
    try {
      const response = await fusionAPI.pixelToAscii(pixelGrid);
      addTerminalLog({
        command: 'pixel-to-ascii',
        output: response.data.ascii,
        timestamp: new Date()
      });
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleExportToDashboard = async () => {
    try {
      const card = {
        title: 'Pixel Art',
        type: 'pixel',
        content: { pixels: pixelGrid, gridSize: pixelGrid.length }
      };
      addCard(card);
      await canvasAPI.save({
        name: `Dashboard_${Date.now()}`,
        gridSize: pixelGrid.length,
        pixels: pixelGrid
      });
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <div className="pixel-canvas-container lab-container neon-border-purple">
      <h2 className="glow-text electric-arc">🎨 PIXEL LABORATORY</h2>
      
      <div className="canvas-grid">
        {pixelGrid.map((row, y) => (
          <div key={y} className="canvas-row">
            {row.map((color, x) => (
              <div
                key={`${x}-${y}`}
                className="pixel"
                style={{ backgroundColor: color }}
                onClick={() => handlePixelClick(x, y)}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="color-palette">
        {colors.map(color => (
          <div
            key={color}
            className={`color-swatch ${selectedColor === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>

      <div className="canvas-controls">
        <button className="lab-button" onClick={clearCanvas}>Clear</button>
        <button className="lab-button" onClick={handleSave}>Save</button>
        <button className="lab-button" onClick={handleExportToAscii}>→ Terminal</button>
        <button className="lab-button" onClick={handleExportToDashboard}>→ Dashboard</button>
      </div>
    </div>
  );
};

export default PixelCanvas;
