document.addEventListener('DOMContentLoaded', () => {
    const pages = [
        document.getElementById('page1'),
        document.getElementById('page2'),
        document.getElementById('page3'),
        document.getElementById('page4')
    ];

    let crushName = "";
    let correctRoseIndex = Math.floor(Math.random() * 3);
    const bgMusic = document.getElementById('bg-music');
    const musicToggle = document.getElementById('music-toggle');
    let isMusicPlaying = false;

    // --- Background Particles ---
    const bgContainer = document.getElementById('bg-animation');

    function createParticle(type) {
        const particle = document.createElement('div');
        particle.classList.add(type);
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = Math.random() * 3 + 4 + 's';
        particle.innerHTML = type === 'petal' ? (Math.random() > 0.5 ? '🌸' : '🌹') : '♥️';
        particle.style.fontSize = Math.random() * 15 + 15 + 'px';
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        bgContainer.appendChild(particle);
        setTimeout(() => particle.remove(), 7000);
    }

    // Initial petals
    setInterval(() => createParticle('petal'), 400);

    // --- Page Transitions ---
    function showPage(index) {
        pages.forEach((page, i) => {
            if (i === index) {
                page.classList.remove('hidden');
                page.classList.add('fade-in');
            } else {
                page.classList.add('hidden');
                page.classList.remove('fade-in');
            }
        });

        // Special effects for specific pages
        if (index === 3) {
            setInterval(() => createParticle('heart'), 800);
        }
    }

    // --- Sparkle Effect ---
    function createSparkle(e) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.position = 'fixed';
        sparkle.style.left = e.clientX + 'px';
        sparkle.style.top = e.clientY + 'px';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.fontSize = '20px';
        sparkle.style.zIndex = '1000';
        document.body.appendChild(sparkle);

        const animation = sparkle.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px) scale(0)`, opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.4, 1)'
        });

        animation.onfinish = () => sparkle.remove();
    }

    document.addEventListener('click', createSparkle);

    // --- Music Toggle ---
    musicToggle.addEventListener('click', () => {
        if (!isMusicPlaying) {
            bgMusic.play().catch(err => console.log("Audio play failed:", err));
            musicToggle.innerText = '🔊';
            isMusicPlaying = true;
        } else {
            bgMusic.pause();
            musicToggle.innerText = '🎵';
            isMusicPlaying = false;
        }
    });

    // --- Page 1 Logic ---
    document.getElementById('btn1').addEventListener('click', () => {
        const input = document.getElementById('crushName');
        crushName = input.value.trim() || "Someone Special";
        document.getElementById('welcomeMsg').innerText = `Happy Rose Day, ${crushName} 💕`;
        showPage(1);

        // Auto reveal text on Page 2 after switch
        setTimeout(() => {
            const revealText = document.getElementById('revealText');
            revealText.classList.remove('hidden');
            revealText.style.opacity = "1";
        }, 1200);
    });

    // --- Page 2 Logic ---
    document.getElementById('btn2').addEventListener('click', () => {
        showPage(2);
    });

    // --- Page 3 Logic (Rose Puzzle) ---
    const roses = document.querySelectorAll('.rose');
    const puzzleResult = document.getElementById('puzzleResult');
    const catGif = document.getElementById('catGif');
    const resultMsg = document.getElementById('resultMsg');
    const btn3 = document.getElementById('btn3');
    const btnRetry = document.getElementById('btnRetry');

    roses.forEach((rose, index) => {
        rose.addEventListener('click', () => {
            // Disable further clicks
            roses.forEach(r => r.style.pointerEvents = 'none');

            if (index === correctRoseIndex) {
                rose.classList.add('bloom');
                setTimeout(() => {
                    puzzleResult.classList.remove('hidden');
                    catGif.src = "./assets/assets:happy-cat.gif";
                    resultMsg.innerText = `You chose the right rose, ${crushName} 😻`;
                    btn3.classList.remove('hidden');
                    btnRetry.classList.add('hidden');
                }, 800);
            } else {
                rose.classList.add('wilt');
                setTimeout(() => {
                    puzzleResult.classList.remove('hidden');
                    catGif.src = "./assets/assets:sad-cat.gif";
                    resultMsg.innerText = `Oops! Try again, ${crushName} 😿`;
                    btnRetry.classList.remove('hidden');
                    btn3.classList.add('hidden');
                }, 800);
            }
        });
    });

    btnRetry.addEventListener('click', () => {
        puzzleResult.classList.add('hidden');
        roses.forEach(rose => {
            rose.classList.remove('bloom', 'wilt');
            rose.style.pointerEvents = 'auto';
            rose.style.opacity = '1';
        });
        correctRoseIndex = Math.floor(Math.random() * 3);
    });

    // --- Page 4 Logic (Letter) ---
    btn3.addEventListener('click', () => {
        showPage(3);
        const letterContent = document.getElementById('letterContent');
        letterContent.innerHTML = `
            <p style="font-family: 'Dancing Script', cursive; font-size: 1.5rem; color: var(--deep-pink);">Dear ${crushName},</p>
            <p style="font-size: 1.2rem; margin: 15px 0; color: #ff1e7c; font-weight: 600;">
                Happy Rose Day 🌹
            </p>
            <p>Just like this rose, my feelings for you are soft,simple and real.</p>
            <p>I would choose you over anything in a heartbeat so I wanted to ask you that would you be my valentine!!🌹</p>
            <p style="font-size: 1.1rem; font-weight: 500;">Always keep smiling ywaar ♥️</p>
            <div style="margin-top: 30px; border-top: 1px dashed var(--primary-pink); padding-top: 15px;">
                <p style="font-family: 'Dancing Script', cursive; font-size: 1.4rem; margin: 0;">With love,</p>
                <p style="font-family: 'Pacifico', cursive; color: var(--deep-pink); margin: 0;">by Vedanth</p>
            </div>
        `;
    });

    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const envelope = document.getElementById('envelope');
    const letterInEnvelope = document.getElementById('letterContent');

    envelopeWrapper.addEventListener('click', () => {
        if (!envelope.classList.contains('open')) {
            envelope.classList.add('open');
            letterInEnvelope.scrollTop = 0;
        }
    });
});
