<template>
	<div class="music-content">
		<div class="list-type" v-for="list in lists">
			<div class="list-title">
				<h1>{{list.name}}</h1>
			</div>
			<div class="list-content" v-for="item in list.content">
				<router-link :to="{name:'rankingEachPage',params:{id:item.id,bgColor:item.bgColor,date:item.date,name:item.name}}" @click.native="init()">	
					<img :src="item.img" alt="imgDesc" class="img">
					<ul class="content">
						<li v-for="i in item.music">{{i}}</li>
					</ul>
				</router-link>			
			</div>	
				
		</div>
	</div>
	<!-- <router-view></router-view> -->
</template>

<script>
const lists = [
	{
		name:"list1",
		content:[
			{
				id:1,
				name:"飙升榜",
				date:"1月11日",
				img:'../../static/img/test1.png',
				bgColor:'#6593E0',
				music:['第一类排行','22222222222222222222222222222','333333333333333333333333333']
			},
			{
				id:2,
				name:"新歌榜",
				date:"2月19日",
				bgColor:'#48B4B7',
				img:'../../static/img/test2.png',
				music:['111111111111111111111','22222222222222222222222222222','333333333333333333333333333']
			},
			{
				id:3,
				name:"原创榜",
				date:"8月12日",
				bgColor:'#C5496D',
				img:'../../static/img/test3.png',
				music:['111111111111111111111','22222222222222222222222222222','333333333333333333333333333']
			}
		]
	},
	{
		name:"list2",
		content:[
			{
				id:1,
				img:'../../static/img/test1.png',
				music:['第2类排行','22222222222222222222222222222','333333333333333333333333333']
			},
			{
				id:2,
				img:'../../static/img/test2.png',
				music:['111111111111111111111','22222222222222222222222222222','333333333333333333333333333']
			},
			{
				id:3,
				img:'../../static/img/test3.png',
				music:['111111111111111111111','22222222222222222222222222222','333333333333333333333333333']
			},
			{
				id:4,
				img:'../../static/img/test1.png',
				music:['111111111111111111111','22222222222222222222222222222','333333333333333333333333333']
			}
		]
	}
]
import {mapState} from 'vuex'
export default {
	name:'rank-list',
	data(){
		return{
			lists:lists
		}
	},
	computed:{
		...mapState({
			hidNav:state=>state.hidNav
		})
	},
	methods:{
		init:function(){
			this.$store.state.hidNav = false
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
			margin-top: 20px;
			.img{
				width: 6.5rem;
				height: 6.5rem;
				float: left;
			}
			.content{
				float: right;
				width: 60%;
				margin: 0.8rem 1rem auto auto;
				font-size: 0.8rem;
				li{
					overflow: hidden;
					text-overflow:ellipsis;
					height: 1.5rem;
					line-height: 1.5rem;
				}
				
			}	
		}	
	}
	
	
}

</style>