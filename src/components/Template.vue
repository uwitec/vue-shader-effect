/*==========================================================================
	template
==========================================================================*/
<template>
  <div class="wrap">
    <!-- ShaderEffect -->
    <h1>|-|</h1>
    <div class="shader_effect" ref="shader_effect" @mouseenter="hover" @mouseleave="hover">
      <slot></slot>
			<!-- <div><a href="">HOGE</a></div> -->
    </div>
  </div>
</template>


/*==========================================================================
	script
==========================================================================*/
<script>
import { TweenLite } from "gsap/TweenMax";
import Main from "../assets/js/sampleEffect/Main";
import * as _utils from "../assets/js/utils";


export default {
  name: "Template",

  /**
   * data -
   */
  data() {
    return {
      // texture: "./assets/img/img02.jpg" Bad Pattern
      texture: require("../assets/img/img03.jpg"),
      uniforms: {
				uProgress: { type: "1f", value: 0.0 }
			},
			main: new Main()
    };
  },


  /**
   * mounted -
   */
  mounted: function() {
    this.init();
  },


  /**
   * methods -
   */
  methods: {
    // init -
    init: function() {
			this.main.setup({
				elm: this.$refs.shader_effect,
				texture: this.texture,
				uniforms: this.uniforms,
				callback: null
			});
			this.update();

			if (this.main.debugTool) {
				this.main.debugTool.gui.add(this.uniforms.uProgress, "value", 0.0, 1.0).step(0.001).name("progress");
			}
    },


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
		"uniforms.uProgress.value": function(newVal, oldVal) {
			this.main.effect.uniforms.uProgress = newVal;
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
