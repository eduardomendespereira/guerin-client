<template>
    <div>
        <button v-if="!mini" class="button btn-insert" @click="openModal">
            Inserir Especie
        </button>
        <button v-if="mini" class="button btn-insert" @click="openModal">
            <span class="icon is-small is-left">
                <i class="fa fa-plus"></i>
            </span>
        </button>
        <div v-if="showModal" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
              <div class="columns" v-if="notification.ativo"> 
            </div>        
              <header class="modal-header">
                <p class="modal-card-title">Adicionar Especie</p>
              
              </header>
              <section class="modal-card-body">
                <div class="column is-12" v-if="showNot">
                  <div :class="notification.classe">
                    <button @click="onClickCloseNotification()" class="delete" ></button>
                    {{ notification.mensagem }}
                  </div>
                </div>
                <input v-model="specie.name" class="input in-1" type="text" placeholder="Nome da Especie" />
              </section>
              <footer class="modal-card-foot is-flex is-justify-content-center">
                <button class="button btn-cad" @click="insertSpecie" >
                  Cadastrar Especie
                </button>
                <button class="button btn-back" @click="openModal">Voltar</button>
              </footer>
            </div>
        </div> 
    </div>     
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import { SpecieClient } from "@/client/specie.client";
import { Specie } from "@/model/specie.model";
import { Notification } from "@/model/notification";
import { defineComponent } from 'vue'
export default  defineComponent ({
    props : {
        mini : {
            required : true,
            type : Boolean
        }
    },
    data(){
        return {
            showNot : false,
            showModal : false,
            specieClient : new SpecieClient(),
            specie : new Specie(),
            notification : new Notification(),
        }
    },
    created(){
        console.log(this.mini)
    },
   
    methods:{
        insertSpecie(){
            this.specieClient.cadastrar(this.specie).then(
            (sucess:any) => {
                this.showNot = true
                this.notification = this.notification.new(true, 'notification is-success', 'Especie Cadastrada com sucesso ! !!!')
                this.$emit('Atualiza', false)
                console.log(sucess);
            },
            (error:any) =>{
                this.notification = this.notification.new(true, 'notification is-danger', 'Error: ' + error)
                console.log(error);
            } 
            )
        },
        openModal() {
            if (this.showModal) {
            this.showModal = false;
            } else {
            this.showModal = true;
            }
        },
        onClickCloseNotification(): void {
            this.showNot = false
            this.notification = new Notification()
        }
    }
})
</script>

<style lang="scss" >
.btn-back {
    background-color: #c20101;
    color: #ffffff;
    padding: 12px;
    width: 200px;
  }
  
.btn-back:hover {
    background-color: #da0000;
    color: white;
    transition: 0.7s;
    box-shadow: 0px 0px 10px #d1d1d1;
}
.btn-cad {
    background-color: #005bd4;
    color: #ffffff;
    padding: 12px;
    width: 200px;
    margin-left: 20px;
}
  
.btn-cad:hover {
    background-color: #0067ee;
    color: white;
    transition: 0.7s;
    box-shadow: 0px 0px 10px #d1d1d1;
}
.modal-header {
    background-color: #ffffff;
    padding: 30px;
  }
</style>