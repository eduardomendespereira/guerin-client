<template>
  <aside style="width: 100%">
    <div class="data-table">
      <div class="main-table">
        <table class="table" style="width: 100%">
          <thead>
            <tr>
              <th
                v-for="column in columns"
                :key="column"
                @click="sortByColumn(column)"
                class="table-head"
              >
                {{ $filters.columnHead(column) }}
                <span v-if="column === sortedColumn">
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
              <td v-for="(value, key) in data" :key="key">{{ value }}</td>
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
import axiosClient from "../plugins/axios";
export default {
  props: {
    fetchUrl: { type: String, required: true },
    columns: { type: Array, required: true },
  },
  data() {
    return {
      tableData: [],
      url: "",
      pagination: {
        meta: { to: 1, from: 1 },
      },
      offset: 4,
      currentPage: 0,
      perPage: 2,
      sortedColumn: this.columns[0],
      order: "asc",
      pages: 0,
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
      let dataFetchUrl = `${this.url}?page=${this.currentPage}&sort=${this.sortedColumn},${this.order}&size=${this.perPage}`;
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
      if (pageNumber < pagesNumber.length) {
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

<style></style>
