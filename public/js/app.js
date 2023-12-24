/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./scripts/animations.ts":
/*!*******************************!*\
  !*** ./scripts/animations.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   animations: () => (/* binding */ animations)
/* harmony export */ });
/* harmony import */ var _animations_networkBackgroundAnimation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animations/networkBackgroundAnimation */ "./scripts/animations/networkBackgroundAnimation.ts");

const animations = {
    initNetworkBgAnimation(elems) {
        const elemsToInit = getElemsToInit(".bg-animation-network", elems);
        const networkBackgroundAnimation = new _animations_networkBackgroundAnimation__WEBPACK_IMPORTED_MODULE_0__.NetworkBackgroundAnimation(elemsToInit);
        networkBackgroundAnimation.init();
    },
};
function getElemsToInit(defaultSelector, elems) {
    let elemsToInit = null;
    if (elems === undefined) {
        const elems = document.querySelectorAll(defaultSelector);
        elemsToInit = Array.from(elems);
    }
    else {
        elemsToInit = Array.from(elems);
    }
    return elemsToInit;
}



/***/ }),

/***/ "./scripts/animations/networkBackgroundAnimation.ts":
/*!**********************************************************!*\
  !*** ./scripts/animations/networkBackgroundAnimation.ts ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NetworkBackgroundAnimation: () => (/* binding */ NetworkBackgroundAnimation)
/* harmony export */ });
const mouse = {
    x: 0,
    y: 0,
}; // mouse location
class NetworkBackgroundAnimation {
    constructor(elems) {
        this.elems = elems;
        this.options = new Options();
    }
    init() {
        for (const elem of this.elems) {
            const canvas = this.getBgCanvas();
            this.setParentElemPositionForCanvasToAlignWith(elem);
            const animator = new Animator(elem, canvas, this.options);
            animator.init();
            elem.append(canvas);
        }
    }
    getBgCanvas() {
        const canvas = document.createElement("canvas");
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
    setParentElemPositionForCanvasToAlignWith(elem) {
        if (elem.style.position.length === 0) {
            elem.style.position = "relative";
        }
    }
}
class Animator {
    constructor(elem, canvas, options) {
        this.elem = elem;
        this.canvas = canvas;
        this.options = options;
        this.ctx = canvas.getContext("2d");
        this.stars = [];
    }
    init() {
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
        window.addEventListener("resize", this.updateCanvasOnResize.bind(this, this.canvas));
        this.canvas.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
        this.tick();
    }
    updateCanvasOnResize(canvas) {
        this.options.numOfStars = getNumOfStars();
        this.options.lineWidth = getLineWidth();
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    // Update star locations
    update() {
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
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //ctx.globalCompositeOperation = "lighter";
        for (var i = 0, x = this.stars.length; i < x; i++) {
            var s = this.stars[i];
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.025)";
            this.ctx.beginPath();
            this.ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
            this.ctx.fill();
            // ctx.fillStyle = "#fafafa";
            // ctx.stroke();
        }
        this.ctx.beginPath();
        for (let i = 0, x = this.stars.length; i < x; i++) {
            const starI = this.stars[i];
            this.ctx.moveTo(starI.x, starI.y);
            if (this.distance(mouse, starI) < 150)
                this.ctx.lineTo(mouse.x, mouse.y);
            for (let j = 0, x = this.stars.length; j < x; j++) {
                var starII = this.stars[j];
                if (this.distance(starI, starII) < 150) {
                    this.ctx.lineTo(starII.x, starII.y);
                }
            }
        }
        this.ctx.lineWidth = this.options.lineWidth;
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.025)";
        this.ctx.stroke();
    }
    distance(point1, point2) {
        var xs = 0;
        var ys = 0;
        xs = point2.x - point1.x;
        xs = xs * xs;
        ys = point2.y - point1.y;
        ys = ys * ys;
        return Math.sqrt(xs + ys);
    }
    tick() {
        this.draw();
        this.update();
        requestAnimationFrame(this.tick.bind(this));
    }
}
class Options {
    constructor() {
        this.fps = 60;
        this.numOfStars = getNumOfStars();
        this.lineWidth = getLineWidth();
    }
}
function getNumOfStars() {
    const numOfStars = window.innerWidth <= 576 ? 47 : 100;
    return numOfStars;
}
function getLineWidth() {
    const lineWidth = window.innerWidth <= 576 ? 0.75 : 1.2;
    return lineWidth;
}



/***/ }),

/***/ "./scripts/navbar.ts":
/*!***************************!*\
  !*** ./scripts/navbar.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   navbar: () => (/* binding */ navbar)
/* harmony export */ });
const navbar = {
    init: function (navbar) {
        initToggleFeature(navbar);
        initDropdowns(navbar);
    },
};
function initToggleFeature(navbar) {
    const navToggler = navbar.querySelector(".nav-toggler");
    navToggler === null || navToggler === void 0 ? void 0 : navToggler.addEventListener("click", () => {
        toggle(navbar);
    });
    const navCover = document.createElement("div");
    navCover.classList.add("nav-cover");
    navCover.addEventListener("click", () => {
        navbar.classList.remove("toggled");
    });
    navbar.appendChild(navCover);
}
function initDropdowns(navbar) {
    const dropdowns = navbar.querySelectorAll("li.dropdown");
    for (const dropdown of dropdowns) {
        const menu = dropdown.querySelector(".dropdown-menu");
        dropdown.addEventListener("click", function (e) {
            toggle(dropdown);
            const elemBounds = menu.getBoundingClientRect();
            const elemBottom = elemBounds.bottom;
            const windowBottom = window.innerHeight;
            if (elemBottom > windowBottom) {
                menu.style.height =
                    (elemBounds.height - (elemBottom - windowBottom)).toString() + "px";
            }
            else {
                menu.style.height = "auto";
            }
            e.stopPropagation();
            window.addEventListener("click", handleClickOutsideDropdown);
            function handleClickOutsideDropdown() {
                toggle(dropdown);
                window.removeEventListener("click", handleClickOutsideDropdown);
            }
        });
    }
}
function toggle(elem) {
    const isElemToggled = elem.classList.contains("toggled");
    if (isElemToggled) {
        elem.classList.remove("toggled");
    }
    else {
        elem.classList.add("toggled");
    }
}



/***/ }),

/***/ "./scripts/scrollDownToButton.ts":
/*!***************************************!*\
  !*** ./scripts/scrollDownToButton.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   scrollDownToButton: () => (/* binding */ scrollDownToButton)
/* harmony export */ });
const scrollDownToButton = {
    init(elements) {
        let scrollDownToButtons = null;
        if (elements === undefined) {
            let buttons = document.querySelectorAll(".btn-scroll-down-to");
            scrollDownToButtons = Array.from(buttons);
        }
        else {
            scrollDownToButtons = Array.from(elements);
        }
        for (let button of scrollDownToButtons) {
            const target = button.getAttribute("data-target");
            if (target !== null && target !== undefined) {
                const targetElem = document.querySelector(target);
                button.addEventListener("click", () => {
                    window.scrollTo({
                        top: targetElem.offsetTop -
                            5 *
                                parseFloat(getComputedStyle(document.documentElement).fontSize),
                        left: 0,
                        behavior: "smooth",
                    });
                });
            }
        }
    },
};



/***/ }),

/***/ "./scripts/transition.ts":
/*!*******************************!*\
  !*** ./scripts/transition.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   transition: () => (/* binding */ transition)
/* harmony export */ });
const transition = {
    init: function (elements) {
        const observerObj = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = "running";
                }
            }
        }, { rootMargin: "-30px" });
        let elemsToObserve = null;
        if (elements === undefined) {
            const elems = document.querySelectorAll(".trans-on-viewport-entry");
            elemsToObserve = Array.from(elems);
        }
        else {
            elemsToObserve = Array.from(elements);
        }
        for (const elem of elemsToObserve) {
            observerObj.observe(elem);
        }
    },
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./scripts/app.ts ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _navbar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./navbar */ "./scripts/navbar.ts");
/* harmony import */ var _scrollDownToButton__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scrollDownToButton */ "./scripts/scrollDownToButton.ts");
/* harmony import */ var _transition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transition */ "./scripts/transition.ts");
/* harmony import */ var _animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animations */ "./scripts/animations.ts");




window.addEventListener("load", () => {
    const navbars = document.querySelectorAll("nav.nav");
    for (const navbarElem of navbars) {
        _navbar__WEBPACK_IMPORTED_MODULE_0__.navbar.init(navbarElem);
    }
    _scrollDownToButton__WEBPACK_IMPORTED_MODULE_1__.scrollDownToButton.init();
    _transition__WEBPACK_IMPORTED_MODULE_2__.transition.init();
    _animations__WEBPACK_IMPORTED_MODULE_3__.animations.initNetworkBgAnimation();
});

})();

/******/ })()
;
//# sourceMappingURL=app.js.map