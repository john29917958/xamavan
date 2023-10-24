window.addEventListener("load", () => {
  const toNextButton: Element | null = document.querySelector(
    "#banner .btn-to-next-sect"
  );
  const actionSection: HTMLElement | null =
    document.getElementById("action-section");
  const actionSectionTop = actionSection?.getBoundingClientRect().top;
  toNextButton?.addEventListener("click", () => {
    window.scrollTo({
      top: actionSectionTop,
      left: 0,
      behavior: "smooth",
    });
  });
});
