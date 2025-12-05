document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const boringContainer = document.querySelector('.boring-container');
  let hasGlitched = false;

  // Function to trigger the glitch and switch worlds
  const triggerGlitch = () => {
    if (hasGlitched) return;
    hasGlitched = true;

    // Add glitch effect
    body.classList.add('glitch-active');

    // Wait 500ms then switch to Dark Mode
    setTimeout(() => {
      body.classList.remove('boring-mode');
      body.classList.add('dark-mode');
      body.classList.remove('glitch-active');
      window.scrollTo(0,0);
    }, 800);
  };

  // Listen for interaction on the boring page
  if(boringContainer) {
    window.addEventListener('scroll', triggerGlitch);
    window.addEventListener('mousemove', triggerGlitch);
    window.addEventListener('click', triggerGlitch);
  }
});
