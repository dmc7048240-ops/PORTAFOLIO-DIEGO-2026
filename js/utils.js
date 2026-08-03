/* ======================================== */
/* UTILS.JS - FUNÇÕES UTILITÁRIAS */
/* ======================================== */

// Debounce
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

// Throttle
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

// Detectar dispositivo
const isMobile = () => /Mobile|Android|iPhone/.test(navigator.userAgent);

// Gerar ID único
const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

// Clonar objeto
const deepClone = (obj) => JSON.parse(JSON.stringify(obj));

// Delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Validar email
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Converter Hex para RGB
const hexToRgb = (hex) => {
const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
return result ? {
r: parseInt(result[1], 16),
g: parseInt(result[2], 16),
b: parseInt(result[3], 16)
} : null;
};

// Animação de números
const animateValue = (element, start, end, duration) => {
let startTimestamp = null;
const step = (timestamp) => {
if (!startTimestamp) startTimestamp = timestamp;
const progress = Math.min((timestamp - startTimestamp) / duration, 1);
element.textContent = Math.floor(progress * (end - start) + start);
if (progress < 1) {
window.requestAnimationFrame(step);
}
};
window.requestAnimationFrame(step);
};

// Efeito de digitação
const typeWriter = (element, text, speed = 100) => {
let index = 0;
element.textContent = '';

const type = () => {
if (index < text.length) {
element.textContent += text.charAt(index);
index++;
setTimeout(type, speed);
}
};

type();
};

// Copiar para clipboard
const copyToClipboard = (text) => {
navigator.clipboard.writeText(text).then(() => {
console.log('Copiad para clipboard!');
});
};

// Scroll suave
const smoothScroll = (target, duration = 1000) => {
const element = typeof target === 'string' ? document.querySelector(target) : target;
if (!element) return;

const targetPosition = element.getBoundingClientRect().top + window.scrollY;
const startPosition = window.scrollY;
let startTimestamp = null;

const scroll = (timestamp) => {
if (!startTimestamp) startTimestamp = timestamp;
const elapsed = timestamp - startTimestamp;
const run = ease(elapsed / duration);
window.scrollTo(0, startPosition + (targetPosition - startPosition) * run);
if (elapsed < duration) requestAnimationFrame(scroll);
};

const ease = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

requestAnimationFrame(scroll);
};

// Verificar se elemento está em view
const isInView = (element) => {
const rect = element.getBoundingClientRect();
return (
rect.top >= 0 &&
rect.left >= 0 &&
rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
rect.right <= (window.innerWidth || document.documentElement.clientWidth)
);
};

// Armazenar dados localmente
const storage = {
set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
get: (key) => {
try {
return JSON.parse(localStorage.getItem(key));
} catch (e) {
return localStorage.getItem(key);
}
},
remove: (key) => localStorage.removeItem(key),
clear: () => localStorage.clear()
};

// Fazer fetch com tratamento
const fetchAPI = async (url, options = {}) => {
try {
const response = await fetch(url, {
headers: {
'Content-Type': 'application/json',
...options.headers
},
...options
});

if (!response.ok) {
throw new Error(`HTTP error! status: ${response.status}`);
}

return await response.json();
} catch (error) {
console.error('Erro na requisição:', error);
throw error;
}
};

// Exportar para uso global
window.Utils = {
debounce,
throttle,
isMobile,
generateId,
deepClone,
delay,
validateEmail,
hexToRgb,
animateValue,
typeWriter,
copyToClipboard,
smoothScroll,
isInView,
storage,
fetchAPI
};

console.log('📚 Utilitários carregados!');