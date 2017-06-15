<template>
	<div class="artist-list">
		<p class="notFoundTips" v-if="notFound[0]==true">{{notFoundTips}}</p>
		<ul v-else>
			<li class="list-item">
				<router-link :to="{name:'rankingEachPage',params:{id:artist.id}}" class="music-title">
					<img :src="artist.img1v1Url" class="artist-img" alt="">
					<p class="artist-name">{{artist.name}}</p>
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
	name:'searchArtist',
	data(){
		return{
			id: this.$route.params.id,
			notFoundTips:'很抱歉，没有搜索到该歌手。'
		}
	},
	computed:{
		...mapState({
			artist: state => state.artist,
			searchKeyWord: state => state.searchKeyWord,
			notFound: state=>state.notFound
		})
	}	
}
</script>
<style lang="less" scoped>
.artist-list{
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
			.artist-name{
				font-size:13px;
				float: left;
				color:#000000;
				width: 80%;
				height: 60px;
				line-height: 60px;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}	
}
</style>