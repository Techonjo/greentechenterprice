document.addEventListener("DOMContentLoaded", () => {
  const previewModal = document.getElementById("preview-modal");
  const closeModalBtn = document.getElementById("close-modal");
  

  // --- Modal and Toast Handlers ---
  document.querySelectorAll(".preview-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const bookTitle = e.target
        .closest(".book-item")
        .querySelector(".book-title").textContent;
      document.getElementById("modal-title").textContent =
        bookTitle + " Preview";
      previewModal.classList.add("is-visible");
    });
  });

  closeModalBtn.addEventListener("click", () => {
    previewModal.classList.remove("is-visible");
  });
  previewModal.addEventListener("click", (e) => {
    if (e.target === previewModal) {
      previewModal.classList.remove("is-visible");
    }
  });


  // --- Filter and Search Logic ---
  const searchInput = document.getElementById("searchInput");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const bookItems = document.querySelectorAll(".book-item");

  const filterAndSearch = () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const activeFilter =
      document.querySelector(".filter-btn.active").dataset.filter;

    bookItems.forEach((item) => {
      const title = item.querySelector(".book-title").textContent.toLowerCase();
      const description = item
        .querySelector(".book-desc")
        .textContent.toLowerCase();
      const category = item.dataset.category;

      const matchesSearch =
        title.includes(searchTerm) || description.includes(searchTerm);
      const matchesFilter = activeFilter === "all" || category === activeFilter;

      if (matchesSearch && matchesFilter) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
  };

  searchInput.addEventListener("input", filterAndSearch);
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      filterAndSearch();
    });
  });

  // --- Scroll Animation ---
  const observerOptions = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));

  // Initialize view with all books visible
  filterAndSearch();
});

/* --- Formspree Logic --- */
  const newsletterForm = document.querySelector(".newsletter-form");
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
  
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.style.display = "flex"; // show button
  } else {
    backToTop.style.display = "none"; // hide button
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});