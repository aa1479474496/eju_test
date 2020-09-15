<template>
  <div>
    <p>handsontable - test4 - 测试render</p>
    <!-- <el-button @click="updateSettings">update settings</el-button> -->
    <div>
      <!-- <div style="width: 300px;height:300px;overflow:hidden"> -->
      <hot-table :settings="hotSettings" ref="hottable">
        <!-- <HotColumn>
          <div v-html="value" hot-renderer></div>
        </HotColumn>-->
      </hot-table>
    </div>
  </div>
</template>

<script>
import "handsontable/languages/zh-CN";
import "handsontable/dist/handsontable.full.css";
import { HotTable, HotColumn } from "@handsontable/vue";
import Handsontable from "handsontable";
let colHeaders = [
  `<span class="is_right">版块</span>`,
  "区域",
  "成交面积",
  "平均租金"
];
let _data = [
  ["七宝", "七宝", "9425.16", "6798.99"],
  ["七宝", "闵行", "141146.98", "6720.46"]
];
let rowList = [
  { 版块: "<span style=color:red>七宝<span>", 区域: "七宝", 成交面积: "9425.16", 平均租金: "6798.99" },
  { 版块: "七宝", 区域: "闵行", 成交面积: "141146.98", 平均租金: "6720.46" },
  { 版块: "七宝", 区域: "宝山", 成交面积: "1418", 平均租金: "6726" }
];

let nestedHeaders = [
  ["23", { label: "上海", colspan: 3, rowspan: 2 }],
  [22, "", "", ""]
];

export default {
  components: {
    HotTable,
    HotColumn
  },
  data() {
    return {
      hotSettings: {
        // data: _data,
        data: rowList,
        colHeaders,
        // colHeaders: function(index) {
        //   return `<p>index + ': AB'<>`
        // },
        rowHeaders: false,
        contextMenu: true,
        language: "zh-CN",
        autoColumnSize: true,
        stretchH: "all",
        width: "100%",
        columns: [
          { data: "版块", renderer: "html" },
          { data: "区域", renderer: "html" },
          { data: "成交面积", renderer: "html" },
          { data: "平均租金", renderer: "html" }
        ]
      },

      mergeArr: []
    };
  },
  created() {
  },

  mounted() {
  },

  methods: {
  
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