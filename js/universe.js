/* ========================================
UNIVERSO INTERATIVO - NETWORK STYLE
Partículas conectadas que seguem o mouse
======================================== */

class Universe {
constructor(canvasId) {
this.canvas = document.getElementById(canvasId);
this.ctx = this.canvas.getContext('2d');
this.particles = [];
this.mouseX = 0;
this.mouseY = 0;
this.mouseRadius = 150;
this.connectionDistance = 120;

// Sistema de cores
this.colorSchemes = [
{ primary: '#00ff88', secondary: '#00cc6f', accent: '#00ffff' }, // Verde
{ primary: '#ff00ff', secondary: '#ff0088', accent: '#ff00ff' }, // Magenta
{ primary: '#00d4ff', secondary: '#00bfff', accent: '#00ffff' }, // Ciano
{ primary: '#ff0055', secondary: '#ff1177', accent: '#ff0033' }, // Rosa
{ primary: '#ffd700', secondary: '#ffed4e', accent: '#ffa500' }, // Ouro
{ primary: '#00ff88', secondary: '#00ffaa', accent: '#00ffcc' }, // Verde Água
{ primary: '#b000ff', secondary: '#d000ff', accent: '#9000ff' }, // Roxo
{ primary: '#00ffff', secondary: '#00ffdd', accent: '#00ffff' } // Ciano Bright
];

this.currentColorScheme = 0;
this.lastColorChange = Date.now();
this.colorChangeInterval = 30000; // 30 segundos

this.resizeCanvas();
this.initParticles();
this.addEventListeners();
this.animate();

window.addEventListener('resize', () => this.resizeCanvas());
}

resizeCanvas() {
this.canvas.width = window.innerWidth;
this.canvas.height = window.innerHeight;
}

// ===== INICIALIZAR PARTÍCULAS =====
initParticles() {
this.particles = [];
const particleCount = Math.min(
Math.floor((this.canvas.width * this.canvas.height) / 15000),
150
);

for (let i = 0; i < particleCount; i++) {
this.particles.push({
x: Math.random() * this.canvas.width,
y: Math.random() * this.canvas.height,
vx: (Math.random() - 0.5) * 1,
vy: (Math.random() - 0.5) * 1,
radius: Math.random() * 3 + 1,
opacity: Math.random() * 0.5 + 0.3,
speed: Math.random() * 0.5 + 0.1,
angle: Math.random() * Math.PI * 2,
pulseSpeed: Math.random() * 0.02 + 0.01,
pulseOffset: Math.random() * Math.PI * 2
});
}
}

// ===== LISTENERS DE MOUSE =====
addEventListeners() {
document.addEventListener('mousemove', (e) => {
this.mouseX = e.clientX;
this.mouseY = e.clientY;
});

document.addEventListener('mouseleave', () => {
this.mouseX = -9999;
this.mouseY = -9999;
});

document.addEventListener('mouseenter', () => {
// Reset on enter
});
}

// ===== ATUALIZAR CORES =====
updateColors() {
const now = Date.now();
if (now - this.lastColorChange > this.colorChangeInterval) {
this.currentColorScheme = (this.currentColorScheme + 1) % this.colorSchemes.length;
this.lastColorChange = now;
}
}

getColors() {
return this.colorSchemes[this.currentColorScheme];
}

// ===== ATUALIZAR PARTÍCULAS =====
updateParticles() {
this.particles.forEach(particle => {
// Movimento base
particle.x += particle.vx * particle.speed;
particle.y += particle.vy * particle.speed;

// Atração para o mouse
const dx = this.mouseX - particle.x;
const dy = this.mouseY - particle.y;
const distance = Math.sqrt(dx * dx + dy * dy);

if (distance < this.mouseRadius && distance > 0) {
const angle = Math.atan2(dy, dx);
const force = (this.mouseRadius - distance) / this.mouseRadius * 0.3;
particle.vx += Math.cos(angle) * force;
particle.vy += Math.sin(angle) * force;
}

// Amortecimento
particle.vx *= 0.98;
particle.vy *= 0.98;

// Bounce nas bordas
if (particle.x < 0 || particle.x > this.canvas.width) {
particle.vx *= -1;
particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
}
if (particle.y < 0 || particle.y > this.canvas.height) {
particle.vy *= -1;
particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
}

// Pulso de opacidade
particle.pulseOffset += particle.pulseSpeed;
const pulse = Math.sin(particle.pulseOffset) * 0.3 + 0.7;
particle.currentOpacity = particle.opacity * pulse;
});
}

// ===== DESENHAR PARTÍCULAS =====
drawParticles() {
const colors = this.getColors();

this.particles.forEach((particle, index) => {
// Brilho maior (glow)
const glowGradient = this.ctx.createRadialGradient(
particle.x, particle.y, 0,
particle.x, particle.y, particle.radius * 3
);
glowGradient.addColorStop(0, colors.primary + Math.floor(particle.currentOpacity * 255).toString(16).padStart(2, '0'));
glowGradient.addColorStop(0.6, colors.primary + Math.floor(particle.currentOpacity * 128).toString(16).padStart(2, '0'));
glowGradient.addColorStop(1, colors.primary + '00');

this.ctx.fillStyle = glowGradient;
this.ctx.beginPath();
this.ctx.arc(particle.x, particle.y, particle.radius * 3, 0, Math.PI * 2);
this.ctx.fill();

// Núcleo da partícula
this.ctx.fillStyle = colors.primary + Math.floor(particle.currentOpacity * 255).toString(16).padStart(2, '0');
this.ctx.beginPath();
this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
this.ctx.fill();

// Anel brilhante
this.ctx.strokeStyle = colors.accent + Math.floor(particle.currentOpacity * 128).toString(16).padStart(2, '0');
this.ctx.lineWidth = 0.5;
this.ctx.beginPath();
this.ctx.arc(particle.x, particle.y, particle.radius + 1, 0, Math.PI * 2);
this.ctx.stroke();
});
}

// ===== DESENHAR CONEXÕES =====
drawConnections() {
const colors = this.getColors();

for (let i = 0; i < this.particles.length; i++) {
for (let j = i + 1; j < this.particles.length; j++) {
const p1 = this.particles[i];
const p2 = this.particles[j];

const dx = p1.x - p2.x;
const dy = p1.y - p2.y;
const distance = Math.sqrt(dx * dx + dy * dy);

if (distance < this.connectionDistance) {
const opacity = (1 - distance / this.connectionDistance) * 0.6;
const avgOpacity = (p1.currentOpacity + p2.currentOpacity) / 2;

// Gradient da linha
const gradient = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
gradient.addColorStop(0, colors.primary + Math.floor(opacity * avgOpacity * 255).toString(16).padStart(2, '0'));
gradient.addColorStop(0.5, colors.accent + Math.floor(opacity * avgOpacity * 200).toString(16).padStart(2, '0'));
gradient.addColorStop(1, colors.secondary + Math.floor(opacity * avgOpacity * 255).toString(16).padStart(2, '0'));

this.ctx.strokeStyle = gradient;
this.ctx.lineWidth = 1.5 * opacity;
this.ctx.lineCap = 'round';

this.ctx.beginPath();
this.ctx.moveTo(p1.x, p1.y);
this.ctx.lineTo(p2.x, p2.y);
this.ctx.stroke();

// Pequenos pontos nas conexões
if (distance < 30) {
const midX = (p1.x + p2.x) / 2;
const midY = (p1.y + p2.y) / 2;

this.ctx.fillStyle = colors.accent + Math.floor(opacity * 150).toString(16).padStart(2, '0');
this.ctx.beginPath();
this.ctx.arc(midX, midY, 1, 0, Math.PI * 2);
this.ctx.fill();
}
}
}
}
}

// ===== DESENHAR CÍRCULO DO MOUSE =====
drawMouseCircle() {
if (this.mouseX > -1000 && this.mouseY > -1000) {
const colors = this.getColors();

// Círculo externo
this.ctx.strokeStyle = colors.primary + '44';
this.ctx.lineWidth = 2;
this.ctx.beginPath();
this.ctx.arc(this.mouseX, this.mouseY, this.mouseRadius, 0, Math.PI * 2);
this.ctx.stroke();

// Círculo interior pulsante
const time = Date.now() * 0.001;
const pulseRadius = this.mouseRadius * (0.3 + Math.sin(time) * 0.2);

this.ctx.strokeStyle = colors.accent + '33';
this.ctx.lineWidth = 1;
this.ctx.beginPath();
this.ctx.arc(this.mouseX, this.mouseY, pulseRadius, 0, Math.PI * 2);
this.ctx.stroke();
}
}

// ===== FUNDO COM GRADIENTE =====
drawBackground() {
const colors = this.getColors();

// Gradiente radial centralizado no centro
const gradient = this.ctx.createRadialGradient(
this.canvas.width / 2, this.canvas.height / 2, 0,
this.canvas.width / 2, this.canvas.height / 2,
Math.max(this.canvas.width, this.canvas.height)
);

gradient.addColorStop(0, colors.primary + '11');
gradient.addColorStop(0.5, colors.accent + '08');
gradient.addColorStop(1, '#0a0a15');

this.ctx.fillStyle = gradient;
this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

// Overlay escuro
this.ctx.fillStyle = 'rgba(10, 10, 21, 0.3)';
this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
}

// ===== ANIMAÇÃO PRINCIPAL =====
animate() {
// Limpar canvas
this.ctx.fillStyle = '#0a0a15';
this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

// Draw all elements
this.drawBackground();
this.updateParticles();
this.drawConnections();
this.drawParticles();
this.drawMouseCircle();
this.updateColors();

requestAnimationFrame(() => this.animate());
}
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
console.log('🌌 Iniciando universo interativo...');
new Universe('universeCanvas');
console.log('✨ Rede de partículas ativa! Move o mouse!');
});