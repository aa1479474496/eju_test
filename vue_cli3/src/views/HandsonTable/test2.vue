<template>
  <div>
    <p>handsontable - test2- 列透视</p>
    <hot-table :settings="hotSettings" ref="hottable"></hot-table>
  </div>
</template>

<script>
import "handsontable/languages/zh-CN";
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/vue";
import Handsontable from "handsontable";
// let colHeaders = ["板块", "区域", "成交面积", "平均租金"];
// let rowList = [
//   { 板块: "七宝", 区域: "七宝", 成交面积: "9425.16", 平均租金: "6798.99" },
//   { 板块: "七宝", 区域: "闵行", 成交面积: "141146.98", 平均租金: "6720.46" },
//   { 板块: "七宝", 区域: "宝山", 成交面积: "1418", 平均租金: "6726" }
// ];

// let mergeCells = [{ col: 0, colspan: 1, row: 0, rowspan: 2 }];
export default {
  components: {
    HotTable
  },
  data() {
    return {
      hotSettings: {
        // data: null,
        // colHeaders: [],
        // startCols: 0,
        // startRows: 0,
        // data: Handsontable.helper.createSpreadsheetData(5, 10),
        data: [],
        colHeaders: true,
        rowHeaders: true,
        // contextMenu: true,
        // mergeCells: true,
        language: "zh-CN",
        nestedHeaders: [
          ["A", { label: "B", colspan: 8 }, "C"],
          ["D", { label: "E", colspan: 4 }, { label: "F", colspan: 4 }, "G"],
          [
            "H",
            { label: "I", colspan: 2 },
            { label: "J", colspan: 2 },
            { label: "K", colspan: 2 },
            { label: "L", colspan: 2 },
            "M"
          ],
          ["N", "O", "P", "Q", "R", "S", "T", "U", "V", "W"]
        ],
        // afterChange: this.afterChangeMe,
        // mergeCells: []
      },

      mergeArr: []
    };
  },
  created() {
    let _data = Handsontable.helper.createSpreadsheetData(5, 10);

    setTimeout(() => {
    console.log('--------', _data);

       this.$refs.hottable.hotInstance.updateSettings({
          data: _data,
        })
    }, 1000);
    // this.getRowMergeCell();
  },

  mounted() {},

  methods: {
    getRowMergeCell() {
      let hashMap = {};
      colHeaders.forEach((colHeader, index) => {
        hashMap[colHeader] = {};
        hashMap[colHeader]["col"] = index;
      });
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
      setTimeout(() => {
        this.$refs.hottable.hotInstance.updateSettings({
          colHeaders,
          data: rowData,
          mergeCells: mergeCells2
        });
      }, 1000);
    },

    afterChangeMe(changes, source) {
      this.mergeArr = this.mergeMethod();

      let _data = this.$refs.hottable.hotInstance.getData();
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
</style>