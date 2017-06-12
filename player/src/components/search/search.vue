<template>
	<div class="search">
		<div class="search-bar">
			<router-link @click.native="init()" to="/music/rankingList" class="back"></router-link>
			<div class="search-part">
				<input type="text" value="搜索音乐、歌手、歌词、用户" name="search-words" />
				<i class=""></i>
			</div>		
		</div>
		<div class="search-type"><p><i></i>歌手分类></p></div>
		<div class="search-hot">
			<h2>热门搜索</h2>
			<ul>
				<li>test</li>
				<li>tsssest</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {mapState} from 'vuex'
export default{
	name:'search',
	computed:{
		...mapState({
			hidNav:state=>state.hidNav
		})
	},
	methods:{
		init(){
			this.$store.state.hidNav = true;
		}
	}
	
} 
</script>
<style lang="less">
	.search{
		width: 100%;
		height: 100%;
		.search-bar{
			height: 3.5rem;
			background-color: #b72712;
			.back{
				display:inline-block;
				width: 38px;
				height: 38px;
				margin-top: 12px;
				background:url("../../../static/img/back.png") center center no-repeat;
				background-size:80% 80%;
				vertical-align:middle;
			}
			.search-part{
				width: 86%;
				height: 30px;
				margin: 15px 10px auto auto;
				float: right;
				//margin-top: 5px;
				border-bottom: 1px solid rgba(255,255,255,.38);
				input[name='search-words']{
					width: 90%;
					height: 100%;
					font-size: 1.1rem;
					color: rgba(255,255,255,.38);
					float: left;
					background-color: #b72712;
				}
			}	
		}
		.search-type{
			width: 100%;
			height: 3rem;
			line-height: 3rem;
			text-align: center;
			border-bottom: 1px solid #ddd;
			p{
				position: relative;
				width: 150px;
    		margin: 0 auto;
    		font-size: 1rem;
				i{
					display: block;
					position: absolute;
					left: 0;
					top: 10px;
					width: 30px;
					height: 30px;
					background: url("../../assets/friends.png") center center no-repeat;
				}	
			}
		}
		.search-hot{
			h2{
				font-size: 0.9rem;
				color: #797979;
				margin: 25px auto auto 10px;
			}
			ul{
				width: 100%;
				padding: 10px; 
			}
			li{
				float: left;
				margin-left: 10px;
				padding: 5px 10px;
				border-radius: 15px;
				color: #797979;
				border:1px solid #ddd;
			}
		}
	}
</style>