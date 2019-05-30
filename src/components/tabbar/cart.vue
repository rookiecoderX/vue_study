<template>
	<div class="cart-container">
		<div class="cart-list">
			<div class="mui-card"  v-for="(item, index) in cart_list" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner" >

						<mt-switch @change="getchanged(item.id, $store.getters.getSelected[item.id])" v-model="$store.getters.getSelected[item.id]"></mt-switch>

						
						<img :src="item.thumb_path" >
	

						<div class="info">
							<h3>{{ item.title }}</h3>
							<div class="option">
								<span class="price">￥{{ item.sell_price}}</span>
								<cartnumbox :count="$store.getters.getCount[item.id]" :id="item.id"></cartnumbox>
								<span><a href="#" @click.prevent="remove(item.id,index)">删除</a></span>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
		<listnone v-show="flag"></listnone>
		<div class="result-list">
			<div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="total">
							<p>总计（不含运费）</p>
							<p>已勾选<span class="total-num">{{ $store.getters.getTotal }}</span>件，总价：<span class="total-price">￥{{ $store.getters.getPrice }}</span></p>
						</div>
						<mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>

	import cartnumbox from '../subcomponent/cart-numbox.vue'
	import listnone from '../subcomponent/list-none.vue'
	export default {
		data(){
			return {
				cart_list: [],
				flag: false
			}
		},
		created(){
			this.getCartList()
			
		},
		methods: {
			getCartList(){
				var idArr = []
				if(this.$store.state.cart.length === 0){
					this.listnoneshow()
					return
				} 
				this.$store.state.cart.forEach(item => {
					idArr.push(item.id)
				})
				this.$http.get('api/goods/getshopcarlist/'+idArr.join(','))
				.then(result => {
					if(result.body.status === 0){
						this.cart_list = result.body.message
						// console.log(this.cart_list)
					}
				})
			},
			remove(id, index){
				this.cart_list.splice(index, 1)
				this.$store.commit('removeCart', id)
				this.listnoneshow()
			},
			listnoneshow(){
				if(this.cart_list.length == 0){
					this.flag = true
				}else{
					this.flag = false
				}
			},
			getchanged(id, selected){
				this.$store.state.cart.some(item => {
					if(item.id == id){
						item.selected = selected
					}
				})
				localStorage.setItem('car', JSON.stringify(this.$store.state.cart))
			}
		},
		components: {
			cartnumbox,
			listnone
		}
	}
</script>
<style lang="scss" scoped>
	.cart-list {
		background-color: #eee;
		overflow: hidden;
		.mui-card-content-inner {
			display: flex;
			align-items: center;
			justify-content: space-between;
			img {
				width: 50px;
				height: 50px;
				flex-shrink: 0;

			}
			.info {
				width: 250px;
				margin-left: 10px;
				h3 {
					font-size: 13px;
					margin-bottom: 10px;
				}
				.option {
					display: flex;
					justify-content: space-between;
				}
				.price {
					color: red;
				}
			}
		}
	}
	.result-list {
		.mui-card-content-inner {
			display:flex;
			justify-content: space-between;
			align-items: center;
			.total {
				span {
					color: red;
					font-size: 18px;
					margin: 5px;
				}
			}
		}
	}
</style>