<template>
    <ListSpecie></ListSpecie>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ListSpecie from '../../components/Specie/ListSpecie.vue';
@Options({
  components: {
    ListSpecie
  },
})
export default class SpecieView extends Vue {}

</script>