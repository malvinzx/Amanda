(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Intro loading screen; reveal the site after its initial layout is ready.
  const preloader = $('#preloader');
  const finishLoading = () => {
    if (!preloader || preloader.classList.contains('done')) return;
    preloader.classList.add('done');
    document.body.classList.remove('is-loading');
    window.setTimeout(() => preloader.remove(), 750);
  };
  window.addEventListener('load', () => window.setTimeout(finishLoading, 650), { once: true });
  // Safety fallback if a remote image/font is slow or fails.
  window.setTimeout(finishLoading, 3500);


  // Scroll reveal: elements animate in once, while still respecting reduced-motion settings.
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$('.reveal').forEach(el => reduceMotion ? el.classList.add('visible') : revealObserver.observe(el));

  // Scroll progress indicator.
  const progressBar = $('#progressBar');
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // Small custom cursor glow on pointer devices.
  const glow = $('#cursorGlow'), dot = $('#cursorDot');
  if (window.matchMedia('(pointer:fine)').matches && !reduceMotion) {
    window.addEventListener('pointermove', event => {
      glow.style.left = `${event.clientX}px`; glow.style.top = `${event.clientY}px`;
      dot.style.left = `${event.clientX}px`; dot.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  // Mobile navigation.
  const menuToggle = $('#menuToggle'), nav = $('#nav');
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  $$('#nav a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open'); menuToggle.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));

  // Theme switch, no storage required.
  const themeToggle = $('#themeToggle');
  themeToggle.addEventListener('click', () => {
    const dark = document.body.classList.toggle('dark');
    themeToggle.textContent = dark ? '☀' : '☾';
    themeToggle.setAttribute('aria-label', dark ? 'Aktifkan tema terang' : 'Aktifkan tema gelap');
    showToast(dark ? 'A little midnight magic ✦' : 'Back to the rosy side ♡');
  });

  let toastTimer;
  function showToast(message) {
    const toast = $('#toast');
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2400);
  }

  // Rotating affirmations.
  const affirmations = [
    '“You are allowed to grow slowly.”',
    '“Rest is part of becoming.”',
    '“You deserve the same softness you give away.”',
    '“Your pace is still progress.”',
    '“There is room for you, exactly as you are.”',
    '“You can begin again, as many times as you need.”'
  ];
  let affirmationIndex = 0;
  $('#affirmationButton').addEventListener('click', () => {
    const el = $('#affirmation');
    el.classList.remove('show');
    setTimeout(() => {
      el.textContent = affirmations[affirmationIndex % affirmations.length];
      affirmationIndex++;
      el.classList.add('show');
    }, 120);
  });

  // Tiny floating hearts for a playful, tactile response.
  function burstHearts(x, y, count = 12) {
    if (reduceMotion) { showToast('A little love for you ♡'); return; }
    for (let i = 0; i < count; i++) {
      const heart = document.createElement('span');
      heart.className = 'heart-particle';
      heart.textContent = ['♡', '♥', '✦', '✿'][Math.floor(Math.random() * 4)];
      heart.style.left = `${x + (Math.random() - .5) * 90}px`;
      heart.style.top = `${y + (Math.random() - .5) * 25}px`;
      heart.style.setProperty('--dx', `${(Math.random() - .5) * 150}px`);
      heart.style.setProperty('--rot', `${(Math.random() - .5) * 70}deg`);
      heart.style.animationDelay = `${Math.random() * .18}s`;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1700);
    }
  }
  $('#sprinkleButton').addEventListener('click', event => {
    const rect = event.currentTarget.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top, 20);
    showToast('A tiny sprinkle of magic, just for you ✨');
  });

  // Letter modal with keyboard support and focus return.
  const overlay = $('#letterOverlay'), openLetter = $('#openLetter'), closeLetter = $('#closeLetter');
  let previousFocus = null;
  function openModal() {
    previousFocus = document.activeElement;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeLetter.focus();
  }
  function closeModal() {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previousFocus) previousFocus.focus();
  }
  openLetter.addEventListener('click', openModal);
  closeLetter.addEventListener('click', closeModal);
  overlay.addEventListener('click', event => { if (event.target === overlay) closeModal(); });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay.classList.contains('open')) closeModal();
  });
  $('#letterHeart').addEventListener('click', event => {
    const rect = event.currentTarget.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top, 24);
    showToast('Heart received. Keep being you ♡');
    closeModal();
  });

  // Gentle magnetic hover on larger screens.
  if (window.matchMedia('(pointer:fine)').matches && !reduceMotion) {
    $$('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const x = (event.clientX - rect.left - rect.width / 2) * .08;
        const y = (event.clientY - rect.top - rect.height / 2) * .12;
        button.style.transform = `translate(${x}px, ${y - 2}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  // Make the gallery keyboard-friendly and give each card a tactile reaction.
  $$('.moment-card').forEach(card => {
    const react = () => {
      const rect = card.getBoundingClientRect();
      burstHearts(rect.left + rect.width / 2, rect.top + 45, 6);
      showToast('Keep this little moment ♡');
    };
    card.addEventListener('click', react);
    card.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); react(); }
    });
  });
})();
