/* ======================================== */
/* AVATAR.JS - INTERAÇÕES DO AVATAR */
/* ======================================== */

class Avatar {
constructor(containerId) {
this.container = document.getElementById(containerId);
this.particles = [];
this.init();
}

init() {
this.createParticles();
this.addMouseListener();
this.animate();
}

createParticles() {
const container = this.container.querySelector('.avatar-particles');
for (let i = 0; i < 20; i++) {
const particle = document.createElement('div');
particle.className = 'particle';
particle.style.cssText = `
left: ${Math.random() * 100}%;
top: ${Math.random() * 100}%;
animation: floatingElements ${3 + Math.random() * 3}s ease-in-out infinite;
`;
container.appendChild(particle);

this.particles.push({
el: particle,
angle: Math.random() * Math.PI * 2,
distance: Math.random() * 150 + 50
});
}
}

addMouseListener() {
document.addEventListener('mousemove', (e) => {
if (!this.container) return;

const rect = this.container.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
const distance = 20;

this.container.style.transform = `
translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)
`;
});

this.container.addEventListener('click', () => {
this.explodeParticles();
});
}

explodeParticles() {
const rect = this.container.getBoundingClientRect();
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;

for (let i = 0; i < 30; i++) {
const particle = document.createElement('div');
particle.className = 'particle particle-small';
particle.style.cssText = `
position: fixed;
left: ${centerX}px;
top: ${centerY}px;
pointer-events: none;
z-index: 1000;
`;
document.body.appendChild(particle);

const angle = (i / 30) * Math.PI * 2;
const velocity = 5 + Math.random() * 5;
const life = 1000;

const startTime = Date.now();
const animateParticle = () => {
const elapsed = Date.now() - startTime;
const progress = elapsed / life;

if (progress < 1) {
const x = Math.cos(angle) * velocity * elapsed;
const y = Math.sin(angle) * velocity * elapsed;
const opacity = 1 - progress;

particle.style.transform = `translate(${x}px, ${y}px)`;
particle.style.opacity = opacity;

requestAnimationFrame(animateParticle);
} else {
particle.remove();
}
};

animateParticle();
}
}

animate() {
requestAnimationFrame(() => this.animate());
}
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
new Avatar('avatarContainer');
});

