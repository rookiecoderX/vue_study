import Vue from 'vue'

import { Header, Swipe, SwipeItem } from 'mint-ui'

Vue.component(Header.name, Header)

Vue.component(Swipe.name, Swipe)

Vue.component(SwipeItem.name, SwipeItem)

//导入路由模块
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import router from './router.js'



import app from './App.vue'


import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

// vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

var vm = new Vue({
	el: '#app',
	render: c =>c(app),
	router
})