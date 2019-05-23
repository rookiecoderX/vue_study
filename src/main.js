import Vue from 'vue'

import { Header, Swipe, SwipeItem, Button } from 'mint-ui'

Vue.component(Header.name, Header)

Vue.component(Swipe.name, Swipe)

Vue.component(SwipeItem.name, SwipeItem)

Vue.component(Button.name, Button)

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
Vue.http.options.root = 'http://www.liulongbin.top:3005'

import moment from 'moment'

Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(dateStr).format(pattern)
})

var vm = new Vue({
	el: '#app',
	render: c =>c(app),
	router
})