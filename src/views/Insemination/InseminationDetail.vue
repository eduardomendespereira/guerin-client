<template>
  <aside class="cattle is-fullheight" style="width: 100%">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Eventos > Inseminação <b>> Detalhar</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-insemination">
          <img
              style="width: 70px"
              src="../../assets/inseminationIcon.png"
              alt="Guerin"
          />
        </div>

        <table class="table">
          <tr>
            <th><b>Gado</b></th>
            <td>  {{ insemination.cattle?.earring }}</td>
          </tr>
          <tr>
            <th><b>Data de Cadastramento</b></th>
            <td>   {{ convertDate(insemination.date)}}</td>
          </tr>
          <tr>
            <th><b>Status</b></th>
            <td v-if="!insemination.inactive" style="color: #20bd00"><b>Ativa</b></td>
            <td v-if="insemination.inactive" style="color: #df0000"><b>Desativada</b></td>
          </tr>
        </table>
        <hr class="linha" size="100" width="900" />
        <div class="btns">
          <router-link to="/eventos/inseminacoes">
            <button class="button btn-voltar">Voltar ao Menu</button>
          </router-link>
        </div>
      </div>
    </section>
  </aside>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'
import { Insemination } from "@/model/insemination.model";
import inseminationClient from "@/client/insemination.client";

export default class InseminationDetail extends Vue{
  public insemination: Insemination = new Insemination()

  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.getInsemination()
  }

  public convertDate(data : any ){
    let obj = new Date(data)
    return obj.toLocaleString()
  }

  private getInsemination(): void {
    inseminationClient.findById(this.id)
        .then(
            success => {
              this.insemination = success.data
            },
            error => console.log(error)
        )
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
  margin-top: 20px;
}

.icon-insemination {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: green;
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

.linha {
  background-color: #dbdbdb;
  margin: 30px 0px 0px 0px;
}

.form {
  display: flex;

  h1 {
    margin: 15px 70px 15px 117px;
  }
  h4 {
    margin: 15px 130px 15px 130px;
  }
}

.btn-voltar {
  background-color: #005bd4;
  color: #ffffff;
  padding: 12px;
}

.btn-voltar:hover {
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