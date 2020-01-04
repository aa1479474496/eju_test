<template>
  <div class="database-eidt-page">
    <backHeader go-back='true'></backHeader>
    <div class="database-view">
      <div class="database-desc">
        <div class="pic ">
          <img width="120" height="90" alt="MySQL" src="/static/source/mysql.png">
        </div>
        <div class="database-info">
          <h4 class="desc-title">MySQL</h4>
          <p>B I 直连的的同步方式，须开放数据库的公网访问权限，可设置每日自动同步。百万以上数据推荐使用同步客户端。</p>
        </div>
      </div>
    </div>

    <div class="database-step">
      <div class="step-item" :class="{active:stepIndex == 1}">
        <i class="index">1</i>
        <span class="font-light">连接配置</span>
      </div>
      <div class="step-item" :class="{active:stepIndex == 2}">
        <i class="index">2</i>
        <span class="font-light ">数据表配置</span>
      </div>
      <div class="step-item" :class="{active:stepIndex == 3}">
        <i class="index">3</i>
        <span class="font-light ">高级配置</span>
      </div>
    </div>

    <dbsource v-if="stepIndex == 1" :sConn="sConn" @stepHandler="stepHandler" :dbTableList="dbTableList" :iAutoID="iAutoID"></dbsource>
    <dbtable  v-if="stepIndex == 2" :dbTableList="dbTableList" @stepHandler="stepHandler"></dbtable>
    <dbsupers v-if="stepIndex == 3" :otherSet="otherSet" @stepHandler="stepHandler"></dbsupers>

  </div>
</template>
<script>
import "@/style/default/datasource.scss";
import backHeader from "@/components/common/backHeader";
import dbsource from "@/components/source/dbsource";
import dbtable from "@/components/source/dbtable";
import dbsupers from "@/components/source/dbsupers";
import api from "@/server/api";
export default {
  data() {
    return {
      loading: true,
      stepIndex: 1,
      iAutoID: "0",
      sConn: {
        host: "",
        port: "",
        user: "",
        pass: "",
        db: ""
      },
      dbTableList: {
        selectSource: [],
        selectTable: [],
        checkedTable: [],
        selectCondition: "",
        checkAll: false,
        isIndeterminate: true
      },
      otherSet: {
        iSyncFix: "0", //是否固定同步
        sSyncStatus: "0", //备注状态
        sSyncTime: "", //同步时间
        sComment: "", //标签
        sType: "mysql",
        sName: ""
      }
    };
  },
  components: {
    backHeader,
    dbsource,
    dbtable,
    dbsupers
  },
  created() {
    let sourceid = this.$route.params.sourceid;
    this.iAutoID = sourceid;
    if (sourceid != 0) {
      this.load(sourceid);
    }
  },
  methods: {
    stepHandler(option) {
      if (option.step == "submit") {
        let _aTable = this.dbTableList.selectSource.filter(e => {
          return this.dbTableList.checkedTable.includes(e.sName);
        });

        //存储数据
        let _obj = {
          iAutoID: this.iAutoID,
          aConn: {
            ...this.sConn
          },
          aTable: _aTable,
          ...this.otherSet
        };
        console.log('mysql 数据提交:',_obj);
        api.sourceSave(_obj).then(res => {
          if (res.status) {
            if(bi && bi.chart && bi.chart.tables){
              bi.chart.tables=[] ;
            }
            this.$router.push("/source/list/");

          } else {
            this.$notify.error({
              title: "错误",
              message: res.data
            });
          }
        });
      } else {
        this.stepIndex = option.step;
      }
    },
    load(id) {
      api.sourceLoad({ id }).then(res => {
        if (res.status) {
          this.sConn = {
            ...JSON.parse(res.data.sConn)
          };
          this.selectSource = this.selectTable = res.data.aTblList;
          this.otherSet = {
            iSyncFix: res.data.iSyncFix,
            sSyncStatus: res.data.sSyncStatus,
            sSyncTime: res.data.sSyncTime,
            sComment: res.data.sComment,
            sType: res.data.sType,
            sName: res.data.sName
          };
        }
      });
    }
  }
};
</script>