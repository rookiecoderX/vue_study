import VueRouter from 'vue-router'

import Home from './components/tabbar/home.vue'
import Cart from './components/tabbar/cart.vue'
import Member from './components/tabbar/member.vue'
import Search from './components/tabbar/search.vue'
import News from './components/news/newslist.vue'
import Newsinfo from './components/news/newsinfo.vue'
var router = new VueRouter({
	routes: [
		{ path: '/', redirect: '/home' },
		{ path: '/home', component: Home },
		{ path: '/search', component: Search },
		{ path: '/cart', component: Cart },
		{ path: '/member', component: Member },
		{ path: '/home/newslist', component: News },
		{ path: '/home/newsinfo/:id', component: Newsinfo }
	],
	linkActiveClass: 'mui-active'
})
export default router