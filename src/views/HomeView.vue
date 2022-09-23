<template>
  <div class="main">
      <SideBar />
      <router-view></router-view>
  </div>
</template>

<script lang="ts">
import SideBar from "@/components/SideBar.vue";

export default {
  components: {
    SideBar,
  },
};
</script>

<style scoped lang="scss">
.main {
	display: flex;
	main {
		flex: 1 1 0;
		padding: 2rem;
		@media (max-width: 1024px) {
			padding-left: 6rem;
		}
	}
}</style>
