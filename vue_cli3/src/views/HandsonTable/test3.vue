<template>
  <div>
    <p>handsontable - test3 - 测试merge-cell</p>
    <hot-table :settings="hotSettings" ref="hottable"></hot-table>
  </div>
</template>

<script>
import "handsontable/languages/zh-CN";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/vue";
import Handsontable from "handsontable";
let colHeaders = [`<p class="is_right">版块</p>`, "区域", "成交面积", "平均租金"];
// let _data = [
//   ["七宝", "七宝", "9425.16", "6798.99"],
//   ["七宝", "闵行", "141146.98", "6720.46"]
// ];
let rowList = [
  { 板块: "七宝", 区域: "七宝", 成交面积: "9425.16", 平均租金: "6798.99" },
  { 板块: "七宝", 区域: "闵行", 成交面积: "141146.98", 平均租金: "6720.46" },
  { 板块: "七宝", 区域: "宝山", 成交面积: "1418", 平均租金: "6726" }
];

let nestedHeaders = [
  ['23', {label: '上海', colspan: 3}],
  [22, 1980, 1998, 1999]
]

let mergeCells = [{ col: 0, colspan: 1, row: 0, rowspan: 2 }];
export default {
  components: {
    HotTable
  },
  data() {
    return {
      hotSettings: {
        // data: null,
        data: rowList,
        colHeaders,
        // colHeaders: function(index) {
        //   return `<p>index + ': AB'<p>`
        // },
        startCols: 0,
        startRows: 0,
        // data: Handsontable.helper.createSpreadsheetData(6, 10),
        // colHeaders: false,
        rowHeaders: false,
        contextMenu: true,
        mergeCells: true,
        language: "zh-CN",
        // autoColumnSize: true,
        stretchH: "all",
        afterChange: this.afterChangeMe,
        // mergeCells: []
      },

      mergeArr: []
    };
  },
  created() {
    // let _data = Handsontable.helper.createSpreadsheetData(5, 10);
    // console.log('------', _data);
    // this.getRowMergeCell();
  },

  mounted() {
    // setTimeout(() => {
    //   console.log('timeout');
    //   this.hotSettings.mergeCells = mergeCells;
    // }, 1000);
  },

  methods: {
    getRowMergeCell() {
      let hashMap = {};
      colHeaders.forEach((colHeader, index) => {
        hashMap[colHeader] = {};
        hashMap[colHeader]["col"] = index;
        // hashMap[colHeader]["row"] = 0;
        // hashMap[colHeader]["colspan"] = 1;
      });
      console.log("hashmap", hashMap);
      let rowData = [];

      let rowDataHashMap = {};

      rowList.forEach((row, index) => {
        rowData[index] = [];
        for (let k in row) {
          if (k in hashMap) {
            rowData[index].push(row[k]);
            if (!(row[k] in hashMap[k])) {
              hashMap[k][row[k]] = {};
              hashMap[k][row[k]]["col"] = hashMap[k]["col"];
              hashMap[k][row[k]]["row"] = 0;
              hashMap[k][row[k]]["colspan"] = 1;
              hashMap[k][row[k]]["rowspan"] = 1;
            } else {
              hashMap[k][row[k]]["rowspan"]++;
            }
          }
        }
      });
      let mergeCells2 = [];
      Object.keys(hashMap).forEach(k => {
        let v = hashMap[k];

        if (typeof v == "object") {
          Object.keys(v).forEach(hk => {
            if (v[hk].rowspan && v[hk].rowspan > 1) {
              mergeCells2.push(v[hk]);
            }
          });
        }
      });
      console.log("no 1000", mergeCells2);
      console.log("rowData::::", rowData);
      // this.hotSettings.colHeaders = colHeaders;
      // this.hotSettings.data = rowData;
      // this.hotSettings.mergeCells = mergeCells2;
      this.$nextTick(() => {
        this.$refs.hottable.hotInstance.updateSettings({
          colHeaders,
          data: rowData,
          mergeCells: mergeCells2
        });
      });

      // setTimeout(() => {
      //   console.log("timeout 1000", mergeCells2);
      //   console.log("rowData::::", rowData);
      //   // this.hotSettings.colHeaders = colHeaders;
      //   // this.hotSettings.data = rowData;
      //   // this.hotSettings.mergeCells = mergeCells2;

      //   this.$refs.hottable.hotInstance.updateSettings({
      //     colHeaders,
      //     data: rowData,
      //     mergeCells: mergeCells2
      //   })
      // }, 1000);
    },

    afterChangeMe(changes, source) {
      this.mergeArr = this.mergeMethod();

      let _data = this.$refs.hottable.hotInstance.getData();

      console.log("mmmmm", this.mergeArr);
      // console.log("ddddddd", _data);
    },

    //获取合并后的数据
    mergeMethod() {
      if (this.$refs.hottable.hotInstance != undefined) {
        return this.$refs.hottable.hotInstance.getPlugin("MergeCells")
          .mergedCellsCollection.mergedCells;
      }
    }
  }
};
</script>

<style lang="scss">
#hot-display-license-info {
  display: none;
}
.handsontable th,
.handsontable td {
  vertical-align: middle;
}
.colHeader {
  width: 100%;
  height: 100%;
  .is_right {
    text-align: right;
  }
}
</style>