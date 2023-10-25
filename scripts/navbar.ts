const navbar = {
  init: function (navbar: Element): void {
    initToggleFeature(navbar);
    initDropdowns(navbar);
  },
};

function initToggleFeature(navbar: Element) {
  const navToggler = navbar.querySelector(".nav-toggler");
  navToggler?.addEventListener("click", () => {
    toggle(navbar);
  });
  const navCover = document.createElement("div");
  navCover.classList.add("nav-cover");
  navCover.addEventListener("click", () => {
    navbar.classList.remove("toggled");
  });
  navbar.appendChild(navCover);
}

function initDropdowns(navbar: Element) {
  const dropdowns: NodeListOf<Element> = navbar.querySelectorAll("li.dropdown");
  for (const dropdown of dropdowns) {
    const menu: HTMLElement = dropdown.querySelector(
      ".dropdown-menu"
    ) as HTMLElement;
    dropdown.addEventListener("click", function (e) {
      toggle(dropdown);
      const elemBounds: DOMRect = menu.getBoundingClientRect();
      const elemBottom: number = elemBounds.bottom;
      const windowBottom: number = window.innerHeight;
      if (elemBottom > windowBottom) {
        menu.style.height =
          (elemBounds.height - (elemBottom - windowBottom)).toString() + "px";
      } else {
        menu.style.height = "auto";
      }
      e.stopPropagation();
      window.addEventListener("click", handleClickOutsideDropdown);

      function handleClickOutsideDropdown() {
        toggle(dropdown);
        window.removeEventListener("click", handleClickOutsideDropdown);
      }
    });
  }
}

function toggle(elem: Element) {
  const isElemToggled = elem.classList.contains("toggled");
  if (isElemToggled) {
    elem.classList.remove("toggled");
  } else {
    elem.classList.add("toggled");
  }
}

export { navbar };
