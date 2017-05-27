<template>
	<div class="header">
		<div class="func">
			<div class="burger"></div>
			<div class="burger"></div>
			<div class="burger"></div>
		</div>
		<div class="header-nav">
		 	<div class="">
		        <router-link to="/music">歌单</router-link>
		    </div>
			<div class="">
		        <router-link to="/list">我的音乐</router-link>
		    </div>
		    <div class="">
		        <router-link to="/friends">好友</router-link>
		    </div>
		</div>
		<div class="search"></div>
		<!-- <router-view></router-view> -->
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
	padding: 20px 0 0 0;
	cursor:pointer;
}
.burger{
	width:60%;
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
	flex: 4;
	height: 100%;
	background: yellow;
	/* background: url("../../assets/wyy-action.png"); */
}
.search{
	flex: 1;
	height: 100%;
}
</style>