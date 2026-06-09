// Mike Zara Business Law - Main JS
document.addEventListener("DOMContentLoaded", function() {
    // Mobile nav toggle
    const toggle = document.getElementById("mobileToggle");
    const nav = document.getElementById("mainNav");
    if (toggle && nav) {
        toggle.addEventListener("click", function() {
            toggle.classList.toggle("active");
            nav.classList.toggle("active");
        });
        // Close on link click
        nav.querySelectorAll("a").forEach(function(link) {
            link.addEventListener("click", function() {
                toggle.classList.remove("active");
                nav.classList.remove("active");
            });
        });
    }

    // Sticky header
    const header = document.getElementById("header");
    if (header) {
        window.addEventListener("scroll", function() {
            header.classList.toggle("scrolled", window.scrollY > 50);
        });
    }

    // FAQ accordion
    document.querySelectorAll(".faq-q").forEach(function(btn) {
        btn.addEventListener("click", function() {
            const item = this.closest(".faq-item");
            const wasActive = item.classList.contains("active");
            // Close all in same list
            item.closest(".faq-list").querySelectorAll(".faq-item").forEach(function(i) {
                i.classList.remove("active");
            });
            if (!wasActive) item.classList.add("active");
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll("a[href^=\"#\"]").forEach(function(anchor) {
        anchor.addEventListener("click", function(e) {
            const id = this.getAttribute("href");
            if (id.length > 1) {
                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    // Contact form handling
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const btn = form.querySelector("button[type=submit]");
            btn.textContent = "Message Sent!";
            btn.style.background = "#2D3E5C";
            setTimeout(function() {
                btn.textContent = "Send Message";
                btn.style.background = "";
                form.reset();
            }, 3000);
        });
    }
});
