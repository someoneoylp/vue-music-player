<template>
  <div id="app">
      <div v-show="hidNav">
          <v-header></v-header>
       </div>
       <router-view></router-view> 
       <div v-show="hidFoot">
          <v-footer></v-footer>
       </div>
  </div>
</template>

<script>
import header from './components/public/header.vue'
import footer from './components/public/footer.vue'
import { mapState, mapActions,mapGetters,mapMutations} from 'vuex'
export default {
  computed:{
    ...mapState({
      hidNav: state => state.hidNav,
      hidFoot: state => state.hidFoot
    })
  },
  components: {
      'v-header': header,
      'v-footer' : footer
    }
}
</script>

<style>

</style>
