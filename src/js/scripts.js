function openPanel(e) {
  closeAllPanels();
  let a = document.getElementById(e + "-panel"),
    t = document.getElementById("hero");
  a && (a.classList.add("active"), t.classList.add("dimmed"), document.body.classList.add("menu-open"));
}

function closeAllPanels() {
  let e = document.querySelectorAll(".panel"),
    a = document.getElementById("hero");
  e.forEach((e) => e.classList.remove("active")),
    a.classList.remove("dimmed"),
    document.body.classList.remove("menu-open");
}
document.addEventListener("keydown", function (e) {
  "Escape" === e.key && closeAllPanels();
});

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
    view_github: "View more on GitHub →",
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
function setLanguage(e) {
  if (!translations[e] || currentLang === e) return;
  document.getElementById("btn-id").classList.toggle("active", "id" === e),
    document.getElementById("btn-en").classList.toggle("active", "en" === e);
  let a = document.querySelectorAll("[data-i18n]");
  a.forEach((e) => {
    e.classList.add("text-changing");
  }),
    setTimeout(() => {
      (currentLang = e),
        a.forEach((a) => {
          let t = a.getAttribute("data-i18n");
          translations[e][t] && (a.innerText = translations[e][t]), a.classList.remove("text-changing");
        });
    }, 300);
}
