<template>
  <div>
   <v-header></v-header>
   <router-view></router-view> 
   <v-footer></v-footer>
   <!-- 
   <v-content></v-content> -->
  </div>
</template>

<script>
import header from './components/public/header.vue'
import footer from './components/public/footer.vue'
export default {
  components: {
      'v-header': header,
      'v-footer' : footer
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
