<template>
	<div class="goodsinfo-container">
		<transition
		@before-enter="beforeEnter"
		@enter="enter"
		@after-enter="afterEnter"
		>
		<div class="ball" v-show="ballFlag" ref="ball"></div>
	</transition>
	<div class="mui-card">
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<swipe :lunbotulist="lunbotulist" isfunn="false"></swipe>
			</div>
		</div>
	</div>
	<div class="mui-card main">
		<div class="mui-card-header">{{ goodsinfo.title }}</div>
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<div class="price">
					<span class="market-price">
						市场价：<del>￥{{ goodsinfo.market_price}}</del>
					</span>
					<span class="sale-price">
						销售价：<span>￥{{ goodsinfo.sell_price }}</span>
					</span>
				</div>
				<div class="shuliang">购买数量：<numbox @getSelectCount="getSelectCount	" :max="goodsinfo.stock_quantity"></numbox></div>
				<div class="choice">
					<mt-button type="primary" size="small">立即购买</mt-button>
					<mt-button type="danger" size="small" @click="addCart">加入购物车</mt-button>
				</div>
			</div>
		</div>
	</div>
	<div class="mui-card footer">
		<div class="mui-card-header">商品参数</div>
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<div class="huohao">商品货号：{{ goodsinfo.goods_no}}</div>
				<div class="kucun">库存情况：{{ goodsinfo.stock_quantity }}</div>
				<div class="shangjia">上架时间：{{ goodsinfo.add_time | dateFormat }}</div>
			</div>
		</div>
		<div class="mui-card-footer">
			<mt-button type="primary" size="large" plain @click="getDesc(id)">图文介绍</mt-button>

			<mt-button type="danger" size="large" plain @click="getComment(id)">商品评论</mt-button>
		</div>
	</div>
</div>


</template>
<script>
	import swipe from '../subcomponent/swipe.vue'
	import numbox from '../subcomponent/goodsinfo-numbox.vue'
	export default {
		data(){
			return { 
				id: this.$route.params.id,
				lunbotulist: [],
				goodsinfo: {},
				ballFlag: false,
				clickFlag: true,
				selectCount: 1
			}
		},
		created(){
			this.getlunbo(),
			this.getgoodsinfo()
		},
		methods: {
			getlunbo(){
				this.$http.get('api/getthumimages/'+this.id)
				.then(result => {
					if(result.body.status === 0){
						this.lunbotulist = result.body.message
						// console.log(result.body.message)
					}
				})
			},
			getgoodsinfo(){
				this.$http.get('api/goods/getinfo/'+this.id)
				.then(result => {
					if(result.body.status === 0){
						// console.log(result.body.message);
						this.goodsinfo = result.body.message[0]

					}
				})
			},

			// 图文介绍
			getDesc(id){
				this.$router.push({ name: 'goodsDesc', params: { id }})
			},

			// 评论
			getComment(id){
				this.$router.push({ name: 'goodsComment', params: { id }})
			},

			// 加入购物车
			addCart(){
				// this.ballFlag = true
				var goodsinfo = {
					id: this.id,
					count: this.selectCount,
					price: this.goodsinfo.sell_price,
					selected: true
				}
				if(this.clickFlag === true){
					this.clickFlag = false
					this.ballFlag = true
					this.$store.commit('addCart', goodsinfo)
					setTimeout(() => {
						this.clickFlag = true
						}, 1000)
				}else{
					return
				}	
			},

			// 小球动画
			beforeEnter(el){
				el.style.transform='translate(0, 0)'
			},
			enter(el, done){
				el.offsetWidth
				const ballPosition = this.$refs.ball.getBoundingClientRect()
				const badgePosition = document.getElementById('badge').getBoundingClientRect()
				const xDist = badgePosition.left - ballPosition.left
				const yDist = badgePosition.top - ballPosition.top
				console.log(xDist, yDist);
				el.style.transform = `translate(${xDist}px, ${yDist}px)`
				el.style.transition = 'all 0.5s cubic-bezier(.4, -0.3, .8, .68)'
				done()
			},
			afterEnter(el){
				this.ballFlag = false
			},

			// 获取子组件numbox的值
			getSelectCount(num){
				this.selectCount = num
				console.log(this.selectCount);
			}
		},

		components: {
			swipe,
			numbox
		}
	}
</script>

<style lang="scss" scoped>
	.goodsinfo-container {
		min-height: 500px;
		background-color: #eee;
		overflow: hidden;
		.ball {
			width: 15px;
			height: 15px;
			background-color: red;
			border-radius: 50%;
			position: absolute;
			top: 410px;
			left: 150px;
			z-index: 10;
			/*transform: translate(100px, 100px);*/
		}
	}
	.main {
		.mui-card-header {
			font-size: 20px;
		}
		.mui-card-content {
			.price {
				margin-bottom: 10px;
				.market-price {
					margin-right: 15px;

					del {
						font-size: 12px;
					}
				}
				.sale-price {
					span {
						font-size: 18px;
						color: red;
					}
				}
			}
			.shuliang {
				margin-bottom: 10px;
			}
		}
	}
	.footer {
		.mui-card-content-inner {
			div {
				margin-bottom: 10px;
				color: #A2A5A1;
			}
		}
		.mui-card-footer {
			display: block;
			button {
				margin: 15px 0;
			}
		}
	}

</style>