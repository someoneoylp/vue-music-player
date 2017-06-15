<template>
	<div class="search-content-view">
		<musicList v-if="this.$route.params.id == 1"></musicList>
		<searchArtist v-if="this.$route.params.id == 100"></searchArtist>
		<searchAlbum v-if="this.$route.params.id == 10"></searchAlbum>
		<searchPlaylist v-if="this.$route.params.id == 1000"></searchPlaylist>
	</div>		
</template>
<script>
import api from '../../api'
import {mapState} from 'vuex'
import musicList from "../public/music-list.vue"
import searchArtist from './search-artist.vue'
import searchAlbum from './search-album.vue'
import searchPlaylist from './search-playlist.vue'
export default{
	name: 'searchContentView',
	data(){
		return{
			id: this.$route.params.id
		}
	},
	components:{
		musicList,
		searchArtist,
		searchAlbum,
		searchPlaylist
	}
}
</script>
<style lang="less" scoped>
.search-content-view{
	width: 100%;
	height: 100%;
}
</style>