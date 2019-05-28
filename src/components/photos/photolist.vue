<template>
	<div class="photo-container">
		<div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<a :class="['mui-control-item', item.id===0?'mui-active':'']" href="#item1mobile" v-for="item in cates" :key="item.id" @click="getphotoinfo(item.id)">
						{{ item.title }}
					</a>
				</div>
			</div>
		</div>

		<div class="photoinfo">
			<ul>
				<router-link v-for="item in photolist" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
					<img v-lazy="item.img_url">
					<div class="info">
						<div class="info-title"><h3>{{ item.title }}</h3></div>
						<div class="info-content">{{ item.zhaiyao }}</div>
					</div>
				</router-link>
			</ul>
		</div>
	</div>
</template>
<script>
	// 导入mui.js，配置滑动模块
	import mui from '../../lib/mui/js/mui.min.js'
	
	export default {
		data(){
			return {
				cates: [],
				photolist: []
			}
		},
		created(){
			this.getcates(),
			this.getphotoinfo(0)
		},
		mounted(){
			mui('.mui-scroll-wrapper').scroll({
				deceleration: 0.0005
		 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
		},
		methods: {
			getcates(){
				this.$http.get('api/getimgcategory')
				.then(result => {
					if(result.body.status===0){
						var cate = {
							title: '全部',
							id: 0
						}
						result.body.message.unshift(cate)
						
						this.cates = result.body.message
						
						
					}
				})
			},
			getphotoinfo(id){
				this.$http.get('api/getimages/'+id)
				.then(result => {
					if(result.body.status===0){
						this.photolist = result.body.message
						console.log(this.photolist);
					}
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	* {
		touch-action: pan-y;
		list-style: none;
	}
	.photo-container {
		background-color: #eee;
	}
	.mui-slider {
		position: fixed;
		
		background-color: #fff;
	}
	.photoinfo {
		padding-top: 35px;
		ul {
			margin: 0;
			padding: 10px;
			padding-bottom: 0;
			
			li {
				background-color: #ccc;
				margin-bottom: 10px;
				box-shadow: 0 0 9px #999;
				border-radius: 10px;
				overflow: hidden;
				text-align: center;
				position: relative;
				img[lazy="loading"] {
					width: 40px;
					height: 400px;
					margin: auto;
				}
				img {
					vertical-align: top;
					width: 100%;
				}
				.info {
					position: absolute;
					bottom: 0;
					background-color: rgba(0, 0, 0, 0.3);
					color: #fff;
					padding: 5px;
					max-height: 90px;
					h3 {
						width: 100%;
						font-size: 14px;
					}
					.info-content {
						width: 100%;
						font-size: 13px;
						text-align: left;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 3;
						overflow: hidden;
					}
				}
			}
		}
	}
</style>