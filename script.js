/**
 * AyurLearn - Modern Ayurveda Clinical Training & Internship Management System
 * Production Frontend Logic & Interactive Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // =========================================================================
  // 1. LUCIDE ICONS INITIALIZER
  // =========================================================================
  const initIcons = () => {
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      lucide.createIcons();
    }
  };
  initIcons();

  // =========================================================================
  // 2. TOAST NOTIFICATION ENGINE
  // =========================================================================
  window.showToast = (message, type = 'success', duration = 3500) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSymbol = '🌿';
    if (type === 'info') iconSymbol = '🏥';
    if (type === 'purple') iconSymbol = '🏛️';
    if (type === 'warning') iconSymbol = '⚠️';

    toast.innerHTML = `
      <span class="text-base">${iconSymbol}</span>
      <div class="flex-1 text-xs">
        <span>${message}</span>
      </div>
      <button class="text-slate-400 hover:text-slate-700 font-bold text-sm ml-1" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px) scale(0.95)';
      setTimeout(() => toast.remove(), 250);
    }, duration);
  };

  // =========================================================================
  // 3. MAIN SPA VIEW ROUTER (Landing, Role Select, 3 Portals)
  // =========================================================================
  const views = {
    'landing': document.getElementById('view-landing'),
    'role-select': document.getElementById('view-role-select'),
    'student': document.getElementById('view-student'),
    'training-centre': document.getElementById('view-training-centre'),
    'institution': document.getElementById('view-institution'),
  };

  window.switchView = (viewKey) => {
    // Hide all views
    Object.keys(views).forEach(k => {
      if (views[k]) {
        views[k].classList.remove('active-view');
        views[k].style.display = 'none';
      }
    });

    // Show selected view
    const target = views[viewKey];
    if (target) {
      target.style.display = 'flex';
      target.classList.add('active-view');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update active state in floating role switcher
    document.querySelectorAll('.floating-role-switcher .nav-switch-btn').forEach(btn => {
      const match = btn.getAttribute('data-target-view') === viewKey;
      if (match) {
        btn.classList.add('ring-2', 'ring-white/40', 'font-bold');
      } else {
        btn.classList.remove('ring-2', 'ring-white/40', 'font-bold');
      }
    });

    initIcons();
  };

  // Attach nav switch triggers
  document.querySelectorAll('.nav-switch-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = btn.getAttribute('data-target-view');
      if (targetView) {
        switchView(targetView);
        if (targetView === 'student') showToast('Switched to Student Portal (Dr. Rohan Sharma)', 'success');
        if (targetView === 'training-centre') showToast('Switched to Training Centre Portal (NIA Jaipur)', 'info');
        if (targetView === 'institution') showToast('Switched to Institution Portal (Dean Office)', 'purple');
      }
    });
  });

  // =========================================================================
  // 4. SIDEBAR TAB NAVIGATION SYSTEM (For All 3 Portals)
  // =========================================================================
  const setupPortalTabs = (portalName, titleElementId) => {
    const links = document.querySelectorAll(`a[data-portal="${portalName}"]`);
    const pageTitle = document.getElementById(titleElementId);

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabKey = link.getAttribute('data-tab');
        if (!tabKey) return;

        // Update active class on links
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');

        // Hide all tabs for this portal
        const allTabs = document.querySelectorAll(`#view-${portalName === 'student' ? 'student' : portalName === 'centre' ? 'training-centre' : 'institution'} .tab-content`);
        allTabs.forEach(t => t.classList.remove('active'));

        // Show target tab
        const targetTab = document.getElementById(`${portalName}-tab-${tabKey}`);
        if (targetTab) {
          targetTab.classList.add('active');
        }

        // Update title
        if (pageTitle) {
          const text = link.innerText.trim().replace(/[0-9]+/g, '');
          pageTitle.innerHTML = `<i data-lucide="folder" class="w-5 h-5"></i> <span>${text}</span>`;
          initIcons();
        }

        // Auto close mobile drawer
        const sidebar = document.getElementById(`${portalName === 'student' ? 'student' : portalName === 'centre' ? 'centre' : 'inst'}-sidebar`);
        if (sidebar && window.innerWidth < 1024) {
          sidebar.classList.add('hidden');
        }
      });
    });
  };

  setupPortalTabs('student', 'student-page-title');
  setupPortalTabs('centre', 'centre-page-title');
  setupPortalTabs('inst', 'inst-page-title');

  // Intra-dashboard quick tab switchers (e.g. "View All Courses →")
  document.querySelectorAll('.sidebar-tab-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const portal = trigger.getAttribute('data-portal');
      const tab = trigger.getAttribute('data-tab');
      const targetLink = document.querySelector(`a[data-portal="${portal}"][data-tab="${tab}"]`);
      if (targetLink) {
        targetLink.click();
      }
    });
  });

  // Mobile sidebar toggles
  document.querySelectorAll('.mobile-menu-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const sidebar = document.getElementById(targetId);
      if (sidebar) {
        sidebar.classList.toggle('hidden');
      }
    });
  });

  // =========================================================================
  // 5. MODAL SYSTEM ENGINE
  // =========================================================================
  window.openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('open');
      initIcons();
    }
  };

  window.closeModal = () => {
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
  };

  // Close buttons
  document.querySelectorAll('.close-modal-btn').forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  // Close on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  });

  // Modal Triggers:
  // Apply Modal
  document.querySelectorAll('.open-apply-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const centre = btn.getAttribute('data-centre') || 'National Institute of Ayurveda (NIA), Jaipur';
      const input = document.getElementById('apply-centre-input');
      if (input) input.value = centre;
      openModal('apply-modal');
    });
  });

  // Post Internship Modal
  document.querySelectorAll('.open-post-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('post-modal'));
  });

  // Case Study Modal
  document.querySelectorAll('.open-case-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-case');
      const titleDisplay = document.getElementById('case-title-display');
      if (title && titleDisplay) {
        titleDisplay.textContent = title;
      }
      openModal('case-modal');
    });
  });

  // Certificate Modal
  document.querySelectorAll('.open-cert-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('cert-modal'));
  });

  // Bedside Log Modal
  document.querySelectorAll('.open-bedside-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('bedside-modal'));
  });

  // Course Player Modal
  document.querySelectorAll('.open-course-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const titleDisplay = document.getElementById('course-modal-title');
      if (title && titleDisplay) {
        titleDisplay.textContent = title;
      }
      openModal('course-modal');
    });
  });

  // Mentorship Booking Modal
  document.querySelectorAll('.open-mentor-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mentor = btn.getAttribute('data-mentor') || 'Prof. (Dr.) Rajeshwar Sharma';
      const candidateInput = document.getElementById('interview-candidate-name');
      if (candidateInput) candidateInput.value = `Mentorship Session with ${mentor}`;
      openModal('interview-modal');
    });
  });

  // Announcement Modal
  document.querySelectorAll('.open-announcement-modal-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal('announcement-modal'));
  });

  // Auth Modal
  document.querySelectorAll('.open-auth-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-mode') || 'login';
      const title = document.getElementById('auth-modal-title');
      const desc = document.getElementById('auth-modal-desc');
      if (title && desc) {
        if (mode === 'register') {
          title.textContent = 'Create an AyurLearn Account';
          desc.textContent = 'Register as a Student, Training Centre or Institution.';
        } else {
          title.textContent = 'Login to AyurLearn';
          desc.textContent = 'Access your clinical training workspace.';
        }
      }
      openModal('auth-modal');
    });
  });

  // =========================================================================
  // 6. FORM SUBMISSION HANDLERS
  // =========================================================================
  
  // Application Form
  const formApply = document.getElementById('form-apply');
  if (formApply) {
    formApply.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Application submitted successfully! Training Centre coordinator notified.', 'success');
    });
  }

  // Post Internship Form
  const formPost = document.getElementById('form-post');
  if (formPost) {
    formPost.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('New clinical internship slot published to Student Portal!', 'info');
    });
  }

  // Interview Schedule Form
  const formInterview = document.getElementById('form-interview');
  if (formInterview) {
    formInterview.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Interview confirmed! Google Meet link sent to candidate and panel lead.', 'info');
    });
  }

  // Bedside Log Entry Form
  const formBedside = document.getElementById('form-bedside');
  if (formBedside) {
    formBedside.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Bedside clinical entry saved! Submitted to Prof. Rajeshwar Sharma for digital sign-off.', 'success');
    });
  }

  // Announcement Form
  const formAnnouncement = document.getElementById('form-announcement');
  if (formAnnouncement) {
    formAnnouncement.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal();
      showToast('Notice broadcasted to all 148 active hospital interns!', 'info');
    });
  }

  // Auth Form
  const formAuth = document.getElementById('form-auth');
  if (formAuth) {
    formAuth.addEventListener('submit', (e) => {
      e.preventDefault();
      const roleSelect = document.getElementById('auth-role-select');
      const selectedRole = roleSelect ? roleSelect.value : 'student';
      closeModal();
      switchView(selectedRole);
      showToast(`Welcome! Logged into ${selectedRole.replace('-', ' ').toUpperCase()} portal.`, 'success');
    });
  }

  // =========================================================================
  // 7. TRAINING CENTRE APPLICANT PIPELINE ACTIONS
  // =========================================================================
  
  // Filtering
  const filterBtns = document.querySelectorAll('.applicant-filter-btn');
  const applicantRows = document.querySelectorAll('.applicant-row');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update button styles
      filterBtns.forEach(b => {
        b.classList.remove('bg-teal-700', 'text-white');
        b.classList.add('bg-slate-100', 'text-slate-600');
      });
      btn.classList.add('bg-teal-700', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-slate-600');

      // Filter rows
      applicantRows.forEach(row => {
        const status = row.getAttribute('data-status');
        if (filter === 'all' || status === filter) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });

  // Shortlist action
  document.querySelectorAll('.btn-shortlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = btn.getAttribute('data-name');
      const row = btn.closest('.applicant-row');
      if (row) {
        row.setAttribute('data-status', 'shortlisted');
        const statusCell = row.querySelector('.status-cell');
        if (statusCell) {
          statusCell.innerHTML = '<span class="badge-pill bg-emerald-100 text-emerald-800 text-[10px]">Shortlisted</span>';
        }
      }
      showToast(`${name} has been moved to Shortlisted!`, 'success');
    });
  });

  // Reject action
  document.querySelectorAll('.btn-reject').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = btn.getAttribute('data-name');
      const row = btn.closest('.applicant-row');
      if (row) {
        row.setAttribute('data-status', 'rejected');
        const statusCell = row.querySelector('.status-cell');
        if (statusCell) {
          statusCell.innerHTML = '<span class="badge-pill bg-red-100 text-red-800 text-[10px]">Rejected</span>';
        }
      }
      showToast(`Application for ${name} marked as Rejected.`, 'warning');
    });
  });

  // Interview action
  document.querySelectorAll('.btn-interview').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const name = btn.getAttribute('data-name');
      const candidateInput = document.getElementById('interview-candidate-name');
      if (candidateInput) candidateInput.value = name;
      openModal('interview-modal');
    });
  });

});
