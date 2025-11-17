(function(){
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const dataLayer = window.dataLayer = window.dataLayer || [];

  // Year in footer
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Simple tracking helper (works with GTM dataLayer or no-op)
  function track(event, payload = {}){
    try {
      dataLayer.push({ event, ...payload });
    } catch(e) {
      // no-op
    }
    if (window.plausible && typeof window.plausible === 'function') {
      try { window.plausible(event, { props: payload }); } catch(_){}
    }
  }

  // A/B testing (headline + CTA) with URL override & localStorage stickiness
  const AB_KEY = 'ab_variant_stoqa';
  const params = new URLSearchParams(window.location.search);
  let variant = params.get('variant');
  if (!variant) {
    variant = localStorage.getItem(AB_KEY) || (Math.random() < 0.5 ? 'a' : 'b');
  }
  localStorage.setItem(AB_KEY, variant);

  const heroTitle = $('#hero-title');
  const heroSubtitle = $('#hero-subtitle');
  const ctamain = $('#cta-main');

  const variants = {
    a: {
      title: 'Arrêtez de perdre de l\'argent à cause de vos stocks.',
      subtitle: 'Chaque rupture vous coûte des clients. Chaque surstock grignote votre marge. Notre outil anticipe vos besoins et automatise l\'inventaire — en 10 minutes par jour.',
      cta: 'Je m\'inscris sur la liste d\'attente'
    },
    b: {
      title: 'Anticipez vos besoins, protégez votre marge.',
      subtitle: 'Des alertes intelligentes et des prévisions fiables pour réduire les pertes et gagner du temps, sans complexité.',
      cta: 'Rejoindre la liste d\'attente'
    }
  };
  const v = variants[variant] || variants.a;
  if (heroTitle) heroTitle.textContent = v.title;
  if (heroSubtitle) heroSubtitle.textContent = v.subtitle;
  if (ctamain) ctamain.textContent = v.cta;
  track('variant_assigned', { variant });

  // CTA tracking
  $$('[data-cta]').forEach(el => {
    el.addEventListener('click', () => track('cta_click', { id: el.id || 'cta', variant }));
  });

  // Form handling (supports Formspree or mailto fallback)
  const form = $('#signup-form');
  const msg = $('#form-message');

  async function submitForm(e){
    e.preventDefault();
    if (!form) return;

    const endpoint = form.getAttribute('data-endpoint') || '';
    const formData = new FormData(form);
    const email = String(formData.get('email') || '').trim();
    const name = String(formData.get('name') || '').trim();

    if (!email) {
      setMessage('Merci d’indiquer un email valide.', 'error');
      return;
    }

    setMessage('Envoi en cours…');
    track('signup_start', { variant });

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: JSON.stringify({ email, name, source: 'landing', variant })
        });
        if (res.ok) {
          setMessage('Merci, vérifiez votre boîte mail.');
          form.reset();
          track('signup_submit', { variant, transport: 'fetch' });
          return;
        }
        throw new Error('Bad status ' + res.status);
      } catch(err) {
        // fallback to mailto if fetch fails
      }
    }

    // Mailto fallback
    const subject = encodeURIComponent('Liste d\'attente - Stoqa');
    const body = encodeURIComponent(`Email: ${email}\nNom: ${name}\nVariant: ${variant}`);
    window.location.href = `mailto:hello@exemple.com?subject=${subject}&body=${body}`;
    setMessage('Votre client mail va s’ouvrir. Si rien ne se passe, écrivez-nous: hello@exemple.com');
    track('signup_submit', { variant, transport: 'mailto' });
  }

  function setMessage(text, type){
    if (!msg) return;
    msg.textContent = text;
    msg.className = 'form-message' + (type ? ` ${type}` : '');
  }

  if (form) form.addEventListener('submit', submitForm);

  // Page view
  track('page_view');
})();
