<template>
	<div class="search-artist search-list-same">
		<p class="notFoundTips" v-if="notFound[0]">{{notFoundTips}}</p>
		<ul v-else>
			<li class="list-item">
				<a class="music-title" @click="noMorePage($event)">
					<img :src="artist.img1v1Url" class="artist-img" alt="">
					<p class="artist-name">{{artist.name}}</p>
				</a>
			</li>
		</ul>
	</div>
</template>
<script>
import api from '../../api'
import { mapState } from 'vuex'
import {change} from "../../store/index.js"
export default {
	name:'searchArtist',
	data(){
		return{
			id: this.$route.params.id,
			notFoundTips:'很抱歉，没有搜索到该歌手。'
		}
	},
	watch:{
		searchKeyWord(){
			this.notFoundTips = '很抱歉，没有搜索到该歌手。';
		}
	},
	computed:{
		...mapState({
			artist: state => state.artist,
			searchKeyWord: state => state.searchKeyWord,
			notFound: state=>state.notFound
		})
	},
	methods:{
		noMorePage(){
			event.preventDefault();
			this.notFoundTips = "很抱歉，没有该歌手信息api";
			this.$store.state.notFound = [true,false,false]; 
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../../static/css/searchListSame.less';
.search-artist .list-item .artist-name{
	font-size:13px;
	float: left;
	color:#000000;
	width: 75%;
	height: 60px;
	line-height: 60px;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>