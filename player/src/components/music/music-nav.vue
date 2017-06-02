<template>
		<div class="music-nav">
			<div class="recommend" :class="{'isActive':musicIsActive}" @click="change(true)">
				<router-link :to="{name:'recommend',query:{key:1.1}}">音乐列表</router-link>
			</div>
			<div class="ranking-list" :class="{'isActive':!musicIsActive}" @click="change(false)">
				<router-link :to="{name:'rankingList',query:{key:1.2}}">排行榜</router-link>
			</div>
		</div>
	<!--  -->
</template>

<script>
import {mapState} from 'vuex'
export default {
	data(){
		return {
			isaActive:true,
			isbactive:false
		}
	},
	computed:{
		...mapState({
			musicIsActive:state=>state.musicIsActive
		})
	},
	methods:{
		change:function(a){
			this.$store.state.musicIsActive = !this.$store.state.musicIsActive
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.music-nav{
	display: flex;
	height: 35px;
	background: #FCFDFD;
}
.recommend,.ranking-list{
	flex: 1;
	text-align: center;
	line-height: 35px;
	font-size: 14px;
	cursor: pointer;
	box-sizing:border-box;
	1transition: all .3s;
}
.isActive{
	border-bottom: 2px solid #B72712;
}
.isActive a{
	color: #B72712;
}
</style>