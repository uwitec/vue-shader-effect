// DebugTool.js
// version: 0.0.1
// author: yoshihito fujiwara

import * as dat from "dat.gui";
import Stats from "stats-js";


/**
 * @class Debug
 */
export default class Debug {
  /**
   * constructor
   */
	constructor() {
		this.gui = new dat.GUI({ autoPlace: false });
		this.stats = new Stats();
	}


	/*--------------------------------------------------------------------------
		@methods
	--------------------------------------------------------------------------*/
	/**
	 * setup
	 *
	 * @memberof Debug
	 */
	setup($el) {
		this.stats.domElement.style.position = "absolute";
		this.stats.domElement.style.left = "0px";
		this.stats.domElement.style.top = "0px";
		this.stats.domElement.style.zIndex = 9999;
		$el.appendChild(this.stats.domElement);

		this.gui.domElement.style.position = "fixed";
		this.gui.domElement.style.top = "0";
		this.gui.domElement.style.right = "0";
		$el.appendChild(this.gui.domElement);

		this._update();
	}

	/**
	 * _update
	 *
	 * @memberof Debug
	 */
	_update() {
		this.stats.update();
		requestAnimationFrame(this._update.bind(this));
	}
}
