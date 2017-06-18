<template>
	<transition name="fade">
		<div>
			<div class="music-list-info-cover" v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}">
			</div>
			<div class="music-list-info">
				<div class="list-info-header" :class="{scrollFixed:scrollToBelow}">
					<a @click="init()" class="back"></a>
					<span class="music-title">
						<span v-if="">歌单</span>
					</span>
					<span class="list-more" @click="">
						<i></i>
						<i></i>
						<i></i>
					</span>
					<span class="search"></span>
				</div>
				<div class="list-info-content">
					<div class="list-detail">
						<div class="name-detail">
							<div v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}" class="imgBox"></div>
						</div>
						<div class="tit">
							<h2>{{name}}</h2>
							<p class="list-author"><i class="user-pic" :style="{backgroundImage:'url(' + avatarUrl + ')'}">	</i>{{nickname}} <i class="go"></i></p>
						</div>
					</div>
					<div class="list-operation">
						<contentOp :subscribedCount='subscribedCount' :commentCount='commentCount' :shareCount='shareCount'></contentOp>
					</div>
				</div>
			</div>
			
			<div class="list-content">
				 <musicList :trackCount='trackCount'></musicList> 
			</div>
		</div>
	</transition>
	
</template>

<script>
import contentOp from ".././public/content-operation.vue"
import musicList from ".././public/music-list.vue"
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
import api from '../../api/index'


export default {
	data(){
		return {
			id:this.$route.params.id,
			name :'',
			nickname :'',
			coverImgUrl :'',
			subscribedCount:0,//订阅数目
			commentCount:0, //评论数目
			shareCount:0, //分享数目
			trackCount:0 //歌单内歌曲数目
		}
	},
	components:{
		contentOp,
		musicList
	},
	computed:{
		...mapState({
			hidNav: state => state.hidNav,
			avatarUrl:state=>state.avatarUrl,
			scrollToBelow:state=>state.scrollToBelow
		})
	},
 	mounted:function () {
		this.getPlayList();
		this.$store.state.songListID = this.id;
		this.$store.commit('getScroll');
	},
	methods:{
		...mapMutations([
			'getScroll'
		]),
    init:function(){
    	this.$router.go(-1);
			this.$store.state.hidNav = true;
		},
		getPlayList(){
			api.getSearchAlbumResource(this.id).then((response)=>{
				console.log(response.data);
				//复用的组件的数据
				this.$store.state.musicLists = response.data.songs;
				//this.$store.state.subscribedCount = response.data.album.info.subscribedCount;
				this.commentCount = response.data.album.info.commentCount;
				this.shareCount = response.data.album.info.shareCount;
				this.trackCount = response.data.album.size;
				//其他非组件的数据
				this.name = response.data.album.name;
				this.nickname = response.data.album.artist.name;
				this.coverImgUrl = response.data.album.picUrl;
			})
		}
 	}
}
</script>
<style lang="less" scoped>
	@import '../../../static/css/musicListSame.less';
</style>