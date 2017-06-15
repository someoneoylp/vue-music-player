<template>
	<div class="album-list">
		<p class="notFoundTips" v-if="notFound[1]==true">{{notFoundTips}}</p>
		<ul v-else>
			<li v-for="(album,index) in albums" class="list-item">
				<router-link :to="{name:'rankingEachPage',params:{id:album.id}}" class="music-title">
					<img :src="album.picUrl" class="artist-img" alt="">
					<p class="album-name">{{album.name}}</p>
					<p class="album-singer" v-for="artist in album.artists">{{artist.name}}</p>
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
	name: 'searchAlbum',
	data(){
		return{
			id: this.$route.params.id,
			notFoundTips:'很抱歉，没有搜索到该专辑。'
		}
	},
	computed:{
		...mapState({
			albums: state => state.albums,
			searchKeyWord: state => state.searchKeyWord,
			notFound: state=>state.notFound
		})
	}
}
</script>
<style lang="less" scoped>
.album-list{
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
			.album-name{
				float: left;
				width: 80%;
				margin-top: 10px;
				font-size:13px;
				color:#000000;
			}
			.album-singer{
				float: left;
				width: 80%;
				font-size: 12px;
    		color: #797979;
			}
		}
	}	
}
</style>