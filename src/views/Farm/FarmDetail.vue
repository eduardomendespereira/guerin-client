<template>
  <aside class="farm is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Detalhar <b>> Fazenda</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-farm">
          <img style="width: 80px" src="../../assets/farmIcon.png" alt="Guerin" />
        </div>

        <div class="form">
          <h2 class="is-size-6 is-flex is-flex-direction-column is-align-items-center">
            <b>Nome</b>
            {{ farm.name }}
          </h2>
          <h2 class="is-size-6 is-flex is-flex-direction-column is-align-items-center">
            <b>Endereço</b>
            {{ farm.address }}
          </h2>
        </div>

        <div class="form">
          <h4 class="is-size-6 is-flex is-flex-direction-column is-align-items-center">
            <b>Status</b>
            <span v-if="!farm.inactive" style="color: #20bd00">
              <b>Ativo</b>
            </span>
            <span v-if="farm.inactive" style="color: #df0000">
              <b>Desativado</b>
            </span>
          </h4>
          <!-- <h4 class="is-size-6 is-flex is-flex-direction-column is-align-items-center">
            <b>Registrada em</b>
            {{ farm.registered }}
          </h4> -->
        </div>
        <hr class="line" size="100" width="900" />
        <div class="btns">
          <router-link to="/fazendas">
            <button class="button btn-back">Voltar ao Menu</button>
          </router-link>
        </div>
      </div>
    </section>
  </aside>
</template>
  
<script lang="ts">
import { Vue } from "vue-class-component";
import { Farm } from "@/model/farm.model";
import { FarmClient } from "@/client/farm.client";
import { Prop } from "vue-property-decorator";

export default class farmDetail extends Vue {
  public farm: Farm = new Farm();
  private farmClient!: FarmClient;

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  public mounted(): void {
    this.farmClient = new FarmClient();
    this.detailfarm();
  }

  public detailfarm(): void {
    this.farmClient.findById(this.id).then(
      (success) => {
        this.farm = success;
      },
      (error) => console.log(error)
    );
  }
}
</script>
  
<style lang="scss">
.farm {
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

.icon-farm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: #ffb800;
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
  