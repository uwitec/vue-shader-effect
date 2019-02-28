/*==========================================================================
	template
==========================================================================*/
<template>
  <div class="wrap">
    <h1>vue-shader-effect | Line</h1>
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
import Main from "../assets/js/line/Main";
import * as utils from "../assets/js/utils";

export default {
  name: "Line",


  /**
   * data
   */
  data() {
    return {
      uniforms: {
				uDirection: { type: "1i", value: 0 },
        uProgress: { type: "1f", value: 0.0 }
      },
      main: new Main({
        width: 1280,
        height: 720,
        texture: require("../assets/img/img03.jpg")
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
      this.main.debugTool.gui
        .add(this.uniforms.uProgress, "value", 0.0, 1.0)
        .step(0.001)
        .name("progress");
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
      if (event.type == "mouseleave") {
        value = 0;
      } else if (event.type == "mouseenter") {
        value = 1;
      } else {
        return;
      }

			this.uniforms.uDirection.value = utils.getMouseEventDirection(event).index;

      TweenLite.to(this.uniforms.uProgress, 0.6, {
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
    cursor: pointer;

    canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

