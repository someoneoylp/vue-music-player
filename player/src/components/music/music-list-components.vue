<template>
	<transition name="fade">
		<div>
			<div class="music-list-info-cover" v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}">
				
			</div>
			<div class="music-list-info">
				<div class="list-info-header">
					<router-link @click.native="init()" to="/" class="back">
					</router-link>
					<span class="music-title">
						<span v-if="">歌单</span>
					</span>
					<span class="list-more" @click="">
						<i></i>
						<i></i>
						<i></i>
					</span>
					<span class="search"></span>
				</div>
				<div class="list-info-content">
					<div class="list-detail">
						<div class="name-detail">
							<div v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}" class="imgBox">
								<p class="music-num"><i class="music-num-icon"></i>{{playCount}}</p>
								<i class="tips"></i>
							</div>
						</div>
						<div class="tit">
							<h2>{{name}}</h2>
							<p class="list-author"><i class="user-pic" :style="{backgroundImage:'url(' + avatarUrl + ')'}">	</i>{{nickname}} <i class="go"></i></p>
						</div>
					</div>
					<div class="list-operation">
						<contentOp></contentOp>
					</div>
				</div>
			</div>
			
			<div class="list-content">
				 <musicList></musicList> 
			</div>
		</div>
	</transition>
	
</template>

<script>
import contentOp from ".././public/content-operation.vue"
import musicList from ".././public/music-list.vue"
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
import api from '../../api/index'


export default {
	data(){
		return {
			id:this.$route.params.id
		}
	},
	components:{
		contentOp,
		musicList
	},
	computed:{
		...mapState({
			hidNav: state => state.hidNav,
			recoListId: state => state.recoListId,
			subscribedCount:state=>state.subscribedCount,
			commentCount:state=>state.commentCount,
			shareCount:state=>state.shareCount,
			musicLists:state=>state.musicLists,
			name:state=>state.name,
			nickname:state=>state.nickname,
			coverImgUrl:state=>state.coverImgUrl,
			avatarUrl:state=>state.avatarUrl,
			trackCount:state=>state.trackCount,
			playCount:state =>state.playCount
		})
	},
 	mounted:function () {
		this.getPlayList()
		this.$store.state.songListID = this.id
		console.log("执行"+this.$store.state.songListID)
	},
	methods:{
    	init:function(){
			this.$store.state.hidNav = true
		},
		getPlayList(){
			api.getPlayListDeatil(this.id)
			.then((response)=>{
				
				this.$store.state.musicLists = response.data.result.tracks
				this.$store.state.subscribedCount = response.data.result.subscribedCount
				this.$store.state.commentCount = response.data.result.commentCount
				this.$store.state.shareCount = response.data.result.shareCount
				this.$store.state.nickname = response.data.result.creator.nickname
				this.$store.state.name = response.data.result.name
				this.$store.state.coverImgUrl = response.data.result.coverImgUrl
				this.$store.state.avatarUrl=response.data.result.creator.avatarUrl
				this.$store.state.playCount = response.data.result.playCount
				if(this.$store.state.playCount>9999){
					this.$store.state.playCount = this.$store.state.playCount.toString().slice(0,2)+'万'
				} 
				this.$store.state.trackCount = response.data.result.tracks.length
			})
		}
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.music-list-info{
	position:relative;
	width:100%;
	z-index:2;
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
.list-info-content{
	height:180px;
	
	.list-detail{
		display:flex;
		width:90%;
		height:120px;
		padding:0 0 0 5%;
		.name-detail{
			flex:1;
			.imgBox{
				width:110px;
				height:110px;
				background-size:100% 100%;
				overflow:hidden;
				.music-num{
					width: 44%;
					height: 18px;
					float: right;
					line-height: 18px;
					font-size: 12px;
					color: #ffffff;
					background:rgba(0, 0, 0, 0.17);
					.music-num-icon{
						display: inline-block;
						width: 10px;
						height: 10px;
						margin: 0 4px;
						background:url(../../assets/Headset.png) left center no-repeat;
						background-size:100% 100%;
					}
				}
				.tips{
					display: inline-block;
					margin:90px 0 0 4px;
					width: 15px;
					height: 15px;
					background:url(../../../static/img/tips.png) left center no-repeat;
					background-size:100% 100%;
				}
			}
		}
		.tit{
			flex:3;
			padding: 10px 4px 0 6px;
			font-size:15px;
			color:#ffffff;
			.list-author{
				margin-top:20px;
				font-size:12px;
				.user-pic{
					display:inline-block;
					width:20px;
					height:20px;
					border-radius:20px;
					margin-right:4px;
					background-size:100% 100%;
					vertical-align:middle;
				}
				.go{
					display:inline-block;
					width:10px;
					height:10px;
					background:url(../../../static/img/go.png) left center no-repeat;
					background-size:100% 100%;
				}
			}
		}
	}
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.music-list-info-cover{
	position:absolute;
		width:100%;
		height:205px;
		background-size:100% 100%;
		-webkit-filter: blur(50px); 
	    -moz-filter: blur(50px);
	    -ms-filter: blur(50px);    
	    filter: blur(50px);
	    z-index:1;
}
</style>