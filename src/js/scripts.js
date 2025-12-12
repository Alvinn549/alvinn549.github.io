(function (global) {
  'use strict';

  const CONFIG = {
    defaultLang: 'id',
    defaultTheme: 'system',
    particleInterval: 400,
    svgParticleSources: [
      '../images/snow-1.svg',
      '../images/snow-2.svg',
      '../images/snow-3.svg',
    ]
  };

  const state = {
    lang: CONFIG.defaultLang,
    particleTimer: null
  };

  // --- DOM Cache ---
  const DOM = {
    hero: document.getElementById("hero"),
    body: document.body,
    particleContainer: document.getElementById("particle-container"),
    settingsDock: document.getElementById("settings-dock"),
    btnId: document.getElementById("btn-id"),
    btnEn: document.getElementById("btn-en"),
    themeBtns: document.querySelectorAll('.theme-group .dock-btn'),
    i18nElements: () => document.querySelectorAll("[data-i18n]"),
    panels: () => document.querySelectorAll(".panel")
  };

  // --- Translations ---
  const TRANSLATIONS = {
    id: {
      nav_work: "KARYA",
      nav_about: "TENTANG",
      nav_contact: "KONTAK",
      hero_title: "HELLO WORLD",
      hero_desc: "Menciptakan solusi web yang cepat, estetik, dan fungsional.",
      work_panel_title: "KARYA TERPILIH",
      work_1_desc: "Sistem Akuntabilitas Kinerja Instansi Pemerintah. Pelaporan kinerja birokrasi, visualisasi data, dan evaluasi internal.",
      work_2_desc: "Platform edukasi seksual digital interaktif. Dibangun dengan arsitektur MVC modern, fitur mencakup modul pembelajaran multimedia, dan sistem manajemen user yang aman untuk pendidikan kesehatan.",
      work_3_desc: "Aplikasi kasir berbasis cloud yang dirancang untuk membantu pelaku usaha UMKM, toko retail, dan kuliner dalam mengelola transaksi, stok, dan laporan keuangan secara real-time dari mana saja.",
      view_github: "Lihat repositori lainnya →",
      about_title: "PENDEKATAN SAYA",
      about_intro: "Sebagai Web Developer, saya percaya teknologi terbaik adalah yang terasa alami bagi penggunanya. Bukan sekadar menulis kode, saya menciptakan solusi digital yang menyelesaikan masalah bisnis nyata. Fokus utama saya adalah menghapus kompleksitas teknis untuk menonjolkan esensi fungsionalitas dan estetika.",
      services_title: "Layanan & Keahlian",
      tech_title: "Teknologi Utama",
      download_cv: "Unduh Resume Lengkap (PDF)",
      contact_title: "Mari Berkolaborasi",
      contact_sub: "Terbuka untuk proyek freelance & konsultasi profesional.",
      social_title: "Sosial Media",
    },
    en: {
      nav_work: "WORK",
      nav_about: "ABOUT",
      nav_contact: "CONTACT",
      hero_title: "HELLO WORLD",
      hero_desc: "Crafting fast, aesthetic, and functional web solutions.",
      work_panel_title: "SELECTED WORK",
      work_1_desc: "Government Performance Accountability System. Bureaucratic performance reporting, data visualization, and internal evaluation tools.",
      work_2_desc: "Interactive digital education platform. Built with modern MVC architecture, featuring multimedia learning modules and a secure user management system for health education.",
      work_3_desc: "Cloud-based point-of-sale application designed to help MSME entrepreneurs, retail stores, and culinary businesses manage transactions, inventory, and financial reports in real-time from anywhere.",
      view_github: "View more public repositories on GitHub →",
      about_title: "MY APPROACH",
      about_intro: "As a Web Developer, I believe the best technology feels natural to the user. I don't just write code; I build digital solutions that solve real business problems. My main focus is removing technical complexity to highlight the essence of functionality and aesthetics.",
      services_title: "Services & Expertise",
      tech_title: "Core Technologies",
      download_cv: "Download Full Resume (PDF)",
      contact_title: "Let's Collaborate",
      contact_sub: "Available for freelance projects & professional consultation.",
      social_title: "Social Media",
    },
  };

  // --- Functionality: Panels ---
  function closeAllPanels() {
    DOM.panels().forEach((p) => p.classList.remove("active"));
    if (DOM.hero) DOM.hero.classList.remove("dimmed");
    DOM.body.classList.remove("menu-open");
  }

  function openPanel(panelId) {
    closeAllPanels();
    const panel = document.getElementById(`${panelId}-panel`);
    if (panel) {
      panel.classList.add("active");
      if (DOM.hero) DOM.hero.classList.add("dimmed");
      DOM.body.classList.add("menu-open");
    }
  }

  // --- Functionality: Language ---
  function setLanguage(lang) {
    if (!TRANSLATIONS[lang] || state.lang === lang && DOM.btnId.classList.contains('active')) return;

    // Toggle Buttons
    if (DOM.btnId) DOM.btnId.classList.toggle("active", lang === "id");
    if (DOM.btnEn) DOM.btnEn.classList.toggle("active", lang === "en");

    const elements = DOM.i18nElements();

    // Add fade-out effect
    elements.forEach((el) => el.classList.add("text-changing"));

    setTimeout(() => {
      state.lang = lang;
      elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (TRANSLATIONS[lang][key]) {
          el.innerText = TRANSLATIONS[lang][key];
        }
        el.classList.remove("text-changing");
      });
    }, 300);
  }

  // --- Functionality: Theme ---
  function setTheme(mode, save = true) {
    DOM.themeBtns.forEach(btn => btn.classList.remove('active'));

    const activeBtn = document.getElementById(`theme-${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    let appliedTheme = mode;
    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      appliedTheme = systemDark ? 'dark' : 'light';
    }

    document.documentElement.setAttribute('data-theme', appliedTheme);
    if (save) localStorage.setItem('theme', mode);
  }

  // --- Functionality: Dock ---
  function toggleDock() {
    if (!DOM.settingsDock) return;
    DOM.settingsDock.classList.toggle('collapsed');
    const isCollapsed = DOM.settingsDock.classList.contains('collapsed');
    localStorage.setItem('dockState', isCollapsed ? 'closed' : 'open');
  }

  // --- Functionality: Particles ---
  function initParticles() {
    if (!DOM.particleContainer) return;

    function createParticle() {
      // Optimization: Stop creating particles if tab is hidden to save battery
      if (document.hidden) return;

      const particle = document.createElement("img");
      const randomSvg = CONFIG.svgParticleSources[Math.floor(Math.random() * CONFIG.svgParticleSources.length)];

      particle.src = randomSvg;
      particle.classList.add("particle");
      particle.alt = ""; // Decorative

      // Randomize Props
      const startX = Math.random() * 100;
      const size = Math.random() * 20 + 10;
      const fallDuration = Math.random() * 7 + 5;
      const delay = Math.random() * 2;
      const opacity = Math.random() * 0.5 + 0.3;

      particle.style.cssText = `
                left: ${startX}vw;
                width: ${size}px;
                animation-duration: ${fallDuration}s, 3s;
                animation-delay: 0s, ${delay}s;
                opacity: ${opacity};
            `;

      DOM.particleContainer.appendChild(particle);

      // Cleanup
      setTimeout(() => {
        if (particle.parentNode) particle.remove();
      }, fallDuration * 1000);
    }

    // Clear existing interval if any (prevents double init)
    if (state.particleTimer) clearInterval(state.particleTimer);
    state.particleTimer = setInterval(createParticle, CONFIG.particleInterval);
  }

  function init() {
    // 1. Language
    setLanguage(state.lang);

    // 2. Theme
    const savedTheme = localStorage.getItem('theme') || CONFIG.defaultTheme;
    setTheme(savedTheme, false);

    // Listen for system changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (localStorage.getItem('theme') === 'system') setTheme('system');
    });

    // 3. Dock State
    const savedDockState = localStorage.getItem('dockState');
    if (savedDockState === 'closed' && DOM.settingsDock) {
      DOM.settingsDock.classList.add('collapsed');
    }

    // 4. Particles
    initParticles();

    // 5. Global Event Listeners
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAllPanels();
    });
  }

  // --- Expose Public Functions ---
  global.openPanel = openPanel;
  global.closeAllPanels = closeAllPanels;
  global.setLanguage = setLanguage;
  global.setTheme = setTheme;
  global.toggleDock = toggleDock;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})(window);