
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

// ===== NAVEGAÇÃO =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    // Abrir / Fechar ao clicar no botão
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Fechar ao clicar em qualquer link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Fechar ao clicar fora da gaveta
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
});


// =================================================
//                SISTEMA DE TEMAS
// ============================================= =====

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
// ===== PROJECTS MULTI-CAROUSEL & FILTER =====

// ===== PROJECTS MULTI-CAROUSEL & FILTER DIRECTO POR CARROSSEL =====

function initProjectsFilter() {
    const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
    const wrappers = document.querySelectorAll('.carousel-wrapper');

    // 1. LÓGICA DE MOVIMENTAÇÃO DE CADA CARROSSEL (SETAS E SCROLL)
    wrappers.forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const prevBtn = wrapper.querySelector('.carousel-arrow.prev');
        const nextBtn = wrapper.querySelector('.carousel-arrow.next');
        
        let currentIndex = 0;

        function moveCarousel() {
            const cards = wrapper.querySelectorAll('.project-card');
            if (cards.length === 0) return;

            const cardWidth = cards[0].getBoundingClientRect().width + 25; // Largura do card + gap
            const maxIndex = Math.max(0, cards.length - Math.floor(wrapper.offsetWidth / cardWidth));
            
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;

            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                const cards = wrapper.querySelectorAll('.project-card');
                const maxIndex = Math.max(0, cards.length - Math.floor(wrapper.offsetWidth / 350));
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    moveCarousel();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    moveCarousel();
                }
            });
        }

        // Função para resetar a posição do carrossel para o início
        wrapper.resetCarousel = () => {
            currentIndex = 0;
            track.style.transform = 'translateX(0px)';
        };

        window.addEventListener('resize', moveCarousel);
    });

    // 2. LÓGICA DO FILTRO (MAPEMENTO DIRETO: 1 BOTÃO = 1 CARROSSEL)
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Atualiza a classe ativa visual do botão
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Percorre os 3 carrosséis e decide qual exibir baseado no índice
            wrappers.forEach((wrapper, index) => {
                wrapper.resetCarousel(); // Volta a posição do carrossel para o 1º item

                if (filter === 'all') {
                    // Botão 'Todos': Exibe os 3 carrosséis
                    wrapper.style.display = 'block';
                    wrapper.style.animation = 'fadeInUp 0.6s ease forwards';
                } 
                else if (filter === 'frontend' && index === 0) {
                    // Botão 'Front-end': Apenas o 1º carrossel (index 0)
                    wrapper.style.display = 'block';
                    wrapper.style.animation = 'fadeInUp 0.6s ease forwards';
                } 
                else if (filter === 'backend' && index === 1) {
                    // Botão 'Back-end': Apenas o 2º carrossel (index 1)
                    wrapper.style.display = 'block';
                    wrapper.style.animation = 'fadeInUp 0.6s ease forwards';
                } 
                else if (filter === 'fullstack' && index === 2) {
                    // Botão 'Full Stack': Apenas o 3º carrossel (index 2)
                    wrapper.style.display = 'block';
                    wrapper.style.animation = 'fadeInUp 0.6s ease forwards';
                } 
                else {
                    // Esconde todos os outros que não coincidem com o botão clicado
                    wrapper.style.display = 'none';
                }
            });
        });
    });
}

// Inicializador
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initSkillsFilter === "function") initSkillsFilter();
    initProjectsFilter();
    if (typeof initTypingEffect === "function") initTypingEffect();
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
        if (!typingText) return;
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingText.textContent = currentPhrase.substring(0, charIndex);
        let speed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            speed = 2000; 
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500; 
        }

        setTimeout(type, speed);
    }

    type();
}

// Inicializador Único Confiável
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initSkillsFilter === "function") initSkillsFilter();
    initProjectsFilter();
    initTypingEffect();
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
// ===== TESTIMONIAL CAROUSEL =====

function initTestimonialCarousel() {
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const carouselContainer = document.getElementById('testimonialsCarousel');

    if (!cards.length) return;

    let currentIndex = 0;
    let autoPlayTimer = null;
    const INTERVAL_TIME = 7000;

    function showTestimonial(index) {
        // Trata o estouro de índice
        if (index >= cards.length) currentIndex = 0;
        else if (index < 0) currentIndex = cards.length - 1;
        else currentIndex = index;

        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        cards[currentIndex].classList.add('active');
        if (dots[currentIndex]) {
            dots[currentIndex].classList.add('active');
        }

        resetAutoPlay();
    }

    function nextSlide() {
        showTestimonial(currentIndex + 1);
    }

    function prevSlide() {
        showTestimonial(currentIndex - 1);
    }

    function startAutoPlay() {
        if (!autoPlayTimer) {
            autoPlayTimer = setInterval(nextSlide, INTERVAL_TIME);
        }
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
        startAutoPlay();
    }

    // Event Listeners dos Botões
    prevBtn?.addEventListener('click', prevSlide);
    nextBtn?.addEventListener('click', nextSlide);

    // Event Listeners dos Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showTestimonial(index);
        });
    });

    // Pausa o carrossel quando o mouse estiver em cima do card
    carouselContainer?.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    carouselContainer?.addEventListener('mouseleave', startAutoPlay);

    // Inicializa o carrossel
    showTestimonial(0);
}

// Inicia ao carregar o DOM
document.addEventListener('DOMContentLoaded', initTestimonialCarousel);

// ========================================================================================
//                                   FAQ 
// ==========================================================================================================

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
document.querySelectorAll('a[href="https://w.app/gk21pe"]').forEach(anchor => {
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