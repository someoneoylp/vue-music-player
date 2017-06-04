<template>
	<transition name="fade">
			<div class="sidebar" :style="{height:screenHeight+'px'}">
		<div class="cover" @click="hideSideBar()"></div>
		<div class="sidebar-wrap">
			<div class="sidebar-header">
				<div class="sidebar-header-cover"></div>	
				<div class="sidebar-header-content">
					<i class="user-avatar"></i>
					<p class="user-info-box">
						<span>{{userInfo.userName}} <i class="level">LV.{{userInfo.level}}</i></span>
						<span class="sign"></span>
					</p>
				</div>
			</div>
			<div class="sidebar-content">
				<ul>
					<li class="my-news">
						<i></i>我的消息
					</li>
					<li class="member">
						<i></i>会员中心
					</li>
					<li class="shopping">
						<i></i>商城
					</li>
					<li class="listen">
						<i></i>在线听歌免流量
					</li>
					<li class="changeSkin">
						<i></i>主题换肤
					</li>
					<li class="night">
						<i></i>夜间模式
					</li>
				</ul>
			</div>
			<div class="sidebar-foot">
				<span class="">设置</span>
				<span>退出应用</span>
			</div>
		</div>
	</div>	
	</transition>

	
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
const screenHeight = screen.height 
const userInfo = {
	userName:"第十三个神",
	level:6
}
export default {
	data(){
		return {
			screenHeight:screenHeight,
			userInfo:userInfo
		}
	},
	methods:{
    	hideSideBar:function(){
			this.$store.state.hidSidebar = false
		}
 	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.sidebar{
	transition:all .9s;
	position: fixed;
	width: 100%;
	z-index: 100;
	.cover{
		position: absolute;
		width:100%;
		height:100%;
		background: #000000;
		opacity: 0.4;
		z-index:101;
	}
	.sidebar-wrap{
		position:relative;
		width:80%;
		height:100%;
		z-index:102;
		.sidebar-header{
			position:relative;
			height:30%;
			width:100%;
			background:url("../../../static/img/list-6.jpg") center center no-repeat;
			background-size: 100% 100%;
			.sidebar-header-cover{
				position:absolute;
				height:100%;
				width:100%;
				background: #000000;
				opacity: 0.4;
				z-index:103;
			}
			.sidebar-header-content{
				position:relative;
				z-index:104;
				height:100%;
				width:100%;
				color:#ffffff;
				font-size:14px;
				1padding:19% 0 0 15px;

				overflow:hidden;
				.user-avatar{
					display:block;
					width:62px;
					height:62px;
					border:1px solid #ffffff;
					border-radius:62px;
					background:url("../../../static/img/list-1.jpg") center center no-repeat;
					background-size: 100% 100%;
					margin:17% 0 0 10px;
				}
				.user-info-box{
					margin:20px 10px 0 10px;
					.level{
						padding: 1px 6px;
					    1border: 1px solid #ffffff;
					    font-size: xx-small;
					    border-radius: 3px;
					}
					.sign{
						float:right;
						width:20px;
						height:20px;
						background:url("../../../static/img/sign.png") center center no-repeat;
						background-size: 100% 100%;
					}
				}
			}
		}
		.sidebar-content{
			background:#F1F3F4;
			height:63%;
			overflow:hidden;
			ul{
				margin-top:10px;
			}
			li{
				height:40px;
				line-height:40px;
				font-size:14px;
				i{
					display:inline-block;
					width:20px;
					height:20px;
					vertical-align:middle;
					margin:0 15px 0 8px;
				}
			}
			.my-news i{
				background:url("../../../static/img/news.png") center center no-repeat;
				background-size: 100% 100%;
			}
			.member i{
				background:url("../../../static/img/member.png") center center no-repeat;
				background-size: 100% 100%;
			}
			.shopping i{
				background:url("../../../static/img/shopping.png") center center no-repeat;
				background-size: 100% 100%;
			}
			.listen i{
				background:url("../../../static/img/listen.png") center center no-repeat;
				background-size: 100% 100%;
			}
			.changeSkin i{
				background:url("../../../static/img/skin.png") center center no-repeat;
				background-size: 100% 100%;
			}
			.night i{
				background:url("../../../static/img/night.png") center center no-repeat;
				background-size: 100% 100%;
			}
		}
		.sidebar-foot{
			height:7%;
			width:100%;
			background:#ffffff;
			display:flex;
			span{
				flex:1;
				text-align:center;
				line-height:40px;
				font-size:12px;
			}
			&:first-child{
				border:1px solid red;
			}
		}
	}
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>