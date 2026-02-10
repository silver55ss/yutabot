document.addEventListener('DOMContentLoaded', () => {
    
    // 1. فقاعات الخلفية
    const bubblesContainer = document.getElementById('bubbles');
    if (bubblesContainer) {
        function createBubble() {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            const size = Math.random() * 60 + 20 + 'px';
            bubble.style.width = size;
            bubble.style.height = size;
            bubble.style.left = Math.random() * 100 + '%';
            
            // تخصيص مدة الحركة
            bubble.style.animationDuration = Math.random() * 10 + 5 + 's';
            
            bubblesContainer.appendChild(bubble);
            
            // حذف الفقاعة بعد انتهائها
            setTimeout(() => {
                bubble.remove();
            }, 15000);
        }
        setInterval(createBubble, 800);
    }

    // 2. الكتابة التلقائية (Typewriter)
    const textElement = document.querySelector('.type-effect'); 
    if (textElement) {
        const words = ["أدوات للمطورين 💻", "ذكاء اصطناعي 🤖", "حماية مجموعات 🛡️", "ترفيه وألعاب 🎮"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIndex--);
            } else {
                textElement.textContent = currentWord.substring(0, charIndex++);
            }

            let speed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                speed = 2000; // انتظار ثانيتين بعد الكتابة
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }

            setTimeout(typeEffect, speed);
        }
        typeEffect();
    }

    // 3. ظهور العناصر عند السكرول (Scroll Reveal)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1 // يبدأ الظهور عند رؤية 10% من العنصر
    });

    const hiddenElements = document.querySelectorAll('.card, .api-wrapper, .dev-card');
    hiddenElements.forEach((el) => observer.observe(el));


    // 4. تأثير 3D Tilt للبطاقات
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
        });
    });

    // 5. زر النسخ
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const codeElement = btn.parentElement.querySelector('code');
            if (codeElement) {
                navigator.clipboard.writeText(codeElement.innerText);
                
                const icon = btn.querySelector('i');
                icon.className = 'fas fa-check';
                icon.style.color = '#38bdf8';
                
                setTimeout(() => {
                    icon.className = 'far fa-copy';
                    icon.style.color = '';
                }, 2000);
            }
        });
    });

});
