<template>
  <div class="database-template">
      <div class="opt-detail database-select">
        <div class="">
          <div class="searcharea">
            <input type="text" v-model="dbTableList.selectCondition" class="search-input" placeholder="搜索" @input="searchHandler($event)">
          </div>
          <div class="select-area">
            <label class="label-item" v-show="dbTableList.selectCondition == '' ">
              <el-checkbox :indeterminate="dbTableList.isIndeterminate" v-model="dbTableList.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
            </label>
            <el-checkbox-group v-model="dbTableList.checkedTable" @change="handleCheckedChange">
              <label class="label-item" v-for="(item,index) in dbTableList.selectTable" :key="index">
                <el-checkbox :label="item.sName"></el-checkbox>
              </label>
            </el-checkbox-group>

          </div>
          <div class="select-btm">
            <p class="select-total">已选择
              <span class="spe">{{checkedTotal}}</span>
            </p>
          </div>
        </div>

        <div class="next-btn">
          <div class="btns left" @click="preStep()">上一步</div>
          <div class="btns"  @click="nextStep()">下一步</div>
        </div>

      </div>
      <div class="opt-info">
        <div class="tit">使用说明</div>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    checkedTotal() {
      return this.dbTableList.checkedTable.length;
    }
  },
  props: {
    dbTableList: Object
  },
  methods: {
    handleCheckAllChange(val) {
      this.dbTableList.checkedTable = [];
      if ((this.dbTableList.checkedTable == val)) {
        this.dbTableList.selectTable.forEach((e, index) => {
          // if (!e.bExists) {
            this.dbTableList.checkedTable.push(e.sName);
          // }
        });
      } 
      this.dbTableList.isIndeterminate = false;
    },
    handleCheckedChange(value) {
      let checkedCount = value.length;
      this.dbTableList.checkAll =
        checkedCount == this.dbTableList.selectTable.length;
      this.dbTableList.isIndeterminate =
        checkedCount > 0 && checkedCount < this.dbTableList.selectTable.length;
    },
    searchHandler(event) {
      let value = event.target.value;
      let _arr = this.dbTableList.selectSource.filter(e => {
        return e.sName.includes(value);
      });
      this.dbTableList.selectTable = _arr;
    },
    nextStep() {
      if (this.checkedTotal == 0) {
        this.$notify.error({
          title: "错误",
          message: "请至少选择一项数据！"
        });
        return false;
      }
      this.$emit("stepHandler", { step: 3 });
    },
    preStep() {
      this.$emit("stepHandler", { step: 1 });
    }
  }
};
</script>