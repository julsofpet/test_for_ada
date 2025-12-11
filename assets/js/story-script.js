// DEBUG: Verifica caricamento
console.log(">>> STORY SCRIPT LOADED v9.0 (Names + Scene 4 Fix)");

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const boringLayer = document.getElementById('boring-layer');
    const redditLayer = document.getElementById('reddit-layer');
    let hasGlitched = false;
    
    // --- So that the glasses only play once ---
    let hasGlassesPlayed = false; // Remembers if we've ever shown them
    let glassesTimer = null;      // Holds the timer so we can cancel it
    // ---------------------

    // ==========================================
    // 1. DEFINIZIONE DEI TESTI
    // ==========================================

    const introDialogue = "Stop right there.\n\nYou were actually going to read that? It looked like a tax return form from 1995. How... quaint.\n\nYou are currently in the 'Real World'. Out there, people lie.\
    They say they love art house cinema and eat kale. But I know the truth. I know what they really type at 3 AM.\n\nHere, you’re about to put on a different pair of glasses: bright orange ones. \
    The Reddit lenses.\n\nI am Mr. Reddit. And I'm going to show you the world not as it is on a map, but as it actually exists in the hidden \"Reddit realm\".";
    const introUserDialogue = "Alright, Mr. Reddit. You have my attention.\n\nI’m tired of the polished version of the internet.\n\nHand me the orange glasses.\
    \n\nShow me what the world looks like when you stop asking people what they think… and just read what they actually write.";
    const disclaimerDialogue = "Welcome to the Reddit World.\n\nBefore we fully lock in the orange lenses, a quick but important disclaimer from the Department of Internet Honesty:\
    \n\nEverything you are about to see is biased.\n\nReddit’s population is not the world. It is largely male, more tech-oriented, and more likely to express strong opinions online than the average person.\
    \n\nThese are not statistically representative samples of humanity. They are signals from a specific online community.\n\nIf you’re looking for a perfect mirror of the general population, this is the wrong dataset.\
    \n\nBut if you want a transparent view into what a certain corner of the internet really thinks and feels… keep the lenses on.\n\nFirst, let’s look at the raw material we’re working with.";

    const s1_Part1 = "Okay, let’s check our inventory before we enter the jungle.\n\nYou think we’re just guessing? Not quite.\
    \n\nWith the orange lenses on, we’re walking in with real tools: large-scale Reddit data, structured features, and models that dissect every sentence.\n\nTime to see the scale of this madness.";
    const s1_Narrator = "Our journey is about looking through this <strong>\"Orange Lens\"</strong> to decode the vast, chaotic digital landscape of global communities.\
    <br><br>We begin our odyssey with data on over <strong><span id=\"count-posts\">0</span> posts</strong> spanning <strong><span id=\"count-subs\">0</span> unique subreddits</strong>.\
    \n\nOur core fields include <strong>SOURCE_SUBREDDIT</strong> and <strong>TIMESTAMP</strong>, enriched by a <strong><span id=\"count-vec\">0</span>-element POST_PROPERTIES vector</strong>.\
    <br><br>The feature vector combines basic text statistics (length, punctuation, readability) with two established text-analysis tools: <strong>VADER</strong> and <strong>LIWC</strong>.\
    <br><br></strong>VADER</strong> is a </strong>rule-based sentiment model</strong> designed for online text. It relies on a sentiment lexicon and adjusts scores using punctuation, capitalization and intensifiers to produce positive, negative and overall (compound) sentiment for each post.\
    <br><br></strong>LIWC</strong> (Linguistic Inquiry and Word Count) is a </strong>psycholinguistic dictionary</strong>. Every word is mapped to one or more categories—such as pronouns, time references, emotions or social terms—and we compute the proportion of words in each category.\
    <br><br>Together, these measurements transform language use and emotional tone into numerical signals that we can systematically compare across communities.";
    const s1_Part2 = "Did you catch that? Dozens of different signals packed into every sentence.\
    \n\nNow that you know how we listen… let’s hear what the world is actually screaming.";

    const s2_Part1 = "In the Reddit World, IDs and borders don’t exist. Nobody knows who you are. Nobody cares where you were born.\n\nHere, we only exist through one thing: The Community Name, these are our nations.\
    \n\nBut can we trust the label on the jar? If I step into a place called r/finance, are they actually talking about money, or is it just memes?\n\nLet's test the system.";
    const s2_Part2 = "See? It’s not total anarchy. There is structure.\n\nIf a community like r/chronicpain shows very high values on Health-related terms, it’s because people there are actually talking about health, pain and medical issues.\
    \n\nBut reading labels one by one is for amateurs. I don’t just want to read names; I want to cluster the entire universe.\n\nFor that, words alone aren’t enough. We need a representation that turns language into geometry.\
    \n\nEnter embeddings: a dataset where every community is encoded as a point in a high-dimensional space, based on the words people actually use.";
    const s2_Analysis = "The chart above summarizes how different communities score on a set of key linguistic dimensions derived from LIWC.\
    <br><br>From a methodological perspective, all posts are first aggregated by subreddit: for each community we compute the average value of every LIWC feature, building a table of mean scores per subreddit.\
    <br><br>From this table we focus on six dimensions — <code>LIWC_Swear</code>, <code>LIWC_Money</code>, <code>LIWC_Relig</code>, <code>LIWC_Posemo</code>, <code>LIWC_Health</code> and <code>LIWC_Death</code> — which in the code are grouped in the <code>target_metrics</code> list.\
    <br><br>For each of these dimensions, we then select the five subreddits with the highest average score and display them as the bars we see in the chart.";

    const s3_Part1 = "Words are slippery. Sarcasm, slang, inside jokes: humans are very good at confusing both each other and machines.\n\nIf we want to organize the Reddit universe, we can’t just read posts one by one.\
    We need a way to represent communities in a consistent, numeric form.\n\nSo we step behind the orange lenses and translate Reddit into its native language:\n\nvectors in a high-dimensional space.";
    const s3_Narrator = "<h3>Technical Brief: How the Embeddings Were Built</h3>\
    The embedding dataset we use represents <strong>text, users, and communities</strong> as 300-dimensional vectors.<br><br>\
    For communities and users, the original authors start from the bipartite network that links them: every time a user posts in a subreddit, this creates an edge between that user and that community. Vectors are then learned so that users are close to the communities where they post frequently, and communities are close to each other when they share many of the same users.<br><br>\
    In practice, the model is trained with a negative-sampling objective: observed user–community pairs are pulled together in the vector space, while random pairs are pushed apart. This yields embeddings where geometric distance encodes behavioral similarity.<br><br>\
    In our analysis, we focus on the <strong>community embeddings</strong> only. Each community is a point in a 300-dimensional space. We then use <strong>t-SNE</strong>, a nonlinear dimensionality reduction method, to project these vectors into 2D while preserving local neighborhood structure — communities that appear close on the map tend to share similar audiences and linguistic patterns.<br><br>\
    <strong>The expectation:</strong> coherent regions of the map should roughly correspond to broad themes such as sports, politics, gaming, etc.<br><br>";
    const s3_Part2 = "What you see is not a geographic map, but a map of behavior and language.\n\nIn this space, r/cats should end up close to r/dogs because they attract similar users and use similar words. Finance subreddits cluster together, gaming subreddits cluster together, and so on.\n\nWith the embeddings in place, we can finally look at Reddit as a single landscape instead of millions of isolated threads.\n\nReady? Let’s project everything onto the plane and see what structure actually appears.";
    const s3_Part3 = "...Well. That’s not exactly the neat atlas we were hoping for.\n\nThe projection looks messy, dense, almost tangled—more like a colorful cloud than clean continents of meaning.\n\nCommunities overlap, bleed into each other, and refuse to stay inside tidy topic boundaries. On Reddit, politics mixes with memes, news with jokes, finance with chaos.\n\nThe embedding space didn’t fail; it just revealed how interconnected everything is.\n\nIf we want a stricter way to slice the world, we need a different lens—something simpler, more rigid, almost old-fashioned.\n\nGeography.";

    const s4_Part1 = "Okay, we ditched the AI clustering. We are going back to basics: Geography.\n\nBut the data doesn't come with GPS coordinates. It just comes with names.\n\nI look at r/france and I know it's France. The computer just sees strings of text.\n\nIf only there was a way to force these subreddit names to confess which country they belong to...";
    
    const s4_Narrator1 = "<strong>Methodology: Mapping Communities to Countries</strong><br><br>\
    We infer country labels using <span class='gold-highlight'>fuzzy string matching</span>. We compare subreddit names against a reference table of nations, ISO codes, and demonyms using Levenshtein distance.<br><br>\
    Result: A mapping that translates digital activity into geographic space.";

    const s4_Part2 = "Gotcha. Now every subreddit has a flag.\n\nBut we can't just count posts, or the USA would win every category by sheer volume. We need to <strong>Normalize</strong>.\n\nWe don't ask 'Who has the most religious posts?'. We ask: 'In which country is religion a higher percentage of their total conversation?'.\n\nLet's see who is praying the hardest.";

    const s4_User = "Wait... look at the top of that chart.\n\nPhilippines, Pakistan, Egypt, India...\n\nMr. Reddit, this actually works. These are countries deeply connected to their faith in the real world.\n\nThe data isn't lying.";

    const s4_Part3 = "The top explains the world. But look closer at the bottom of the list, or the countries with weird spikes.\n\nAre they really that extreme, or is the data just thin?\n\nLet's look at the raw volume behind these percentages.";

    const s4_Narrator2 = "<strong>Data Insight: The Variance Problem</strong><br><br>\
    The top rankings are reliable because the signal is strong. But observe the raw post counts in the table below.<br><br>\
    The USA has <strong>18,000+ posts</strong>. Many other nations have fewer than <strong>1,000</strong>.<br><br>\
    <strong>The Law of Large Numbers:</strong> With small sample sizes (the 'Long Tail'), a few angry posts can skew the average significantly. The top of the ranking tells a story; the outliers with low volume are just statistical noise.";

    const s4_Part4 = "Exactly. The big players tell the truth. The small players are just erratic.\n\nSo, we trust the signal, we ignore the noise, and we move on.\n\nWe know what they are saying. Now let's see who they are screaming at.";
    
    const s5_Part1 = "We've seen what countries look like alone. But let's be honest: isolation is boring.\n\nThe fun starts when they collide.\n\nWe tracked every time a subreddit from one country linked to another.\n\nWho is talking to whom? Who is watching whom?\n\nBehold the web of global attention.";
    const s5_Narrator = "<strong>System Validation: Interaction Mapping</strong><br><br>Based on these results, the mappings appear to be highly relevant and effective. The top-ranking interactions are not random; they clearly reflect significant real-world relationships:<br><br>1. <span class='gold-highlight'>Geographic & Cultural Neighbors</span>: The high volume of interactions between the United States and Canada, and India and Pakistan.<br><br>2. <span class='gold-highlight'>Geopolitical Hotspots</span>: Prominent ranking of pairs like Iran/USA and Israel/Palestine.<br><br>3. <span class='gold-highlight'>Linguistic Ties</span>: The presence of Brazil/Portugal links.<br><br><strong>Conclusion:</strong> The aggregated data mirrors known global relationships so closely that it serves as a strong validation.";
    const s5_Part2 = "See? I told you.\n\nEven in a chaotic digital void, you humans just can't help but replicate your real-world drama. The neighbors are still fighting. The colonies are still calling home.\n\nBut looking at pairs—'A talks to B'—is too simple. It's two-dimensional.\n\nThis is a Social Network, remember? It's not just a series of phone calls. It’s a massive, tangled mess of alliances.\n\nWe need to zoom out. We need to stop looking at countries and start looking at Factions.\n\nLet's build the Network.";


    const s6_Part1 = "We used a Network Analysis algorithm called Greedy Modularity.\n\nBasically, we asked the computer: 'Group these countries so that they talk to each other more than they talk to outsiders.'\n\nWe also normalized the data so the USA doesn't just eat everyone.\n\nThe result? The world map repainted by Reddit.";
    const s6_Narrator1 = "<strong>Network Analysis: Key Findings</strong><br>The map reveals a geopolitical landscape that defies traditional borders:<ul style='margin-top:10px; padding-left:20px; text-align:left;'><li><span class='gold-highlight'>The Eurasian Conflict Zone:</span> Russia anchors a massive Blue block, mathematically isolated from Europe.</li><li><span class='gold-highlight'>Economic Reality:</span> Australia clusters with China (Green) rather than the USA/UK, suggesting trade defines online relations.</li><li><span class='gold-highlight'>Indo-Middle Eastern Nexus:</span> India shares a cluster with Saudi Arabia and Iran.</li><li><span class='gold-highlight'>Fractured Americas:</span> Canada and Mexico cluster together, separate from the USA.</li><li><span class='gold-highlight'>Data Gaps:</span> Vast grey areas in Central Africa highlight the digital divide.</li></ul>";
    const s6_User = "Hang on... let me zoom in on the UK cluster.\n\nI see the UK, but look who they are connected to. It's not their European neighbors. It's countries halfway across the world.\n\nI've seen this map before in my history books.\n\nIs it just me, or did Reddit just recreate the British Empire?";
    const s6_Narrator2 = "<strong>Linguistic & Historical Echoes</strong><br><br>You are correct. The network analysis reveals strong <span class='gold-highlight'>\"Linguistic Bridges\"</span> that override geography.<br><br><strong>The UK Cluster:</strong> The algorithm links the UK to India and former commonwealth nations, driven by shared language.<br><br><strong>The Lusophone Connection:</strong> Similarly, Brazil and Portugal form a trans-Atlantic bond that ignores the rest of South America.<br><br>Conclusion: On Reddit, language is the strongest border.";
    const s6_Part2 = "Old habits die hard, don't they?\n\nWe think we live in the future, but our data is just re-enacting the 19th century.\n\nBut here is the million-dollar question: Is this permanent? Are these alliances set in stone, or do they shift like sand?\n\nWe have data covering 2014 to 2017. Let's add the Fourth Dimension. Let's see who stays loyal and who betrays the family.";
    
    const s7_Part1 = "You thought those alliances were written in stone? Please.\n\nThis is the internet. Loyalty lasts about as long as a viral meme.\n\nWe tracked these factions year by year, from 2014 to 2017.\n\nLook at this mess. Countries jumping from the 'Blue Faction' to the 'Red Faction' like they are changing socks.\n\nThey are all traitors. Except... maybe not all of them.\n\nLet's filter out the flakes and look for the die-hards. Who stuck together through thick and thin?";
    const s7_Narrator1 = "<strong>Reading the Matrix: The Loyalty Index</strong><br>This heatmap reveals how many fiscal quarters two countries spent in the same mathematical community.<ul style='margin-top:10px; padding-left:20px; text-align:left;'><li><span class='gold-highlight'>Ignore the Diagonal:</span> The bright white line matches a country with itself.</li><li><span class='gold-highlight'>The Irony of \"Loyalty\":</span> The brightest points are not necessarily friends. They are inseparable because their discourse is locked together.</li><li><span class='gold-highlight'>Russia & Ukraine:</span> Highly connected throughout the dataset.</li><li><span class='gold-highlight'>Israel & Palestine:</span> Mathematically glued together.</li><li><span class='gold-highlight'>India & Pakistan:</span> A permanent dyad.</li></ul><br><strong>Conclusion:</strong> On Reddit, your enemies are your closest neighbors. You cannot escape them.";
    const s7_Part2 = "Touching, isn't it? They hate each other so much they can't leave each other alone.\n\nSo we know who the couples are. But who is the Popular Kid? And who is eating lunch alone in the bathroom?\n\nLet's look at the final map of power.";
    const s7_Narrator2 = "<strong>Network Centrality Analysis</strong><br><br><strong>The Core:</strong> The <span class='gold-highlight'>USA, UK, and Canada</span> act as the central hubs (High Degree Centrality). Information flows through them. If they sneeze, the network catches a cold.<br><br><strong>The Periphery:</strong> Countries with fewer interactions are pushed to the edges. They are statistically isolated, often forming their own small, closed loops.";
    const s7_Part3 = "There you have it. The Popular Kids and the Outcasts.\n\nBut simply knowing who talks to whom is just gossip.\n\nI want to get inside their heads. I want to know if they are starting to think alike.\n\nWhen the USA shouts, does the UK shout back? Or do they whisper?\n\nIt’s time for the psychological test. It’s time for Style Mirroring.";

    const s8_Part1 = "Stop laughing.\n\nWe have had our fun with maps and cliques. But now, I need you to focus.\n\nWe have some serious questions to answer.\n\nIf I talk to you, what are the odds you talk back? When you reply... are you actually copying me?\n\nNo more guessing. We are doing this the hard way. Statistical Hypothesis Testing.\n\nPay attention. There will be p-values.";
    const s8_Narrator1 = "<strong>Metric 1: Global Conditional Probability of Reciprocity</strong><br><br><strong>The Question:</strong> \"If Country A posts to Country B, what is the probability that Country B will post back to Country A within 7 days?\"<br><br><strong>Methodology:</strong> We isolated the \"Initiator\" (A) and the \"Responder\" (B) using a deterministic timestamp logic. Using a <span class='gold-highlight'>merge_asof time-series operation</span>, we scanned for the first valid response within a 168-hour (7-day) window.";
    const s8_Part2 = "Look at those numbers.\n\nYou are twice as likely to get a reply from a foreign nation (19%) than from a neighbor in your own country (8%).\n\nInternational incidents are sticky. Domestic squabbles? We ignore them.\n\nBut that's just volume. I want to know about behavior.\n\nI want to know if we are unconsciously mimicking each other.";
    const s8_Narrator2 = "<strong>Metric 2: Linguistic Style Mirroring</strong><br><br><strong>The Hypothesis:</strong> When a post (A) triggers a reply (B), the style of the reply unconsciously mimics the style of the original post.<br><br><strong>Experimental Design:</strong><br>Test Group (N=2130): Actual reciprocal pairs.<br>Control Group (N=2130): Randomly selected pairs.<br><br>We calculated the <span class='gold-highlight'>Cosine Similarity</span> of their style vectors (LIWC/VADER features) and performed a T-Test.";
    const s8_Narrator3 = "<strong>Test Results & Significance</strong><br><br>T-Statistic: 12.65 | <strong>P-Value: 0.0000</strong> (p < 0.05)<br><br><strong>Interpretation:</strong> The result is Statistically Significant. Look at the chart: The red line (Reciprocal) has a second peak near +1.0 (The Bimodal Distribution).<br><br>This proves that a specific subgroup of users engages in <span class='gold-highlight'>Extreme Stylistic Matching</span>—perfectly copying the tone of the person they are arguing with.";
    const s8_Part3 = "Did you see that P-value? Zero point zero zero zero zero.\n\nThat means this isn't luck. It's human nature.\n\nWe found a ghost in the machine. A group of you aren't just replying; you are becoming clones of the person you talk to. You absorb their anger, their vocabulary, their style.\n\nThe echo chamber isn't a metaphor. It’s a mathematical fact.\n\n...Okay, that got too real. My head hurts from all this math. Take the lab coat.\n\nLet's go back to something simple. Something primal. Let's talk about Sports.";

    const s9_Narrator1 = "<strong>Global Sports Analysis: The Reddit Arena</strong><br>The results highlight the unique demographic distortions of the platform:<ul style='margin-top:10px; padding-left:20px; text-align:left;'><li><span class='gold-highlight'>The Big Three:</span> The ecosystem is dominated by Soccer (Global), American Football (US-centric), and Esports.</li><li><span class='gold-highlight'>The Reddit Factor:</span> While Esports are niche in traditional media, here they are a titan. This reflects the tech-savvy, digital-native demographic.</li><li><span class='gold-highlight'>Regional Dominance:</span> Europe is unified by Soccer; USA by NFL; India by Cricket.</li><li><span class='gold-highlight'>The Outliers:</span> The <strong>UK</strong> shows a unique cluster for Cricket (distinct from Europe). <strong>France</strong> is the only major nation where Cycling appears as a top-tier topic.</li></ul>";
    const s9_Part1 = "France talking about bicycles? The UK obsessing over Cricket while the rest of Europe watches the Champions League?\n\nIn the real world, these might look like statistical errors.\n\nBut remember where you are. You are looking at the world through Orange Glasses.\n\nHere, Esports is bigger than the Olympics. Here, a country can be defined by a card game or a bicycle race just because a few thousand passionate people decided to post about it.\n\nThese outliers aren't bugs. They are the features. They are the proof that this world is built by people, not by census bureaus.";

    const s10_Part1 = "And that's it.\n\nYou've seen the maps, the feuds, the secret alliances, and the ghost in the machine that makes us copy each other.\n\nYou can take off the Orange Glasses now.\n\nYou can go back to your 'Real World' where geography is boring and people only say things they mean.\n\nBut I have a feeling you'll be back. Because once you see the code behind the matrix... the real world looks a little bit dull.\n\nNow get out of here. Go touch some grass.\n\n...And don't forget to Upvote on your way out. \n\n So Reddit is the answer to many questions. Reddit is one answer to the ultimate question of life: Where do we b...";
    
    // ==========================================
    // 2. CONFIGURAZIONE SCENARI
    // ==========================================

    const scenarios = {
        'intro-text': introDialogue, 'intro-user-text': introUserDialogue,
        'disclaimer-text': disclaimerDialogue,
        's1-part1': s1_Part1, 's1-part2': s1_Part2,
        's2-part1': s2_Part1, 's2-part2': s2_Part2,
        's3-part1': s3_Part1, 's3-part2': s3_Part2, 's3-part3': s3_Part3,
        's4-part1': s4_Part1, 
        's4-part2': s4_Part2, 
        's4-user-text': s4_User, // Spostato prima
        's4-part3': s4_Part3,
        's4-part4': s4_Part4,
        's5-part1': s5_Part1, 's5-part2': s5_Part2,
        's6-part1': s6_Part1, 
        's6-narrator-text-1': s6_Narrator1, // Nota: a volte lo usiamo direttamente nella funzione, ma per coerenza puoi metterlo qui se usi il typeWriter, altrimenti la funzione showNarratorBubble usa la stringa raw. 
        's6-user-text': s6_User,
        's6-part2': s6_Part2,
        's7-part1': s7_Part1, 's7-part2': s7_Part2, 's7-part3': s7_Part3,
        's8-part1': s8_Part1, 's8-part2': s8_Part2, 's8-part3': s8_Part3,
        's9-part1': s9_Part1,
        's10-part1': s10_Part1
    };
    
    const typedStatus = {
        'intro-text': false, 'intro-user-text': false,
        'disclaimer-text': false,
        's1-part1': false, 's1-part2': false,
        's2-part1': false, 's2-part2': false,
        's3-part1': false, 's3-part2': false, 's3-part3': false,
        's4-part1': false, 's4-part2': false, 's4-part3': false,
        's4-part4': false, 's4-user-text': false,
        's5-part1': false, 's5-part2': false,
        's6-part1': false, 
        's6-narrator-text-1': false, // Opzionale se non scriviamo a macchina dentro la nuvola
        's6-user-text': false,
        's6-part2': false,
        's7-part1': false, 's7-part2': false, 's7-part3': false,
        's8-part1': false, 's8-part2': false, 's8-part3': false,
        's9-part1': false,
        's10-part1': false
    };

    // ==========================================
    // 3. LOGICA OBSERVER (DELAYED TRIGGER FIX)
    // ==========================================

const triggerGlitch = () => {
    if (hasGlitched) return;
    hasGlitched = true;

    // 1. Parte il Glitch visivo
    body.classList.add('glitch-active');
    
    setTimeout(() => {
        // 2. Cambio Stile (da Bianco a Nero)
        body.classList.remove('boring-mode');
        body.classList.add('dark-mode');
        body.classList.remove('glitch-active');
        
        if (boringLayer) boringLayer.style.display = 'none';
        if (redditLayer) redditLayer.style.display = 'block';
        
        // 3. INIZIO SEQUENZA DIALOGO
        
        // A) Scrive Mr. Reddit
        startTypeWriter('intro-text', () => {
            
            // B) Rivela il box dell'User
            revealElement('intro-user-row');
            
            // Aspettiamo 1 secondo che la transizione CSS del box finisca
            setTimeout(() => {
                
                // C) Scrive User
                startTypeWriter('intro-user-text', () => {
                    
                    // D) Rivela il bottone per proseguire
                    revealElement('intro-button-area');
                });
                
            }, 1000); 
        });

        // Avvia l'observer per le scene successive
        initObserver();
        
    }, 3000); 
};

function initObserver() {
        console.log(">>> OBSERVER ATTIVATO");
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
            
                    // 1. Manage Active Scene Class
                    document.querySelectorAll('.step').forEach(s => s.classList.remove('active-scene'));
                    entry.target.classList.add('active-scene');

                    const sectionId = entry.target.id;
                    const targetId = entry.target.querySelector('.type-target')?.id;

                    // 2. --- STRICT "ONE-TIME" GLASSES LOGIC ---
                    if (sectionId === 'scene-1') {
                        // Only trigger if we haven't done it before
                        if (!hasGlassesPlayed) {
                            hasGlassesPlayed = true; // Mark as done forever
                            
                            // Start the 0.5s delay
                            glassesTimer = setTimeout(() => {
                                document.body.classList.add('orange-lens-active');
                            }, 500);
                        }
                    } else {
                        // If we are ANYWHERE else:
                        // A) Cancel the timer if it's still counting down (e.g. fast scroll)
                        if (glassesTimer) clearTimeout(glassesTimer);
                        
                        // B) Force remove the glasses
                        document.body.classList.remove('orange-lens-active');
                    }
                    // ------------------------------------------

                    // 3. Update Side Navigation Dots
                    document.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
                    const activeDot = document.querySelector(`.nav-dot[href="#${sectionId}"]`);
                    if (activeDot) activeDot.classList.add('active');

                    console.log("Scene Active:", sectionId);

                    // 4. Trigger Scene Sequences
                    if (sectionId === 'scene-1') { playScene1Sequence(); } 
                    else if (sectionId === 'scene-2') { playScene2Sequence(); }
                    else if (sectionId === 'scene-3') { playScene3Sequence(); }
                    else if (sectionId === 'scene-4') { playScene4Sequence(); }
                    else if (sectionId === 'scene-5') { playScene5Sequence(); }
                    else if (sectionId === 'scene-6') { playScene6Sequence(); }
                    else if (sectionId === 'scene-7') { playScene7Sequence(); }
                    else if (sectionId === 'scene-8') { playScene8Sequence(); }
                    else if (sectionId === 'scene-9') { playScene9Sequence(); }
                    else if (sectionId === 'scene-10') { playScene10Sequence(); }
                    
                    // Fallback for typing text
                    else if (targetId && scenarios[targetId] && !typedStatus[targetId]) {
                        const complexScenes = [
                            'scene-intro', 'scene-1', 'scene-2', 'scene-3', 'scene-4', 
                            'scene-5', 'scene-6', 'scene-7', 'scene-8', 'scene-9', 
                            'scene-10'
                        ];
                        if(!complexScenes.includes(sectionId)) {
                            startTypeWriter(targetId);
                        }
                    }
                }
            });
        }, { 
            threshold: 0.1,
            rootMargin: "0px 0px -30% 0px" 
        });

        document.querySelectorAll('.step').forEach(step => observer.observe(step));
    }

    // ==========================================
    // 4. REGIA SCENE
    // ==========================================

  // SCENA 1 (Aggiornata con testo dinamico)
    function playScene1Sequence() {
    if (typedStatus['s1-part1']) return;
    
    startTypeWriter('s1-part1', () => {
        
        // 1. Trigger Text
        const textEl = document.getElementById('s1-narrator-text');
        if (textEl) textEl.innerHTML = s1_Narrator;

        // 2. Show Cloud
        const cloud = document.getElementById('narrator-cloud');
        if(cloud) cloud.classList.add('slide-in-active');

        // 3. Animate Numbers
        animateValue("count-posts", 0, 858488, 3000);
        animateValue("count-subs", 0, 67180, 2500); 
        animateValue("count-vec", 0, 86, 1500);

        // 4. Continue Sequence...
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
    
    // --- NEW: REMOVE ORANGE LENS WHEN ENTERING SCENE 2 ---
    document.body.classList.remove('orange-lens-active');
    // -----------------------------------------------------

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

    // SCENA 4 - REFACTORED
    function playScene4Sequence() {
        if (typedStatus['s4-part1']) return;
        console.log(">>> Starting Scene 4 Sequence (New Flow)");

        startTypeWriter('s4-part1', () => {
            // 1. Spiegazione Metodologia Mapping
            showNarratorBubble('s4-narrator-row-1', 's4-narrator-text-1', s4_Narrator1);
            
            setTimeout(() => {
                revealElement('s4-row-2');
                // 2. Mr Reddit introduce Normalizzazione e Religione
                startTypeWriter('s4-part2', () => {
                    
                    // 3. APPARE IL GRAFICO RELIGIONE (Prima della tabella)
                    revealElement('s4-data-chart');
                    renderScene4Chart();
                    
                    setTimeout(() => {
                        revealElement('s4-user-row');
                        // 4. L'utente commenta che "Funziona" (Top ranking valid)
                        startTypeWriter('s4-user-text', () => {
                            
                            revealElement('s4-row-3');
                            // 5. Mr Reddit introduce il dubbio (Guardiamo i volumi)
                            startTypeWriter('s4-part3', () => {
                                
                                // 6. APPARE LA TABELLA VOLUMI
                                revealElement('s4-data-table');
                                renderScene4Table();
                                
                                setTimeout(() => {
                                    // 7. Scienziato spiega il problema della Varianza
                                    showNarratorBubble('s4-narrator-row-2', 's4-narrator-text-2', s4_Narrator2);
                                    
                                    setTimeout(() => {
                                        revealElement('s4-row-4');
                                        // 8. Conclusione e bottone next
                                        startTypeWriter('s4-part4', () => {
                                            revealElement('s4-action');
                                        });
                                    }, 8000); // Tempo lettura Scienziato Varianza
                                }, 1000); // Tempo apparizione Tabella
                            });
                        });
                    }, 2000); // Tempo apparizione Grafico
                });
            }, 6000); // Tempo lettura Scienziato Metodologia
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

    // SCENA 6
    function playScene6Sequence() {
        if (typedStatus['s6-part1']) return;
        console.log(">>> Starting Scene 6 Sequence");

        // 1. Mr Reddit inizia
        startTypeWriter('s6-part1', () => {
            
            // 2. Mostra la Mappa Interattiva (Factions)
            revealElement('s6-map-row');
            
            setTimeout(() => {
                // 3. Lo Scienziato spiega i Key Findings
                showNarratorBubble('s6-narrator-row-1', 's6-narrator-text-1', s6_Narrator1);
                
                setTimeout(() => {
                    // 4. L'Utente interrompe (Zoom UK)
                    revealElement('s6-user-row');
                    startTypeWriter('s6-user-text', () => {
                        
                        // 5. Mostra il confronto Side-by-Side (Impero vs Dati)
                        revealElement('s6-comparison-row');
                        
                        setTimeout(() => {
                            // 6. Lo Scienziato conferma (Linguistic Echoes)
                            showNarratorBubble('s6-narrator-row-2', 's6-narrator-text-2', s6_Narrator2);
                            
                            setTimeout(() => {
                                // 7. Mr Reddit conclude (4th Dimension)
                                revealElement('s6-row-2');
                                startTypeWriter('s6-part2', () => {
                                    // 8. Bottone finale
                                    revealElement('s6-action');
                                });
                            }, 6000); // Tempo lettura Scienziato 2
                        }, 1000); // Tempo apparizione immagini
                    });
                }, 8000); // Tempo lettura Scienziato 1 (lungo perché ha bullet points)
            }, 2000); // Tempo per guardare la mappa
        });
    }

    // SCENA 7
    function playScene7Sequence() {
        if (typedStatus['s7-part1']) return;
        console.log(">>> Starting Scene 7 Sequence");

        // 1. Appare il Sankey Flow
        revealElement('s7-sankey-row');
        
        setTimeout(() => {
            // 2. Mr Reddit commenta il caos
            revealElement('s7-row-1');
            startTypeWriter('s7-part1', () => {
                
                // 3. Appare la Heatmap (Loyalty)
                revealElement('s7-heatmap-row');
                
                setTimeout(() => {
                    // 4. Lo Scienziato spiega la Heatmap
                    showNarratorBubble('s7-narrator-row-1', 's7-narrator-text-1', s7_Narrator1);
                    
                    setTimeout(() => {
                        // 5. Mr Reddit commenta (Enemies/Neighbors)
                        revealElement('s7-row-2');
                        startTypeWriter('s7-part2', () => {
                            
                            // 6. Appare la Network Centrality
                            revealElement('s7-network-row');
                            
                            setTimeout(() => {
                                // 7. Lo Scienziato spiega la Centrality
                                showNarratorBubble('s7-narrator-row-2', 's7-narrator-text-2', s7_Narrator2);
                                
                                setTimeout(() => {
                                    // 8. Mr Reddit conclude
                                    revealElement('s7-row-3');
                                    startTypeWriter('s7-part3', () => {
                                        revealElement('s7-action');
                                    });
                                }, 6000); // Tempo lettura Scienziato 2
                            }, 1000); // Tempo apparizione Network
                        });
                    }, 8000); // Tempo lettura Scienziato 1
                }, 1000); // Tempo apparizione Heatmap
            });
        }, 1000); // Tempo apparizione Sankey
    }


    // SCENA 8
    function playScene8Sequence() {
        if (typedStatus['s8-part1']) return;
        console.log(">>> Starting Scene 8 Sequence");

        // 1. Mr Reddit (Lab Coat) parla
        startTypeWriter('s8-part1', () => {
            
            // 2. Scienziato (Metodologia Reciprocità)
            showNarratorBubble('s8-narrator-row-1', 's8-narrator-text-1', s8_Narrator1);
            
            setTimeout(() => {
                // 3. Stat Cards appaiono
                revealElement('s8-stats-row');
                
                setTimeout(() => {
                    // 4. Mr Reddit reaction
                    revealElement('s8-row-2');
                    startTypeWriter('s8-part2', () => {
                        
                        // 5. Scienziato (Style Mirroring Intro)
                        showNarratorBubble('s8-narrator-row-2', 's8-narrator-text-2', s8_Narrator2);
                        
                        setTimeout(() => {
                            // 6. KDE Plot appare
                            revealElement('s8-kde-dist-row');
                            revealElement('s8-kde-comp-row');
                            
                            setTimeout(() => {
                                // 7. Scienziato (Risultati P-Value)
                                showNarratorBubble('s8-narrator-row-3', 's8-narrator-text-3', s8_Narrator3);
                                
                                setTimeout(() => {
                                    // 8. Mr Reddit Conclusion
                                    revealElement('s8-row-3');
                                    startTypeWriter('s8-part3', () => {
                                        revealElement('s8-action');
                                    });
                                }, 8000); // Lettura risultati
                            }, 1000); // KDE Plot
                        });
                    }, 8000); // Lettura metodologia 2
                }, 1000); // Stat Cards
            });
        });
    }

    // SCENA 9
    function playScene9Sequence() {
        if (typedStatus['s9-part1']) return;
        console.log(">>> Starting Scene 9 Sequence");

        // 1. Appare il Sunburst
        revealElement('s9-sunburst-row');
        
        setTimeout(() => {
            // 2. Lo Scienziato analizza i dati
            showNarratorBubble('s9-narrator-row-1', 's9-narrator-text-1', s9_Narrator1);
            
            setTimeout(() => {
                // 3. Mr Reddit commenta (ritorno all'avatar normale)
                revealElement('s9-row-1');
                startTypeWriter('s9-part1', () => {
                    // 4. Bottone finale
                    revealElement('s9-action');
                });
            }, 8000); // Tempo lettura Scienziato
        }, 1500); // Tempo apparizione Sunburst
    }

   // SCENA 10
// SCENA 10
function playScene10Sequence() {
    if (typedStatus['s10-part1']) return;
    console.log(">>> Starting Scene 10 Sequence with Delayed 42");

    // 1. Remove Lens (as per previous request)
    setTimeout(() => {
        document.body.classList.remove('orange-lens-active');
    }, 2000);

    startTypeWriter('s10-part1', () => {
        
        // --- DELAY THE DISRUPTION ---
        // We wait 3000ms (3 seconds) after the text finishes before triggering the glitch.
        setTimeout(() => {
            
            const overlay = document.getElementById('answer-42-overlay');
            
            if (overlay) {
                // A) Trigger Visual Glitch
                document.body.classList.add('glitch-active');
                
                setTimeout(() => {
                    document.body.classList.remove('glitch-active');
                    
                    // B) Show the "42" Overlay
                    overlay.classList.remove('hidden-opacity');
                    overlay.classList.add('visible-opacity');
                    
                    // --- C) ENABLE CLICK-TO-DISMISS ---
                    // By default, CSS has pointer-events: none. We force it to auto so it captures clicks.
                    overlay.style.pointerEvents = "auto"; 
                    overlay.style.cursor = "pointer"; // Visual cue that it's clickable

                    // Add click listener to hide the overlay
                    overlay.onclick = function() {
                        // Fade out
                        overlay.classList.remove('visible-opacity');
                        overlay.classList.add('hidden-opacity');
                        
                        // Disable interactions again after hiding
                        overlay.style.pointerEvents = "none";
                    };

                    // D) Reveal the final exit button underneath immediately
                    // so it is ready when the user clicks away the overlay.
                    revealElement('s10-action');
                    
                }, 200); // Short sync delay for the glitch effect
            }
        }, 3000); // <--- HERE IS THE 3 SECOND DELAY YOU REQUESTED
    });
}

    // ==========================================
    // 5. UTILITIES
    // ==========================================

function startTypeWriter(elementId, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) { console.error("Missing:", elementId); return; }
    
    // Se abbiamo già scritto, non facciamo nulla
    if (typedStatus[elementId]) {
        if (callback) callback();
        return;
    }

    // FUNZIONE DI SCRITTURA REALE
    const runTyping = () => {
        typedStatus[elementId] = true;
        const text = scenarios[elementId] || " ... ";
        element.innerHTML = "";
        let i = 0;
        
        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                
                // Gestione ritorno a capo
                if (char === '\n') { 
                    element.innerHTML += '<br>'; 
                    i++; 
                    setTimeout(type, 400); 
                } else { 
                    element.innerHTML += char; 
                    i++; 
                    // Velocità tra 30ms e 60ms
                    setTimeout(type, Math.floor(Math.random() * 5) + 2); 
                }
            } else { 
                if (callback) callback(); 
            }
        }
        type();
    };

    // OBSERVER INTERNO
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.disconnect();
                runTyping();
            }
        });
    }, { threshold: 0.3 }); 

    observer.observe(element.parentElement);
}

function revealElement(id) {
    const el = document.getElementById(id);
    if(el) {
        el.classList.remove('hidden-opacity');
        el.classList.add('visible-opacity');
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

/* --- FUNZIONE EXIT TO REALITY --- */
window.exitToReality = function() {
    console.log(">>> Exiting to Reality...");

    const body = document.body;
    const redditLayer = document.getElementById('reddit-layer');
    const referenceLayer = document.getElementById('reference-layer');

    // --- NEW: ENSURE GLASSES ARE REMOVED ---
    body.classList.remove('orange-lens-active');
    // ---------------------------------------

    // 1. Transizione visuale
    body.style.opacity = '0';

    setTimeout(() => {
        // 2. Cambio Classi CSS
        body.classList.remove('dark-mode');
        body.classList.add('boring-mode'); 

        // 3. Scambio Layer
        if (redditLayer) redditLayer.style.display = 'none';
        if (referenceLayer) {
            referenceLayer.style.display = 'flex'; 
            referenceLayer.style.opacity = '1';
        }

        // 4. Reset Scroll
        window.scrollTo(0, 0);
        
        // 5. Riporta l'opacità a 1
        body.style.opacity = '1';
        body.style.transition = 'opacity 1s ease';

    }, 500); 
};
