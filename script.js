// Configuração inicial do Canvas para as animações de Fogos de Artifício
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];

// Classe que define as propriedades físicas das partículas de fumaça e faíscas
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 6 + 2;
        this.friction = 0.95;
        this.gravity = 0.12;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.012;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.random() * 3 + 1.5, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.alpha -= this.decay;
    }
}

// Cria uma explosão circular em coordenadas específicas
function createFireworkExplosion(x, y) {
    const colors = ['#d69e2e', '#f6ad55', '#14829d', '#e53e3e', '#38a169', '#ffffff', '#e2e8f0'];
    const colorPalette = [
        colors[Math.floor(Math.random() * colors.length)],
        colors[Math.floor(Math.random() * colors.length)]
    ];
    const particleCount = 60; // Número de fagulhas por explosão
    
    for (let i = 0; i < particleCount; i++) {
        const particleColor = colorPalette[i % colorPalette.length];
        particles.push(new Particle(x, y, particleColor));
    }
}

// Loop contínuo que desenha as animações na tela
function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0) {
            particles.splice(i, 1);
        }
    }
}
animateCanvas();

// Sequência que gera 6 disparos de fogos consecutivos na tela
function triggerCelebrationSequence() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            const randomX = Math.random() * (width * 0.8) + (width * 0.1);
            const randomY = Math.random() * (height * 0.4) + (height * 0.15);
            createFireworkExplosion(randomX, randomY);
        }, i * 250);
    }
}

// Configura o evento de clique do botão Comemorar
const celebrateBtn = document.getElementById('btn-celebrate');
celebrateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    triggerCelebrationSequence();
});

// Configura o envio do formulário de inscrição
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    triggerCelebrationSequence();
    
    setTimeout(() => {
        alert("Inscrição confirmada com sucesso! Prepare seu diário de detetive! 🔍🎒");
        registerForm.reset();
    }, 500);
});

// --- LÓGICA DO ALTERNADOR DE TEMA (LIGHT / DARK MODE) ---
const themeToggleBtn = document.getElementById('theme-toggle-btn');

// Verifica se o usuário já escolheu uma preferência antes
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggleBtn.textContent = "🌙 Modo Escuro";
} else {
    // Escuro por padrão
    themeToggleBtn.textContent = "☀️ Modo Claro";
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
        themeToggleBtn.textContent = "🌙 Modo Escuro";
        localStorage.setItem('theme', 'light');
    } else {
        themeToggleBtn.textContent = "☀️ Modo Claro";
        localStorage.setItem('theme', 'dark');
    }
});