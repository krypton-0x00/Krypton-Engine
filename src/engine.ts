namespace KENGINE {
  //Core Engine Class
  export class Engine {
    private _canvas: HTMLCanvasElement | undefined;
    public constructor() {}

    public start(): void {
      this._canvas = GLUtilities.Initialize();

      KENGINE.gl.clearColor(0, 0, 0, 1);
      this.loop();
    }

    private loop(): void {
      //clear the color buffer
      KENGINE.gl.clear(KENGINE.gl.COLOR_BUFFER_BIT);
      requestAnimationFrame(this.loop.bind(this));
    }
  }
}
