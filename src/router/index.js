import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ShaderEffect from '@/components/ShaderEffect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
			name: 'ShaderEffect',
			component: ShaderEffect
    }
  ]
})
