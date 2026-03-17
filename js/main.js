/**
 * WebDev Company - Main JavaScript
 * Professional website template with modern ES6+ features
 * Vanilla JavaScript (no dependencies)
 */

'use strict';

// ============================================
// DOM Ready
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initCounterAnimation();
  initContactForm();
  initActiveNavLink();
});

// ============================================
// 1. Header Scroll Effect
// ============================================
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const scrollThreshold = 50;
  let ticking = false;

  const updateHeader = () => {
    if (window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateHeader();
}

// ============================================
// 2. Mobile Menu Toggle
// ============================================
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav-link');
  const body = document.body;

  if (!toggle || !nav) return;

  const openMenu = () => {
    toggle.classList.add('active');
    nav.classList.add('active');
    body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const closeMenu = () => {
    toggle.classList.remove('active');
    nav.classList.remove('active');
    body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = nav.classList.contains('active');
    isOpen ? closeMenu() : openMenu();
  };

  toggle.addEventListener('click', toggleMenu);

  // Close menu when clicking a nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        closeMenu();
      }
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (
      nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !toggle.contains(e.target)
    ) {
      closeMenu();
    }
  });
}

// ============================================
// 3. Smooth Scroll for Anchor Links
// ============================================
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');

      // Skip if just "#" or empty
      if (!targetId || targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const header = document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      // Update URL hash without jumping
      history.pushState(null, null, targetId);
    });
  });
}

// ============================================
// 4. Scroll Animations (IntersectionObserver)
// ============================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (!animatedElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;

        // Support staggered animations via data-delay attribute
        const delay = el.dataset.delay || 0;

        setTimeout(() => {
          el.classList.add('animated');
        }, parseInt(delay));

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });
}

// ============================================
// 5. Counter Animation
// ============================================
function initCounterAnimation() {
  const counters = document.querySelectorAll('.counter');

  if (!counters.length) return;

  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.target, 10);
    const suffix = counter.dataset.suffix || '';
    const prefix = counter.dataset.prefix || '';
    const duration = parseInt(counter.dataset.duration, 10) || 2000;
    const startTime = performance.now();

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(easedProgress * target);

      counter.textContent = `${prefix}${currentValue.toLocaleString()}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// ============================================
// 6. Contact Form Handler
// ============================================
function initContactForm() {
  const form = document.querySelector('.contact-form');

  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const btnText = submitBtn?.querySelector('.btn-text');
  const btnLoading = submitBtn?.querySelector('.btn-loading');
  const formMessage = form.querySelector('.form-message');

  const showMessage = (type, text) => {
    if (!formMessage) return;

    formMessage.className = `form-message ${type}`;
    formMessage.textContent = text;
    formMessage.style.display = 'block';

    // Auto-hide success message after 5 seconds
    if (type === 'success') {
      setTimeout(() => {
        formMessage.style.display = 'none';
      }, 5000);
    }
  };

  const setLoading = (isLoading) => {
    if (!submitBtn) return;

    submitBtn.disabled = isLoading;
    submitBtn.classList.toggle('loading', isLoading);

    if (btnText) btnText.style.display = isLoading ? 'none' : 'inline';
    if (btnLoading) btnLoading.style.display = isLoading ? 'inline-flex' : 'none';
  };

  const validateField = (field) => {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');

    // Remove previous error
    field.classList.remove('error');
    const existingError = field.parentElement.querySelector('.field-error');
    if (existingError) existingError.remove();

    if (required && !value) {
      return { valid: false, message: 'This field is required' };
    }

    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return { valid: false, message: 'Please enter a valid email address' };
      }
    }

    return { valid: true };
  };

  const showFieldError = (field, message) => {
    field.classList.add('error');
    const errorEl = document.createElement('span');
    errorEl.className = 'field-error';
    errorEl.textContent = message;
    field.parentElement.appendChild(errorEl);
  };

  // Real-time validation on blur
  form.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('blur', () => {
      const result = validateField(field);
      if (!result.valid) {
        showFieldError(field, result.message);
      }
    });

    field.addEventListener('input', () => {
      field.classList.remove('error');
      const existingError = field.parentElement.querySelector('.field-error');
      if (existingError) existingError.remove();
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    const fields = form.querySelectorAll('input, textarea');
    let isValid = true;

    fields.forEach(field => {
      const result = validateField(field);
      if (!result.valid) {
        showFieldError(field, result.message);
        isValid = false;
      }
    });

    if (!isValid) {
      // Focus first error field
      const firstError = form.querySelector('.error');
      if (firstError) firstError.focus();
      return;
    }

    // Collect form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    setLoading(true);

    try {
      // Simulate API call (replace with actual endpoint)
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });

      // Simulated delay for demo
      await new Promise(resolve => setTimeout(resolve, 1500));

      // if (!response.ok) throw new Error('Failed to send message');

      showMessage('success', 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
      form.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      showMessage('error', 'Oops! Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  });
}

// ============================================
// 7. Active Nav Link on Scroll
// ============================================
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const header = document.querySelector('.header');
  const headerHeight = header ? header.offsetHeight : 0;

  let currentActive = null;

  const updateActiveLink = () => {
    const scrollPosition = window.scrollY + headerHeight + 100;

    let activeSection = null;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSection = section.getAttribute('id');
      }
    });

    // If at bottom of page, activate last section
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
      const lastSection = sections[sections.length - 1];
      activeSection = lastSection.getAttribute('id');
    }

    if (activeSection !== currentActive) {
      currentActive = activeSection;

      navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.classList.toggle('active', href === activeSection);
      });
    }
  };

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Initial check
  updateActiveLink();
}

// ============================================
// Utility: Debounce
// ============================================
function debounce(func, wait = 100) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ============================================
// Utility: Throttle
// ============================================
function throttle(func, limit = 100) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}
