<template>
	<div class="music-list">
		<ul>
			<li class="play-all">
				<router-link to="">
					<p class="play-icon"></p>
					<p>播放全部<span>(共{{trackCount}}首)</span></p>
				</router-link>
			</li>
			<li v-for="(musicList,index) in musicLists" class="list-item">
				<span class="serial-num" @click="playFoot(musicList.id,index)">{{index+1}}</span>
				<span class="music-title" @click="playFoot(musicList.id,index)">
					<p class="">
						<span class="music-name">
							{{musicList.name}} <span v-if="musicList.alias">- {{musicList.alias[0]}}</span>
						</span>
						<span v-if="musicList.artists" class="music-singer" v-for="artist in musicList.artists">
							<i class="isDown" v-if="musicList.down"></i>
							{{artist.name}} 
						</span>
						<span v-if="musicList.album" class="music-album"> - {{musicList.album.name}}</span>
					</p>
				</span>
				<p class="music-more" @click="">
					<i></i>
					<i></i>
					<i></i>
				</p>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
export default {
	computed:{
		...mapState({
			musicLists: state => state.musicLists,
			trackCount: state => state.trackCount
		})
	},
	methods:{
		playFoot:function(id,index){
			this.$store.state.currentMusic =id
			this.$store.state.currentindex = index
		}
	}
}
</script>
<style lang="less">
	@import '../../../static/css/music.less';
</style>