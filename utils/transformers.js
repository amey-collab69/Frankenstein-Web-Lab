// Data transformation utilities for Fusion Engine

export const pixelToAscii = (pixels) => {
  return pixels.map(row => 
    row.map(color => {
      // Convert color to ASCII character based on brightness
      if (color === '#000000') return ' ';
      if (color === '#00ff00') return '█';
      if (color === '#9d00ff') return '▓';
      if (color === '#00d4ff') return '▒';
      if (color === '#ff0055') return '░';
      if (color === '#ffff00') return '▄';
      if (color === '#ffffff') return '█';
      return '·';
    }).join('')
  ).join('\n');
};

export const asciiToPixel = (ascii, colorMap = {}) => {
  const lines = ascii.split('\n');
  const defaultColor = colorMap.default || '#00ff00';
  
  return lines.map(line => 
    line.split('').map(char => {
      if (char === ' ') return '#000000';
      return colorMap[char] || defaultColor;
    })
  );
};

export const pixelToJson = (pixels) => {
  return {
    width: pixels[0]?.length || 0,
    height: pixels.length,
    data: pixels.flat(),
    format: 'rgb-hex'
  };
};

export const jsonToPixel = (json) => {
  const { width, height, data } = json;
  const pixels = [];
  
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      row.push(data[y * width + x]);
    }
    pixels.push(row);
  }
  
  return pixels;
};

export const generatePattern = (type, size = 16) => {
  const grid = Array(size).fill(null).map(() => Array(size).fill('#000000'));
  const green = '#00ff00';
  const purple = '#9d00ff';
  const blue = '#00d4ff';
  const red = '#ff0055';
  const yellow = '#ffff00';
  const white = '#ffffff';
  
  switch (type) {
    case 'ghost':
      const ghostCoords = [[7,4],[8,4],[9,4],[6,5],[7,5],[8,5],[9,5],[10,5],[5,6],[6,6],[8,6],[9,6],[11,6],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8],[5,9],[7,9],[9,9],[11,9],[5,10],[7,10],[9,10],[11,10]];
      ghostCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = green; });
      break;
      
    case 'heart':
      const heartCoords = [[5,4],[6,4],[9,4],[10,4],[4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[6,8],[7,8],[8,8],[9,8],[7,9],[8,9]];
      heartCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      break;
      
    case 'lightning':
      const lightningCoords = [[8,2],[8,3],[8,4],[7,5],[7,6],[8,7],[9,8],[9,9],[9,10]];
      lightningCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      break;
      
    case 'snake':
      const snakeCoords = [[8,3],[9,3],[7,4],[8,4],[9,4],[10,4],[6,5],[7,5],[6,6],[7,6],[7,7],[8,7],[8,8],[9,8],[9,9],[10,9],[10,10],[11,10],[11,11],[12,11]];
      snakeCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = green; });
      if (8 < size && 3 < size) grid[3][8] = red;
      if (9 < size && 3 < size) grid[3][9] = red;
      break;
      
    case 'skull':
      const skullCoords = [[6,3],[7,3],[8,3],[9,3],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[5,5],[6,5],[9,5],[10,5],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[6,7],[7,7],[8,7],[9,7],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[6,9],[9,9]];
      skullCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = white; });
      if (6 < size && 5 < size) grid[5][6] = red;
      if (9 < size && 5 < size) grid[5][9] = red;
      break;
      
    case 'star':
      const starCoords = [[8,2],[7,3],[8,3],[9,3],[6,4],[7,4],[8,4],[9,4],[10,4],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[7,6],[8,6],[9,6],[7,7],[8,7],[9,7]];
      starCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      break;
      
    case 'smiley':
      const smileyCoords = [[6,4],[7,4],[8,4],[9,4],[5,5],[10,5],[5,6],[10,6],[5,7],[6,7],[9,7],[10,7],[6,8],[7,8],[8,8],[9,8]];
      smileyCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      if (6 < size && 5 < size) grid[5][6] = red;
      if (9 < size && 5 < size) grid[5][9] = red;
      break;
      
    case 'alien':
      const alienCoords = [[7,3],[8,3],[9,3],[6,4],[7,4],[8,4],[9,4],[10,4],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[6,6],[7,6],[8,6],[9,6],[10,6],[7,7],[8,7],[9,7],[6,8],[10,8],[5,9],[11,9]];
      alienCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = green; });
      if (7 < size && 5 < size) grid[5][7] = red;
      if (9 < size && 5 < size) grid[5][9] = red;
      break;
      
    case 'mushroom':
      const mushroomCoords = [[6,3],[7,3],[8,3],[9,3],[10,3],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[7,5],[8,5],[9,5],[7,6],[8,6],[9,6],[7,7],[8,7],[9,7],[6,8],[7,8],[8,8],[9,8],[10,8]];
      mushroomCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      [[7,5],[8,5],[9,5],[7,6],[8,6],[9,6],[7,7],[8,7],[9,7],[6,8],[7,8],[8,8],[9,8],[10,8]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = white; });
      break;
      
    case 'tree':
      const treeCoords = [[8,2],[7,3],[8,3],[9,3],[6,4],[7,4],[8,4],[9,4],[10,4],[7,5],[8,5],[9,5],[8,6],[8,7],[8,8],[7,9],[8,9],[9,9]];
      treeCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = green; });
      [[8,6],[8,7],[8,8],[7,9],[8,9],[9,9]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = '#8B4513'; });
      break;
      
    case 'flower':
      const flowerCoords = [[8,2],[7,3],[9,3],[6,4],[8,4],[10,4],[7,5],[9,5],[8,6],[8,7],[8,8]];
      flowerCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      if (8 < size && 4 < size) grid[4][8] = yellow;
      [[8,6],[8,7],[8,8]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = green; });
      break;
      
    case 'cat':
      const catCoords = [[5,3],[6,3],[9,3],[10,3],[6,4],[7,4],[8,4],[9,4],[6,5],[7,5],[8,5],[9,5],[6,6],[7,6],[8,6],[9,6],[7,7],[8,7],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8]];
      catCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = purple; });
      if (7 < size && 5 < size) grid[5][7] = green;
      if (8 < size && 5 < size) grid[5][8] = green;
      break;
      
    case 'dog':
      const dogCoords = [[5,4],[6,4],[9,4],[10,4],[6,5],[7,5],[8,5],[9,5],[6,6],[7,6],[8,6],[9,6],[7,7],[8,7],[6,8],[7,8],[8,8],[9,8],[5,9],[6,9],[9,9],[10,9]];
      dogCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = '#8B4513'; });
      if (7 < size && 6 < size) grid[6][7] = red;
      if (8 < size && 6 < size) grid[6][8] = red;
      break;
      
    case 'fish':
      const fishCoords = [[10,5],[9,6],[10,6],[11,6],[8,7],[9,7],[10,7],[11,7],[12,7],[9,8],[10,8],[11,8]];
      fishCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = blue; });
      if (10 < size && 7 < size) grid[7][10] = red;
      break;
      
    case 'butterfly':
      const butterflyCoords = [[5,4],[6,4],[9,4],[10,4],[5,5],[6,5],[9,5],[10,5],[6,6],[7,6],[8,6],[9,6],[7,7],[8,7],[7,8],[8,8]];
      butterflyCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = purple; });
      [[7,6],[8,6],[7,7],[8,7],[7,8],[8,8]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      break;
      
    case 'rocket':
      const rocketCoords = [[8,2],[7,3],[8,3],[9,3],[7,4],[8,4],[9,4],[7,5],[8,5],[9,5],[7,6],[8,6],[9,6],[6,7],[7,7],[8,7],[9,7],[10,7],[5,8],[11,8]];
      rocketCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = blue; });
      [[5,8],[11,8]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      break;
      
    case 'moon':
      const moonCoords = [[7,3],[8,3],[9,3],[6,4],[7,4],[8,4],[9,4],[10,4],[6,5],[7,5],[10,5],[11,5],[6,6],[11,6],[6,7],[7,7],[10,7],[11,7],[7,8],[8,8],[9,8],[10,8]];
      moonCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      break;
      
    case 'sun':
      const sunCoords = [[8,1],[6,2],[10,2],[7,3],[8,3],[9,3],[3,4],[6,4],[7,4],[8,4],[9,4],[10,4],[13,4],[6,5],[7,5],[8,5],[9,5],[10,5],[7,6],[8,6],[9,6],[6,7],[10,7],[8,8]];
      sunCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      break;
      
    case 'cloud':
      const cloudCoords = [[7,4],[8,4],[9,4],[6,5],[7,5],[8,5],[9,5],[10,5],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[6,7],[7,7],[8,7],[9,7],[10,7]];
      cloudCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = white; });
      break;
      
    case 'umbrella':
      const umbrellaCoords = [[6,3],[7,3],[8,3],[9,3],[10,3],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[11,4],[8,5],[8,6],[8,7],[8,8],[9,9]];
      umbrellaCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      break;
      
    case 'house':
      const houseCoords = [[8,2],[7,3],[8,3],[9,3],[6,4],[7,4],[8,4],[9,4],[10,4],[6,5],[7,5],[8,5],[9,5],[10,5],[6,6],[7,6],[9,6],[10,6],[6,7],[7,7],[9,7],[10,7],[6,8],[7,8],[8,8],[9,8],[10,8]];
      houseCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = '#8B4513'; });
      [[8,6],[8,7]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = blue; });
      break;
      
    case 'car':
      const carCoords = [[7,5],[8,5],[9,5],[6,6],[7,6],[8,6],[9,6],[10,6],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8]];
      carCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      if (6 < size && 8 < size) grid[8][6] = white;
      if (10 < size && 8 < size) grid[8][10] = white;
      break;
      
    case 'pizza':
      const pizzaCoords = [[8,3],[7,4],[8,4],[9,4],[6,5],[7,5],[8,5],[9,5],[10,5],[6,6],[7,6],[8,6],[9,6],[10,6],[6,7],[7,7],[8,7],[9,7],[10,7],[7,8],[8,8],[9,8]];
      pizzaCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      [[7,5],[9,6],[8,7]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      break;
      
    case 'apple':
      const appleCoords = [[8,3],[7,4],[8,4],[9,4],[6,5],[7,5],[8,5],[9,5],[10,5],[6,6],[7,6],[8,6],[9,6],[10,6],[7,7],[8,7],[9,7],[8,8]];
      appleCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      if (8 < size && 3 < size) grid[3][8] = green;
      break;
      
    case 'cherry':
      const cherryCoords = [[6,4],[7,4],[9,4],[10,4],[5,5],[6,5],[7,5],[9,5],[10,5],[11,5],[6,6],[7,6],[9,6],[10,6],[7,7],[9,7]];
      cherryCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      [[7,3],[8,3],[9,3]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = green; });
      break;
      
    case 'diamond':
      const diamondCoords = [[8,3],[7,4],[8,4],[9,4],[6,5],[7,5],[8,5],[9,5],[10,5],[7,6],[8,6],[9,6],[8,7]];
      diamondCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = blue; });
      break;
      
    case 'crown':
      const crownCoords = [[5,4],[7,4],[9,4],[11,4],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[6,7],[7,7],[8,7],[9,7],[10,7]];
      crownCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      break;
      
    case 'key':
      const keyCoords = [[6,4],[7,4],[8,4],[5,5],[6,5],[9,5],[5,6],[6,6],[9,6],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[9,8],[11,8]];
      keyCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      break;
      
    case 'lock':
      const lockCoords = [[7,3],[8,3],[9,3],[6,4],[10,4],[6,5],[10,5],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],[5,7],[6,7],[7,7],[8,7],[9,7],[10,7],[11,7],[5,8],[6,8],[7,8],[8,8],[9,8],[10,8],[11,8]];
      lockCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = '#8B4513'; });
      if (8 < size && 7 < size) grid[7][8] = yellow;
      break;
      
    case 'bomb':
      const bombCoords = [[8,2],[8,3],[7,4],[8,4],[9,4],[6,5],[7,5],[8,5],[9,5],[10,5],[6,6],[7,6],[8,6],[9,6],[10,6],[7,7],[8,7],[9,7],[8,8]];
      bombCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = '#000000'; });
      [[8,2],[8,3]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      break;
      
    case 'gift':
      const giftCoords = [[7,3],[8,3],[9,3],[6,4],[7,4],[8,4],[9,4],[10,4],[6,5],[7,5],[8,5],[9,5],[10,5],[6,6],[7,6],[8,6],[9,6],[10,6],[6,7],[7,7],[8,7],[9,7],[10,7]];
      giftCoords.forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = red; });
      [[7,3],[8,3],[9,3],[8,4],[8,5],[8,6],[8,7]].forEach(([x, y]) => { if (x < size && y < size) grid[y][x] = yellow; });
      break;
      
    default:
      for (let i = 0; i < size * 2; i++) {
        const x = Math.floor(Math.random() * size);
        const y = Math.floor(Math.random() * size);
        grid[y][x] = green;
      }
  }
  
  return grid;
};

export const analyzePixelArt = (pixels) => {
  const colorCount = {};
  let filledPixels = 0;
  
  pixels.forEach(row => {
    row.forEach(color => {
      if (color !== '#000000') {
        filledPixels++;
        colorCount[color] = (colorCount[color] || 0) + 1;
      }
    });
  });
  
  const totalPixels = pixels.length * pixels[0].length;
  
  return {
    totalPixels,
    filledPixels,
    emptyPixels: totalPixels - filledPixels,
    fillPercentage: ((filledPixels / totalPixels) * 100).toFixed(2),
    colors: Object.keys(colorCount).length,
    colorDistribution: colorCount
  };
};
