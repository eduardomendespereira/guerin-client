<template>
  <section
    class="hero is-fullheight"
    style="justify-content: center !important"
  >
    <div class="columns">
      <div
        class="column is-3 hero is-fullheight"
        style="border-width: 3px; border-color: #999; padding: 0px"
      >
        <SideBar />
      </div>
      <div class="column is-9" style="padding: 0px">
         <router-view></router-view>
     </div>
    </div>
  </section>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
};
</script>

<style scoped lang="scss"></style>
