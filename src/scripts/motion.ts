import { animate, inView, scroll, stagger } from 'motion';

/**
 * Orquestación de animaciones con Motion para Gestoría GS.
 * Diseñado con criterios de sobriedad profesional, accesibilidad estricta
 * y cero layout shift (transform + opacity con aceleración por GPU).
 */
export function initMotion() {
  if (
    typeof window === 'undefined' ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    return;
  }

  // 1. Barra superior de progreso de lectura (vinculada al scroll con Motion)
  initScrollProgress();

  // 2. Animación de entrada inicial del Hero
  animateHeroEntrance();

  // 3. Revelado progresivo de secciones al entrar en viewport
  setupScrollReveals();

  // 4. Micro-interacciones de feedback visual
  setupMicroInteractions();
}

/**
 * Barra sutil con gradiente corporativo en la base del header
 * que refleja el progreso de lectura del usuario a lo largo de la página.
 */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress-bar');
  if (!progressBar) return;

  scroll((progress) => {
    progressBar.style.transform = `scaleX(${progress})`;
  });
}

/**
 * Entrada elegante y escalonada de los elementos clave del Hero.
 */
function animateHeroEntrance() {
  const customEase = [0.22, 1, 0.36, 1] as const;

  const eyebrow = document.querySelector('.hero-eyebrow');
  const title = document.querySelector('.hero-title');
  const desc = document.querySelector('.hero-desc');
  const actionButtons = document.querySelectorAll('.hero-actions > *');
  const proof = document.querySelector('.hero-proof');
  const heroImg = document.querySelector('.hero-img');
  const heroBadge = document.querySelector('.hero-badge');

  if (eyebrow) {
    animate(
      eyebrow,
      { opacity: [0, 1], transform: ['translateY(12px)', 'translateY(0px)'] },
      { duration: 0.5, delay: 0.08, ease: customEase }
    );
  }

  if (title) {
    animate(
      title,
      { opacity: [0, 1], transform: ['translateY(24px)', 'translateY(0px)'] },
      { duration: 0.7, delay: 0.16, ease: customEase }
    );
  }

  if (desc) {
    animate(
      desc,
      { opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0px)'] },
      { duration: 0.6, delay: 0.28, ease: customEase }
    );
  }

  if (actionButtons.length > 0) {
    animate(
      actionButtons,
      { opacity: [0, 1], transform: ['translateY(16px)', 'translateY(0px)'] },
      {
        duration: 0.55,
        delay: stagger(0.1, { startDelay: 0.38 }),
        ease: customEase,
      }
    );
  }

  if (proof) {
    animate(
      proof,
      { opacity: [0, 1], transform: ['translateY(10px)', 'translateY(0px)'] },
      { duration: 0.6, delay: 0.55, ease: 'easeOut' }
    );
  }

  if (heroImg) {
    animate(
      heroImg,
      { opacity: [0, 1], transform: ['scale(0.96)', 'scale(1)'] },
      { duration: 0.85, delay: 0.2, ease: customEase }
    );
  }

  if (heroBadge) {
    animate(
      heroBadge,
      {
        opacity: [0, 1],
        transform: ['scale(0.7) rotate(-8deg)', 'scale(1) rotate(0deg)'],
      },
      { duration: 0.75, delay: 0.45, ease: [0.34, 1.56, 0.64, 1] }
    );
  }
}

/**
 * Revelado visual al desplazarse mediante inView.
 * Emplea un WeakSet para garantizar que cada grupo se anime exactamente una vez.
 */
function setupScrollReveals() {
  const animatedElements = new WeakSet<Element>();
  const customEase = [0.22, 1, 0.36, 1] as const;

  // --- Barra de confianza (Trust Bar) ---
  const trustBar = document.querySelector('.trust-bar');
  const trustItems = document.querySelectorAll('.trust-item');
  if (trustBar && trustItems.length > 0) {
    inView(
      trustBar,
      () => {
        if (animatedElements.has(trustBar)) return;
        animatedElements.add(trustBar);

        animate(
          trustItems,
          {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0px)'],
          },
          {
            duration: 0.55,
            delay: stagger(0.12),
            ease: customEase,
          }
        );
      },
      { amount: 0.2 }
    );
  }

  // --- Sección Servicios ---
  const servicesIntro = document.querySelector('.services-intro');
  if (servicesIntro) {
    inView(
      servicesIntro,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['translateY(24px)', 'translateY(0px)'],
          },
          { duration: 0.6, ease: customEase }
        );
      },
      { amount: 0.25 }
    );
  }

  const featuredGrid = document.querySelector('.featured-grid');
  const featuredCards = document.querySelectorAll('.service-card-featured');
  if (featuredGrid && featuredCards.length > 0) {
    inView(
      featuredGrid,
      () => {
        if (animatedElements.has(featuredGrid)) return;
        animatedElements.add(featuredGrid);

        animate(
          featuredCards,
          {
            opacity: [0, 1],
            transform: ['translateY(28px)', 'translateY(0px)'],
          },
          {
            duration: 0.65,
            delay: stagger(0.15),
            ease: customEase,
          }
        );
      },
      { amount: 0.2 }
    );
  }

  const listGrid = document.querySelector('.list-grid');
  const listCards = document.querySelectorAll('.service-item-list');
  if (listGrid && listCards.length > 0) {
    inView(
      listGrid,
      () => {
        if (animatedElements.has(listGrid)) return;
        animatedElements.add(listGrid);

        animate(
          listCards,
          {
            opacity: [0, 1],
            transform: ['translateY(18px)', 'translateY(0px)'],
          },
          {
            duration: 0.5,
            delay: stagger(0.08),
            ease: customEase,
          }
        );
      },
      { amount: 0.15 }
    );
  }

  // --- Sección Beneficios ---
  const benefitsIntro = document.querySelector('.benefits-intro');
  if (benefitsIntro) {
    inView(
      benefitsIntro,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['translateY(22px)', 'translateY(0px)'],
          },
          { duration: 0.6, ease: customEase }
        );
      },
      { amount: 0.2 }
    );
  }

  const benefitsList = document.querySelector('.benefits-list');
  const benefitItems = document.querySelectorAll('.benefit-item');
  if (benefitsList && benefitItems.length > 0) {
    inView(
      benefitsList,
      () => {
        if (animatedElements.has(benefitsList)) return;
        animatedElements.add(benefitsList);

        animate(
          benefitItems,
          {
            opacity: [0, 1],
            transform: ['translateX(-18px)', 'translateX(0px)'],
          },
          {
            duration: 0.55,
            delay: stagger(0.09),
            ease: customEase,
          }
        );
      },
      { amount: 0.15 }
    );
  }

  // --- Proceso (3 pasos) ---
  const processIntro = document.querySelector('#proceso .section-title');
  if (processIntro) {
    inView(
      processIntro,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0px)'],
          },
          { duration: 0.55, ease: customEase }
        );
      },
      { amount: 0.25 }
    );
  }

  const processSteps = document.querySelector('.process-steps');
  const stepItems = document.querySelectorAll('.step-item');
  const stepMarkers = document.querySelectorAll('.step-marker');
  if (processSteps && stepItems.length > 0) {
    inView(
      processSteps,
      () => {
        if (animatedElements.has(processSteps)) return;
        animatedElements.add(processSteps);

        animate(
          stepItems,
          {
            opacity: [0, 1],
            transform: ['translateY(24px)', 'translateY(0px)'],
          },
          {
            duration: 0.6,
            delay: stagger(0.14),
            ease: customEase,
          }
        );

        if (stepMarkers.length > 0) {
          animate(
            stepMarkers,
            {
              transform: ['scale(0.75)', 'scale(1)'],
            },
            {
              duration: 0.5,
              delay: stagger(0.14, { startDelay: 0.1 }),
              ease: [0.34, 1.56, 0.64, 1],
            }
          );
        }
      },
      { amount: 0.2 }
    );
  }

  // --- Sobre mí ---
  const aboutImg = document.querySelector('.about-img');
  if (aboutImg) {
    inView(
      aboutImg,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['scale(0.95)', 'scale(1)'],
          },
          { duration: 0.7, ease: customEase }
        );
      },
      { amount: 0.25 }
    );
  }

  const aboutContent = document.querySelector('.about-content');
  const valuePills = document.querySelectorAll('.value-pill');
  if (aboutContent) {
    inView(
      aboutContent,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['translateY(22px)', 'translateY(0px)'],
          },
          { duration: 0.6, ease: customEase }
        );

        if (valuePills.length > 0) {
          animate(
            valuePills,
            {
              opacity: [0, 1],
              transform: ['scale(0.85)', 'scale(1)'],
            },
            {
              duration: 0.45,
              delay: stagger(0.06, { startDelay: 0.2 }),
              ease: customEase,
            }
          );
        }
      },
      { amount: 0.25 }
    );
  }

  // --- Preguntas Frecuentes ---
  const faqIntro = document.querySelector('.faq-intro');
  if (faqIntro) {
    inView(
      faqIntro,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0px)'],
          },
          { duration: 0.55, ease: customEase }
        );
      },
      { amount: 0.25 }
    );
  }

  const faqList = document.querySelector('.faq-accordion-list');
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqList && faqItems.length > 0) {
    inView(
      faqList,
      () => {
        if (animatedElements.has(faqList)) return;
        animatedElements.add(faqList);

        animate(
          faqItems,
          {
            opacity: [0, 1],
            transform: ['translateY(16px)', 'translateY(0px)'],
          },
          {
            duration: 0.5,
            delay: stagger(0.07),
            ease: customEase,
          }
        );
      },
      { amount: 0.15 }
    );
  }

  // --- Sección Contacto & Formulario ---
  const contactIntro = document.querySelector('.contact-intro');
  if (contactIntro) {
    inView(
      contactIntro,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['translateY(22px)', 'translateY(0px)'],
          },
          { duration: 0.6, ease: customEase }
        );
      },
      { amount: 0.2 }
    );
  }

  const contactCard = document.querySelector('.contact-form-card');
  if (contactCard) {
    inView(
      contactCard,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['translateY(26px)', 'translateY(0px)'],
          },
          { duration: 0.65, delay: 0.1, ease: customEase }
        );
      },
      { amount: 0.15 }
    );
  }

  // --- CTA Final ---
  const finalBlock = document.querySelector('.final-text-block');
  if (finalBlock) {
    inView(
      finalBlock,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['translateY(20px)', 'translateY(0px)'],
          },
          { duration: 0.6, ease: customEase }
        );
      },
      { amount: 0.25 }
    );
  }

  const finalBtn = document.querySelector('.btn-wa-final');
  if (finalBtn) {
    inView(
      finalBtn,
      (target) => {
        if (animatedElements.has(target)) return;
        animatedElements.add(target);

        animate(
          target,
          {
            opacity: [0, 1],
            transform: ['scale(0.92)', 'scale(1)'],
          },
          { duration: 0.5, delay: 0.15, ease: [0.34, 1.56, 0.64, 1] }
        );
      },
      { amount: 0.25 }
    );
  }
}

/**
 * Micro-interacciones interactivas de hover y acordeón.
 */
function setupMicroInteractions() {
  // 1. Acordeón FAQ: rotación sutil del signo + a x
  const detailsList = document.querySelectorAll('details.faq-item');
  detailsList.forEach((details) => {
    const icon = details.querySelector('.gs-plus');
    if (!icon) return;

    details.addEventListener('toggle', () => {
      const isOpen = (details as HTMLDetailsElement).open;
      animate(
        icon,
        {
          transform: isOpen
            ? ['rotate(0deg)', 'rotate(45deg)']
            : ['rotate(45deg)', 'rotate(0deg)'],
        },
        { duration: 0.22, ease: 'easeOut' }
      );
    });
  });

  // 2. Micro-elevación suave en botones de llamada a la acción
  const interactiveButtons = document.querySelectorAll<HTMLElement>(
    '#hero-wa-cta, .btn-wa-final, .btn-wa-alt'
  );

  interactiveButtons.forEach((btn) => {
    btn.addEventListener('mouseenter', () => {
      animate(
        btn,
        { transform: 'translateY(-2px)' },
        { duration: 0.2, ease: 'easeOut' }
      );
    });

    btn.addEventListener('mouseleave', () => {
      animate(
        btn,
        { transform: 'translateY(0px)' },
        { duration: 0.2, ease: 'easeOut' }
      );
    });
  });

  // 3. Tarjetas de servicios destacados: sutil acento al hacer hover
  const cards = document.querySelectorAll<HTMLElement>(
    '.service-card-featured'
  );
  cards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
      animate(
        card,
        { transform: 'translateY(-3px)' },
        { duration: 0.25, ease: 'easeOut' }
      );
    });

    card.addEventListener('mouseleave', () => {
      animate(
        card,
        { transform: 'translateY(0px)' },
        { duration: 0.25, ease: 'easeOut' }
      );
    });
  });
}
