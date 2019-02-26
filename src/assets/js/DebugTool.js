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
		this.gui = new dat.GUI();
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
	setup(){
		this.stats.domElement.style.position = "absolute";
		this.stats.domElement.style.left = "0px";
		this.stats.domElement.style.top = "0px";
		this.stats.domElement.style.zIndex = 9999;
		document.body.appendChild(this.stats.domElement);

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
