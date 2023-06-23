<template>
    <div>
        <button v-if="!mini" class="button btn-insert" @click="openModal">
            Inserir Especie
        </button>
        <button v-if="mini" class="button btn-insert-mini" @click="openModal">
            <span class="icon-btn is-small is-left">
                <i class="fa fa-plus"></i>
            </span>
        </button>
        <div v-if="showModal" class="modal is-active">
            <div class="modal-background"></div>
            <div class="modal-card">
              <div class="columns" v-if="notification.ativo"> 
            </div>        
              <header class="modal-header">
                <div class="modal-title">
                    <div class="icon-spe">
                        <img style="width: 50px" src="@/assets/specieIcon.png" alt="Guerin" />
                    </div>
                    <p class="modal-card-title">Adicionar Especie</p>
                </div>
               
              
              </header>
              <section class="modal-card-body">
                <div class="column is-12" v-if="showNot">
                  <div :class="notification.classe">
                    <button @click="onClickCloseNotification()" class="delete" ></button>
                    {{ notification.mensagem }}
                  </div>
                </div>
                <input v-if="!mini" v-model="specie.name" class="input in-spe" type="text" placeholder="Nome da Especie" />
                <input v-if="mini" v-model="specie.name" class=" input " type="text" placeholder="Nome da Especie" />
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

<style lang="scss" scoped >
.btn-back {
    background-color: #c20101;
    color: #ffffff;
    padding: 12px;
    width: 200px;
  }
.spe-column{
    display: flex;
    justify-content: center;
}  
  
.btn-back:hover {
    background-color: #da0000;
    color: white;
    transition: 0.7s;
    box-shadow: 0px 0px 10px #d1d1d1;
}
.in-spe{
    margin: 10px 0px;
}
.icon-btn{
    color: black;
    
}
.btn-insert-mini{
    background-color: #48c78e;
    color: #ffffff;
    padding: 0px;
    width: 30px;
    margin-left: 0px;
}
.input-mini{
    margin-left: 25%;
    margin-bottom: 2%;
}
.input{
    margin-bottom: 2%;
}
.btn-insert{
    background-color: #48c78e;
    color: #ffffff;
    padding: 1px;
    width: 120px;
    margin-left: 0px;
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
    display:  flex;
    justify-content: center;
  }
.modal-title{
    display:  flex;
    justify-content: center;
    flex-direction: column;
}  
.modal-card-title{
    font-size: 24px;
    margin-top: 12%;
}
.icon-spe{
    margin-left: 10%;
    width: 150px;
    height: 70px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    background-color: #c02828;
}  
</style>