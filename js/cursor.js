
/* ======================================== */
/* CURSOR.JS - CURSOR CUSTOMIZADO */
/* ======================================== */

class CustomCursor {
constructor(cursorId) {
this.cursor = document.getElementById(cursorId);
this.x = 0;
this.y = 0;
this.trails = [];
this.init();
}

init() {
document.addEventListener('mousemove', (e) => this.onMouseMove(e));
document.addEventListener('mouseenter', () => this.show());
document.addEventListener('mouseleave', () => this.hide());
this.animate();
}

onMouseMove(e) {
this.x = e.clientX;
this.y = e.clientY;

this.cursor.style.left = this.x + 'px';
this.cursor.style.top = this.y + 'px';

// Criar trail
if (Math.random() > 0.8) {
const trail = document.createElement('div');
trail.className = 'cursor';
trail.style.cssText = `
left: ${this.x}px;
top: ${this.y}px;
opacity: 0.3;
pointer-events: none;
`;
document.body.appendChild(trail);

setTimeout(() => trail.remove(), 500);
}
}

show() {
this.cursor.style.opacity = '1';
}

hide() {
this.cursor.style.opacity = '0';
}

animate() {
requestAnimationFrame(() => this.animate());
}
}

// Inicializar e ocultar cursor padrão
document.addEventListener('DOMContentLoaded', () => {
new CustomCursor('customCursor');
document.body.style.cursor = 'none';
});
