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
    
    // --- SCENA 2 ---
    const s2_Part1 = "Stop right there. Put your passport away.\n\nIn the Reddit World, IDs and borders don't exist. Nobody knows who you are. Nobody cares where you were born.\n\nHere, we only exist through one thing: The Community Name.\n\nr/politics, r/aww, r/wallstreetbets. These are our nations.\n\nBut can we trust the label on the jar? If I step into a place called r/finance, are they actually talking about money, or is it just memes?\n\nLet's test the system.";
    const s2_Part2 = "See? It’s not total anarchy. It makes sense.\n\nIf the label says 'Strawberry Jam', it contains strawberries.\n\nBut reading labels one by one is for amateurs. I don't want to just read the names. I want to cluster this entire universe.\n\nTo do that, words aren't enough. I need a magic weapon. A dataset that turns words into pure mathematics.\n\nLet me introduce you to The Embeddings.";
    const s2_Analysis = "By analyzing specific textual properties, a clear pattern emerges.<br><br>The correlation is undeniable: the linguistic content perfectly mirrors the <span class='gold-highlight'>community's label</span>.<br><br>Subreddits with the highest frequency of <span class='gold-highlight'>Money-related terms</span> are indeed money-related communities like <em>r/PersonalFinance</em>. Those scoring highest in <span class='gold-highlight'>Religious terms</span> are theology discussions.";

    // --- SCENA 3 TEXTS ---
    const s3_Part1 = "Words are slippery. Humans use sarcasm, slang, and memes that make no sense.\n\nIf I want to organize this entire universe, I can't just read the posts. I need to convert them into something pure. Something uncorrupted by human stupidity.\n\nMathematics.\n\nWe used a neural network to turn every subreddit into a vector—a coordinate in a multi-dimensional space. We call them Embeddings.";
    
    const s3_Narrator = "<h3>Technical Brief: The Embedding Layer</h3><p>An 'embedding' transforms high-dimensional data (like text) into a dense vector space.</p><p>By calculating the semantic similarity between subreddit descriptions and content, we projected all <strong>67,180 communities</strong> into a 2D interactive map using <strong>t-SNE</strong>.</p><p><strong>The Hypothesis:</strong> Distinct, isolated islands of topics (Sports, Politics, Gaming) should naturally emerge.</p>";
    
    const s3_Part2 = "It’s a map of meaning. In this space, r/cats should be right next to r/dogs, and r/wallstreetbets should be... well, probably in a casino.\n\nReady? Let's push the button and watch the order emerge from the chaos.\n\nBehold, the map of the Reddit Mind!";
    
    const s3_Part3 = "...Well. That’s disappointing.\n\nLook at it. It looks like a clown sneezed on a windshield.\n\nWhere are the clusters? Why is everything overlapping? The AI didn't find 'islands of meaning'. It found a giant, screaming soup of noise.\n\nYou know why? Because this is Reddit. Everything is connected to everything. You can't separate 'Politics' from 'Memes'.\n\nThe machine failed because it tried to use logic. Rookie mistake.\n\nWe need a simpler filter. Something rigid. Something old-school.\n\nGeography.";

    // --- SCENA 4 (Cartographer) ---
    const s4_Part1 = "Okay, we ditched the AI clustering. We are going back to basics: Geography.\n\nBut we have a problem. The data doesn't come with GPS coordinates. It just comes with names.\n\nI look at r/france and I know it's France. I look at r/de and I know it's Germany. But the computer? The computer is stupid. It just sees strings of text.\n\nIf only there was a way to force these subreddit names to confess which country they belong to...";
    const s4_Narrator1 = "<strong>Methodology: Fuzzy String Matching</strong><br><br>To bridge the gap between digital communities and physical borders, we utilized the <span class='gold-highlight'>thefuzz Python library</span>.<br><br>By cross-referencing subreddit names against a database of ISO country codes and demonyms (e.g., \"German\", \"Deutsch\"), we calculated the <span class='gold-highlight'>Levenshtein distance</span> to find the best matches. This allowed us to successfully map thousands of communities to their real-world counterparts.";
    const s4_Part2 = "Gotcha. Now every subreddit has a flag.\n\nSo, who owns this place? Is Reddit a global democracy? Let's look at the sheer volume of posts per country.";
    const s4_Part3 = "Well... that’s awkward.\n\nLook at the gap between Number 1 and Number 2.\n\nReddit isn't a 'Global Village'. It’s basically the United States, plus a few friends we invited to the party. The volume of content coming from the US drowns out everyone else.\n\nIf we just counted words, the US would win every category just by shouting louder. 'Most Angry'? USA. 'Most Happy'? USA. 'Most talk about Cheese'? USA.\n\nThat’s boring. We need to be fair. We need to Normalize.";
    const s4_Narrator2 = "<strong>Statistical Correction: Normalization</strong><br><br>Because of the overwhelming US dominance, analyzing raw counts would introduce a severe bias.<br><br>To uncover the true cultural distinctiveness of each nation and in particular to compare them, we divided the number of interactions between two countries by the <span class='gold-highlight'>number of total posts</span> of the two nations.";
    const s4_Part4 = "Exactly. We level the playing field.\n\nNow that the giants aren't cheating with their population size, let's see who cares more about religion.";
    const s4_User = "Wait a minute, Mr. Reddit.\n\nI'm looking at the top of this list, and—speaking as someone from the Real World—it actually makes sense. Those countries are known for being religious.\n\nBut I'm scrolling down to the middle and the bottom... and honestly? It's a mess. The ranking gets fuzzy. I can't tell if Country A is actually less religious than Country B, or if it's just random noise.";
    const s4_Narrator3 = "<strong>Data Insight: The Variance Problem</strong><br><br>You have spotted a crucial statistical limitation.<br><br>While the top of the ranking shows strong, statistically significant signals, the middle and lower sections flatten out.<br><br>In this <span class='gold-highlight'>\"Long Tail\"</span>, the scores are extremely low, and the differences between positions are microscopic. Furthermore, many of these countries have significantly fewer posts, meaning the <span class='gold-highlight'>sample size</span> is too small to draw a definitive ranking.<br><br><strong>Conclusion:</strong> The outliers tell a story. The average is just noise.";
    const s4_Part5 = "Sharp eyes, kid.\n\nThat’s the problem with data. If you stare at the static long enough, you start seeing faces.\n\nThe top of the list is truth. The middle is just people talking about the weather. Let's ignore the boring middle and move on to something more exciting.\n\nWe know what they are saying. Now let's see who they are screaming at.";




    const scenarios = {
        'intro-text': introDialogue,
        'disclaimer-text': disclaimerDialogue,
        's1-part1': s1_Part1,
        's1-part2': s1_Part2,
        's2-part1': s2_Part1, 
        's2-part2': s2_Part2,
        's3-part1': s3_Part1,
        's3-part2': s3_Part2,
        's3-part3': s3_Part3,
        's4-part1': s4_Part1,
        's4-part2': s4_Part2,
        's4-part3': s4_Part3,
        's4-part4': s4_Part4,
        's4-user-text': s4_User,
        's4-part5': s4_Part5
    };
    
    const typedStatus = {
        'intro-text': false,
        'disclaimer-text': false,
        's1-part1': false, 
        's1-part2': false,
        's2-part1': false,
        's2-part2': false,
        's3-part1': false,
        's3-part2': false,
        's3-part3': false,
        's4-part1': false,
        's4-part2': false,
        's4-part3': false,
        's4-part4': false,
        's4-user-text': false,
        's4-part5': false
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
                        // Disattiva tutte le scene, attiva quella corrente
                        document.querySelectorAll('.step').forEach(s => s.classList.remove('active-scene'));
                        entry.target.classList.add('active-scene');

                        const sectionId = entry.target.id;
                        const targetId = entry.target.querySelector('.type-target')?.id;

                        // 1. CONTROLLO SCENA 1
                        if (sectionId === 'scene-1') {
                            playScene1Sequence();
                        } 
                        // 2. CONTROLLO SCENA 2
                        else if (sectionId === 'scene-2') {
                            playScene2Sequence();
                        }
                        // 3. CONTROLLO SCENA 3 (SPOSTATO QUI SOPRA!)
                        else if (sectionId === 'scene-3') {
                            playScene3Sequence();
                        }
                        else if (sectionId === 'scene-4') {
                        playScene4Sequence();
                        }
                        // 4. LOGICA STANDARD (Solo se NON è una delle scene speciali sopra)
                        else if (targetId && scenarios[targetId] && !typedStatus[targetId]) {
                            startTypeWriter(targetId);
                        }
                    }
                });
            }, { threshold: 0.3 }); 

            document.querySelectorAll('.step').forEach(step => observer.observe(step));
        }

    // --- SEQUENZA SCENA 1 (AGGIORNATA CON NUMERI CHE CRESCONO) ---
    function playScene1Sequence() {
        if (typedStatus['s1-part1']) return;

        // 1. Scrivi Prima Parte (Mr. Reddit)
        startTypeWriter('s1-part1', () => {
            
            // 2. Fai entrare la Nuvola Narratore
            const cloud = document.getElementById('narrator-cloud');
            cloud.classList.add('slide-in-active');

            // --- NUOVO: FAI PARTIRE I NUMERI ORA ---
            // (ID, Start, End, Durata in ms)
            animateValue("count-posts", 0, 858488, 3000); // Ci mette 3 secondi
            animateValue("count-subs", 0, 67180, 2500);  // Ci mette 2.5 secondi
            animateValue("count-vec", 0, 86, 1500);      // Ci mette 1.5 secondi

            // 3. ASPETTA CHE LA NUVOLA SI FERMI (1.2s dopo)
            setTimeout(() => {
                
                // 4. Fai comparire il Nerd
                const nerd = document.getElementById('nerd-avatar');
                nerd.classList.remove('hidden-opacity');
                nerd.classList.add('visible-opacity');

                // 5. Tempo di lettura (aumentato leggermente perché i numeri distraggono positivamente)
                setTimeout(() => {
                    
                    // 6. Mostra seconda riga Mr. Reddit
                    const row2 = document.getElementById('row-part-2');
                    row2.classList.remove('hidden-opacity');
                    row2.classList.add('visible-opacity');
                    
                    row2.scrollIntoView({behavior: "smooth", block: "center"});

                    // 7. Scrivi Seconda Parte
                    setTimeout(() => {
                        startTypeWriter('s1-part2', () => {
                            // 8. Mostra bottone finale
                            const actionBtn = document.getElementById('s1-action');
                            actionBtn.classList.remove('hidden-opacity');
                            actionBtn.classList.add('visible-opacity');
                        });
                    }, 500);

                }, 6000); 

            }, 1200); 
        });
    }


    // --- FUNZIONE ANIMAZIONE NUMERI (Assicurati che ci sia nel file) ---
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Math.floor per numeri interi
            // .toLocaleString() aggiunge le virgole (es. 858,488)
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                // Assicura che l'ultimo numero sia esattamente quello finale
                obj.innerHTML = end.toLocaleString();
            }
        };
        window.requestAnimationFrame(step);
    }

 // --- SEQUENZA SCENA 2 (AGGIORNATA) ---
function playScene2Sequence() {
    if (typedStatus['s2-part1']) return;

    // 1. Parla Mr. Reddit
    startTypeWriter('s2-part1', () => {
        
        // 2. Mostra il Grafico (Immagine PNG)
        const dataRow = document.getElementById('s2-data-row');
        if(dataRow) {
            dataRow.classList.remove('hidden-opacity');
            dataRow.classList.add('visible-opacity');
        }

        // 3. Fai entrare la Nuvola Narratore (Slide-in) e il Nerd
        setTimeout(() => {
            const cloud = document.getElementById('s2-narrator-cloud');
            const analysisText = document.getElementById('s2-analysis-text');
            const nerd = document.getElementById('s2-nerd-avatar');

            if(cloud && analysisText) {
                // Inseriamo il testo HTML definito nelle variabili in alto
                analysisText.innerHTML = s2_Analysis;
                
                // Attiva animazione slide-in (come Scena 1)
                cloud.classList.add('slide-in-active');
                
                // Dopo che la nuvola è entrata, mostra il Nerd
                setTimeout(() => {
                    if(nerd) {
                        nerd.classList.remove('hidden-opacity');
                        nerd.classList.add('visible-opacity');
                    }

                    // 4. Reazione Finale Mr. Reddit (dopo che l'utente ha letto l'analisi)
                    setTimeout(() => {
                        const row2 = document.getElementById('s2-row-2');
                        if(row2) {
                            row2.classList.remove('hidden-opacity');
                            row2.classList.add('visible-opacity');
                            row2.scrollIntoView({behavior: "smooth", block: "center"});
                        }

                        startTypeWriter('s2-part2', () => {
                            const actionBtn = document.getElementById('s2-action');
                            if(actionBtn) {
                                actionBtn.classList.remove('hidden-opacity');
                                actionBtn.classList.add('visible-opacity');
                            }
                        });

                    }, 6000); // Tempo di lettura per l'analisi del Nerd

                }, 1000); // Ritardo apparizione Nerd dopo la nuvola
            }
        }, 1000); // Ritardo apparizione Grafico -> Analisi
    });
}

// --- SEQUENZA SCENA 3 (VERSIONE DEBUG) ---
function playScene3Sequence() {
    // Evita di rieseguire se sta già andando
    if (typedStatus['s3-part1']) return;

    console.log("Scene 3: Inizio sequenza...");

    // 1. Mr. Reddit Intro
    startTypeWriter('s3-part1', () => {
        console.log("Scene 3: Testo parte 1 finito.");

        // 2. Seleziona gli elementi HTML
        const cloud = document.getElementById('s3-narrator-cloud');
        const narratorText = document.getElementById('s3-narrator-text');
        const nerd = document.getElementById('s3-nerd-avatar');

        // CONTROLLO DI SICUREZZA
        if (!cloud || !narratorText) {
            console.error("ERRORE CRITICO: Non trovo 's3-narrator-cloud' o 's3-narrator-text' nell'HTML!");
            return; // Si ferma qui se mancano gli ID
        }

        // Inserimento testo
        narratorText.innerHTML = s3_Narrator; // Assicurati che la variabile s3_Narrator esista in alto
        
        // Animazione Entrata
        cloud.classList.add('slide-in-active');
        console.log("Scene 3: Nuvola attivata.");

        setTimeout(() => {
            if(nerd) {
                nerd.classList.remove('hidden-opacity');
                nerd.classList.add('visible-opacity');
            }

            // 3. Mr. Reddit Part 2 (Ready? Push button...)
            // Ho ridotto il tempo da 6000 a 4000 per rendere il test più veloce
            setTimeout(() => {
                const row2 = document.getElementById('s3-row-2');
                if (row2) {
                    row2.classList.remove('hidden-opacity');
                    row2.classList.add('visible-opacity');
                    row2.scrollIntoView({behavior: "smooth", block: "center"});
                }

                startTypeWriter('s3-part2', () => {
                    
                    // 4. SHOW THE CHART
                    const dataRow = document.getElementById('s3-data-row');
                    if (dataRow) {
                        dataRow.classList.remove('hidden-opacity');
                        dataRow.classList.add('visible-opacity');
                    }

                    // 5. WAIT & REACTION
                    setTimeout(() => {
                        const row3 = document.getElementById('s3-row-3');
                        if (row3) {
                            row3.classList.remove('hidden-opacity');
                            row3.classList.add('visible-opacity');
                            row3.scrollIntoView({behavior: "smooth", block: "center"});
                        }

                        startTypeWriter('s3-part3', () => {
                            const actionBtn = document.getElementById('s3-action');
                            if (actionBtn) {
                                actionBtn.classList.remove('hidden-opacity');
                                actionBtn.classList.add('visible-opacity');
                            }
                        });

                    }, 4000); 

                });

            }, 4000); // Tempo lettura Technical Brief

        }, 1000);
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