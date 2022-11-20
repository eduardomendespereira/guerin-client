<template>
  <aside class="cattle is-fullheight">
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
        <h1 class="is-size-5">
          <b>Brinco Nº {{ cattle.earring }}</b>
        </h1>
        <div class="form">
          <h1
            class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Brinco do Pai</b>
            <span v-if="!cattle.father"> --- </span>
            <span v-if="cattle.father"> {{ cattle.father }} </span>
          </h1>
          <h1
            class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Brinco da Mãe</b>
            <span v-if="!cattle.mother"> --- </span>
            <span v-if="cattle.mother"> {{ cattle.mother }} </span>
          </h1>
        </div>

        <div class="form">
          <h2
            class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Peso</b>
            {{ cattle.weight }} Kg
          </h2>
          <h2
            class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Registrado Em</b>
            {{ convertDate(cattle.registered) }}
          </h2>
        </div>

        <div class="form">
          <h3
            class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Sexo</b>
            <span v-if="cattle.gender == 'male'"> Macho </span>
            <span v-if="cattle.gender == 'female'"> Fêmea </span>
          </h3>
          <h3
            class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Espécie</b>
            {{ cattle.specie?.name }}
          </h3>
        </div>

        <div class="form">
          <h4
            class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Status</b>
            <span v-if="!cattle.inactive" style="color: #20bd00">
              <b>Ativo</b>
            </span>
            <span v-if="cattle.inactive" style="color: #df0000">
              <b>Desativado</b>
            </span>
          </h4>
          <h4
            class="is-size-6 is-flex is-flex-direction-column is-align-items-center"
          >
            <b>Fazenda</b>
            {{ cattle.farm?.name }}
          </h4>
        </div>
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
  private cattleClient!: CattleClient;

  @Prop({ type: Number, required: false })
  private readonly earring!: number;

  public mounted(): void {
    this.cattleClient = new CattleClient();
    this.detailCattle();
  }

  public convertDate(data : any ){
    let obj = new Date(data)
    return obj.toLocaleString()
  }

  public detailCattle(): void {
    this.cattleClient.findByEarring(this.earring).then(
      (success) => {
        this.cattle = success;
      },
      (error) => console.log(error)
    );
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
</style>
