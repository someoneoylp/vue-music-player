<template>
  <div>
   <v-header></v-header>
  </div>
</template>

<script>
import header from './components/public/header.vue';
export default {
  components: {
      'v-header': header
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
