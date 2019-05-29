<template>
	<div class="mui-numbox" data-numbox-min='1'>
		<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
		<input ref="test" class="mui-input-numbox" type="number" value="1" @change="selectCount"/>
		<!-- <input class="mui-input-numbox" type="number" value="1" v-model="num" ref="test" /> -->
		<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
	</div>
</template>
<script>
	import mui from '../../lib/mui/js/mui.min.js'
	export default {
		data(){
			return {
				num: 1
			}
		},
		mounted(){
			mui('.mui-numbox').numbox()
		},
		methods: {
			selectCount(){
				this.$emit('getSelectCount', this.$refs.test.value)
			}
		},
		props: ['max'],
		watch: {
			'max': function(newVal, oldVal){
				mui('.mui-numbox').numbox().setOption('max', newVal)
			}
		}
	}
</script>
<style lang="scss" scoped></style>