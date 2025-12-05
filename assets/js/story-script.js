document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const boringLayer = document.getElementById('boring-layer');
    const redditLayer = document.getElementById('reddit-layer');
    let hasGlitched = false;

    // --- TESTI ---
    const introDialogue = "Stop right there.\n\nYou were actually going to read that? It looked like a tax return form from 1995. How... quaint.\n\nYou are currently in the 'Real World'. Out there, people lie. They say they love art house cinema and eat kale. But I know the truth. I know what they really type at 3 AM.\n\nI am Mr. Reddit. And I'm going to show you the world not as it is on a map, but as it actually exists in the hidden \"Reddit realm\".";
    
    const disclaimerDialogue = "Welcome to the Reddit World.\n\nBefore we start, a Mandatory Disclaimer from the Department of Internet Honesty:\n\nEverything you are about to see is biased. Heavily. Our population is skewed. It’s mostly male, mostly tech-savvy, and mostly people who have way too many opinions about things that don't matter.\n\nIf you are looking for a representative sample of your grandmother’s knitting circle, leave now. If you want raw, unfiltered, and occasionally unhinged human data... stay.\n\nLet’s look at the raw materials first.";

    const inventoryDialogue = "Here it is. The inventory.\n\n858,488 posts. We scraped them from the digital floor. 67,180 unique communities.\n\nFrom r/geopolitics discussing nuclear treaties to r/catstandingup where people only comment 'Cat.', this is the chaotic soup of humanity.\n\nWe didn't filter it. We didn't clean it. It smells like old pizza and controversy. Perfect.";

    // TESTI SCENE 1 (Dividiamo il dialogo)
    const s1_Part1 = "Okay, let’s check our inventory before we enter the jungle.\n\nYou think we are just guessing? No. We brought heavy machinery.\n\nLook at the scope of this madness.";

    const s1_Part2 = "Did you catch that? 86 different ways to dissect a sentence.\n\nWe know if you are talking about God (LIWC_Relig), money, or just using too many pronouns. We literally have a mathematical vector for your feelings.\n\nVADER checks your mood. LIWC checks your soul.\n\nNow that you know how we listen... let's hear what the world is screaming.";

    // CONFIGURAZIONE
    const scenarios = {
        'intro-text': introDialogue,
        'disclaimer-text': disclaimerDialogue,
        'scene-1-text': inventoryDialogue,
        's1-part1': s1_Part1,
        's1-part2': s1_Part2
    };
    
    const typedStatus = {
        'intro-text': false,
        'disclaimer-text': false,
        'scene-1-text': false,
        's1-part1': false, 
        's1-part2': false
    };

    // --- TRIGGER GLITCH (Intro) ---
    const triggerGlitch = () => {
        if (hasGlitched) return;
        hasGlitched = true;
        body.classList.add('glitch-active');
        setTimeout(() => {
            body.classList.remove('boring-mode');
            body.classList.add('dark-mode');
            body.classList.remove('glitch-active');
            if (boringLayer) boringLayer.style.display = 'none';
            if (redditLayer) redditLayer.style.display = 'block';
            startTypeWriter('intro-text');
            initObserver();
        }, 3000);
    };

    // --- OBSERVER ---
    function initObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.step').forEach(s => s.classList.remove('active-scene'));
                    entry.target.classList.add('active-scene');

                    const sectionId = entry.target.id;
                    const targetId = entry.target.querySelector('.type-target')?.id;

                    // Gestione speciale Scena 1
                    if (sectionId === 'scene-1') {
                        playScene1Sequence();
                    } 
                    // Gestione standard
                    else if (targetId && scenarios[targetId] && !typedStatus[targetId]) {
                        startTypeWriter(targetId);
                    }
                }
            });
        }, { threshold: 0.3 }); 

        document.querySelectorAll('.step').forEach(step => observer.observe(step));
    }

    // --- SEQUENZA SCENA 1 (AGGIORNATA) ---
    function playScene1Sequence() {
        if (typedStatus['s1-part1']) return;

        // 1. Scrivi Prima Parte (Mr. Reddit)
        startTypeWriter('s1-part1', () => {
            
            // 2. Fai entrare la Nuvola Narratore
            const cloud = document.getElementById('narrator-cloud');
            cloud.classList.add('slide-in-active');

            // 3. Pausa lettura (es. 5-6 secondi)
            setTimeout(() => {
                
                // 4. Mostra la seconda riga (Avatar + Box)
                const row2 = document.getElementById('row-part-2');
                row2.classList.remove('hidden-opacity');
                row2.classList.add('visible-opacity');
                
                // Scrolla leggermente per centrare
                row2.scrollIntoView({behavior: "smooth", block: "center"});

                // 5. Scrivi Seconda Parte (Mr. Reddit)
                setTimeout(() => {
                    startTypeWriter('s1-part2', () => {
                        // 6. Mostra il bottone finale
                        const actionBtn = document.getElementById('s1-action');
                        actionBtn.classList.remove('hidden-opacity');
                        actionBtn.classList.add('visible-opacity');
                    });
                }, 500);

            }, 6000); // Tempo lettura nuvola
        });
    }

    // --- UTILITIES ---
    function startTypeWriter(elementId, callback = null) {
        const element = document.getElementById(elementId);
        if (!element) return;
        if (typedStatus[elementId]) return;
        typedStatus[elementId] = true;
        
        const text = scenarios[elementId];
        element.innerHTML = "";
        let i = 0;
        
        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') {
                    element.innerHTML += '<br>';
                    i++;
                    setTimeout(type, 150); 
                } else {
                    element.innerHTML += char;
                    i++;
                    let randomSpeed = Math.floor(Math.random() * 5) + 2; 
                    setTimeout(type, randomSpeed);
                }
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    if (boringLayer) {
        boringLayer.addEventListener('click', triggerGlitch);
        window.addEventListener('wheel', (e) => {
            if (!hasGlitched && e.deltaY > 0) triggerGlitch();
        });
        boringLayer.addEventListener('touchstart', triggerGlitch);
    }

    window.scrollToScene = (sceneId) => {
        const target = document.getElementById(sceneId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
});