<template>
  <aside class="is-fullheight" style="width: 100%; overflow: auto">
    <div class="columns is-flex is-justify-content-space-between">
      <p class="is-size-4 pt-5 pl-5">Usuarios</p>
      <div class="is-size-4 pt-5 pl-5">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <p class="title"><i class="fa fa-users"> Usuarios Ativos</i></p>
              <p class="subtitle" style="float: right">
                <span style="font-size: 12pt" class="tag is-info">{{
                  count
                }}</span>
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class="columns is-flex is-justify-content-space-between">
      <div class="is-size-12 pt-5 pl-5" style="width: 100%">
        <div class="tile is-ancestor">
          <div class="tile is-parent">
            <article class="tile is-child box">
              <div class="buttons">
                <button class="button is-success">Cadastrar</button>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
    <div class="data-table">
      <div class="main-table">
        <table class="table" style="width: 100%">
          <thead>
            <tr>
              <th @click="sortByColumn('Id')" class="table-head">
                {{ $filters.columnHead("Id") }}
                <span v-if="'Id' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
              </th>
              <th @click="sortByColumn('Nome')" class="table-head">
                {{ $filters.columnHead("Nome") }}
                <span v-if="'Nome' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
              </th>
              <th @click="sortByColumn('Email')" class="table-head">
                {{ $filters.columnHead("Email") }}
                <span v-if="'Email' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
              </th>
              <th @click="sortByColumn('Usuario')" class="table-head">
                {{ $filters.columnHead("Usuario") }}
                <span v-if="'Usuario' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
              </th>
              <th @click="sortByColumn('Perfil')" class="table-head">
                {{ $filters.columnHead("Perfil") }}
                <span v-if="'Perfil' === sortedColumn">
                  <i v-if="order === 'asc'" class="fa fa-arrow-up"></i>
                  <i v-else class="fa fa-arrow-up"></i>
                </span>
              </th>
              <th class="table-head">
                {{ $filters.columnHead("Ações") }}
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
                <span class="tag is-danger">{{ data.id }}</span>
              </td>
              <td>{{ data.firstName }} {{ data.lastName }}</td>
              <td>{{ data.email }}</td>
              <td>
                <span class="tag is-primary">{{ data.username }}</span>
              </td>
              <td>
                <span class="tag is-primary">{{data.role}}</span>
              </td>
              <td>
                <div class="field has-addons">
                  <p class="control">
                    <button class="button is-primary">
                      <span class="icon is-small">
                        <i class="fa fa-pencil"></i>
                      </span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-danger">
                      <span class="icon is-small">
                        <i class="fa fa-trash"></i>
                      </span>
                    </button>
                  </p>
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
import { Options, Vue } from "vue-class-component";
import axiosClient from "../../plugins/axios";

export default {
  data() {
    return {
      tableData: [],
      url: "/user",
      pagination: {
        meta: { to: 1, from: 1 },
      },
      columns: ["Id", "Nome", "Email"],
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
      let dataFetchUrl = `/users?page=${this.currentPage}&sort=${this.sortedColumn},${this.order}&size=${this.perPage}`;
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
