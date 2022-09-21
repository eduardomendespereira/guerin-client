<template>
  <HomeView></HomeView>
</template>

<style lang="scss">
@import "~bulma/bulma.sass";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
<script lang="ts">
import Login from "@/views/Login.vue";
import HomeView from "./views/HomeView.vue";
export default {
  components: { Login, HomeView }
}
</script>