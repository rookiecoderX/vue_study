<template>
	<div class="pad">
		<!-- 顶部 -->
		<mt-header fixed title="VUE">
			<span slot="left" @click="goBack" v-show="go_back_flag">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>
		
		<!-- render-view -->
		<transition name="toggle">
			<router-view></router-view>
		</transition>
		<!-- 底部 -->
		<nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item1" to="/home">
			<span class="mui-icon mui-icon-home"></span>
			<span class="mui-tab-label">首页</span>
		</router-link>
		<router-link class="mui-tab-item1" to="/member">
		<span class="mui-icon mui-icon-contact"></span>
		<span class="mui-tab-label">会员</span>
	</router-link>
	<router-link class="mui-tab-item1" to="/cart">
	<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{ $store.getters.getBadge }}</span></span>
	<span class="mui-tab-label">购物车</span>
</router-link>
<router-link class="mui-tab-item1" to="/search">
<span class="mui-icon mui-icon-search"></span>
<span class="mui-tab-label">搜索</span>
</router-link>
</nav>
</div>
</template>

<script>
	export default {
		data(){
			return {
				go_back_flag: true
			}
		},
		methods: {
			goBack(){
				this.$router.go(-1)
			}
		},
		created(){
			if(this.$route.path === '/home'){
				this.go_back_flag = false
			}
		},
		// 用watch监听路由变化
		watch: {
			'$route.path': function(newVal){
				if(newVal === '/home'){
					this.go_back_flag = false
				}else{
					this.go_back_flag = true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pad {
		padding: 40px 0 50px;
		overflow-x: hidden;

		
	}
	.toggle-enter {
		opaticy: 0;
		transform: translateX(100%);
	}
	.toggle-leave-to {
		opaticy: 0;
		transform: translateX(-100%);
		position: absolute;
	}
	.toggle-enter-active,
	.toggle-leave-active {
		transition: all .5s ease;
	}
	.mui-bar-tab .mui-tab-item1.mui-active {
		color: #007aff;
	}
	.mui-bar-tab .mui-tab-item1 {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}
	.mui-bar-tab .mui-tab-item1 .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}
	.mui-bar-tab .mui-tab-item1 .mui-icon ~ .mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}

</style>
