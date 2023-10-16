const navbar = {
  init: function (navbar: Element): void {
    const navToggler = navbar.querySelector(".nav-toggler");
    navToggler?.addEventListener("click", () => {
      const isToggled = navbar.classList.contains("toggled");
      if (isToggled) {
        navbar.classList.remove("toggled");
      } else {
        navbar.classList.add("toggled");
      }
    });
    const navCover = document.createElement("div");
    navCover.classList.add("nav-cover");
    navCover.addEventListener("click", () => {
      navbar.classList.remove("toggled");
    });
    navbar.appendChild(navCover);
  },
};

export { navbar };
