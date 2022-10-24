<template>
    <aside class="cattle is-fullheight">
        <div class="text-up columns">
          <p class="is-size-4 pt-5 pl-5">Especies<b> > Editar</b></p>
        </div>
        <section class="is-flex is-justify-content-center">
          <div class="insert-back">
            <div class="icon-cattle">
              <img
                style="width: 70px"
                src="@/assets/specieIcon.png"
                alt="Guerin"
              />
            </div>
            <div class="form">
              <input v-model="specie.name" class="input is-primary is-flex is-flex-direction-column is-align-items-center" placeholder="Nome"/>
            </div>
            <div class="btns">
              <button class="button is-primary is-small">Salvar</button>
              <router-link to="/especie">
                <button class="button btn-voltar">Voltar</button>
              </router-link>
            </div>
          </div>
        </section>
      </aside>
</template>


<script lang="ts">
import { Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'
import {Specie} from "@/model/specie.model";
import {SpecieClient} from "@/client/specie.client";

export default class SpecieDetail extends Vue{
  public specie: Specie = new Specie()
  private specieClient!: SpecieClient

  @Prop({type: Number, required: false})
  private readonly id!: number

  public mounted(): void {
    this.specieClient = new SpecieClient()
    this.getSpecie();
    console.log(this.specie);
  }

  private getSpecie(): void {
    this.specieClient.findById(this.id)
        .then(
            sucess => {
              this.specie = sucess
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
      
      .icon-cattle {
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
          width: 150px;
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
          margin: 12px 90px 15px 120px;
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