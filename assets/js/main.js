document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const boringContainer = document.querySelector('.boring-container');
  let hasGlitched = false;

  const triggerGlitch = () => {
    if (hasGlitched) return;
    hasGlitched = true;

    body.classList.add('glitch-active');

    setTimeout(() => {
      body.classList.remove('boring-mode');
      body.classList.add('dark-mode');
      body.classList.remove('glitch-active');
      window.scrollTo(0,0);
    }, 800);
  };

  if(boringContainer) {
    // OLD CODE:
    // window.addEventListener('mousemove', triggerGlitch); <--- DELETED
    // window.addEventListener('click', triggerGlitch);     <--- DELETED
    
    // NEW CODE:
    window.addEventListener('scroll', triggerGlitch);    // Detects actual scrolling
    window.addEventListener('wheel', triggerGlitch);     // Detects mouse wheel movement
    window.addEventListener('touchmove', triggerGlitch); // Detects mobile swiping
  }
});
