import { Filter, Matrix, Point } from "pixi.js";
// import * as utils from "../utils";

/**
 * @class Effect
 */
export default class Effect extends Filter {
  /**
   * constructor
   */
	constructor(texture) {
		super(
			// vertex shader
			null,
			// fragment shader
			// null,
			require("./main.frag"),
			// uniforms
			{
				dimensions: { type: "v2", value: new Point() },
				uVal: { type: 'float', value: 0 },
				uMappedMatrix: { type: "mat3", value: new Matrix() },
				uTexture: { type: "sampler2D", value: texture },
				uProgress: { type: "1f", value: 0.0 },
			}
		);

		console.log(this);


		// PIXIjs uv座標補正
		// https://qiita.com/komietty/items/78372c75a535460c1338
		this.apply = (filterManager, input, output, clear) => {
			// console.log(input);
			// this.uniforms.dimensions[0] = input.sourceFrame.width;
			// this.uniforms.dimensions[1] = input.sourceFrame.height;

			filterManager.calculateNormalizedScreenSpaceMatrix(this.uniforms.uMappedMatrix);
			filterManager.applyFilter(this, input, output, clear);
		};


		this.autoFit = false;
		// this.enabled = false;
	}
}
