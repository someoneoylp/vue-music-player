<template>
	<div class="music-list">
		<ul>
			<li class="play-all">
				<router-link to="">
					<p class="play-icon"></p>
					<p>播放全部<span>(共{{musicLists.length}}首)</span></p>
				</router-link>
			</li>
			<li v-for="(musicList,index) in musicLists" class="list-item">
				<router-link to="" class="serial-num">
					<p>{{index+1}}</p>
				</router-link>
				<router-link to="" class="music-title">
					<p class="">
						<span class="music-name">
							{{musicList.name}}
							<i v-if="musicList.mv" class="mv-icon">MV</i>
						</span>
						<span class="music-singer">
							<i class="isDown" v-if="musicList.down"></i>
							{{musicList.singer}} - {{musicList.album}}
						</span>
					</p>
				</router-link>
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
	const musicLists = [
		{
			name:"三峰",
			singer:"布衣乐队",
			album:"喝不完的酒",
			address:"...",
			down:false,
			mv:true
		},
		{
			name:"我的梦",
			singer:"张靓颖",
			album:"我的梦",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"Moster",
			singer:"Lady Gaga",
			album:"The Fame Moster",
			address:"...",
			down:true,
			mv:false
		},
		{
			name:"鸽子",
			singer:"宋冬野",
			album:"安和桥北",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"踮起脚尖",
			singer:"洪佩瑜",
			album:"我可能不会爱你",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"我",
			singer:"蔡依林",
			album:"未完成",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"永远",
			singer:"孙燕姿",
			album:"我的梦",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"Moster",
			singer:"Lady Gaga",
			album:"The Fame Moster",
			address:"...",
			down:true,
			mv:true
		},
		{
			name:"鸽子",
			singer:"宋冬野",
			album:"安和桥北",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"踮起脚尖",
			singer:"洪佩瑜",
			album:"我可能不会爱你",
			address:"...",
			down:false,
			mv:false
		},{
			name:"三峰",
			singer:"布衣乐队",
			album:"喝不完的酒",
			address:"...",
			down:true,
			mv:false
		},
		{
			name:"我的梦",
			singer:"张靓颖",
			album:"我的梦",
			address:"...",
			down:false,
			mv:true
		},
		{
			name:"Moster",
			singer:"Lady Gaga",
			album:"The Fame Moster",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"鸽子",
			singer:"宋冬野",
			album:"安和桥北",
			address:"...",
			down:true,
			mv:false
		},
		{
			name:"踮起脚尖",
			singer:"洪佩瑜",
			album:"我可能不会爱你",
			address:"...",
			down:false,
			mv:true
		},
		{
			name:"我",
			singer:"蔡依林",
			album:"未完成",
			address:"...",
			down:true,
			mv:false
		},
		{
			name:"永远",
			singer:"孙燕姿",
			album:"我的梦",
			address:"...",
			down:false,
			mv:true
		},
		{
			name:"Moster",
			singer:"Lady Gaga",
			album:"The Fame Moster",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"鸽子",
			singer:"宋冬野",
			album:"安和桥北",
			address:"...",
			down:false,
			mv:false
		},
		{
			name:"踮起脚尖",
			singer:"洪佩瑜",
			album:"我可能不会爱你",
			address:"...",
			down:false,
			mv:false
		}
	]

export default {
	data () {
		return {
			musicLists : musicLists
		}
	},
	computed:{
		...mapState({
			hidNav: state => state.hidNav
		})
	},
	components:{
	}
}
</script>
<style>
	@import "../../../static/css/music.css";
</style>