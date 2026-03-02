
    // LOADER
    window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('hidden'), 900));

    // THEME
    let dark = true;
    const root = document.documentElement, btn = document.getElementById('themeBtn');
    btn.addEventListener('click', () => { dark = !dark; root.setAttribute('data-theme', dark ? 'dark' : 'light'); btn.innerHTML = dark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>' });

    // HAMBURGER
    const ham = document.getElementById('hamburger'), mob = document.getElementById('mobileMenu');
    ham.addEventListener('click', () => mob.classList.toggle('open'));
    document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mob.classList.remove('open')));

    // NAVBAR + BACK TO TOP
    const nav = document.getElementById('navbar'), btt = document.getElementById('back-top');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', scrollY > 50);
      btt.classList.toggle('show', scrollY > 400);
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // REVEAL ON SCROLL
    const revObs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 70); revObs.unobserve(e.target) } });
    }, { threshold: .1 });
    document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

    // SKILL BARS
    const skObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const bar = e.target.querySelector('.skill-bar');
          if (bar) setTimeout(() => bar.style.width = e.target.dataset.pct + '%', 150);
          skObs.unobserve(e.target);
        }
      });
    }, { threshold: .3 });
    document.querySelectorAll('.skill-card').forEach(c => skObs.observe(c));

    // TYPING
    const phrases = ['Building Scalable Software.', 'Exploring Artificial Intelligence.', 'Solving Complex Problems.', 'Crafting Elegant Interfaces.', 'Turning Ideas into Reality.'];
    let pi = 0, ci = 0, del = false;
    const typed = document.getElementById('typed-text');
    function type() {
      const cur = phrases[pi];
      if (!del) { typed.textContent = cur.slice(0, ++ci); if (ci === cur.length) { setTimeout(() => { del = true; type() }, 2000); return } }
      else { typed.textContent = cur.slice(0, --ci); if (!ci) { del = false; pi = (pi + 1) % phrases.length } }
      setTimeout(type, del ? 50 : 90);
    }
    setTimeout(type, 1200);

    // CONTACT FORM
    document.getElementById('submitBtn').addEventListener('click', function (e) {
      e.preventDefault();
      this.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      this.style.background = 'linear-gradient(135deg,#2ecc71,#27ae60)';
      setTimeout(() => { this.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; this.style.background = '' }, 3000);
    });

    // ACTIVE NAV HIGHLIGHT
    const secObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          document.querySelectorAll('.nav-links a').forEach(l => l.style.color = '');
          const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if (a) a.style.color = 'var(--lav-300)';
        }
      });
    }, { threshold: .45 });
    document.querySelectorAll('section[id]').forEach(s => secObs.observe(s));
  
