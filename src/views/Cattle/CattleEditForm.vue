<template>
    <aside class="cattle is-fullheight">
        <div class="text-up columns">
            <p class="is-size-4 pt-5 pl-5">Editar <b>> Gado</b></p>
        </div>
        <section class="is-flex is-justify-content-center">
            <div class="insert-back">
                <div class="icon-cattle">
                    <img style="width: 80px" src="../../assets/cowIcon.png" alt="Guerin" />
                </div>
                <div :class="notification.classe">
                    <button @click="onClickCloseNotification()" class="delete"></button>
                    {{ notification.mensagem }}
                </div>
                <div class="form">
                    <input class="input in-1" type="text" placeholder="Nº do Brinco" v-model="cattle.earring" />
                    <div class="select in-1">
                        <select class="select" v-model="cattle.specie">
                            <option value="undefined" disabled hidden>Espécie</option>
                            <option v-for="item in specieList" :key="item.id" :value="item">{{item.name}}</option>
                        </select>
                    </div>
                </div>
                <div class="form">
                    <input class="input in-1" type="text" placeholder="Nº do Brinco do Pai" v-model="cattle.father" />
                    <input class="input in-1" type="text" placeholder="Nº do Brinco da Mãe" v-model="cattle.mother" />
                </div>
                <div class="form">
                    <input class="input in-1" type="text" placeholder="Peso" v-model="cattle.weight" />
                    <div class="select in-1">
                        <select class="select" v-model="cattle.gender">
                            <option value="undefined" disabled hidden>Gênero</option>
                            <option value="male">Macho</option>
                            <option value="female">Fêmea</option>
                        </select>
                    </div>
                </div>
                <div class="select date">
                    <select class="select" style="width: 630px" v-model="cattle.farm">
                        <option value="undefined" disabled hidden>Fazenda</option>
                        <option v-for="item in farmList" :key="item.id" :value="item">{{item.name}}</option>
                    </select>
                </div>
                <hr class="line" size="100" width="1000" />
                <div class="btns">
                    <router-link to="/gados">
                        <button class="button btn-back">Voltar ao Menu</button>
                    </router-link>
                    <button @click="onClickUpdate()" class="button btn-cad">
                        Editar Animal
                    </button>
                </div>
            </div>
        </section>
    </aside>
</template>
  
<script lang="ts">
import { Vue } from "vue-class-component";
import { Notification } from "@/model/notification";
import { Cattle } from "@/model/cattle.model";
import { CattleClient } from "@/client/cattle.client";
import { SpecieClient } from "@/client/specie.client";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { Specie } from "@/model/specie.model";
import { FarmClient } from "@/client/farm.client";
import { Farm } from "@/model/farm.model"
import { Prop } from "vue-property-decorator";


export default class cattleInsertForm extends Vue {
    private cattleClient!: CattleClient;
    private cattle: Cattle = new Cattle();
    private notification: Notification = new Notification();
    private pageRequest: PageRequest = new PageRequest();
    private pageResponse: PageResponse<any> = new PageResponse();
    private specieClient!: SpecieClient;
    private specieList: Specie[] = [];
    private farmClient!: FarmClient;
    private farmList: Farm[] = [];

    @Prop({ type: Number, required: false })
    private readonly earring!: number;

    public mounted(): void {
        this.cattleClient = new CattleClient();
        this.specieClient = new SpecieClient();
        this.farmClient = new FarmClient();
        this.listAllSpecies();
        this.listAllFarms();
        this.getCattle();
    }

    private listAllSpecies(): void {
        this.specieClient.findAll().then(
            (success: any) => {
                this.specieList = success.data
            },
            (error: any) => {
                console.log(error);
            }
        );
    }

    private getCattle(): void {
        this.cattleClient.findByEarring(this.earring).then(
            (success) => {
                this.cattle = success;
            },
            (error) => console.log(error)
        );
    }

    private listAllFarms(): void {
        this.farmClient.findAll().then(
            (success) => {
                this.farmList = success.data
            },
            (error) => console.log(error)
        );
    }

    private onClickUpdate(): void {
        this.cattleClient.update(this.cattle).then(
            (success) => {
                this.notification = this.notification.new(
                    true,
                    "notification is-success",
                    "Gado editado com sucesso!"
                );
                this.onClickClean();
            },
            (error) => {
                this.notification = this.notification.new(
                    true,
                    "notification is-danger",
                    "Erro: " + error.data
                );
                this.onClickClean();
            }
        );
    }

    private onClickCloseNotification(): void {
        this.notification = new Notification();
    }
    private onClickClean(): void {
        this.cattle = new Cattle();
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

.form {
    display: flex;

    .in-1 {
        margin: 15px;
    }

    .input {
        width: 300px;
    }

    .select {
        width: 300px;
    }
}

.date {
    margin: 15px;
    width: 630px;
}

.line {
    background-color: #dbdbdb;
    margin: 30px 0px 0px 0px;
}

.btns {
    display: flex;

    .button {
        font-size: 18px;
        margin: 30px;
        width: 300px;
    }
}

.btn-cad {
    background-color: #005bd4;
    color: #ffffff;
    padding: 12px;
}

.btn-cad:hover {
    background-color: #0067ee;
    color: white;
    transition: 0.7s;
    box-shadow: 0px 0px 10px #d1d1d1;
}

.btn-back {
    background-color: #c20101;
    color: #ffffff;
    padding: 12px;
}

.btn-back:hover {
    background-color: #da0000;
    color: white;
    transition: 0.7s;
    box-shadow: 0px 0px 10px #d1d1d1;
}
</style>
  