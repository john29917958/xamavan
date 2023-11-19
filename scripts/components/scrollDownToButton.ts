const scrollDownToButton = {
  init(elements?: Array<HTMLElement> | NodeListOf<Element>) {
    let scrollDownToButtons: Array<Element> | null = null;
    if (elements === undefined) {
      let buttons: NodeListOf<Element> = document.querySelectorAll(
        ".btn-scroll-down-to"
      );
      scrollDownToButtons = Array.from(buttons);
    } else {
      scrollDownToButtons = Array.from(elements);
    }
    for (let button of scrollDownToButtons) {
      const target: string | null | undefined =
        button.getAttribute("data-target");
      if (target !== null && target !== undefined) {
        const targetElem: Element | null | undefined =
          document.querySelector(target);
        const top = targetElem?.getBoundingClientRect().top;
        button.addEventListener("click", () => {
          window.scrollTo({
            top: top,
            left: 0,
            behavior: "smooth",
          });
        });
      }
    }
  },
};

export { scrollDownToButton };
