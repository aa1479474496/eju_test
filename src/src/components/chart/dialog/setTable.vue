<template>
  <el-dialog
    title="选择工作表"
    custom-class="bi-dialog"
    :visible.sync="doption.table"
    @close="doption.table=false"
    width="40%">
    <div>
      <el-input
        placeholder="输入关键字进行过滤"
        class="table_border_bottom"
        v-model="filterText">
      </el-input>

      <div class="chart-table-list">
        <el-tree
          :data="tables"
          node-key="label"
          highlight-current
          :filter-node-method="tableFilter"
          @node-click="tableClick"
          @node-expand='tableClick'
          :accordion="true"
          ref="tableTree"
          >
        </el-tree>
      </div>
    </div>
    <span slot="footer"  class="dialog-buttons">
        <button type="button" class="ngdialog-button" @click="tableChange">确定</button>
        <button type="button" class="ngdialog-button" @click="doption.table=false">取消</button>
    </span>
  </el-dialog>
</template>

<script>
import api from "@/server/api";
export default {
  data() {
    return {
      filterText: "",
      tables: bi.chart.tables,
      chartData: bi.chart.data,
      tempTable: {
        db: "",
        tbl: ""
      }
    };
  },
  created() {
    this.dataListtbl();
  },
  props: {
    doption: Object
  },
  watch: {
    filterText(val) {
      this.$refs.tableTree.filter(val);
    }
  },
  methods: {
    tableChange() {
      if (
        this.chartData.query.db == this.tempTable.db &&
        this.chartData.query.tbl == this.tempTable.tbl
      ) {
        this.doption.table = false;
        return false;
      }

      //切换工作表确定按钮提示
      if (this.chartData.query.tbl.length > 0) {
        let tips = "切换工作表后将清空当前图表的配置，是否继续？";
        this.$confirm(tips, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.dataTblinfo();
          })
          .catch(() => {});
      } else {
        this.dataTblinfo();
      }
    },
    tableFilter(value, node) {
      //节点过滤
      if (!value) return true;
      return node.label.indexOf(value) !== -1;
    },
    tableClick(node) {
      //切换工作表树节点点击
      if (!node.children) {
        this.tempTable.db = node.db;
        this.tempTable.tbl = node.tbl;
        this.tempTable.tblname = node.tblname;
      }
    },
    dataTblinfo() {
      api
        .dataTblinfo({ db: this.tempTable.db, tbl: this.tempTable.tbl })
        .then(res => {
          if (res.data) {
            let _data = bi.copy(bi._chart.data);

            // query不能直接盖掉，否则edit里查询监听不起作用
            Object.assign(this.chartData.query, _data.query);
            delete _data.query;
            Object.assign(this.chartData, _data);

            // 初始表格的样式
            this.$set(this.chartData, "option", {
              table: bi.copy(bi.chart.components.table.option)
            });

            this.chartData.query.db = this.tempTable.db;
            this.chartData.query.tbl = this.tempTable.tbl;
            this.chartData.query.tblname = this.tempTable.tblname;
            this.chartData.fields.push(...res.data);

            bi.chart.list.length = 0;
            this.doption.table = false;
          } else {
            bi.log(
              "getTableInfo:" +
                this.tempTable.db +
                "." +
                this.tempTable.tbl +
                ", error!!"
            );
          }
        });
    },
    dataListtbl() {
      if (this.tables.length > 0) {
        return false;
      }

      api.dataListtbl().then(res => {
        if (res.status) {
          for (let dbName in res.data) {
            let _dbTree = {
              label: dbName,
              children: []
            };
            res.data[dbName].forEach((value, index) => {
              _dbTree.children.push({
                label: value.sName+"("+value.sTable+")",
                db: value.iDbID,
                tbl: value.iAutoID,
                tblname: value.sName
              });
            });
            this.tables.push(_dbTree);
          }
        } else {
          bi.log("getTableList: error!!");
        }
      });
    }
  }
};
</script>