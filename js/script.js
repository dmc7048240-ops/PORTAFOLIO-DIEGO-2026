
/* ========================================
PORTFOLIO FUTURISTA - SCRIPT PRINCIPAL
======================================== */

// ===== INICIALIZAÇÃO DO DOCUMENTO =====

document.addEventListener('DOMContentLoaded', () => {
console.log('🌌 Iniciando Portfolio Futurista...');

// Inicializar componentes
initLoadingScreen();
initNavigation();
initScrollProgress();
initThemeSystem();
initScrollAnimations();
initContactForm();
initTestimonialCarousel();
initFAQ();
initBackToTop();
initSmoothScroll();

console.log('✨ Portfolio carregado com sucesso!');
});

// ===== LOADING SCREEN =====

function initLoadingScreen() {
const loadingScreen = document.getElementById('loadingScreen');
const loaderPercent = document.querySelector('.loader-percent');
const loaderStatus = document.querySelector('.loader-status');

const statuses = [
'Inicializando universo...',
'Criando galáxias...',
'Ativando partículas...',
'Sincronizando temas...',
'Carregando portfólio...',
'Tudo pronto!'
];

let progress = 0;
let statusIndex = 0;

const interval = setInterval(() => {
progress += Math.random() * 30;
progress = Math.min(progress, 100);

if (progress >= 20 && statusIndex === 0) statusIndex = 1;
if (progress >= 40 && statusIndex === 1) statusIndex = 2;
if (progress >= 60 && statusIndex === 2) statusIndex = 3;
if (progress >= 80 && statusIndex === 3) statusIndex = 4;
if (progress >= 95 && statusIndex === 4) statusIndex = 5;

loaderPercent.textContent = Math.floor(progress) + '%';
loaderStatus.textContent = statuses[statusIndex];

if (progress >= 100) {
clearInterval(interval);
setTimeout(() => {
loadingScreen.classList.add('hidden');
}, 800);
}
}, 400);
}

// ===== NAVEGAÇÃO =====

function initNavigation() {
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
menuToggle.addEventListener('click', () => {
menuToggle.classList.toggle('active');
navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em link
navLinks.forEach(link => {
link.addEventListener('click', () => {
menuToggle.classList.remove('active');
navMenu.classList.remove('active');

// Atualizar active link
navLinks.forEach(l => l.classList.remove('active'));
link.classList.add('active');
});
});

// Navbar glassmorphism ao scroll
window.addEventListener('scroll', () => {
if (window.scrollY > 50) {
navbar.classList.add('scrolled');
} else {
navbar.classList.remove('scrolled');
}
});
}

// ===== SCROLL PROGRESS BAR =====

function initScrollProgress() {
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
const scrollTop = window.scrollY;
const docHeight = document.documentElement.scrollHeight - window.innerHeight;
const scrollPercent = (scrollTop / docHeight) * 100;

scrollProgress.style.width = scrollPercent + '%';
});
}

// ===== SISTEMA DE TEMAS =====

function initThemeSystem() {
const themeSwitcher = document.getElementById('themeSwitcher');
const themes = ['green', 'blue', 'red', 'purple', 'gold', 'cyan', 'white', 'black'];
let currentThemeIndex = 0;

// Aplicar tema salvo
const savedTheme = localStorage.getItem('portfolio-theme') || 'green';
applyTheme(savedTheme);
currentThemeIndex = themes.indexOf(savedTheme);

// Switcher manual
themeSwitcher.addEventListener('click', () => {
currentThemeIndex = (currentThemeIndex + 1) % themes.length;
applyTheme(themes[currentThemeIndex]);
});

// Auto-swap a cada 5 minutos
setInterval(() => {
currentThemeIndex = (currentThemeIndex + 1) % themes.length;
applyTheme(themes[currentThemeIndex]);
}, 5 * 60 * 1000); // 5 minutos

function applyTheme(theme) {
document.body.className = `theme-${theme}`;
localStorage.setItem('portfolio-theme', theme);
updateThemeIcon(theme);
}

function updateThemeIcon(theme) {
const icons = {
green: '🟢',
blue: '🔵',
red: '🔴',
purple: '🟣',
gold: '🟡',
cyan: '🔷',
white: '⚪',
black: '⚫'
};
themeSwitcher.textContent = icons[theme] || '◉';
}
}

// ===== ANIMAÇÕES DE SCROLL =====

function initScrollAnimations() {
const observerOptions = {
threshold: 0.1,
rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('fadeInUp');

// Animar números
if (entry.target.classList.contains('stat-number')) {
animateCounter(entry.target);
}

// Animar barras de progresso
if (entry.target.classList.contains('skill-bar')) {
const width = entry.target.parentElement.parentElement.querySelector('.skill-percent').textContent;
entry.target.style.animation = 'none';
setTimeout(() => {
entry.target.style.animation = 'skillFill 2s ease-out forwards';
}, 10);
}
}
});
}, observerOptions);

// Observar elementos
document.querySelectorAll('.skill-card, .project-card, .service-card, .stat-item, .timeline-item').forEach(el => {
observer.observe(el);
});
}

// Animar contadores
function animateCounter(element) {
const target = parseInt(element.getAttribute('data-target'));
const duration = 2000;
const start = Date.now();

function update() {
const elapsed = Date.now() - start;
const progress = Math.min(elapsed / duration, 1);
const value = Math.floor(target * progress);

element.textContent = value;

if (progress < 1) {
requestAnimationFrame(update);
} else {
element.textContent = target;
}
}

update();
}

// ===== SKILLS FILTER =====

function initSkillsFilter() {
const filterBtns = document.querySelectorAll('.skills-filter .filter-btn');
const skillCards = document.querySelectorAll('.skill-card');

filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
const filter = btn.getAttribute('data-filter');

filterBtns.forEach(b => b.classList.remove('active'));
btn.classList.add('active');

skillCards.forEach(card => {
card.style.display = 'none';
card.style.animation = 'none';

if (filter === 'all' || card.getAttribute('data-category') === filter) {
setTimeout(() => {
card.style.display = 'grid';
card.style.animation = 'fadeInUp 0.6s ease forwards';
}, 10);
}
});
});
});
}

// ===== PROJECTS FILTER =====

function initProjectsFilter() {
const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
const filter = btn.getAttribute('data-filter');

filterBtns.forEach(b => b.classList.remove('active'));
btn.classList.add('active');

projectCards.forEach(card => {
card.style.display = 'none';
card.style.animation = 'none';

if (filter === 'all' || card.getAttribute('data-category') === filter) {
setTimeout(() => {
card.style.display = 'block';
card.style.animation = 'fadeInUp 0.6s ease forwards';
}, 10);
}
});
});
});
}

// Inicializar filters
document.addEventListener('DOMContentLoaded', () => {
initSkillsFilter();
initProjectsFilter();
});

// ===== TYPING EFFECT =====

function initTypingEffect() {
const typingText = document.getElementById('typingText');
const phrases = [
'Full Stack Developer',
'JavaScript Expert',
'Front-End Developer',
'Back-End Developer',
'UI Designer',
'API Developer',
'Creative Programmer',
'Software Engineer'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
const currentPhrase = phrases[phraseIndex];

if (isDeleting) {
charIndex--;
} else {
charIndex++;
}

typingText.textContent = currentPhrase.substring(0, charIndex);

let speed = 100;

if (isDeleting) {
speed = 50;
}

if (!isDeleting && charIndex === currentPhrase.length) {
isDeleting = true;
speed = 2000; // Pausa antes de deletar
} else if (isDeleting && charIndex === 0) {
isDeleting = false;
phraseIndex = (phraseIndex + 1) % phrases.length;
speed = 500; // Pausa antes de próxima frase
}

setTimeout(type, speed);
}

type();
}

document.addEventListener('DOMContentLoaded', initTypingEffect);

// ===== TESTIMONIAL CAROUSEL =====

function initTestimonialCarousel() {
const cards = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.carousel-dots .dot');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

let currentIndex = 0;

function showTestimonial(index) {
cards.forEach(card => card.classList.remove('active'));
dots.forEach(dot => dot.classList.remove('active'));

cards[index].classList.add('active');
dots[index].classList.add('active');
}

prevBtn?.addEventListener('click', () => {
currentIndex = (currentIndex - 1 + cards.length) % cards.length;
showTestimonial(currentIndex);
});

nextBtn?.addEventListener('click', () => {
currentIndex = (currentIndex + 1) % cards.length;
showTestimonial(currentIndex);
});

dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
currentIndex = index;
showTestimonial(currentIndex);
});
});

// Auto-carousel
setInterval(() => {
currentIndex = (currentIndex + 1) % cards.length;
showTestimonial(currentIndex);
}, 8000);
}

// ===== FAQ =====

function initFAQ() {
const details = document.querySelectorAll('.faq-item');

details.forEach(detail => {
detail.addEventListener('toggle', () => {
if (detail.open) {
details.forEach(d => {
if (d !== detail) d.open = false;
});
}
});
});
}

// ===== FORMULÁRIO DE CONTATO =====

function initContactForm() {
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (!form) return;

form.addEventListener('submit', async (e) => {
e.preventDefault();

const formData = new FormData(form);
const data = Object.fromEntries(formData);

// Validações
if (!data.name || !data.email || !data.message) {
showStatus('Por favor, preencha todos os campos obrigatórios.', 'error');
return;
}

if (!isValidEmail(data.email)) {
showStatus('Por favor, insira um email válido.', 'error');
return;
}

try {
// Simular envio (em produção, enviar para um servidor)
showStatus('Enviando mensagem...', 'loading');

// Aqui você pode fazer um fetch para um servidor
// const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });

// Por enquanto, simular sucesso após 2 segundos
setTimeout(() => {
showStatus('✓ Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
form.reset();
}, 2000);

} catch (error) {
showStatus('Erro ao enviar mensagem. Tente novamente.', 'error');
}
});

function showStatus(message, type) {
formStatus.textContent = message;
formStatus.className = `form-status ${type}`;

if (type === 'success') {
setTimeout(() => {
formStatus.style.display = 'none';
}, 5000);
}
}

function isValidEmail(email) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
}

// ===== BACK TO TOP =====

function initBackToTop() {
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
if (window.scrollY > 300) {
backToTop.style.display = 'block';
} else {
backToTop.style.display = 'none';
}
});

backToTop?.addEventListener('click', () => {
window.scrollTo({
top: 0,
behavior: 'smooth'
});
});
}

// ===== SMOOTH SCROLL =====

function initSmoothScroll() {
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
e.preventDefault();

const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});
}

// ===== UTILITÁRIOS =====

// Função de debounce
function debounce(func, wait) {
let timeout;
return function executedFunction(...args) {
const later = () => {
clearTimeout(timeout);
func(...args);
};
clearTimeout(timeout);
timeout = setTimeout(later, wait);
};
}

// Função de throttle
function throttle(func, limit) {
let inThrottle;
return function(...args) {
if (!inThrottle) {
func.apply(this, args);
inThrottle = true;
setTimeout(() => inThrottle = false, limit);
}
};
}

// Exportar para uso em outros scripts
window.Portfolio = {
debounce,
throttle
};

console.log('🚀 Scripts carregados e prontos!');