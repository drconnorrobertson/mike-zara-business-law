// ============================================================
// ZARA BUSINESS LAW — Premium Interactive JS
// Scroll animations, counter animations, glassmorphism header
// ============================================================

document.addEventListener("DOMContentLoaded", function() {

    // ==================== MOBILE NAV ====================
    var toggle = document.getElementById("mobileToggle");
    var nav = document.getElementById("mainNav");
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
    var header = document.getElementById("header");
    if (header) {
        window.addEventListener("scroll", function() {
            header.classList.toggle("scrolled", window.scrollY > 60);
        }, { passive: true });
    }

    // ==================== FAQ ACCORDION ====================
    document.querySelectorAll(".faq-q").forEach(function(btn) {
        btn.addEventListener("click", function() {
            var item = this.closest(".faq-item");
            var wasActive = item.classList.contains("active");
            var list = item.closest(".faq-list");
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
            var id = this.getAttribute("href");
            if (id.length > 1) {
                var target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });
    });

    // ==================== CONTACT FORM ====================
    var form = document.getElementById("contactForm");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            var btn = form.querySelector("button[type=submit]");
            var origText = btn.textContent;
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
    // Only animate specific card-level and section-level elements.
    // Do NOT animate individual paragraphs/headings inside content areas
    // to avoid creating huge empty gaps.
    var animSelectors = [
        ".card",
        ".blog-card",
        ".service-card",
        ".result-card",
        ".faq-item",
        ".sidebar-card",
        ".section-header",
        ".cta-inner",
        ".contact-info-card",
        ".hero-content"
    ];

    var els = [];
    animSelectors.forEach(function(sel) {
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
                    var el = entry.target;
                    var parent = el.parentElement;
                    // Stagger siblings that share a grid parent
                    var siblings = parent ? Array.from(parent.children).filter(function(c) {
                        return c.classList.contains("fade-up");
                    }) : [];
                    var idx = siblings.indexOf(el);
                    var delay = (idx >= 0 && siblings.length > 1) ? idx * 100 : 0;
                    if (delay > 500) delay = 500;

                    setTimeout(function() {
                        el.classList.add("visible");
                    }, delay);

                    observer.unobserve(el);
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: "0px 0px -20px 0px"
        });

        els.forEach(function(el) { observer.observe(el); });
    } else {
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
        var match = text.match(/^([\d,]+)(\+?)$/);
        if (!match) return;

        var num = parseInt(match[1].replace(/,/g, ""), 10);
        var suffix = match[2] || "";
        if (isNaN(num) || num === 0) return;

        var duration = 1800;
        var startTime = null;

        function easeOutExpo(t) {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var current = Math.floor(easeOutExpo(progress) * num);
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
