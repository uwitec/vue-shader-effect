/*==========================================================================
	template
==========================================================================*/
<template>
  <div class="wrap">
    <!-- ShaderEffect -->
    <h1>Distortion</h1>
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
import Main from "../assets/js/water-color/Main";
import * as _utils from "../assets/js/utils";


export default {
  name: "WaterColor",

  /**
   * data -
   */
  data() {
    return {
      texture1: require("../assets/img/img01.jpg"),
      texture2: require("../assets/img/img02.jpg"),
      pattern: require("../assets/img/displacement/4.png"),
      uniforms: {
				uDirection: { type: "1i", value: 0 },
				uAmount: { type: "1f", value: 0.5 },
				uProgress: { type: "1f", value: 0.0 }
			},
			main: new Main()
    };
  },


  /**
   * mounted -
   */
  mounted: function() {
		this.main.setup({
			elm: this.$refs.shader_effect,
			texture1: this.texture1,
			texture2: this.texture2,
			pattern : this.pattern,
			uniforms: this.uniforms,
			callback: null
		});

		if (this.main.debugTool) {
			this.main.debugTool.gui.add(this.uniforms.uAmount, "value", 0.0, 3.0).step(0.1).name("amount");
			this.main.debugTool.gui.add(this.uniforms.uProgress, "value", 0.0, 1.0).step(0.001).name("progress");
		}
  },


  /**
   * methods -
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

			this.uniforms.uDirection.value = _utils.getMouseEventDirection(event).index;

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
		"uniforms.uDirection.value": function(newVal, oldVal) {
			this.main.effect.uniforms.uDirection = newVal;
		},

		"uniforms.uAmount.value": function(newVal, oldVal) {
			this.main.effect.uniforms.uAmount = newVal;
		},

		"uniforms.uProgress.value": function(newVal, oldVal) {
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
  }
}
</style>
