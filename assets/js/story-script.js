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

    const introDialogue = "Stop right there.\n\nYou were actually going to read that? It looked like a tax return form from 1995. How... quaint.\n\nYou are currently in the 'Real World'. Out there, people lie. They say they love art house cinema and eat kale. But I know the truth. I know what they really type at 3 AM.\n\nHere, you’re about to put on a different pair of glasses: bright orange ones. The Reddit lenses.\n\nI am Mr. Reddit. And I'm going to show you the world not as it is on a map, but as it exists in the hidden \"Reddit realm\".";
    const introUserDialogue = "Alright, Mr. Reddit. You have my attention.\n\nI’m tired of the polished version of the internet.\n\nHand me the orange glasses.\
    \n\nShow me what the world looks like when you stop asking people what they think… and just read what they actually write.";
    const disclaimerDialogue = "Welcome to the Reddit World.\n\nBefore we fully lock in the orange lenses, a quick but important disclaimer from the Department of Internet Honesty:\
    \n\nEverything you are about to see is biased.\n\nReddit’s population is not a representative sample of the world. It is largely male, more tech-oriented, and more likely to express strong opinions online than the average person.\
    \n\nThese are not statistically representative samples of humanity. They are signals from a specific online community.\n\nIf you’re looking for a perfect mirror of the general population, this is the wrong dataset.\
    \n\nBut if you want a transparent view into what a certain corner of the internet really thinks and feels… keep the lenses on.\n\nFirst, let’s look at the raw material we’re working with.";

    const s1_Part1 = "Okay, let’s check our inventory before we enter the jungle.\n\nYou think we’re just guessing? Not quite.\
    \n\nWith the orange lenses on, we’re walking in with real tools: large-scale Reddit data, structured features, and models that dissect every sentence.\n\nTime to see the scale of this madness.";
    const s1_Narrator = "Our journey is about looking through this <strong>\"Orange Lens\"</strong> to decode the vast, chaotic digital landscape of global communities.\
    <br><br>We begin our odyssey with data on over <strong><span id=\"count-posts\">0</span> posts</strong> spanning <strong><span id=\"count-subs\">0</span> unique subreddits</strong>.\
    \n\nOur core features include <strong>SOURCE_SUBREDDIT</strong>, <strong>TARGET_SUBREDDIT</strong>, and <strong>TIMESTAMP</strong>, enriched by a <strong><span id=\"count-vec\">0</span>-element POST_PROPERTIES vector</strong>.\
    <br><br>The feature vector combines basic text statistics (length, punctuation, readability) with two established text-analysis tools: <strong>VADER</strong> and <strong>LIWC</strong>.\
    <br><br></strong>VADER</strong> is a </strong>rule-based sentiment model</strong> designed for online text. It relies on a sentiment lexicon and adjusts scores using punctuation, capitalization, and intensifiers to produce positive, negative and overall (compound) sentiment for each post.\
    <br><br></strong>LIWC</strong> (Linguistic Inquiry and Word Count) is a </strong>psycholinguistic dictionary</strong>. Every word is mapped to one or more categories—such as pronouns, time references, emotions or social terms—and we compute the proportion of words in each category.\
    <br><br>Together, these measurements transform language and emotional tone into numerical signals that we can systematically compare across communities.";
    const s1_Part2 = "Did you catch that? Dozens of different signals packed into every sentence.\
    \n\nNow that you know how we listen… let’s hear what the world is actually screaming.";

    const s2_Part1 = "In the Reddit World, IDs and borders don’t exist. Nobody knows who you are. Nobody cares where you were born.\n\nHere, we only exist through one thing: The Community Name, these are our nations.\
    \n\nBut can we trust the label on the jar? If I step into a place called r/finance, are they actually talking about money, or is it just memes?\n\nLet's test the system.";
    const s2_Part2 = "See? It’s not total anarchy. There is structure.\n\nIf a community like r/chronicpain shows very high values on Health-related terms, it’s because people there are actually talking about health, pain and medical issues.\
    \n\nBut reading labels one by one is for amateurs. We don’t just want to read names; we want to cluster the entire universe.\n\nFor that, words alone aren’t enough. We need a representation that turns language into geometry: Embeddings.";
    const s2_Analysis = "The chart above summarizes how different communities score on a set of key linguistic dimensions derived from LIWC.\
    <br><br>From a methodological perspective, all posts are first aggregated by subreddit: for each community we compute the average value of every LIWC feature, building a table of mean scores per subreddit.\
    <br><br>From this table we focus on six dimensions — <code>LIWC_Swear</code>, <code>LIWC_Money</code>, <code>LIWC_Relig</code>, <code>LIWC_Posemo</code> (positive emotion), <code>LIWC_Health</code> and <code>LIWC_Death</code> — which in the code are grouped in the <code>target_metrics</code> list.\
    <br><br>For each of these dimensions, we then select the five subreddits with the highest average score and display them as the bars we see in the chart.";

    const s3_Part1 = "Words are slippery. Sarcasm, slang, inside jokes: humans are very good at confusing both each other and machines.\n\nIf we want to organize the Reddit universe, we can’t just read posts one by one.\
    We need a way to represent communities in a consistent, numeric form.\n\nSo we step behind the orange lenses and translate Reddit into its native language:\n\nvectors in a high-dimensional space.";
    const s3_Narrator = "<h3>Technical Brief: How the Embeddings Were Built</h3>\
    We utilize a dataset where embeddings represent <strong>text, users, and communities</strong> as 300-dimensional vectors.<br><br>\
    For communities and users, the original authors of the dataset start from the bipartite network that links them: every time a user posts in a subreddit, this creates an edge between that user and that community. Vectors are then learned so that users are close to the communities where they post frequently, and communities are close to each other when they share many of the same users.<br><br>\
    In practice, the model is trained with a negative-sampling objective: observed user–community pairs are pulled together in the vector space, while random pairs are pushed apart. This yields embeddings where geometric distance encodes behavioral similarity.<br><br>\
    In our analysis, we focus on the <strong>community embeddings</strong> only. Each community is a point in a 300-dimensional space. We then use <strong>t-SNE</strong>, a nonlinear dimensionality reduction method, to project these vectors into 2D while preserving local neighborhood structure — communities that appear close on the map tend to share similar audiences and linguistic patterns.<br><br>\
    <strong>The expectation:</strong> coherent regions of the map should roughly correspond to broad themes such as sports, politics, gaming, etc.<br><br>";
    const s3_Part2 = "What you see is not a geographic map, but a map of behavior and language.\n\nIn this space, r/cats should end up close to r/dogs because they attract similar users and use similar words. Finance subreddits cluster together, gaming subreddits cluster together, and so on.\n\nWith the embeddings in place, we can finally look at Reddit as a single landscape instead of millions of isolated threads.\n\nReady? Let’s project everything onto the plane and see what structure actually appears.";
    const s3_Part3 = "...Well. That’s not exactly the neat atlas we were hoping for.\n\nThe projection looks messy, dense, without clear boundries—more like a colorful cloud than clean continents of meaning.\n\nCommunities overlap, bleed into each other, and refuse to stay inside tidy topic boundaries. On Reddit, politics mixes with memes, news with jokes, finance with chaos.\n\nThe embedding space didn’t fail; it just revealed how interconnected everything is.\n\nIf we want a stricter way to slice the world, we need a different lens—something simpler, more rigid, almost old-fashioned.\n\nLet's look at geography.";

    const s4_Part1 = "Okay, we discarded the embedding clustering. We are going back to the basic geography.\n\nBut the data doesn't come with GPS coordinates. It just comes with names.\n\nI look at r/france and I know it's France. The computer just sees strings of text.\n\nIf only there was a way to force these subreddit names to confess which country they belong to...";
    
    const s4_Narrator1 = "<strong>Methodology: Mapping Communities to Countries</strong><br><br>\
    We infer country labels using <span class='gold-highlight'>fuzzy string matching</span>. We compare subreddit names against a reference table of nations, ISO codes, and demonyms using Levenshtein distance.<br><br>\
    Result: A mapping that translates digital activity into geographic space.";

    const s4_Part2 = "Gotcha. Now every subreddit has a flag.\n\nLet's analyse if the predicted countries actually make sense starting from religion. We don't ask 'Who has the most religious posts?'. We ask: 'In which country is religion a higher percentage of their total conversation?'.\n\nLet's see who is praying the hardest.";

    const s4_User = "Wait... look at the top of that chart. Sri Lanka, Israel, Saudi Arabia...\n\nThat makes perfect sense. These are countries where religion is central.\n\nBut look at the bottom of the list. The bars are almost invisible. Does the ranking even matter down there, or is it just empty noise?";

    const s4_Part3 = "Sharp eye. You are right: the top is the signal, the bottom is just silence.\n\nIn those bottom countries, people simply aren't talking about religion, so the value drops to near zero. We can ignore them.\n\nBut before we start connecting these nations, we have a bigger structural problem to fix.\n\nLook at the raw number of posts behind these flags.";

    const s4_Narrator2 = "<strong>Data Analysis: Signal vs. Volume</strong><br><br>\
    <strong>1. The Religion Chart:</strong> You correctly identified that the data is significant only at the top of the distribution. The \"Long Tail\" represents values so small that they are statistically negligible.<br><br>\
    <strong>2. The Volume Disparity:</strong> The table above reveals a new challenge. The USA generates <strong>18,000+ posts</strong>, while others have fewer than 1,000.<br><br>\
    <strong>Correction Strategy:</strong> For our upcoming <em>Interaction Analysis</em>, we cannot simply count links, or the USA would dominate every metric. We will apply a <strong>Normalization Protocol</strong> to penalize sheer volume and highlight genuine cultural connections.";
    const s4_Part4 = "Exactly. The big players tell the truth. The small players are just erratic.\n\nSo, we trust the signal, we ignore the noise, and we move on.\n\nWe know what they are saying. Now let's see who they are screaming at.";
    
    const s5_Part1 = "We've seen what countries look like alone. But let's be honest: isolation is boring.\n\nThe fun starts when they collide.\n\nWe tracked every time a subreddit from one country linked to another.\n\nWho is talking to whom? Who is watching whom?\n\nBehold the web of global attention.";
    const s5_Narrator = "<strong>Methodology: Logarithmic Normalization</strong><br><br>\
    To build this Chord Diagram, we didn't just count links. That would let big countries dominate. We applied a specific algorithm:<br><br>\
    1. <span class='gold-highlight'>Bidirectional Sum</span>: We treated relationships as undirected. A link from A-to-B counts the same as B-to-A. We summed them to get total bandwidth.<br><br>\
    2. <span class='gold-highlight'>Volume Penalty</span>: We calculated a 'Normalized Interaction Score' by dividing the link count by the <strong>Logarithm of the combined total posts</strong> of both nations. This penalizes sheer size and reveals true relative affinity.<br><br>\
    <strong>System Validation:</strong><br>The resulting map validates perfectly against real-world dynamics:<br>\
    • <span class='gold-highlight'>Neighbors:</span> Strong chords connect USA to Canada and India to Pakistan.<br>\
    • <span class='gold-highlight'>Politics:</span> High tension pairs like Iran/USA appear prominently.<br>\
    • <span class='gold-highlight'>Language:</span> Brazil and Portugal form a tight linguistic bond.";    
    const s5_Part2 = "See? I told you.\n\nEven in a chaotic digital void, you humans just can't help but replicate your real-world drama. The neighbors are still fighting. The colonies are still calling home.\n\nBut looking at pairs—'A talks to B'—is too simple. It's two-dimensional.\n\nThis is a Social Network, remember? It's not just a series of phone calls. It’s a massive, tangled mess of alliances.\n\nWe need to zoom out. We need to stop looking at countries and start looking at Factions.\n\nLet's build the Network.";


    const s6_Part1 = "We used a Network Analysis algorithm called Greedy Modularity.\n\nBasically, we asked the computer: 'Group these countries so that they talk to each other more than they talk to outsiders.'\n\nThe result? The world map repainted by Reddit.";
    const s6_Narrator1 = "<strong>Methodology: Greedy Modularity & Normalization</strong><br>\
    To detect these factions, we applied the <code>Greedy Modularity</code> algorithm on a weighted graph. Crucially, we calculated weights based on <strong>Positive Interactions</strong> normalized by the product of total activity: <code>Weight = Interactions / (TotalA * TotalB)</code>. This mathematical penalty prevents massive countries like the USA from swallowing smaller communities.<br><br>\
    <strong>Network Analysis: Key Findings</strong><br>\
    <ul style='margin-top:10px; padding-left:20px; text-align:left;'>\
    <li><span class='gold-highlight'>The Commonwealth (Red):</span> A specific cluster groups India, South Africa, Nigeria, Pakistan, and Australia. Despite vast distances, this \"Digital Heritage\" persists due to shared institutional and linguistic ties.</li>\
    <li><span class='gold-highlight'>The Eurasian Conflict Zone (Blue):</span> Russia anchors a massive bloc pulling in Eastern Europe, suggesting political discourses mathematically isolate these nations from the rest of the European cluster.</li>\
    <li><span class='gold-highlight'>Fractured Americas:</span> While North America (USA, Canada, Mexico) forms a cohesive unit, South America fragments. The \"Southern Cone\" (Argentina, Chile, Uruguay) isolates itself into a separate faction.</li>\
    <li><span class='gold-highlight'>Linguistic Bridges:</span> The strong link between Brazil and Portugal proves that language features often override geography in hyperlink metrics.</li>\
    <li><span class='gold-highlight'>Significant Data Gaps:</span> Vast grey areas in Central Africa highlight a severe \"digital divide\".</li>\
    </ul>";    
    const s6_User = "Hang on... let me zoom in on the UK cluster.\n\nI see the UK, but look who they are connected to. It's not their European neighbors. It's countries halfway across the world.\n\nI've seen this map before in my history books.\n\nIs it just me, or did Reddit just recreate the British Empire?";
    const s6_Narrator2 = "<strong>Linguistic & Historical Echoes</strong><br><br>You are correct. The network analysis reveals strong <span class='gold-highlight'>\"Linguistic Bridges\"</span> that override geography.<br><br><strong>The UK Cluster:</strong> The algorithm links the UK to India and former commonwealth nations, driven by shared language and history.<br><br><strong>The Lusophone Connection:</strong> Similarly, Brazil and Portugal form a trans-Atlantic bond that ignores the rest of South America.<br><br>Conclusion: On Reddit, language is the strongest border.";
    const s6_Part2 = "Old habits die hard, don't they?\n\nWe think we live in the future, but our data is just re-enacting the 19th century.\n\nBut here is the million-dollar question: Is this permanent? Are these alliances set in stone, or do they shift like sand?\n\nWe have data covering 2014 to 2017. Let's add the Fourth Dimension. Let's see who stays loyal and who betrays the family.";
    
    const s7_Part1 = "You thought those alliances were written in stone? Please.\n\nThis is the internet. Loyalty lasts about as long as a viral meme.\n\nLook at this mess. Countries jumping from one faction to the other like they are changing socks.\n\nThey are all traitors. Except... maybe not all of them.\n\nLet's filter out the flakes and look for the die-hards. Who stuck together through thick and thin?";
    const s7_Narrator1 = "<strong>Reading the Matrix: The Loyalty Index</strong><br>This heatmap reveals how many quarters two countries spent in the same mathematical community.<ul style='margin-top:10px; padding-left:20px; text-align:left;'><li><span class='gold-highlight'>Ignore the Diagonal:</span> The bright yellow line matches a country with itself.</li><li><span class='gold-highlight'>The Irony of \"Loyalty\":</span> The brightest points are not necessarily friends. They are inseparable because their discourse is locked together.</li><li><span class='gold-highlight'>Russia & Ukraine:</span> Highly connected throughout the dataset.</li><li><span class='gold-highlight'>Israel & Palestine:</span> Mathematically glued together.</li><li><span class='gold-highlight'>India & Pakistan:</span> A permanent dyad.</li></ul><br><strong>Conclusion:</strong> On Reddit, your enemies are your closest neighbors. You cannot escape them.";
    const s7_Part2 = "Touching, isn't it? They hate each other so much they can't leave each other alone.\n\nSo we know who the couples are. But who is the Popular Kid? And who is eating lunch alone in the bathroom?\n\nLet's look at the final map of power.";
    const s7_Narrator2 = "<strong>Digital Geography: Shortest Path Analysis</strong><br><br>\
    This plot maps nations based on the <span class='gold-highlight'>shortest path length</span> of hyperlinks. Dots close together share direct connections, while distant dots are isolated.<br><br>\
    <ul style='margin-top:10px; padding-left:20px; text-align:left;'>\
    <li><span class='gold-highlight'>The Dense Core:</span> A tightly packed central cluster representing major geopolitical powers. These \"Grand Central Stations\" are so hyper-connected that the algorithm pulls them all into the center of gravity.</li>\
    <li><span class='gold-highlight'>The External Ring:</span> A sparse outer orbit (e.g., Bhutan, Benin). These are \"digitally distant\" nations; reaching them requires traversing many hops from the core.</li>\
    <li><span class='gold-highlight'>The Reddit Bias:</span> This topology highlights the platform's demographic skew. The ring nations act as \"satellite communities\"—isolated outposts with lower penetration that connect to the global conversation only through weak links.</li>\
    </ul>";
    const s7_Part3 = "There you have it. The Popular Kids and the Outcasts.\n\nBut simply knowing who talks to whom is just gossip.\n\nI want to get inside their heads. I want to know if they are starting to think alike.\n\nWhen the USA shouts, does the UK shout back? Or do they whisper?\n\nIt’s time for the psychological test. It’s time for Style Mirroring.";


    const s8_Part1 = "We need to focus now.\n\nWe have some serious questions to answer.\n\nIf I talk to you, will you mimic my tone, wording, and overall style in your reply?\n\nNo more guessing. We are doing this the hard way. Statistical Hypothesis Testing.\n\nPay attention.";
    const s8_Narrator1 = "<strong>Conditional Probability of Reciprocity</strong><br><br>To analyze social influence, we must first establish a baseline for engagement. We define a \"dialogue\" not as a single post, but as a closed loop where an initiator sends a post to someone that replies back to them.<br><br><strong>The Question:</strong> \"Given a post from Country X, what is the conditional probability of a response from Country Y within 7 days?\" <br><br><strong>Experimental Design:</strong> We isolated the \"Initiator\" (X) and the \"Responder\" (Y) using a deterministic timestamp logic. Then we identified the first valid response from either the country itself or another nation within a 168 hour window.";
    const s8_Part2 = "See? 19% vs 8%.\n\nYou are twice as likely to reply to a foreigner than to your own neighbor. Typical.\n\nDomestic issues? Boring. But someone from halfway across the world says you're wrong? You just have to type back. You love the drama.\n\nBut here is what I really want to know. When you reply... are you actually yourself? Or are you just a parrot?\n\nDo you unconsciously copy the people you argue with?";
    const s8_Narrator2 = "<p><strong>Linguistic Style Mirroring</strong></p><p><strong>The Hypothesis:</strong><br>When a post (A) triggers a reply (B), the respondent unconsciously mimics the <em>structural style</em> of the original post.</p><p><strong>Important:</strong> We measure alignment in <strong>style</strong> (tone, function words, pronouns) rather than <strong>topic</strong> (work, money), intentionally isolating linguistic behavior from content.</p><p><strong>Experimental Design:</strong></p><ul style='margin: 0.25rem 0 0.75rem 1.25rem; padding-left: 1.1rem;'><li><strong>Test Group (N = 2130):</strong> pairs of real interactions where a response occurred within a specific 7-day window.</li><li><strong>Control Group (N = 2130):</strong> randomly sampled <em>unconnected</em> pairs from the entire dataset, representing similarity expected by <em>pure chance</em>.</li></ul><p><strong>Methodology &amp; Statistical Validation:</strong></p><ul style='margin: 0.25rem 0 0.75rem 1.25rem; padding-left: 1.1rem;'><li>We calculated <strong>Cosine Similarity</strong> between style vectors (derived from LIWC/VADER features) for every pair in both groups.</li><li>We performed an <strong>Independent Samples T-Test</strong> with a directional hypothesis.</li></ul><p><strong>Key question:</strong> <em>Is the similarity of the Reciprocal group significantly greater than that of the Random group?</em></p><p>If <strong>p-value &lt; 0.05</strong>, we reject the null hypothesis, indicating the effect is unlikely to be a random fluke.</p><p><strong>Formal Statistical Hypotheses (one-tailed):</strong></p><ul style='margin: 0.25rem 0 0 1.25rem; padding-left: 1.1rem;'><li><strong>Null Hypothesis (H0):</strong> no evidence of mirroring (<em>&mu;<sub>reciprocal</sub> &le; &mu;<sub>random</sub></em>).</li><li><strong>Alternative Hypothesis (H1):</strong> mirroring exists (<em>&mu;<sub>reciprocal</sub> &gt; &mu;<sub>random</sub></em>).</li></ul>";
    const s8_Narrator3 = "<strong>Results of Mirroring Analysis:</strong><br><br><strong>Statistical Significance:</strong> P-Value < 0.0001.<br><br><strong>Interpretation:</strong> The Random Control Group (Orange) has a large peak around 0.0, and two small bumps around the extremes (+1.0 and -1.0).<br><br>However, the Reciprocal Group (Blue) shows a much more pronounced peak near +1.0, indicating a significant subset of responses almost perfectly mirror the style of the original post.<br><br><strong>Important note:</strong> This does <em>not</em> mean that all reciprocal interactions involve mirroring. Instead, the data suggests that a distinct subgroup of reciprocal posts exhibits extreme stylistic matching.<br><br>In other words, this subgroup is largely responsible for &quot;pulling&quot; the test group’s average upward and driving the overall statistical significance—confirming the presence of a powerful, though not universal, mirroring behavior.";
    const s8_Part3 = "Did you hear that?\n\nThe Scientist calls it a 'mirroring of linguistic profiles'. I’d describe it as blending in more than you might realize.\n\nThat 'pronounced peak' on the graph? It could be moments where people lean hard into matching the other person’s tone to be understood, or to be persuasive.\n\nYou start absorbing their anger, their words, their style. Sometimes you’re not communicating as much as you’re echoing.\n\nAnd after all that echoing, I need a break.\n\nLet’s go back to something simple. Something primal. Let’s talk about Sports.";

    const s9_Part0 = "So, we've established that you copy each other when you fight. But surely, when you have fun, you have your own personalities, right?\n\nAll over the world you humans are dedicated to chasing balls, clicking mice, and sweating in lycra. Behold the grand hierarchy of each nation's distractions.";
    const s9_Narrator1 = "<strong>Global Topic Analysis: The Sports Sunburst</strong><br><br><strong>Methodology:</strong> We aggregated activity across sports-related subreddits for each country and found the most popular sport for each nation. Then we visualized how the global sports discourse is divided between different disciplines in a sunburst chart.<br><br><strong>Key Findings:</strong><br><ul style='margin-top:5px; padding-left:15px;'><li><strong>The Digital Skew:</strong> Esports are classified in the top three, before sports like basketball and volleyball. This reflects the platform's tech-savvy demographic.</li><li><strong>Central sports:</strong> Accordingly to reddit usage, American Football is the most discussed sport (especially in US), followed by the main european attraction - Soccer.</li><li><strong>Regional Anomalies:</strong> While Europe clusters around Soccer, we can see some interesting anomalies. France exhibits a unique, statistically significant deviation towards Cycling, probably since it's the host for the world-renowned Tour-de-France. The UK is the place for many of the world's greatest football teams, but it still maintains a distinct cluster for its national sport, Cricket.</li></ul>";
    const s9_Part1 = "Did you see that? The 'Digital Skew'?\n\nThat's a polite way of saying the people of Reddit would rather watch pixels than go outside.\n\n...Alright, we have looked at the maps, the fights, and the games.\n\nLet's wrap this up.";

    const s10_Part1 = "And that's it.\n\nYou've seen the maps, the feuds, the secret alliances, and the ghost in the machine that makes us copy each other.\n\nYou can take off the Orange Glasses now.\n\nYou can go back to your 'Real World' where geography is boring and people only say things they mean.\n\nBut I have a feeling you'll be back. Because once you see the code behind the matrix... the real world looks a little bit dull.\n\nNow get out of here. Go touch some grass.";
    
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
        's9-part1': s9_Part0,  's9-part2': s9_Part1,
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
        's9-part1': false, 's9-part2': false,
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

                    // 1. GESTIONE FILTRO ARANCIONE (Si accende alla Scena 1 e RESTA acceso)
                    if (sectionId === 'scene-1') {
                        // Attiva il filtro globale se non c'è già
                        if (!document.body.classList.contains('orange-lens-active')) {
                            // Piccolo delay opzionale per l'ingresso scenico
                            setTimeout(() => {
                                document.body.classList.add('orange-lens-active');
                            }, 500);
                        }
                    }
                    // Nota: NON c'è un 'else' che rimuove 'orange-lens-active'. Resta per sempre.


                    // 2. GESTIONE CURSORE OCCHIALI (Solo dentro Scena 1)
                    if (sectionId === 'scene-1') {
                        // Se siamo in Scena 1, aggiungiamo la classe del cursore (con un delay se vuoi sync)
                        if (!document.body.classList.contains('glasses-cursor-mode')) {
                            glassesTimer = setTimeout(() => {
                                document.body.classList.add('glasses-cursor-mode');
                            }, 500);
                        }
                    } else {
                        // Se siamo in QUALSIASI altra scena (Intro, Scena 2, 3...):
                        // Uccidiamo il cursore speciale.
                        
                        if (glassesTimer) clearTimeout(glassesTimer); // Ferma il timer se stavi scrollando veloce
                        document.body.classList.remove('glasses-cursor-mode'); // Torna al cursore normale
                    }
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
                    
                    // 1. Reveal the row containing the chart
                    revealElement('s3-data-row');

                    // --- [START FIX] ---
                    // The chart is inside an <embed>, so we can't call .resize() directly.
                    // Instead, we reset the 'src' attribute. This forces the embed to 
                    // reload and recalculate its width/legend based on the now-visible container.
                    const embed = document.querySelector('#s3-data-row embed');
                    if (embed) {
                        setTimeout(() => {
                            const currentSrc = embed.getAttribute('src');
                            // Detach and reattach source to trigger a fresh render
                            embed.setAttribute('src', ''); 
                            embed.setAttribute('src', currentSrc);
                        }, 100); // Short delay to ensure CSS layout is settled
                    }
                    // --- [END FIX] ---

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
                    revealElement('s4-data-row');
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
                                
                                // 2. FORCE RELOAD THE IFRAME
                                const treemapIframe = document.querySelector('#s4-data-table iframe');
                                if (treemapIframe) {
                                    setTimeout(() => {
                                        const currentSrc = treemapIframe.getAttribute('src');
                                        treemapIframe.setAttribute('src', ''); 
                                        treemapIframe.setAttribute('src', currentSrc);
                                    }, 300); // 300ms delay ensures the CSS 'visible' transition is done
                                }
                                
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
    // SCENA 6
    function playScene6Sequence() {
        if (typedStatus['s6-part1']) return;
        console.log(">>> Starting Scene 6 Sequence");

        // 1. Mr Reddit inizia
        startTypeWriter('s6-part1', () => {
            
            // 2. Mostra la Mappa Interattiva (Factions)
            revealElement('s6-map-row');

            // --- [FIX: RELOAD EMBED TO FIX CUT-OFF LEGEND] ---
            // This forces the chart to re-initialize now that the container is visible.
            const embed = document.querySelector('#s6-map-row embed');
            if (embed) {
                setTimeout(() => {
                    const currentSrc = embed.getAttribute('src');
                    // Detach and reattach source to trigger a fresh render
                    embed.setAttribute('src', ''); 
                    embed.setAttribute('src', currentSrc);
                }, 100); 
            }
            // --------------------------------------------------
            
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
    // Controlliamo s9-part1 (ex part0)
    if (typedStatus['s9-part1']) return; 
    console.log(">>> Starting Scene 9 Sequence (Standardized)");

    // 1. New Intro Dialogue (Mr. Reddit) -> s9-part1
    startTypeWriter('s9-part1', () => {

        // 2. Appare il Sunburst
        revealElement('s9-sunburst-row');
        
        setTimeout(() => {
            // 3. Lo Scienziato analizza i dati
            showNarratorBubble('s9-narrator-row-1', 's9-narrator-text-1', s9_Narrator1);
            
            setTimeout(() => {
                // 4. Mr Reddit commenta (Outro) -> s9-part2 (ex part1)
                revealElement('s9-row-1'); // Nota: l'ID del div contenitore rimane s9-row-1, va bene.
                startTypeWriter('s9-part2', () => {
                    // 5. Bottone finale
                    revealElement('s9-action');
                });
            }, 8000); 
        }, 2000); 
    });
}

   // SCENA 10
// SCENA 10
function playScene10Sequence() {
    if (typedStatus['s10-part1']) return;
    console.log(">>> Starting Scene 10 Sequence");

    // Avvia la scrittura del testo finale
    startTypeWriter('s10-part1', () => {

        // Soluzione Standard: Mostra i bottoni subito dopo il testo
        setTimeout(() => {
            revealElement('s10-action');
        }, 500); // Un piccolo ritardo di mezzo secondo per eleganza

    });
}

    // ==========================================
    // 5. UTILITIES
    // ==========================================

// Add a new object to track pending initializations
const pendingStatus = {}; 

function startTypeWriter(elementId, callback = null) {
    const element = document.getElementById(elementId);
    if (!element) { console.error("Missing:", elementId); return; }
    
    // --- MODIFICA FONDAMENTALE PER REVIEW MODE ---
    // Se siamo in Review Mode, scrivi subito tutto, esegui il callback ed esci.
    if (document.body.classList.contains('review-mode')) {
        const text = scenarios[elementId] || "";
        element.innerHTML = text.replace(/\n/g, '<br>');
        typedStatus[elementId] = true;
        if (callback) callback();
        return; // STOP! Non animare nulla.
    }
    // ---------------------------------------------

    // Check normale
    if (typedStatus[elementId] || pendingStatus[elementId]) {
        return;
    }

    pendingStatus[elementId] = true;

    const runTyping = () => {
        typedStatus[elementId] = true; 
        const text = scenarios[elementId] || " ... ";
        element.innerHTML = "";
        let i = 0;
        
        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') { 
                    element.innerHTML += '<br>'; 
                    i++; 
                    setTimeout(type, 400); 
                } else { 
                    element.innerHTML += char; 
                    i++; 
                    setTimeout(type, Math.floor(Math.random() * 5) + 2); 
                }
            } else { 
                if (callback) callback(); 
            }
        }
        type();
    };

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

    // --- UPDATED TRIGGER LOGIC ---
    const startBtn = document.getElementById('start-glitch-btn');

    if (startBtn) {
        // Only trigger when this specific button is clicked
        startBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent bubbling issues
            triggerGlitch();
        });
    }

    // Optional: Keep 'enter' key as an alternative accessibility trigger
    window.addEventListener('keydown', (e) => {
        if (!hasGlitched && e.key === 'Enter') {
            triggerGlitch();
        }
    });

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

    // CLEANUP: Remove all special effects immediately
    body.classList.remove('orange-lens-active');  // Via il filtro
    body.classList.remove('glasses-cursor-mode'); // Via il cursore
    body.classList.remove('glitch-active');      
    // ---------------------------------------

    // 1. Transizione visuale
    body.style.opacity = '0';

    setTimeout(() => {
        // ... rest of the function remains the same ...
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


window.enterReviewMode = function() {
    console.log(">>> Entering Review Mode (Instant Text)...");

    const body = document.body;
    const redditLayer = document.getElementById('reddit-layer');
    const referenceLayer = document.getElementById('reference-layer');
    const boringLayer = document.getElementById('boring-layer');
    const overlay42 = document.getElementById('answer-42-overlay');

    // 1. GESTIONE DISPLAY
    if (referenceLayer) referenceLayer.style.display = 'none';
    if (boringLayer) boringLayer.style.display = 'none';
    if (overlay42) overlay42.style.display = 'none';

    if (redditLayer) {
        redditLayer.style.display = 'block';
        redditLayer.style.opacity = '1';
    }

    // 2. CLASSI CSS (Review Mode attiva opacity:1 !important su tutto nel CSS)
    body.classList.remove('boring-mode');
    body.classList.add('dark-mode');
    body.classList.add('review-mode'); 
    body.classList.add('orange-lens-active');

    // 3. RIEMPIMENTO ISTANTANEO TESTI (Senza animazione)
    for (const [id, text] of Object.entries(scenarios)) {
        const el = document.getElementById(id);
        if (el) {
            // Inietta il testo formattato
            el.innerHTML = text.replace(/\n/g, '<br>');
            // IMPORTANTE: Segna come "già fatto" per bloccare logiche future
            typedStatus[id] = true; 
            pendingStatus[id] = true; 
        }
    }

    // 4. RIVELA TUTTI GLI ELEMENTI NASCOSTI
    document.querySelectorAll('.hidden-opacity').forEach(el => {
        el.classList.remove('hidden-opacity');
        el.classList.add('visible-opacity');
    });

    // 5. NASCONDI TUTTI I CURSORI LAMPEGGIANTI
    document.querySelectorAll('.cursor').forEach(el => {
        el.style.display = 'none';
    });

    // 6. FORZA NARRATORI E GRAFICI (Hardcoded per sicurezza)
    // Se un elemento non è in scenarios, lo riempiamo qui
    const manualFills = [
        { id: 's1-narrator-text', content: s1_Narrator },
        { id: 's2-analysis-text', content: s2_Analysis },
        { id: 's3-narrator-text', content: s3_Narrator },
        { id: 's4-narrator-text-1', content: s4_Narrator1 },
        { id: 's4-narrator-text-2', content: s4_Narrator2 },
        { id: 's5-narrator-text-1', content: s5_Narrator },
        { id: 's6-narrator-text-1', content: s6_Narrator1 },
        { id: 's6-narrator-text-2', content: s6_Narrator2 },
        { id: 's7-narrator-text-1', content: s7_Narrator1 },
        { id: 's7-narrator-text-2', content: s7_Narrator2 },
        { id: 's8-narrator-text-1', content: s8_Narrator1 },
        { id: 's8-narrator-text-2', content: s8_Narrator2 },
        { id: 's8-narrator-text-3', content: s8_Narrator3 },
        { id: 's9-narrator-text-1', content: s9_Narrator1 }
    ];

    manualFills.forEach(item => {
        const el = document.getElementById(item.id);
        if (el) el.innerHTML = item.content;
    });

    // Forza i grafici specifici
    renderScene4Chart();
    renderScene4Table();
    animateValue("count-posts", 858488, 858488, 1);
    animateValue("count-subs", 67180, 67180, 1);
    animateValue("count-vec", 86, 86, 1);

    // Forza visibilità nuvole narratore
    document.querySelectorAll('.narrator-bubble-box').forEach(el => el.classList.add('visible'));
    document.querySelectorAll('.narrator-cloud').forEach(el => el.classList.add('slide-in-active'));

    // 7. Scrolla in cima
    window.scrollTo(0, 0);
};
