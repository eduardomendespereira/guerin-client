<template>
  <aside class="is-fullheight" style="width: 100%">
    <DataTable fetchUrl="/users" :columns="columns"></DataTable>
  </aside>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import DataTable from "../../components/DataTable.vue";

@Options({
  components: {
    DataTable,
  },
})
export default class UserView extends Vue {
  public columns = [
    "id",
    "registered",
    "updated",
    "inactive",
    "firstName",
    "lastName",
    "email",
    "username",
    "password",
    "role",
  ];
}
</script>