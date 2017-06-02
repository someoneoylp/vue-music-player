<template>
	<div>
		<div class="music-list-info">
			<div class="list-info-header" :class="{scrollFixed:scrollToBelow}" :style="{backgroundColor:this.$route.params.bgColor}">
				<router-link @click.native="init()" to="/" class="back">
					
				</router-link>
				<span class="music-title">
					<span v-if="">歌单</span>
					<span v-if="show">{{}}</span>
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
						<div v-bind:style="{backgroundImage:'url(' + musicListInfo.backgroundUrl + ')'}" class="imgBox">
							<p class="music-num"><i class="music-num-icon"></i>{{musicListInfo.playQuantity}}</p>
							<i class="tips"></i>
						</div>
					</div>
					<div class="tit">
						<h2>{{musicListInfo.describe}}</h2>
						<p class="list-author"><i class="user-pic">	</i>{{musicListInfo.author}} <i class="go"></i></p>
					</div>
				</div>
				<div class="list-operation">
					<contentOp></contentOp>
				</div>
			</div>
		</div>
		<div class="list-content">
			 <musicList></musicList> 
		</div>
	</div>
</template>

<script>
import contentOp from ".././public/content-operation.vue"
import musicList from ".././public/music-list.vue"
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
const musicListInfo = {
	author:"一般不淡定",
	playQuantity:"800万",
	describe:"【毕业季】我们不说再见",
	backgroundUrl:'../../../static/img/list-6.jpg'
}

export default {
	data(){
		return {
			show:false,
			musicListInfo:musicListInfo
		}
	},
	components:{
		contentOp,
		musicList
	},
	computed:{
		...mapState({
			hidNav: state => state.hidNav,
			scrollToBelow:state=>state.scrollToBelow
		})
	},
	methods:{
  	init:function(){
			this.$store.state.hidNav = true
		},
		getScroll:function(){
			this.scroll = document.body.scrollTop
			if(this.scroll>=30){
				this.$store.state.scrollToBelow = true
			}else{
				this.$store.state.scrollToBelow = false
			}	
		}
 	},
 	mounted(){
		window.addEventListener('scroll',this.getScroll)
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.music-list-info{
	width:100%;
	background:rgb(214, 235, 236);
	.back{
		display:inline-block;
		width:30px;
		height:35px;
		background:url("../../../static/img/back.png") center center no-repeat;
		background-size:80% 80%;
		vertical-align:middle;
	}
	.music-title{
		font-size:16px;
		color:#ffffff;
	}
	.search{
		float:right;
		width:35px;
		height:35px;
		background:url("../../../static/img/search.png") center center no-repeat;
		background-size:60% 60%;
		vertical-align:middle;
	}
	.list-more{
		float:right;
		width:30px;
		height:35px;
		clear:right;
		text-align: center;
	    padding-top: 3%;
	    i{
			display:block;
			float:right;
			clear:both;
			width:2px;
			height:2px;
			border:1px solid #FFFFFF;
			background:#FFFFFF;
			border-radius:2px;
			margin: 0px 15px 2px 0;
		}
	}
}
.list-info-content{
	height:180px;
	background:#d6ebec;
	.list-detail{
		display:flex;
		width:90%;
		height:120px;
		padding:0 0 0 5%;
		.name-detail{
			flex:1;
			.imgBox{
				width:110px;
				height:110px;
				background-size:100% 100%;
				overflow:hidden;
				.music-num{
					width: 50%;
					height: 18px;
					float: right;
					line-height: 18px;
					font-size: 12px;
					color: #ffffff;
					background:rgba(0, 0, 0, 0.17);
					.music-num-icon{
						display: inline-block;
						width: 10px;
						height: 10px;
						margin: 0 4px;
						background:url(../../assets/Headset.png) left center no-repeat;
						background-size:100% 100%;
					}
				}
				.tips{
					display: inline-block;
					margin:90px 0 0 4px;
					width: 15px;
					height: 15px;
					background:url(../../../static/img/tips.png) left center no-repeat;
					background-size:100% 100%;
				}
			}
		}
		.tit{
			flex:3;
			padding: 10px 4px 0 6px;
			font-size:15px;
			color:#ffffff;
			.list-author{
				margin-top:20px;
				font-size:12px;
				.user-pic{
					display:inline-block;
					width:20px;
					height:20px;
					border-radius:20px;
					margin-right:4px;
					background:url(../../../static/img/list-6.jpg) left center no-repeat;
					background-size:100% 100%;
					vertical-align:middle;
				}
				.go{
					display:inline-block;
					width:10px;
					height:10px;
					background:url(../../../static/img/go.png) left center no-repeat;
					background-size:100% 100%;
				}
			}
		}
	}
}
.scrollFixed{
	position: fixed;
	top:0;
	left: 0;
	width: 100%;
	background-color: rgba(0, 0, 0, 0.2);
}
</style>