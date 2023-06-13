<template>
  <aside class="cattle is-fullheight" style="width: 100%">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Detalhar <b>> Gado</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-cattle">
          <img
            style="width: 80px"
            src="../../assets/cowIcon.png"
            alt="Guerin"
          />
        </div>

        <table class="table">
          <tr>
            <th><b>Brinco Nº</b></th>
            <td> {{ cattle.earring }}</td>
          </tr>
          <tr>
            <th><b>Brinco do Pai</b></th>
            <td v-if="!cattle.father"><b> --- </b></td>
            <td v-if="cattle.father">{{ cattle.father }}</td>
          </tr>
          <tr>
            <th><b>Brinco da Mãe</b></th>
            <td v-if="!cattle.mother"><b> --- </b></td>
            <td v-if="cattle.mother">{{ cattle.mother }}</td>
          </tr>
          <tr>
            <th><b>Peso</b></th>
            <td>{{ cattle.weight }} Kg</td>
          </tr>
          <tr>
            <th><b>Registrado Em</b></th>
            <td>{{ convertDate(cattle.registered) }}</td>
          </tr>
          <tr>
            <th><b>Sexo</b></th>
            <td v-if="cattle.gender == 'male'"><b>Macho</b></td>
            <td v-if="cattle.gender == 'female'"><b>Fêmea</b></td>
          </tr>
          <tr>
            <th><b>Espécie</b></th>
            <td>{{ cattle.specie?.name }}</td>
          </tr>
          <tr>
            <th><b>Fazenda</b></th>
            <td>{{ cattle.farm?.name }}</td>
          </tr>
          <tr>
            <th><b>Fase</b></th>
            <td>{{ cattle.status }}</td>
          </tr>
          <tr>
            <th><b>Em Amamentação</b></th>
            <td v-if="!cattle.breastFeeding" style="color: #df0000"><b>Nao</b></td>
            <td v-if="cattle.breastFeeding" style="color: #20bd00"><b>Sim</b></td>
          </tr>
          <tr>
            <th><b>Data Nascimento</b></th>
            <td>{{ convertDate(cattle.bornAt) }}</td>
          </tr>
          <tr>
            <th><b>Quantidade de Filhos</b></th>
            <td> {{amountChildren}}</td>
          </tr>
          <tr>
            <th><b>Pode amamentar?</b></th>
            <td v-if="cattleCanBreed"  style="color: #20bd00"><b>Sim</b></td>
            <td v-else style="color: #df0000"><b>Não</b></td>
          </tr>
          <tr>
            <th><b>Status</b></th>
            <td v-if="!cattle.inactive" style="color: #20bd00"><b>Ativo</b></td>
            <td v-if="cattle.inactive" style="color: #df0000"><b>Desativado</b></td>
          </tr>
        </table>
        
        <hr class="line" size="100" width="900" />
        <div class="btns">
          <router-link to="/gados">
            <button class="button btn-back">Voltar ao Menu</button>
          </router-link>
        </div>
      </div>
    </section>
  </aside>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";
import { Cattle } from "@/model/cattle.model";
import { CattleClient } from "@/client/cattle.client";
import { Prop } from "vue-property-decorator";

export default class CattleDetail extends Vue {
  public cattle: Cattle = new Cattle();
  public amountChildren: number = 0;
  public cattleCanBreed: boolean = false;
  private cattleClient!: CattleClient;

  @Prop({ type: Number, required: false })
  private readonly earring!: number;

  public mounted(): void {
    this.cattleClient = new CattleClient();
    this.detailCattle();
    this.getChildren();
    this.canBreed();
  }

  public convertDate(data : any ){
    let obj = new Date(data)
    return obj.toLocaleString()
  }

  public getChildren(): void {
      this.cattleClient.findChildren(this.earring).then(
        (success) => {
            this.amountChildren = success.children.length;
        },
        (error) => console.log(error)
      )
  }

  public detailCattle(): void {
    this.cattleClient.findByEarring(this.earring).then(
      (success) => {
        this.cattle = success;
      },
      (error) => console.log(error)
    );
  }

  public canBreed(): any {
    this.cattleClient.canBreed(this.earring).then(
      (success) => {
        this.cattleCanBreed = success
      },
      (error) => console.log(error)
    );
  }
}
</script>

<style lang="scss" scoped>
.cattle {
  width: 100%;
}

.insert-back {
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #d1d1d1;
  width: 90%;
  margin-top: 20px;
  margin-bottom: 30px;
}

.icon-cattle {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: #4a9490;
  border-radius: 20px;
  margin: 0px 0px 20px 0px;
}

.btns {
  display: flex;
  .button {
    font-size: 18px;
    margin: 30px;
    width: 300px;
  }
}

.line {
  background-color: #dbdbdb;
  margin: 30px 0px 0px 0px;
}

.form {
  display: flex;
  h1 {
    margin: 15px 100px 15px 100px;
  }
  h2 {
    margin: 15px 85px 15px 126px;
  }
  h3 {
    margin: 15px 130px 15px 130px;
  }
  h4 {
    margin: 15px 130px 15px 130px;
  }
}

.btn-back {
  background-color: #005bd4;
  color: #ffffff;
  padding: 12px;
}

.btn-back:hover {
  background-color: #0067ee;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.table th {
  background-color: #f2f2f2;
}

.table b {
  font-weight: bold;
}

.no-data {
  color: #df0000;
}
</style>
