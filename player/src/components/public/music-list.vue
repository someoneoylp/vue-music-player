<template>
	<div class="music-list">
		<ul>
			<li class="play-all">
				<router-link to="">
					<p class="play-icon"></p>
					<p>播放全部<span>(共{{trackCount}}首)</span></p>
				</router-link>
			</li>
			<li v-for="(musicList,index) in musicLists" class="list-item">
				<router-link :to="{name:'playMusic',params:{id:musicList.id},query:{currentindex:index}}" class="serial-num">
					<p>{{index+1}}</p>
				</router-link>
				<router-link :to="{name:'playMusic',params:{id:musicList.id},query:{currentindex:index}}" class="music-title">
					<p class="">
						<span class="music-name">
							{{musicList.name}} <span v-if="musicList.alias">- {{musicList.alias[0]}}</span>
							<!-- <i v-if="musicList.mv" class="mv-icon">MV</i> -->
						</span>
						<span v-if="musicList.artists" class="music-singer" v-for="artist in musicList.artists">
							<i class="isDown" v-if="musicList.down"></i>
							{{artist.name}} 
						</span>
						<span v-if="musicList.album" class="music-album"> - {{musicList.album.name}}</span>
					</p>
				</router-link>
				<p class="music-more" @click="">
					<i></i>
					<i></i>
					<i></i>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
export default {
	/*data(){

	},*/
	computed:{
		...mapState({
			musicLists: state => state.musicLists,
			trackCount: state => state.trackCount
		})
<<<<<<< HEAD
=======
	},
	mounted:function(){
		this.init();
	},
	methods:{
		init:function(){
			console.log(this.musicLists);
		}
>>>>>>> 6f0d9098d9ae2445f50a5a3ff70da6690aa85618
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.music-list{
	width: 100%;
}
.music-list ul li{
	width: 100%;
	height: 45px;
	
}
.play-all{
	border-bottom: 1px solid #E6E8E9;
	p{
		display: inline-block;
		font-size: 14px;
		color:#000000;
		span{
			font-size:12px;
			color:#B1B1B2;
		}
	}	
	
	.play-icon{
		display: inline-block;
		vertical-align:middle;
		width: 45px;
		height: 45px;
		text-align: center;
		line-height: 45px;
		background: url("../../../static/img/paly.png") center center no-repeat;
		background-size: 60% 60%;
		}
}
.list-item{
	display:flex;
	.serial-num{
		flex:1;
		display: inline-block;
		font-style:normal;
		width: 45px;
		height: 45px;
		text-align: center;
		line-height: 40px;
		color:#B1B1B2;
		font-size:14px;
	}
	.music-title{
		flex:6;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		border-bottom: 1px solid #E6E8E9;
		.music-name{
			font-size:13px;
			display:block;
			margin:6px 0 3px 0;
			color:#000000;
			.mv-icon{
				display: inline-block;
				width:30px;
				height:12px;
				vertical-align:middle;
				font-style:normal;
				border: 1px solid #CE3D3E;
				color:#CE3D3E;
				font-size:10px;
				margin-top:-4px;
				border-radius:3px;
				text-align:center;
			}
		}
		.music-singer{
			font-size:12px;
			color:#B1B1B2;
			.isDown{
				display:inline-block;
				width:12px;
				height:12px;
				background: url("../../../static/img/down.png") center center no-repeat;
				background-size:100% 100%;
				vertical-align:middle;
			}
		}
		.music-album{
			font-size:12px;
			color:#B1B1B2;
			width: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
	.music-more{
		flex:1;
		text-align: center;
	    padding-top: 4%;
	    border-bottom: 1px solid #E6E8E9;
		i{
			display:block;
			float:right;
			clear:both;
			width:2px;
			height:2px;
			border:1px solid #B1B1B2;
			background:#B1B1B2;
			border-radius:2px;
			margin: 0px 15px 2px 0;
		}
	}
}

</style>