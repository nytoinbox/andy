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
      "hero.cta1": "Book the Chef", "hero.cta2": "Download Resume", "hero.tag": "Sushi Chef", "hero.motion": "Tap for 3D",
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
      "form.note": "Your message goes straight to the chef’s inbox.",
      "form.sending": "Sending…",
      "form.success": "Thank you! Your message has been sent. I’ll get back to you soon.",
      "form.fail": "Sorry, the message couldn’t be sent. Please email ",
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
      "hero.cta1": "จองเชฟ", "hero.cta2": "ดาวน์โหลดเรซูเม่", "hero.tag": "เชฟซูชิ", "hero.motion": "แตะเพื่อดู 3 มิติ",
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
      "form.note": "ข้อความจะส่งตรงถึงอีเมลของเชฟ",
      "form.sending": "กำลังส่ง…",
      "form.success": "ขอบคุณครับ! ส่งข้อความเรียบร้อยแล้ว จะติดต่อกลับโดยเร็ว",
      "form.fail": "ขออภัย ส่งข้อความไม่สำเร็จ กรุณาส่งอีเมลมาที่ ",
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
  var heroLayers = $$(".photo-frame img, .photo-frame canvas");
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
      heroLayers.forEach(function (el) { el.style.transform = "translateY(" + (y * -0.08) + "px)"; });
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

  /* ---------------- Spatial Scene (depth-map parallax on the hero photo) ----------------
     assets/img/chef-depth.png is a depth map (white = near) generated with Depth Anything V2.
     A fragment shader shifts each pixel by its depth, driven by the mouse, device tilt,
     or a slow idle sway, so the chef and the sushi board separate from the background. */
  (function spatialScene() {
    var frame = $(".photo-frame"), canvas = $("canvas.spatial", frame), motionBtn = $(".motion-btn");
    if (reduceMotion || !canvas) return;
    var gl = canvas.getContext("webgl", { alpha: false, antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    var VERT = "attribute vec2 a;varying vec2 v;void main(){v=vec2(a.x*.5+.5,.5-a.y*.5);gl_Position=vec4(a,0.,1.);}";
    var FRAG = [
      "precision mediump float;",
      "varying vec2 v;",
      "uniform sampler2D uImg, uDepth;",
      "uniform vec2 uPointer;",
      "uniform float uCanvasAspect, uImgAspect, uStrength, uFocus, uZoom;",
      "void main(){",
      // cover-fit, anchored to the top of the image (matches object-position: center top)
      "  vec2 s = vec2(1.);",
      "  if (uCanvasAspect > uImgAspect) s.y = uImgAspect / uCanvasAspect; else s.x = uCanvasAspect / uImgAspect;",
      "  vec2 base = vec2(.5 + (v.x - .5) * s.x, v.y * s.y);",
      "  vec2 c = vec2(.5, s.y * .5);",
      "  base = c + (base - c) / uZoom;",
      "  vec2 off = uPointer * uStrength * vec2(1., uImgAspect);",
      // fixed-point refinement: sample depth where the pixel lands, not where it started
      "  vec2 p = base;",
      "  for (int i = 0; i < 6; i++) { float d = texture2D(uDepth, p).r; p = base + off * (d - uFocus); }",
      "  gl_FragColor = texture2D(uImg, clamp(p, .001, .999));",
      "}"
    ].join("\n");

    function shader(type, src) {
      var sh = gl.createShader(type);
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    }
    var vs = shader(gl.VERTEX_SHADER, VERT), fs = shader(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    var u = {};
    ["uImg", "uDepth", "uPointer", "uCanvasAspect", "uImgAspect", "uStrength", "uFocus", "uZoom"].forEach(function (n) {
      u[n] = gl.getUniformLocation(prog, n);
    });
    gl.uniform1i(u.uImg, 0);
    gl.uniform1i(u.uDepth, 1);
    gl.uniform1f(u.uStrength, 0.048);
    gl.uniform1f(u.uFocus, 0.55);
    gl.uniform1f(u.uZoom, 1.09);

    function texture(unit, img) {
      var t = gl.createTexture();
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
    }
    function load(src) {
      return new Promise(function (res, rej) {
        var im = new Image();
        im.onload = function () { res(im); };
        im.onerror = rej;
        im.src = src;
      });
    }

    var target = { x: 0, y: 0 }, cur = { x: 0, y: 0 }, lastInput = -1e9, visible = true, running = false;

    function resize() {
      var dpr = Math.min(2, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(u.uCanvasAspect, canvas.width / canvas.height);
    }

    function frameLoop(t) {
      if (!visible) { running = false; return; }
      if (t - lastInput > 2500) {
        // idle: slow figure-eight sway so the scene feels alive
        target.x = Math.sin(t / 1700) * 0.45;
        target.y = Math.cos(t / 2300) * 0.25;
      }
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      gl.uniform2f(u.uPointer, cur.x, cur.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestAnimationFrame(frameLoop);
    }
    function start() { if (!running && visible) { running = true; requestAnimationFrame(frameLoop); } }

    Promise.all([load("assets/img/chef.jpg"), load("assets/img/chef-depth.png")]).then(function (ims) {
      texture(0, ims[0]);
      texture(1, ims[1]);
      gl.uniform1f(u.uImgAspect, ims[0].naturalWidth / ims[0].naturalHeight);
      resize();
      window.addEventListener("resize", resize);
      frame.classList.add("spatial-on");

      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting && !document.hidden;
        start();
      }).observe(frame);
      document.addEventListener("visibilitychange", function () { visible = !document.hidden; start(); });
      start();
    }).catch(function () { /* keep the plain <img> */ });

    var clamp = function (n) { return Math.max(-1, Math.min(1, n)); };

    // desktop: follow the mouse anywhere on the page
    window.addEventListener("mousemove", function (e) {
      target.x = clamp(e.clientX / innerWidth * 2 - 1);
      target.y = clamp(e.clientY / innerHeight * 2 - 1);
      lastInput = performance.now();
    });

    // phones: follow device tilt, relative to how the phone was held at first reading
    var beta0 = null;
    function onTilt(e) {
      if (e.gamma == null || e.beta == null) return;
      if (beta0 === null) beta0 = e.beta;
      target.x = clamp(e.gamma / 25);
      target.y = clamp((e.beta - beta0) / 25);
      lastInput = performance.now();
    }
    var DOE = window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === "function") {
      // iOS asks for permission, which must come from a tap
      motionBtn.hidden = false;
      motionBtn.addEventListener("click", function () {
        DOE.requestPermission().then(function (state) {
          if (state === "granted") window.addEventListener("deviceorientation", onTilt);
        }).catch(function () {}).then(function () { motionBtn.hidden = true; });
      });
    } else if (DOE) {
      window.addEventListener("deviceorientation", onTilt);
    }
  })();

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

  /* ---------------- Contact form (FormSubmit.co) ----------------
     Posts to FormSubmit, which emails the owner. The very first submission sends an
     activation email to the endpoint inbox; messages are delivered once it is confirmed. */
  // nytoinbox@hotmail.com is the FormSubmit account (receives the activation email;
  // FormSubmit's activation mail never reached Gmail). The chef and the owner's Gmail
  // get a copy of every message.
  var FORM_ENDPOINT = "https://formsubmit.co/ajax/nytoinbox@hotmail.com";
  var FORM_CC = "chinyaandy@gmail.com,nytoinbox@gmail.com";
  var form = $(".contact-form"), err = $(".form-error"), success = $(".form-success");
  var sendBtn = $("button[type=submit] span", form);
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
    if (form._honey.value) return; // bot filled the hidden field
    var dict = i18n[lang];
    form.classList.add("sending");
    sendBtn.textContent = dict["form.sending"];

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        event: event || "-",
        message: msg,
        _replyto: email,
        _cc: FORM_CC,
        _subject: dict["form.subject"] + name,
        _template: "table"
      })
    }).then(function (res) {
      return res.json().then(function (data) {
        if (!res.ok || String(data.success) !== "true") throw new Error(data.message || res.status);
      });
    }).then(function () {
      form.reset();
      success.hidden = false;
      success.setAttribute("tabindex", "-1");
      success.focus();
    }).catch(function (e) {
      err.textContent = dict["form.fail"];
      var a = document.createElement("a");
      a.href = "mailto:chinyaandy@gmail.com";
      a.textContent = "chinyaandy@gmail.com";
      err.appendChild(a);
      // show the service's reason so problems can be diagnosed from a screenshot
      var why = document.createElement("small");
      why.className = "form-reason";
      why.textContent = (e && e.message) || "Unknown error";
      err.appendChild(why);
      if (window.console) console.error("FormSubmit:", e);
    }).then(function () {
      form.classList.remove("sending");
      sendBtn.textContent = dict["form.send"];
    });
  });

  $(".year").textContent = new Date().getFullYear();
})();
