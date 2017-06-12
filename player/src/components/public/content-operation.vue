<template>
	<!-- 内容操作组件 -->
	<div class="content-op">
		<span class="operation-item">
			<p class="collection-icon operation-icon"></p>
			<p>{{subscribedCount}}</p>
		</span>
		<span class="operation-item">
			<p class="comment-icon operation-icon"></p>
			<p>{{commentCount}}</p>
		</span>
		<span class="operation-item">
			<p class="share-icon operation-icon"></p>
			<p>{{shareCount}}</p>
		</span>
		<span class="operation-item">
			<p class="download-icon operation-icon"></p>
			<p>下载</p>
		</span>
	</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
	computed:{
		...mapState({
			subscribedCount:state=>state.subscribedCount,
			commentCount:state=>state.commentCount,
			shareCount:state=>state.shareCount
		})	
	}
	
}
</script>
<style lang="less">
	@import '../../../static/css/music.less';
</style>