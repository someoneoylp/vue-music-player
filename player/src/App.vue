<template>
  <div id="app">
    <div v-show="hidNav">
        <v-header></v-header>
     </div>
     <transition :name="transitionName">
      <router-view class="content-view"></router-view> 
     </transition>
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
      hidFoot: state => state.hidFoot,
      transitionName: state=>state.transitionName,
      transitionName2: state=>state.transitionName2,
    })
  },
  components: {
    'v-header': header,
    'v-footer' : footer
  },
  watch:{
    '$route'(to,from){
      //app主页面key: 1, 2, 3
      //music子页面key: 1.1, 1.2
      if(from.query.key<to.query.key){
        this.$store.state.transitionName= "slideToRight"
        this.$store.state.transitionName2= "slideToRight"
      }else{
        this.$store.state.transitionName = "slideToLeft"
        this.$store.state.transitionName2= "slideToLeft"
      }
    }
  }
}
</script>

<style>
.content-view {
  position: absolute;
  width:100%;
  transition: all .5s cubic-bezier(.55,0,.1,1);
}
/*.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease;
}
.fade-enter, .fade-leave-active {
  opacity: 0;
}*/
/*往左滑*/
.slideToRight-enter, .slideToLeft-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
}
/*往右滑*/
.slideToRight-leave-active, .slideToLeft-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
}
</style>
