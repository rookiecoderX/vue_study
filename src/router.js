import VueRouter from 'vue-router'

import Home from './components/tabbar/home.vue'
import Cart from './components/tabbar/cart.vue'
import Member from './components/tabbar/member.vue'
import Search from './components/tabbar/search.vue'

var router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: Home },
		{ path: '/search', component: Search },
		{ path: '/cart', component: Cart },
		{ path: '/member', component: Member }
	],
	linkActiveClass: 'mui-active'
})
export default router