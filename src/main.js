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

import Vuex from 'vuex'

Vue.use(Vuex)

let cart = JSON.parse(localStorage.getItem('car')||'[]')
console.log(localStorage.getItem('car'));
var store = new Vuex.Store({
	state: {
		cart
	},
	mutations: {
		addCart(state, goodsinfo){
			var flag = state.cart.some((item) => {
				if(item.id ==goodsinfo.id){
					item.count += parseInt(goodsinfo.count)
					return true
				}
			})
			if(!flag){
				state.cart.push(goodsinfo)
			}
			localStorage.setItem('car', JSON.stringify(state.cart))
			// console.log(state.cart)
		},
		updateCount(state, countInfo){
			state.cart.some(item => {
				if(item.id == countInfo.id){
					item.count =parseInt(countInfo.count)
					return true
				}
			})
			localStorage.setItem('car', JSON.stringify(state.cart))
		},
		removeCart(state, id){
			state.cart.some((item, index) => {
				if(item.id == id){
					state.cart.splice(index, 1)
					return true
				}
			})
			localStorage.setItem('car', JSON.stringify(state.cart))
		}
	},
	getters: {
		getBadge: function(state){
			var sum = 0
			state.cart.forEach((item) => {
				sum += parseInt(item.count)
			})
			return sum
		},
		getCount: function(state){
			var zidian = {}
			state.cart.forEach(item => {
				zidian[item.id] = item.count
			})
			return zidian
		},
		getSelected: function(state){
			var selected = {}
			state.cart.forEach(item => {
				selected[item.id] = item.selected
			})
			return selected
		},
		getTotal: function(state){
			var sum = 0
			state.cart.forEach(item => {
				if(item.selected === true){
					sum += parseInt(item.count)
				}
			})
			return sum
		},
		getPrice: function(state){
			var price = 0
			state.cart.forEach(item => {
				if(item.selected === true){
					price += item.count*item.price
				}
			})
			return price
		}
	}
})

Vue.use(VuePreview)
var vm = new Vue({
	el: '#app',
	render: c =>c(app),
	router,
	store
})