<template>
	<!-- 内容操作组件 -->
	<div class="content-op">
		<span class="operation-item">
			<p class="collection-icon operation-icon"></p>
			<p>{{opNum[0].collectionNum}}</p>
		</span>
		<span class="operation-item">
			<p class="comment-icon operation-icon"></p>
			<p>{{opNum[0].commentNum}}</p>
		</span>
		<span class="operation-item">
			<p class="share-icon operation-icon"></p>
			<p>{{opNum[0].shareNum}}</p>
		</span>
		<span class="operation-item">
			<p class="download-icon operation-icon"></p>
			<p>下载</p>
		</span>
	</div>
</template>

<script>
const opNum = [
	{collectionNum:1033,
	commentNum:90,
	shareNum:13}
]
export default {
	data(){
		return {
			opNum:opNum
		}
	}
}
</script>
<style lang="less">
	@import '../../../static/css/music.less';
</style>