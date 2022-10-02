<template>
  <aside class="weight is-fullheight">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Eventos <b>> Pesagem</b></p>
      <div class="activates p-2">
        <div class="icon-activates">
          <img
            style="width: 30px"
            src="../../assets/weightIcon.png"
            alt="Guerin"
          />
        </div>
        <h1
          class="text-activates has-text-weight-bold is-size-5"
          style="color: black"
        >
          Pesagens Ativas
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
        <button @click="openModal" class="button btn-insert">
          Inserir Pesagem
        </button>
      </div>
    </div>

    <div v-if="showModal" class="modal is-active">
      <div class="modal-background"></div>
      <div class="modal-card">
        <section class="modal-card-body">
          <div class="modal-header is-flex is-justify-content-center">
            <div class="icon-weight-ins">
              <img
                style="width: 70px"
                src="../../assets/weightIcon.png"
                alt="Guerin"
              />
            </div>
            <button
              class="delete"
              @click="openModal"
              aria-label="close"
            ></button>
          </div>
          <input class="input in-1" type="date" placeholder="Data" />
          <input class="input in-1" type="text" placeholder="Peso" />
          <input class="input in-1" type="text" placeholder="Brinco do Gado" />
        </section>
        <footer class="modal-card-foot is-flex is-justify-content-center">
          <button class="button btn-back" @click="openModal">
            Voltar ao Menu
          </button>
          <button class="button btn-cad">Cadastrar Pesagem</button>
        </footer>
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
              <th @click="sortByColumn('Data')" class="table-head">
                {{ $filters.columnHead("Data") }}
                <span v-if="'Data' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
              </th>
              <th @click="sortByColumn('Peso')" class="table-head">
                {{ $filters.columnHead("Peso") }}
                <span v-if="'Peso' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
              </th>
              <th @click="sortByColumn('Brinco')" class="table-head">
                {{ $filters.columnHead("Brinco") }}
                <span v-if="'Brinco' === sortedColumn">
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
              <td>{{ data.date }}</td>
              <td>{{ data.weight }}</td>
              <td>{{ data.cattle.earring }}</td>

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
import axiosClient from '@/plugins/axios';
export default {
  
  data() {
    return {
      tableData: [],
      url: "/weighing",
      pagination: {
        meta: { to: 1, from: 1 },
      },
      columns: ["Id", "Status", "Data", "Peso", "Brinco"],
      offset: 4,
      currentPage: 0,
      perPage: 10,
      sortedColumn: "Id",
      order: "asc",
      pages: 0,
      count : 0,
      
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
  async created() {
    
   
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
      let dataFetchUrl = `/weighing?page=${this.currentPage}&sort=${this.sortedColumn},${this.order}&size=${this.perPage}`;
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
      this.$router.push({ name: "weight-detail", params: { id: id } });
    },
    /**
     * Sort the data by column.
     * */

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

<style scoped>
.activates {
  background-color: white;
  margin-top: 45px;
  margin-right: 40px;
  position: relative;
  box-shadow: 0px 0px 10px #d1d1d1;
}

.icon-activates {
  top: -22px;
  left: 5px;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 8px 8px 8px 8px;
  width: 55px;
  border-radius: 20px;
  background-color: #ab0303;
}

.text-activates {
  margin-left: 60px;
}

.icon-weight-ins {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 90px;
  background-color: #ab0303;
  border-radius: 20px;
  margin: 0px 0px 20px 0px;
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
