<template>
	<div class="play-music" :style="{height:screenHeight+'px'}">
		<div class="play-music-cover" :style="{height:screenHeight+'px'}"></div>
		<div class="play-music-wrap">
			<div class="play-music-header">
				<router-link to="/musicList" class="back"></router-link>
				<p class="music-info">
					<span>{{musicInfo.name}}</span>
					<span>{{musicInfo.singer}}</span>
				</p>
				<i class="share-icon"></i>
			</div>
			<HR width="80%" color=#ffffff SIZE=1 /> 
			<div class="play-music-content">
				<div class="disk-content">
					<i class="stick" :class="{ isPlay : play}"></i>
					<div class="disk" @click="playMusic()">
						<img :src="musicInfo.backgroundUrl" alt="">
					</div>
				</div>
				<div class="lyric"></div>
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
						<i class="comment-num">{{musicInfo.commentNum}}</i>
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
				<audio id="audio">
					<source :src="musicInfo.musicUrl" type="audio/ogg">
				</audio>
				<div class="play-operation">
					<div class="speed">
						<i class="paly-time">3.00</i>
						<p class="progress-bar timeline" @touchstart="setMusicTime()"></p>
						<i class="end-time">4.56</i>
					</div>
					<div class="play-operation-content">
						<span class="play-way" @click="">
							<p class="" :class="{}"></p>
						</span>
						<span class="last" @click="">
							<p class="" :class="{}"></p>
						</span>
						<span class="play" @click="playMusic()">
							<p class="" :class="{}"></p>
						</span>
						<span class="next" @click="">
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
const screenHeight = screen.height 
const musicInfo = {
	name:"晴天",
	singer:"周杰伦",
	lyric:"",
	commentNum:123,
	backgroundUrl:"../../../static/img/list-4.jpg",
	musicUrl:'../../../static/music/陶辚竹 - 一直很安静.mp3'
}
export default {
	data(){
		return {
			screenHeight:screenHeight,
			musicInfo:musicInfo,
			play:false,
			likeActive:false
		}
	},
	methods:{
		playMusic:function(){
			var audio =document.querySelector('#audio');
			if(!this.play){
	            audio.play();
	        }else if(this.play){
	        	 audio.pause();
	        }
	        this.play = !this.play;
		},
		like:function(){
			this.likeActive = !this.likeActive
		},
		setMusicTime:function(e){
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
		-webkit-filter: blur(50px); 
	    -moz-filter: blur(50px);
	    -ms-filter: blur(50px);    
	    filter: blur(50px);
	    z-index:1;
	}
    .play-music-wrap{
    	position:relative;
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
					.paly-time,.end-time{
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

</style>