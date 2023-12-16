const transition = {
  init: function (elements?: Array<HTMLElement> | NodeListOf<Element>) {
    const observerObj: IntersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).style.animationPlayState = "running";
          }
        }
      },
      { rootMargin: "-30px" }
    );
    let elemsToObserve: Array<Element> | null = null;
    if (elements === undefined) {
      const elems: NodeListOf<Element> = document.querySelectorAll(
        ".trans-on-viewport-entry"
      );
      elemsToObserve = Array.from(elems);
    } else {
      elemsToObserve = Array.from(elements);
    }
    for (const elem of elemsToObserve) {
      observerObj.observe(elem);
    }
  },
};

export { transition };
