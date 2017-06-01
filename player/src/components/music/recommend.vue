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
			<div class="music-list-item" v-for="musicList in musicLists"> 
				<div class="imgWrap">
					<router-link @click.native="init()" to="/musicList" class="imgWrap" v-bind:style="{backgroundImage:'url(' + musicList.backgroundUrl + ')'}">
						<p class="music-num"><i class="music-num-icon"></i>{{musicList.playQuantity}}</p>
						<p class="music-user"><i class="music-user-icon"></i>{{musicList.author}}</p>
					</router-link> 
				</div>
					
				<p class="music-des">{{musicList.describe}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
	import {change} from "../../store/index.js"
var musicLists = [
	{
		author:"Ayasel",
		playQuantity:"2100万",
		describe:"校园合唱|老师评委请挥动你们的双手",
		backgroundUrl:'../../../static/img/list-1.jpg'
	},{
		author:"一般不淡定",
		playQuantity:"800万",
		describe:"【毕业季】我们不说再见",
		backgroundUrl:'../../../static/img/list-2.jpg'
	},{
		author:"华纳音乐",
		playQuantity:"820万",
		describe:"拒绝一切认输，从来都不服",
		backgroundUrl:'../../../static/img/list-3.jpg'
	},{
		author:"第十三个神",
		playQuantity:"520万",
		describe:"100位欧美90后歌手：这些人把青春给了音乐",
		backgroundUrl:'../../../static/img/list-4.jpg'
	},{
		author:"浩子Joe",
		playQuantity:"840万",
		describe:"爸爸的录音机|怀旧华语",
		backgroundUrl:'../../../static/img/list-5.jpg'
	},{
		author:"Ayasel",
		playQuantity:"2100万",
		describe:"校园合唱|老师评委请挥动你们的双手",
		backgroundUrl:'../../../static/img/list-6.jpg'
	},{
		author:"一般不淡定",
		playQuantity:"800万",
		describe:"【毕业季】我们不说再见",
		backgroundUrl:'../../../static/img/list-1.jpg'
	},{
		author:"华纳音乐",
		playQuantity:"820万",
		describe:"拒绝一切认输，从来都不服输",
		backgroundUrl:'../../../static/img/list-4.jpg'
	},{
		author:"第十三个神",
		playQuantity:"520万",
		describe:"100位欧美90后歌手：这些人把青春给了音乐",
		backgroundUrl:'../../../static/img/list-2.jpg'
	},{
		author:"浩子Joe",
		playQuantity:"840万",
		describe:"爸爸的录音机|怀旧华语",
		backgroundUrl:'../../../static/img/list-3.jpg'
	}]
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
             i:0
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
    },
    methods:{
    	change:function(index){
    		this.n = -index
    	},
    	test:function(){
    		console.log("test")
    	},
    	init:function(){
			this.$store.state.hidNav = false
		}
 	}	
 }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.music-content{
	width: 100% !important;
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
	/* 推荐音乐列表部分 */
	.music-list-item{
		width:46%;
		margin: 2%;
		float: left;
		height: 160px;
		background-size:100% 100%;
		.imgWrap{
			display: block !important;
			width: 100%;
			height: 120px;
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
			font-size: 14px;
			font-family: "sans-serif";
			margin: 4px 0 0 2px;
		    font-size: 12px;
		    line-height: 16px;
		}
	}
}
</style>