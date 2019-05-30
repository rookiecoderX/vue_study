<template>
	<div class="mui-numbox" data-numbox-min='1' >
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input ref="test" class="mui-input-numbox" type="number" :value="count" readonly @change="countchange" />
		<!-- <input class="mui-input-numbox" type="number" value="1" v-model="num" ref="test" /> -->
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		data(){
			return {
			}
		},
		mounted(){
			mui('.mui-numbox').numbox()
		},
		methods: {
			countchange(){
				console.log(this.id);
				this.$store.commit('updateCount', { 
					id: this.id, 
					count: this.$refs.test.value })
			}
		},
		props: ['count', 'id'],
		
	}
</script>
<style lang="scss" scoped>
	.mui-numbox {
		height: 25px;
		margin: 0 5px;
	}
</style>