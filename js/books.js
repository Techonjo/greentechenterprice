document.addEventListener("DOMContentLoaded", () => {
  const previewModal = document.getElementById("preview-modal");
  const closeModalBtn = document.getElementById("close-modal");
  const buyToast = document.getElementById("buy-toast");

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

  document.querySelectorAll(".buy-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      buyToast.classList.add("is-visible");
      setTimeout(() => {
        buyToast.classList.remove("is-visible");
      }, 3000);
    });
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
