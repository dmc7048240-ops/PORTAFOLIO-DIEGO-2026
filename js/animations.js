/* ======================================== */
/* ANIMATIONS.JS - GERENCIADOR DE ANIMAÇÕES */
/* ======================================== */

class AnimationController {
constructor() {
this.observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};
this.init();
}

init() {
this.setupScrollAnimations();
this.setupHoverEffects();
this.setupParallax();
}

setupScrollAnimations() {
const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('fadeInUp');
}
});
}, this.observerOptions);

document.querySelectorAll('.skill-card, .project-card, .service-card').forEach(el => {
observer.observe(el);
});
}

setupHoverEffects() {
document.querySelectorAll('.btn, .skill-card, .project-card').forEach(el => {
el.addEventListener('mouseenter', function() {
this.style.transform = 'translateY(-10px) scale(1.05)';
});

el.addEventListener('mouseleave', function() {
this.style.transform = 'translateY(0) scale(1)';
});
});
}

setupParallax() {
window.addEventListener('scroll', () => {
const scrolled = window.pageYOffset;
const parallaxElements = document.querySelectorAll('[data-parallax]');

parallaxElements.forEach(el => {
const speed = el.getAttribute('data-parallax') || 0.5;
el.style.transform = `translateY(${scrolled * speed}px)`;
});
});
}
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
new AnimationController();
});
