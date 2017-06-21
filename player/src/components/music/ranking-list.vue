<template>
	<div class="music-content">
		<div class="list-type">
			<div class="list-title">
				<h1>云音乐官方榜</h1>
			</div>
			<div class="list-content" v-for="(list,index) in lists" v-if="index<4">
				<router-link :to="{name:'rankingEachPage',params:{id:list.id}}" @click.native="init()">	
					<img :src="list.coverImgUrl" alt="imgDesc" class="img">
					<ul class="content" v-for="(item,i) in list.tracks">
						<li>{{i+1}}.{{item.first}} - {{item.second}}</li>
					</ul>
				</router-link>			
			</div>	
		</div>
		<div class="list-type">
			<div class="list-title">
				<h1>全球榜</h1>
			</div>
			<div class="list-content list-content2" v-for="(list,index) in lists" v-if="index>=4">
				<router-link :to="{name:'rankingEachPage',params:{id:list.id}}" @click.native="init()">	
					<img :src="list.coverImgUrl" alt="imgDesc" class="img">
					<p>{{list.name}}</p>
				</router-link>			
			</div>	
		</div>
	</div>
	<!-- <router-view></router-view> -->
</template>

<script>
import api from '../../api'
import {mapState} from 'vuex'
export default {
	name:'rank-list',
	data(){
		return{
			lists:[],
			index:0,
			tracks:[],
		}
	},
	computed:{
		...mapState({
			hidNav:state=>state.hidNav
		})
	},
	mounted:function(){
		this.getTopListBriefResource();
		this.$store.state.musicNavIsActive = 2;
	},
	methods:{
		init:function(){
			this.$store.state.hidNav = false;
			this.$store.state.songListID = this.$route.params.id;
		},
		getTopListBriefResource: function(){
			api.getTopListBriefResource().then((response) => {
				this.lists = response.data.list;
				this.tracks = response.data.list.tracks;
      }).catch((error) => {
        console.log('加载歌单信息出错:' + error);
      });
		}
	}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
*{
	margin: 0;
	padding: 0;
	font-size: 100%;
}
.music-content{
	margin: 0 auto;
	.list-type{
		float: left;
		padding:0 5%;
		.list-title{
			width: 100%;
	    height: 1.2rem;
	    font-size: 1rem;
	    text-indent: 0.5rem;
	    border-left: 2px solid #b72712;
	    margin-top: 1rem;
		}	
		.list-content{
			float: left;
			width: 100%;
			margin-top: 10px;
			.img{
				width: 6.5rem;
				height: 6.5rem;
				float: left;
			}
			.content{
				float: right;
				width: 60%;
				margin: 0.3rem 0 0.4rem auto;
				font-size: 0.8rem;
				li{
					overflow: hidden;
					text-overflow:ellipsis;
					height: 1.5rem;
					line-height: 1.5rem;
				}
			}	
		}	
		.list-content2{
			width: 50%;
			height: 200px;
			a{
				display: block;
				height: 100%;
				padding:10px;
				.img{
					width: 100%;
					height: auto;
					float: left;
				}
				p{
					width: 100%;
					font-size: 0.8rem;
					line-height: 2rem;
					float: left;
					text-align: center;
				}	
			}			
		}
	}	
}

</style>