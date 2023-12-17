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

const mouse = {
  x: 0,
  y: 0,
}; // mouse location

class NetworkBackgroundAnimation {
  private options: Options;

  constructor(private elems: Element[]) {
    this.options = new Options();
  }

  public init(): void {
    for (const elem of this.elems) {
      const canvas: HTMLCanvasElement = this.getBgCanvas();
      this.setParentElemPositionForCanvasToAlignWith(elem as HTMLElement);
      const animator: Animator = new Animator(elem, canvas, this.options);
      animator.init();
      elem.append(canvas);
    }
  }

  private getBgCanvas(): HTMLCanvasElement {
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

  private setParentElemPositionForCanvasToAlignWith(elem: HTMLElement): void {
    if (elem.style.position.length === 0) {
      elem.style.position = "relative";
    }
  }
}

class Animator {
  private ctx: CanvasRenderingContext2D | null;
  private stars: Star[]; // Array that contains the stars

  constructor(
    private elem: Element,
    private canvas: HTMLCanvasElement,
    private options: Options
  ) {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.stars = [];
  }

  public init() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    // Push stars to array
    for (var i = 0; i < this.options.numOfStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1 + 4.5,
        vx: Math.floor(Math.random() * 50) - 25,
        vy: Math.floor(Math.random() * 50) - 25,
      });
    }

    window.addEventListener(
      "resize",
      this.updateCanvasOnResize.bind(this, this.canvas)
    );
    this.canvas.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    this.tick();
  }

  private updateCanvasOnResize(canvas: HTMLCanvasElement) {
    this.options.numOfStars = getNumOfStars();
    this.options.lineWidth = getLineWidth();
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  // Update star locations
  private update() {
    for (var i = 0, x = this.stars.length; i < x; i++) {
      const s = this.stars[i];
      s.x += s.vx / this.options.fps;
      s.y += s.vy / this.options.fps;
      if (s.x < 0 || s.x > this.canvas.width) {
        s.vx = -s.vx;
      }
      if (s.y < 0 || s.y > this.canvas.height) {
        s.vy = -s.vy;
      }
    }
  }

  // Draw the scene
  private draw(): void {
    this.ctx!.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //ctx.globalCompositeOperation = "lighter";

    for (var i = 0, x = this.stars.length; i < x; i++) {
      var s = this.stars[i];
      this.ctx!.fillStyle = "rgba(0, 0, 0, 0.025)";
      this.ctx!.beginPath();
      this.ctx!.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      this.ctx!.fill();
      // ctx.fillStyle = "#fafafa";
      // ctx.stroke();
    }

    this.ctx!.beginPath();
    for (let i = 0, x = this.stars.length; i < x; i++) {
      const starI = this.stars[i];
      this.ctx!.moveTo(starI.x, starI.y);
      if (this.distance(mouse, starI) < 150) this.ctx!.lineTo(mouse.x, mouse.y);
      for (let j = 0, x = this.stars.length; j < x; j++) {
        var starII = this.stars[j];
        if (this.distance(starI, starII) < 150) {
          this.ctx!.lineTo(starII.x, starII.y);
        }
      }
    }
    this.ctx!.lineWidth = this.options.lineWidth;
    this.ctx!.strokeStyle = "rgba(0, 0, 0, 0.025)";
    this.ctx!.stroke();
  }

  private distance(point1: Point, point2: Point) {
    var xs = 0;
    var ys = 0;

    xs = point2.x - point1.x;
    xs = xs * xs;

    ys = point2.y - point1.y;
    ys = ys * ys;

    return Math.sqrt(xs + ys);
  }

  private tick(): void {
    this.draw();
    this.update();
    requestAnimationFrame(this.tick.bind(this));
  }
}

class Options {
  public fps: number; // Frames per second
  public numOfStars: number; // Number of stars
  public lineWidth: number;

  public constructor() {
    this.fps = 60;
    this.numOfStars = getNumOfStars();
    this.lineWidth = getLineWidth();
  }
}

function getNumOfStars(): number {
  const numOfStars = window.innerWidth <= 576 ? 47 : 100;
  return numOfStars;
}

function getLineWidth(): number {
  const lineWidth = window.innerWidth <= 576 ? 0.75 : 1.2;
  return lineWidth;
}

export { NetworkBackgroundAnimation };
