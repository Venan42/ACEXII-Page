function closeMenu() {
  const menuToggle = document.getElementById("close-menu");
  if (menuToggle) {
    menuToggle.checked = false;
  }
}

document.querySelectorAll(".menu a, .menu summary, .menu li, .menu details").forEach((element) => {
  element.addEventListener("click", () => {
    setTimeout(closeMenu, 0);
  });
});

const pdfjsLib = window.pdfjsLib;

if (pdfjsLib) {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  document.querySelectorAll(".game-card").forEach(async (card) => {
    const link = card.querySelector(".pdf-link");
    if (!link) return;

    const canvas = document.createElement("canvas");
    canvas.classList.add("pdf-thumbnail");
    card.insertBefore(canvas, card.firstChild);

    try {
      const pdf = await pdfjsLib.getDocument(link.href).promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.2 });

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      await page.render({
        canvasContext: canvas.getContext("2d"),
        viewport,
      }).promise;
    } catch {
      canvas.remove();
    }
  });
}