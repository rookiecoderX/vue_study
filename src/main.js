import Vue from 'vue'

// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'

// Vue.component(Header.name, Header)

// Vue.component(Swipe.name, Swipe)

// Vue.component(SwipeItem.name, SwipeItem)

// Vue.component(Button.name, Button)

// Vue.use(Lazyload)
import MintUI from 'mint-ui'

Vue.use(MintUI)

import '../node_modules/mint-ui/lib/style.css'

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
Vue.http.options.emulateJSON = true

import moment from 'moment'

Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss"){
	return moment(dateStr).format(pattern)
})

import VuePreview from 'vue-preview'

Vue.use(VuePreview)
var vm = new Vue({
	el: '#app',
	render: c =>c(app),
	router
})