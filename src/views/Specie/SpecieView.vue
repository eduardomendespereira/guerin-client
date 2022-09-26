<template>
  <aside class="is-fullheight " style="width: 100%;">
    <div class="columns">
      <div class="column is-12 is-size-3">Lista de Especies</div>
    </div>
    <hr />
    <hr />
    <div class="columns">
    </div>
  </aside>
    
  
    
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
 
  public edit = `edit-specie`;
  private specieClient!: SpecieClient
  public specieList: Specie[] = []
    private notification : Notification = new Notification();
    private pageRequest: PageRequest = new PageRequest()
    private pageResponse: PageResponse<Specie> = new PageResponse()
    public mounted(): void {
      this.specieClient = new SpecieClient()
      this.listAllSpecie()
      console.log(this.listAllSpecie);
    }
    public listAllSpecie(): void {
    this.specieClient.findByAll(this.pageRequest).then(
      (success) => {
        this.pageResponse = success;
        this.specieList = this.pageResponse.content;
      },
      (error) => console.log(error)
    );
  }
    
}

</script>