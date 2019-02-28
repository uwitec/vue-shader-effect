precision mediump float;
// #pragma glslify: import("../../shader/define.glsl");

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform sampler2D uSampler;
uniform sampler2D filterSampler;

// custom uniforms
uniform float uProgress;
uniform float uAmount;
uniform float uAngle;
uniform int uIsOver;
uniform int uDirection;
uniform sampler2D uTexture;
uniform sampler2D uPattern;


void main(void) {
	// vec4 color = texture2D(filterSampler, vTextureCoord);
	// gl_FragColor = color;

	vec2 uv = vTextureCoord;
	vec4 disp = texture2D(uPattern, uv);

	float offset1 = uProgress * (disp.r * uAmount);
	float offset2 = (1.0 - uProgress) * (disp.r * uAmount);

	float x = cos(uAngle);
	float y = sin(uAngle);

	vec2 distCoord1 = vec2(uv.x + -x * offset1, uv.y + -y * offset1);
	vec2 distCoord2 = vec2(uv.x + x * offset2, uv.y + y * offset2);

	// vec2 distCoord1;
	// vec2 distCoord2;

	// direction
	// if(0 == uDirection || 3 == uDirection){
	// 	offset1 *= -1.0;
	// 	offset2 *= -1.0;
	// }

	// if(0 == uDirection || 2 == uDirection){
	// 	distCoord1 = vec2(uv.x, uv.y + offset1);
	// 	distCoord2 = vec2(uv.x, uv.y - offset2);

	// } else {
	// 	distCoord1 = vec2(uv.x + offset1, uv.y);
	// 	distCoord2 = vec2(uv.x - offset2, uv.y);
	// }

	vec4 color1 = texture2D(uSampler, distCoord1);
	vec4 color2 = texture2D(uTexture, distCoord2);

	gl_FragColor = mix(color1, color2, uProgress);
}
