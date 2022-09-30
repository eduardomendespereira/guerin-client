<template>
  <aside class="is-fullheight" style="width: 100%">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos <b>> Aplicação de Vacinas</b></p>
      <div class="activates p-2">
        <div class="icon-activate">
          <img
            style="width: 30px"
            src="../../assets/vaccineAppIcon.png"
            alt="Guerin"
          />
        </div>
        <h1
          class="text-activates has-text-weight-bold is-size-5"
          style="color: black"
        >
          Vacinas Aplicadas Ativas
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

    <div class="is-flex is-justify-content-center pt-5">
      <div class="header-btn">
        <router-link class="link-cad" to="/eventos/aplicacoes-de-vacinas/cadastrar">
          <button class="button btn-insert" style="background-color: green; color: white">Cadastrar Aplicação de Vacina</button>
        </router-link>
      </div>
    </div>

    <div class="data-table mt-5">
      <div class="main-table is-flex is-justify-content-center mb-5">
        <table class="table-div table" style="width: 95%">
          <thead>
          <tr class="header-table">
            <th @click="sortByColumn('Id')" class="table-head">
              {{ $filters.columnHead("Id") }}
              <span v-if="'Id' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
            </th>
            <th @click="sortByColumn('Status')" class="table-head">
              {{ $filters.columnHead("Status") }}
              <span v-if="'Status' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
            </th>
            <th @click="sortByColumn('Descrição')" class="table-head">
              {{ $filters.columnHead("Descrição") }}
              <span v-if="'Descrição' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
            </th>
            <th @click="sortByColumn('Vacina Aplicada')" class="table-head">
              {{ $filters.columnHead("Vacina Aplicada") }}
              <span v-if="'Vacina Aplicada' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
            </th>
            <th @click="sortByColumn('Data')" class="table-head">
              {{ $filters.columnHead("Data") }}
              <span v-if="'Data' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
            </th>
            <th @click="sortByColumn('Brinco do Gado')" class="table-head">
              {{ $filters.columnHead("Brinco do Gado") }}
              <span v-if="'Brinco do Gado' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
            </th>
            <th @click="sortByColumn('Opções')" class="table-head">
              {{ $filters.columnHead("Opções") }}
              <span v-if="'Opções' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="" v-if="tableData.length === 0">
            <td class="lead text-center" :colspan="columns.length + 1">
              Sem Registros.
            </td>
          </tr>
          <tr
              v-for="data in tableData"
              :key="data.id"
              class="m-datatable__row"
              v-else
          >
            <td>
              <button
                  @click="onClickPageDetail(data.id)"
                  class="tag"
                  style="background-color: #0093ff; color: white"
              >
                {{ data.id }}
              </button>
            </td>
            <td>
                <span
                    class="tag"
                    style="background-color: #1ba500"
                    v-if="!data.inactive"
                ></span>
              <span
                  class="tag"
                  style="background-color: #ab0303"
                  v-if="data.inactive"
              ></span>
            </td>
            <td>{{ data.note }}</td>
            <td>{{ data.vaccine?.name }}</td>
            <td>{{ data.date }}</td>
            <td>{{ data.cattle?.earring }}</td>

            <td>
              <div class="field has-addons">
                <button
                    class="button btn-edit"
                    style="background-color: #1ba500; color: white"
                >
                    <span class="icon is-small">
                      <i class="fa fa-pencil"></i>
                    </span>
                </button>

                <button
                    class="button btn-delet"
                    style="background-color: #ab0303; color: white"
                    @click="onClickPageDisable(data.id)"
                >
                    <span class="icon is-small">
                      <i class="fa fa-trash"></i>
                    </span>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <nav class="pagination" v-if="pagination && tableData.length > 0">
        <a
            class="pagination-previous"
            href="#"
            @click.prevent="changePage(currentPage - 1)"
        >Anterior</a
        >
        <a
            class="pagination-next"
            href="#"
            @click.prevent="changePage(currentPage + 1)"
        >Proximo</a
        >
        <ul class="pagination-list">
          <li
              v-for="page in pagesNumber"
              class="pagination-link"
              :class="{ active: page == pagination.meta.current_page }"
              :key="page"
          >
            <a
                href="javascript:void(0)"
                @click.prevent="changePage(page - 1)"
                class="page-link"
            >{{ page }}</a
            >
          </li>
          <li v-if="pages > 10">
            <span class="pagination-ellipsis">&hellip;</span>
          </li>
          <span style="margin-top: 8px">
            &nbsp;
            <i
            >Mostrando {{ pagination.numberOfElements }} de
              {{ pagination.totalElements }} registros.</i
            ></span
          >
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script>
import axiosClient from "../../plugins/axios";
var counter = null;
export default {
  data() {
    return {
      tableData: [],
      url: "/vaccineApplications",
      pagination: {
        meta: { to: 1, from: 1 },
      },
      columns: ["Id", "Status", "Descrição", "Vacina Aplicada", "Data", "Brinco do Gado", "Opções"],
      offset: 4,
      currentPage: 0,
      perPage: 10,
      sortedColumn: "Id",
      order: "asc",
      pages: 0,
      count: 0,
    };
  },
  watch: {
    fetchUrl: {
      handler: function (fetchUrl) {
        this.url = fetchUrl;
      },
      immediate: true,
    },
  },
  created() {
    return this.fetchData();
  },
  computed: {
    /**
     * Get the pages number array for displaying in the pagination.
     * */
    pagesNumber() {
      if (!this.pagination.meta.to) {
        return [];
      }
      let from = this.pagination.meta.current_page - this.offset;
      if (from < 1) {
        from = 1;
      }
      let to = from + this.offset * 2;
      if (to >= this.pagination.meta.last_page) {
        to = this.pagination.meta.last_page + 1;
      }
      let pagesArray = [];
      this.pages = to; //to
      var max = this.pages;
      if (max > 10) max = 10;
      for (let page = from; page <= max; page++) {
        pagesArray.push(page);
      }
      return pagesArray;
    },
    /**
     * Get the total data displayed in the current page.
     * */
    totalData() {
      return this.pagination.meta.to - this.pagination.meta.from + 1;
    },
  },
  methods: {
    fetchData() {
      let dataFetchUrl = `/vaccineApplications?page=${this.currentPage}&sort=${this.sortedColumn},${this.order}&size=${this.perPage}`;
      axiosClient
          .get(dataFetchUrl)
          .then(({ data }) => {
            console.log(data);
            this.pagination = data;
            this.pagination.meta = {
              from: data.pageable.offset + 1,
              to: data.pageable.offset + data.numberOfElements,
              current_page: data.number,
              last_page: data.totalPages - 1,
            };
            this.tableData = data.content;
            this.count = this.tableData.length;
          })
          .catch((error) => (this.tableData = []));
    },
    /**
     * Get the serial number.
     * @param key
     * */
    serialNumber(key) {
      return (this.currentPage - 1) * this.perPage + 1 + key;
    },
    /**
     * Change the page.
     * @param pageNumber
     */
    changePage(pageNumber) {
      if (pageNumber < this.pagesNumber.length) {
        this.currentPage = pageNumber;
        this.fetchData();
      }
    },
    onClickPageDetail(id) {
      this.$router.push({ name: "vaccine-application-detail", params: { id: id } });
    },

    onClickPageDisable(id) {
      this.$router.push({ name: "vaccine-application-disable", params: { id: id } });
    },

    /**
     * Sort the data by column.
     * */
    countVaccine() {
      this.vaccineApplicationClient.count().then(
          (sucess) => {
            return (this.counter = Number(sucess));
          },
          (error) => {
            return console.log(error);
          }
      );
    },

    sortByColumn(column) {
      if (column === this.sortedColumn) {
        this.order = this.order === "asc" ? "desc" : "asc";
      } else {
        this.sortedColumn = column;
        this.order = "asc";
      }
      this.fetchData();
    },
  },
  name: "DataTable",
};
</script>

<style lang="scss">

  element.style {
  }
  .table th:not([align]) {
    text-align: center;
  }
  element.style {
  }
  .field.has-addons {
    display: flex;
    justify-content: center;
  }
  .activates {
    background-color: white;
    margin-top: 45px;
    margin-right: 40px;
    position: relative;
    box-shadow: 0px 0px 10px #d1d1d1;
  }
  .icon-activate {
    top: -22px;
    left: 5px;
    position: absolute;
    display: flex;
    justify-content: center;
    padding: 8px 8px 8px 8px;
    width: 55px;
    border-radius: 20px;
    background-color: #126b00;
  }
  .text-activates {
    margin-left: 60px;
  }

  .delete {
    position: absolute;
    top: 3%;
    right: 2%;
  }

  .in-1 {
    margin: 10px 0px;
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

  .modal-header {
    background-color: #ffffff;
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
    background-color: #126b00;
    border-color: #126b00;
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
    background-color: #ffffff;
    border-color: #1ba500;
    border-width: 3px;
    border-radius: 150px;
    color: #1ba500;
    margin-right: 10px;
  }

  .btn-edit:hover {
    transition: 1s;
    border-color: #1eb401;
    background-color: #1eb401;
  }

  .btn-delet {
    background-color: #ffffff;
    border-color: #ab0303;
    border-width: 3px;
    border-radius: 150px;
    color: #ab0303;
    margin-left: 10px;
  }

  .btn-delet:hover {
    transition: 1s;
    border-color: #c20101;
    background-color: #c20101;
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

  .pagination {
    width: 95%;
    margin-left: 30px;
    background-color: white;
    padding: 20px;
    box-shadow: 0px 0px 10px #d1d1d1;
    margin-bottom: 20px;
  }
  .table {
    text-align: center;
  }

</style>