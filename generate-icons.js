const fs = require('fs');
const { createCanvas } = require('canvas');

function createIcon(size) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, size, size);
    gradient.addColorStop(0, '#4a6cf7');
    gradient.addColorStop(1, '#667eea');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.2);
    ctx.fill();
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size * 0.25;
    
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    const smallRadius = size * 0.1;
    ctx.beginPath();
    ctx.arc(centerX - size * 0.2, centerY + size * 0.1, smallRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX + size * 0.2, centerY + size * 0.1, smallRadius, 0, Math.PI * 2);
    ctx.fill();
    
    return canvas.toBuffer('image/png');
}

try {
    fs.writeFileSync('icon-192.png', createIcon(192));
    console.log('✅ icon-192.png 创建成功');
    fs.writeFileSync('icon-512.png', createIcon(512));
    console.log('✅ icon-512.png 创建成功');
} catch (err) {
    console.error('❌ 创建图标失败:', err.message);
    console.log('请安装 canvas 库: npm install canvas');
}