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
  const AB_KEY = 'ab_variant_restocks';
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
      title: 'Automatisez votre gestion des stocks.',
      subtitle: 'Des alertes intelligentes et des prévisions fiables qui vous aident à commander juste ce qu\'il faut, sans effort.',
      cta: 'Être alerté du lancement'
    },
    b: {
      title: 'Anticipez vos besoins, protégez votre marge.',
      subtitle: 'Des alertes intelligentes et des prévisions fiables pour réduire les pertes et gagner du temps, sans complexité.',
      cta: 'Recevoir une alerte'
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
    const prenom = String(formData.get('prenom') || '').trim();
    const nom = String(formData.get('nom') || '').trim();

    if (!email || !prenom || !nom) {
      setMessage('Merci de remplir tous les champs obligatoires.', 'error');
      return;
    }

    setMessage('Envoi en cours…');
    track('signup_start', { variant });

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: JSON.stringify({ email, prenom, nom, source: 'landing', variant })
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
    const subject = encodeURIComponent('Liste d\'attente - Restocks');
    const body = encodeURIComponent(`Prénom: ${prenom}\nNom: ${nom}\nEmail: ${email}\nVariant: ${variant}`);
    window.location.href = `mailto:hello@exemple.com?subject=${subject}&body=${body}`;
    setMessage('Votre client mail va s\'ouvrir. Si rien ne se passe, écrivez-nous: hello@exemple.com');
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
