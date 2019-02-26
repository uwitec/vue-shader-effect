// #pragma glslify: import("./define.glsl");
// #pragma glslify: blendOverlay = import(glsl-blend/overlay.glsl);

precision mediump float;

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

// common uniforms
uniform sampler2D uSampler;
uniform sampler2D filterSampler;

// custom uniforms
uniform float uProgress;


void main(void) {
	if(uProgress > vTextureCoord.y){
		vec2 lineCoord = vec2(vTextureCoord.x, uProgress);
		gl_FragColor =  texture2D(uSampler, lineCoord);
	} else {
		gl_FragColor = texture2D(uSampler, vTextureCoord);
	}

	// vec4 color = texture2D(filterSampler, vTextureCoord);
	// gl_FragColor = color;
}
