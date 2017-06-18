<template>
	<div>
		<div class="rankingEachPage" :style="{backgroundImage:'url('+coverImgUrl+')'}">
			<div class="list-info-header" :class="{scrollFixed:scrollToBelow}" :style="{backgroundImage:'url('+coverImgUrl+')'}">
				<a @click="init()" class="back"></a>
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
					<li>{{name}}</li>
					<li>最近更新<span>{{date}}</span></li>
				</ul>
			</div>
			<contentOp :subscribedCount='subscribedCount' :commentCount='commentCount' :shareCount='shareCount'></contentOp>
		</div>
		<musicList :trackCount='trackCount'></musicList>
	</div>	
</template>
<script>
import api from '../../api'
import axios from 'axios'
import contentOp from "../public/content-operation.vue"
import musicList from "../public/music-list.vue"
import {mapState,mapMutations} from "vuex"
export default{
	data(){
		return{
			id:this.$route.params.id,
			coverImgUrl:'',
			date:'',
			rankingListName:'',//歌单名字
			subscribedCount:0,//订阅数目
			commentCount:0, //评论数目
			shareCount:0, //分享数目
			trackCount:0 //歌单内歌曲数目
		}
	},
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
		},
		name(){
			var name = this.rankingListName;
			if(name.slice(0,3)=="云音乐"){
				return name.slice(3);
			}else if(name.slice(0,2)=="网易"){
				return name.slice(2);
			}else{
				return name;
			}
		}
	},
	mounted:function(){
		this.getTopListResource();
		this.$store.commit('getScroll');
	},
	methods:{
		...mapMutations([
			'getScroll'
		]),
		init:function(){
			this.$store.state.hidNav = true;
			this.$router.go(-1);
		},
		getTopListResource: function(){
			api.getTopListResource(this.id).then((response)=>{
				//复用的组件的数据
				this.$store.state.musicLists = response.data.result.tracks;
				this.subscribedCount= response.data.result.subscribedCount;
				this.commentCount = response.data.result.commentCount;
				this.shareCount = response.data.result.shareCount;
				this.trackCount = response.data.result.trackCount;
				//其他非组件的数据
				this.rankingListName = response.data.result.name;
				this.coverImgUrl = response.data.result.coverImgUrl;
				var date = new Date();
				this.date = date.getMonth() +'月'+date.getDay()+'日';
			}).catch((error) => {
        console.log('加载歌单信息出错:' + error);
      });
		}
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
		height: 35px;
		background-color: rgba(0, 0, 0, 0.2);
	}
	.desc{
		margin: 30px 0 30px 30px;
		color: #fff;
		.coverimg{
			height: 100px;
		}
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