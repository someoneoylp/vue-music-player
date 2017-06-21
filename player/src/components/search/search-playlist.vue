<template>
	<div class="search-playlist search-list-same">
		<p class="notFoundTips" v-if="notFound[2]">{{notFoundTips}}</p>
		<ul v-else>
			<li v-for="(playlist,index) in playlists" class="list-item">
				<router-link @click.native="init()" :to="{name:'rankingEachPage',params:{id:playlist.id}}" class="music-title">
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
	},
	methods:{
		init(){
			this.$store.state.songListID = this.$route.params.id;
		}
	}
}
</script>
<style lang="less">
@import '../../../static/css/searchListSame.less';
.search-playlist .list-item .music-title{
	.playlist-name{
		float: left;
		width: 75%;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-top: 5px;
		font-size:13px;
		color:#000000;
	}
	.playlist-singer{
		float: left;
		width: 75%;
		font-size: 12px;
		color: #797979;
		span{
			margin-right: 5px;
		}
	}	
}
</style>