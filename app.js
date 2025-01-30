"use strict";
window.onload = () => {
    let engine = new KENGINE.Engine();
    engine.start();
};
var KENGINE;
(function (KENGINE) {
    //Core Engine Class
    class Engine {
        constructor() { }
        start() {
            this._canvas = KENGINE.GLUtilities.Initialize();
            KENGINE.gl.clearColor(0, 0, 0, 1);
            this.loop();
        }
        loop() {
            //clear the color buffer
            KENGINE.gl.clear(KENGINE.gl.COLOR_BUFFER_BIT);
            requestAnimationFrame(this.loop.bind(this));
        }
    }
    KENGINE.Engine = Engine;
})(KENGINE || (KENGINE = {}));
var KENGINE;
(function (KENGINE) {
    class GLUtilities {
        /**
         * Initialize the Web GL
         */
        static Initialize(canvesElementId) {
            let canvas;
            if (canvesElementId) {
                const element = document.getElementById(canvesElementId);
                if (!(element instanceof HTMLCanvasElement)) {
                    throw new Error(`No Canves Element Named ${canvesElementId} Found.`);
                }
                canvas = element;
            }
            else {
                canvas = document.createElement("canvas");
                document.body.appendChild(canvas);
            }
            KENGINE.gl = canvas.getContext("webgl");
            if (!KENGINE.gl) {
                throw new Error("Unable to initialize WebGL.");
            }
            return canvas;
        }
    }
    KENGINE.GLUtilities = GLUtilities;
})(KENGINE || (KENGINE = {}));
