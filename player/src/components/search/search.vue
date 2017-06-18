<template>
	<div class="search">
		<!--搜索框-->
		<div class="search-bar">
			<router-link @click.native="init()" to="/music" class="back"></router-link>
			<div class="search-part">
				<input type="text" placeholder="搜索音乐、歌手、歌词、用户" name="search-words" v-model="keyword" @keyup.self="search($event)" />
				<i v-show="keyword" class="icon" @click="endSearch()"></i>
			</div>		
		</div>
		<!--搜索框输入关键词keyword后的下拉菜单-->
		<div v-if="keyword" class="search-result">
			<li><p>搜索“{{keyword}}”</p></li>
			<ul v-for="item in result" >
				<li v-for="obj in item" v-if="item!=result.order" @click="chooseResult($event)"><i class="icon"></i><span>{{obj.name}}</span></li>
			</ul>
		</div>
		<!--搜索框未输入时 下方的推荐-->
		<div v-if="!showResultPage" class="search-tips">
			<div class="search-type"><p><i></i>歌手分类></p></div>
			<div class="search-hot">
				<h2>热门搜索</h2>
				<ul>
					<li v-for="item in hotSearch" @click="hotSearchResult($event)">{{item}}</li>
				</ul>
			</div>	
		</div>
		<!--选择关键词keyword后的结果tab页-->
		<div v-if="showResultPage" class="result-page">
			<div class="nav">
					<router-link 
						v-for="(item,index) in tabNav" 
						:to="{name:item.routerLink, params:{id: item.typeId}}" 
						:class="[item.divClass, {'isActive': item.isActive}]" 
						@click.native="change(index)">
							{{item.a}}
					</router-link>
			</div>			
			<transition :name="transitionName2">
				<router-view></router-view>	
			</transition>
		</div>	
	</div>
</template>
<script>
import api from '../../api'
import searchContentView from './search-content-view.vue'
import {mapState} from 'vuex'
export default{
	name:'search',
	data(){
		return{
			keyword:'',
			result: '',
			hotSearch: ['安河桥', '追光者', '2U', '随便你', '我爱你', '王菲', '周杰伦', '你就不要想起我'],
			searchIsActive: true,
			searchIsDefault: false,
			tabNav: [
				{divClass:'song', isActive:true, routerLink:'searchContentView', typeId:1, a:'单曲'},
				{divClass:'artist', isActive:false, routerLink:'searchContentView', typeId:100, a:'歌手'},
				{divClass:'album', isActive:false, routerLink:'searchContentView', typeId:10, a:'专辑'},
				{divClass:'playlist', isActive:false, routerLink:'searchContentView', typeId:1000, a:'歌单'}
				// {divClass:'mv', isActive:false, routerLink:'searchContentView', typeId:0, a:'MV'},
			]
		}
	},
	mounted(){
		this.$store.state.hidNav = false;
	},
	computed:{
		...mapState({
			hidNav:state=>state.hidNav,
			transitionName2: state=>state.transitionName2,
			searchKeyWord: state=>state.searchKeyWord,
			notFound: state=>state.notFound,
			showResultPage: state=>state.showResultPage
		})
	},
	watch:{
		'searchKeyWord': 'searchAll'
	},
	methods:{
		init(){
			this.$store.state.hidNav = true;
			this.$store.state.showResultPage = false;
		},
		//监听input的搜索函数
		search(){
			var input = event.target;	
			api.getSearchSuggestResource(input.value).then((response)=>{
				this.result = response.data.result;
			}).catch((error)=>{
				console.log("搜索出错:"+error);
			})
			//按下回车键
			if(event.keyCode == 13){
				console.log('enter');
				this.$store.state.searchKeyWord = input.value;
				this.searchAll();
				this.$store.state.showResultPage = true;
				this.endSearch();
			}
		},
		endSearch(){
			this.keyword = '';
		},
		//搜索的下拉菜单
		chooseResult(){
			this.$store.state.showResultPage = true;
			this.$store.state.searchKeyWord = event.target.parentNode.getElementsByTagName('span')[0].innerHTML;
			console.log('key'+this.$store.state.searchKeyWord);
			this.endSearch();
		},
		//tab切换函数
		change(index){
			this.tabNav.map(function(value,i,arr){
				i==index? value.isActive=true: value.isActive=false;
			});
		},
		hotSearchResult(){
			this.$store.state.showResultPage = true;
			this.$store.state.searchKeyWord = event.target.innerHTML;
		},
		searchAll(){
			this.$store.state.notFound = [false, false, false];
			console.log(this.$store.state.notFound );
			api.getSearchResource(this.searchKeyWord,1).then((response)=>{
				this.$store.state.musicLists = response.data.result.songs;
				console.log('歌曲'+this.searchKeyWord);
				console.log(response.data.result.songs);	
			});

			
			api.getSearchSuggestResource(this.searchKeyWord,100).then((response)=>{
				if(typeof(response.data.result.artists)=='undefined'){
					this.$store.state.notFound = [true,false,false];
				}else{
					this.$store.state.artist = response.data.result.artists[0];
				}
				console.log('歌手'+this.searchKeyWord);
				console.log(this.$store.state.notFound );
			});

			
			api.getSearchResource(this.searchKeyWord,10).then((response)=>{
				if(typeof(response.data.result.albums)=="undefined"){
					this.$store.state.notFound = [false,true,false];
				}else{
					this.$store.state.albums = response.data.result.albums;
				}
				console.log('专辑'+this.searchKeyWord);
				console.log(response.data.result.albums);
			});

			
			api.getSearchResource(this.searchKeyWord,1000).then((response)=>{
				if(typeof(response.data.result.playlists)=="undefined"){
					this.$store.state.notFound = [false,false,true];
				}else{
					this.$store.state.playlists = response.data.result.playlists;
				}
				console.log('歌单'+this.searchKeyWord);
				console.log(response.data.result.playlists);
			});
		}
	}	
} 
</script>
<style lang="less">
	@import '../../../static/css/search.less';
</style>