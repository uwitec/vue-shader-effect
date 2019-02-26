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

		// https://pixijs.download/v4.7.2/docs/core_renderers_webgl_filters_Filter.js.html#line71
		this.padding = 0;
	}
}
