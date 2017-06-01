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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.content-op{
	width:100%;
	height:50px;
	display:flex;
	.operation-item{
		flex:1;
		text-align:center;
		color:#ffffff;
		font-size:10px;
		.operation-icon{
			width:18px;
			height:18px;
			background-size:100% 100%;
			1border:1px solid red;
			margin:6px auto;
		}
		.collection-icon{
			background: url("../../../static/img/collection.png") center center no-repeat;
			background-size: 100% 100%;
		}
	    .share-icon{
			background: url("../../../static/img/share.png") center center no-repeat;
			background-size: 100% 100%;
		} 
		.comment-icon{
			background: url("../../../static/img/comment.png") center center no-repeat;
			background-size: 100% 100%;
		}
		.download-icon{
			background: url("../../../static/img/download.png") center center no-repeat;
			background-size: 100% 100%;
		}
	}
}

</style>