<template>
	<div>
		<div class="rankingEachPage" :style="{backgroundColor:this.$route.params.bgColor}">
			<div class="list-info-header" :class="{scrollFixed:scrollToBelow}" :style="{backgroundColor:this.$route.params.bgColor}">
				<router-link @click.native="init()" to="/music/rankingList" class="back">
				</router-link>
				<span class="music-title">
					<span>歌单</span>
				</span>
				<span class="list-more" @click="">
					<i></i>
					<i></i>
					<i></i>
				</span>
				<span class="search"></span>
			</div>
			<div class="desc">
				<ul>
					<li>云音乐</li>
					<li>{{this.$route.params.name}}</li>
					<li>最近更新<span>{{this.$route.params.date}}</span></li>
				</ul>
			</div>
			<contentOp></contentOp>
		</div>
		<musicList></musicList>
	</div>	
</template>
<script>
import contentOp from "../public/content-operation.vue"
import musicList from "../public/music-list.vue"
import {mapState} from "vuex"
export default{
	components:{
		contentOp,
		musicList
	},
	computed:{
		...mapState({
			hidNav:state=>state.hidNav,
			scrollToBelow:state=>state.scrollToBelow
		}),
		hidNav(){
			return this.$route.params.hidNav;
		}
	},
	methods:{
		init:function(){
			this.$store.state.hidNav = true
		},
		getScroll:function(){
			this.scroll = document.body.scrollTop
			if(this.scroll>=30){
				this.$store.state.scrollToBelow = true
			}else{
				this.$store.state.scrollToBelow = false
			}	
		}
	},
	mounted(){
		window.addEventListener('scroll',this.getScroll)
	}
}
</script>
<style lang="less">
@import '../../../static/css/music.less';
.rankingEachPage{
	background-color: #ddd;
	.list-info-header{
		.back{
			display:inline-block;
			width:30px;
			height:35px;
			background:url("../../../static/img/back.png") center center no-repeat;
			background-size:80% 80%;
			vertical-align:middle;
		}
		.music-title{
			font-size:16px;
			color:#ffffff;
		}
		.search{
			float:right;
			width:35px;
			height:35px;
			background:url("../../../static/img/search.png") center center no-repeat;
			background-size:60% 60%;
			vertical-align:middle;
		}
		.list-more{
			float:right;
			width:30px;
			height:35px;
			clear:right;
			text-align: center;
		    padding-top: 3%;
		    i{
				display:block;
				float:right;
				clear:both;
				width:2px;
				height:2px;
				border:1px solid #FFFFFF;
				background:#FFFFFF;
				border-radius:2px;
				margin: 0px 15px 2px 0;
			}
		}	
	}
	.scrollFixed{
		position: fixed;
		top:0;
		left: 0;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.2);
	}
	.desc{
		margin-left: 30px;
		color: #fff;
		li{
			padding: 5px 0;
		}
		li:nth-child(1){
			font-size: 18px;
		}
		li:nth-child(2){
			font-size: 35px;
		}
		li:nth-child(3){
			font-size: 15px;
		}
	}
}
</style>