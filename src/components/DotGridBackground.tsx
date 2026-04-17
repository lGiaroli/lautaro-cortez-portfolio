import { useEffect, useRef } from "react";

type DotGridRendererOptions = {
  spacing: number;
  basePointSize: number;
  radiusPx: number;
  strength: number;
  opacity: number;
  color: [number, number, number];
};

type DotGridBackgroundProps = {
  className?: string;
  dotColor?: [number, number, number];
  opacity?: number;
  spacing?: number;
  pointSize?: number;
  radiusPx?: number;
  strength?: number;
};

class DotGridRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly surfaceElement: HTMLElement;
  private readonly gl: WebGLRenderingContext;
  private readonly prefersReducedMotion: MediaQueryList;
  private readonly config: DotGridRendererOptions;

  private width = 1;
  private height = 1;
  private pixelRatio = 1;
  private pointCount = 0;
  private rafId = 0;
  private needsRedraw = true;

  private pointer = { x: 9999, y: 9999 };
  private pointerTarget = { x: 9999, y: 9999 };
  private pointerVelocity = 0;
  private pointerVelocityTarget = 0;
  private interaction = 0;
  private interactionTarget = 0;
  private lastPointerTime = performance.now();
  private lastPointerClientX = 0;
  private lastPointerClientY = 0;

  private readonly program: WebGLProgram;
  private readonly positionBuffer: WebGLBuffer;
  private readonly attributeLocation: number;
  private readonly uniforms: {
    pointer: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    radius: WebGLUniformLocation | null;
    strength: WebGLUniformLocation | null;
    pointSize: WebGLUniformLocation | null;
    pixelRatio: WebGLUniformLocation | null;
    interaction: WebGLUniformLocation | null;
    velocity: WebGLUniformLocation | null;
    opacity: WebGLUniformLocation | null;
    color: WebGLUniformLocation | null;
  };

  private readonly handlePointerMove: (event: PointerEvent) => void;
  private readonly handlePointerLeave: () => void;
  private readonly handleResize: () => void;
  private readonly handleMotionPreference: () => void;

  constructor(canvas: HTMLCanvasElement, options: DotGridRendererOptions) {
    this.canvas = canvas;
    this.surfaceElement = canvas.parentElement ?? canvas;
    this.config = options;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      throw new Error("WebGL no esta disponible en este navegador.");
    }

    this.gl = gl;
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const vertexShaderSource = `
      attribute vec2 aPosition;

      uniform vec2 uPointer;
      uniform vec2 uResolution;
      uniform float uRadius;
      uniform float uStrength;
      uniform float uPointSize;
      uniform float uPixelRatio;
      uniform float uInteraction;
      uniform float uVelocity;

      varying float vInfluence;

      void main() {
        vec2 delta = aPosition - uPointer;
        float dist = length(delta);
        float safeDist = max(dist, 0.0001);
        float influence = (1.0 - smoothstep(0.0, uRadius, dist)) * uInteraction;
        float shapedInfluence = pow(influence, 1.6);
        vec2 direction = delta / safeDist;
        float push = shapedInfluence * (uStrength + (uVelocity * 3.0));
        vec2 displaced = aPosition + (direction * push);
        vec2 clip = vec2(
          ((displaced.x / uResolution.x) * 2.0) - 1.0,
          1.0 - ((displaced.y / uResolution.y) * 2.0)
        );

        gl_Position = vec4(clip, 0.0, 1.0);
        gl_PointSize = (uPointSize + shapedInfluence * (uPointSize * 0.55)) * uPixelRatio;
        vInfluence = shapedInfluence;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;

      uniform float uOpacity;
      uniform vec3 uColor;
      varying float vInfluence;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float dist = length(uv);
        float alpha = 1.0 - smoothstep(0.18, 0.5, dist);
        float density = mix(0.76, 1.0, vInfluence);
        gl_FragColor = vec4(uColor, alpha * density * uOpacity);
      }
    `;

    const vertexShader = this.createShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    this.program = this.createProgram(vertexShader, fragmentShader);

    const positionBuffer = gl.createBuffer();
    if (!positionBuffer) {
      throw new Error("No se pudo crear el buffer de posiciones.");
    }

    this.positionBuffer = positionBuffer;
    this.attributeLocation = gl.getAttribLocation(this.program, "aPosition");
    this.uniforms = {
      pointer: gl.getUniformLocation(this.program, "uPointer"),
      resolution: gl.getUniformLocation(this.program, "uResolution"),
      radius: gl.getUniformLocation(this.program, "uRadius"),
      strength: gl.getUniformLocation(this.program, "uStrength"),
      pointSize: gl.getUniformLocation(this.program, "uPointSize"),
      pixelRatio: gl.getUniformLocation(this.program, "uPixelRatio"),
      interaction: gl.getUniformLocation(this.program, "uInteraction"),
      velocity: gl.getUniformLocation(this.program, "uVelocity"),
      opacity: gl.getUniformLocation(this.program, "uOpacity"),
      color: gl.getUniformLocation(this.program, "uColor"),
    };

    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.enableVertexAttribArray(this.attributeLocation);
    gl.vertexAttribPointer(this.attributeLocation, 2, gl.FLOAT, false, 0, 0);
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    this.handlePointerMove = (event) => {
      if (this.prefersReducedMotion.matches) {
        return;
      }

      const rect = this.surfaceElement.getBoundingClientRect();
      const localX = event.clientX - rect.left;
      const localY = event.clientY - rect.top;

      if (localX < 0 || localY < 0 || localX > rect.width || localY > rect.height) {
        return;
      }

      const now = performance.now();
      const deltaTime = Math.max(now - this.lastPointerTime, 16);
      const deltaX = localX - this.lastPointerClientX;
      const deltaY = localY - this.lastPointerClientY;
      const speed = Math.hypot(deltaX, deltaY) / deltaTime;

      this.pointerTarget = { x: localX, y: localY };
      this.pointerVelocityTarget = Math.min(speed, 1.6);
      this.interactionTarget = 1;
      this.lastPointerTime = now;
      this.lastPointerClientX = localX;
      this.lastPointerClientY = localY;
      this.requestRender();
    };

    this.handlePointerLeave = () => {
      this.interactionTarget = 0;
      this.pointerVelocityTarget = 0;
      this.requestRender();
    };

    this.handleResize = () => {
      this.resize();
      this.requestRender();
    };

    this.handleMotionPreference = () => {
      if (this.prefersReducedMotion.matches) {
        this.interaction = 0;
        this.interactionTarget = 0;
        this.pointerVelocity = 0;
        this.pointerVelocityTarget = 0;
      }

      this.requestRender();
    };

    this.attachEvents();
    this.resize();
    this.requestRender();
  }

  destroy() {
    if (this.rafId) {
      window.cancelAnimationFrame(this.rafId);
      this.rafId = 0;
    }

    this.surfaceElement.removeEventListener("pointermove", this.handlePointerMove);
    this.surfaceElement.removeEventListener("pointerleave", this.handlePointerLeave);
    window.removeEventListener("blur", this.handlePointerLeave);
    window.removeEventListener("resize", this.handleResize);

    if (typeof this.prefersReducedMotion.removeEventListener === "function") {
      this.prefersReducedMotion.removeEventListener("change", this.handleMotionPreference);
    } else if (typeof this.prefersReducedMotion.removeListener === "function") {
      this.prefersReducedMotion.removeListener(this.handleMotionPreference);
    }

    this.gl.deleteBuffer(this.positionBuffer);
    this.gl.deleteProgram(this.program);
  }

  private attachEvents() {
    this.surfaceElement.addEventListener("pointermove", this.handlePointerMove, { passive: true });
    this.surfaceElement.addEventListener("pointerleave", this.handlePointerLeave, { passive: true });
    window.addEventListener("blur", this.handlePointerLeave, { passive: true });
    window.addEventListener("resize", this.handleResize, { passive: true });

    if (typeof this.prefersReducedMotion.addEventListener === "function") {
      this.prefersReducedMotion.addEventListener("change", this.handleMotionPreference);
    } else if (typeof this.prefersReducedMotion.addListener === "function") {
      this.prefersReducedMotion.addListener(this.handleMotionPreference);
    }
  }

  private resize() {
    const rect = this.surfaceElement.getBoundingClientRect();
    const width = Math.max(1, Math.floor(rect.width));
    const height = Math.max(1, Math.floor(rect.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.width = width;
    this.height = height;
    this.pixelRatio = dpr;

    this.canvas.width = Math.max(1, Math.floor(width * dpr));
    this.canvas.height = Math.max(1, Math.floor(height * dpr));

    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.buildGrid();
    this.needsRedraw = true;
  }

  private buildGrid() {
    const spacing = this.width < 720 ? this.config.spacing + 4 : this.config.spacing;
    const positions: number[] = [];

    for (let y = -spacing; y <= this.height + spacing; y += spacing) {
      for (let x = -spacing; x <= this.width + spacing; x += spacing) {
        positions.push(x, y);
      }
    }

    this.pointCount = positions.length / 2;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);
  }

  private requestRender() {
    this.needsRedraw = true;

    if (this.rafId) {
      return;
    }

    this.rafId = window.requestAnimationFrame(() => this.renderLoop());
  }

  private renderLoop() {
    this.rafId = 0;

    const stillAnimating = this.updateState();

    if (this.needsRedraw) {
      this.draw();
    }

    if (stillAnimating) {
      this.rafId = window.requestAnimationFrame(() => this.renderLoop());
    }
  }

  private updateState() {
    const reduceMotion = this.prefersReducedMotion.matches;
    const pointerEasing = reduceMotion ? 1 : 0.18;
    const velocityDamping = reduceMotion ? 1 : 0.18;
    const interactionDamping = reduceMotion ? 1 : 0.16;

    this.pointer.x += (this.pointerTarget.x - this.pointer.x) * pointerEasing;
    this.pointer.y += (this.pointerTarget.y - this.pointer.y) * pointerEasing;
    this.pointerVelocity +=
      (this.pointerVelocityTarget - this.pointerVelocity) * velocityDamping;
    this.interaction += (this.interactionTarget - this.interaction) * interactionDamping;
    this.pointerVelocityTarget *= 0.84;

    const pointerSettled =
      Math.abs(this.pointer.x - this.pointerTarget.x) < 0.16 &&
      Math.abs(this.pointer.y - this.pointerTarget.y) < 0.16;
    const velocitySettled =
      Math.abs(this.pointerVelocity - this.pointerVelocityTarget) < 0.01;
    const interactionSettled =
      Math.abs(this.interaction - this.interactionTarget) < 0.01;

    const animating = !(pointerSettled && velocitySettled && interactionSettled);
    this.needsRedraw = this.needsRedraw || animating;
    return animating;
  }

  private draw() {
    const radius = this.width < 720 ? this.config.radiusPx * 0.84 : this.config.radiusPx;

    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.vertexAttribPointer(this.attributeLocation, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.uniform2f(this.uniforms.pointer, this.pointer.x, this.pointer.y);
    this.gl.uniform2f(this.uniforms.resolution, this.width, this.height);
    this.gl.uniform1f(this.uniforms.radius, radius);
    this.gl.uniform1f(this.uniforms.strength, this.config.strength);
    this.gl.uniform1f(this.uniforms.pointSize, this.config.basePointSize);
    this.gl.uniform1f(this.uniforms.pixelRatio, this.pixelRatio);
    this.gl.uniform1f(this.uniforms.interaction, this.interaction);
    this.gl.uniform1f(this.uniforms.velocity, this.pointerVelocity);
    this.gl.uniform1f(this.uniforms.opacity, this.config.opacity);
    this.gl.uniform3f(
      this.uniforms.color,
      this.config.color[0],
      this.config.color[1],
      this.config.color[2]
    );

    this.gl.drawArrays(this.gl.POINTS, 0, this.pointCount);
    this.needsRedraw = false;
  }

  private createShader(type: number, source: string) {
    const shader = this.gl.createShader(type);

    if (!shader) {
      throw new Error("No se pudo crear un shader WebGL.");
    }

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      const message = this.gl.getShaderInfoLog(shader) || "Shader compilation error";
      this.gl.deleteShader(shader);
      throw new Error(message);
    }

    return shader;
  }

  private createProgram(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
    const program = this.gl.createProgram();

    if (!program) {
      throw new Error("No se pudo crear el programa WebGL.");
    }

    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    if (!this.gl.getProgramParameter(program, this.gl.LINK_STATUS)) {
      const message = this.gl.getProgramInfoLog(program) || "Program linking error";
      this.gl.deleteProgram(program);
      throw new Error(message);
    }

    this.gl.deleteShader(vertexShader);
    this.gl.deleteShader(fragmentShader);
    return program;
  }
}

export function DotGridBackground({
  className,
  dotColor = [242, 245, 239],
  opacity = 0.72,
  spacing = 26,
  pointSize = 2.15,
  radiusPx = 165,
  strength = 10,
}: DotGridBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return undefined;
    }

    const renderer = new DotGridRenderer(canvas, {
      spacing,
      basePointSize: pointSize,
      radiusPx,
      strength,
      opacity,
      color: [
        dotColor[0] / 255,
        dotColor[1] / 255,
        dotColor[2] / 255,
      ],
    });

    return () => renderer.destroy();
  }, [
    dotColor[0],
    dotColor[1],
    dotColor[2],
    opacity,
    pointSize,
    radiusPx,
    spacing,
    strength,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className ? `dot-grid-canvas ${className}` : "dot-grid-canvas"}
      aria-hidden="true"
    />
  );
}
