/* =========================================================
   CaressTech India — main.js
   Handles: preloader, nav scroll state, AOS/Swiper init,
   circuit-trace scroll animation, electronics strip,
   curriculum language modal, gallery filter + lightbox,
   contact form, buyer tabs, sticky back-to-top.
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
     Electronics Component Strip (infinite scroller — with images + price)
  ========================================================= */
  var components = [
    ['Arduino UNO R3',     '₹ 499', 'assets/images/components/arduino_uno.jpg'],
    ['ESP32 Module',       '₹ 349', 'assets/images/components/esp32.jpg'],
    ['Arduino Nano',       '₹ 399', 'assets/images/components/arduino_nano.jpg'],
    ['Breadboard 830pt',   '₹ 89',  'assets/images/components/breadboard.jpg'],
    ['Jumper Wires 40pc',  '₹ 59',  'assets/images/components/jumper_wires.jpg'],
    ['Zero PCB Board',     '₹ 29',  'assets/images/components/zero_pcb.jpg'],
    ['Ultrasonic HC-SR04', '₹ 69',  'assets/images/components/ultrasonic.jpg'],
    ['IR Sensor Module',   '₹ 49',  'assets/images/components/ir_sensor.jpg'],
    ['LDR Sensor',         '₹ 19',  'assets/images/components/ldr.jpg'],
    ['Servo Motor SG90',   '₹ 129', 'assets/images/components/servo.jpg'],
    ['DC Motor',           '₹ 59',  'assets/images/components/dc_motor.jpg'],
    ['Relay Module',       '₹ 79',  'assets/images/components/relay.jpg'],
    ['OLED Display',       '₹ 199', 'assets/images/components/oled.jpg'],
    ['LCD 16x2',           '₹ 149', 'assets/images/components/lcd.jpg'],
    ['Push Button',        '₹ 9',   'assets/images/components/push_button.jpg'],
    ['Battery Holder',     '₹ 39',  'assets/images/components/battery_holder.jpg'],
    ['Resistors Pack',     '₹ 29',  'assets/images/components/resistors.jpg'],
    ['Capacitors Pack',    '₹ 39',  'assets/images/components/capacitors.jpg'],
    ['Buzzer',             '₹ 29',  'assets/images/components/buzzer.jpg'],
    ['Potentiometer',      '₹ 19',  'assets/images/components/potentiometer.jpg']
  ];

  var track = document.getElementById('componentTrack');
  if (track) {
    var html = '';
    // duplicate list for seamless loop
    [...components, ...components].forEach(function (c) {
      html += '<div class="component-card">' +
                '<div class="comp-img-wrap">' +
                  '<img src="' + c[2] + '" alt="' + c[0] + '" class="comp-img" loading="lazy" ' +
                  'onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\'">' +
                  '<div class="comp-icon-fallback" style="display:none"><i class="fa-solid fa-microchip"></i></div>' +
                '</div>' +
                '<h5>' + c[0] + '</h5>' +
                '<p class="comp-price-tag">' + c[1] + '</p>' +
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
    'stem-tinkering':  'STEM Tinkering',
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
     (fixed: closed bracket bug + proper filter logic)
  ========================================================= */
  var galleryItems = [
    ['DIY Kits',          'kits',        'Gravity powered car kit ready for assembly',    'gallery-kits-1.jpg'],
    ['Workshops',         'workshops',   'Teacher training workshop session',              'gallery-workshops-1.jpg'],
    ['Student Activities','activities',  'Students testing their catapult design',         'gallery-activities-1.jpg'],
    ['Electronics',       'electronics', 'Breadboard circuit in progress',                'gallery-electronics-1.jpg'],
    ['Robotics',          'robotics',    'Robotic arm prototype demonstration',            'gallery-robotics-1.jpg'],
    ['Innovation',        'innovation',  'Students presenting their tinkering project',    'gallery-innovation-1.jpg'],
    ['DIY Kits',          'kits',        'Paper circuit buzzer game components',           'gallery-kits-2.jpg'],
    ['Workshops',         'workshops',   'Hands-on group workshop activity',               'gallery-workshops-2.jpg'],
    ['Student Activities','activities',  'Balancing bird experiment in class',             'gallery-activities-2.jpg'],
    ['Electronics',       'electronics', 'Arduino board wiring demonstration',             'gallery-electronics-2.jpg'],
    ['Robotics',          'robotics',    'Walking rope robot in motion',                   'gallery-robotics-2.jpg'],
    ['Innovation',        'innovation',  'Student-designed STEM solution on display',      'gallery-innovation-2.jpg']
  ];

  var grid = document.getElementById('galleryGrid');
  if (grid) {
    var seenCategories = {};
    var gHtml = '';
    galleryItems.forEach(function (item, i) {
      var isPrimary = !seenCategories[item[1]];
      seenCategories[item[1]] = true;
      gHtml += '<div class="gallery-item" data-filter="' + item[1] +
               '" data-primary="' + isPrimary +
               '" data-caption="' + item[2] +
               '" data-img="assets/images/' + item[3] +
               '" data-aos="fade-up" data-aos-delay="' + ((i % 6) * 40) + '">' +
                 '<img src="assets/images/' + item[3] + '" alt="' + item[2] + '" class="gallery-photo-img" loading="lazy">' +
               '</div>';
    });
    grid.innerHTML = gHtml;

    /* Filter function — fixed, no missing bracket */
    function applyGalleryFilter(f) {
      if (f === 'all') {
        grid.classList.add('grid-mode-all');
      } else {
        grid.classList.remove('grid-mode-all');
      }
      document.querySelectorAll('.gallery-item').forEach(function (gi) {
        gi.style.display = (f === 'all' || gi.dataset.filter === f) ? '' : 'none';
      });
    }

    applyGalleryFilter('all');

    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyGalleryFilter(btn.dataset.filter);
      });
    });

    /* Lightbox */
    var lightbox = document.getElementById('lightbox');
    var lightboxContent = document.getElementById('lightboxContent');

    document.querySelectorAll('.gallery-item').forEach(function (gi) {
      gi.addEventListener('click', function () {
        lightboxContent.innerHTML = '<img src="' + gi.dataset.img + '" alt="' + gi.dataset.caption + '" class="lightbox-photo-img">';
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
    var SHEET_URL = "https://script.google.com/macros/s/AKfycbw9aKHUUL6wcKxgavqky_EQIzOsdzIrx3G0A9e--reIDCdYr9qet17-NBiWyMXUFSgP/exec";

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }

      var submitBtn   = document.getElementById('submitBtn');
      var successBox  = document.getElementById('formSuccess');
      var errorBox    = document.getElementById('formError');
      errorBox.style.display = 'none';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      var interests = Array.from(document.querySelectorAll('.interest-check:checked'))
                           .map(function (c) { return c.value; })
                           .join(', ');

      var f = form.elements;
      var payload = new URLSearchParams({
        full_name:         f.full_name.value,
        organisation_name: f.organisation_name ? f.organisation_name.value : '',
        designation:       f.designation       ? f.designation.value       : '',
        email:             f.email.value,
        phone:             f.phone.value,
        city:              f.city.value,
        state:             f.state              ? f.state.value             : '',
        organisation_type: f.organisation_type  ? f.organisation_type.value : '',
        interested_in:     interests,
        message:           f.message.value
      });

      try {
        await fetch(SHEET_URL, { method: 'POST', mode: 'no-cors', body: payload });
        successBox.classList.add('show');
        form.reset();
        /* Reset institution fields visibility after form reset */
        document.querySelectorAll('.institution-field').forEach(function (f) {
          f.classList.remove('visible');
        });
        document.querySelectorAll('.buyer-tab').forEach(function (t) {
          t.classList.remove('active');
        });
        document.querySelector('.buyer-tab').classList.add('active');
      } catch (err) {
        console.error(err);
        errorBox.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Order Inquiry';
      }
    });
  }

  /* ---- Buyer type tabs ---- */
  var buyerTabs  = document.querySelectorAll('.buyer-tab');
  var instFields = document.querySelectorAll('.institution-field');
  buyerTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      buyerTabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');
      if (tab.dataset.type === 'institution') {
        instFields.forEach(function (f) { f.classList.add('visible'); });
      } else {
        instFields.forEach(function (f) { f.classList.remove('visible'); });
      }
    });
  });

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
