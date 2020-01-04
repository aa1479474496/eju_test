<template>
  <div class="database-template" v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="opt-detail database-link">
      <div class="items">
        <div class="label">
          <span class="spe">*</span>服务器</div>
        <div class="input">
          <input class="normal" type="text" v-model="sConn.host">
          <input class="min" type="text" placeholder="端口" v-model="sConn.port">
        </div>
      </div>
      <div class="items">
        <div class="label">
          <span class="spe">*</span>用户名</div>
        <div class="input">
          <input class="normal" type="text" v-model="sConn.user">
        </div>
      </div>

      <div class="items">
        <div class="label">
          <span class="spe">*</span>密码</div>
        <div class="input">
          <input class="normal" type="password" v-model="sConn.pass">
        </div>
      </div>

      <div class="items">
        <div class="label">
          <span class="spe">*</span>数据库</div>
        <div class="input">
          <input class="normal" type="text" v-model="sConn.db">
        </div>
      </div>

      <div class="next-btn">
        <div class="btns" @click="nextStep()">下一步</div>
      </div>

    </div>
    <div class="opt-info">
      <div class="tit">使用说明</div>
      <div class="impt">账号设置注意事项</div>
      <div>数据库地址及用户名须开通公网访问权限，允许BDP获取数据库中数据。</div>
    </div>
  </div>
</template>
<script>
import api from "@/server/api";
export default {
  data() {
    return {
      loading: false
    };
  },
  props: {
    sConn: Object,
    dbTableList: Object,
    iAutoID:String
  },
  methods: {
    nextStep() {
      if (!this.sConn.host.trim()) {
        this.$notify.error({
          title: "错误",
          message: "请输入服务器地址！"
        });
        return false;
      }
      if (!this.sConn.port.trim()) {
        this.$notify.error({
          title: "错误",
          message: "请输入端口！"
        });
        return false;
      }
      if (!this.sConn.user.trim()) {
        this.$notify.error({
          title: "错误",
          message: "请输入用户名！"
        });
        return false;
      }
      if (!this.sConn.pass.trim()) {
        this.$notify.error({
          title: "错误",
          message: "请输入密码！"
        });
        return false;
      }
      if (!this.sConn.db.trim()) {
        this.$notify.error({
          title: "错误",
          message: "请输入数据库！"
        });
        return false;
      }
      this.loading = true;
      api.sourcelisttbl({...this.sConn,id:this.iAutoID}).then(res => {
        if (res.status) {
          this.dbTableList.selectSource = this.dbTableList.selectTable =
            res.data;

          this.dbTableList.checkedTable = [] ;
          res.data.forEach((e, index) => {
            if (e.bExists) {
              this.dbTableList.checkedTable.push(e.sName);
            }
          });
          
          this.$emit("stepHandler", {
            step: 2
          });
        } else {
          this.$notify.error({
            title: "错误",
            message: "数据库连接信息有误！"
          });
        }

        this.loading = false;
      });
    }
  }
};
</script>
