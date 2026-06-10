// ============================================================
// ZARA BUSINESS LAW — Premium Interactive JS
// Scroll animations, counter animations, glassmorphism header
// ============================================================

document.addEventListener("DOMContentLoaded", function() {

    // ==================== MOBILE NAV ====================
    const toggle = document.getElementById("mobileToggle");
    const nav = document.getElementById("mainNav");
    if (toggle && nav) {
        toggle.addEventListener("click", function() {
            toggle.classList.toggle("active");
            nav.classList.toggle("active");
            document.body.style.overflow = nav.classList.contains("active") ? "hidden" : "";
        });
        nav.querySelectorAll("a").forEach(function(link) {
            link.addEventListener("click", function() {
                toggle.classList.remove("active");
                nav.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
    }

    // ==================== STICKY HEADER ====================
    const header = document.getElementById("header");
    if (header) {
        let lastScroll = 0;
        window.addEventListener("scroll", function() {
            const y = window.scrollY;
            header.classList.toggle("scrolled", y > 60);
            lastScroll = y;
        }, { passive: true });
    }

    // ==================== FAQ ACCORDION ====================
    document.querySelectorAll(".faq-q").forEach(function(btn) {
        btn.addEventListener("click", function() {
            const item = this.closest(".faq-item");
            const wasActive = item.classList.contains("active");
            const list = item.closest(".faq-list");
            if (list) {
                list.querySelectorAll(".faq-item").forEach(function(i) {
                    i.classList.remove("active");
                });
            }
            if (!wasActive) item.classList.add("active");
        });
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
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

    // ==================== CONTACT FORM ====================
    const form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const btn = form.querySelector("button[type=submit]");
            const origText = btn.textContent;
            btn.textContent = "Message Sent!";
            btn.style.background = "linear-gradient(135deg, var(--charcoal), var(--navy))";
            btn.style.color = "var(--gold)";
            setTimeout(function() {
                btn.textContent = origText;
                btn.style.background = "";
                btn.style.color = "";
                form.reset();
            }, 3500);
        });
    }

    // ==================== SCROLL ANIMATIONS ====================
    // Tag elements for animation
    var animTargets = [
        ".card", ".blog-card", ".service-card", ".stat-item",
        ".result-card", ".state-item", ".faq-item", ".sidebar-card",
        ".section-header", ".content-main > *", ".guide-content > *",
        ".blog-article > *", ".contact-grid > div", ".contact-detail",
        ".cta-inner", ".glossary-term", ".hero-content"
    ];

    var els = [];
    animTargets.forEach(function(sel) {
        document.querySelectorAll(sel).forEach(function(el) {
            if (!el.classList.contains("fade-up")) {
                el.classList.add("fade-up");
                els.push(el);
            }
        });
    });

    if ("IntersectionObserver" in window && els.length > 0) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // Stagger cards within grids
                    var el = entry.target;
                    var parent = el.parentElement;
                    var siblings = parent ? Array.from(parent.children).filter(function(c) {
                        return c.classList.contains("fade-up");
                    }) : [];
                    var idx = siblings.indexOf(el);
                    var delay = idx >= 0 ? idx * 80 : 0;
                    if (delay > 400) delay = 400; // cap

                    setTimeout(function() {
                        el.classList.add("visible");
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px"
        });

        els.forEach(function(el) { observer.observe(el); });
    } else {
        // Fallback: show everything immediately
        els.forEach(function(el) { el.classList.add("visible"); });
    }

    // ==================== COUNTER ANIMATION ====================
    var statNumbers = document.querySelectorAll(".stat-number");
    if (statNumbers.length > 0 && "IntersectionObserver" in window) {
        var counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function(el) { counterObserver.observe(el); });
    }

    function animateCounter(el) {
        var text = el.textContent.trim();
        var suffix = "";
        var num = 0;

        // Parse "20+", "500+", "4", "50", etc.
        var match = text.match(/^([\d,]+)(\+?)$/);
        if (!match) return;

        num = parseInt(match[1].replace(/,/g, ""), 10);
        suffix = match[2] || "";
        if (isNaN(num) || num === 0) return;

        var duration = 1800;
        var startTime = null;

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var easedProgress = easeOutExpo(progress);
            var current = Math.floor(easedProgress * num);
            el.textContent = current.toLocaleString() + suffix;
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                el.textContent = num.toLocaleString() + suffix;
            }
        }

        el.textContent = "0" + suffix;
        requestAnimationFrame(step);
    }

    // ==================== HERO PARALLAX ====================
    var hero = document.querySelector(".hero");
    if (hero && window.innerWidth > 768) {
        window.addEventListener("scroll", function() {
            var y = window.scrollY;
            if (y < hero.offsetHeight + 200) {
                hero.style.backgroundPositionY = (y * 0.3) + "px";
            }
        }, { passive: true });
    }

});
