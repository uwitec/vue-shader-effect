import { Application, loaders, Sprite, utils } from "pixi.js";
import DebugTool from "../DebugTool.js";
import Effect from "./Effect.js";


/**
 * @class Main
 */
export default class Main {
  /**
   * constructor
   */
	constructor() {
		utils.skipHello();

		this.loader = new loaders.Loader();
		this.debugTool = new DebugTool();
		this.app = null;
		this.sprite = null;
		this.effect = null;
	}


	/*--------------------------------------------------------------------------
		@methods
	--------------------------------------------------------------------------*/
	/**
	 * setup -
	 *
	 * @param {object} params - elm, texture, uniforms, callback
	 * @memberof Main
	 */
	setup(params){
		this.effect = new Effect(params.uniforms);

		this.loader.add("texture", params.texture);

		this.loader.onComplete.add((a, b) => {
			this._setRenderer(params.elm, params.callback);
		});

		this.loader.onError.add((a, b) => {
			console.log(a, b);
		});

		this.loader.load();
	}


	/**
	 * _setRenderer -
	 *
	 * @param {dom} elm
	 * @param {function} callback
	 * @memberof Main
	 */
	_setRenderer(elm, callback){
		callback = callback || function(){};

		let style = getComputedStyle(elm);

		this.app = new Application({
			width: +style.width.replace("px", ""),
			height: +style.height.replace("px", ""),
			transparent: true
		});
		elm.appendChild(this.app.view);

		this.sprite = new Sprite(PIXI.Texture.fromImage("texture"));
		this.sprite.scale.set(0.5, 0.5);
		this.sprite.filters = [this.effect];
		this.app.stage.addChild(this.sprite);
		callback();
	}
}
