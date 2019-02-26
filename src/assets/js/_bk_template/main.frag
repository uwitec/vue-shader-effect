// #pragma glslify: import("./define.glsl")
// @import ./define;
// #pragma glslify: blendOverlay = import(glsl-blend/overlay.glsl);

precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform mat3 uMappedMatrix;
uniform vec2 filterArea;
uniform vec2 dimensions;


uniform float uProgress;
uniform sampler2D uTexture;


void main(void) {
	// pixijs uv座標補正用
	vec2 textureCoord = (vec3(vTextureCoord.xy, 1) * uMappedMatrix).xy;

	// textureCoord.y = 1.0;

	if(uProgress > textureCoord.y){
		vec2 lineCoord = vec2(textureCoord.x, 1.0 - uProgress);
		gl_FragColor =  texture2D(uTexture, lineCoord);
	} else {
		gl_FragColor = texture2D(uTexture, textureCoord);

	}



	// gl_FragColor = vec4(uProgress, uProgress, uProgress, 1.0);







	// vec4 originalColor = texture2D(uSampler, vTextureCoord);
	// gl_FragColor = originalColor;
	// vec2 screenCoord = (vTextureCoord * filterArea.xy + filterArea.zw);
	// vec2 pixelCoord = vTextureCoord * filterArea.xy;
	// vec2 normalizedCoord = pixelCoord / dimensions;


	// vec4 color = texture2D(uTexture, textureCoord2);
	// gl_FragColor = color;



	// vec2 textureCoord = vec2(vTextureCoord.x, vTextureCoord.y * (1.0 - uProgress));
	// vec2 textureCoord = vec2(vTextureCoord.x, mix(0.0, .7, uProgress));

	// vec4 color = texture2D(uSampler, textureCoord.xy);

	// gl_FragColor = color;
}
