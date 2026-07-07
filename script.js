/* =========================================================
   CaressTech India — main.js
   Handles: preloader, nav scroll state, AOS/Swiper init,
   circuit-trace scroll animation, electronics strip,
   curriculum language modal, gallery filter + lightbox,
   contact form, sticky back-to-top.
========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Footer year ---- */
  document.getElementById('year').textContent = new Date().getFullYear();

  /* ---- Preloader ---- */
  window.addEventListener('load', function () {
    var pre = document.getElementById('preloader');
    setTimeout(function () { pre.classList.add('hide'); }, 350);
  });

  /* ---- AOS ---- */
  if (window.AOS) { AOS.init({ duration: 700, once: true, offset: 60 }); }

  /* ---- Navbar solid on scroll ---- */
  var nav = document.getElementById('mainNav');
  function navState() {
    if (window.scrollY > 40) { nav.classList.add('solid'); }
    else { nav.classList.remove('solid'); }
  }
  navState();
  window.addEventListener('scroll', navState);

  /* Close mobile menu on link click */
  document.querySelectorAll('#navMenu .nav-link').forEach(function (l) {
    l.addEventListener('click', function () {
      var menu = document.getElementById('navMenu');
      if (menu.classList.contains('show') && window.bootstrap) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  /* ---- Product Swiper ---- */
  if (window.Swiper) {
    new Swiper('.productSwiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: {
        576: { slidesPerView: 2 },
        992: { slidesPerView: 3 }
      }
    });
  }

  /* ---- Circuit trace draw-on-scroll (signature element) ---- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    var path = document.getElementById('trace-path');
    var svg = document.getElementById('circuit-trace');
    if (path && svg) {
      function sizeTrace() {
        var h = document.body.scrollHeight;
        svg.setAttribute('viewBox', '0 0 40 ' + h);
        path.setAttribute('d', 'M20,0 L20,' + h);
        var len = h;
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
      }
      sizeTrace();
      window.addEventListener('resize', sizeTrace);

      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { scrub: 0.4, start: 0, end: 'max' }
      });
    }
  }

  /* =========================================================
     Electronics Component Strip (infinite scroller)
  ========================================================= */
  var components = [
    ['Arduino UNO', 'Beginner-friendly microcontroller board', 'fa-microchip'],
    ['Arduino Nano', 'Compact board for space-limited builds', 'fa-microchip'],
    ['ESP32', 'Wi-Fi and Bluetooth enabled microcontroller', 'fa-wifi'],
    ['Breadboard', 'Solder-free circuit prototyping board', 'fa-border-all'],
    ['LED', 'Simple light-emitting diode for indicators', 'fa-lightbulb'],
    ['RGB LED', 'Multi-colour LED for colour-mixing projects', 'fa-palette'],
    ['Servo Motor', 'Precise angular position motor', 'fa-gear'],
    ['DC Motor', 'Basic motor for continuous rotation', 'fa-fan'],
    ['Stepper Motor', 'Motor that moves in precise steps', 'fa-compass'],
    ['Ultrasonic Sensor', 'Measures distance using sound waves', 'fa-wave-square'],
    ['IR Sensor', 'Detects infrared light for proximity sensing', 'fa-satellite-dish'],
    ['LDR', 'Light-dependent resistor for light sensing', 'fa-sun'],
    ['Relay Module', 'Switches high-power devices safely', 'fa-toggle-on'],
    ['LCD Display', 'Character display for readouts', 'fa-tv'],
    ['OLED Display', 'Compact high-contrast display', 'fa-display'],
    ['Potentiometer', 'Variable resistor for analog input', 'fa-sliders'],
    ['Push Button', 'Momentary switch for digital input', 'fa-circle-dot'],
    ['Battery Holder', 'Portable power for standalone builds', 'fa-battery-full'],
    ['Resistors', 'Limit current flow in a circuit', 'fa-grip-lines'],
    ['Capacitors', 'Store and release electrical energy', 'fa-layer-group'],
    ['Diodes', 'Allow current to flow in one direction', 'fa-arrow-right-to-bracket'],
    ['Transistors', 'Amplify or switch electronic signals', 'fa-diagram-project'],
    ['Jumper Wires', 'Flexible wires for quick connections', 'fa-timeline'],
    ['Buzzer', 'Produces sound for alerts and feedback', 'fa-volume-high']
  ];
  var track = document.getElementById('componentTrack');
  if (track) {
    var html = '';
    // duplicate list for seamless loop
    [...components, ...components].forEach(function (c) {
      html += '<div class="component-card">' +
                '<div class="comp-icon"><i class="fa-solid ' + c[2] + '"></i></div>' +
                '<h5>' + c[0] + '</h5><p>' + c[1] + '</p>' +
              '</div>';
    });
    track.innerHTML = html;
  }

  /* =========================================================
     Curriculum language modal
  ========================================================= */
  var curricModalEl = document.getElementById('curricModal');
  var curricModal = window.bootstrap ? new bootstrap.Modal(curricModalEl) : null;
  var activeCurric = null;
  var curricTitles = {
    'stem-curriculum': 'STEM Curriculum',
    'stem-tinkering': 'STEM Tinkering',
    'digital-literacy': 'Digital Literacy'
  };

  document.querySelectorAll('.curric-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      activeCurric = btn.closest('.curric-card').dataset.curric;
      document.getElementById('curricModalTitle').textContent =
        'Choose a language — ' + curricTitles[activeCurric];
      if (curricModal) curricModal.show();
    });
  });

  document.querySelectorAll('.btn-lang').forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (!activeCurric) return;
      var lang = btn.dataset.lang;
      var url = 'assets/pdf/' + activeCurric + '-' + lang + '.pdf';
      window.open(url, '_blank');
      if (curricModal) curricModal.hide();
    });
  });

  /* =========================================================
     Gallery — masonry grid + filter + lightbox
  ========================================================= */
  var galleryItems = [
    ['DIY Kits', 'kits', 'Gravity powered car kit ready for assembly'],
    ['Workshops', 'workshops', 'Teacher training workshop session'],
    ['Student Activities', 'activities', 'Students testing their catapult design'],
    ['Electronics', 'electronics', 'Breadboard circuit in progress'],
    ['Robotics', 'robotics', 'Robotic arm prototype demonstration'],
    ['Innovation', 'innovation', 'Students presenting their tinkering project'],
    ['DIY Kits', 'kits', 'Paper circuit buzzer game components'],
    ['Workshops', 'workshops', 'Hands-on group workshop activity'],
    ['Student Activities', 'activities', 'Balancing bird experiment in class'],
    ['Electronics', 'electronics', 'Arduino board wiring demonstration'],
    ['Robotics', 'robotics', 'Walking rope robot in motion'],
    ['Innovation', 'innovation', 'Student-designed STEM solution on display']
  ];
  var grid = document.getElementById('galleryGrid');
  if (grid) {
    var gHtml = '';
    galleryItems.forEach(function (item, i) {
      gHtml += '<div class="gallery-item" data-filter="' + item[1] + '" data-caption="' + item[2] + '" data-aos="fade-up" data-aos-delay="' + ((i % 6) * 40) + '">' +
                 '<div class="ph-card"><span>' + item[2] + '</span></div>' +
               '</div>';
    });
    grid.innerHTML = gHtml;

    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.dataset.filter;
        document.querySelectorAll('.gallery-item').forEach(function (gi) {
          if (f === 'all' || gi.dataset.filter === f) { gi.classList.remove('hidden'); }
          else { gi.classList.add('hidden'); }
        });
      });
    });

    var lightbox = document.getElementById('lightbox');
    var lightboxContent = document.getElementById('lightboxContent');
    document.querySelectorAll('.gallery-item').forEach(function (gi) {
      gi.addEventListener('click', function () {
        lightboxContent.innerHTML = '<div class="ph-card"><span>' + gi.dataset.caption + '</span></div>';
        lightbox.classList.add('open');
      });
    });
    document.getElementById('lightboxClose').addEventListener('click', function () {
      lightbox.classList.remove('open');
    });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) lightbox.classList.remove('open');
    });
  }

  /* =========================================================
     Contact form — client-side success confirmation
  ========================================================= */
  var form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      document.getElementById('formSuccess').classList.add('show');
      form.reset();
      // NOTE: connect this form to your backend / form service (e.g. Formspree, EmailJS)
      // before going live — this demo only shows a client-side confirmation.
    });
  }

  /* ---- Back to top ---- */
  var topBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 500) { topBtn.classList.add('show'); }
    else { topBtn.classList.remove('show'); }
  });
  topBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

});
