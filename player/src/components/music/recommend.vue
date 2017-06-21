<template>
	<div class="music-content">
		<!-- 轮播图部分 -->
		<div class="carousel-figure">
			<div class="carousel-figure-pic">
				<transition-group tag="ul" class='slide-ul pic-ul' name="list" :style="{width:winWidth*pic.length+'px',left:winWidth*n+'px'}">
					<li v-for="(img,index) in pic" :key="index" class="pic-list" :style="{width:winWidth+'px'}">
						<img :src="img" alt="" class="pic-item" :style="{width:winWidth+'px'}">
					</li>
				</transition-group>
				<div class="carousel-items">
				   <span v-for="(item,index) in pic.length" @click="change(index)" :class="index == -n?'carousel-active':''"></span>
				</div>
			</div>
		</div>
		<!-- 推荐音乐列表部分 -->
		<div class="music-list-content">
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="recommend-icon"></i>推荐歌单</p>
				<div class="music-list-item" v-for="musicList in persRecoLists"> 
					<div class="imgWrapContainer">
						<router-link @click.native="init()" :to="{name:'musicList',params: {id:musicList.id}}" class="imgWrap" v-bind:style="{backgroundImage:'url(' + musicList.picUrl + ')'}">
							<p class="music-num"><i class="music-num-icon"></i> {{musicList.playCount}}</p>
							<p class="music-user"><i class="music-user-icon"></i>{{musicList.author}}</p>
						</router-link> 
					</div>
					<p class="music-des">{{musicList.name}}</p>
				</div>
			</div>
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="sole-icon"></i>独家放送</p>
				<div class="music-list-item-sole" v-for="(soleList,index) in soleLists" v-if="index>0"> 	<div class="imgWrap">
						<router-link to="/" class="imgWrap" v-bind:style="{backgroundImage:'url(' + soleList.picUrl + ')'}">
							
						</router-link> 
					</div>
					<p class="music-des">{{soleList.name}} </p>
				</div>
				<div class="music-list-item sole-bottom" v-for="(soleList,index) in soleLists" v-if="index==0"> 
					<div class="imgWrap">
						<router-link to="/" class="imgWrap" v-bind:style="{backgroundImage:'url(' + soleList.picUrl + ')'}">
							
						</router-link> 
					</div>
					<p class="music-des">{{soleList.name}} </p>
				</div>
			</div>
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="recommend-icon"></i>最新音乐</p>
				<div class="music-list-item" v-for="musicList in persRecoLists"> 
					<div class="imgWrap">
						<router-link @click.native="init()" :to="{name:'musicList',params: {id:musicList.id}}" class="imgWrap" v-bind:style="{backgroundImage:'url(' + musicList.picUrl + ')'}">
							<p class="music-num"><i class="music-num-icon"></i> {{musicList.playCount}}</p>
							<p class="music-user"><i class="music-user-icon"></i>{{musicList.author}}</p>
						</router-link> 
					</div>
					<p class="music-des">{{musicList.name}}</p>
				</div>
			</div>
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="mv-icon"></i>推荐MV</p>
				<div class="music-list-item recoMv" v-for="recoMvList in recoMvLists"> 
					<div class="imgWrap">
						<router-link to="/" class="imgWrap" v-bind:style="{backgroundImage:'url(' + recoMvList.picUrl + ')'}">
							<p class="music-num"><i class="music-num-icon"></i> {{recoMvList.playCount}}</p>
						</router-link> 
					</div>
					<p class="music-des">{{recoMvList.name}} </p>
				</div>
			</div>
			<div class="recommend-playlist">
				<p class="recommend-title"><i class="station-icon"></i>主播电台</p>
				<div class="music-list-item" v-for="stationList in stationLists"> 
					<div class="imgWrap">
						<router-link to="/" class="imgWrap" v-bind:style="{backgroundImage:'url(' + stationList.picUrl + ')'}">
							
							<p class="music-user"><i class="music-user-icon"></i>{{stationList.program.radio.name}}</p>
						</router-link> 
					</div>
					<p class="music-des">{{stationList.name}} </p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import {change} from "../../store/index.js"
import api from '../../api/index'
var soleLists =[];
var newestLists = [];
var recoMvLists =[];
var stationLists=[];
/*屏幕宽度*/
var winWidth = screen.width
export default {
	data(){
		return {
			 pic:["../../../static/img/16.jpg","../../../static/img/6.jpg","../../../static/img/1.jpg","../../../static/img/16.jpg"],//轮播图图片
             now:"./images/1.jpg",
             winWidth : winWidth,
             n:0,
             currentIndex: 0,
             i:0,
             soleLists : soleLists,
             newestLists:newestLists,
             recoMvLists:recoMvLists,
             stationLists:stationLists
		}
	},
	computed:{
		...mapState({
			hidNav: state => state.hidNav,
			persRecoLists:state=>state.persRecoLists,
		})/*recoListId:state=>state.recoListId,*/
	},
	mounted:function(){
		this.$store.state.musicNavIsActive = 1;
	 	//定时器，每隔2000向左移动winWidth+px
	      var _this=this;
	    setInterval(function(){
	       _this.n--;
	        if(-(_this.n)>=_this.pic.length){
	       	 _this.n=0;
	       }
	     },2000)
	    this.getData()
    },
    watch:{
    	/*n(curVal,oldVal){
    		console.log(curVal+":curVal"+-this.pic.length)
    		if(curVal-1==-this.pic.length){
				this.n=0
    		}
		}*/
    },
    methods:{
    	change:function(index){
    		this.n = -index
    	},
    	init:function(id){
			this.$store.state.hidNav = false;
		},
		getData:function(){
			api.getPersonalized()
			.then((response)=>{
				let dataResult = response.data.result
				this.$store.state.persRecoLists = dataResult;
				for(let i=0;i<dataResult.length;i++){
					let playCount = this.$store.state.persRecoLists[i].playCount
					if(playCount>9999){
						this.$store.state.persRecoLists[i].playCount = this.$store.state.persRecoLists[i].playCount.toString().slice(0,2)+'万'
					} 
				}
			}),
			api.getPrivatecontent()
			.then((response)=>{
				let dataResult = response.data.result
				this.soleLists = dataResult;
			}),
			api.getBroadcastingStation()
			.then((response)=>{
				let dataResult = response.data.result
				this.stationLists = dataResult;
			}),
			api.getPersonalizedMv()
			.then((response)=>{
				let dataResult = response.data.result
				this.recoMvLists = dataResult;
				for(let i=0;i<dataResult.length;i++){
					let playCount = this.recoMvLists[i].playCount
					if(playCount>9999){
						this.recoMvLists[i].playCount = this.recoMvLists[i].playCount.toString().slice(0,2)+'万'
					} 
				}

			})
		}
		
 	}	
 }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
@import '../../../static/css/recommend.less';
</style>