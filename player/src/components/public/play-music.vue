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
				<audio id="audio" controls="controls">
					<source :src="musicInfo.musicUrl" type="audio/ogg">
				</audio>
				<button @click="test()">dianwo</button>
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
	backgroundUrl:"../../../static/img/list-4.jpg",
	musicUrl:'../../../static/music/陶辚竹 - 一直很安静.mp3'
}
export default {
	data(){
		return {
			screenHeight:screenHeight,
			musicInfo:musicInfo,
			play:false
		}
	},
	methods:{
		playMusic:function(){
			this.play = !this.play
		},
		test:function(){
			var audio =document.querySelector('#audio');
			if(!this.play){
	            audio.play();
	            this.play = true;
	            console.log(this.play)
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
    			margin-top:-25px;
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
	
}

</style>