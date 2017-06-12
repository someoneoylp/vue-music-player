<template>
	<div class="header">
		<div class="func" @click="showSideBar()">
			<div class="burger"></div>
			<div class="burger"></div>
			<div class="burger"></div>
		</div>
		<div class="header-nav">
		 	<i class="music header-nav-icon">
		        <router-link :to="{name:'music',query:{key:1}}" active-class="musAct"></router-link>
		    </i>
			<i class="list header-nav-icon">
		        <router-link :to="{name:'list',query:{key:2}}" active-class="listAct"></router-link>
		    </i>
		    <i class="friends header-nav-icon">
		        <router-link :to="{name:'friends',query:{key:3}}" active-class="friAct"></router-link>
		    </i>
		</div>
		<div class="search"></div> 
		
	</div>
</template>

<script>
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
import api from '../../api/index';
import {change} from "../../store/index.js"
export default {
	data () {
		return {
			host : this.HOST
		}
	},
	 mounted () {
	
	},
	methods:{
    	showSideBar:function(){
			this.$store.state.hidSidebar = true
			console.log(this.$store.state.hidSidebar)
		},
		getData:function(){
			api.getTopPlaylistResource()
			.then((response)=>{
				console.log(response.data);
			})
		}
	}
}
		
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less">
.header{
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 3.5rem;
	background: rgb(183, 39, 18);
	.func{
		width:3.5rem;
		height: 100%;
		flex: 1;
		padding: 16px 0 0 0;
		cursor:pointer;
		.burger{
			width:50%;
			height:0.1rem;
			background:#ffffff;
			margin: 6px 0 0 20%;
			border-radius:1px;
			cursor:pointer;
			transition:all .5s;
			&:first-child{
				margin-top: 0.8rem;
			}
		}
	}
	.header-nav{
		display: flex;
		flex: 4;
		height: 100%;
		text-align: center;
		.header-nav-icon{
			flex: 1;
			display: inline-block;
			line-height: 50px;
			a{
				display: block;
				width: 100%;
				height: 100%;
			}
		}
		.music a{
			background: url("../../assets/wyy.png") center center no-repeat;
		}
		.musAct{
			background: url("../../assets/wyy-action.png") center center no-repeat !important;
		}
		.list a{
			background:url("../../assets/music.png") center center no-repeat;
		}
		.listAct{
			background: url("../../assets/music-action.png") center center no-repeat !important;
		}
		.friends a{
			background: url("../../assets/friends.png") center center no-repeat;
		} 
		.friAct{
			background: url("../../assets/friends-action.png") center center no-repeat !important;
		}
	}
	.search{
		flex: 1;
		height: 100%;
		background: url("../../assets/search.png") center center no-repeat;
		background-size: 40% 40%;
	}
}

</style>