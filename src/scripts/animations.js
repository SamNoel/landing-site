// wrap observer to listen for DOM loaded as an additional safety check
document.addEventListener("DOMContentLoaded", () => {
  /* this observes when a certain entry is scrolled into view at the specified threshold
    and then unobserves the event for that entry
    */
  const scrolledInViewObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the class to trigger the CSS animation
          entry.target.classList.add("is-visible");

          // Stop observing so the animation only runs one time
          scrolledInViewObserver.unobserve(entry.target);
        }
      });
    },
    {
      // Trigger when 10% of the element is visible on screen
      threshold: 0.5,
    },
  );

  // Target all line wrappers (line-wrappers need to specify data-animate property with a value of "fade-in")
  document.querySelectorAll('[data-animate="fade-in"]').forEach((wrapper) => {
    scrolledInViewObserver.observe(wrapper);
  });
});
