precision mediump float;

// #pragma glslify: import("../../shader/define.glsl");
// #pragma glslify: blendOverlay = import(glsl-blend/overlay.glsl);

varying vec2 vTextureCoord;
varying vec2 vFilterCoord;

uniform sampler2D uSampler;
uniform sampler2D filterSampler;

// custom uniforms
uniform float uProgress;
uniform int uDirection;


void main(void) {
	vec4 color = texture2D(uSampler, vTextureCoord);

	if(0 == uDirection){ // 上
		if(uProgress > vTextureCoord.y){
			vec2 lineCoord = vec2(vTextureCoord.x, uProgress);
			color = texture2D(uSampler, lineCoord);
		}

	} else if(2 == uDirection){ // 下
		if(uProgress > 1.0 - vTextureCoord.y){
			vec2 lineCoord = vec2(vTextureCoord.x, 1.0 - uProgress);
			color = texture2D(uSampler, lineCoord);
		}

	} else if(1 == uDirection){ // 右
		if(uProgress > 1.0 - vTextureCoord.x){
			vec2 lineCoord = vec2(1.0 - uProgress, vTextureCoord.y);
			color = texture2D(uSampler, lineCoord);
		}
	} else if(3 == uDirection){ // 左
		if(uProgress > vTextureCoord.x){
			vec2 lineCoord = vec2(uProgress, vTextureCoord.y);
			color = texture2D(uSampler, lineCoord);
		}
	}


	gl_FragColor = color;
	// vec4 color = texture2D(filterSampler, vTextureCoord);
	// gl_FragColor = color;
}
