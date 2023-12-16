const animations = {
  initNetworkBgAnimation(elems?: Array<HTMLElement> | NodeListOf<Element>) {
    const elemsToInit: Element[] = getElemsToInit(
      ".bg-animation-network",
      elems
    );
    for (const elem of elemsToInit) {
      const canvas: HTMLCanvasElement = getBgCanvas();
      initNetworkBgAnimation(canvas);
      elem.append(canvas);
    }
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

function getBgCanvas(): HTMLCanvasElement {
  const canvas: HTMLCanvasElement = document.createElement("canvas");
  canvas.style.position = "absolute";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.zIndex = "-1";
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  canvas.classList.add("trans-entrance-fade-in", "trans-d-1500");
  return canvas;
}

function initNetworkBgAnimation(canvas: HTMLCanvasElement) {
  let ctx: CanvasRenderingContext2D = canvas.getContext(
    "2d"
  ) as CanvasRenderingContext2D;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  interface Star {
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
  }
  interface Point {
    x: number;
    y: number;
  }
  let stars: Star[] = [], // Array that contains the stars
    FPS = 60, // Frames per second
    x = getNumOfStars(), // Number of stars
    mouse = {
      x: 0,
      y: 0,
    }; // mouse location

  // Push stars to array
  for (var i = 0; i < x; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1 + 4.5,
      vx: Math.floor(Math.random() * 50) - 25,
      vy: Math.floor(Math.random() * 50) - 25,
    });
  }

  window.addEventListener("resize", resize);
  function getNumOfStars() {
    const numOfStars = window.innerWidth <= 576 ? 47 : 100;
    return numOfStars;
  }
  function resize() {
    x = getNumOfStars();
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  // Draw the scene
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.globalCompositeOperation = "lighter";

    for (var i = 0, x = stars.length; i < x; i++) {
      var s = stars[i];

      ctx.fillStyle = "rgb(242,242,242)";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      ctx.fill();
      // ctx.fillStyle = "#fafafa";
      // ctx.stroke();
    }

    ctx.beginPath();
    for (var i = 0, x = stars.length; i < x; i++) {
      var starI = stars[i];
      ctx.moveTo(starI.x, starI.y);
      if (distance(mouse, starI) < 150) ctx.lineTo(mouse.x, mouse.y);
      for (var j = 0, x = stars.length; j < x; j++) {
        var starII = stars[j];
        if (distance(starI, starII) < 150) {
          ctx.lineTo(starII.x, starII.y);
        }
      }
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(247,247,247)";
    ctx.stroke();
  }

  function distance(point1: Point, point2: Point) {
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  }

  // Update star locations
  function update() {
    for (var i = 0, x = stars.length; i < x; i++) {
      var s = stars[i];

      s.x += s.vx / FPS;
      s.y += s.vy / FPS;

      if (s.x < 0 || s.x > canvas.width) s.vx = -s.vx;
      if (s.y < 0 || s.y > canvas.height) s.vy = -s.vy;
    }
  }

  canvas.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Update and draw
  function tick() {
    draw();
    update();
    requestAnimationFrame(tick);
  }

  tick();
}

export { animations };
