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
	constructor(props) {
		this.props = props;
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

		this.loader.add("texture", this.props.texture);

		this.loader.onComplete.add((a, b) => {
			this._setRenderer(params.$el, params.callback);
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
	_setRenderer($el, callback){
		callback = callback || function(){};

		utils.skipHello();

		this.app = new Application({
			width: this.props.width,
			height: this.props.height,
			transparent: true
		});

		this.sprite = new Sprite(PIXI.Texture.fromImage("texture"));
		this.sprite.filters = [this.effect];
		this.app.stage.addChild(this.sprite);
		$el.appendChild(this.app.view);

		callback();
	}
}
