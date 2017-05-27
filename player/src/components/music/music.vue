<template>
	<div class="music">
		<music-nav></music-nav>
		<router-view></router-view>
	</div>
	<!--  -->
</template>

<script>
import musicNav from "./music-nav.vue"
export default {
	components: {
      'music-nav': musicNav
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>