<template>
	<transition name="fade">
		<div>
			<div class="music-list-info-cover" v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}">
			</div>
			<div class="music-list-info">
				<div class="list-info-header" :class="{scrollFixed:scrollToBelow}">
					<router-link @click.native="init()" to="/" class="back">
					</router-link>
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
							<div v-bind:style="{backgroundImage:'url(' + coverImgUrl + ')'}" class="imgBox">
								<p class="music-num"><i class="music-num-icon"></i>{{playCount}}</p>
								<i class="tips"></i>
							</div>
						</div>
						<div class="tit">
							<h2>{{name}}</h2>
							<p v-if="avatarUrl" class="list-author"><i class="user-pic" :style="{backgroundImage:'url(' + avatarUrl + ')'}">	</i>{{nickname}} <i class="go"></i></p>
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
			nickname : '',//歌单创建者名称
			name : '',//歌单名称
			coverImgUrl : '',//背景图片
			avatarUrl : '',//歌单创建者头像
			playCount : 0,//播放量
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
			recoListId: state => state.recoListId,
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
			this.$store.state.hidNav = true
		},
		getPlayList(){
			api.getPlayListDeatil(this.id).then((response)=>{
				//复用的组件的数据
				this.$store.state.musicLists = response.data.result.tracks;
				this.subscribedCount = response.data.result.subscribedCount;
				this.commentCount = response.data.result.commentCount;
				this.shareCount = response.data.result.shareCount;
				this.trackCount = response.data.result.tracks.length;
				//其他非组件的数据
				this.nickname = response.data.result.creator.nickname;
				this.name = response.data.result.name;
				this.coverImgUrl = response.data.result.coverImgUrl;
				this.avatarUrl=response.data.result.creator.avatarUrl;
				var count = response.data.result.playCount;
				if(count>9999){
					this.playCount =  count.toString().slice(0,-4)+'万';
				}else{
					this.playCount = count;
				}
				
			})
		}
 	}
}
</script>
<style lang="less" scoped>
	@import '../../../static/css/musicListSame.less';
</style>