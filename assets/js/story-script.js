// DEBUG: Verifica caricamento
console.log(">>> STORY SCRIPT LOADED v8.0 (Scroll Timing Fix)");

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const boringLayer = document.getElementById('boring-layer');
    const redditLayer = document.getElementById('reddit-layer');
    let hasGlitched = false;

    // ==========================================
    // 1. DEFINIZIONE DEI TESTI
    // ==========================================

    const introDialogue = "Stop right there.\n\nYou were actually going to read that? It looked like a tax return form from 1995. How... quaint.\n\nYou are currently in the 'Real World'. Out there, people lie. They say they love art house cinema and eat kale. But I know the truth. I know what they really type at 3 AM.\n\nI am Mr. Reddit. And I'm going to show you the world not as it is on a map, but as it actually exists in the hidden \"Reddit realm\".";
    const disclaimerDialogue = "Welcome to the Reddit World.\n\nBefore we start, a Mandatory Disclaimer from the Department of Internet Honesty:\n\nEverything you are about to see is biased. Heavily. Our population is skewed. It’s mostly male, mostly tech-savvy, and mostly people who have way too many opinions about things that don't matter.\n\nIf you are looking for a representative sample of your grandmother’s knitting circle, leave now. If you want raw, unfiltered, and occasionally unhinged human data... stay.\n\nLet’s look at the raw materials first.";

    const s1_Part1 = "Okay, let’s check our inventory before we enter the jungle.\n\nYou think we are just guessing? No. We brought heavy machinery.\n\nLook at the scope of this madness.";
    const s1_Part2 = "Did you catch that? 86 different ways to dissect a sentence.\n\nWe know if you are talking about God (LIWC_Relig), money, or just using too many pronouns. We literally have a mathematical vector for your feelings.\n\nVADER checks your mood. LIWC checks your soul.\n\nNow that you know how we listen... let's hear what the world is screaming.";

    const s2_Part1 = "Stop right there. Put your passport away.\n\nIn the Reddit World, IDs and borders don't exist. Nobody knows who you are. Nobody cares where you were born.\n\nHere, we only exist through one thing: The Community Name.\n\nr/politics, r/aww, r/wallstreetbets. These are our nations.\n\nBut can we trust the label on the jar? If I step into a place called r/finance, are they actually talking about money, or is it just memes?\n\nLet's test the system.";
    const s2_Part2 = "See? It’s not total anarchy. It makes sense.\n\nIf the label says 'Strawberry Jam', it contains strawberries.\n\nBut reading labels one by one is for amateurs. I don't want to just read the names. I want to cluster this entire universe.\n\nTo do that, words aren't enough. I need a magic weapon. A dataset that turns words into pure mathematics.\n\nLet me introduce you to The Embeddings.";
    const s2_Analysis = "By analyzing specific textual properties, a clear pattern emerges.<br><br>The correlation is undeniable: the linguistic content perfectly mirrors the <span class='gold-highlight'>community's label</span>.<br><br>Subreddits with the highest frequency of <span class='gold-highlight'>Money-related terms</span> are indeed money-related communities like <em>r/PersonalFinance</em>. Those scoring highest in <span class='gold-highlight'>Religious terms</span> are theology discussions.";

    const s3_Part1 = "Words are slippery. Humans use sarcasm, slang, and memes that make no sense.\n\nIf I want to organize this entire universe, I can't just read the posts. I need to convert them into something pure. Something uncorrupted by human stupidity.\n\nMathematics.\n\nWe used a neural network to turn every subreddit into a vector—a coordinate in a multi-dimensional space. We call them Embeddings.";
    const s3_Narrator = "<h3>Technical Brief: The Embedding Layer</h3><p>An 'embedding' transforms high-dimensional data (like text) into a dense vector space.</p><p>By calculating the semantic similarity between subreddit descriptions and content, we projected all <strong>67,180 communities</strong> into a 2D interactive map using <strong>t-SNE</strong>.</p><p><strong>The Hypothesis:</strong> Distinct, isolated islands of topics (Sports, Politics, Gaming) should naturally emerge.</p>";
    const s3_Part2 = "It’s a map of meaning. In this space, r/cats should be right next to r/dogs, and r/wallstreetbets should be... well, probably in a casino.\n\nReady? Let's push the button and watch the order emerge from the chaos.\n\nBehold, the map of the Reddit Mind!";
    const s3_Part3 = "...Well. That’s disappointing.\n\nLook at it. It looks like a clown sneezed on a windshield.\n\nWhere are the clusters? Why is everything overlapping? The AI didn't find 'islands of meaning'. It found a giant, screaming soup of noise.\n\nYou know why? Because this is Reddit. Everything is connected to everything. You can't separate 'Politics' from 'Memes'.\n\nThe machine failed because it tried to use logic. Rookie mistake.\n\nWe need a simpler filter. Something rigid. Something old-school.\n\nGeography.";

    const s4_Part1 = "Okay, we ditched the AI clustering. We are going back to basics: Geography.\n\nBut we have a problem. The data doesn't come with GPS coordinates. It just comes with names.\n\nI look at r/france and I know it's France. I look at r/de and I know it's Germany. But the computer? The computer is stupid. It just sees strings of text.\n\nIf only there was a way to force these subreddit names to confess which country they belong to...";
    const s4_Narrator1 = "<strong>Methodology: Fuzzy String Matching</strong><br><br>To bridge the gap between digital communities and physical borders, we utilized the <span class='gold-highlight'>thefuzz Python library</span>.<br><br>By cross-referencing subreddit names against a database of ISO country codes and demonyms (e.g., \"German\", \"Deutsch\"), we calculated the <span class='gold-highlight'>Levenshtein distance</span> to find the best matches. This allowed us to successfully map thousands of communities to their real-world counterparts.";
    const s4_Part2 = "Gotcha. Now every subreddit has a flag.\n\nSo, who owns this place? Is Reddit a global democracy? Let's look at the sheer volume of posts per country.";
    const s4_Part3 = "Well... that’s awkward.\n\nLook at the gap between Number 1 and Number 2.\n\nReddit isn't a 'Global Village'. It’s basically the United States, plus a few friends we invited to the party. The volume of content coming from the US drowns out everyone else.\n\nIf we just counted words, the US would win every category just by shouting louder. 'Most Angry'? USA. 'Most Happy'? USA. 'Most talk about Cheese'? USA.\n\nThat’s boring. We need to be fair. We need to Normalize.";
    const s4_Narrator2 = "<strong>Statistical Correction: Normalization</strong><br><br>Because of the overwhelming US dominance, analyzing raw counts would introduce a severe bias.<br><br>To uncover the true cultural distinctiveness of each nation and in particular to compare them, we divided the number of interactions between two countries by the <span class='gold-highlight'>number of total posts</span> of the two nations.";
    const s4_Part4 = "Exactly. We level the playing field.\n\nNow that the giants aren't cheating with their population size, let's see who cares more about religion.";
    const s4_User = "Wait a minute, Mr. Reddit.\n\nI'm looking at the top of this list, and—speaking as someone from the Real World—it actually makes sense. Those countries are known for being religious.\n\nBut I'm scrolling down to the middle and the bottom... and honestly? It's a mess. The ranking gets fuzzy. I can't tell if Country A is actually less religious than Country B, or if it's just random noise.";
    const s4_Narrator3 = "<strong>Data Insight: The Variance Problem</strong><br><br>You have spotted a crucial statistical limitation.<br><br>While the top of the ranking shows strong, statistically significant signals, the middle and lower sections flatten out.<br><br>In this <span class='gold-highlight'>\"Long Tail\"</span>, the scores are extremely low, and the differences between positions are microscopic. Furthermore, many of these countries have significantly fewer posts, meaning the <span class='gold-highlight'>sample size</span> is too small to draw a definitive ranking.<br><br><strong>Conclusion:</strong> The outliers tell a story. The average is just noise.";
    const s4_Part5 = "Sharp eyes, kid.\n\nThat’s the problem with data. If you stare at the static long enough, you start seeing faces.\n\nThe top of the list is truth. The middle is just people talking about the weather. Let's ignore the boring middle and move on to something more exciting.\n\nWe know what they are saying. Now let's see who they are screaming at.";

    const s5_Part1 = "We've seen what countries look like alone. But let's be honest: isolation is boring.\n\nThe fun starts when they collide.\n\nWe tracked every time a subreddit from one country linked to another.\n\nWho is talking to whom? Who is watching whom?\n\nBehold the web of global attention.";
    const s5_Narrator = "<strong>System Validation: Interaction Mapping</strong><br><br>Based on these results, the mappings appear to be highly relevant and effective. The top-ranking interactions are not random; they clearly reflect significant real-world relationships:<br><br>1. <span class='gold-highlight'>Geographic & Cultural Neighbors</span>: The high volume of interactions between the United States and Canada, and India and Pakistan.<br><br>2. <span class='gold-highlight'>Geopolitical Hotspots</span>: Prominent ranking of pairs like Iran/USA and Israel/Palestine.<br><br>3. <span class='gold-highlight'>Linguistic Ties</span>: The presence of Brazil/Portugal links.<br><br><strong>Conclusion:</strong> The aggregated data mirrors known global relationships so closely that it serves as a strong validation.";
    const s5_Part2 = "See? I told you.\n\nEven in a chaotic digital void, you humans just can't help but replicate your real-world drama. The neighbors are still fighting. The colonies are still calling home.\n\nBut looking at pairs—'A talks to B'—is too simple. It's two-dimensional.\n\nThis is a Social Network, remember? It's not just a series of phone calls. It’s a massive, tangled mess of alliances.\n\nWe need to zoom out. We need to stop looking at countries and start looking at Factions.\n\nLet's build the Network.";

    // ==========================================
    // 2. CONFIGURAZIONE SCENARI
    // ==========================================

    const scenarios = {
        'intro-text': introDialogue, 'disclaimer-text': disclaimerDialogue,
        's1-part1': s1_Part1, 's1-part2': s1_Part2,
        's2-part1': s2_Part1, 's2-part2': s2_Part2,
        's3-part1': s3_Part1, 's3-part2': s3_Part2, 's3-part3': s3_Part3,
        's4-part1': s4_Part1, 's4-part2': s4_Part2, 's4-part3': s4_Part3,
        's4-part4': s4_Part4, 's4-user-text': s4_User, 's4-part5': s4_Part5,
        's5-part1': s5_Part1, 's5-part2': s5_Part2
    };
    
    const typedStatus = {
        'intro-text': false, 'disclaimer-text': false,
        's1-part1': false, 's1-part2': false,
        's2-part1': false, 's2-part2': false,
        's3-part1': false, 's3-part2': false, 's3-part3': false,
        's4-part1': false, 's4-part2': false, 's4-part3': false,
        's4-part4': false, 's4-user-text': false, 's4-part5': false,
        's5-part1': false, 's5-part2': false
    };

    // ==========================================
    // 3. LOGICA OBSERVER (DELAYED TRIGGER FIX)
    // ==========================================

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

    function initObserver() {
        console.log(">>> OBSERVER ATTIVATO (Margin -30%)");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    
                    document.querySelectorAll('.step').forEach(s => s.classList.remove('active-scene'));
                    entry.target.classList.add('active-scene');

                    const sectionId = entry.target.id;
                    const targetId = entry.target.querySelector('.type-target')?.id;

                    console.log("Scene Active:", sectionId);

                    // REGIA SCENE
                    if (sectionId === 'scene-1') { playScene1Sequence(); } 
                    else if (sectionId === 'scene-2') { playScene2Sequence(); }
                    else if (sectionId === 'scene-3') { playScene3Sequence(); }
                    else if (sectionId === 'scene-4') { playScene4Sequence(); }
                    else if (sectionId === 'scene-5') { playScene5Sequence(); }
                    
                    // FALLBACK
                    else if (targetId && scenarios[targetId] && !typedStatus[targetId]) {
                        if(!['scene-1', 'scene-2', 'scene-3', 'scene-4', 'scene-5'].includes(sectionId)) {
                             startTypeWriter(targetId);
                        }
                    }
                }
            });
        }, { 
            // QUESTO È IL FIX:
            // threshold: 0.1 -> Attivati appena il 10% è visibile...
            // rootMargin: "0px 0px -30% 0px" -> ...MA immagina che lo schermo sia tagliato del 30% in basso.
            // Risultato: La scena deve "salire" ben oltre il bordo inferiore prima di partire.
            threshold: 0.1,
            rootMargin: "0px 0px -30% 0px" 
        });

        document.querySelectorAll('.step').forEach(step => observer.observe(step));
    }

    // ==========================================
    // 4. REGIA SCENE
    // ==========================================

    // SCENA 1
    function playScene1Sequence() {
        if (typedStatus['s1-part1']) return;
        startTypeWriter('s1-part1', () => {
            const cloud = document.getElementById('narrator-cloud');
            if(cloud) cloud.classList.add('slide-in-active');
            animateValue("count-posts", 0, 858488, 3000);
            animateValue("count-subs", 0, 67180, 2500); 
            animateValue("count-vec", 0, 86, 1500);
            setTimeout(() => {
                revealElement('nerd-avatar');
                setTimeout(() => {
                    revealElement('row-part-2');
                    setTimeout(() => {
                        startTypeWriter('s1-part2', () => {
                            revealElement('s1-action');
                        });
                    }, 500);
                }, 6000); 
            }, 1200); 
        });
    }

    // SCENA 2
    function playScene2Sequence() {
        if (typedStatus['s2-part1']) return;
        startTypeWriter('s2-part1', () => {
            revealElement('s2-data-row');
            setTimeout(() => {
                const cloud = document.getElementById('s2-narrator-cloud');
                const analysisText = document.getElementById('s2-analysis-text');
                if(cloud && analysisText) {
                    analysisText.innerHTML = s2_Analysis;
                    cloud.classList.add('slide-in-active');
                    setTimeout(() => {
                        revealElement('s2-nerd-avatar');
                        setTimeout(() => {
                            revealElement('s2-row-2');
                            startTypeWriter('s2-part2', () => {
                                revealElement('s2-action');
                            });
                        }, 6000); 
                    }, 1000); 
                }
            }, 1000); 
        });
    }

    // SCENA 3
    function playScene3Sequence() {
        if (typedStatus['s3-part1']) return;
        startTypeWriter('s3-part1', () => {
            const cloud = document.getElementById('s3-narrator-cloud');
            const narratorText = document.getElementById('s3-narrator-text');
            if (cloud && narratorText) {
                narratorText.innerHTML = s3_Narrator;
                cloud.classList.add('slide-in-active');
                revealElement('s3-nerd-avatar');
                setTimeout(() => {
                    revealElement('s3-row-2');
                    startTypeWriter('s3-part2', () => {
                        revealElement('s3-data-row');
                        setTimeout(() => {
                            revealElement('s3-row-3');
                            startTypeWriter('s3-part3', () => {
                                revealElement('s3-action');
                            });
                        }, 4000); 
                    });
                }, 4000); 
            }
        });
    }

    // SCENA 4
    function playScene4Sequence() {
        if (typedStatus['s4-part1']) return;
        console.log(">>> Starting Scene 4 Sequence");

        startTypeWriter('s4-part1', () => {
            showNarratorBubble('s4-narrator-row-1', 's4-narrator-text-1', s4_Narrator1);
            setTimeout(() => {
                revealElement('s4-row-2');
                startTypeWriter('s4-part2', () => {
                    revealElement('s4-data-table');
                    renderScene4Table();
                    setTimeout(() => {
                        revealElement('s4-row-3');
                        startTypeWriter('s4-part3', () => {
                            showNarratorBubble('s4-narrator-row-2', 's4-narrator-text-2', s4_Narrator2);
                            setTimeout(() => {
                                revealElement('s4-row-4');
                                startTypeWriter('s4-part4', () => {
                                    revealElement('s4-data-chart');
                                    renderScene4Chart();
                                    setTimeout(() => {
                                        revealElement('s4-user-row');
                                        startTypeWriter('s4-user-text', () => {
                                            showNarratorBubble('s4-narrator-row-3', 's4-narrator-text-3', s4_Narrator3);
                                            setTimeout(() => {
                                                revealElement('s4-row-5');
                                                startTypeWriter('s4-part5', () => {
                                                    revealElement('s4-action');
                                                });
                                            }, 8000); 
                                        });
                                    }, 2000); 
                                });
                            }, 5000); 
                        });
                    }, 2000); 
                });
            }, 6000); 
        });
    }

    // SCENA 5
    function playScene5Sequence() {
        if (typedStatus['s5-part1']) return;
        console.log(">>> Starting Scene 5 Sequence");
        startTypeWriter('s5-part1', () => {
            revealElement('s5-data-row');
            setTimeout(() => {
                showNarratorBubble('s5-narrator-row-1', 's5-narrator-text-1', s5_Narrator);
                setTimeout(() => {
                    revealElement('s5-row-2');
                    startTypeWriter('s5-part2', () => {
                        revealElement('s5-action');
                    });
                }, 8000); 
            }, 2000); 
        });
    }

    // ==========================================
    // 5. UTILITIES
    // ==========================================

    function startTypeWriter(elementId, callback = null) {
        const element = document.getElementById(elementId);
        if (!element) { console.error("Missing:", elementId); return; }
        if (typedStatus[elementId]) return;
        typedStatus[elementId] = true;
        const text = scenarios[elementId] || " ... ";
        element.innerHTML = "";
        let i = 0;
        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') { element.innerHTML += '<br>'; i++; setTimeout(type, 150); } 
                else { element.innerHTML += char; i++; setTimeout(type, Math.floor(Math.random() * 5) + 2); }
            } else { if (callback) callback(); }
        }
        type();
    }

    function revealElement(id) {
        const el = document.getElementById(id);
        if(el) {
            el.classList.remove('hidden-opacity');
            el.classList.add('visible-opacity');
            el.scrollIntoView({behavior: "smooth", block: "center"});
        }
    }

    function showNarratorBubble(rowId, textId, content) {
        const row = document.getElementById(rowId);
        const textEl = document.getElementById(textId);
        if(row && textEl) {
            const bubble = row.querySelector('.narrator-bubble-box');
            row.classList.remove('hidden-opacity');
            row.classList.add('visible-opacity');
            textEl.innerHTML = content;
            if (bubble) setTimeout(() => { bubble.classList.add('visible'); }, 100);
        }
    }

    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
            if (progress < 1) { window.requestAnimationFrame(step); } 
            else { obj.innerHTML = end.toLocaleString(); }
        };
        window.requestAnimationFrame(step);
    }

    function renderScene4Table() {
        const div = document.getElementById('country-volume-table');
        if(!div) return;
        const data = [
            { rank: 1, country: "USA", posts: "18,283" }, { rank: 2, country: "Canada", posts: "4,490" },
            { rank: 3, country: "Japan", posts: "2,600" }, { rank: 4, country: "India", posts: "2,283" },
            { rank: 5, country: "Australia", posts: "1,566" }, { rank: 6, country: "France", posts: "1,510" },
            { rank: 7, country: "Italy", posts: "1,423" }, { rank: 8, country: "United Kingdom", posts: "1,178" },
            { rank: 9, country: "Ireland", posts: "1,155" }, { rank: 10, country: "Brazil", posts: "1,081" }
        ];
        let html = '<table class="terminal-table"><thead><tr><th class="rank-col">#</th><th>COUNTRY</th><th class="num-col">POSTS</th><th class="sep-col"></th><th class="rank-col">#</th><th>COUNTRY</th><th class="num-col">POSTS</th></tr></thead><tbody>';
        for (let i = 0; i < 5; i++) {
            const l = data[i]; const r = data[i + 5]; 
            html += `<tr><td class="rank-col">${l.rank}</td><td>${l.country}</td><td class="num-col">${l.posts}</td><td class="sep-col"></td><td class="rank-col">${r.rank}</td><td>${r.country}</td><td class="num-col">${r.posts}</td></tr>`;
        }
        html += '</tbody></table>';
        div.innerHTML = html;
    }

    function renderScene4Chart() {
        if(!window.Plotly) return;
        const div = document.getElementById('chart-religion');
        if(!div) return;
        const countries = ['Philippines', 'Pakistan', 'Egypt', 'USA', 'India', 'Poland', 'UK', 'Germany'];
        const values = [0.95, 0.92, 0.88, 0.75, 0.70, 0.40, 0.35, 0.20]; 
        const trace = { x: countries, y: values, type: 'bar', marker: { color: values.map(v => v > 0.6 ? '#FF4500' : '#00ff41'), line: { color: '#000', width: 1 } }, hoverinfo: 'y' };
        const layout = { plot_bgcolor: 'rgba(0,0,0,0)', paper_bgcolor: 'rgba(0,0,0,0)', font: { family: 'VT323, monospace', color: '#fff', size: 14 }, margin: { l: 40, r: 20, t: 20, b: 60 }, xaxis: { tickangle: -45, gridcolor: '#333' }, yaxis: { title: 'Normalized Score', gridcolor: '#333' } };
        Plotly.newPlot('chart-religion', [trace], layout, { displayModeBar: false, responsive: true });
    }

    if (boringLayer) {
        boringLayer.addEventListener('click', triggerGlitch);
        window.addEventListener('wheel', (e) => { if (!hasGlitched && e.deltaY > 0) triggerGlitch(); });
        boringLayer.addEventListener('touchstart', triggerGlitch);
    }
    window.scrollToScene = (sceneId) => {
        const target = document.getElementById(sceneId);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    };
});