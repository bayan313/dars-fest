// THANAFUS Dars Fest 2026 - Shared UI Javascript

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navbar Toggle
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      const spans = hamburger.querySelectorAll("span");
      if (navLinks.classList.contains("open")) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 6px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(6px, -6px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  // Auto Highlight Active Navbar Link
  const currentPath = window.location.pathname;
  const navAnchors = document.querySelectorAll(".nav-links a");
  
  navAnchors.forEach(anchor => {
    const href = anchor.getAttribute("href");
    if (!href) return;
    
    // Extract file name
    const pageName = href.substring(href.lastIndexOf('/') + 1) || 'index.html';
    const isCurrentPage = currentPath.endsWith(pageName) || 
                          (pageName === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html') || currentPath.endsWith('officel%20web/')));
    
    if (isCurrentPage) {
      anchor.classList.add("active");
    } else {
      anchor.classList.remove("active");
    }
  });

  // Lightbox Functionality - handled per-page to avoid conflicts
  // Each page (gallery.html, etc.) implements its own openLightbox/closeLightbox
});

// Global Alert Utility
function showAlert(message, type = "success") {
  const alertContainer = document.getElementById("alert-container") || createAlertContainer();
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.style.cssText = `
    padding: 12px 20px;
    margin-bottom: 10px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    background-color: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : type === 'danger' ? '#ef4444' : '#3b82f6'};
    animation: slideUp 0.3s ease;
  `;
  
  alert.innerHTML = `
    <span style="flex:1;min-width:0;overflow-wrap:break-word;word-break:break-word;white-space:normal;">${message}</span>
    <span class="close-alert" style="cursor:pointer;font-weight:bold;margin-left:15px;flex-shrink:0;">&times;</span>
  `;
  
  alertContainer.appendChild(alert);
  
  // Close alert button click
  alert.querySelector(".close-alert").addEventListener("click", () => {
    alert.remove();
  });
  
  // Auto remove alert after 4 seconds
  setTimeout(() => {
    alert.remove();
  }, 4000);
}

function createAlertContainer() {
  const container = document.createElement("div");
  container.id = "alert-container";
  container.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    left: 20px;
    z-index: 9999;
    max-width: 350px;
    margin-left: auto;
    box-sizing: border-box;
  `;
  document.body.appendChild(container);
  return container;
}

// Format date helper
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

// Global active item trackers for results page sync
window.activeProgrammeId = "";
window.activeTeamId = "";

// Capture user selections dynamically using decorator pattern
window.addEventListener("load", () => {
  if (typeof viewProgrammeDetails === 'function') {
    const orig = viewProgrammeDetails;
    window.viewProgrammeDetails = function(id) {
      window.activeProgrammeId = id;
      return orig.apply(this, arguments);
    };
  }
  if (typeof selectTeam === 'function') {
    const orig = selectTeam;
    window.selectTeam = function(id) {
      window.activeTeamId = id;
      return orig.apply(this, arguments);
    };
  }
});

// True while an admin is actively editing (modal open, typing, or a save in flight)
function isAdminBusy() {
  if (typeof ThanafusDB !== 'undefined' && typeof ThanafusDB.isSaving === 'function' && ThanafusDB.isSaving()) {
    return true;
  }
  const el = document.activeElement;
  if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') && !el.disabled && !el.readOnly) {
    return true;
  }
  const overlays = document.querySelectorAll('.modal-overlay');
  for (let i = 0; i < overlays.length; i++) {
    const overlay = overlays[i];
    if (overlay.style.display !== 'none' && window.getComputedStyle(overlay).display !== 'none') {
      return true;
    }
  }
  return false;
}

// Re-render the currently visible public views after fresh data arrives
function refreshPublicViews() {
  if (typeof loadLeaderboard === 'function') loadLeaderboard();
  if (typeof loadKalaprathibha === 'function') loadKalaprathibha();
  if (typeof loadProgrammes === 'function') loadProgrammes();
  if (typeof loadTeams === 'function') loadTeams();
  if (window.activeProgrammeId && typeof viewProgrammeDetails === 'function') {
    viewProgrammeDetails(window.activeProgrammeId);
  }
  if (window.activeTeamId && typeof selectTeam === 'function') {
    selectTeam(window.activeTeamId);
  }
  if (typeof searchStudentByName === 'function') {
    const input = document.getElementById("search-student");
    if (input && input.value.trim()) searchStudentByName(input.value.trim());
  }
  if (typeof loadGallery === 'function') loadGallery();
}

// Live refresh when data is saved in another tab of the same browser
window.addEventListener("storage", (e) => {
  if (e.key && e.key.includes("thanafus") && typeof ThanafusDB !== 'undefined') {
    if (window.location.pathname.includes('/admin/') && isAdminBusy()) return;
    ThanafusDB.load().then(() => {
      ThanafusDB.calculateLeaderboard();
      if (window.location.pathname.includes('/admin/')) {
        if (typeof window.__refreshAdminViews === 'function') window.__refreshAdminViews();
      } else {
        refreshPublicViews();
      }
    }).catch(() => {});
  }
});

// Auto-refresh / sync loop to load new results, minus marks, and gallery media dynamically
if (typeof ThanafusDB !== 'undefined') {
  setInterval(async () => {
    try {
      const isAdminPage = window.location.pathname.includes('/admin/');

      // On admin pages, skip refresh only while the admin is actively editing
      if (isAdminPage && isAdminBusy()) {
        return;
      }

      const oldRevision = ThanafusDB.db.revision || 0;
      await ThanafusDB.load();
      ThanafusDB.calculateLeaderboard();
      const newRevision = ThanafusDB.db.revision || 0;

      // If database has been updated (revision mismatch), update views
      if (oldRevision !== newRevision) {
        if (isAdminPage) {
          // Admin panel: re-render the current tab so fresh data shows immediately
          if (typeof window.__refreshAdminViews === 'function') window.__refreshAdminViews();
          return;
        }
        refreshPublicViews();
      }
    } catch (e) {
      console.warn("Auto-sync background check failed:", e.message || e);
    }
  }, 5000); // Check for updates every 5 seconds
}
