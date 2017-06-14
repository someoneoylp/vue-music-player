<template>
	<div class="search-content-view">
		<musicList></musicList>
	</div>		
</template>
<script>
import api from '../../api'
import {mapState} from 'vuex'
import musicList from "../public/music-list.vue"
export default{
	name: 'searchContentView',
	deta(){
		return{
			id: this.$route.params.id,
			searchKeyWord:this.$store.sate.searchKeyWord
		}
	},
	computed:{
		...mapState({
			searchKeyWord:state=>state.searchKeyWord
		})
	},
	mounted(){
		this.searchAllBySort();
	},
	watch:{
		'$route': 'searchAllBySort'
	},
	methods:{
		searchAllBySort(){
			console.log('typeid===='+this.$route.params.id);
			switch(this.$route.params.id){
				case 1: {
					console.log('单曲');
					api.getSearchResource(this.searchKeyWord,1).then((response)=>{
						this.$store.state.musicLists = response.data.result.songs;
						console.log('----'+this.searchKeyWord);
						console.log(response.data);
					});
					break;
				}
				case 100:{
					console.log('歌手');
					api.getSearchResource(this.searchKeyWord,100).then((response)=>{
						this.$store.state.musicLists = response.data.result.artists;
						console.log('----'+this.searchKeyWord);
						console.log(response.data);
					});
					break;
				}
				case 10:{
					console.log('专辑');
					api.getSearchResource(this.searchKeyWord,10).then((response)=>{
						this.$store.state.musicLists = response.data.result.albums;
						console.log('----'+this.searchKeyWord);
						console.log(response.data);
					});
					break;
				}
				case 1000:{
					console.log('歌单');
					api.getSearchResource(this.searchKeyWord,1000).then((response)=>{
						this.$store.state.musicLists = response.data.result.playlists;
						console.log('----'+this.searchKeyWord);
						console.log(response.data);
					});
					break;
				}
				default:{
					console.log('MV');
					api.getSearchResource(this.searchKeyWord,0).then((response)=>{
						this.$store.state.musicLists = response.data.result.mvs;
						console.log('----'+this.searchKeyWord);
						console.log(response.data);
					});
					break;
				}
			}
		}
	},
	components:{
		musicList
	}
}
</script>
<style lang="less" scoped>
.search-content-view{
	width: 100%;
	height: 100%;
}
</style>