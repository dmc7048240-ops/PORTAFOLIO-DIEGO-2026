document.addEventListener("DOMContentLoaded", () => {
    // 1. ARRAY DE CERTIFICADOS
    const certificadosDados = [
        { titulo: "HTML5", instituicao: "Dev Club", ano: "2026", emoji:"https://img.icons8.com/?size=100&id=20909&format=png&color=000000",imgSrc: "./Certificados/Certificado - HTML.png" },
        { titulo: "CSS3", instituicao: "Dev Club", ano: "2026", emoji:"https://img.icons8.com/?size=100&id=AY9OsTxmB7MH&format=png&color=000000", imgSrc: "./Certificados/Certificado - CSS Intermediário.png" },
        { titulo: "JavaScript", instituicao: "Dev Club", ano: "2026", emoji:"https://img.icons8.com/?size=100&id=108784&format=png&color=000000", imgSrc: "./Certificados/Certificado - JavaScript pt. V - A Nova Ordem de Dados.png" },
        { titulo: "Git-Github", instituicao: "Dev Club", ano: "2026", emoji:"https://img.icons8.com/?size=100&id=LoL4bFzqmAa0&format=png&color=000000", imgSrc: "./Certificados/Certificado - Git & GitHub.png" },
        { titulo: "JavaScript Avançado", instituicao: "Dev Club", ano: "2026", emoji:"https://img.icons8.com/?size=100&id=PVRwpTTPMITk&format=png&color=000000", imgSrc: "./Certificados/Certificado - JavaScript pt. VI - A Ascensão do Async_Await.png"},
        { titulo: "CSS3 Avançado", instituicao: "Dev Club", ano: "2026", emoji:"https://img.icons8.com/?size=100&id=3BTBsJs5myRy&format=png&color=000000", imgSrc: "./Certificados/Certificado - CSS - Display GRID.png"},
        { titulo: "Node.js", instituicao: "Dev Club", ano: "2026", emoji:"https://img.icons8.com/?size=100&id=hsPbhkOH4FMe&format=png&color=000000", imgSrc: "./Certificados/Certificado - Node.png" },
        { titulo: "Engenharia de Prompt", instituicao: "Dev club", ano: "2026", emoji:"https://img.icons8.com/?size=100&id=OlaQxHnnC7U4&format=png&color=000000", imgSrc: "./Certificados/Captura de Tela (26).png" },
    ];

    const track = document.getElementById("coverflowTrack");
    const modal = document.getElementById("certModal");
    const modalImg = document.getElementById("certModalImg");
    const closeModal = document.querySelector(".cert-modal-close");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");

    // 2. GERAR CARDS DINAMICAMENTE
    certificadosDados.forEach((data) => {
        const card = document.createElement("div");
        card.classList.add("coverflow-card");

        card.innerHTML = `
            <div class="coverflow-img-wrapper">
                <img src="${data.imgSrc}" alt="${data.titulo}">
            </div>
            <div class="logo-emoji">
              <img src="${data.emoji}">
            </div>
            <h4>${data.titulo}</h4>
            <p>${data.instituicao}</p>
            <span class="cert-date">${data.ano}</span>
        `;

        track.appendChild(card);
    });

    // 3. FUNÇÃO DE REPOSICIONAMENTO 3D INFINITO
    function updateCoverflow() {
        const cards = Array.from(track.children);
        // O card do meio sempre será o centro visual do carrossel infinito
        const centerIndex = Math.floor(cards.length / 2); 

        cards.forEach((card, index) => {
            const offset = index - centerIndex;
            card.classList.remove("active");

            if (offset === 0) {
                // Card Central (Foco)
                card.classList.add("active");
                card.style.transform = `translateX(0) translateZ(150px) rotateY(0deg)`;
                card.style.zIndex = 10;
                card.style.opacity = "1";
                card.style.visibility = "visible";
            } else if (offset > 0) {
                // Cards à Direita
                const translateVal = (offset * 150) + 80;
                card.style.transform = `translateX(${translateVal}px) translateZ(0px) rotateY(-45deg)`;
                card.style.zIndex = 10 - offset;
                // Esconde se estiver muito longe para não quebrar a tela
                card.style.opacity = offset > 2 ? "0" : "0.6";
                card.style.visibility = offset > 2 ? "hidden" : "visible";
            } else {
                // Cards à Esquerda
                const translateVal = (offset * 150) - 80;
                card.style.transform = `translateX(${translateVal}px) translateZ(0px) rotateY(45deg)`;
                card.style.zIndex = 10 + offset;
                card.style.opacity = offset < -2 ? "0" : "0.6";
                card.style.visibility = offset < -2 ? "hidden" : "visible";
            }
        });
    }

    // 4. LÓGICA DO LOOP INFINITO (Move os elementos no DOM)
    function moverParaProximo() {
        // Pega o primeiro card e joga para o fim da esteira
        const primeiroCard = track.firstElementChild;
        track.appendChild(primeiroCard);
        updateCoverflow();
    }

    function moverParaAnterior() {
        // Pega o último card e joga para o início da esteira
        const ultimoCard = track.lastElementChild;
        track.insertBefore(ultimoCard, track.firstElementChild);
        updateCoverflow();
    }

    // 5. EVENTOS DOS BOTÕES
    nextBtn.addEventListener("click", moverParaProximo);
    prevBtn.addEventListener("click", moverParaAnterior);

    // 6. CLIQUE NOS CARDS (Interação)
    track.addEventListener("click", (e) => {
        const clickedCard = e.target.closest(".coverflow-card");
        if (!clickedCard) return;

        const cards = Array.from(track.children);
        const centerIndex = Math.floor(cards.length / 2);
        const clickedIndex = cards.indexOf(clickedCard);

        if (clickedIndex === centerIndex) {
            // Se clicou no card central ativo, abre o Zoom (Lightbox)
            const img = clickedCard.querySelector("img");
            modal.style.display = "block";
            modalImg.src = img.src;
            setTimeout(() => modalImg.classList.add("zoom"), 10);
        } else if (clickedIndex > centerIndex) {
            // Se clicou em um da direita, avança o carrossel
            moverParaProximo();
        } else {
            // Se clicou em um da esquerda, recua o carrossel
            moverParaAnterior();
        }
    });

    // 7. EVENTOS DO MODAL LIGHTBOX (Zoom da imagem)
    const fecharModal = () => {
        modalImg.classList.remove("zoom");
        setTimeout(() => modal.style.display = "none", 300);
    };

    closeModal.addEventListener("click", fecharModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) fecharModal();
    });

    // Inicializa o visual tridimensional ao carregar a página
    updateCoverflow();
});