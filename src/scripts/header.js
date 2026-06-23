let lastScrollTop = 0;

const header = document.querySelector(".header");
const mobileNav = document.querySelector(".mobile-nav");
const burger = document.querySelector(".hamburger");
const burgerTop = document.querySelector(".hamburger-top");
const burgerMiddle = document.querySelector(".hamburger-middle");
const burgerBottom = document.querySelector(".hamburger-bottom");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const delta = scrollTop - lastScrollTop; // + = down, - = up

  // Only react to intentional scrolls (ignore tiny jitter from taps)
  if (Math.abs(delta) < 5) {
    lastScrollTop = Math.max(scrollTop, 0);
    return;
  }

  const scrollingDown = delta > 0;

  if (scrollingDown) {
    header?.classList.add("nav-up");

    // Close menu if open
    header?.classList.remove("menu-open");
    mobileNav?.classList.remove("menu-open");
    // Accessibility state
    burger?.setAttribute("aria-expanded", "false");
    burgerTop?.classList.remove("open");
    burgerMiddle?.classList.remove("open");
    burgerBottom?.classList.remove("open");
  } else {
    // Bring header back into view
    header?.classList.remove("nav-up");
  }

  lastScrollTop = Math.max(scrollTop, 0);
});

burger?.addEventListener("click", () => {
  // Toggle mobile menu
  const isOpen = mobileNav?.classList.toggle("menu-open");

  if (isOpen) {
    burgerTop?.classList.add("open");
    burgerMiddle?.classList.add("open");
    burgerBottom?.classList.add("open");
  } else {
    burgerTop?.classList.remove("open");
    burgerMiddle?.classList.remove("open");
    burgerBottom?.classList.remove("open");
  }

  // Accessibility state
  burger?.setAttribute("aria-expanded", String(isOpen));
});
