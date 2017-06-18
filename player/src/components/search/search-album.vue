<template>
	<div class="search-album search-list-same">
		<p class="notFoundTips" v-if="notFound[1]">{{notFoundTips}}</p>
		<ul v-else>
			<li v-for="(album,index) in albums" class="list-item">
				<router-link :to="{name:'searchAlbumPage',params:{id:album.id}}" class="music-title">
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
<style lang="less">
	@import '../../../static/css/searchListSame.less';
</style>