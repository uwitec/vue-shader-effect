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
	 * @param {object} params - {$el, uniforms, callback}
	 * @memberof Main
	 */
	setup(params) {
		this.effect = new Effect(params.uniforms);

		this.loader.add("texture1", this.props.texture1);
		this.loader.add("texture2", this.props.texture2);
		this.loader.add("pattern", this.props.pattern);

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
	_setRenderer($el, callback) {
		callback = callback || function () { };

		utils.skipHello();

		this.app = new Application({
			width: this.props.width,
			height: this.props.height,
			transparent: true
		});

		this.effect.uniforms.uTexture = PIXI.Texture.fromImage("texture2");
		this.effect.uniforms.uPattern = PIXI.Texture.fromImage("pattern");

		this.sprite = new Sprite(PIXI.Texture.fromImage("texture1"));
		this.sprite.filters = [this.effect];
		this.app.stage.addChild(this.sprite);
		$el.appendChild(this.app.view);

		callback();
	}
}
