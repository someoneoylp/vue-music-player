<template>
	<div class="music">
		<music-nav></music-nav>
		<transition :name="transitionName2">
			<router-view class="content-view"></router-view>
		</transition>
	</div>
	<!--  -->
</template>

<script>
import musicNav from "./music-nav.vue"
import {mapState} from "vuex"
export default {
 computed:{
 	...mapState({
 		transitionName: state=>state.transitionName,
    transitionName2: state=>state.transitionName2
 	})
 },
	components: {
    'music-nav': musicNav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>