<template>
	<div class="cmt-container">
		<h3>发表评论</h3>
		<hr>
		<textarea placeholder="请输入评论" maxlength="120" v-model="msg"></textarea>
		<mt-button type="primary" size="large" @click="postcomment">发表评论</mt-button>
		<div class="cmt-list">
			<div class="cmt-box" v-for="(item, index) in comments" :key="index">
				<div class="cmt-title">第{{ index+1 }}楼&nbsp&nbsp用户：{{ item.user_name }}&nbsp&nbsp发表时间：{{ item.add_time | dateFormat }}}</div>
				<div class="cmt-detail">{{ item.content==='undefined'?'这个人很懒，什么都没留下':item.content }}</div>
			</div>
		</div>
		<mt-button type="danger" size="large" plain @click="more">加载更多</mt-button>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui'
	export default {
		data(){
			return {
				comments: [],
				pageindex: 1,
				msg: ''
			}
		},
		created(){
			this.getcomments()
		},
		methods: {
			getcomments(){
				this.$http.get('api/getcomments/'+this.id+'?pageindex='+this.pageindex).then(result => {
					if(result.body.status===0){
						// this.comments = result.body.message
						// console.log(this.comments);
						this.comments = this.comments.concat(result.body.message)
					}else{
						Toast('获取失败')
					}
				})
			},
			more(){
				this.pageindex++
				this.getcomments()
			},
			postcomment(){
				if(this.msg.trim().length===0){
					return Toast('内容不能为空')
				}
				this.$http.post('api/postcomment/'+this.$route.params.id, { content: this.msg.trim() })
				.then(result => {
					if(result.body.status===0){
						var comment = {
							user_name: '匿名用户',
							add_time: Date.now(),
							content: this.msg.trim()
						}
						this.comments.unshift(comment)
						this.msg = ''
					}

				})
			}
		},
		props: ['id']
	}
</script>
<style lang="scss" scoped>
	.cmt-container {
		h3 {
			font-size: 20px;
		}
		textarea {
			height: 85px;
			margin: 0;
			margin-bottom: 10px;
		}
		.cmt-list {

			.cmt-title {
				margin: 5px 0;
				background-color: #ccc;
				font-size: 14px;
			}
			.cmt-detail {
				text-indent: 2em;
				margin: 10px 0;
				font-size: 16px;
			}
		}
	}

</style>