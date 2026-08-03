
/* ========================================
MASCOTA ROBOT - ROBÔ ANIMADO INTELIGENTE
Caminha, saúda, sorri, fica bravo e muda de cor
======================================== */

class Robot {
constructor() {
// Posição e movimento
this.x = window.innerWidth / 2;
this.y = window.innerHeight - 150;
this.targetX = this.x;
this.targetY = this.y;
this.vx = 0;
this.vy = 0;
this.speed = 2;

// Estados de expressão
this.currentEmotion = 'idle'; // idle, happy, angry, waving, walking
this.emotionTimer = 0;
this.emotionDuration = 3000;

// Animações
this.walkAnimation = 0;
this.waveAnimation = 0;
this.eyeRotation = 0;
this.headTilt = 0;

// Cores
this.colors = {
primary: '#0099ff',
secondary: '#00ccff',
accent: '#00ffff',
current: 0
};

this.colorSchemes = [
{ primary: '#0099ff', secondary: '#00ccff', accent: '#00ffff' }, // Azul
{ primary: '#ff0099', secondary: '#ff00cc', accent: '#ff00ff' }, // Magenta
{ primary: '#00ff88', secondary: '#00dd66', accent: '#00ffff' }, // Verde
{ primary: '#ffaa00', secondary: '#ffcc00', accent: '#ffff00' }, // Ouro
{ primary: '#ff6600', secondary: '#ff8800', accent: '#ffaa00' }, // Laranja
];

this.currentColorScheme = 0;

this.createElement();
this.addEventListeners();
this.selectRandomEmotion();
this.animate();

// Mudar emoção a cada 4 segundos
setInterval(() => this.selectRandomEmotion(), 4000);

// Mudar cor a cada 5 segundos
setInterval(() => this.changeColor(), 5000);

// Caminhar aleatoriamente
setInterval(() => this.selectRandomWalkTarget(), 6000);
}

createElement() {
this.element = document.createElement('div');
this.element.id = 'robot';
this.element.className = 'robot';
this.element.innerHTML = this.getRobotDraw();

this.element.style.cssText = `
position: fixed;
left: 0;
top: 0;
width: 120px;
height: 140px;
pointer-events: auto;
cursor: pointer;
z-index: 999;
user-select: none;
`;

document.body.appendChild(this.element);
}

// ===== DESENHO DO ROBÔ EM SVG =====
getRobotDraw() {
const colors = this.colorSchemes[this.currentColorScheme];
return `
<svg viewBox="0 0 100 140" width="100%" height="100%" style="filter: drop-shadow(0 0 12px ${colors.primary}80);">
<defs>
<linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
<stop offset="0%" style="stop-color:${colors.primary};stop-opacity:1" />
<stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
</linearGradient>
<linearGradient id="armGrad" x1="0%" y1="0%" x2="0%" y2="100%">
<stop offset="0%" style="stop-color:${colors.secondary};stop-opacity:1" />
<stop offset="100%" style="stop-color:#444444;stop-opacity:1" />
</linearGradient>
<filter id="glow">
<feGaussianBlur stdDeviation="2" result="coloredBlur"/>
<feMerge>
<feMergeNode in="coloredBlur"/>
<feMergeNode in="SourceGraphic"/>
</feMerge>
</filter>
</defs>

<!-- Corpo Principal -->
<rect x="20" y="50" width="60" height="70" rx="8" fill="url(#bodyGrad)" stroke="${colors.primary}" stroke-width="2"/>

<!-- Peito com luz -->
<circle cx="50" cy="75" r="12" fill="${colors.accent}" opacity="0.7" filter="url(#glow)"/>

<!-- Cabeça -->
<rect x="15" y="10" width="70" height="50" rx="10" fill="url(#bodyGrad)" stroke="${colors.primary}" stroke-width="2"/>

<!-- Tela da cabeça (onde ficam os olhos) -->
<rect x="18" y="13" width="64" height="40" rx="8" fill="#1a1a1a" stroke="${colors.accent}" stroke-width="1"/>

<!-- Olho esquerdo (pode mudar com emoção) -->
<circle cx="35" cy="30" r="8" fill="${colors.accent}" class="eye left" filter="url(#glow)"/>
<circle cx="36" cy="29" r="2" fill="#000" class="pupil left"/>

<!-- Olho direito -->
<circle cx="65" cy="30" r="8" fill="${colors.accent}" class="eye right" filter="url(#glow)"/>
<circle cx="66" cy="29" r="2" fill="#000" class="pupil right"/>

<!-- Boca (muda com emoção) -->
<path d="M 40 45 Q 50 50 60 45" stroke="${colors.secondary}" stroke-width="2" fill="none" stroke-linecap="round" class="mouth"/>

<!-- Orelhas/Antenas Esquerda -->
<ellipse cx="10" cy="25" rx="6" ry="15" fill="${colors.secondary}" stroke="${colors.primary}" stroke-width="1.5"/>
<circle cx="10" cy="10" r="4" fill="${colors.accent}" filter="url(#glow)"/>

<!-- Orelhas/Antenas Direita -->
<ellipse cx="90" cy="25" rx="6" ry="15" fill="${colors.secondary}" stroke="${colors.primary}" stroke-width="1.5"/>
<circle cx="90" cy="10" r="4" fill="${colors.accent}" filter="url(#glow)"/>

<!-- Braço Esquerdo -->
<g class="arm-left" style="transform-origin: 20px 55px; transform: rotateZ(0deg);">
<rect x="5" y="55" width="15" height="50" rx="7" fill="url(#armGrad)" stroke="${colors.primary}" stroke-width="1.5"/>
<circle cx="12.5" cy="110" r="6" fill="${colors.secondary}" stroke="${colors.primary}" stroke-width="1"/>
</g>

<!-- Braço Direito -->
<g class="arm-right" style="transform-origin: 80px 55px; transform: rotateZ(0deg);">
<rect x="80" y="55" width="15" height="50" rx="7" fill="url(#armGrad)" stroke="${colors.primary}" stroke-width="1.5"/>
<circle cx="87.5" cy="110" r="6" fill="${colors.secondary}" stroke="${colors.primary}" stroke-width="1"/>
</g>

<!-- Perna Esquerda -->
<g class="leg-left" style="transform-origin: 30px 120px;">
<rect x="25" y="120" width="10" height="20" rx="5" fill="#666666" stroke="${colors.primary}" stroke-width="1"/>
<rect x="23" y="138" width="14" height="5" rx="2" fill="#444444" stroke="${colors.primary}" stroke-width="0.5"/>
</g>

<!-- Perna Direita -->
<g class="leg-right" style="transform-origin: 70px 120px;">
<rect x="65" y="120" width="10" height="20" rx="5" fill="#666666" stroke="${colors.primary}" stroke-width="1"/>
<rect x="63" y="138" width="14" height="5" rx="2" fill="#444444" stroke="${colors.primary}" stroke-width="0.5"/>
</g>
</svg>
`;
}

// ===== MUDANÇA DE COR =====
changeColor() {
this.currentColorScheme = (this.currentColorScheme + 1) % this.colorSchemes.length;
this.element.innerHTML = this.getRobotDraw();
this.updateEmotionVisuals();
}

// ===== SELECIONAR EMOÇÃO ALEATÓRIA =====
selectRandomEmotion() {
const emotions = ['idle', 'happy', 'angry', 'waving'];
this.currentEmotion = emotions[Math.floor(Math.random() * emotions.length)];
this.emotionTimer = this.emotionDuration;
this.updateEmotionVisuals();
}

// ===== ATUALIZAR VISUALS DA EMOÇÃO =====
updateEmotionVisuals() {
const mouth = this.element.querySelector('.mouth');
const leftEye = this.element.querySelector('.eye.left');
const rightEye = this.element.querySelector('.eye.right');

switch(this.currentEmotion) {
case 'happy':
// Sorriso amplo
mouth?.setAttribute('d', 'M 40 42 Q 50 52 60 42');
mouth?.setAttribute('stroke-width', '2.5');
break;

case 'angry':
// Boca para baixo
mouth?.setAttribute('d', 'M 40 48 Q 50 42 60 48');
mouth?.setAttribute('stroke-width', '2');
// Olhos mais altos
leftEye?.setAttribute('cy', '28');
rightEye?.setAttribute('cy', '28');
break;

case 'waving':
// Sorriso neutro
mouth?.setAttribute('d', 'M 40 45 Q 50 50 60 45');
break;

case 'idle':
default:
// Boca neutra
mouth?.setAttribute('d', 'M 40 45 Q 50 48 60 45');
leftEye?.setAttribute('cy', '30');
rightEye?.setAttribute('cy', '30');
}
}

// ===== SELECIONAR NOVO DESTINO PARA CAMINHAR =====
selectRandomWalkTarget() {
this.targetX = Math.random() * (window.innerWidth - 100) + 50;
this.targetY = window.innerHeight - 150;
}

// ===== LISTENERS DE MOUSE =====
addEventListeners() {
this.element.addEventListener('click', () => {
this.currentEmotion = 'waving';
this.emotionTimer = 2000;
this.startWaving();
this.updateEmotionVisuals();
});

this.element.addEventListener('mouseenter', () => {
this.element.style.cursor = 'grab';
if (this.currentEmotion !== 'waving') {
this.currentEmotion = 'happy';
this.updateEmotionVisuals();
}
});

this.element.addEventListener('mouseleave', () => {
setTimeout(() => {
if (this.currentEmotion === 'happy') {
this.selectRandomEmotion();
}
}, 500);
});
}

// ===== ANIMAR ACENANDO =====
startWaving() {
this.waveAnimation = 0;
}

// ===== ATUALIZAR POSIÇÃO (CAMINHAR) =====
updatePosition() {
const dx = this.targetX - this.x;
const dy = this.targetY - this.y;
const distance = Math.sqrt(dx * dx + dy * dy);

if (distance > 10) {
this.vx = (dx / distance) * this.speed;
this.vy = (dy / distance) * this.speed;
this.x += this.vx;
this.y += this.vy;

// Animação de caminhada
this.walkAnimation += 0.1;
} else {
this.vx = 0;
this.vy = 0;
this.walkAnimation = 0;
}

// Manter dentro da tela
this.x = Math.max(60, Math.min(window.innerWidth - 60, this.x));
this.y = Math.max(100, Math.min(window.innerHeight - 50, this.y));
}

// ===== ATUALIZAR VISUALS =====
updateVisuals() {
const transform = `translate(${this.x - 60}px, ${this.y - 70}px)`;
this.element.style.transform = transform;

// Animar pernas ao caminhar
const legLeft = this.element.querySelector('.leg-left');
const legRight = this.element.querySelector('.leg-right');

if (this.walkAnimation > 0) {
const legRotation = Math.sin(this.walkAnimation) * 15;
if (legLeft) legLeft.style.transform = `rotateZ(${legRotation}deg)`;
if (legRight) legRight.style.transform = `rotateZ(${-legRotation}deg)`;
}

// Animar braço ao acenar
const armLeft = this.element.querySelector('.arm-left');
const armRight = this.element.querySelector('.arm-right');

if (this.currentEmotion === 'waving' && this.waveAnimation >= 0) {
this.waveAnimation += 0.15;
const waveRotation = Math.sin(this.waveAnimation) * 45;
if (armRight) armRight.style.transform = `rotateZ(${waveRotation - 20}deg)`;

if (this.waveAnimation > Math.PI * 3) {
this.waveAnimation = -1;
}
} else {
// Posição normal dos braços
if (armLeft) armLeft.style.transform = `rotateZ(0deg)`;
if (armRight) armRight.style.transform = `rotateZ(0deg)`;
}

// Mexer cabeça quando bravo
if (this.currentEmotion === 'angry') {
this.headTilt = Math.sin(Date.now() * 0.005) * 5;
} else {
this.headTilt = 0;
}
}

// ===== ANIMAÇÃO PRINCIPAL =====
animate() {
this.updatePosition();
this.updateVisuals();

// Contador de emoção
if (this.emotionTimer > 0) {
this.emotionTimer -= 16; // ~60 FPS
}

requestAnimationFrame(() => this.animate());
}
}

// ===== INICIALIZAR =====
document.addEventListener('DOMContentLoaded', () => {
console.log('🤖 Robô mascota inicializado!');
new Robot();
});

// Recriar se página for redimensionada
window.addEventListener('resize', () => {
const existingRobot = document.getElementById('robot');
if (!existingRobot) {
new Robot();
}
});