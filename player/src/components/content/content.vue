<template>
	<div class="content">
		<router-view></router-view> 
	</div>
</template>

<script>
export default {
	name:"content"
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.content{
		width: 100%;	
	}
</style>