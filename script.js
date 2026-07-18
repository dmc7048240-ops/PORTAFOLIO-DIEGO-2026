const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger) {
    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('ativo');
        menu.classList.toggle('ativo');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('ativo');
            menu.classList.remove('ativo');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) {
            hamburger.classList.remove('ativo');
            menu.classList.remove('ativo');
        }
    });
}