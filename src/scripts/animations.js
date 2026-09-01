const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Add the class to trigger the CSS animation
        entry.target.classList.add("is-visible");

        // Stop observing so the animation only runs one time
        observer.unobserve(entry.target);
      }
    });
  },
  {
    // Trigger when 10% of the element is visible on screen
    threshold: 0.5,
  },
);

// Target all line wrappers
document.querySelectorAll('[data-animate="fade-in"]').forEach((wrapper) => {
  observer.observe(wrapper);
});
