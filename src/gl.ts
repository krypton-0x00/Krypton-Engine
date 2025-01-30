namespace KENGINE {
  export let gl: WebGLRenderingContext;

  export class GLUtilities {
    /**
     * Initialize the Web GL
     */
    public static Initialize(canvesElementId?: string): HTMLCanvasElement {
      let canvas: HTMLCanvasElement;

      if (canvesElementId) {
        const element = document.getElementById(canvesElementId);
        if (!(element instanceof HTMLCanvasElement)) {
          throw new Error(`No Canves Element Named ${canvesElementId} Found.`);
        }
        canvas = element;
      } else {
        canvas = document.createElement("canvas") as HTMLCanvasElement;
        document.body.appendChild(canvas);
      }

      KENGINE.gl = canvas.getContext("webgl") as WebGLRenderingContext;

      if (!KENGINE.gl) {
        throw new Error("Unable to initialize WebGL.");
      }

      return canvas;
    }
  }
}
