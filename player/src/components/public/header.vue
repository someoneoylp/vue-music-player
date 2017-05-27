<template>
	<div class="header">
		<div class="func">
			<div class="burger"></div>
			<div class="burger"></div>
			<div class="burger"></div>
		</div>
		<div class="header-nav">
		 	<i class="music header-nav-icon">
		        <router-link to="/music" active-class="musAct"></router-link>
		    </i>
			<i class="list header-nav-icon">
		        <router-link to="/list" active-class="listAct"></router-link>
		    </i>
		    <i class="friends header-nav-icon">
		        <router-link to="/friends" active-class="friAct"></router-link>
		    </i>
		</div>
		<div class="search"></div>
	</div>
</template>

<script>
export default {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header{
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 3.5rem;
	background: rgb(183, 39, 18);
}
.func{
	width:3.5rem;
	height: 100%;
	flex: 1;
	padding: 16px 0 0 0;
	cursor:pointer;
}
.burger{
	width:50%;
	height:0.1rem;
	background:#ffffff;
	margin: 6px 0 0 20%;
	border-radius:1px;
	cursor:pointer;
	transition:all .5s;
	
}
.burger:first-child{
	margin-top: 0.8rem;
}
.header-nav{
	display: flex;
	flex: 4;
	height: 100%;
	text-align: center;
}
.search{
	flex: 1;
	height: 100%;
}
.header-nav-icon{
	flex: 1;
	display: inline-block;
	line-height: 50px;
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
.search{
	background: url("../../assets/search.png") center center no-repeat;
}
.header-nav-icon a{
	display: block;
	width: 100%;
	height: 100%;
}
</style>