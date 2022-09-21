<template>
    <ListTemplate  :listagem="specieList" :columns="columns" :edit="edit"></ListTemplate>
</template>

<script lang="ts">
import { SpecieClient } from '@/client/specie.client';
import { Notification } from '@/model/notification';
import { PageRequest } from '@/model/page/page-request';
import { PageResponse } from '@/model/page/page-response';
import { Specie } from '@/model/specie.model';
import { Options, Vue } from 'vue-class-component';
import ListTemplate from '../../components/ListTemplate.vue';


@Options({
  components: {
    ListTemplate
  },
})
export default class SpecieView extends Vue {
 
  columns = [
  { "name": "ID", "title": "ID" },
  { "name": "NOME", "title": "NOME" },
  ];  
  public edit = `edit-specie`;
  private specieClient!: SpecieClient
  public specieList: Specie[] = []
    private notification : Notification = new Notification();
    private pageRequest: PageRequest = new PageRequest()
    private pageResponse: PageResponse<Specie> = new PageResponse()
    public mounted(): void {
      this.specieClient = new SpecieClient()
      this.listAllVaccines()
      console.log(this.columns)
    }
    public listAllVaccines(): void {
      this.specieClient.findByFiltrosPaginado(this.pageRequest)
          .then(
              (success:any) => {
                this.pageResponse = success
                this.specieList = this.pageResponse.content
              },
              (error:any) => console.log(error)
          )
    }
    
}

</script>