<template>
    <main class="is-fullheight" style="width: 100%; overflow: auto">
      <div class="columns is-flex is-justify-content-space-between">
        <p class="is-size-4 pt-5"><b>Controle de Lactação</b></p>
        <div class="is-size-4 pt-5 pl-5">
          <div class="tile is-ancestor">
            <div class="tile is-parent">
              <div class="ativos p-2">
                <div class="icon-ativos">
                  <img style="" src="@/assets/cowIcon.png"  alt="Guerin" />
                </div>
                <h1
                    class="text-ativos has-text-weight-bold is-size-5"
                    style="color: black"
                >
                  Lactações Ativas
                </h1>
                <div>
                  <h1
                      class="is-size-5 is-flex is-justify-content-flex-end pr-2"
                      style="color: #004aad"
                      span
                  >
                    {{ count }}
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>     
      <div class="columns is-flex">
        <div class="is-size-12 pt-5 pl-5" style="
          width: 100%;
          text-align: center;
          padding: 0px !important;
          margin: 20px 0px;
        ">
          <vue-good-table
              ref="lactationTable"
              :columns="columns"
              :rows="rows"
              styleClass="vgt-table striped"
              :search-options="{
              enabled: true,
              placeholder: 'Buscar...',
            }"
              :pagination-options="{
              enabled: true,
              mode: 'records',
              rowsPerPageLabel: 'Resultados por pagina',
              nextLabel: 'Proximo',
              prevLabel: 'Anterior',
              ofLabel: 'de',
              allLabel: 'Todos',
            }"
              theme="polar-bear"
          >
            <template #table-row="props">           
              <span v-if="props.column.field == 'lactationEndDate'">
                <span>{{convertDate(props.row.lactationEndDate)}}</span>
              </span>           
              <span v-else>
                {{ props.formattedRow[props.column.field] }}
              </span>
            </template>
          </vue-good-table>
        </div>
      </div>
    </main>
  </template>
  
  <script lang="ts">
  import { Options, Vue } from "vue-class-component";
  import {Cattle} from "@/model/cattle.model";
  import { CattleClient } from "@/client/cattle.client";
  
  export default class LactationList extends Vue {
    columns = [     
      {
        label: "Brinco Mãe",
        field: "earring",
      },
      {
        label: "Quantidade Filhos",
        field: "lactatingChildren",
      },
      {
        label: "Data Final",
        field: "lactationEndDate",
      }            
    ];
    rows = [];
    count = 0;
    private cattleClient!: CattleClient;

    public mounted(): void {
      this.cattleClient = new CattleClient();
      this.listAll();
    }
  
    public convertDate(data : any ){
      let obj = new Date(data)
      return obj.toLocaleString()
    }
    public listAll(): void {
        this.cattleClient.findLactatingCattles()
          .then((response: any) => {            
            this.rows = response;
            this.count = response.length;
          })
          .catch((e: Error) => {
            console.log(e);
          });
    }
  }
  </script>
  
  <style scoped>
  .ativos {
    background-color: white;
    margin-top: 45px;
    margin-right: 0px;
    position: relative;
    box-shadow: 0px 0px 10px #d1d1d1;
    border-radius: 10px;
    width: 280px;
  }
  .text-ativos {
    margin-left: 65px;
  }
  .icon-ativos {
    top: -22px;
    left: 5px;
    position: absolute;
    display: flex;
    justify-content: center;
    padding: 8px 8px 8px 8px;
    width: 60px;
    border-radius: 20px;
    background-color: green;
  }
  </style>
  