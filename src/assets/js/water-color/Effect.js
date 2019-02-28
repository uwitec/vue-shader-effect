import { Filter } from "pixi.js";


/**
 * @class Effect
 */
export default class Effect extends Filter {
  /**
   * constructor
   */
	constructor(_uniforms) {
		let uniforms = Object.assign({
			uDirection: { type: "1i", value: 0 },
			uAmount: { type: "1f", value: 0.5 },
			uProgress: { type: "1f", value: 0.0 },
			uTexture: { type: "sampler2D", value: null },
			uPattern: { type: "sampler2D", value: null },
		}, _uniforms);

		super(
			require("./main.vert"),
			require("./main.frag"),
			uniforms
		);

		// NOTE: uv座標がずれるため、余計な余白を取る。
		// https://pixijs.download/v4.7.2/docs/PIXI.Filter.html#padding
		this.padding = 0;
	}
}
