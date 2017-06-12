<template>
	<div class="music-content">
		<!-- 轮播图部分 -->
		<div class="carousel-figure">
			<div class="carousel-figure-pic">
				<transition-group tag="ul" class='slide-ul pic-ul' name="list" :style="{width:winWidth*pic.length+'px',left:winWidth*n+'px'}">
					<li v-for="(img,index) in pic" :key="index" class="pic-list" :style="{width:winWidth+'px'}">
						<img :src="img" alt="" class="pic-item" :style="{width:winWidth+'px'}">
					</li>
				</transition-group>
				<div class="carousel-items">
				   <span v-for="(item,index) in pic.length" @click="change(index)" :class="index == -n?'carousel-active':''"></span>
				</div>
			</div>
		</div>
		<!-- 推荐音乐列表部分 -->
		<div class="music-list-content">
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="recommend-icon"></i>推荐歌单</p>
				<div class="music-list-item" v-for="musicList in musicLists"> 
					<div class="imgWrap">
						<router-link @click.native="init()" to="/musicList" class="imgWrap" v-bind:style="{backgroundImage:'url(' + musicList.picUrl + ')'}">
							<p class="music-num"><i class="music-num-icon"></i> {{musicList.playCount}}</p>
							<p class="music-user"><i class="music-user-icon"></i>{{musicList.author}}</p>
						</router-link> 
					</div>
					<p class="music-des">{{musicList.name}} </p>
				</div>
			</div>
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="sole-icon"></i>独家放送</p>
				<div class="music-list-item-sole" v-for="(soleList,index) in soleLists" v-if="index>0"> 	<div class="imgWrap">
						<router-link @click.native="init()" to="/musicList" class="imgWrap" v-bind:style="{backgroundImage:'url(' + soleList.picUrl + ')'}">
							
						</router-link> 
					</div>
					<p class="music-des">{{soleList.name}} </p>
				</div>
				<div class="music-list-item sole-bottom"> 
					<div class="imgWrap">
						<router-link @click.native="init()" to="/musicList" class="imgWrap" v-bind:style="{backgroundImage:'url(' + soleLists[0].picUrl + ')'}">
							
						</router-link> 
					</div>
					<p class="music-des">{{soleLists[0].name}} </p>
				</div>
			</div>
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="news-icon"></i>最新音乐</p>
				<div class="music-list-item" v-for="musicList in musicLists"> 
					<div class="imgWrap">
						<router-link @click.native="init()" to="/musicList" class="imgWrap" v-bind:style="{backgroundImage:'url(' + musicList.picUrl + ')'}">
							<p class="music-num"><i class="music-num-icon"></i> {{musicList.playCount}}</p>
							<p class="music-user"><i class="music-user-icon"></i>{{musicList.author}}</p>
						</router-link> 
					</div>
					<p class="music-des">{{musicList.name}} </p>
				</div>
			</div>
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="mv-icon"></i>推荐MV</p>
				<div class="music-list-item recoMv" v-for="recoMvList in recoMvLists"> 
					<div class="imgWrap">
						<router-link @click.native="init()" to="/musicList" class="imgWrap" v-bind:style="{backgroundImage:'url(' + recoMvList.picUrl + ')'}">
							<p class="music-num"><i class="music-num-icon"></i> {{recoMvList.playCount}}</p>
						</router-link> 
					</div>
					<p class="music-des">{{recoMvList.name}} </p>
				</div>
			</div>
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="station-icon"></i>主播电台</p>
				<div class="music-list-item" v-for="stationList in stationLists"> 
					<div class="imgWrap">
						<router-link @click.native="init()" to="/musicList" class="imgWrap" v-bind:style="{backgroundImage:'url(' + stationList.picUrl + ')'}">
							<p class="music-num"><i class="music-num-icon"></i> {{stationList.playCount}}</p>
							<p class="music-user"><i class="music-user-icon"></i>{{stationList.author}}</p>
						</router-link> 
					</div>
					<p class="music-des">{{stationList.name}} </p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
import api from '../../api/index'
var musicLists = [];
var soleLists =[];
var newestLists = [];
var recoMvLists =[];
var stationLists = [];
/*屏幕宽度*/
var winWidth = screen.width
export default {
	data(){
		return {
			musicLists : musicLists,
			 pic:["../../../static/img/16.jpg","../../../static/img/6.jpg","../../../static/img/1.jpg","../../../static/img/16.jpg"],
             now:"./images/1.jpg",
             winWidth : winWidth,
             n:0,
             currentIndex: 0,
             i:0,
             soleLists : soleLists,
             newestLists:newestLists,
             recoMvLists:recoMvLists,
             stationLists:stationLists
		}
	},
	computed:{
		...mapState({
			hidNav: state => state.hidNav
		})
	},
	beforeMount:function(){
		
	},
	 mounted:function(){
	 	//定时器，每隔2000向左移动winWidth+px
	      var _this=this;
	    setInterval(function(){
	       _this.n--;
	        if(-(_this.n)>=_this.pic.length){
	       	 _this.n=0;
	       }
	     },2000)
	    this.getData(),
	    this.musicDes()
    },
    methods:{
    	change:function(index){
    		this.n = -index
    	},
    	init:function(){
			this.$store.state.hidNav = false
		},
		musicDes:function(){
			var musicDesID = document.getElementsByClassName('musicDes');

			console.log("文字字数"+musicDesID.length)
		},
		getData:function(){
			api.getPersonalized()
			.then((response)=>{
				let dataResult = response.data.result
				this.musicLists = dataResult;
			})
			api.getPrivatecontent()
			.then((response)=>{
				let dataResult = response.data.result
				this.soleLists = dataResult;
			}),
			api.getBroadcastingStation()
			.then((response)=>{
				let dataResult = response.data.result
				this.stationLists = dataResult;
			}),
			api.getPersonalizedMv()
			.then((response)=>{
				let dataResult = response.data.result
				this.recoMvLists = dataResult;
			})
		}
		
 	}	
 }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.music-content{
	width: 100% !important;
	&:after{
			content:'';
			clear:both;
			display:block;
		}
	/* 轮播图部分*/
	.carousel-figure{
		overflow: hidden;
		width: 100%;
		height: 90px;
		background: pink;
		background-size:100% 100%;
		.pic-ul{
			height: 90px;
			position: relative;
			transition: all .4s;
			.pic-list{
				height: 90px;
				float: left;
				transition: all .4s;
					.pic-item{
					width: 318px;
					height: 90px;
				}
			}
		}
		.carousel-items{
			height: 20px;
			color: #ffffff;
			position: absolute;
			right: 0;
			margin-top: -20px;
			span{
				width: 6px;
				height: 6px;
				display: inline-block;
				border:1px solid #ffffff;
				border-radius: 8px;
				margin:6px 3px 6px 3px;
				transition: all .5s;
			}
			.carousel-active{
				background:#ffffff;
			}
		}
	}
	.recommend-playlist{
		margin:20px 0 0 0;
		&:after{
			content:'';
			clear:both;
			display:block;
		}
		.music-list-item-sole{
			width:46%;
			margin: 2%;
			float: left;
			height: 140px;
			background-size:100% 100%;
			}
		.recommend-title{
			font-size:16px;
			i{
				display:inline-block;
				vertical-align: middle;
				width:16px;
				height:16px;
				margin:-2px 5px 0 8px;
			}
			.recommend-icon{
				background:url(../../../static/img/reco.png) left center no-repeat;
					background-size:100% 100%;
			}
			.sole-icon{
				background:url(../../../static/img/sole.png) left center no-repeat;
					background-size:100% 100%;
			}
			.news-icon{
				background:url(../../../static/img/news2.png) left center no-repeat;
					background-size:100% 100%;
			}
			.station-icon{
				background:url(../../../static/img/station.png) left center no-repeat;
					background-size:100% 100%;
			}
			.mv-icon{
				background:url(../../../static/img/MV-re.png) left center no-repeat;
					background-size:100% 100%;
			}
		}
	}
	/* 推荐音乐列表部分 */
	.music-list-item{
		width:29%;
		margin: 2%;
		float: left;
		height: 140px;
		background-size:100% 100%;
		
		
	}
}
.imgWrap{
			display: block !important;
			width: 100%;
			height: 100px;
			background-size: 100% 100%;
			overflow:hidden;
			.music-num{
				width: 40%;
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
			.music-user{
				width: 100%;
				height: 15px;
				margin:100px 0 0 5px;
				color: #ffffff;
				font-size: 12px;
				.music-user-icon{
					display: inline-block;
					width: 10px;
					height: 10px;
					margin: 0 2px;
					background:url(../../assets/user.png) left center no-repeat;
					background-size:100% 100%;
				}
			}
		}
.music-des{
			font-size: 12px;
			font-family: "sans-serif";
			margin: 4px 0 0 2px;
		    font-size: 12px;
		    width: 100%;
    		height: 33px;
		    line-height: 16px;
		    overflow: hidden;
		    text-overflow : ellipsis;
		}
.sole-bottom{
	width:96% !important;
}
.recoMv{
	width:45% !important;
}

</style>