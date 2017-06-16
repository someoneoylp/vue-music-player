<template>
		<div class="music-nav">
				<router-link 
					:to="{name:'recommend',query:{key:1.1}}" 
					class="recommend" 
					:class="{'isActive':musicNavIsActive==1}" exact>
						音乐列表
				</router-link>
				<router-link 
				:to="{name:'rankingList',query:{key:1.2}}" 
				class="ranking-list" 
				:class="{'isActive':musicNavIsActive==2}" exact>
					排行榜
				</router-link>
		</div>
	<!--  -->
</template>

<script>
import {mapState} from 'vuex'
export default {
	computed:{
		...mapState({
			musicNavIsActive:state=>state.musicNavIsActive
		})
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.music-nav{
	display: flex;
	height: 35px;
	background: #FCFDFD;
	.recommend,.ranking-list{
		flex: 1;
		text-align: center;
		line-height: 35px;
		font-size: 14px;
		cursor: pointer;
		box-sizing:border-box;
		1transition: all .3s;
	}	
	.router-link-active,.isActive{
		color: #B72712;
		display: block;
		border-bottom: 2px solid #B72712;
	}
}
</style>