<template>
  <v-container v-show="getPageContent">
    <v-row class="text-left">
      <v-col cols="12">
        <table :class="tableClass">
          <tbody>
            <tr v-for="(row, index) in getPageContent" :key="'tr-' + index">
              <td v-if="showCounter" class="index">{{ index + 1 }}</td>
              <td
                v-for="(col, colIndex) in getPageContent[0]"
                :key="'td-' + colIndex"
                :style="getCellStyle(index, colIndex)"
              >
                {{ getCellValue(index, colIndex) }}
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "content-table",
  data() {
    return {
      tableClass: "data-tbl",
      showCounter: false,
    };
  },
  computed: {
    ...mapGetters({
      getPageContent: "getPageContent",
    }),
  },
  methods: {
    getCellValue(rowIndex, colIndex) {
      if (this.getPageContent && this.getPageContent.length > 0) {
        let cellValue = this.getPageContent[rowIndex][colIndex];
        return cellValue.formatted_value;
      }
    },
    getCellStyle(rowIndex, colIndex) {
      if (this.getPageContent && this.getPageContent.length > 0) {
        let cellValue = this.getPageContent[rowIndex][colIndex];
        if(cellValue.style) {
          return {
            'font-weight': cellValue.style["font-weight"] ? cellValue.style["font-weight"] : "",
            'text-decoration': cellValue.style["text-decoration"] ? cellValue.style["text-decoration"] : "",
            'background-color': cellValue.style["background-color"] ? "#" + cellValue.style["background-color"]: "",
            'color': cellValue.style["color"] ? "#" + cellValue.style["color"]: "",
            'width': cellValue.style["width"] ? cellValue.style["width"] : "",
            'height': cellValue.style["height"] ? cellValue.style["height"] : "",
            'vertical-align': cellValue.style["vertical-align"] ? cellValue.style["vertical-align"] : "",
          };
        }
      }
    },
  },
};
</script>

<style>
table.data-tbl {
  border-collapse: collapse;
  table-layout: auto; /*fixed;*/
  border: 1px solid #035571;
  background-color: rgb(225, 225, 225) !important;
  width: 100%;
  text-align: left;
}
table.data-tbl td,
table.data-tbl th {
  border: 3px solid white;
  padding: 3px 5px;
}
</style>