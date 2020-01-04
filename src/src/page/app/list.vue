<template>
  <div class="app-table-default">
    <homeHeader :activeIndex="1"></homeHeader>
    <div class="appList">
      <router-link to="/app/edit/0">
        <el-button type="primary" class="appList-addBtn"> <i class="iconfont icon-add"></i> 新建</el-button>
      </router-link>
      
      <!-- 应用列表 -->
      <el-table :data="listData" style="width: 100%;">
        <el-table-column label="#" prop="iAutoID" width="80"></el-table-column>
        <el-table-column label="名称" prop="sName"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="mini"  icon="el-icon-view" @click="handleShow(scope.$index, scope.row)">预览</el-button>
            <el-button size="mini"  icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini"  icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination 
        v-if="totalNum>20"
        @current-change="changePage($event)" 
        class="appList-pagination" 
        :background="true" 
        layout="prev, pager, next" 
        :total="totalNum" 
        :pageSize="20"></el-pagination>
    </div>
  </div>
</template>
<script>
import "@/style/theme/black/appList";
import homeHeader from "@/components/home/homeHeader";
import api from "@/server/api";
export default {
  data() {
    return {
      listData: [],
      totalNum: 0
    };
  },
  created() {
    this.getData(1);
  },
  methods: {
    handleShow(index,row){
      this.$router.push("/app/show/" + row.iAutoID);
    },
    handleEdit(index, row) {
      this.$router.push("/app/edit/" + row.iAutoID);
    },
    handleDelete(index, row) {
      this.$confirm("你确定删除此应用？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          api.appDelete({ id: row.iAutoID }).then(res => {
            if (res.status) {
              this.listData.splice(index, 1);
              this.iTotal -= 1;
            }
          });
        })
        .catch(() => {});
    },
    changePage(page) {
      this.getData(page);
    },
    getData(page) {
      api.appList({ page }).then(res => {
        if (res.status) {
          this.listData.length = 0;
          this.listData.push(...res.data.aList);
          this.totalNum = Number(res.data.iTotal);
        }
      });
    }
  },
  components: {
    homeHeader
  }
};
</script>

<style lang="scss">
.iconfont {
  cursor: pointer;
}
.appList {
  width: 90%;
  margin: auto;
  margin-top: 80px;
  .appList-pagination {
    margin-top: 20px;
    float: right;
  }
  .appList-addBtn {
    float: right;
    margin-bottom: 20px;
    vertical-align: middle;
  }
}
</style>
