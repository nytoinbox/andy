(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var $ = function (s, ctx) { return (ctx || document).querySelector(s); };
  var $$ = function (s, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(s)); };

  /* ---------------- Translations ---------------- */
  var i18n = {
    en: {
      "nav.about": "About", "nav.skills": "Skills", "nav.experience": "Experience",
      "nav.gallery": "Gallery", "nav.services": "Services", "nav.contact": "Contact",
      "hero.badge": "Available for private events & catering",
      "hero.roles": ["Sushi Chef", "Knife Artisan", "Private Event Chef", "Menu Developer"],
      "hero.sub": "Traditional technique, fresh ingredients, and a steady hand — crafted in West Palm Beach, Florida.",
      "hero.cta1": "Book the Chef", "hero.cta2": "Download Resume", "hero.tag": "Sushi Chef",
      "about.title": "Professional Summary",
      "about.text": "Dynamic Sushi Chef with extensive experience at Peppermint Thai and Sushi, specializing in sushi preparation and quality control. Proven ability to enhance menu offerings and maintain food safety compliance. Adept in inventory management and fostering collaboration within kitchen teams to elevate service efficiency and customer satisfaction.",
      "stats.years": "Years as a sushi chef", "stats.kitchens": "Restaurants & resorts", "stats.skills": "Core kitchen skills",
      "skills.title": "Skills",
      "skills.s1": "Sushi Preparation", "skills.s1d": "Traditional nigiri, maki and sashimi built on well-seasoned rice and fresh fish.",
      "skills.s2": "Knife Skills", "skills.s2d": "Precise cuts and decorative garnish work that let every ingredient shine.",
      "skills.s3": "Food Safety Compliance", "skills.s3d": "Clean, organized workstations that meet health standards every service.",
      "skills.s4": "Inventory Management", "skills.s4d": "Monitoring stock levels so essential ingredients and supplies are always ready.",
      "skills.s5": "Quality Control", "skills.s5d": "Consistent taste and presentation, from the first plate to the last.",
      "skills.s6": "Menu Development", "skills.s6d": "Creating and refining menu offerings that keep guests coming back.",
      "exp.title": "Work History", "exp.role": "Sushi Chef",
      "exp.b1": "Prepared high-quality sushi using traditional techniques and fresh ingredients.",
      "exp.b2": "Maintained cleanliness and organization of workstations to ensure compliance with health standards.",
      "exp.b3": "Collaborated with kitchen staff to streamline food preparation processes and improve service efficiency.",
      "exp.b4": "Monitored inventory levels, ensuring timely replenishment of essential sushi ingredients and supplies.",
      "edu.label": "Education", "edu.degree": "Bachelor of Arts — School of Humanities",
      "gallery.title": "Gallery",
      "gallery.c1": "The full board", "gallery.c2": "At the counter", "gallery.c3": "Salmon roll & sashimi",
      "gallery.c4": "Tuna & avocado rolls", "gallery.c5": "Hand-carved garnish", "gallery.c6": "Nigiri & pickled ginger",
      "services.title": "Freelance & Catering",
      "services.s1": "Private Sushi Chef", "services.s1d": "An in-home or on-site sushi experience for dinners and celebrations.",
      "services.s2": "Event Catering & Platters", "services.s2d": "Sushi platters and live stations for parties, weddings and corporate events.",
      "services.s3": "Menu Development", "services.s3d": "Help building or refreshing a sushi menu for restaurants and kitchens.",
      "contact.title": "Let’s Work Together",
      "contact.lead": "Planning an event or looking for a sushi chef? Send a message — I’ll get back to you soon.",
      "form.name": "Your name", "form.email": "Email", "form.event": "Event type & date (optional)",
      "form.message": "Message", "form.send": "Send Message",
      "form.note": "Opens your email app with the message ready to send.",
      "form.error": "Please fill in your name, a valid email and a message.",
      "form.subject": "Sushi chef inquiry from ",
      "form.eventLabel": "Event: ",
      "footer.role": "Sushi Chef"
    },
    th: {
      "nav.about": "เกี่ยวกับ", "nav.skills": "ทักษะ", "nav.experience": "ประสบการณ์",
      "nav.gallery": "ผลงาน", "nav.services": "บริการ", "nav.contact": "ติดต่อ",
      "hero.badge": "รับงานเชฟส่วนตัวและจัดเลี้ยง",
      "hero.roles": ["เชฟซูชิ", "ช่างฝีมือมีด", "เชฟงานส่วนตัว", "นักพัฒนาเมนู"],
      "hero.sub": "เทคนิคดั้งเดิม วัตถุดิบสด และมือที่มั่นคง — จากเวสต์ปาล์มบีช ฟลอริดา",
      "hero.cta1": "จองเชฟ", "hero.cta2": "ดาวน์โหลดเรซูเม่", "hero.tag": "เชฟซูชิ",
      "about.title": "สรุปประวัติ",
      "about.text": "เชฟซูชิผู้มีพลังและประสบการณ์ยาวนานจาก Peppermint Thai and Sushi เชี่ยวชาญด้านการเตรียมซูชิและการควบคุมคุณภาพ มีผลงานในการพัฒนาเมนูและรักษามาตรฐานความปลอดภัยด้านอาหาร ชำนาญการบริหารวัตถุดิบ และส่งเสริมการทำงานเป็นทีมในครัว เพื่อยกระดับประสิทธิภาพการบริการและความพึงพอใจของลูกค้า",
      "stats.years": "ปีในฐานะเชฟซูชิ", "stats.kitchens": "ร้านอาหารและรีสอร์ต", "stats.skills": "ทักษะหลักในครัว",
      "skills.title": "ทักษะ",
      "skills.s1": "การเตรียมซูชิ", "skills.s1d": "นิงิริ มากิ และซาชิมิแบบดั้งเดิม จากข้าวปรุงรสอย่างพิถีพิถันและปลาสด",
      "skills.s2": "ทักษะการใช้มีด", "skills.s2d": "การหั่นที่แม่นยำและงานแกะสลักตกแต่งที่ทำให้ทุกวัตถุดิบโดดเด่น",
      "skills.s3": "มาตรฐานความปลอดภัยอาหาร", "skills.s3d": "พื้นที่ทำงานสะอาดเป็นระเบียบ ได้มาตรฐานสุขอนามัยทุกการบริการ",
      "skills.s4": "การบริหารวัตถุดิบ", "skills.s4d": "ติดตามสต็อกให้วัตถุดิบและอุปกรณ์สำคัญพร้อมใช้เสมอ",
      "skills.s5": "การควบคุมคุณภาพ", "skills.s5d": "รสชาติและการจัดจานที่สม่ำเสมอ ตั้งแต่จานแรกถึงจานสุดท้าย",
      "skills.s6": "การพัฒนาเมนู", "skills.s6d": "สร้างสรรค์และปรับปรุงเมนูให้ลูกค้าอยากกลับมาอีก",
      "exp.title": "ประวัติการทำงาน", "exp.role": "เชฟซูชิ",
      "exp.b1": "เตรียมซูชิคุณภาพสูงด้วยเทคนิคดั้งเดิมและวัตถุดิบสด",
      "exp.b2": "ดูแลความสะอาดและความเป็นระเบียบของพื้นที่ทำงานให้เป็นไปตามมาตรฐานสุขอนามัย",
      "exp.b3": "ทำงานร่วมกับทีมครัวเพื่อปรับขั้นตอนการเตรียมอาหารให้คล่องตัวและเพิ่มประสิทธิภาพการบริการ",
      "exp.b4": "ติดตามระดับสต็อก เพื่อเติมวัตถุดิบและอุปกรณ์สำหรับซูชิได้ทันเวลา",
      "edu.label": "การศึกษา", "edu.degree": "ศิลปศาสตรบัณฑิต — คณะมนุษยศาสตร์",
      "gallery.title": "ผลงาน",
      "gallery.c1": "ซูชิบอร์ดชุดใหญ่", "gallery.c2": "บรรยากาศหน้าเคาน์เตอร์", "gallery.c3": "แซลมอนโรลและซาชิมิ",
      "gallery.c4": "โรลทูน่าและอะโวคาโด", "gallery.c5": "งานแกะสลักตกแต่ง", "gallery.c6": "นิงิริและขิงดอง",
      "services.title": "งานฟรีแลนซ์และจัดเลี้ยง",
      "services.s1": "เชฟซูชิส่วนตัว", "services.s1d": "ประสบการณ์ซูชิถึงบ้านหรือสถานที่จัดงาน สำหรับมื้อค่ำและงานฉลอง",
      "services.s2": "จัดเลี้ยงและซูชิแพลตเตอร์", "services.s2d": "ซูชิแพลตเตอร์และสเตชันซูชิสดสำหรับปาร์ตี้ งานแต่ง และงานองค์กร",
      "services.s3": "พัฒนาเมนู", "services.s3d": "ช่วยสร้างหรือปรับปรุงเมนูซูชิให้ร้านอาหารและครัว",
      "contact.title": "มาร่วมงานกัน",
      "contact.lead": "กำลังวางแผนจัดงาน หรือมองหาเชฟซูชิอยู่ใช่ไหม? ส่งข้อความมาได้เลย แล้วจะติดต่อกลับโดยเร็ว",
      "form.name": "ชื่อของคุณ", "form.email": "อีเมล", "form.event": "ประเภทงานและวันที่ (ไม่บังคับ)",
      "form.message": "ข้อความ", "form.send": "ส่งข้อความ",
      "form.note": "ระบบจะเปิดแอปอีเมลของคุณพร้อมข้อความที่กรอกไว้",
      "form.error": "กรุณากรอกชื่อ อีเมลที่ถูกต้อง และข้อความ",
      "form.subject": "สอบถามงานเชฟซูชิจาก ",
      "form.eventLabel": "งาน: ",
      "footer.role": "เชฟซูชิ"
    }
  };

  var lang = "en";
  try { lang = localStorage.getItem("lang") || (navigator.language || "").slice(0, 2) === "th" && "th" || "en"; } catch (e) {}
  if (!i18n[lang]) lang = "en";

  var typer = { words: [], i: 0, ch: 0, del: false, timer: null };

  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    var dict = i18n[l];
    $$("[data-i18n]").forEach(function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (typeof v === "string") el.textContent = v;
    });
    $$(".lang-toggle [data-lang]").forEach(function (s) {
      s.classList.toggle("on", s.getAttribute("data-lang") === l);
    });
    try { localStorage.setItem("lang", l); } catch (e) {}
    typer.words = dict["hero.roles"];
    typer.i = 0; typer.ch = 0; typer.del = false;
    startTyping();
  }

  $(".lang-toggle").addEventListener("click", function () {
    applyLang(lang === "en" ? "th" : "en");
  });

  /* ---------------- Typing effect ---------------- */
  var typedEl = $(".typed");
  function startTyping() {
    clearTimeout(typer.timer);
    if (reduceMotion) { typedEl.textContent = typer.words[0]; return; }
    tick();
  }
  function tick() {
    var word = Array.from(typer.words[typer.i]);
    typer.ch += typer.del ? -1 : 1;
    typedEl.textContent = word.slice(0, typer.ch).join("");
    var delay = typer.del ? 45 : 95;
    if (!typer.del && typer.ch === word.length) { typer.del = true; delay = 1800; }
    else if (typer.del && typer.ch === 0) { typer.del = false; typer.i = (typer.i + 1) % typer.words.length; delay = 350; }
    typer.timer = setTimeout(tick, delay);
  }

  /* ---------------- Split hero name into letters ---------------- */
  $$(".split").forEach(function (el) {
    var text = el.textContent;
    el.textContent = "";
    el.setAttribute("aria-label", text);
    Array.from(text).forEach(function (c, idx) {
      var s = document.createElement("span");
      s.className = "ch";
      s.setAttribute("aria-hidden", "true");
      s.textContent = c;
      s.style.transitionDelay = (0.35 + idx * 0.045 + (el.classList.contains("accent") ? 0.25 : 0)) + "s";
      s.addEventListener("transitionend", function () { s.style.transitionDelay = "0s"; }, { once: true });
      el.appendChild(s);
    });
  });

  applyLang(lang);

  /* ---------------- Loader ---------------- */
  function finishLoading() {
    var loader = $(".loader");
    loader.classList.add("done");
    document.body.classList.remove("is-loading");
    document.body.classList.add("loaded");
    setTimeout(function () { loader.remove(); }, 1400);
  }
  if (reduceMotion) finishLoading();
  else window.addEventListener("load", function () { setTimeout(finishLoading, 1300); });
  // safety net if load event is slow (e.g. fonts blocked)
  setTimeout(function () { if (document.body.classList.contains("is-loading")) finishLoading(); }, 4000);

  /* ---------------- Reveal on scroll ---------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("in");
        io.unobserve(e.target);
        var counter = e.target.querySelector("[data-count]");
        if (counter) countUp(counter);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  // stagger siblings inside grids
  $$(".skill-grid, .gallery-grid, .stats, .service-list").forEach(function (grid) {
    $$(".reveal-up", grid).forEach(function (el, i) { el.style.setProperty("--d", (i * 0.08) + "s"); });
  });
  $$(".reveal-up").forEach(function (el) {
    // hero items animate after the loader instead
    if (el.closest(".hero")) return;
    io.observe(el);
  });
  $$(".hero .reveal-up").forEach(function (el, i) {
    el.style.setProperty("--d", (1.1 + i * 0.12) + "s");
  });
  var heroIn = function () { $$(".hero .reveal-up").forEach(function (el) { el.classList.add("in"); }); };
  new MutationObserver(function (m, obs) {
    if (document.body.classList.contains("loaded")) { heroIn(); obs.disconnect(); }
  }).observe(document.body, { attributes: true, attributeFilter: ["class"] });
  if (document.body.classList.contains("loaded")) heroIn();

  /* ---------------- Counters ---------------- */
  function countUp(el) {
    var target = +el.getAttribute("data-count");
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) { el.textContent = target + suffix; return; }
    var start = performance.now(), dur = 1600;
    (function step(now) {
      var p = Math.min(1, (now - start) / dur);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame(step);
    })(start);
  }

  /* ---------------- Scroll: nav, progress, timeline, active link ---------------- */
  var nav = $(".nav"), progress = $(".progress"), fill = $(".timeline-fill"), timeline = $(".timeline");
  var sections = $$("main section[id]");
  var links = $$(".nav-links a");
  var heroPhoto = $(".hero-photo img");
  var ticking = false;

  function onScroll() {
    var y = window.scrollY, vh = window.innerHeight;
    nav.classList.toggle("scrolled", y > 40);
    var max = document.documentElement.scrollHeight - vh;
    progress.style.transform = "scaleX(" + (max > 0 ? y / max : 0) + ")";

    var r = timeline.getBoundingClientRect();
    var p = (vh * 0.7 - r.top) / r.height;
    fill.style.transform = "scaleY(" + Math.max(0, Math.min(1, p)) + ")";

    if (!reduceMotion && y < vh && document.body.classList.contains("loaded")) {
      heroPhoto.style.transform = "translateY(" + (y * -0.08) + "px)";
    }

    var current = "";
    sections.forEach(function (s) { if (s.getBoundingClientRect().top < vh * 0.4) current = s.id; });
    links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + current); });
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------------- Mobile menu ---------------- */
  var menuBtn = $(".menu-btn");
  menuBtn.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* ---------------- Custom cursor + magnetic buttons + tilt ---------------- */
  if (finePointer && !reduceMotion) {
    var cur = $(".cursor"), dot = $(".cursor-dot");
    var mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;
    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    });
    (function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      cur.style.transform = "translate(" + cx + "px," + cy + "px) translate(-50%,-50%)";
      requestAnimationFrame(loop);
    })();
    $$("a, button, .g-item, .skill-card").forEach(function (el) {
      el.addEventListener("mouseenter", function () { cur.classList.add("hover"); });
      el.addEventListener("mouseleave", function () { cur.classList.remove("hover"); });
    });

    $$(".magnetic").forEach(function (btn) {
      btn.addEventListener("mousemove", function (e) {
        var r = btn.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        btn.style.transform = "translate(" + x * 0.25 + "px," + y * 0.35 + "px)";
      });
      btn.addEventListener("mouseleave", function () { btn.style.transform = ""; });
    });

    $$(".tilt").forEach(function (card) {
      var max = +card.getAttribute("data-tilt-max") || 8;
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        card.style.transition = "transform 0.1s";
        card.style.transform = "perspective(900px) rotateX(" + (0.5 - py) * max + "deg) rotateY(" + (px - 0.5) * max + "deg)";
        card.style.setProperty("--mx", px * 100 + "%");
        card.style.setProperty("--my", py * 100 + "%");
      });
      card.addEventListener("mouseleave", function () {
        card.style.transition = "transform 0.6s cubic-bezier(.22,1,.36,1), opacity 1s, border-color .4s";
        card.style.transform = "";
      });
    });
  }

  /* ---------------- Particles (floating embers / petals) ---------------- */
  var canvas = $(".particles");
  if (canvas.getContext && !reduceMotion) {
    var ctx = canvas.getContext("2d"), parts = [], dpr = Math.min(2, window.devicePixelRatio || 1);
    var resize = function () {
      canvas.width = innerWidth * dpr; canvas.height = innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    var count = innerWidth < 700 ? 22 : 45;
    for (var i = 0; i < count; i++) {
      parts.push({
        x: Math.random() * innerWidth, y: Math.random() * innerHeight,
        r: Math.random() * 1.8 + 0.4, vy: -(Math.random() * 0.35 + 0.08),
        vx: (Math.random() - 0.5) * 0.2, a: Math.random() * 0.5 + 0.15,
        gold: Math.random() > 0.55, ph: Math.random() * Math.PI * 2
      });
    }
    (function draw(t) {
      ctx.clearRect(0, 0, innerWidth, innerHeight);
      parts.forEach(function (p) {
        p.y += p.vy; p.x += p.vx + Math.sin(t / 1600 + p.ph) * 0.15;
        if (p.y < -10) { p.y = innerHeight + 10; p.x = Math.random() * innerWidth; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold ? "rgba(212,166,86," + p.a + ")" : "rgba(200,16,46," + p.a + ")";
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.gold ? "#d4a656" : "#c8102e";
        ctx.fill();
      });
      requestAnimationFrame(draw);
    })(0);
  }

  /* ---------------- Lightbox ---------------- */
  var lb = $(".lightbox"), lbImg = $("img", lb), lbCap = $(".lb-cap", lb);
  var items = $$(".g-item"), idx = 0, lastFocus = null;
  function show(i) {
    idx = (i + items.length) % items.length;
    var img = $("img", items[idx]);
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = $("figcaption", items[idx]).textContent;
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
  }
  function openLb(i) { lastFocus = document.activeElement; show(i); lb.hidden = false; document.body.style.overflow = "hidden"; $(".lb-close").focus(); }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ""; if (lastFocus) lastFocus.focus(); }
  items.forEach(function (fig, i) {
    fig.tabIndex = 0;
    fig.addEventListener("click", function () { openLb(i); });
    fig.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openLb(i); } });
  });
  $(".lb-close").addEventListener("click", closeLb);
  $(".lb-prev").addEventListener("click", function () { show(idx - 1); });
  $(".lb-next").addEventListener("click", function () { show(idx + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(idx - 1);
    if (e.key === "ArrowRight") show(idx + 1);
  });

  /* ---------------- Contact form (mailto) ---------------- */
  var form = $(".contact-form"), err = $(".form-error");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = form.name.value.trim(), email = form.email.value.trim();
    var event = form.event.value.trim(), msg = form.message.value.trim();
    var ok = true;
    [["name", name], ["email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : ""], ["message", msg]].forEach(function (f) {
      var field = form[f[0]].parentNode;
      field.classList.toggle("invalid", !f[1]);
      if (!f[1]) ok = false;
    });
    if (!ok) { err.textContent = i18n[lang]["form.error"]; return; }
    err.textContent = "";
    var dict = i18n[lang];
    var body = msg + "\n\n" + (event ? dict["form.eventLabel"] + event + "\n" : "") + "— " + name + " (" + email + ")";
    window.location.href = "mailto:chinyaandy@gmail.com?subject=" +
      encodeURIComponent(dict["form.subject"] + name) + "&body=" + encodeURIComponent(body);
  });

  $(".year").textContent = new Date().getFullYear();
})();
