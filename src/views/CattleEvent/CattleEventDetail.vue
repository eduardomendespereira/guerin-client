<template>
  <aside class="cattle is-fullheight" style="width: 100%">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Eventos <b>> Detalhar</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-cattle-event">
          <img
              alt="Guerin"
              src="../../assets/eventIcon.png"
              style="width: 70px"
          />
        </div>
        <table class="table">
          <tr>
            <th><b>Descrição</b></th>
            <td>{{ cattleEvent.description }}</td>
          </tr>
          <tr>
            <th><b>Brinco do Gado</b></th>
            <td>{{ cattleEvent.cattle?.earring }}</td>
          </tr>
          <tr>
            <th><b>Tipo do Evento</b></th>
            <td>{{ cattleEvent.eventType?.name }}</td>
          </tr>
          <tr>
            <th><b>Data</b></th>
            <td>{{ convertDate(cattleEvent.date) }}</td>
          </tr>
          <tr>
            <th><b>Vacina</b></th>
            <td>
              <span v-if="cattleEvent.vaccineApplication?.vaccine != null">
                <b>{{ cattleEvent.vaccineApplication?.vaccine?.name }}</b>
              </span>
              <span v-if="cattleEvent.vaccineApplication?.vaccine == null" class="no-data">
                <b>Não</b>
              </span>
            </td>
          </tr>
          <tr>
            <th><b>Pesagem</b></th>
            <td>
              <span v-if="cattleEvent.weighing != null">
                <b>{{ cattleEvent.weighing?.weight }}</b>
              </span>
              <span v-if="cattleEvent.weighing == null" class="no-data">
                <b>Não</b>
              </span>
            </td>
          </tr>
          <tr>
            <th><b>Status</b></th>
            <td v-if="!cattleEvent.inactive" style="color: #20bd00"><b>Ativo</b></td>
            <td v-if="cattleEvent.inactive" style="color: #df0000"><b>Desativado</b></td>
          </tr>
        </table>
        <hr class="linha" size="100" width="900"/>
        <div class="btns">
          <router-link to="/eventos/eventos-gados">
            <button class="button btn-voltar">Voltar ao Menu</button>
          </router-link>
        </div>
      </div>
    </section>
  </aside>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import {Prop} from 'vue-property-decorator'
import {CattleEvent} from "@/model/cattle-event.model";
import CattleEventClient from "@/client/cattle-event.client";

export default class CattleEventDetail extends Vue {
  public cattleEvent: CattleEvent = new CattleEvent()

  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.getCattleEvent()
  }

  public convertDate(data: any) {
    let obj = new Date(data)
    return obj.toLocaleString()
  }

  private getCattleEvent(): void {
    CattleEventClient.findById(this.id)
        .then(
            success => {
              this.cattleEvent = success.data
            },
            error => console.log(error)
        )
  }
}
</script>
<style lang="scss" scoped>

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

.icon-cattle-event {
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