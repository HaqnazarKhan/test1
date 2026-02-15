document.addEventListener("DOMContentLoaded", () => {
    const btn = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");
    if (!btn || !nav) return;
  
    // Create overlay once
    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);
  
    const closeAllSubmenus = () => {
      nav.querySelectorAll(".menu-item-has-children.is-open")
        .forEach((li) => li.classList.remove("is-open"));
    };
  
    const setOpen = (open) => {
      document.body.classList.toggle("nav-open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  
      // when closing menu — collapse submenu
      if (!open) closeAllSubmenus();
    };
  
    // Toggle drawer
    btn.addEventListener("click", () => {
      setOpen(!document.body.classList.contains("nav-open"));
    });
  
    // Close on overlay / ESC
    overlay.addEventListener("click", () => setOpen(false));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  
    // Close after clicking any link (delay so navigation works)
    nav.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        setTimeout(() => setOpen(false), 120);
      });
    });
  
    // Submenu accordion on mobile (for "Біз туралы")
    nav.querySelectorAll(".submenu-toggle").forEach((toggle) => {
      toggle.addEventListener("click", (e) => {
        if (window.innerWidth > 992) return; // desktop keeps hover dropdown
        e.preventDefault();
  
        const li = toggle.closest(".menu-item-has-children");
        if (!li) return;
  
        // Optional: close other submenus before opening this one
        nav.querySelectorAll(".menu-item-has-children").forEach((x) => {
          if (x !== li) x.classList.remove("is-open");
        });
  
        li.classList.toggle("is-open");
      });
    });
  
    // If user rotates phone / resizes to desktop, reset state
    window.addEventListener("resize", () => {
      if (window.innerWidth > 992) {
        document.body.classList.remove("nav-open");
        closeAllSubmenus();
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-label", "Open menu");
      }
    });
  });