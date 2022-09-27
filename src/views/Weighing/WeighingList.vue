<template>
    <aside class="weight is-fullheight">
        <div class="columns is-flex is-justify-content-space-between">
            <p class="is-size-4 pt-5 pl-5 ">Eventos <b>> Pesagem</b></p>
            <div class="ativos p-2">
                <div class="icon-ativos">
                    <img style="width: 30px" src="../../assets/weightIcon.png" alt="Guerin" />
                </div>
                <h1 class="text-ativos has-text-weight-bold is-size-5" style="color: black;">Pesagens Ativas</h1>

                <div v-for="item in weighingList" :key="item.id">
                    <h1 class="is-size-5 is-flex is-justify-content-flex-end pr-2" style="color: #004AAD;" span
                        v-if="!item.inactive">{{1 + ativ}}</h1>
                </div>
            </div>
        </div>

        <div class="is-flex is-justify-content-center pt-5">
            <div class="header-btn">
                <button class="button btn-insert">Inserir Pesagem
                    
                </button>
            </div>
        </div>


        <div class="table-div">
            <table class="table">
                <thead class="header-table">
                    <tr>
                        <th>Dt.</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th>Brinco</th>
                        <th>Peso</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in weighingList" :key="item.id">
                        <th>
                            <button @click="onClickDetailPage(item.id)" class="button btn-detail">!</button>
                        </th>

                        <th>
                            <span v-if="!item.inactive" class="tag is-success"></span>
                            <span v-if="item.inactive" class="tag is-danger"></span>
                        </th>

                        <th>{{ item.date }}</th>

                        <th>{{ item.cattle.earring }}</th>

                        <th>{{ item.weight }} Kg</th>

                        <th>
                            <button @click="onClickDetailPage(item.id)" class="button btn-edit">
                                <img style="width: 15px" src="../../assets/editIcon.png" alt="Guerin" />
                            </button>
                        </th>

                        <th>
                            <button @click="onClickDetailPage(item.id)" class="button btn-delet">X</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </aside>
</template>
  
<script lang="ts">
import { Vue } from "vue-class-component";
import { PageRequest } from "@/model/page/page-request";
import { PageResponse } from "@/model/page/page-response";
import { WeighingClient } from "@/client/weighing.client";
import { Weighing } from "@/model/weighing.model";

export default class WeighingList extends Vue {
    private pageRequest: PageRequest = new PageRequest();
    private pageResponse: PageResponse<Weighing> = new PageResponse();
    public weighingList: Weighing[] = [];
    private weighingClient!: WeighingClient;
    public ativ: any = 0;

    public mounted(): void {
        this.weighingClient = new WeighingClient();
        this.listAll();
    }

    public listAll(): void {
        this.weighingClient.findByAll(this.pageRequest).then(
            (success) => {
                this.pageResponse = success;
                this.weighingList = this.pageResponse.content;
            },
            (error) => console.log(error)
        );
    }

    public onClickDetailPage(idWeighing: number) {
        this.$router.push({ name: 'weighingDetail', params: { id: idWeighing, model: 'detail' } })
    }
}
</script>
  
<style scoped>
.ativos {
    background-color: white;
    margin-top: 45px;
    margin-right: 40px;
    position: relative;
    box-shadow: 0px 0px 10px #d1d1d1;
}

.icon-ativos {
    top: -22px;
    left: 5px;
    position: absolute;
    display: flex;
    justify-content: center;
    padding: 8px 8px 8px 8px;
    width: 55px;
    border-radius: 20px;
    background-color: #AB0303;
}

.text-ativos {
    margin-left: 60px;
}

.weight {
    width: 100%;
}

.header-btn {
    background-color: white;
    width: 95%;
    padding: 30px;
    box-shadow: 0px 0px 10px #d1d1d1;

}

.table-div {
    padding: 30px;
    
}

.table {
    box-shadow: 0px 0px 10px #d1d1d1;
    width: 100%;
    
}

.tag {
    border-radius: 50px;
    padding: 12px;
}

.btn-insert {
    font-size: 15px;
    background-color: #126B00;
    border-color: #126B00;
    color: #ffffff;
    padding: 12px;
}

.btn-insert:hover {
    background-color: #178a00;
    transform: translate(-1px, -1px);
    transition: 1s;
    box-shadow: 0px 0px 10px #d1d1d1;
}

.btn-detail {
    font-size: 13px;
    background-color: #ffffff;
    border-color: #0093ff;
    border-width: 3px;
    border-radius: 150px;
    color: #0093ff;
    font-weight: bold;
    padding: 12px;
}

.btn-detail:hover {
    background-color: #ffffff;
    transform: translate(-1px, -1px);
    transition: 1s;
    border-color: #00c1ff;
    color: #00c1ff;
    font-weight: bold;
    box-shadow: 2px 5px 10px #a7a7a7;
}

.btn-edit {
    font-size: 13px;
    background-color: #ffffff;
    border-color: #1ba500;
    border-width: 3px;
    border-radius: 150px;
    font-weight: bold;
    padding: 0px 5px;
}

.btn-edit:hover {
    background-color: #ffffff;
    transform: translate(-1px, -1px);
    transition: 1s;
    border-color: #25e000;
    font-weight: bold;
    box-shadow: 2px 5px 10px #a7a7a7;
}

.btn-delet {
    font-size: 13px;
    background-color: #ffffff;
    border-color: #AB0303;
    border-width: 3px;
    border-radius: 150px;
    color: #AB0303;
    font-weight: bold;
    padding: 0px 8px;
}

.btn-delet:hover {
    background-color: #ffffff;
    transform: translate(-1px, -1px);
    transition: 1s;
    border-color: #dd0000;
    font-weight: bold;
    box-shadow: 2px 5px 10px #a7a7a7;
}
</style>