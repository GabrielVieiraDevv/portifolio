/* ===== Dados ===== */
var skills = [
  { n: "Python", i: "Py", v: 70, pt: "Scripts e lógica de programação", en: "Scripting and programming logic" },
  { n: "C#", i: "C#", v: 65, pt: "Aplicações e orientação a objetos", en: "Applications and object-oriented programming" },
  { n: "JavaScript", i: "JS", v: 65, pt: "Interatividade e lógica no front-end", en: "Front-end interactivity and logic" },
  { n: "HTML5", i: "</>", v: 85, pt: "Estrutura semântica de páginas", en: "Semantic page structure" },
  { n: "CSS3", i: "{ }", v: 80, pt: "Layouts responsivos e estilização", en: "Responsive layouts and styling" },
  { n: "MySQL", i: "DB", v: 70, pt: "Modelagem e consultas SQL", en: "Data modeling and SQL queries" },
  { n: "Pacote Office", i: "Of", v: 90, pt: "Word, Excel e PowerPoint", en: "Word, Excel and PowerPoint", en_n: "Microsoft Office" }
];

var projects = [
  {
    t: "Focinho Feliz", c: ["web", "academico"], tags: ["HTML", "CSS", "JavaScript"],
    u: "https://github.com/GabrielVieiraDevv/focinhofeliz",
    pt: { y: "Acadêmico", d: "Projeto educacional desenvolvido na disciplina Fundamentos de Desenvolvimento Web, no CEET Vasco Coutinho.", go: "Ver código →" },
    en: { y: "Academic", d: "Educational project built for the Web Development Fundamentals course at CEET Vasco Coutinho.", go: "View code →" }
  },
  {
    t: "Pneu Queimado", c: ["web"], tags: ["HTML"],
    u: "https://github.com/GabrielVieiraDevv/pneu_queimado",
    pt: { y: "Pessoal", d: "Projeto web criado com HTML, publicado no meu GitHub.", go: "Ver código →" },
    en: { y: "Personal", d: "Web project built with HTML, published on my GitHub.", go: "View code →" }
  }
];

/* Textos em inglês (o português fica no próprio HTML) */
var EN = {
  nav_about: "About", nav_skills: "Skills", nav_projects: "Projects", nav_edu: "Education", nav_contact: "Contact",
  badge: "Open to internships and junior roles",
  h1: 'Hi, I’m <span class="grad">Gabriel Vieira Correia</span>',
  lead: "IT Technician student in Vila Velha, Brazil, focused on building software and database solutions. I like turning ideas into code that works and keeps evolving.",
  btn_projects: "View projects →", btn_talk: "Get in touch",
  code_course: '"IT Technician"', code_looking: '"internship / junior"',
  e_about: "01. about", h_about: "Who I am", sub_about: "Programming, databases and a will to learn every day.",
  about_1: "I’m an IT Technician student focused on developing software and database solutions.",
  about_2: "I have hands-on experience in academic and personal projects using <b>Python</b>, <b>C#</b>, <b>HTML5</b>, <b>CSS3</b>, <b>JavaScript</b> and <b>MySQL</b>, plus strong command of the <b>Microsoft Office suite</b>.",
  about_3: "Now I’m looking for an <b>internship or junior-level</b> opportunity to apply what I know, learn with a real team and grow professionally.",
  f1l: "Location", f1v: "Vila Velha, Espírito Santo, Brazil",
  f2l: "Education", f2v: "IT Technician (in progress)",
  f3l: "Goal", f3v: "Internship or junior role",
  e_skills: "02. skills", h_skills: "Technologies", sub_skills: "Tools I use in my academic and personal projects.",
  e_proj: "03. projects", h_proj: "Featured projects", sub_proj: "A few works published on my GitHub. More on the way!",
  f_all: "All", f_acad: "Academic",
  e_edu: "04. education", h_edu: "Journey", sub_edu: "Where I am and where I want to go.",
  t1s: "Currently", t1h: "IT Technician",
  t1p: "Software development, programming logic, databases and web development, with hands-on academic projects.",
  t2s: "Next step", t2h: "Internship or junior software developer role",
  t2p: "Ready to contribute code, learn best practices and grow alongside a team.",
  e_contact: "05. contact", h_contact: "Let’s talk?",
  c_p: "I’m looking for an opportunity to start in the field. If my profile fits your team, reach out!",
  c_mail: "✉ Send e-mail", c_copy: "copy"
};

var STR = {
  pt: {
    title: "Gabriel Vieira Correia | Desenvolvedor de Software",
    toast: "E-mail copiado!", btn: "EN",
    words: ["Desenvolvedor de Software em formação", "Apaixonado por código e dados", "Buscando estágio / vaga júnior"]
  },
  en: {
    title: "Gabriel Vieira Correia | Software Developer",
    toast: "E-mail copied!", btn: "PT",
    words: ["Software Developer in training", "Passionate about code and data", "Looking for an internship / junior role"]
  }
};

/* ===== Idioma ===== */
var lang = "pt";
var i18nEls = document.querySelectorAll("[data-i18n]");
i18nEls.forEach(function (el) { el.dataset.pt = el.innerHTML; });

function setLang(l) {
  lang = l;
  document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  document.title = STR[l].title;
  i18nEls.forEach(function (el) {
    el.innerHTML = l === "pt" ? el.dataset.pt : (EN[el.dataset.i18n] || el.dataset.pt);
  });
  document.getElementById("lang").textContent = STR[l].btn;
  document.getElementById("toast").textContent = STR[l].toast;
  renderSkills();
  renderProjects();
  wi = 0; ci = 0; del = false;
  try { localStorage.setItem("lang", l); } catch (e) {}
}

/* ===== Habilidades ===== */
function renderSkills() {
  var sg = document.getElementById("skillGrid");
  sg.innerHTML = "";
  skills.forEach(function (s) {
    var name = lang === "en" && s.en_n ? s.en_n : s.n;
    var el = document.createElement("div");
    el.className = "skill rv in";
    el.innerHTML = '<div class="ic">' + s.i + "</div><h3>" + name + "</h3><p>" + s[lang] +
      '</p><div class="bar-bg"><div class="bar-fg" data-v="' + s.v + '"></div></div>';
    sg.appendChild(el);
    io.observe(el);
    el.classList.remove("in");
  });
}

/* ===== Projetos ===== */
var currentFilter = "all";
function renderProjects() {
  var pg = document.getElementById("projGrid");
  pg.innerHTML = "";
  projects.forEach(function (p) {
    var x = p[lang];
    var el = document.createElement("article");
    el.className = "proj rv in";
    el.dataset.c = p.c.join(" ");
    el.innerHTML = '<div class="top"><span>' + x.y + "</span><span>GitHub</span></div><h3>" + p.t +
      "</h3><p>" + x.d + '</p><div class="tags">' +
      p.tags.map(function (t) { return "<span>" + t + "</span>"; }).join("") +
      '</div><a class="go" href="' + p.u + '" target="_blank" rel="noopener">' + x.go + "</a>";
    pg.appendChild(el);
  });
  applyFilter();
}
function applyFilter() {
  document.querySelectorAll(".proj").forEach(function (p) {
    p.classList.toggle("hide", currentFilter !== "all" && p.dataset.c.split(" ").indexOf(currentFilter) < 0);
  });
}
document.getElementById("filters").addEventListener("click", function (e) {
  var b = e.target.closest(".chip");
  if (!b) return;
  document.querySelectorAll("#filters .chip").forEach(function (c) { c.classList.remove("on"); });
  b.classList.add("on");
  currentFilter = b.dataset.f;
  applyFilter();
});

/* ===== Efeito de digitação ===== */
var wi = 0, ci = 0, del = false, tEl = document.getElementById("typed");
(function type() {
  var words = STR[lang].words;
  var w = words[wi % words.length];
  tEl.textContent = w.slice(0, ci);
  if (!del && ci < w.length) { ci++; setTimeout(type, 70); }
  else if (!del) { del = true; setTimeout(type, 1600); }
  else if (ci > 0) { ci--; setTimeout(type, 35); }
  else { del = false; wi = (wi + 1) % words.length; setTimeout(type, 300); }
})();

/* ===== Animações ao rolar ===== */
var io = new IntersectionObserver(function (es) {
  es.forEach(function (e) {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      var f = e.target.querySelector(".bar-fg");
      if (f) f.style.width = f.dataset.v + "%";
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll(".rv").forEach(function (el) { io.observe(el); });

/* ===== Menu mobile e link ativo ===== */
var links = document.getElementById("links");
document.getElementById("burger").onclick = function () { links.classList.toggle("open"); };
links.addEventListener("click", function (e) { if (e.target.tagName === "A") links.classList.remove("open"); });
var so = new IntersectionObserver(function (es) {
  es.forEach(function (e) {
    if (e.isIntersecting) {
      links.querySelectorAll("a").forEach(function (a) {
        a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id);
      });
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(function (s) { so.observe(s); });

/* ===== Tema claro/escuro ===== */
var root = document.documentElement;
try { var savedTheme = localStorage.getItem("theme"); if (savedTheme) root.setAttribute("data-theme", savedTheme); } catch (e) {}
document.getElementById("theme").onclick = function () {
  var dark = root.getAttribute("data-theme") === "dark" ||
    (!root.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
  var next = dark ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
};

/* ===== Botão de idioma ===== */
document.getElementById("lang").onclick = function () { setLang(lang === "pt" ? "en" : "pt"); };

/* ===== Copiar e-mail ===== */
var toast = document.getElementById("toast");
document.getElementById("copy").onclick = function () {
  var m = "devvgabrielcorreia@gmail.com";
  function ok() { toast.classList.add("show"); setTimeout(function () { toast.classList.remove("show"); }, 1800); }
  if (navigator.clipboard) { navigator.clipboard.writeText(m).then(ok, function () {}); }
  else {
    var t = document.createElement("textarea"); t.value = m; document.body.appendChild(t); t.select();
    try { document.execCommand("copy"); ok(); } catch (e) {}
    t.remove();
  }
};

document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Início: idioma salvo ou do navegador ===== */
var startLang = "pt";
try { startLang = localStorage.getItem("lang") || ""; } catch (e) {}
if (!startLang) startLang = (navigator.language || "pt").toLowerCase().indexOf("pt") === 0 ? "pt" : "en";
renderSkills();
renderProjects();
if (startLang === "en") setLang("en");
