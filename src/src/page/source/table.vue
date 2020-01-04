<template>
  <div class="app-table-default">
    <backHeader :headTitle="headTitle" :goBack="true"></backHeader>
    <div class="sourceList" v-show="!loading" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 1)">

      <!-- table列表 -->
      <el-table :data="listData" style="width: 100%;" >
        <el-table-column label="#" prop="iAutoID" width="80"></el-table-column>
        <el-table-column label="类型" prop="sType" width="180"></el-table-column>
        <el-table-column label="名称" prop="sName"></el-table-column>
        <el-table-column label="备注" prop="sComment"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-view" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import "@/style/theme/black/sourceList";
import backHeader from "@/components/common/backHeader";
import api from "@/server/api";
export default {
  data() {
    return {
      loading: true,
      listData: [],
      headTitle: ""
    };
  },
  created() {
    let id = this.$route.params.sourceid;
    api.sourceLoad({ id }).then(res => {
      this.loading = false;
      if (res.status) {
        this.headTitle = res.data.sName;
        this.listData.push(...res.data.aTblList);
      }
    });
  },
  components: {
    backHeader
  },
  methods: {
    handleDetail(index, row) {
      this.$router.push("/table/list/" + row.iAutoID);
      // console.log("跳转");
    }
  }
};
</script>

<style lang="scss" scoped>
.iconfont {
  cursor: pointer;
}
.sourceList {
  width: 90%;
  margin: auto;
  padding-top: 80px;
  .sourceList-pagination {
    margin-top: 20px;
    float: right;
  }
  .sourceList-addBtn {
    float: right;
    margin-bottom: 20px;
    vertical-align: middle;
  }
}
.dropDown {
  float: right;
  margin-bottom: 10px;
  a {
    text-decoration: none !important;
  }
}
</style>
