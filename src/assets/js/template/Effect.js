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
			uProgress: { type: "1f", value: 0.0 }
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
