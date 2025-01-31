"use strict";
let engine;
window.onload = () => {
    engine = new KENGINE.Engine();
    engine.start();
};
window.onresize = () => {
    engine.resize();
};
var KENGINE;
(function (KENGINE) {
    //Core Engine Class
    class Engine {
        constructor() { }
        start() {
            var _a;
            this._canvas = KENGINE.GLUtilities.Initialize();
            KENGINE.gl.clearColor(0, 0, 0, 1);
            this.loadShader();
            (_a = this._shader) === null || _a === void 0 ? void 0 : _a.use();
            this.loop();
        }
        loop() {
            //clear the color buffer
            KENGINE.gl.clear(KENGINE.gl.COLOR_BUFFER_BIT);
            requestAnimationFrame(this.loop.bind(this));
        }
        resize() {
            if (this._canvas) {
                this._canvas.width = window.innerWidth;
                this._canvas.height = window.innerHeight;
            }
        }
        loadShader() {
            let vertexShaderSource = `
        attribute vec3 a_position;
        void main(){
          gl_Position = vec4(a_position,1.0);
        }  
      `;
            let fragmentShaderSource = `
        precision mediump float;
        void main(){
          gl_FragColor = vec4(1.0);
        }

      
      `;
            this._shader = new KENGINE.Shader("basic", vertexShaderSource, fragmentShaderSource);
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
var KENGINE;
(function (KENGINE) {
    //WebGL Shader
    class Shader {
        constructor(name, vertexSource, fragmentSource) {
            this._program = null;
            this._name = name;
            let vertexShader = this.loadShader(vertexSource, KENGINE.gl.VERTEX_SHADER);
            let fragmentShader = this.loadShader(fragmentSource, KENGINE.gl.FRAGMENT_SHADER);
            this.createProgram(vertexShader, fragmentShader);
        }
        getName() {
            return this._name;
        }
        use() {
            KENGINE.gl.useProgram(this._program);
        }
        //Compliles the shader and return the WebGLShader Object.
        loadShader(source, shaderType) {
            let shader = KENGINE.gl.createShader(shaderType);
            if (shader == null) {
                throw new Error("Failed to create shader.");
            }
            KENGINE.gl.shaderSource(shader, source);
            KENGINE.gl.compileShader(shader);
            let error = KENGINE.gl.getShaderInfoLog(shader);
            if (error) {
                throw new Error(`Error occured while compiling shader ${this._name} , ERROR: ${error}`);
            }
            return shader;
        }
        createProgram(vertexShader, fragmentShader) {
            this._program = KENGINE.gl.createProgram();
            KENGINE.gl.attachShader(this._program, vertexShader);
            KENGINE.gl.attachShader(this._program, fragmentShader);
            KENGINE.gl.linkProgram(this._program);
            let error = KENGINE.gl.getProgramInfoLog(this._program);
            if (error) {
                throw new Error(`Error occured while linking program ${this._name} , ERROR: ${error}`);
            }
        }
    }
    KENGINE.Shader = Shader;
})(KENGINE || (KENGINE = {}));
