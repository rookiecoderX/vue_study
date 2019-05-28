<template>
	<div class="goodslist-container">
		<div class="goodsitem" v-for="item in goodslist" :key="item.id" @click="getinfo(item.id)">
				<img :src="item.img_url" alt="">
				<div class="title"><h3>{{ item.title }}</h3></div>
				<div class="info">

					<div class="price">
						<span class="new">￥{{ item.sell_price}}</span>
						<span class="old">￥{{ item.market_price }}</span>
					</div>
					<div class="remai">
						<span class="zhaungtai">热卖中</span>
						<span class="shengyu">剩{{ item.stock_quantity }}件</span>
					</div>
				</div>
		</div>
		<mt-button type="danger" size="large" @click="getmore">加载更多</mt-button>

	</div>
</template>
<script>
	export default {
		data(){
			return {
				goodslist: [],
				pageindex: 1
			}
		},
		created(){
			this.getgoodslist()
		},
		methods: {
			getgoodslist(){
				this.$http.get('api/getgoods?pageindex='+this.pageindex)
				.then(result => {
					if(result.body.status === 0){
						this.goodslist = this.goodslist.concat(result.body.message)
					}
				})
			},
			getmore(){
				this.pageindex++
				this.getgoodslist()
			},
			getinfo(id){
				console.log('hahah');
				// 编程式导航的四种方法
				// 1. this.$router.push('/home/goodsinfo/'+id)
				// 2. this.$router.push({ path: '/home/goodsinfo/'+id})
				// 3. this.$router.push({
				// 	name: 'goodsinfo', 
				// 	params: { id }
				// })
				// 4. this.$router.push({
				// 	path: '/home/goodsinfo/',
				// 	query: { id }

				// })
				this.$router.push({
				 	name: 'goodsinfo', 
				 	params: { id }
				 })
			}
		}
	}
</script>
<style lang="scss" scoped>
	.goodslist-container {
		display: flex;
		flex-wrap: wrap;
		padding: 5px;
		justify-content: space-between;

		.goodsitem {
			margin: 5px 0;
			padding: 3px;
			border: 1px solid #ccc;
			box-shadow: 0 0 8px #ccc;
			width: 49%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			min-height: 293px;
			img {
				width:100%;
			}
			.title {
				h3 {
					font-size: 14px;
					line-height: 16px;
				}
			}
			.info {
				background: rgba(0, 0, 0, 0.1);
				padding: 5px;
				margin: 0 -3px -3px;
				color: #ACAEAD;
				.price {
					margin: 5px 0;
					.new {
						font-size: 18px;
						color: red;
						margin-right: 10px;
					}
					.old {
						font-size: 12px;
						text-decoration: line-through;
					}
				}
				.remai {
					font-size: 14px;
					display: flex;
					justify-content: space-between;
				}

			}
		}
	}
</style>
