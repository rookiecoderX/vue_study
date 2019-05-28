<template>
	<mt-swipe :auto="0">
		<mt-swipe-item v-for="item in lunbotulist" :key="item.img">
			<a :href="item.url"><img :src="item.img||item.src" alt="" :class="{ full: isfull }"></a>
		</mt-swipe-item>
	</mt-swipe>
</template>
<script>
	export default {
		props: ['lunbotulist', 'isfull']
	}
</script>
<style lang="scss" scoped>
	.mint-swipe {
		text-align: center;
		height: 200px;
		.mint-swipe-item {
			a {
				display: block;
				width: 100%;
				height: 100%;
				img {
					height: 100%;
				}

			}
		}
	}
	.full {
		 width: 100%;
	}
</style>