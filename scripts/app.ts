import { navbar } from "./navbar";
import { scrollDownToButton } from "./scrollDownToButton";

window.addEventListener("load", () => {
  const navbars: NodeListOf<Element> = document.querySelectorAll("nav.nav");
  for (const navbarElem of navbars) {
    navbar.init(navbarElem);
  }

  scrollDownToButton.init();
});
