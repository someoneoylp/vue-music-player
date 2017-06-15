<template>
	<div class="playlist-list">
		<p class="notFoundTips" v-if="notFound[2]==true">{{notFoundTips}}</p>
		<ul v-else>
			<li v-for="(playlist,index) in playlists" class="list-item">
				<router-link :to="{name:'rankingEachPage',params:{id:playlist.id}}" class="music-title">
					<img :src="playlist.coverImgUrl" class="artist-img" alt="">
					<p class="playlist-name">{{playlist.name}}</p>
					<p class="playlist-singer">
						<span>{{playlist.trackCount}}首</span>
						<span>by {{playlist.creator.nickname}},</span>
						<span>播放{{playlist.playCount}}次</span>
					</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>
<script>
import api from '../../api'
import { mapState } from 'vuex'
import {change} from "../../store/index.js"
export default {
	name: 'searchPlaylist',
	data(){
		return{
			id: this.$route.params.id,
			notFoundTips: '很抱歉，没有搜索到该歌单。'
		}
	},
	computed:{
		...mapState({
			playlists: state => state.playlists,
			searchKeyWord: state => state.searchKeyWord,
			notFound: state=>state.notFound
		})
	}
}
</script>
<style lang="less" scoped>
.playlist-list{
	width: 100%;
	.notFoundTips{
		line-height: 200px;
    text-align: center;
    font-size: 14px;
	}
	.list-item{
		display:flex;
		width: 100%;
		height: 45px;
		.music-title{
			flex:6;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
			border-bottom: 1px solid #E6E8E9;
			.artist-img{
				width: 50px;
				height: 50px;
				margin: 5px 10px;
				float: left;
			}
			.playlist-name{
				float: left;
				width: 80%;
				margin-top: 10px;
				font-size:13px;
				color:#000000;
			}
			.playlist-singer{
				float: left;
				width: 80%;
				font-size: 12px;
    		color: #797979;
    		span{
    			margin-right: 5px;
    		}
			}
		}
	}	
}
</style>