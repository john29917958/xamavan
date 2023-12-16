import { NetworkBackgroundAnimation } from "./animations/networkBackgroundAnimation";

const animations = {
  initNetworkBgAnimation(elems?: Array<HTMLElement> | NodeListOf<Element>) {
    const elemsToInit: Element[] = getElemsToInit(
      ".bg-animation-network",
      elems
    );
    const networkBackgroundAnimation: NetworkBackgroundAnimation =
      new NetworkBackgroundAnimation(elemsToInit);
    networkBackgroundAnimation.init();
  },
};

function getElemsToInit(
  defaultSelector: string,
  elems?: Array<HTMLElement> | NodeListOf<Element>
): Element[] {
  let elemsToInit: Array<Element> | null = null;
  if (elems === undefined) {
    const elems: NodeListOf<Element> =
      document.querySelectorAll(defaultSelector);
    elemsToInit = Array.from(elems);
  } else {
    elemsToInit = Array.from(elems);
  }
  return elemsToInit;
}

export { animations };
