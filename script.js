/**
 * SkillBridge - Simple & Lightweight Landing Page Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Modals (Get Started & Login)
  const authModal = document.getElementById('auth-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalClose = document.getElementById('modal-close');

  const openModal = (title, desc) => {
    if (!authModal) return;
    if (modalTitle) modalTitle.textContent = title;
    if (modalDesc) modalDesc.textContent = desc;
    authModal.classList.add('open');
  };

  const closeModal = () => {
    if (authModal) authModal.classList.remove('open');
  };

  document.querySelectorAll('.open-get-started').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('Get Started with SkillBridge', 'Select your role or create an account to begin skill mapping and discovering opportunities.');
    });
  });

  document.querySelectorAll('.open-login').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal('Sign In to SkillBridge', 'Enter your credentials to access your Student, Institution, or Industry dashboard.');
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeModal();
    });
  }

  // Simple Form Submission Feedback
  const form = document.getElementById('modal-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Welcome! Demo portal authentication successful.');
      closeModal();
    });
  }
});
