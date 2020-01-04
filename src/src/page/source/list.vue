<template>
  <div class="app-table-default">
    <homeHeader :activeIndex="4"></homeHeader>
    <div class="sourceList">

      <router-link to="/source/add" style="text-decoration: none;">
        <el-button class="addNews" type="primary" size="medium"> <i class="iconfont icon-add"></i>新增</el-button>
      </router-link>

      <!-- 应用列表 -->
      <el-table :data="listData" v-show="!loading" style="width: 100%;" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 1)">
        <el-table-column label="#" prop="iAutoID" width="80"></el-table-column>
        <el-table-column label="类型" prop="sType" width="180"></el-table-column>
        <el-table-column label="名称" prop="sName"></el-table-column>
        <el-table-column label="操作" width="280">
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-view" @click="handleDetail(scope.$index, scope.row)">详情</el-button>
            <el-button size="mini" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" icon="el-icon-delete" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination v-if="totalNum>20" @current-change="changePage($event)" class="sourceList-pagination" :background="true" layout="prev, pager, next"
        :total="totalNum" :pageSize="20"></el-pagination>
    </div>
  </div>
</template>
<script>
  import "@/style/theme/black/sourceList";
  import homeHeader from "@/components/home/homeHeader";
  import api from "@/server/api";
  export default {
    data() {
      return {
        listData: [],
        totalNum: 0,
        loading: true
      };
    },
    created() {
      this.getData(1);
    },
    methods: {
      handleDetail(index, row) {
        this.$router.push("/source/table/" + row.iAutoID);
      },
      handleEdit(index, row) {
        this.$router.push(`/source/${row.sType}/${row.iAutoID}`);
      },
      handleDelete(index, row) {
        this.$confirm("你确定删除此应用？", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            api.sourceDelete({
              id: row.iAutoID
            }).then(res => {
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
        this.loading = true;
        api.sourceList({
          page: page
        }).then(res => {
          if (res.status) {
            this.listData.length = 0;
            this.listData.push(...res.data.aList);
            this.totalNum = Number(res.data.iTotal);
          }
          this.loading = false;
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

  .sourceList {
    width: 90%;
    margin: auto;
    margin-top: 80px;
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

  .addNews {
    float: right;
    margin-bottom: 10px;
    a {
      text-decoration: none !important;
    }
  }

</style>
