import { create } from 'zustand';

export const useFrankensteinStore = create((set) => ({
  // Terminal state
  terminalLogs: [],
  addTerminalLog: (log) => set((state) => ({ 
    terminalLogs: [...state.terminalLogs, log] 
  })),
  clearTerminal: () => set({ terminalLogs: [] }),
  
  // Canvas state
  pixelGrid: Array(16).fill(null).map(() => Array(16).fill('#000000')),
  gridSize: 16,
  selectedColor: '#00ff00',
  setPixel: (x, y, color) => set((state) => {
    const newGrid = state.pixelGrid.map(row => [...row]);
    newGrid[y][x] = color;
    return { pixelGrid: newGrid };
  }),
  setGridSize: (size) => set({ 
    gridSize: size,
    pixelGrid: Array(size).fill(null).map(() => Array(size).fill('#000000'))
  }),
  setSelectedColor: (color) => set({ selectedColor: color }),
  clearCanvas: () => set((state) => ({
    pixelGrid: Array(state.gridSize).fill(null).map(() => Array(state.gridSize).fill('#000000'))
  })),
  
  // Dashboard state
  dashboardCards: [],
  addCard: (card) => set((state) => ({ 
    dashboardCards: [...state.dashboardCards, card] 
  })),
  removeCard: (id) => set((state) => ({
    dashboardCards: state.dashboardCards.filter(c => c._id !== id)
  })),
  setCards: (cards) => set({ dashboardCards: cards }),
  
  // AI state
  aiProcessing: false,
  setAiProcessing: (processing) => set({ aiProcessing: processing })
}));
