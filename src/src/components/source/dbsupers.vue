<template>
  <div class="database-template">
    <div class="opt-detail database-supers">
      <div class="">
        <div class="items">
          <div class="label">
            <span class="spe">*</span>数据源名称</div>
          <div class="input">
            <input class="normal" type="text" v-model="otherSet.sName" placeholder="用于区分数据源的唯一标示">
          </div>
        </div>
        <div class="items">
          <div class="label"> 分类标签</div>
          <div class="input">
            <input class="normal" type="text" v-model="otherSet.sComment" placeholder="用于分类、搜索自定义标签">
          </div>
        </div>

        <div class="items">
          <div class="label">定时同步</div>
          <div class="input">
            <el-radio v-model="otherSet.iSyncFix" label="1">开启</el-radio>
            <el-radio v-model="otherSet.iSyncFix" label="0">关闭</el-radio>
          </div>
        </div>


        <div class="items" v-show="otherSet.iSyncFix != '0' ">
          <div class="label"></div>
          <div class="input">
            <el-time-select v-model="otherSet.sSyncTime" :picker-options="timePick" placeholder="选择时间">
            </el-time-select>
          </div>
        </div>

        <div class="items">
          <div class="label">备注同步</div>
          <div class="input">
            <el-radio v-model="otherSet.sSyncStatus" label="1">开启</el-radio>
            <el-radio v-model="otherSet.sSyncStatus" label="0">关闭</el-radio>
          </div>
        </div>


      </div>

      <div class="next-btn">
        <div class="btns left" @click="preStep()">上一步</div>
        <div class="btns" @click="nextStep()">确定</div>
      </div>

    </div>
    <div class="opt-info">
      <div class="tit">使用说明</div>
      <div class="impt">定时同步说明</div>
      <div>可设置数据源每日在制定时间自动同步，获取最新数据。</div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        timePick: {
          start: "00:00",
          step: "00:30",
          end: "24:00"
        }
      };
    },
    props: {
      otherSet: Object
    },
    methods: {
      preStep() {
        this.$emit("stepHandler", {
          step: 2
        });
      },
      nextStep() {
        if (this.otherSet.sName.trim() == "") {
          this.$notify.error({
            title: "错误",
            message: "请填写数据源名称！"
          });
          return false;
        }
        this.$emit("stepHandler", {
          step: "submit"
        });
      }
    }
  };

</script>

<style lang="scss">
  .input {
    /deep/ .el-input__inner {
      width: 130px;
      border-radius: 0;
      text-align: center;
    }
    /deep/ i {
      display: none;
    }
  }

</style>
