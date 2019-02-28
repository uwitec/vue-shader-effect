//--------------------------------------------------------------------------
// noise: ランダム
//--------------------------------------------------------------------------
float random (in vec2 position) {
  return fract(sin(dot(position.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (in vec2 position) {
    vec2 i = floor(position);
    vec2 f = fract(position);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners porcentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
