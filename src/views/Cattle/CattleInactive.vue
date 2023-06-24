<template>
    <aside class="cattle is-fullheight">
        <div class="text-up columns">
            <p class="is-size-4 pt-5 pl-5">Gado <b>> Desativar</b></p>
        </div>
        <section class="is-flex is-justify-content-center">
            <div class="insert-back">
                <div :class="notification.classe">
                    <button @click="onClickCloseNotification()" class="delete"></button>
                    {{ notification.mensagem }}
                </div>
                <div class="icon-cattle">
                    <img style="width: 80px" src="../../assets/cattleIcon.png" alt="Guerin" />
                </div>

                <div class="form">
                    <p style="font-size: 1.2rem;">Você tem certeza que deseja desativar este gado ?</p>
                </div>
                <hr class="line" size="100" width="900" />
                <div class="btns">
                    <router-link to="/gados">
                        <button class="button btn-back">Cancelar</button>
                    </router-link>
                    <button @click="onClickInactive()" class="button btn-cad">
                        Desativar
                    </button>
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
import { Notification } from "@/model/notification";

export default class cattleDetail extends Vue {
    public cattle: Cattle = new Cattle();
    private cattleClient!: CattleClient;
    private notification: Notification = new Notification();

    @Prop({ type: Number, required: false })
    private readonly earring!: number;

    public mounted(): void {
        this.cattleClient = new CattleClient();
        this.getCattle();
    }

    public getCattle(): void {
        this.cattleClient.findByEarring(this.earring).then(
            (success) => {
                this.cattle = success;
            },
            (error) => console.log(error)
        );
    }

    private onClickInactive(): void {
        this.cattleClient.disable(this.cattle)
            .then(
                success => {
                    this.notification = this.notification.new(true, "notification is-success", "Gado desativado com sucesso!");
                },
                error => {
                    console.log(error)
                    this.notification = this.notification.new(true, "notification is-danger", "Erro: " + error.data);
                }
            )
    }

    private onClickCloseNotification(): void {
        this.notification = new Notification();
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
    