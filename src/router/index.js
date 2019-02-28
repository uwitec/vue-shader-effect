import Vue from 'vue'
import Router from 'vue-router'

import Distortion from '@/components/Distortion'
import Line from '@/components/Line'
// import WaterColor from '@/components/WaterColor'

Vue.use(Router)

const router = new Router({
	// mode: 'history',

  routes: [
		{
			path: '/distortion',
			name: 'Distortion',
			component: Distortion,
			// meta: {
			// 	refresh: true
			// }
		},
		{
			path: '/line',
			name: 'Line',
			component: Line,
			// meta: {
			// 	refresh: true
			// }
		},
		// {
		// 	path: '/water-color',
		// 	name: 'WaterColor',
		// 	component: WaterColor
		// },
    // {
    //   path: '/',
		// 	name: 'ShaderEffect',
		// 	component: ShaderEffect
    // },
  ]
});


// refresh
// router.beforeEach((to, from, next) => {
// 	if (to.meta.refresh && from.name !== null) {
// 		window.location.href = to.path;
// 		return;
// 	}
// 	if (from.meta.refresh) {
// 		window.location.href = to.path;
// 		return;
// 	}
// 	next();
// });


export default router;
