<template>
	<div class="footer">
		<div class="music-info">
			<router-link :to="{name:'playMusic',params:{id:currentMusic},query:{currentindex:currentindex}}">
				<p class="info">
					<span>{{songName}}</span>
					<span>{{songArtistsName}}</span>
				</p>
				<div class="flag" :style="{backgroundImage:'url(' + blurPicUrl + ')'}">
				</div>
			</router-link>
		</div>
		<div class="musicOper">
			<span class="music-listInfo musicOper-icon"></span>
			<span class="play" :class="{on:playing}" @click="playMusic()"></span>
			<span class="PlNext" @click="playNext(songListID,currentindex)"></span>
		</div>
		<audio id="audio" :src="musicUrl" type="audio/ogg" @timeupdate="timeupDate()" @ended='playEnd()'>
		</audio>
	</div>
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
import api from '../../api/index'
export default {
	data(){
		return {
			musicUrl:'',
			songName:'',
			songArtistsName:'',
			blurPicUrl:'',
			playTimeFoot:'0:00'
		}
	},
	computed:{
		...mapState({
			currentMusic: state=>state.currentMusic,
			hidFoot: state=>state.hidFoot,
			currentindex: state =>state.currentindex,
			songListID: state=>state.songListID,
			playing: state=>state.playing,
			changeSong: state=>state.changeSong
		})
	},
	watch:{
		//currentMusic为当前播放歌曲id,改变重新加载
		currentMusic:function(newValue, oldValue){
			this.$store.state.hidFoot=true
			this.getSongDetailFoot(newValue)
		},
		//Playing:是否播放
		playing:function(newValue,oldValue){
			var audio = document.getElementById('audio')
			if(newValue==false){
				audio.pause();
			}else if(newValue===true){
				audio.play();
			}
		},
		//上下切换歌曲
		changeSong:function(newValue,oldValue){
			var that = this
			if(newValue==-1){
				this.playLast(that.songListID,that.currentindex)
			}else if(newValue == 1){
				this.playNext(that.songListID,that.currentindex)
			}
			this.$store.state.changeSong = 0
		}
	},
	methods:{
		//播放
		playMusic:function(e){
			var audio = document.getElementById('audio')
	        this.$store.state.playing =!this.$store.state.playing;
		},
		//播放时间改变时触发，获取当前播放时间
		timeupDate:function(){
			this.$store.state.playTime = audio.currentTime
		},
		//播放结束，直接播放下一首
		playEnd:function(){
			this.playNext(this.songListID,this.currentindex)
		},
		//获取歌曲信息
		getSongDetailFoot:function(id){
			api.getSongDetail(id)
			.then((response)=>{
				this.songDetail = response.data.songs
				this.blurPicUrl = this.songDetail[0].album.blurPicUrl
				this.songName = this.songDetail[0].name
				this.songArtistsName = this.songDetail[0].artists[0].name,
				this.$store.state.second = this.songDetail[0].duration.toString().substring(0,3)
			}),
			api.getSongUrl(id,999000)
			.then((response)=>{
				this.musicUrl = response.data.data[0].url
			})
		},
		//下一首
		playNext:function(songListID,currentindex){
			api.getPlayListDeatil(songListID)
			.then((response)=>{
				var songLen = response.data.result.tracks.length
				if(this.currentindex<songLen){
					this.$store.state.currentMusic = response.data.result.tracks[++currentindex].id
					this.$store.state.currentindex=++this.$store.state.currentindex
					this.getSongDetailFoot(this.$store.state.currentMusic);
				}
			})
		},
		//上一首
		playLast:function(songListID,currentindex){
			api.getPlayListDeatil(songListID)
			.then((response)=>{
				var songLen = response.data.result.tracks.length
				if(this.currentindex>0){
					this.$store.state.currentMusic = response.data.result.tracks[--currentindex].id
					this.$store.state.currentindex=--this.$store.state.currentindex
					this.getSongDetailFoot(this.$store.state.currentMusic);
				}
			})
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.footer{
	display:flex;
	color:#000000;
	.music-info{
		flex:4;
		height:50px;
		a{
			color:#000000;
			.flag{
				float:left;
				width:34px;
				height:34px;
				margin:8px;
				border-radius:4px;
				display:inline-block;
				background-size:100% 100%;
			}
			.info{
				display:inline-block;
				margin-top:10px;
				width: 62%;
				span{
					display:block;
					width:100%;
					height:14px;
					overflow:hidden;
					&:first-child{
						font-size:14px;
					}
					&:last-child{
						font-size:12px;
						margin-top:4px;
					}
				}
			}
		}
		
	}
	.musicOper{
		flex:2;
		height:50px;
		display:flex;
		span{
			flex:1;
		}
		.music-listInfo{
			 background:url("../../../static/img/more.png") center center no-repeat; 
		}
		.play{
			background:url("../../../static/img/play-red.png") center center no-repeat;
		}
		.on{
			background:url("../../../static/img/stopPlay-r.png") center center no-repeat;
		}
		.PlNext{
			background:url("../../../static/img/next-red.png") center center no-repeat;
		}
	}
}
</style>