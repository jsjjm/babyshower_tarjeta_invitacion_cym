// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {

    // Initialize welcome modal
    initializeWelcomeModal();

    // Add sparkle effect to the card
    addSparkleEffect();

    // Add click effects to buttons
    addButtonEffects();

    // Add parallax effect to floating bears
    addParallaxEffect();

    // Add music toggle and start music automatically
    addMusicToggle();

    // Add confetti effect for RSVP
    addConfettiEffect();

    // Prepare music (but don't start yet)
    prepareMusic();
});

// Sparkle effect function
function addSparkleEffect() {
    const card = document.querySelector('.card');

    card.addEventListener('mouseenter', function() {
        createSparkles();
    });

    // Create sparkles periodically
    setInterval(createSparkles, 3000);
}

function createSparkles() {
    const card = document.querySelector('.card');
    const sparkles = ['✨', '💫', '⭐', '🌟', '💎'];

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.fontSize = '1.5rem';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '1000';
            sparkle.style.animation = 'sparkleAnim 2s ease-out forwards';

            card.appendChild(sparkle);

            // Remove sparkle after animation
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 100);
    }
}

// Add CSS for sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkleAnim {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// Button effects
function addButtonEffects() {
    const buttons = document.querySelectorAll('.rsvp-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Handle RSVP
            if (this.classList.contains('yes')) {
                handleRSVP('yes');
            } else {
                handleRSVP('no');
            }
        });
    });
}

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .rsvp-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnim 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleAnim {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// Parallax effect for floating bears
function addParallaxEffect() {
    const bears = document.querySelectorAll('.floating-bear');

    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        bears.forEach((bear, index) => {
            const speed = (index + 1) * 0.5;
            const x = (mouseX - 0.5) * speed * 20;
            const y = (mouseY - 0.5) * speed * 20;

            bear.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Global audio variable
let globalAudio = null;
let isMusicPlaying = false;

// Prepare music (but don't start yet)
function prepareMusic() {
    globalAudio = new Audio('justin-cortado.mp3');
    globalAudio.loop = true;
    isMusicPlaying = false;
}

// Start music when modal is closed
function startMusic() {
    if (globalAudio && !isMusicPlaying) {
        globalAudio.play().then(() => {
            isMusicPlaying = true;
            updateMusicButton();
        }).catch(error => {
            console.log('Error playing music:', error);
        });
    }
}

// Start card animations
function startCardAnimations() {
    // Show main card
    const card = document.querySelector('.card');
    card.classList.add('show');

    // Show title
    const title = document.querySelector('.title');
    title.classList.add('show');

    // Show bear icons
    const bearIcons = document.querySelectorAll('.bear-icon');
    bearIcons.forEach(icon => {
        icon.classList.add('show');
    });

    // Show parent names
    const parentNames = document.querySelectorAll('.parents-title');
    parentNames.forEach(name => {
        name.classList.add('show');
    });

    // Show info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.classList.add('show');
    });

    // Show baby items
    const babyItems = document.querySelectorAll('.baby-item');
    babyItems.forEach(item => {
        item.classList.add('show');
    });
}

// Initialize welcome modal
function initializeWelcomeModal() {
    const modal = document.getElementById('welcomeModal');
    const closeBtn = document.getElementById('closeWelcome');
    const startBtn = document.getElementById('startButton');

    // Function to close modal and start music
    function closeModal() {
        modal.classList.add('hidden');

        // Wait for animation to complete before starting music and card animations
        setTimeout(() => {
            startMusic();
            // Completely hide modal after animation
            modal.style.display = 'none';
            // Start card animations
            startCardAnimations();
        }, 500);
    }

    // Close with X button
    closeBtn.addEventListener('click', closeModal);

    // Close with start button
    startBtn.addEventListener('click', closeModal);

    // Close by clicking outside the modal
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });
}

// Update music button appearance
function updateMusicButton() {
    const musicBtn = document.querySelector('.music-btn');
    if (musicBtn) {
        if (isMusicPlaying) {
            musicBtn.innerHTML = '🔇';
            musicBtn.style.background = 'rgba(255, 105, 180, 0.8)';
        } else {
            musicBtn.innerHTML = '🎵';
            musicBtn.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    }
}

// Music toggle function
function addMusicToggle() {
    const musicBtn = document.createElement('button');
    musicBtn.className = 'music-btn';
    musicBtn.innerHTML = '🎵';
    musicBtn.style.position = 'fixed';
    musicBtn.style.top = '20px';
    musicBtn.style.right = '20px';
    musicBtn.style.zIndex = '1000';
    musicBtn.style.background = 'rgba(255, 255, 255, 0.8)';
    musicBtn.style.border = 'none';
    musicBtn.style.borderRadius = '50%';
    musicBtn.style.width = '50px';
    musicBtn.style.height = '50px';
    musicBtn.style.fontSize = '1.5rem';
    musicBtn.style.cursor = 'pointer';
    musicBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';

    document.body.appendChild(musicBtn);

    musicBtn.addEventListener('click', function() {
        if (!isMusicPlaying) {
            // Play background music
            if (globalAudio) {
                globalAudio.play();
                isMusicPlaying = true;
            } else {
                globalAudio = new Audio('justin-cortado.mp3');
                globalAudio.loop = true;
                globalAudio.play();
                isMusicPlaying = true;
            }
        } else {
            // Stop background music
            if (globalAudio) {
                globalAudio.pause();
                globalAudio.currentTime = 0;
            }
            isMusicPlaying = false;
        }
        updateMusicButton();
    });

    // Update button appearance initially
    updateMusicButton();
}

// Confetti effect for RSVP
function addConfettiEffect() {
    const yesButton = document.querySelector('.rsvp-btn.yes');

    yesButton.addEventListener('click', function() {
        createConfetti();
    });
}

function createConfetti() {
    const colors = ['#ff69b4', '#4a90e2', '#4CAF50', '#FFD700', '#FF6B6B', '#A8E6CF'];
    const confettiCount = 100;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.animation = 'confettiFall 3s linear forwards';

            document.body.appendChild(confetti);

            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 3000);
        }, i * 20);
    }
}

// Add confetti animation CSS
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Handle RSVP responses
function handleRSVP(response) {
    const rsvpSection = document.querySelector('.rsvp');

    if (response === 'yes') {
        // Send WhatsApp message for confirmation
        sendWhatsAppMessage('yes');

        rsvpSection.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: #4CAF50; font-size: 1.5rem; margin-bottom: 10px;">¡Gracias por confirmar! 🎉</h3>
                <p style="color: #666; font-size: 1.1rem;">Nos emociona que puedas acompañarnos en este día tan especial.</p>
                <p style="color: #4CAF50; font-size: 1rem; margin-top: 10px; font-weight: 600;">✅ Mensaje enviado por WhatsApp</p>
                <div style="margin-top: 20px;">
                    <img src="oso-de-peluche.png" alt="Oso de peluche" style="width: 40px; height: 40px; margin: 0 5px;">
                    <img src="oso-de-peluche.png" alt="Oso de peluche" style="width: 40px; height: 40px; margin: 0 5px;">
                    <img src="oso-de-peluche.png" alt="Oso de peluche" style="width: 40px; height: 40px; margin: 0 5px;">
                </div>
            </div>
        `;
    } else {
        // Send WhatsApp message for decline
        sendWhatsAppMessage('no');

        rsvpSection.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3 style="color: #f44336; font-size: 1.5rem; margin-bottom: 10px;">Entendemos 😔</h3>
                <p style="color: #666; font-size: 1.1rem;">Te extrañaremos, pero esperamos verte pronto.</p>
                <p style="color: #f44336; font-size: 1rem; margin-top: 10px; font-weight: 600;">✅ Mensaje enviado por WhatsApp</p>
                <div style="margin-top: 20px;">
                    <span style="font-size: 2rem;">💕</span>
                </div>
            </div>
        `;
    }

    // Add a subtle animation to the response
    rsvpSection.style.animation = 'responseAppear 0.5s ease-out';
}

// Send WhatsApp message
function sendWhatsAppMessage(response) {
    const phoneNumber = '961948146';
    let message = '';

    if (response === 'yes') {
        message = `¡Hola! 🐻👶💕

Confirmo mi asistencia al Baby Shower de Christopher y Marianella.

📅 Fecha: Sábado 23 de Agosto
🕐 Hora: 7:00 PM
📍 Dirección: Calle Maché 509

¡Estoy emocionado/a de celebrar la llegada de su pequeña princesa! 🎉`;
    } else {
        message = `¡Hola! 🐻👶💕

Lamento informar que no podré asistir al Baby Shower de Christopher y Marianella.

📅 Fecha: Sábado 23 de Agosto
🕐 Hora: 7:00 PM
📍 Dirección: Calle Maché 509

Les deseo lo mejor en este momento tan especial. 💕`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(whatsappURL, '_blank');
}

// Add response animation CSS
const responseStyle = document.createElement('style');
responseStyle.textContent = `
    @keyframes responseAppear {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`;
document.head.appendChild(responseStyle);

// Add some extra interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to baby items
    const babyItems = document.querySelectorAll('.baby-item');
    babyItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3) rotate(15deg)';
            this.style.transition = 'all 0.3s ease';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add click effect to heart
    const heart = document.querySelector('.heart-divider');
    heart.addEventListener('click', function() {
        this.style.animation = 'heartBeat 0.5s ease-in-out';
        setTimeout(() => {
            this.style.animation = 'heartBeat 1.5s ease-in-out infinite';
        }, 500);
    });




});

// Add smooth scroll effect for any anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Add a subtle welcome effect
window.addEventListener('load', function() {
    console.log('¡Bienvenidos al Baby Shower! 🐻👶💕');
});