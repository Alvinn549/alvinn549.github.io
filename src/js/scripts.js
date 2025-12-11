const translations = {
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

let currentLang = "id";

function setLanguage(lang) {
  if (!translations[lang] || currentLang === lang) return;

  document.getElementById("btn-id").classList.toggle("active", lang === "id");
  document.getElementById("btn-en").classList.toggle("active", lang === "en");

  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => el.classList.add("text-changing"));

  setTimeout(() => {
    currentLang = lang;
    elements.forEach((el) => {
      const key = el.getAttribute("data-i18n");
      if (translations[lang][key]) {
        el.innerText = translations[lang][key];
      }
      el.classList.remove("text-changing");
    });
  }, 300);
}

function openPanel(panelId) {
  closeAllPanels();
  const panel = document.getElementById(panelId + "-panel");
  const hero = document.getElementById("hero");
  if (panel) {
    panel.classList.add("active");
    hero.classList.add("dimmed");
    document.body.classList.add("menu-open");
  }
}

function closeAllPanels() {
  const panels = document.querySelectorAll(".panel");
  const hero = document.getElementById("hero");
  panels.forEach((p) => p.classList.remove("active"));
  if (hero) hero.classList.remove("dimmed");
  document.body.classList.remove("menu-open");
}

function setTheme(mode, save = true) {
  document.querySelectorAll('.theme-group .dock-btn').forEach(btn => btn.classList.remove('active'));

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

function initTheme() {
  const savedTheme = localStorage.getItem('theme') || 'system';
  setTheme(savedTheme, false);
}

function toggleDock() {
  const dock = document.getElementById('settings-dock');
  dock.classList.toggle('collapsed');
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeAllPanels();
});

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (localStorage.getItem('theme') === 'system') {
    setTheme('system');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  setLanguage(currentLang);
});