<template>
  <div>
    <p>handsontable - test1</p>
    <hot-table :settings="hotSettings" :language="language"></hot-table>
  </div>
</template>

<script>
import 'handsontable/languages/zh-CN';
import "handsontable/dist/handsontable.full.css";
import { HotTable } from "@handsontable/vue";
import Handsontable from 'handsontable';
export default {
  components: {
    HotTable
  },
  data() {
    return {
      hotSettings: {
        data: Handsontable.helper.createSpreadsheetData(5, 10),
        colHeaders: true,
        rowHeaders: true,
        contextMenu: true
      },
      language: "zh-CN"
    };
  },
  created() {
    // let _data = Handsontable.helper.createSpreadsheetData(5, 10);
    // console.log('------', _data);
  }
  
};
</script>

<style lang="scss">
#hot-display-license-info {
  display: none;
}
</style>