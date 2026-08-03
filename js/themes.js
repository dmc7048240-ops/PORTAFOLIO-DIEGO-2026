
/* ======================================== */
/* THEMES.JS - GERENCIADOR DE TEMAS */
/* ======================================== */

class ThemeManager {
constructor() {
this.themes = ['green', 'blue', 'red', 'purple', 'gold', 'cyan', 'white', 'black'];
this.currentTheme = localStorage.getItem('portfolio-theme') || 'green';
this.init();
}

init() {
this.applyTheme(this.currentTheme);
this.setupAutoSwap();
this.setupManualSwitch();
}

applyTheme(theme) {
document.body.className = `theme-${theme}`;
localStorage.setItem('portfolio-theme', theme);
this.currentTheme = theme;
this.updateThemeDisplay();
}

setupManualSwitch() {
const switcher = document.getElementById('themeSwitcher');
if (switcher) {
switcher.addEventListener('click', () => {
const nextIndex = (this.themes.indexOf(this.currentTheme) + 1) % this.themes.length;
this.applyTheme(this.themes[nextIndex]);
});
}
}

setupAutoSwap() {
setInterval(() => {
const nextIndex = (this.themes.indexOf(this.currentTheme) + 1) % this.themes.length;
this.applyTheme(this.themes[nextIndex]);
}, 5 * 60 * 1000); // 5 minutos
}

updateThemeDisplay() {
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

const switcher = document.getElementById('themeSwitcher');
if (switcher) {
switcher.textContent = icons[this.currentTheme] || '◉';
}
}
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
new ThemeManager();
});