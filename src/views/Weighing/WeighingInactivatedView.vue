<template>
  <aside class="weight is-fullheight">
    <div class="text-up columns">
      <p class="is-size-4 pt-5 pl-5">Eventos > Pesagem <b>> Desativar</b></p>
    </div>
    <section class="is-flex is-justify-content-center">
      <div class="insert-back">
        <div class="icon-weight">
          <img
            style="width: 70px"
            src="../../assets/weightIcon.png"
            alt="Guerin"
          />
        </div>
        <div class="form">
          <h1
            class="is-size-4 is-flex is-flex-direction-column is-align-items-center"
          >
            Você tem certeza que deseja desativar esta Pesagem ??
          </h1>
        </div>

        <hr class="linha" size="100" width="900" />
        <div class="btns">
          <router-link to="/eventos/pesagem">
            <button class="button btn-back">Cancelar</button>
          </router-link>
          <button class="button btn-inactiv">Desativar</button>
        </div>
      </div>
    </section>
  </aside>
</template>

<script lang="ts">
import { WeighingClient } from "@/client/weighing.client";
import { Weighing } from "@/model/weighing.model";
import { Vue } from "vue-class-component";
import { Prop } from "vue-property-decorator";

export default class WeighingDetail extends Vue {
  public weighing: Weighing = new Weighing();
  private weighingClient!: WeighingClient;

  @Prop({ type: Number, required: false })
  private readonly id!: number;

  public mounted(): void {
    this.weighingClient = new WeighingClient();
    this.detailWeighing();
  }

  public detailWeighing(): void {
    this.weighingClient.findById(this.id).then(
      (success) => {
        this.weighing = success;
      },
      (error) => console.log(error)
    );
  }
}
</script>

<style lang="scss">
.weight {
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

.icon-weight {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: #ab0303;
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

.btn-back {
  background-color: #ab0303;
  color: #ffffff;
  padding: 12px;
}

.btn-back:hover {
  background-color: #d10000;
  color: white;
  transition: 0.7s;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.btn-inactiv {
  font-size: 15px;
  background-color: #126b00;
  border-color: #126b00;
  color: #ffffff;
  padding: 12px;
}

.btn-inactiv:hover {
  background-color: #178a00;
  transition: 0.7s;
  color: white;
  box-shadow: 0px 0px 10px #d1d1d1;
}
</style>
