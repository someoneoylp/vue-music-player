<template>
	<!-- 内容操作组件 -->
	<div class="content-op">
		<span class="operation-item">
			<p class="collection-icon operation-icon"></p>
			<p>{{subCount}}</p>
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
	props:[
		'subscribedCount',//订阅数目
		'commentCount',//评论数目
		'shareCount'//分享数目
	],
	computed:{
		subCount(){
			var subCount = this.subscribedCount;
			//1万以上才以万为单位
			if(subCount>10000){
				subCount = subCount.toString();
				return subCount.slice(0,-4)+'.'+ subCount.slice(-4,-3)+'万';
			}else{
				return subCount;
			}	
		}
		
	}
	
}
</script>
<style lang="less">
	@import '../../../static/css/music.less';
</style>