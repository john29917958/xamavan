import { navbar } from "./navbar";
const navbars: NodeListOf<Element> = document.querySelectorAll("nav.nav");
for (const navbarElem of navbars) {
  navbar.init(navbarElem);
}
