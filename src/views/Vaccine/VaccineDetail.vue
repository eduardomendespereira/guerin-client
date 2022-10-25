<template>
  <aside class="cattle is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Eventos > Vacinas <b>> Detalhar</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-vaccine">
          <img
              style="width: 70px"
              src="../../assets/vacineIcon.png"
              alt="Guerin"
          />
        </div>
        <div class="form">
          <h1
              class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Nome da Vacina</b>
            {{ vaccine.name }}
          </h1>
          <h1
              class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Data de Cadastramento</b>
            {{ vaccine.registered}}
          </h1>
        </div>

        <div class="form">
          <h4 class="is-size-6 is-flex is-flex-direction-column is-align-items-center">
            <b>Status</b>
            <span v-if="!vaccine.inactive" style="color: #20bd00">
              <b>Ativo</b>
            </span>
            <span v-if="vaccine.inactive" style="color: #df0000">
              <b>Desativado</b>
            </span>
          </h4>
          <h4 class="is-size-6 is-flex is-flex-direction-column is-align-items-center">
            <b>Obrigatória</b>
            <span v-if="vaccine.required" style="color: #20bd00">
              <b>Sim</b>
            </span>
            <span v-if="!vaccine.required" style="color: #df0000">
              <b>Não</b>
            </span>
          </h4>
        </div>
        <hr class="linha" size="100" width="900" />
        <div class="btns">
          <router-link to="/eventos/vacinas">
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
  import { Vaccine } from "@/model/vaccine.model";
  import vaccineClient from "@/client/vaccine.client";

  export default class VaccineDetail extends Vue{
    public vaccine: Vaccine = new Vaccine()

    @Prop({type: Number, required: false})
    private readonly id!: number

    public mounted(): void {
      this.getVaccine()
    }

    private getVaccine(): void {
      vaccineClient.findById(this.id)
          .then(
              sucess => {
                this.vaccine = sucess
              },
              error => console.log(error)
          )
    }
}
</script>
<style lang="scss">
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

  .icon-vaccine {
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
</style>