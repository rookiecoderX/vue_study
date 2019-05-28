<template>
	<div class="goodsinfo-container">
		<div class="mui-card">
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<swipe :lunbotulist="lunbotulist" isfunn="false"></swipe>
				</div>
			</div>
		</div>
		<div class="mui-card main">
			<div class="mui-card-header">标题</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="price">
						<span class="market-price">
							市场价：<del>￥2699</del>
						</span>
						<span class="sale-price">
							销售价：<span>￥2199</span>
						</span>
					</div>
					<div class="shuliang">购买数量：<numbox></numbox></div>
					<div class="choice">
						<mt-button type="primary" size="small">立即购买</mt-button>
						<mt-button type="danger" size="small">加入购物车</mt-button>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-card footer">
			<div class="mui-card-header">商品参数</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<div class="huohao">商品货号：xxxxxx</div>
					<div class="kucun">库存情况：xxxx</div>
					<div class="shangjia">上架时间：xxx</div>
				</div>
			</div>
			<div class="mui-card-footer">
				<mt-button type="primary" size="large" plain>图文介绍</mt-button>

				<mt-button type="danger" size="large" plain>商品评论</mt-button>
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
				lunbotulist: []
			}
		},
		created(){
			this.getlunbo()
		},
		methods: {
			getlunbo(){
				this.$http.get('api/getthumimages/'+this.id)
				.then(result => {
					if(result.body.status === 0){
						this.lunbotulist = result.body.message
						console.log(result.body.message)
					}
				})
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
		background-color: #eee;
		overflow: hidden;
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