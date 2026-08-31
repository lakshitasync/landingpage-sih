/**
 * SkillBridge - Clinical Training & Internship Dashboard
 * Clean, Simple & Lightweight JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation between Landing Page & Dashboard
  const landingView = document.getElementById('landing-view');
  const dashboardView = document.getElementById('dashboard-view');

  const showDashboard = () => {
    if (landingView) landingView.classList.add('hidden');
    if (dashboardView) dashboardView.classList.remove('hidden');
  };

  const showLanding = () => {
    if (dashboardView) dashboardView.classList.add('hidden');
    if (landingView) landingView.classList.remove('hidden');
  };

  document.querySelectorAll('.open-dashboard').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showDashboard();
    });
  });

  document.querySelectorAll('.open-landing').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      showLanding();
    });
  });

  // 2. Dashboard Sidebar Tab Switching (All 20 Items)
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const tabContents = document.querySelectorAll('.tab-content');
  const pageTitle = document.getElementById('page-title');

  sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetTab = link.getAttribute('data-tab');

      if (targetTab === 'logout') {
        if (confirm('Do you want to log out?')) {
          showLanding();
        }
        return;
      }

      // Update active link style
      sidebarLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // Update visible tab content
      tabContents.forEach(tab => {
        if (tab.id === `tab-${targetTab}`) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      // Update page title
      if (pageTitle) {
        pageTitle.textContent = link.innerText.trim();
      }

      // Close mobile sidebar if open
      const mobileSidebar = document.getElementById('sidebar');
      if (mobileSidebar && window.innerWidth < 1024) {
        mobileSidebar.classList.add('hidden');
      }
    });
  });

  // 3. Mobile Sidebar Toggle
  const menuBtn = document.getElementById('menu-btn');
  const sidebar = document.getElementById('sidebar');
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', () => {
      sidebar.classList.toggle('hidden');
    });
  }

  // 4. Simple Modal Handling
  const modal = document.getElementById('action-modal');
  const modalClose = document.getElementById('modal-close');

  const openModal = () => {
    if (modal) modal.classList.add('open');
  };

  const closeModal = () => {
    if (modal) modal.classList.remove('open');
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  const modalForm = document.getElementById('modal-form');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Entry added successfully!');
      closeModal();
      modalForm.reset();
    });
  }

  // 5. Auth Modal Handling (Login / Sign Up)
  const authModal = document.getElementById('auth-modal');
  const authModalTitle = document.getElementById('auth-modal-title');
  const authModalDesc = document.getElementById('auth-modal-desc');
  const authModalClose = document.getElementById('auth-modal-close');
  const authForm = document.getElementById('auth-form');
  const authRoleGroup = document.getElementById('auth-role-group');

  const openAuthModal = (isSignUp = false) => {
    if (!authModal) return;
    if (isSignUp) {
      if (authModalTitle) authModalTitle.textContent = 'Create SkillBridge Account';
      if (authModalDesc) authModalDesc.textContent = 'Sign up to register as an intern, hospital, or mentor.';
      if (authRoleGroup) authRoleGroup.classList.remove('hidden');
    } else {
      if (authModalTitle) authModalTitle.textContent = 'Login to Portal';
      if (authModalDesc) authModalDesc.textContent = 'Enter your credentials to access your SkillBridge dashboard.';
      if (authRoleGroup) authRoleGroup.classList.add('hidden');
    }
    authModal.classList.add('open');
  };

  const closeAuthModal = () => {
    if (authModal) authModal.classList.remove('open');
  };

  document.querySelectorAll('.open-login').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal(false);
    });
  });

  document.querySelectorAll('.open-signup').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal(true);
    });
  });

  if (authModalClose) authModalClose.addEventListener('click', closeAuthModal);
  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeAuthModal();
      showDashboard();
      authForm.reset();
    });
  }

  // 6. Simple Search Filter for Cards / Tables
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      const currentActiveTab = document.querySelector('.tab-content.active');
      if (currentActiveTab) {
        currentActiveTab.querySelectorAll('.searchable-item').forEach(item => {
          const text = item.textContent.toLowerCase();
          item.style.display = text.includes(query) ? '' : 'none';
        });
      }
    });
  }
});
