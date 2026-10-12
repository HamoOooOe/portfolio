/**
 * Mohamed Moussa - Portfolio Interactive Engine
 * Principal UI/UX & Frontend Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initThemeSwitcher();
  initCounters();
  initYlbConfigurator();
  initVlanGenerator();
  initCombatParrySim();
  initSkillsFilter();
  initContactActions();
  initMobileNav();
  initScrollSpy();
});

/* ==========================================================================
   1. SPLASH SCREEN & ENTRANCE ANIMATION (0 - 2.0s)
   ========================================================================== */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  const splashText = document.getElementById('splash-text');
  const skipBtn = document.getElementById('skip-splash');
  if (!splash) return;

  const phrase = "Find the friction. Remove it.";
  let charIdx = 0;
  let isSkipped = false;

  function dismissSplash() {
    if (isSkipped) return;
    isSkipped = true;
    splash.classList.add('fade-out');
    setTimeout(() => {
      splash.style.display = 'none';
    }, 850);
  }

  // Typewriter effect
  function typeChar() {
    if (isSkipped) return;
    if (charIdx < phrase.length) {
      splashText.textContent += phrase.charAt(charIdx);
      charIdx++;
      setTimeout(typeChar, 45);
    } else {
      // Pause briefly at the completed punchline, then transition smoothly
      setTimeout(dismissSplash, 650);
    }
  }

  // Start after small initial pause
  setTimeout(typeChar, 350);

  // Manual skip handlers
  if (skipBtn) {
    skipBtn.addEventListener('click', dismissSplash);
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
      dismissSplash();
    }
  }, { once: true });
}

/* ==========================================================================
   THEME SWITCHER ENGINE (LIVE PALETTES)
   ========================================================================== */
function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('.theme-palette-btn');
  const savedTheme = localStorage.getItem('mm_portfolio_theme') || 'default';

  function applyTheme(name) {
    if (name === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', name);
    }

    themeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-name') === name);
    });

    localStorage.setItem('mm_portfolio_theme', name);
  }

  // Initial load
  applyTheme(savedTheme);

  // Button clicks
  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const themeName = btn.getAttribute('data-theme-name');
      applyTheme(themeName);
      showToast(`Theme switched to: ${btn.getAttribute('data-tooltip').split('(')[0].trim()}`);
    });
  });
}

/* ==========================================================================
   2. ANIMATED KEY METRICS COUNTERS
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.metric-val');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateAllCounters();
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.metrics-counter-grid');
  if (metricsSection) {
    observer.observe(metricsSection);
  }

  function animateAllCounters() {
    counterElements.forEach(el => {
      const target = parseFloat(el.getAttribute('data-target') || '0');
      const isDecimal = target % 1 !== 0;
      const duration = 1600; // ms
      const steps = 40;
      const stepDuration = duration / steps;
      let current = 0;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          el.textContent = isDecimal ? target.toFixed(1) : Math.round(target);
          clearInterval(timer);
        } else {
          el.textContent = isDecimal ? current.toFixed(1) : Math.floor(current);
        }
      }, stepDuration);
    });
  }
}

/* ==========================================================================
   3. YLB (YOUR LOCAL BRAND) 4-STEP FLOW CONFIGURATOR
   ========================================================================== */
function initYlbConfigurator() {
  const state = {
    step: 1,
    garment: 'Heavyweight Hoodie',
    basePrice: 28.00,
    fabric: '100% French Terry Cotton (420 GSM)',
    fabricMultiplier: 1.25,
    customization: 'High-Density Puff Embroidery',
    customCost: 6.50,
    colorName: 'Onyx Black',
    colorHex: '#181A20',
    quantity: 25,
    expressShipping: false
  };

  const garmentSVGs = {
    'Heavyweight Hoodie': `<path d="M50 35 L75 20 L105 20 L130 35 L120 70 L105 60 L105 130 L75 130 L75 60 L60 70 Z" fill="currentColor" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`,
    'Oversized Tee': `<path d="M45 40 L70 25 L110 25 L135 40 L120 65 L108 58 L108 135 L72 135 L72 58 L60 65 Z" fill="currentColor" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`,
    'Cargo Trousers': `<path d="M65 30 L115 30 L122 135 L100 135 L90 75 L80 135 L58 135 Z" fill="currentColor" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`,
    'Bomber Jacket': `<path d="M45 35 L75 22 L105 22 L135 35 L122 80 L108 65 L108 130 L72 130 L72 65 L58 80 Z" fill="currentColor" stroke="rgba(255,255,255,0.2)" stroke-width="2"/>`
  };

  // DOM elements
  const stepIndicators = document.querySelectorAll('.step-indicator-btn');
  const panes = document.querySelectorAll('.config-step-pane');
  const garmentCards = document.querySelectorAll('[data-config-step="1"] .config-option-card');
  const fabricCards = document.querySelectorAll('[data-config-step="2"] .config-option-card');
  const customCards = document.querySelectorAll('[data-config-step="3"] .config-option-card');
  const colorSwatches = document.querySelectorAll('.color-swatch-btn');
  const qtySlider = document.getElementById('ylb-qty-slider');
  const qtyDisplay = document.getElementById('ylb-qty-display');
  
  // Preview DOM
  const previewGarment = document.getElementById('ylb-svg-path');
  const previewGarmentSvg = document.getElementById('ylb-preview-svg');
  const previewSpecBadge = document.getElementById('ylb-live-spec');
  const sumGarment = document.getElementById('sum-garment');
  const sumFabric = document.getElementById('sum-fabric');
  const sumCustom = document.getElementById('sum-custom');
  const sumUnits = document.getElementById('sum-units');
  const priceUnitDisplay = document.getElementById('ylb-price-per-unit');
  const priceTotalDisplay = document.getElementById('ylb-price-total');
  const trackingTimeDisplay = document.getElementById('ylb-turnaround-time');

  function calculatePricing() {
    // Volume discount curve
    let volumeDiscount = 1.0;
    if (state.quantity >= 100) volumeDiscount = 0.72;
    else if (state.quantity >= 50) volumeDiscount = 0.82;
    else if (state.quantity >= 25) volumeDiscount = 0.90;
    else if (state.quantity >= 10) volumeDiscount = 0.96;

    const unitPrice = ((state.basePrice * state.fabricMultiplier) + state.customCost) * volumeDiscount;
    const totalPrice = unitPrice * state.quantity;

    let leadDays = state.quantity > 50 ? "7-9 Business Days" : "4-6 Business Days";

    return {
      unitPrice: unitPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      leadDays
    };
  }

  function updateUI() {
    // Update active tab buttons
    stepIndicators.forEach(btn => {
      const stepNum = parseInt(btn.getAttribute('data-step') || '1');
      btn.classList.toggle('active', stepNum === state.step);
      btn.classList.toggle('completed', stepNum < state.step);
    });

    // Update active pane
    panes.forEach(pane => {
      const paneStep = parseInt(pane.getAttribute('data-config-step') || '1');
      pane.classList.toggle('active', paneStep === state.step);
    });

    // Update summary table
    if (sumGarment) sumGarment.textContent = `${state.garment} (${state.colorName})`;
    if (sumFabric) sumFabric.textContent = state.fabric;
    if (sumCustom) sumCustom.textContent = state.customization;
    if (sumUnits) sumUnits.textContent = `${state.quantity} pcs`;

    // Calculate dynamic price
    const pricing = calculatePricing();
    if (priceUnitDisplay) priceUnitDisplay.textContent = `$${pricing.unitPrice}`;
    if (priceTotalDisplay) priceTotalDisplay.textContent = `$${pricing.totalPrice}`;
    if (trackingTimeDisplay) trackingTimeDisplay.textContent = `Estimated Production & Dispatch: ${pricing.leadDays}`;

    // Update preview SVG visual
    if (previewGarmentSvg) {
      previewGarmentSvg.style.color = state.colorHex;
    }
    if (previewSpecBadge) {
      previewSpecBadge.textContent = `${state.garment} • ${state.colorName}`;
    }
    if (previewGarment && garmentSVGs[state.garment]) {
      previewGarment.innerHTML = garmentSVGs[state.garment];
    }
  }

  // Bind step navigation
  stepIndicators.forEach(btn => {
    btn.addEventListener('click', () => {
      state.step = parseInt(btn.getAttribute('data-step') || '1');
      updateUI();
    });
  });

  document.querySelectorAll('.btn-step-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.step < 4) {
        state.step++;
        updateUI();
      }
    });
  });

  document.querySelectorAll('.btn-step-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      if (state.step > 1) {
        state.step--;
        updateUI();
      }
    });
  });

  // Step 1: Garment Selection
  garmentCards.forEach(card => {
    card.addEventListener('click', () => {
      garmentCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.garment = card.getAttribute('data-garment');
      state.basePrice = parseFloat(card.getAttribute('data-price') || '25');
      updateUI();
    });
  });

  // Step 2: Fabric Selection
  fabricCards.forEach(card => {
    card.addEventListener('click', () => {
      fabricCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.fabric = card.getAttribute('data-fabric');
      state.fabricMultiplier = parseFloat(card.getAttribute('data-multiplier') || '1');
      updateUI();
    });
  });

  // Step 3: Customization
  customCards.forEach(card => {
    card.addEventListener('click', () => {
      customCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.customization = card.getAttribute('data-custom');
      state.customCost = parseFloat(card.getAttribute('data-cost') || '0');
      updateUI();
    });
  });

  // Color Swatches
  colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      colorSwatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');
      state.colorName = swatch.getAttribute('data-color-name');
      state.colorHex = swatch.getAttribute('data-color-hex');
      updateUI();
    });
  });

  // Quantity Slider
  if (qtySlider && qtyDisplay) {
    qtySlider.addEventListener('input', (e) => {
      state.quantity = parseInt(e.target.value);
      qtyDisplay.textContent = `${state.quantity} pcs`;
      updateUI();
    });
  }

  // Initial draw
  updateUI();
}

/* ==========================================================================
   4. CISCO VLAN CONFIG GENERATOR (INTERNAL AUTOMATION TOOL)
   ========================================================================== */
function initVlanGenerator() {
  const switchModel = document.getElementById('vlan-switch-model');
  const hostnameInput = document.getElementById('vlan-hostname');
  const mgmtIpInput = document.getElementById('vlan-mgmt-ip');
  const vlanProfileSelect = document.getElementById('vlan-profile');
  const btnGenerate = document.getElementById('btn-generate-cli');
  const cliOutput = document.getElementById('cli-code-output');
  const btnCopyCli = document.getElementById('btn-copy-cli');

  if (!btnGenerate || !cliOutput) return;

  function generateCLI() {
    const sw = switchModel ? switchModel.value : 'Catalyst 3850';
    const host = (hostnameInput && hostnameInput.value.trim()) || 'ALX-DIST-SW01';
    const mgmt = (mgmtIpInput && mgmtIpInput.value.trim()) || '10.20.10.15';
    const profile = vlanProfileSelect ? vlanProfileSelect.value : 'campus';

    let vlanDefs = '';
    if (profile === 'campus') {
      vlanDefs = `! === VLAN ARCHITECTURE ===
vlan 10
 name CAMPUS_STUDENTS
vlan 20
 name FACULTY_STAFF
vlan 30
 name VOIP_TELEPHONY
vlan 99
 name INFRA_MANAGEMENT
exit`;
    } else if (profile === 'industrial') {
      vlanDefs = `! === INDUSTRIAL SITE VLANS ===
vlan 100
 name SCADA_SENSORS
vlan 200
 name FACTORY_PLC
vlan 300
 name CCTV_SECURITY
vlan 999
 name IT_ISOLATED_MGMT
exit`;
    } else {
      vlanDefs = `! === STANDARD ENTERPRISE VLANS ===
vlan 10
 name DATA_USERS
vlan 50
 name GUEST_WIFI
vlan 80
 name SERVERS_APP
vlan 99
 name NETWORK_OOB
exit`;
    }

    const script = `! *************************************************************
! CISCO SWITCH AUTOMATED CONFIGURATION SCRIPT
! Generated by Mohamed Moussa's Internal Tooling Suite
! Target: Cisco ${sw} | Site: Alexandria, Egypt
! *************************************************************
enable
configure terminal
hostname ${host}
!
no ip domain-lookup
service password-encryption
spanning-tree mode rapid-pvst
!
${vlanDefs}
!
! === UPLINK TRUNK CONFIGURATION ===
interface GigabitEthernet1/0/48
 description TRUNK_TO_SOPHOS_FIREWALL_CORE
 switchport mode trunk
 switchport trunk native vlan 99
 switchport trunk allowed vlan 10,20,30,99
 switchport nonegotiate
 spanning-tree portfast trunk
!
! === MANAGEMENT INTERFACE ===
interface Vlan99
 description MANAGEMENT_SVI
 ip address ${mgmt} 255.255.255.0
 no shutdown
exit
ip default-gateway 10.20.10.1
!
! === DEFENSIVE PORT SECURITY TEMPLATE ===
interface range GigabitEthernet1/0/1 - 24
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 30
 switchport port-security
 switchport port-security maximum 2
 switchport port-security violation restrict
 spanning-tree portfast
 spanning-tree bpduguard enable
!
end
write memory
! [SUCCESS: Switch ${host} configuration compiled and ready for deployment]`;

    cliOutput.textContent = script;
  }

  btnGenerate.addEventListener('click', generateCLI);

  if (btnCopyCli) {
    btnCopyCli.addEventListener('click', () => {
      const textToCopy = cliOutput.textContent;
      navigator.clipboard.writeText(textToCopy).then(() => {
        showToast("Cisco Switch Configuration copied to clipboard!");
      }).catch(() => {
        showToast("CLI text selected!");
      });
    });
  }

  // Generate default once
  generateCLI();
}

/* ==========================================================================
   5. ONE BOSS - PARRY & DEFLECTION COMBAT SIMULATOR
   ========================================================================== */
function initCombatParrySim() {
  const btnParry = document.getElementById('btn-parry-trigger');
  const postureFill = document.getElementById('posture-fill-bar');
  const posturePct = document.getElementById('posture-pct-label');
  const feedbackMsg = document.getElementById('combat-feedback');

  if (!btnParry || !postureFill) return;

  let currentPosture = 65;
  const messages = [
    "⚔️ PERFECT DEFLECTION! Boss posture +15%. Frame-perfect window!",
    "💥 HEAVY PARRY! Sound cue triggered, boss stagger meter climbing.",
    "🛡️ DEFLECTED! High posture damage dealt, player stamina intact.",
    "⚡ COUNTER-STRIKE! Boss encounter phase 7 threshold reached!"
  ];

  btnParry.addEventListener('click', () => {
    // Add posture damage
    currentPosture = Math.min(100, currentPosture + 12);
    postureFill.style.width = `${currentPosture}%`;
    if (posturePct) posturePct.textContent = `${currentPosture}% / 100% (STAGGER THRESHOLD)`;

    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    if (feedbackMsg) {
      feedbackMsg.textContent = randomMsg;
      feedbackMsg.style.color = currentPosture >= 95 ? "#FF5F56" : "#00F0FF";
    }

    if (currentPosture >= 100) {
      feedbackMsg.textContent = "🔥 POSTURE BROKEN! Boss vulnerability window opened for critical strike!";
      feedbackMsg.style.color = "#FFB703";
      setTimeout(() => {
        currentPosture = 30;
        postureFill.style.width = `${currentPosture}%`;
        if (posturePct) posturePct.textContent = `${currentPosture}% / 100%`;
      }, 2500);
    }
  });
}

/* ==========================================================================
   6. SKILLS MATRIX FILTER
   ========================================================================== */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll('.skill-filter-btn');
  const categoryCards = document.querySelectorAll('.skill-category-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter') || 'all';

      categoryCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. CONTACT ACTIONS & TOAST
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function initContactActions() {
  // Email Copy button
  const copyEmailBtns = document.querySelectorAll('.btn-copy-email');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'taskye3@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast("Copied taskye3@gmail.com to clipboard!");
      });
    });
  });

  // Phone Copy button
  const copyPhoneBtns = document.querySelectorAll('.btn-copy-phone');
  copyPhoneBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const phone = '+201284632150';
      navigator.clipboard.writeText(phone).then(() => {
        showToast("Copied +20 128 463 2150 to clipboard!");
      });
    });
  });

  // Message Form Submit
  const contactForm = document.getElementById('quick-contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('form-name')?.value || '';
      const email = document.getElementById('form-email')?.value || '';
      const subject = document.getElementById('form-subject')?.value || 'Junior Mobile / Game Developer Role';
      const msg = document.getElementById('form-message')?.value || '';

      const mailtoLink = `mailto:taskye3@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + name + " (" + email + ")\n\n" + msg)}`;
      window.location.href = mailtoLink;
      showToast("Redirecting to your email client to send message...");
      contactForm.reset();
    });
  }
}

/* ==========================================================================
   8. MOBILE NAVIGATION & SCROLL SPY
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle-btn');
  const drawer = document.querySelector('.mobile-menu-drawer');
  const nav = document.querySelector('.site-nav');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('open');
        const icon = toggleBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }

  // Sticky nav background on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
