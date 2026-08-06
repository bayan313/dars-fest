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

  // Lightbox Functionality
  const lightbox = document.getElementById("lightbox");
  if (lightbox) {
    const closeBtn = lightbox.querySelector(".lightbox-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
        const content = lightbox.querySelector(".lightbox-content");
        content.innerHTML = '<button class="lightbox-close">&times;</button>';
      });
    }

    // Close on click outside content
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = "none";
        const content = lightbox.querySelector(".lightbox-content");
        content.innerHTML = '<button class="lightbox-close">&times;</button>';
      }
    });
  }
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
    background-color: ${type === 'success' ? '#10b981' : type === 'warning' ? '#f59e0b' : type === 'danger' ? '#ef4444' : '#3b82f6'};
    animation: slideUp 0.3s ease;
  `;
  
  alert.innerHTML = `
    <span>${message}</span>
    <span class="close-alert" style="cursor:pointer;font-weight:bold;margin-left:15px;">&times;</span>
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
    z-index: 9999;
    max-width: 350px;
  `;
  document.body.appendChild(container);
  return container;
}

// Format date helper
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
