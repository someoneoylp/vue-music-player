<template>
	<div class="play-music" :style="{height:screenHeight+'px'}">
		<div class="play-music-cover" :style="{height:screenHeight+'px',backgroundImage:'url(' + blurPicUrl + ')'}"></div>
		<div class="play-music-wrap">
			<div class="play-music-header">
				<router-link @click.native="back()" :to="{name:'musicList',params:{id:songListID}}" class="back"></router-link>
				<p class="music-info">
					<span>{{songName}}</span>
					<span>{{songArtistsName}}</span>
				</p>
				<i class="share-icon"></i>
			</div>
			<HR width="80%" color=#ffffff SIZE=1 /> 
			<div class="play-music-content">
				<div class="disk-content" @click="showLyric()" v-show="!isShowLyric">
					<i class="stick" :class="{ isPlay : playing}"></i>
					<div class="disk">
						<img :src="blurPicUrl" alt="">
					</div>
				</div>
				<div class="lyric" v-show="isShowLyric" @click="showLyric()">
					<div id="volume" class="volume" @touchmove="rangeTM($event,'volume')" @touchstart="barTS($event,'volume')" style="margin-left:16%">
				        <div id="volume-progress" class="volume-progress"></div>
				        <span id="volume-bar" class="volume-bar" @touchstart="barTS($event,'volume')"></span>
					</div>
					<div class="lyricWrap">
						<ul id="lyricBox" :style="{marginTop:marginTop+'px'}">
							<li class="lyricIndex" v-for="(lyrics,index) in lyric" :class="{on:lyricA}" style="height:auto">{{lyrics}}</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="play-music-operation">
				<div class="music-operation">
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
				<div class="play-operation">
					<div class="speed">
						<i class="play-time">{{playTimeCurrent}}</i>
					    <div id="range" class="range" @touchmove="rangeTM($event,'range')" @touchstart="barTS($event,'range')">
					        <div id="range-progress" class="range-progress"></div>
					        <span id="range-bar" class="range-bar" @touchstart="barTS($event,'range')"></span>
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
							<p class="" :class="{stopPlay:playing}" @click="playMusic()"></p>
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
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import api from '../../api/index'
import {change} from "../../store/index.js"
const screenHeight = screen.height 
export default {
	data(){
		return {
			lyricA:false,//是否显示歌词
			likeActive:false,
			isShowLyric:false,
			screenHeight:screenHeight,
			songDetail:[],
			allTime:'',//播放时间
			playTimeCurrent:'0:00',
			goToTime:0,
			lyric:['此歌曲无歌词~'],
			lyricTime:[],//每个歌词词出现的时间
			blurPicUrl:'',
			songName:'',
			songArtistsName:'',
            currentLyric:2,
            volume:0.0,
            marginTop:150
		}
	},
	computed:{
		...mapState({
			songListID: state => state.songListID,
			playing:state=>state.playing,
			playTime:state =>state.playTime,
			currentindex:state=>state.currentindex
		}) 
	},
	watch:{
		//从foot页面切换过来，加载歌曲信息
		currentindex(curVal,oldVal){
			this.$store.state.hidFoot = false
			this.getSongDetail()
		},
		//根据播放时间设置信息
		playTime(curVal,oldVal){
			var that = this
			var lyricIndex = document.getElementsByClassName('lyricIndex')
			var bar = document.getElementById('range-bar')
			var progress = document.getElementById('range-progress')
			var range = document.getElementById('range')
			var second = this.$store.state.second
			var empty=0
			var left
			if(Math.floor(oldVal)!==Math.floor(curVal)){
				this.playTimeCurrent = this.setTimeFormat(this.$store.state.playTime,this.playTimeCurrent)
				//设置进度条
				left = (curVal/second)*range.offsetWidth
				bar.style.webkitTransform='translate('+left+'px,-5px)';
    			progress.style.width=left+'px';
    			//设置歌词滚动
				for(var i=0;i<this.lyricTime.length;i++){
					var typeLyric=typeof that.lyric[i]
					if(that.lyric[i]!==''&&typeLyric!=='undefined'&&this.playTimeCurrent==this.lyricTime[i].substring(1,5)){
						that.marginTop =150-35*i
						//歌词高亮
						for(let j=0;j<lyricIndex.length;j++){
							that.removeClass(lyricIndex[j],'on')
						}
						that.addClass(lyricIndex[i],'on')
					}
				}
			}	
			
		},
		//通过进度条重置播放时间
		goToTime(curVal,oldVal){
			this.$store.state.playTime = curVal
		}
	},
	mounted:function(){
		//页面初始化
	 	this.getSongDetail()
	 	this.$store.state.songListID = this.$store.state.songListID
	 	this.$store.state.hidFoot = false
	 	this.init()
    },
	methods:{
		//获取歌单详情
		getSongDetail:function(){
			//加载当前播放歌曲信息
			api.getSongDetail(this.$store.state.currentMusic)
			.then((response)=>{
				this.songDetail = response.data.songs
				this.blurPicUrl = this.songDetail[0].album.blurPicUrl
				this.songName = this.songDetail[0].name
				this.songArtistsName = this.songDetail[0].artists[0].name
			}),
			api.getSongLyric(this.$store.state.currentMusic)
			.then((response)=>{
				var that = this
				//判断有没有歌词
				if(response.data.lrc.lyric){
					var lyricAll = response.data.lrc.lyric.split('[')
					for(let i=0;i<lyricAll.length;i++){
						that.lyric[i] = lyricAll[i].split(']')[1]
						that.lyricTime[i] = lyricAll[i].split(']')[0].split('.')[0]
					}
				}
			})
		},
		//初始化歌曲播放时间还有歌词位置
		init:function(){
			this.allTime = this.setTimeFormat(this.$store.state.second,this.allTime)
			this.marginTop = 150
		},
		//是否显示歌词
		showLyric:function(){
			this.isShowLyric = !this.isShowLyric
		},
		//设置时间格式
		setTimeFormat:function(time,receiveTime){
			if(parseInt(time %60)<10){
		        receiveTime = parseInt(time /60)+':0'+parseInt(time %60)
		    }else if(parseInt(time %60)>10){
		        receiveTime = parseInt(time /60)+':'+parseInt(time %60)
		    }
		    return receiveTime
		},
		//播放音乐，设置时间
		playMusic:function(e){
		    this.$store.state.playing = !this.$store.state.playing
		},
		//返回
		back:function(){
			this.$store.state.hidFoot = true
		},
		//上一首歌单
		plLast:function(){
			this.$store.state.changeSong = -1
		},
		//下一首歌曲
		plNext:function(){
			this.$store.state.changeSong = 1
		},
		//收藏
		like:function(){
			this.likeActive = !this.likeActive
		},
		//进度条触发，type分为是设置声音还是播放时间
		barTS:function(e,type){
			this.setLeft(e,type)
            e.preventDefault();
		},
		//移动
		rangeTM:function(e,type){
			this.setLeft(e,type)
		},
		setLeft:function(event,type){
			var range=document.getElementById(type)
			var bar=document.getElementById(type+"-bar")
			var maxw = range.offsetWidth-bar.offsetWidth
			var rangex = range.offsetLeft;
			var half = bar.offsetWidth/2
			var left=event.touches[0].pageX-rangex-half;
            this.render(event,left,type);
		},
		render:function (event,value,type) {
			var that=this
			var range=document.getElementById(type)
			var bar=document.getElementById(type+'-bar')
			var maxw = range.offsetWidth-bar.offsetWidth
			var progress=document.getElementById(type+'-progress')
			var audio = document.querySelector('#audio')
            var left=value;
            if(left<=-5){
                left=-5;
            }
            if(left>=maxw+5){
                left=maxw+5;
            }
            
            bar.style.webkitTransform='translate('+left+'px,-5px)';
            progress.style.width=left+'px';
            //设置音量
            if(type =="volume"){
	            this.volume=Math.ceil(left/maxw*100)/100;
	            audio.volume = this.volume
            }
            //设置跳转播放进度
            if(type=="range"){
            	 if(typeof(event)=='object'&&(event.type=='touchstart'||event.type=='touchmove')){
	            	this.goToTime = Math.ceil(left/maxw*100)/100;
	            	audio.currentTime = this.songDetail[0].duration.toString().substring(0,3)*this.goToTime
	            	that.playTime = that.setTimeFormat(audio.currentTime,that.playTime)

				    for(let i=0;i<that.lyricTime.length;i++){
				    	if(that.playTime===that.lyricTime[i].substring(1,5)){
				    		that.currentLyric = i
				    	}
				    }
	            }
            }
           
        },
        //js原生添加class和删除class
        hasClass:function(obj, cls) {  
		    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
		},
        addClass:function(obj, cls) {  
		    if (!this.hasClass(obj, cls)) obj.className += " " + cls
		},
		removeClass:function(obj, cls) {  
		    if (this.hasClass(obj, cls)) {  
		        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
		        obj.className = obj.className.replace(reg, ' ') 
		    }  
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
						width:230px;
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
    		height:60%;
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
	    		height:364px;
	    		ul{
	    			
	    			.lyricIndex{
		    			text-align: center;
		    			color:rgba(225,225,225,.8);
		    			font-size: 14px;
	    				line-height: 34px;
	    				border:1px solid rgba(255, 255, 255, 0);
		    		}
		    		.on{
		    			color:#ffffff
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
						margin:0 10px;
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
	    			.play{
	    				p{
	    					background:url("../../../static/img/play-w.png") center center no-repeat;
	    				}
	    				.stopPlay{
	    					background:url("../../../static/img/stopPlay.png") center center no-repeat;
	    				}
	    			}
	    			.next p{
	    				background:url("../../../static/img/next.png") center center no-repeat;
						background-size:50% 50%;
	    			}
	    			.paly-list p{
	    				background:url("../../../static/img/more-w.png") center center no-repeat;
						background-size:50% 50%;
	    			}

	    		}
    		}
    		
    	} 
    	
    }
	
}
.play-music{
	.range,.volume{
	    width: 68%;
	    height: 10px;
	    display:inline-block;
	    position: relative;
	    margin: auto;
	    z-index:3;
	    -webkit-tap-highlight-color: rgba(0,0,0,0);
	}
	.range:before,.range-bar,.range-progress,.volume:before,.volume-bar,.volume-progress{
	    position: absolute;
	    top:50%;
	    transform: translateY(-50%);
	    -webkit-transform: translateY(-50%);
	}
	.range:before,.volume:before{
	    content: '';
	    display: block;
	    background-color: #ccc;
	    width: 100%;
	}
	.range:before,.range-progress,.volume:before,.volume-progress{
	    height: 2px;
	    left:0;
	}
	.range-bar,.volume-bar{
	    position: absolute;
	    width:10px;
	    height: 10px;
	    left:-5px;
	    border-radius: 50%;
	    background-color:#ffffff;
	    transition: all 1s;
	}
	.range-progress,.volume-progress{
	    background-color:#b72712;
	    transition: all 1s;
	}
	.lyricWrap{
	    width: 100%;
	    height: 100%;
	}
	#lyricBox{
	    transition: all 1s;
	    overflow:auto;
	    padding:15px 0;
	}
}
</style>