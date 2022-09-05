<template>
  <Login />
</template>

<script lang="ts">
import Login from "@/components/Login.vue";

export default {
  components: { Login },
};
</script>

<style lang="scss">
@import "~bulma/bulma.sass";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
