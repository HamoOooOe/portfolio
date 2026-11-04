/* Mohamed Moussa — portfolio behaviour: language switch, phone story, hero cycle, YLB price engine. */
(function () {
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Arabic copy ---------- */
  var AR = {
    skip: "تخطَّ إلى الأعمال", nav_work: "الأعمال", nav_services: "الخدمات", nav_path: "المسار", nav_contact: "تواصل", cv: "السيرة",
    h1: "تطبيقات لا تجعل الناس يتصلون بالدعم.",
    lede: "أنا محمد، مطوّر Flutter من الإسكندرية. عامان على خطوط الدعم الفني علّماني كيف يبدو البرنامج المعطّل، وهذا هو المعيار الذي أبني عليه.",
    cta_work: "شاهد الأعمال", cta_cv: "حمّل السيرة الذاتية", avail: "متاح لوظائف المطوّر المبتدئ ومشاريع العمل الحر",
    portrait_cap: "الإسكندرية، مصر",
    work_h: "أعمال يمكنك فتحها ولمسها",
    sd_p: "تطبيق لإدارة أصول الشركة وتذاكر الصيانة بالـ QR. كل جهاز عليه ملصق QR؛ الموظف يمسحه للإبلاغ عن مشكلة، والفني يمسحه ليرى سجل إصلاح الجهاز كاملاً ويسجّل عمله.",
    sd_f1: "٣ أدوار", sd_f2: "عربي + إنجليزي", sd_f3: "٦٩ اختباراً",
    sd_note: "الشاشات هنا تعمل ببيانات تجريبية مدمجة، وليست سجلات شركة حقيقية.",
    s1_h: "قائمة الفني", s1_p: "مفتوحة، مُسندة، قيد التنفيذ، منتهية: أربع محطات على خط واحد. التذاكر التي تغيّرت تبقى ملوّنة حتى تفتحها فلا يفوتك شيء.",
    s2_h: "كل جهاز يحتفظ بتاريخه", s2_p: "امسح الملصق لترى سجل الصيانة والتذاكر المفتوحة والإصلاحات السابقة. الحلقة تثقب ثقباً لكل شهر خضع فيه الجهاز للصيانة.",
    s3_h: "ملصقات جاهزة للطباعة", s3_p: "أنشئ ملصق QR لكل جهاز أو ورقة A4 كاملة. المسح يعرف دورك: الموظف يذهب للإبلاغ والفني إلى السجل.",
    s4_h: "المدير يرى أين التذاكر", s4_p: "عدد المتأخر ومتوسط وقت الحل وبلاغات آخر سبعة أيام والأجهزة التي تتعطل مراراً.",
    s5_h: "العربية ليست إضافة لاحقة", s5_p: "تخطيطات كاملة من اليمين لليسار وعناوين عربية. لا شيء في الواجهة مثبّت على اليسار.",
    s6_h: "داكن حين تكون الغرفة كذلك", s6_p: "سمة داكنة تحتفظ بنفس كلمات الحالة وأشكالها، فلا يكون اللون الإشارة الوحيدة.",
    sd_repo: "اقرأ الكود على GitHub",
    ylb_sub: "علامتي المحلية",
    ylb_p: "تطبيق Flutter قيد التطوير يربط مؤسسي علامات الملابس الجديدة مباشرة بمصانع الملابس المحلية. الطلب يبقى في أربع خطوات: القطعة، القماش، الطباعة والقص، طلب العينة. جرّب محرك التسعير بنفسك.",
    cfg_g: "القطعة", cfg_f: "القماش", cfg_p: "الطباعة والتشطيب", cfg_q: "حجم الدفعة", pcs: "قطعة",
    g1: "هودي ثقيل", g2: "تيشيرت واسع", g3: "بنطلون كارجو", g4: "جاكيت بومبر",
    f1: "فرنش تيري ٤٢٠ جرام", f2: "قطن مسرّح ٢٤٠ جرام", f3: "فليس مبطّن ٣٨٠ جرام", f4: "ريب ستوب تقني ٣٠٠ جرام",
    p1: "تطريز ثلاثي الأبعاد", p2: "طباعة حرير", p3: "طباعة مباشرة", p4: "غسل حمضي",
    q_unit: "سعر القطعة", q_disc: "خصم الكمية", q_total: "إجمالي الدفعة",
    w_p: "تطبيق مواصلات للطلاب لمشكلة رأيت زملائي يواجهونها كل صباح. كنت مسؤولاً عن تحديد المشكلة والتصميم والتدفقات الأساسية.",
    w_p2: "اختر محطتك، شاهد الحافلة القادمة، واحجز مقعداً بلمستين. ذاكرة مؤقتة للجداول تُبقيه يعمل عندما تضعف الإشارة بين أنفاق الحرم الجامعي.",
    w_f: "يعمل دون اتصال",
    n_p: "لعبة بقاء بُنيت بـ Unity و C# في كلية العلوم، جامعة الإسكندرية.",
    n_p2: "أول مشروع أُسلّمه من البداية للنهاية: من مستودع فارغ إلى نسخة جاهزة للعب.",
    b_p: "محرك قتال على طراز Sekiro قيد التطوير، يقوم على الصدّ وتوقيت الدفاع وضغط التوازن و٢٠ مرحلة متصاعدة.",
    b_p2: "إذا أخطأ توقيت الصدّ بـ ٦٠ ميلي ثانية ينكسر التوازن. أعمل على الأنظمة والإحساس والاتجاه الفني.",
    b_f: "قيد التطوير",
    sv_h: "وظّفني لبناء أو لإصلاح",
    sv1_h: "من تصميم Figma إلى تطبيق Flutter", sv1_p: "شاشاتك مبنية كتطبيق أندرويد يعمل: تخطيطات مطابقة وكود Dart نظيف، مع العربية والوضع الداكن عند الطلب.",
    sv2_h: "إصلاح الأخطاء وإضافة الميزات", sv2_p: "أرسل لي المشروع والمشكلة. أجد السبب وأصلحه أو أضيف الميزة بأسلوب كودك وأشرح ما تغيّر.",
    sv3_h: "تطبيق كامل مع خادم", sv3_p: "تسجيل دخول وأدوار وقاعدة بيانات وتخزين صور وتحديثات فورية عبر Supabase أو Firebase، يُسلَّم كمشروع تستطيع تشغيله.",
    pa_h: "من خط الدعم إلى الكود",
    pa_q: "على خط الدعم تتعلم بسرعة: المستخدم ليس مرتبكاً، المنتج هو المرتبك.",
    pa_p: "قضيت سنة ونصفاً أجيب أناساً تعطّل برنامجهم للتو، وتعلمت تحويل الشكوى المذعورة إلى بلاغ خطأ قابل للتكرار. وفي مكان ما توقفت عن الرغبة في إصلاح برامج الآخرين وبدأت أبني برنامجي.",
    now: "الآن",
    e1_h: "أخصائي تقنية معلومات، GIECO", e1_p: "أصون شبكات Cisco Catalyst متعددة الأرفف وجدران Sophos النارية، وأوتمت وأوثّق الإعدادات من جداول بيانات موحّدة.",
    e2_h: "أخصائي دعم فني، INTELCIA", e2_p: "شخّصت أعطال البرمجيات والاتصال والإعدادات وحوّلتها إلى بلاغات أخطاء منظمة.",
    e3_h: "أخصائي احتفاظ بالعملاء، Sutherland", e3_p: "عالجت الأسباب الجذرية للشكاوى التقنية والخدمية في فريق كبير الحجم قائم على الأهداف.",
    e4_h: "مكتب مساعدة تقنية، فريد وMMG وGIECO", e4_p: "دعم من الخط الأول للأجهزة وأنظمة التشغيل والبرمجيات، مع أدوات أتمتة قلّلت العمل المتكرر.",
    e5_h: "جامعة الإسكندرية وCCNA", e5_p: "صناعة البرمجيات والوسائط المتعددة (SIM)، كلية العلوم. شهادة Cisco Certified Network Associate.",
    ct_h: "عندك فكرة تطبيق، أو خطأ لا يريد أن يموت؟",
    ct_copy: "انسخ البريد", cv_full: "حمّل السيرة الذاتية",
    ct_lang: "العربية (لغة أم)، الإنجليزية (مهنية). مقيم في الإسكندرية، مصر.",
    top: "العودة للأعلى"
  };

  var nodes = Array.prototype.slice.call(document.querySelectorAll("[data-i18n]"));
  nodes.forEach(function (n) { n.setAttribute("data-en", n.innerHTML); });

  function store(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function load(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }

  var langBtn = document.getElementById("lang");
  function setLang(l) {
    var ar = l === "ar";
    document.documentElement.lang = ar ? "ar" : "en";
    document.documentElement.dir = ar ? "rtl" : "ltr";
    nodes.forEach(function (n) {
      var key = n.getAttribute("data-i18n");
      n.innerHTML = ar && AR[key] ? AR[key] : n.getAttribute("data-en");
    });
    langBtn.textContent = ar ? "English" : "العربية";
    document.title = ar ? "محمد موسى | مطوّر Flutter في الإسكندرية" : "Mohamed Moussa | Flutter developer in Alexandria";
    store("lang", l);
    quote();
  }
  langBtn.addEventListener("click", function () {
    setLang(document.documentElement.lang === "ar" ? "en" : "ar");
  });

  /* ---------- nav border on scroll ---------- */
  var nav = document.getElementById("nav");
  function onScroll() { nav.classList.toggle("scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- hero phone: cycle screens ---------- */
  var heroScr = document.querySelectorAll(".phone-hero .scr");
  var hi = 0;
  if (heroScr.length > 1 && !reduce) {
    setInterval(function () {
      heroScr[hi].classList.remove("on");
      hi = (hi + 1) % heroScr.length;
      heroScr[hi].classList.add("on");
    }, 3400);
  }

  /* ---------- ScanDesk story: sticky phone follows the step in view ---------- */
  var steps = document.querySelectorAll(".step");
  var stickyScr = document.querySelectorAll(".phone-sticky .scr");
  function show(i) {
    stickyScr.forEach(function (s, idx) { s.classList.toggle("on", idx === i); });
    steps.forEach(function (s, idx) { s.classList.toggle("on", idx === i); });
  }
  if ("IntersectionObserver" in window && steps.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) show(parseInt(e.target.getAttribute("data-screen"), 10));
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    steps.forEach(function (s) { io.observe(s); });
    show(0);
  }

  /* ---------- YLB price engine (same maths as the app prototype) ---------- */
  var state = { base: 28, mult: 1.25, print: 6.5, qty: 25 };
  function discount(q) { return q >= 100 ? 0.72 : q >= 50 ? 0.82 : q >= 25 ? 0.90 : q >= 10 ? 0.96 : 1; }
  function quote() {
    var d = discount(state.qty);
    var unit = (state.base * state.mult + state.print) * d;
    var total = unit * state.qty;
    var fmt = function (n) { return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ","); };
    document.getElementById("q-unit").textContent = fmt(unit);
    document.getElementById("q-disc").textContent = Math.round((1 - d) * 100) + "%";
    document.getElementById("q-total").textContent = fmt(total);
    document.getElementById("qty-out").textContent = state.qty;
  }
  document.querySelectorAll(".opts").forEach(function (group) {
    var key = group.getAttribute("data-key");
    group.addEventListener("click", function (e) {
      var b = e.target.closest(".opt");
      if (!b) return;
      group.querySelectorAll(".opt").forEach(function (o) { o.classList.remove("on"); o.setAttribute("aria-pressed", "false"); });
      b.classList.add("on");
      b.setAttribute("aria-pressed", "true");
      state[key] = parseFloat(b.getAttribute("data-v"));
      quote();
    });
  });
  document.getElementById("qty").addEventListener("input", function (e) {
    state.qty = parseInt(e.target.value, 10);
    quote();
  });
  quote();

  /* ---------- copy email ---------- */
  var copy = document.getElementById("copy");
  copy.addEventListener("click", function () {
    var mail = document.getElementById("mail").textContent;
    var span = copy.querySelector("span");
    var done = function () {
      var prev = span.innerHTML;
      span.textContent = document.documentElement.lang === "ar" ? "تم النسخ" : "Copied";
      setTimeout(function () { span.innerHTML = prev; }, 1600);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(mail).then(done, function () {});
    }
  });

  document.getElementById("yr").textContent = new Date().getFullYear();
  var asked = /[?&]lang=(ar|en)/.exec(window.location.search);
  if ((asked && asked[1] === "ar") || (!asked && load("lang") === "ar")) setLang("ar");
})();
