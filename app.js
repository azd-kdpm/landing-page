// ========================================================================
// APP LOGIC - NEXUS CO-LAB DUAL PORTFOLIO & CONTACT ENGINE
// ========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Load manual overrides from localStorage (set via admin.html)
  const savedConfig = localStorage.getItem('nexus_custom_config');
  if (savedConfig) {
    try {
      const parsed = JSON.parse(savedConfig);
      if (parsed.configVersion === siteConfig.configVersion) {
        if (parsed.brand) Object.assign(siteConfig.brand, parsed.brand);
        if (parsed.partners) {
          if (parsed.partners.partner1) Object.assign(siteConfig.partners.partner1, parsed.partners.partner1);
          if (parsed.partners.partner2) Object.assign(siteConfig.partners.partner2, parsed.partners.partner2);
        }
        if (parsed.workingFields) siteConfig.workingFields = parsed.workingFields;
        if (parsed.timelineWorks) siteConfig.timelineWorks = parsed.timelineWorks;
      }
    } catch (e) {
      console.warn('Could not parse local config', e);
    }
  }

  // State
  let currentPartnerId = 'partner1';
  let activeFilter = 'all';

  // DOM Elements
  const partnerAvatar = document.getElementById('partner-avatar');
  const partnerName = document.getElementById('partner-name');
  const partnerRole = document.getElementById('partner-role');
  const partnerLocation = document.getElementById('partner-location');
  const partnerBio = document.getElementById('partner-bio');
  const partnerEmail = document.getElementById('partner-email');
  const partnerEmailLink = document.getElementById('partner-email-link');
  const partnerPhone = document.getElementById('partner-phone');
  const partnerPhoneLink = document.getElementById('partner-phone-link');
  const whatsappBtn = document.getElementById('whatsapp-btn');
  const saveVcardBtn = document.getElementById('save-vcard-btn');
  const shareProfileBtn = document.getElementById('share-profile-btn');
  const socialsContainer = document.getElementById('socials-container');
  const profileToggleBtns = document.querySelectorAll('.profile-toggle-btn');
  const workingFieldsContainer = document.getElementById('working-fields-container');
  const timelineContainer = document.getElementById('timeline-container');
  const filterBtns = document.querySelectorAll('.timeline-filter-btn');
  const brandNameEls = document.querySelectorAll('.brand-name');
  const brandTaglineEls = document.querySelectorAll('.brand-tagline');

  // Card theming elements
  const mainProfileCard = document.getElementById('main-profile-card');
  const partnerAvatarContainer = document.getElementById('partner-avatar-container');

  // Mobile Bottom Bar Elements
  const mobileSaveVcardBtn = document.getElementById('mobile-save-vcard-btn');
  const mobileWhatsappBtn = document.getElementById('mobile-whatsapp-btn');
  const mobileCallBtn = document.getElementById('mobile-call-btn');

  // QR Modal Elements
  const showQrBtn = document.getElementById('show-qr-btn');
  const mobileTopQrBtn = document.getElementById('mobile-top-qr-btn');
  const qrModal = document.getElementById('qr-modal');
  const qrModalCloseBtn = document.getElementById('qr-modal-close-btn');
  const qrModalBackdrop = document.getElementById('qr-modal-backdrop');
  const qrCodeImg = document.getElementById('qr-code-img');
  const qrPartnerName = document.getElementById('qr-partner-name');
  const qrCopyBtn = document.getElementById('qr-copy-btn');

  // Project Modal elements
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');

  // Initialize brand elements
  brandNameEls.forEach(el => el.textContent = siteConfig.brand.name);
  brandTaglineEls.forEach(el => el.textContent = siteConfig.brand.tagline);

  // Check URL query params for ?profile=partner2
  const urlParams = new URLSearchParams(window.location.search);
  const paramProfile = urlParams.get('profile') || urlParams.get('user') || urlParams.get('p');
  if (paramProfile && siteConfig.partners[paramProfile]) {
    currentPartnerId = paramProfile;
  }

  // Set up SVG icons lookup (embedded icons for flawless standalone preview)
  const ICONS = {
    phone: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
    whatsapp: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.971.558 1.83.822 2.781.822 3.181 0 5.767-2.587 5.768-5.766.001-3.18-2.585-5.766-5.768-5.766zm9.969 5.766c-.002 5.523-4.477 10-10 10-1.706 0-3.359-.441-4.832-1.282l-5.168 1.344 1.375-5.023c-.933-1.536-1.375-3.27-1.375-5.039.002-5.523 4.477-10 10-10 5.522 0 10 4.477 10 10z"/></svg>`,
    mail: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
    vcard: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>`,
    share: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/></svg>`,
    check: `<svg class="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
    external: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`,
    'home-automation': `<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7a5 5 0 016 0m-4 2a2 2 0 012 0"/></svg>`,
    'security-alarm': `<svg class="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2v2m8.485 1.515l-1.414 1.414M3.515 5.515l1.414 1.414"/></svg>`,
    'cctv': `<svg class="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/><circle cx="9" cy="12" r="2" stroke-width="2"/></svg>`,
    'solar-camera': `<svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4" stroke-width="2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 1v2m0 8v2M4.929 4.929l1.414 1.414m11.314 0l1.414-1.414M1 7h2m18 0h2"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 17h8a2 2 0 002-2v-3a2 2 0 00-2-2H6a2 2 0 00-2 2v3a2 2 0 002 2zm10-4l4-2v6l-4-2"/></svg>`,
    'solar-electric': `<svg class="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/><circle cx="12" cy="12" r="9" stroke-width="1.5" stroke-dasharray="2 2"/></svg>`,
    'gate-automation': `<svg class="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16M7 4v16M17 4v16"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 12l2-2m0 0l2 2m-2-2v6"/></svg>`,
    'biometric': `<svg class="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 004 11m0 0a8.003 8.003 0 0115.357-2m1.571 2a9.96 9.96 0 00-.71 3.7"/></svg>`,
    'wifi-network': `<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>`,
    'nurse-call': `<svg class="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/><circle cx="12" cy="12" r="9" stroke-width="2"/></svg>`
  };

  // Switch Partner Function
  function renderPartner(partnerId, updateUrl = true) {
    currentPartnerId = partnerId;
    const partner = siteConfig.partners[partnerId];
    if (!partner) return;

    if (updateUrl) {
      const url = new URL(window.location);
      url.searchParams.set('profile', partnerId);
      window.history.replaceState({}, '', url);
    }

    // Toggle button active states
    profileToggleBtns.forEach(btn => {
      const isCurrent = btn.dataset.partner === partnerId;
      btn.classList.toggle('bg-blue-600', isCurrent);
      btn.classList.toggle('text-white', isCurrent);
      btn.classList.toggle('shadow-lg', isCurrent);
      btn.classList.toggle('shadow-blue-500/25', isCurrent);
      btn.classList.toggle('bg-slate-800/80', !isCurrent);
      btn.classList.toggle('text-slate-400', !isCurrent);
      btn.classList.toggle('hover:text-slate-200', !isCurrent);
    });

    // Content updates with animation
    const cardEl = document.getElementById('digital-card');
    if (cardEl) {
      cardEl.classList.remove('fade-in-quick');
      void cardEl.offsetWidth; // trigger reflow
      cardEl.classList.add('fade-in-quick');
    }

    // Toggle Ansarullah's stealth matte-black monochrome edition
    const isAnsar = partnerId === 'partner2';
    if (mainProfileCard) {
      mainProfileCard.classList.toggle('theme-ansar-black', isAnsar);
    }
    if (partnerAvatarContainer) {
      partnerAvatarContainer.classList.toggle('theme-ansar-avatar', isAnsar);
    }
    if (saveVcardBtn) {
      saveVcardBtn.classList.toggle('theme-ansar-save-btn', isAnsar);
    }
    if (mobileSaveVcardBtn) {
      mobileSaveVcardBtn.classList.toggle('theme-ansar-save-btn', isAnsar);
    }

    partnerAvatar.src = partner.avatar;
    partnerAvatar.alt = partner.name;
    partnerName.textContent = partner.name;
    partnerRole.textContent = partner.role;
    partnerLocation.textContent = partner.location;
    partnerBio.textContent = partner.bio;
    partnerEmail.textContent = partner.email;
    partnerEmailLink.href = `mailto:${partner.email}?subject=Collaboration%20Inquiry`;
    partnerPhone.textContent = partner.phoneDisplay;
    partnerPhoneLink.href = `tel:${partner.phoneRaw}`;

    // Update WhatsApp link with pre-filled greeting
    const waUrl = `https://wa.me/${partner.whatsapp}?text=${encodeURIComponent(partner.customWhatsappGreeting)}`;
    whatsappBtn.href = waUrl;
    whatsappBtn.setAttribute('data-target-partner', partner.name);

    // Update Mobile Action Bar Links
    if (mobileWhatsappBtn) {
      mobileWhatsappBtn.href = waUrl;
    }
    if (mobileCallBtn) {
      mobileCallBtn.href = `tel:${partner.phoneRaw}`;
    }
    if (qrPartnerName) {
      qrPartnerName.textContent = partner.name;
    }

    // Update Socials
    socialsContainer.innerHTML = '';
    const socialPlatforms = [
      { name: 'LinkedIn', url: partner.socials.linkedin, icon: 'linkedin' },
      { name: 'GitHub / Works', url: partner.socials.github, icon: 'github' },
      { name: 'Instagram', url: partner.socials.instagram, icon: 'instagram' },
      { name: 'Twitter / X', url: partner.socials.twitter, icon: 'twitter' }
    ];

    socialPlatforms.forEach(s => {
      if (s.url) {
        const a = document.createElement('a');
        a.href = s.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'px-3 py-1.5 rounded-lg bg-slate-800/60 hover:bg-slate-700/80 text-xs font-medium text-slate-300 hover:text-white border border-slate-700/50 transition-colors flex items-center gap-1.5';
        a.innerHTML = `<span>${s.name}</span> <span class="opacity-60">${ICONS.external}</span>`;
        socialsContainer.appendChild(a);
      }
    });
  }

  // QR Modal Functions
  function openQrModal() {
    const partner = siteConfig.partners[currentPartnerId];
    if (!qrModal || !partner) return;

    const profileUrl = `${window.location.origin}${window.location.pathname}?profile=${currentPartnerId}`;
    if (qrPartnerName) qrPartnerName.textContent = partner.name;
    if (qrCodeImg) {
      qrCodeImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=12&data=${encodeURIComponent(profileUrl)}`;
    }

    qrModal.classList.remove('hidden');
    qrModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeQrModal() {
    if (!qrModal) return;
    qrModal.classList.add('hidden');
    qrModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Generate & Download vCard (.vcf)
  function downloadVCard() {
    const partner = siteConfig.partners[currentPartnerId];
    if (!partner) return;

    // Contact name formatted specifically: e.g. "Asadullah / CCTV, Home Automation"
    const contactName = partner.vcard?.contactName || `${partner.vcard?.firstName || partner.name} / CCTV, Home Automation`;

    // Build standard vCard 3.0 string compatible with iPhone & Android
    const vCardLines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${contactName}`,
      `N:;${contactName};;;`,
      `ORG:${partner.company || 'Nexus'}`,
      `TITLE:${partner.role}`,
      `TEL;TYPE=CELL,VOICE,PREF:${partner.phoneRaw}`,
      `EMAIL;TYPE=INTERNET,WORK,PREF:${partner.email}`,
      `URL:${partner.website}`,
      `ADR;TYPE=WORK:;;;${partner.location};;;`,
      `NOTE:${partner.vcard?.note || 'Nexus Founder'}`,
      'END:VCARD'
    ];

    const vCardString = vCardLines.join('\r\n');
    const blob = new Blob([vCardString], { type: 'text/vcard;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = `${(partner.vcard?.firstName || partner.name).replace(/\s+/g, '_')}_CCTV_Home_Automation.vcf`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    showToast(`✅ Contact saved as: "${contactName}"`);
  }

  // Share profile link
  function shareProfile() {
    const partner = siteConfig.partners[currentPartnerId];
    const shareUrl = `${window.location.origin}${window.location.pathname}?profile=${currentPartnerId}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        showToast(`🔗 Copied direct link for ${partner.name}'s profile to clipboard!`);
      }).catch(() => {
        promptCopyFallback(shareUrl, partner.name);
      });
    } else {
      promptCopyFallback(shareUrl, partner.name);
    }
  }

  function promptCopyFallback(url, name) {
    prompt(`Direct link for ${name}:`, url);
  }

  // Toast Notification Helper
  function showToast(message) {
    const toast = document.getElementById('toast-notification');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  }

  // Render Working Fields Section
  // Render Working Fields Section
  function renderWorkingFields() {
    if (!workingFieldsContainer) return;
    workingFieldsContainer.innerHTML = '';

    siteConfig.workingFields.forEach(field => {
      const iconSvg = ICONS[field.icon] || ICONS['cctv'] || ICONS['home-automation'];

      const card = document.createElement('div');
      card.className = 'glass-card rounded-2xl p-6 relative overflow-hidden group flex flex-col justify-between hover:border-blue-500/40 transition-all hover:shadow-xl hover:shadow-blue-500/5';
      card.innerHTML = `
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center group-hover:scale-110 transition-transform">
              ${iconSvg}
            </div>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700/50">
              ${field.tag}
            </span>
          </div>
          <h3 class="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">${field.title}</h3>
          <p class="text-sm text-slate-400 leading-relaxed mb-6">${field.description}</p>
        </div>
        <div>
          <div class="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2.5">Key Deliverables</div>
          <div class="flex flex-wrap gap-1.5">
            ${field.deliverables.map(d => `
              <span class="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-800/60 text-slate-300 border border-slate-700/40">
                ${ICONS.check} ${d}
              </span>
            `).join('')}
          </div>
        </div>
      `;
      workingFieldsContainer.appendChild(card);
    });
  }

  // Render Timeline Gallery
  function renderTimeline(filter = 'all') {
    activeFilter = filter;
    if (!timelineContainer) return;
    timelineContainer.innerHTML = '';

    const filteredWorks = siteConfig.timelineWorks.filter(w => {
      if (filter === 'all') return true;
      return w.category === filter;
    });

    if (filteredWorks.length === 0) {
      timelineContainer.innerHTML = `<div class="text-center py-12 text-slate-400">No installations found in this category.</div>`;
      return;
    }

    const hidePhotos = siteConfig.brand.hideProjectPhotos || false;

    filteredWorks.forEach((work, index) => {
      const isEven = index % 2 === 0;
      const itemEl = document.createElement('div');
      itemEl.className = `timeline-item relative mb-12 md:mb-20 last:mb-0 flex flex-col md:flex-row items-center ${isEven ? 'md:flex-row-reverse' : ''}`;

      const hasPhoto = Boolean(work.image && !hidePhotos);

      const headerHtml = hasPhoto ? `
        <!-- Thumbnail Image -->
        <div class="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-800">
          <img src="${work.image}" alt="${work.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          
          <!-- Badge Pills -->
          <div class="absolute top-3 left-3 flex gap-2">
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/90 text-white backdrop-blur border border-white/10">
              ${work.date}
            </span>
            <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-600/90 text-white backdrop-blur">
              ${work.categoryLabel}
            </span>
          </div>

          ${work.metrics ? `
            <div class="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 backdrop-blur">
              ${work.metrics}
            </div>
          ` : ''}
        </div>
      ` : `
        <!-- Clean Technical Header (When photos are hidden) -->
        <div class="p-5 pb-2 flex items-center justify-between border-b border-slate-800/60 bg-slate-900/40">
          <div class="flex items-center gap-2">
            <span class="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/40">
              ${work.date}
            </span>
            <span class="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
              ${work.categoryLabel}
            </span>
          </div>
          ${work.metrics ? `
            <div class="px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
              ${work.metrics}
            </div>
          ` : ''}
        </div>
      `;

      itemEl.innerHTML = `
        <!-- Timeline Center Node & Date -->
        <div class="timeline-node top-6"></div>

        <!-- Content Card -->
        <div class="w-full pl-8 sm:pl-10 md:pl-0 md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}">
          <div class="glass-card rounded-2xl overflow-hidden group cursor-pointer hover:border-blue-500/40 transition-all shadow-xl hover:shadow-blue-500/5" data-project-id="${work.id}">
            ${headerHtml}

            <!-- Card Body -->
            <div class="p-5 sm:p-6">
              <div class="text-xs font-medium text-blue-400 mb-1 tracking-wide uppercase">${work.client}</div>
              <h4 class="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">${work.title}</h4>
              <p class="text-sm text-slate-300/90 line-clamp-2 mb-4 leading-relaxed">${work.summary}</p>
              
              <!-- Tags -->
              <div class="flex flex-wrap gap-1.5 mb-4">
                ${work.tags.map(t => `<span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/50">${t}</span>`).join('')}
              </div>

              <!-- Action Link -->
              <div class="flex items-center justify-between pt-3 border-t border-slate-800/80">
                <span class="text-xs text-slate-400">${work.roleText.split(':')[0]}</span>
                <span class="inline-flex items-center gap-1 text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                  View Case Details &rarr;
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty spacer column for balanced layout on desktop -->
        <div class="hidden md:block w-1/2"></div>
      `;

      // Click card to open modal
      itemEl.querySelector('.glass-card').addEventListener('click', () => {
        openProjectModal(work);
      });

      timelineContainer.appendChild(itemEl);
    });
  }

  // Open Project Modal
  function openProjectModal(work) {
    if (!projectModal || !modalContent) return;

    const hidePhotos = siteConfig.brand.hideProjectPhotos || false;
    const hasPhoto = Boolean(work.image && !hidePhotos);

    const modalHeader = hasPhoto ? `
      <div class="relative h-48 sm:h-72 w-full overflow-hidden shrink-0">
        <img src="${work.image}" alt="${work.title}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
        <div class="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white">${work.date}</span>
            <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800/90 text-slate-300 border border-slate-700">${work.categoryLabel}</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-white leading-tight">${work.title}</h2>
          <div class="text-xs sm:text-sm text-blue-300 font-medium">${work.client}</div>
        </div>
      </div>
    ` : `
      <div class="p-6 sm:p-8 bg-slate-900/90 border-b border-slate-800">
        <div class="flex items-center gap-2 mb-2">
          <span class="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white">${work.date}</span>
          <span class="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">${work.categoryLabel}</span>
        </div>
        <h2 class="text-xl sm:text-2xl font-bold text-white leading-tight">${work.title}</h2>
        <div class="text-xs sm:text-sm text-blue-300 font-medium mt-1">${work.client}</div>
      </div>
    `;

    modalContent.innerHTML = `
      ${modalHeader}

      <div class="p-5 sm:p-7 space-y-5">
        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Project Overview</h4>
          <p class="text-slate-200 text-sm sm:text-base leading-relaxed">${work.fullDescription}</p>
        </div>

        <div class="p-3.5 sm:p-4 rounded-xl bg-blue-950/30 border border-blue-800/40">
          <div class="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Collaborative Execution</div>
          <div class="text-xs sm:text-sm text-slate-300">${work.roleText}</div>
        </div>

        ${work.metrics ? `
          <div class="p-3.5 sm:p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/40 flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-emerald-400">Impact Result</span>
            <span class="text-xs sm:text-sm font-semibold text-emerald-200">${work.metrics}</span>
          </div>
        ` : ''}

        <div>
          <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Technologies & Competencies</h4>
          <div class="flex flex-wrap gap-1.5 sm:gap-2">
            ${work.tags.map(t => `<span class="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium border border-slate-700">${t}</span>`).join('')}
          </div>
        </div>

        <div class="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
          <button id="modal-whatsapp-inquire-btn" class="w-full sm:w-auto px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
            ${ICONS.whatsapp} <span>Inquire About Similar Project</span>
          </button>
          <button id="modal-close-inner-btn" class="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors text-center">
            Close
          </button>
        </div>
      </div>
    `;

    // Modal action handlers
    const modalWaBtn = document.getElementById('modal-whatsapp-inquire-btn');
    if (modalWaBtn) {
      modalWaBtn.addEventListener('click', () => {
        const partner = siteConfig.partners[currentPartnerId];
        const text = encodeURIComponent(`Hi ${partner.name}! I saw your work on "${work.title}" and would love to discuss a similar project.`);
        window.open(`https://wa.me/${partner.whatsapp}?text=${text}`, '_blank');
      });
    }

    const modalCloseInner = document.getElementById('modal-close-inner-btn');
    if (modalCloseInner) {
      modalCloseInner.addEventListener('click', closeProjectModal);
    }

    projectModal.classList.remove('hidden');
    projectModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    projectModal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  // Event Listeners
  profileToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      renderPartner(btn.dataset.partner, true);
    });
  });

  if (saveVcardBtn) {
    saveVcardBtn.addEventListener('click', downloadVCard);
  }

  if (mobileSaveVcardBtn) {
    mobileSaveVcardBtn.addEventListener('click', downloadVCard);
  }

  if (shareProfileBtn) {
    shareProfileBtn.addEventListener('click', shareProfile);
  }

  // QR Modal triggers & actions
  if (showQrBtn) {
    showQrBtn.addEventListener('click', openQrModal);
  }

  if (mobileTopQrBtn) {
    mobileTopQrBtn.addEventListener('click', openQrModal);
  }

  if (qrModalCloseBtn) {
    qrModalCloseBtn.addEventListener('click', closeQrModal);
  }

  if (qrModalBackdrop) {
    qrModalBackdrop.addEventListener('click', closeQrModal);
  }

  if (qrCopyBtn) {
    qrCopyBtn.addEventListener('click', () => {
      shareProfile();
      closeQrModal();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', closeProjectModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeQrModal();
    }
  });

  // Timeline Filter Tabs
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white');
        b.classList.add('bg-slate-800/80', 'text-slate-400');
      });
      btn.classList.remove('bg-slate-800/80', 'text-slate-400');
      btn.classList.add('bg-blue-600', 'text-white');
      renderTimeline(btn.dataset.filter);
    });
  });

  // Initial Render
  renderPartner(currentPartnerId, false);
  renderWorkingFields();
  renderTimeline('all');
});
