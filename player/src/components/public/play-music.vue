<template>
<transition name="fade">
	<div class="play-music" :style="{height:screenHeight+'px'}" @mousemove="bodyMousemove($event)" @mouseup="bodyMouseup($event)">
		<div class="play-music-cover" :style="{height:screenHeight+'px',backgroundImage:'url(' + songDetail[0].album.blurPicUrl + ')'}"></div>
		<div class="play-music-wrap">
			<div class="play-music-header">
				<router-link :to="{name:'musicList',params:{id:songListID}}" class="back"></router-link>
				<p class="music-info">
					<span>{{songDetail[0].name}}</span>
					<span>{{songDetail[0].artists[0].name}}</span>
				</p>
				<i class="share-icon"></i>
			</div>
			<HR width="80%" color=#ffffff SIZE=1 /> 
			<div class="play-music-content">
				<div class="disk-content" @click="showLyric()" v-if="!isShowLyric">
					<i class="stick" :class="{ isPlay : play}"></i>
					<div class="disk">
						<img :src="songDetail[0].album.blurPicUrl" alt="">
					</div>
				</div>
				<div class="lyric" v-if="isShowLyric" @click="showLyric()">
					<ul><li class="lyricIndex" v-for="(lyric,index) in lyric">{{lyric}}</li></ul>
				</div>
			</div>
			<div class="play-music-operation">
				<div class="music-operation" v-if="!isShowLyric">
					<span class="operation-item" @click="like()">
						<p class="like-icon operation-icon" :class="{likeActive:likeActive}"></p>
					</span>
					<span class="operation-item">
						<p class="download-icon operation-icon"></p>
					</span>
					<span class="operation-item">
						<i class="comment-num">12</i>
						<p class="comment-icon operation-icon"></p>
					</span>
					<span class="operation-item">
						<p class="more" @click="">
							<i></i>
							<i></i>
							<i></i>
						</p>
					</span>
				</div>
				<audio id="audio" :src="musicUrl" type="audio/ogg">
				</audio>
				<div class="play-operation">
					<div class="speed">
						<i class="play-time">{{playTime}}</i>
					    <div class="process" id="process" ref="abc" style="width:200px" @mousedown="processMousedown($event)">
					        <div class="process-bar" :style="{width:processBarWidth+'px'}"></div>
					        <span class="bar" id="mybar" @mousedown="myBarMousedown($event)" @mouseup="bodyMouseup($event)" :style="{left:myBarLeft+'px'}"></span>
					    </div>
					    <i class="end-time">{{allTime}}</i>
					</div>
					<div class="play-operation-content">
						<span class="play-way" @click="">
							<p class="" :class="{}"></p>
						</span>
						<span class="last" @click="plLast()">
							<p class="" :class="{}"></p>
						</span>
						<span class="play">
							<p class="" :class="{}" @click="playMusic()"></p>
						</span>
						<span class="next" @click="plNext()">
							<p class="" :class="{}"></p>
						</span>
						<span class="paly-list" @click="">
							<p class="" :class="{}"></p>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
	</transition>
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import api from '../../api/index'
import {change} from "../../store/index.js"
const screenHeight = screen.height 
const screenWidth =document.body.offsetWidth

export default {
	data(){
		return {
			id:this.$route.params.id,
			currentindex:this.$route.query.currentindex,
			screenHeight:screenHeight,
			play:false,
			likeActive:false,
			isDrag:false,
			isShowLyric:false,
			ProcessId:document.getElementById('process'),
			myBar:document.getElementById('mybar'),
			body:document.body,
			audio:document.querySelector('#audio'),
			mouseX:'',
			left:'',
			myBarLeft:0,
			processBarWidth:'',
			songDetail:[],
			screenWidth:screenWidth/2,
			musicUrl:'',
			allTime:'',//播放时间
			playTime:'0:00',
			timer:'',
			goToTime:0,
			lyric:[],
			lyricTime:[]//每个歌词词出现的时间
		}
	},
	computed:{
		...mapState({
			songListID: state => state.songListID
		})
	},
	mounted:function(){
	 	this.getSongDetail()
	 	this.$store.state.songListID = this.$store.state.songListID
	 	
    },
	methods:{
		//获取歌单详情
		getSongDetail:function(){
			api.getSongDetail(this.id)
			.then((response)=>{
				console.log(response.data)
				this.songDetail = response.data.songs
			}),
			api.getSongUrl(this.id,999000)
			.then((response)=>{
				console.log(response.data)
				this.musicUrl = response.data.data[0].url
			})
			api.getSongLyric(this.id)
			.then((response)=>{
				var that = this
				var lyricAll = response.data.lrc.lyric.split('[')
				for(let i=0;i<lyricAll.length;i++){
					that.lyric[i] = lyricAll[i].split(']')[1]
					that.lyricTime[i] = lyricAll[i].split(']')[0].split('.')[0]
				}
			})

		},
		//是否显示歌词
		showLyric:function(){
			this.isShowLyric = !this.isShowLyric
		},
		playMusic:function(e){
			//播放音乐，设置时间
			let second  = this.songDetail[0].duration.toString().substring(0,3)
			
			if(parseInt(second %60)<10){
		           		this.allTime = parseInt(second /60)+':0'+parseInt(second %60)
		           	}else{
		           		this.allTime = parseInt(second /60)+':'+parseInt(second %60)
		    }
		    var that = this
			if(this.play==false){
		           that.audio.play();
		           
		           that.timer = setInterval(function(){

		           	/*if(this.lyricTime[t]==that.audio.currentTime){
		           		console.log("歌词应该动动啦")
		           	}*/
		           	if(parseInt(that.audio.currentTime %60)<10){
		           		that.playTime = parseInt(that.audio.currentTime /60)+':0'+parseInt(that.audio.currentTime %60)
		           	}else{
		           		that.playTime = parseInt(that.audio.currentTime /60)+':'+parseInt(that.audio.currentTime %60)
		           	}
		           	if(that.myBarLeft<200){
						that.myBarLeft=(that.audio.currentTime/second)*200+200/second
					}
				},1000)
			}else if(this.play===true){
				window.clearInterval(this.timer)
				that.audio.pause();
			}
	        this.play =!this.play;
		},
		//上一首歌单
		plLast:function(){
			api.getPlayListDeatil(this.$store.state.songListID)
			.then((response)=>{
				if(this.currentindex!==0){
					this.id = response.data.result.tracks[--this.currentindex].id
					this.getSongDetail();
				}
			})
		},
		//下一首歌曲
		plNext:function(){
			api.getPlayListDeatil(this.$store.state.songListID)
			.then((response)=>{
				var songLen = response.data.result.tracks.length
				if(this.currentindex<songLen){
					this.id = response.data.result.tracks[++this.currentindex].id
					this.getSongDetail();
				}
			})
			this.body
		},
		like:function(){
			this.likeActive = !this.likeActive
		},
		//鼠标点击在进度条的时候触发
		myBarMousedown:function(e){
			this.isDrag = true;
		    //点击的时候位置
		     this.mouseX = e.offsetX;
		    return false;
		},
		bodyMouseup:function(e){
			  this.isDrag = false;
		      return false;
		},
		bodyMousemove:function(e){
			 if(this.isDrag){
			 	var mx = e.clientX
			 	var sc = parseInt(this.screenWidth-100)
			 	//鼠标想相对于div移动距离
			 	var fullwidth = mx-sc
	            if(fullwidth<0){
	                fullwidth=0;
	            }else if(fullwidth>200){
	            	fullwidth = 200
	            }
	            this.myBarLeft =fullwidth;
	            this.processBarWidth = fullwidth
			}
		},
		processMousedown:function(e){
			let l = e.offsetX-2;
			this.myBarLeft = l
		}
	}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.play-music{
	width:100%;
	.play-music-cover{
		position:absolute;
		width:100%;
		background:url("../../../static/img/list-6.jpg") center center no-repeat;
		background-size:100% 100%;
		-webkit-filter: blur(100px); 
	    -moz-filter: blur(100px);
	    -ms-filter: blur(100px);    
	    filter: blur(100px);
	    z-index:1;
	}
    .play-music-wrap{
    	position:relative;
    	height:100%;
    	z-index:12;
		hr{
			margin:0 auto;
			opacity:0.3;
		}
    	.play-music-header{
    		height:60px;
    		clear:both;
    		.back{
    			float:left;
				width:30px;
				height:30px;
				margin-top:15px;
				background:url("../../../static/img/back.png") center center no-repeat;
				background-size:80% 80%;
				vertical-align:middle;
    		}
    		.music-info{
    			float:left;
				1display:inline-block;
				color:#ffffff;
				span{
					display:block;
					&:first-child{
						font-size:16px;
						margin:12px 0 7px 10px;
					}
					&:last-child{
						font-size:12px;
						opacity:0.6;
						margin:0px 0 0px 10px;
					}
				}
    		}
    		.share-icon{
    			float:right;
    			height:20px;
    			width:20px;
    			background:url("../../../static/img/share.png") center center no-repeat;
				background-size:100% 100%;
				vertical-align:middle;
				margin:20px 15px 0 0;
    		}
    	}
    	.play-music-content{
    		.disk-content{
	    		width:80%;
	    		margin:0 auto;
	    		overflow:hidden;
	    		.stick{
	    			position:relative;
	    			z-index:104;
	    			width:77px;;
	    			height:114px;
	    			margin:-10px 0 0 50%;
					display:block;
					background:url("../../../static/img/stick_bg.png") center center no-repeat;
					background-size:100% 100%;
					transition:all .4s;
					transform-origin: top center;
					transform:rotate(-10deg);
	    		}
	    		.isPlay{
	    			transform:rotate(14deg);
	    		}
	    		.disk{
	    			position:relative;
	    			margin:0px auto;
	    			margin-top:-35px;
	    			z-index:103;
	    			width:240px;
	    			height:240px;
	    			border-radius:240px;
	    			background:#000000;
	    			img{
	    				margin:30px 30px;
	    				width:180px;
	    				height:180px;
		    			border-radius:180px;
	    			}
	    		}
	    	}
	    	.lyric{
	    		width:80%;
	    		margin:0 auto;
	    		overflow:hidden;
	    		height:389px;
	    		ul{
	    			margin-top:180px;
	    			.lyricIndex{
		    			text-align: center;
		    			color:#939290;
		    			font-size: 14px;
	    				line-height: 34px;
		    		}
	    		}
	    		
	    	}
    	}
    	.play-music-operation{
    		.music-operation{
    			width:80%;
    			margin:25px auto;
    			display:flex;
    			span{
    				flex:1;
    				.comment-num{
    						    position: absolute;
    						    margin: -7px 0 0 34px;
    						    font-size: 7px;
    						    color: #ffffff;
    				}
    				.likeActive{
    					background:url("../../../static/img/like-active.png") center center no-repeat !important;
    				}
    				.operation-icon{
    					margin:0 auto;
    					width:30px;
    		    				height:30px;
    		    			}
    		    			.like-icon{
    		    				background:url("../../../static/img/like.png") center center no-repeat;
    		    			}
    		    			.download-icon{
    		    				background:url("../../../static/img/download.png") center center no-repeat;
    		    			}
    		    			.comment-icon{
    		    				background:url("../../../static/img/comment.png") center center no-repeat;
    		    			}
    		    			.more{
    		    				i{
    		    					display:block;
    		    					width:4px;
    		    					height:4px;
    		    					border-radius:4px;
    		    					margin:4px 0 0 30px;
    		    					background:#ffffff;
    		    				}
    		    			}
    	
    			}
    		}
    		.play-operation{
    			width:90%;
    			margin:0 auto;
	    		.speed{
	    			text-align:center;
					.play-time,.end-time{
						color:#ffffff;
						font-style: normal;
						font-size:10px;
					}
					.progress-bar{
						height:2px;
						width:70%;
						margin:0 auto;
						display:inline-block;
						background:#ffffff;
					}
	    		}
	    		.play-operation-content{
	    			display:flex;
	    			height:50px;
	    			width:100%;
	    			margin:10px auto;
	    			span{
	    				flex:1;
	    				p{
							height:50px;
		    				width:50px;
	    				}
	    			}
	    			.play-way p{
	    				background:url("../../../static/img/loop.png") center center no-repeat;
						background-size:50% 50%;
	    			}
	    			.last p{
	    				background:url("../../../static/img/next.png") center center no-repeat;
						background-size:50% 50%;
						transform:rotate(180deg);
	    			}
	    			.play p{
	    				background:url("../../../static/img/play-w.png") center center no-repeat;
						1background-size:80% 80%;
	    			}
	    			.next p{
	    				background:url("../../../static/img/next.png") center center no-repeat;
						background-size:50% 50%;
	    			}
	    			.paly-list p{
	    				background:url("../../../static/img/more.png") center center no-repeat;
						background-size:50% 50%;
	    			}

	    		}
    		}
    		
    	} 
    	
    }
	
}
.wrap{
    
    border: 1px solid;
    padding: 20px;
}

.process{
    position: relative;
    display:inline-block;
    height: 2px;
    background-color: #ffffff;
    border-radius: 2px;
}
.process-bar{
    height: 4px;
    border-radius: 2px;
}
.bar{
    top: -4px;
    left: 0px;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    background-color: #91cdea;
    display: inline-block;
    cursor: pointer;
}
.fade-enter-active,.fade-leave-active{
	  transition:all 0.5s
}
.fade-enter,.fade-leave{
  transform :translate3d(0,0,0)
}
</style>