
document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 1. DARK / LIGHT MODE TOGGLE
    // ==========================================

    const themeToggle = document.getElementById("themeToggle");
    const root = document.documentElement;

    function applyTheme(theme) {
        const isDark = theme === "dark";

        // Match the CSS selector: :root[data-theme="dark"]
        root.setAttribute("data-theme", isDark ? "dark" : "light");

        // Update the button text and accessibility label
        if (themeToggle) {
            themeToggle.textContent = isDark ? "Light" : "Dark";

            themeToggle.setAttribute(
                "aria-label",
                isDark ? "Switch to light theme" : "Switch to dark theme"
            );

            themeToggle.setAttribute("aria-pressed", String(isDark));
        }

        // Save the selected theme
        try {
            localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
        } catch (error) {
            // Theme switching still works if storage is unavailable.
        }
    }

    // Load the saved theme
    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("portfolio-theme") || "light";
    } catch (error) {
        // Use light mode if storage is unavailable.
    }

    applyTheme(savedTheme);

    // Toggle the theme when clicked
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = root.getAttribute("data-theme");
            applyTheme(currentTheme === "dark" ? "light" : "dark");
        });
    }



    // ==========================================
    // 2. MOBILE NAVIGATION MENU
    // ==========================================
    const menuButton = document.getElementById("menu");
    const navLinks = document.getElementById("navLinks");

    function closeMenu() {
        if (!menuButton || !navLinks) return;

        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open menu");
        menuButton.textContent = "Menu";
    }

    if (menuButton && navLinks) {
        menuButton.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuButton.setAttribute("aria-expanded", String(isOpen));
            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close menu" : "Open menu"
            );
            menuButton.textContent = isOpen ? "Close" : "Menu";
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", (event) => {
            if (
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });
    }


    // ==========================================
    // 3. SCROLL PROGRESS BAR
    // ==========================================
    const progress = document.getElementById("progress");

    function updateProgress() {
        if (!progress) return;

        const scrollableHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const percentage =
            scrollableHeight > 0
                ? (window.scrollY / scrollableHeight) * 100
                : 0;

        progress.style.width = `${percentage}%`;
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();



    /* ==========================================
       SCROLL REVEAL ANIMATIONS
    ========================================== */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("active");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px 0px 0px"
            }
        );

        revealElements.forEach((element, index) => {
            element.style.transitionDelay = `${(index % 4) * 100}ms`;
            revealObserver.observe(element);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        revealElements.forEach((element) => {
            element.classList.add("active");
        });
    }



    /* ==========================================
       HERO NAME - LETTER-BY-LETTER TYPING
    ========================================== */

    const heroName = document.getElementById("name");

    if (heroName) {
        const fullName = "Mohammed Altaf Sabri";
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            heroName.textContent = fullName;
            heroName.classList.add("name-animated", "typing-complete");
        } else {
            heroName.textContent = "";
            heroName.classList.add("typing-name");

            let index = 0;

            function typeNextLetter() {
                if (index < fullName.length) {
                    heroName.textContent += fullName.charAt(index);
                    index++;

                    setTimeout(typeNextLetter, 100);
                } else {
                    heroName.classList.add("typing-complete");
                    heroName.classList.remove("typing-name");
                }
            }

            // Short delay before typing begins
            setTimeout(typeNextLetter, 400);
        }
    }


    /* ==========================================
       ABOUT TEXT - WORD-BY-WORD ANIMATION
    ========================================== */

    const aboutText = document.getElementById("aboutText");

    if (aboutText) {
        const originalText = aboutText.textContent.trim();
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) {
            aboutText.textContent = originalText;
            aboutText.classList.add("text-visible");
        } else {
            const words = originalText.split(/\s+/);

            aboutText.replaceChildren();

            words.forEach((word, index) => {
                const span = document.createElement("span");

                span.className = "about-word";
                span.textContent = word;
                span.style.transitionDelay = `${index * 35}ms`;

                aboutText.appendChild(span);
                aboutText.appendChild(document.createTextNode(" "));
            });

            if ("IntersectionObserver" in window) {
                const aboutObserver = new IntersectionObserver(
                    (entries, observer) => {
                        entries.forEach((entry) => {
                            if (entry.isIntersecting) {
                                aboutText.classList.add("text-visible");
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    { threshold: 0.15 }
                );

                aboutObserver.observe(aboutText);
            } else {
                aboutText.classList.add("text-visible");
            }
        }
    }



    // ==========================================
    // 7. ACTIVE NAVIGATION LINK
    // ==========================================
    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const sectionLinks = document.querySelectorAll(
        '#navLinks a[href^="#"]'
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    sectionLinks.forEach((link) => {
                        const isCurrent =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isCurrent);

                        if (isCurrent) {
                            link.setAttribute("aria-current", "location");
                        } else {
                            link.removeAttribute("aria-current");
                        }
                    });
                });
            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );

        sections.forEach((section) => {
            sectionObserver.observe(section);
        });
    }



    /* ==========================================
       BUTTON HOVER EFFECT
    ========================================== */

    const magneticButtons = document.querySelectorAll(".magnetic");

    magneticButtons.forEach((button) => {
        button.addEventListener("pointermove", (event) => {
            // Avoid magnetic movement on touch devices
            if (event.pointerType === "touch") return;

            const rect = button.getBoundingClientRect();

            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;

            button.style.transform =
                `translate(${x * 0.10}px, ${y * 0.10}px)`;
        });

        button.addEventListener("pointerleave", () => {
            button.style.transform = "";
        });
    });


    // ==========================================
    // 9. CUSTOM CURSOR
    // ==========================================

    const cursorDot = document.getElementById("cursorDot");
    const cursorOutline = document.getElementById("cursorOutline");

    if (
        cursorDot &&
        cursorOutline &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
        document.body.classList.add("custom-cursor-active");

        let mouseX = 0;
        let mouseY = 0;

        document.addEventListener("mousemove", (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;

            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            cursorDot.style.opacity = "1";

            cursorOutline.style.left = `${mouseX}px`;
            cursorOutline.style.top = `${mouseY}px`;
            cursorOutline.style.opacity = "1";
        });

        document.addEventListener("mouseleave", () => {
            cursorDot.style.opacity = "0";
            cursorOutline.style.opacity = "0";
        });

        document.addEventListener("mouseenter", () => {
            cursorDot.style.opacity = "1";
            cursorOutline.style.opacity = "1";
        });

        document.querySelectorAll("a, button, .btn").forEach((element) => {
            element.addEventListener("mouseenter", () => {
                cursorOutline.classList.add("cursor-hover");
            });

            element.addEventListener("mouseleave", () => {
                cursorOutline.classList.remove("cursor-hover");
            });
        });
    }

    // ==========================================
    // 10. CONTACT FORM VALIDATION
    // No database or backend is used.
    // ==========================================
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const submitButton = document.getElementById("submitButton");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = contactForm.querySelector(
                '[name="name"]'
            );
            const emailInput = contactForm.querySelector(
                '[name="email"]'
            );
            const messageInput = contactForm.querySelector(
                '[name="message"]'
            );

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();

            if (!name || !email || !message) {
                showFormStatus(
                    "Please fill in all fields.",
                    false
                );
                return;
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showFormStatus(
                    "Please enter a valid email address.",
                    false
                );
                emailInput.focus();
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Opening email...";
            }

            // Open the visitor's default email application.
            // This does not save messages in a database.
            const recipient = "mohdaltafsabri@gmail.com";
            const subject = encodeURIComponent(
                `Portfolio contact from ${name}`
            );
            const bodyText = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
            );

            showFormStatus(
                "Opening your email application. Please send the email there.",
                true
            );

            window.location.href =
                `mailto:${recipient}?subject=${subject}&body=${bodyText}`;

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Send message";
            }
        });
    }

    function showFormStatus(message, success) {
        if (!formStatus) return;

        formStatus.textContent = message;
        formStatus.classList.toggle("success", success);
        formStatus.classList.toggle("error", !success);
    }


    // ==========================================
    // 11. SMOOTH SECTION NAVIGATION
    // ==========================================
    const smoothSectionLinks = document.querySelectorAll(
        '#navLinks a[href^="#"], a[href^="#"]'
    );

    smoothSectionLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const targetSection = document.querySelector(targetId);

            if (!targetSection) return;

            event.preventDefault();

            targetSection.scrollIntoView({
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth",
                block: "start"
            });

            // Close the mobile menu after selecting a section
            const nav = document.getElementById("navLinks");
            const menuButton = document.getElementById("menu");

            if (nav) nav.classList.remove("open");
            if (menuButton) menuButton.setAttribute("aria-expanded", "false");
        });
    });

});