// ============================================================
// ZARA BUSINESS LAW — Premium Interactive JS
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
    var animSelectors = [
        ".card",
        ".blog-card",
        ".service-card",
        ".result-card",
        ".faq-item",
        ".sidebar-card",
        ".section-header",
        ".cta-inner",
        ".contact-info-card"
    ];

    var fadeEls = [];
    animSelectors.forEach(function(sel) {
        document.querySelectorAll(sel).forEach(function(el) {
            el.classList.add("fade-up");
            fadeEls.push(el);
        });
    });

    function checkFadeUps() {
        var wh = window.innerHeight;
        for (var i = fadeEls.length - 1; i >= 0; i--) {
            var el = fadeEls[i];
            var rect = el.getBoundingClientRect();
            if (rect.top < wh - 30 || rect.bottom < 0) {
                // Stagger siblings
                var parent = el.parentElement;
                var siblings = parent ? Array.from(parent.children).filter(function(c) {
                    return c.classList.contains("fade-up") && !c.classList.contains("visible");
                }) : [];
                var idx = siblings.indexOf(el);
                var delay = (idx > 0) ? idx * 80 : 0;
                if (delay > 400) delay = 400;

                (function(element, d) {
                    setTimeout(function() {
                        element.classList.add("visible");
                    }, d);
                })(el, delay);

                fadeEls.splice(i, 1);
            }
        }
        if (fadeEls.length === 0) {
            window.removeEventListener("scroll", onScroll);
        }
    }

    function onScroll() {
        requestAnimationFrame(checkFadeUps);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // Initial check for above-fold elements
    // Also run a periodic check as fallback for programmatic scrolling
    var fallbackTimer = setInterval(function() {
        checkFadeUps();
        checkCounters();
        if (fadeEls.length === 0) clearInterval(fallbackTimer);
    }, 200);
    checkFadeUps();

    // ==================== COUNTER ANIMATION ====================
    var statNumbers = document.querySelectorAll(".stat-number");
    var statAnimated = [];
    statNumbers.forEach(function(el) { statAnimated.push(false); });

    function checkCounters() {
        var wh = window.innerHeight;
        statNumbers.forEach(function(el, i) {
            if (statAnimated[i]) return;
            var rect = el.getBoundingClientRect();
            if (rect.top < wh - 50 && rect.bottom > 0) {
                statAnimated[i] = true;
                animateCounter(el);
            }
        });
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

    window.addEventListener("scroll", function() {
        requestAnimationFrame(checkCounters);
    }, { passive: true });
    checkCounters();

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
