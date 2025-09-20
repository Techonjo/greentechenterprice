// Theme Toggle
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
  if (document.body.classList.contains("dark-theme")) {
    themeIcon.className = "fas fa-moon";
  } else {
    themeIcon.className = "fas fa-sun";
  }
});

// Splash Screen
const splash = document.getElementById("splash");
const progressBar = document.getElementById("progressBar");
const skipSplash = document.getElementById("skipSplash");

function startLoading() {
  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    progressBar.style.width = progress + "%";
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        splash.style.opacity = "0";
        setTimeout(() => (splash.style.display = "none"), 500);
      }, 300);
    }
  }, 20);
}

skipSplash.addEventListener("click", () => {
  splash.style.opacity = "0";
  setTimeout(() => (splash.style.display = "none"), 500);
});

// Header Scroll Effect & Mobile Nav
const header = document.getElementById("header");
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Smooth Scroll for Nav Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
    // Close mobile nav after clicking a link
    nav.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Project Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

function filterProjects(filter) {
  projectCards.forEach((card) => {
    const category = card.dataset.category;

    if (filter === "all" || category === filter) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Add event listeners to filter buttons
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to the clicked button
    button.classList.add("active");

    const filter = button.dataset.filter;
    filterProjects(filter);
  });
});

// Animate on Scroll
const revealElements = document.querySelectorAll(".reveal");

const options = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
      observer.unobserve(entry.target);
    }
  });
}, options);

revealElements.forEach((element) => {
  observer.observe(element);
});

// Initial load logic
window.addEventListener("DOMContentLoaded", () => {
  startLoading();

  // Find the "All" filter button and click it to initialize the project display
  const allButton = document.querySelector('.filter-btn[data-filter="all"]');
  if (allButton) {
    allButton.click();
  }
});
