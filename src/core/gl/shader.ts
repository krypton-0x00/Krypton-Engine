namespace KENGINE {
  //WebGL Shader
  export class Shader {
    private _name: string;
    private _program: WebGLProgram | null = null;
    public constructor(
      name: string,
      vertexSource: string,
      fragmentSource: string
    ) {
      this._name = name;
      let vertexShader = this.loadShader(vertexSource, gl.VERTEX_SHADER);
      let fragmentShader = this.loadShader(fragmentSource, gl.FRAGMENT_SHADER);
      this.createProgram(vertexShader, fragmentShader);
    }
    public getName(): string {
      return this._name;
    }
    public use(): void {
      gl.useProgram(this._program);
    }

    //Compliles the shader and return the WebGLShader Object.
    private loadShader(source: string, shaderType: number): WebGLShader {
      let shader: WebGLShader | null = gl.createShader(shaderType);
      if (shader == null) {
        throw new Error("Failed to create shader.");
      }
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      let error = gl.getShaderInfoLog(shader);
      if (error) {
        throw new Error(
          `Error occured while compiling shader ${this._name} , ERROR: ${error}`
        );
      }
      return shader;
    }
    private createProgram(
      vertexShader: WebGLShader,
      fragmentShader: WebGLShader
    ): void {
      this._program = gl.createProgram();
      gl.attachShader(this._program, vertexShader);
      gl.attachShader(this._program, fragmentShader);
      gl.linkProgram(this._program);

      let error = gl.getProgramInfoLog(this._program);
      if (error) {
        throw new Error(
          `Error occured while linking program ${this._name} , ERROR: ${error}`
        );
      }
    }
  }
}
