document.addEventListener("DOMContentLoaded", () => {
  /* --- Splash Screen Logic --- */
  const splash = document.getElementById("splash");
  const progressBar = document.getElementById("progressBar");
  const skipSplashBtn = document.getElementById("skipSplash");

  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    if (progressBar) {
      progressBar.style.width = progress + "%";
    }
    if (progress >= 100) {
      clearInterval(interval);
      if (splash) {
        setTimeout(() => {
          splash.style.opacity = "0";
          setTimeout(() => (splash.style.display = "none"), 500);
        }, 500);
      }
    }
  }, 200);

  if (skipSplashBtn) {
    skipSplashBtn.addEventListener("click", () => {
      clearInterval(interval);
      if (splash) {
        splash.style.opacity = "0";
        setTimeout(() => (splash.style.display = "none"), 500);
      }
    });
  }

  /* --- Header & Navigation Logic --- */
  const header = document.getElementById("header");
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("nav");
  const navLinks = nav ? nav.querySelectorAll("a") : [];

  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (hamburger && nav) {
        hamburger.classList.remove("active");
        nav.classList.remove("active");
      }
    });
  });

  /* --- Theme Toggle Logic --- */
  const themeToggleBtn = document.getElementById("theme-toggle");
  const body = document.body;

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.add(savedTheme);
    updateThemeToggleIcon(savedTheme);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    body.classList.add("dark-theme");
    updateThemeToggleIcon("dark-theme");
  } else {
    updateThemeToggleIcon("light-theme");
  }

  function updateThemeToggleIcon(theme) {
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML =
        theme === "dark-theme"
          ? '<i class="fas fa-sun"></i>'
          : '<i class="fas fa-moon"></i>';
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      if (body.classList.contains("dark-theme")) {
        body.classList.remove("dark-theme");
        localStorage.setItem("theme", "light-theme");
        updateThemeToggleIcon("light-theme");
      } else {
        body.classList.add("dark-theme");
        localStorage.setItem("theme", "dark-theme");
        updateThemeToggleIcon("dark-theme");
      }
    });
  }

  /* --- Scroll Animation Logic --- */
  const revealElements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  revealElements.forEach((el) => {
    observer.observe(el);
  });

  /* --- Project Filter Logic --- */
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filterValue = btn.getAttribute("data-filter");

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filterValue === "all" || category === filterValue) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  /* --- Formspree Logic --- */
  const newsletterForm = document.querySelector(".newsletter-form");
  const contactForm = document.querySelector(".contact-form form");
  const toast = document.getElementById("toast");

  function showToast(message) {
    if (toast) {
      toast.querySelector("span:last-child").textContent = message;
      toast.classList.add("active");
      setTimeout(() => {
        toast.classList.remove("active");
      }, 3000);
    }
  }

  // ✅ Newsletter form with JSON (AJAX)
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(newsletterForm);
      const data = Object.fromEntries(formData.entries()); // convert to JSON

      try {
        const response = await fetch("https://formspree.io/f/mwpngjkg", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        if (response.ok) {
          showToast("Thank you for subscribing!");
          newsletterForm.reset();
        } else {
          const errorData = await response.json();
          console.error("Newsletter error:", errorData);
          showToast("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Network error:", error);
        showToast("Network error. Please try later.");
      }
    });
  }

  // ✅ Contact form (still works with Formspree)
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(contactForm);

      try {
        const response = await fetch("https://formspree.io/f/mgvlgqgd", {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          showToast("Your message has been sent!");
          contactForm.reset();
        } else {
          const errorData = await response.json();
          console.error("Contact form error:", errorData);
          showToast("Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Network error:", error);
        showToast("Network error. Please try later.");
      }
    });
  }
});

// Back to Top Button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex"; // show button
  } else {
    backToTop.style.display = "none"; // hide button
  }
});

function goToBookPage() {
  window.location.href = "books.html";
}

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
