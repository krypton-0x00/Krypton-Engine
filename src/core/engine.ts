namespace KENGINE {
  //Core Engine Class
  export class Engine {
    private _canvas: HTMLCanvasElement | undefined;
    private _shader: Shader | undefined;
    public constructor() {}

    public start(): void {
      this._canvas = GLUtilities.Initialize();

      KENGINE.gl.clearColor(0, 0, 0, 1);
      this.loadShader();
      this._shader?.use();
      this.loop();
    }

    private loop(): void {
      //clear the color buffer
      KENGINE.gl.clear(KENGINE.gl.COLOR_BUFFER_BIT);
      requestAnimationFrame(this.loop.bind(this));
    }
    public resize(): void {
      if (this._canvas) {
        this._canvas.width = window.innerWidth;
        this._canvas.height = window.innerHeight;
      }
    }
    private loadShader(): void {
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
      this._shader = new Shader(
        "basic",
        vertexShaderSource,
        fragmentShaderSource
      );
    }
  }
}
