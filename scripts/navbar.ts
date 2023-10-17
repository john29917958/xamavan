const navbar = {
  init: function (navbar: Element): void {
    initToggleFeature(navbar);
    initDropdowns(navbar);
  },
};

function initToggleFeature(navbar: Element) {
  const navToggler = navbar.querySelector(".nav-toggler");
  navToggler?.addEventListener("click", () => {
    toggleElem(navbar);
  });
  const navCover = document.createElement("div");
  navCover.classList.add("nav-cover");
  navCover.addEventListener("click", () => {
    navbar.classList.remove("toggled");
  });
  navbar.appendChild(navCover);
}

function initDropdowns(navbar: Element) {
  const dropdownItems: NodeListOf<Element> =
    navbar.querySelectorAll("li.dropdown");
  for (const dropdownItem of dropdownItems) {
    dropdownItem.addEventListener("click", function (e) {
      toggleElem(dropdownItem);
      const menu: HTMLElement = dropdownItem.querySelector(
        ".dropdown-menu"
      ) as HTMLElement;
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
      function handleClickOutsideDropdown() {
        toggleElem(dropdownItem);
        window.removeEventListener("click", handleClickOutsideDropdown);
      }
      window.addEventListener("click", handleClickOutsideDropdown);
    });
  }
}

function toggleElem(elem: Element) {
  const isToggled = elem.classList.contains("toggled");
  if (isToggled) {
    elem.classList.remove("toggled");
  } else {
    elem.classList.add("toggled");
  }
}

export { navbar };
