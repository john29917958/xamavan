import { navbar } from "./navbar";
import { scrollDownToButton } from "./scrollDownToButton";
import { transition } from "./transition";

window.addEventListener("load", () => {
  const navbars: NodeListOf<Element> = document.querySelectorAll("nav.nav");
  for (const navbarElem of navbars) {
    navbar.init(navbarElem);
  }
  scrollDownToButton.init();
  transition.init();
});
