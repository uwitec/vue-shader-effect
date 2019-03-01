/*==========================================================================
	template
==========================================================================*/
<template>
  <div class="wrap">
    <h1>vue-shader-effect | Distortion</h1>
    <div class="shader_effect" ref="shader_effect" @mouseenter="hover" @mouseleave="hover">
      <slot></slot>
    </div>
  </div>
</template>


/*==========================================================================
	script
==========================================================================*/
<script>
import { TweenLite } from "gsap/TweenMax";
import Main from "../assets/js/distortion/Main";
import * as utils from "../assets/js/utils";


export default {
  name: "Distortion",


  /**
   * data
   */
  data() {
    return {
      uniforms: {
				uDirection: { type: "1i", value: 0 },
				uAngle: { type: "1f", value: 0.0 },
				uIsOver: { type: "1i", value: 0 },
				uAmount: { type: "1f", value: 0.5 },
				uProgress: { type: "1f", value: 0.0 }
			},
			main: new Main({
				width: 1280,
				height: 720,
				texture1: require("../assets/img/img01.jpg"),
				texture2: require("../assets/img/img02.jpg"),
				pattern: require("../assets/img/pattern/4.png")
			})
    };
  },


  /**
   * mounted
   */
  mounted: function() {
		this.main.setup({
			$el: this.$refs.shader_effect,
			uniforms: this.uniforms,
			callback: null
		});

		if (this.main.debugTool) {
			this.main.debugTool.gui.add(this.uniforms.uAmount, "value", 0.0, 3.0).step(0.1).name("amount");
			this.main.debugTool.gui.add(this.uniforms.uProgress, "value", 0.0, 1.0).step(0.001).name("progress");
			this.main.debugTool.setup(this.$el);
		}
  },


  /**
   * methods
   */
  methods: {
		/**
		 * hover -
		 */
    hover: function(event) {
			let value;

			if(event.type == "mouseleave"){
				value = 0;
			} else if(event.type == "mouseenter"){
				value = 1;
			} else {
				return;
			}

			this.uniforms.uIsOver.value = value;
			this.uniforms.uAngle.value = utils.getMouseEventAngle(event);

			// マウスイベントの向き
			// this.uniforms.uDirection.value = utils.getMouseEventDirection(event).index;

			TweenLite.to(this.uniforms.uProgress, .6, {
				value: value,
				ease: Power3.easeOut
			});
    }
  },


	/**
	 * watch -
	 */
	watch: {
		"uniforms.uDirection.value" (newVal, oldVal) {
			this.main.effect.uniforms.uDirection = newVal;
		},

		"uniforms.uIsOver.value" (newVal, oldVal) {
			this.main.effect.uniforms.uIsOver = newVal;
		},

		"uniforms.uAngle.value" (newVal, oldVal) {
			this.main.effect.uniforms.uAngle = newVal;
		},

		"uniforms.uAmount.value" (newVal, oldVal) {
			this.main.effect.uniforms.uAmount = newVal;
		},

		"uniforms.uProgress.value" (newVal, oldVal) {
			this.main.effect.uniforms.uProgress = newVal;
			if(this.main.debugTool){
				this.main.debugTool.gui.updateDisplay();
			}
		}
	}
};
</script>


/*==========================================================================
	style
==========================================================================*/
<style lang="scss">
.wrap {
  padding: 30px;

  h1 {
    font-size: 1.6rem;
    margin-bottom: 50px;
  }

  .shader_effect {
    margin: 0 auto;
    width: 640px;
    height: 360px;
		background: #e9e9e9;
		cursor: pointer;

		canvas{
			width: 100%;
			height: 100%;
		}
  }
}
</style>
