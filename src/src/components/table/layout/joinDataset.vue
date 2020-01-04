<template>
 <div class="dataSetcontent">
   <div class="topFilter">
      <label>
        <input type="checkbox" @click="filterSamename($event)" :checked="modelData.showSamename" class="commoncheckbox">
       只显示重名字段
      </label>
    </div>

  <details open class="detailshow" v-for="(itemlist,index) in modelData.data" :key="index">
      <summary><dt>{{itemlist.sName}}</dt></summary> 
      <div class="stablelist">
        <el-row  class="join_head">
          <el-col :span="3" class="head_li"> <label><input type="checkbox" @click="selectAll(index,$event)" checked class="commoncheckbox">全选 </label></el-col>
          <el-col :span="6" class="head_li">原字段名</el-col>
          <el-col :span="6" class="head_li">新字段名</el-col>
          <el-col :span="3" class="head_li">字段类型</el-col>
          <el-col :span="6" class="head_li">字段标题</el-col>
        </el-row>
        <el-row  class="table_line" v-for="(item,idx) in itemlist.aFields" :key="idx" v-show="item.sameFlag == modelData.showSamename">
          <el-col :span="3" class="head_li"> <label><input type="checkbox" :checked="item.checked" v-model="item.checked" class="commoncheckbox">保留 </label></el-col>
          <el-col :span="6" class="head_li">{{item.field}}</el-col>
          <el-col :span="6" class="head_li">
              <input class="editinput" :disabled="!item.checked" v-model="item.alias"  type="text"  />
          </el-col>
          <el-col :span="3" class="head_li">{{item.type}}</el-col>
          <el-col :span="6" class="head_li"> <input class="editinput"  :disabled="!item.checked" v-model="item.title"  type="text"  /></el-col>
        </el-row>
      </div>
  </details>

   
 </div>
</template>
<script>
export default {
  data() {
    return {
      tempData: []
    };
  },
  mounted() {},
  props: {
    modelData: Object
  },
  methods: {
    selectAll(index, e) {
      this.modelData.data[index].aFields.forEach((item, idx) => {
        if(this.modelData.showSamename){
          if(item.sameFlag){
             this.$set(item, "checked", e.target.checked);
          }
        }else{
           this.$set(item, "checked", e.target.checked);
        }
    
      });
    },
    filterSamename(e) {
      this.modelData.showSamename =e.target.checked;
      this.filterFn(e.target.checked);
    },
    filterFn(checked){
        let tempName = [];
        this.modelData.data.forEach(item => {
          item.aFields.forEach(list => {
            tempName.push(list.field);
          });
        });
        let sameNameArray = tempName.filter((sitem, index, temp) => {
          return index != temp.indexOf(sitem);
        });
        this.modelData.data.forEach(item => {
            item.aFields.forEach(list => {
            if(sameNameArray.includes(list.field)){
              list.sameFlag =checked;
            }
          });
        });
    }
  },
  components: {},
  watch: {
    "modelData.data.length": {
      immediate: true,
      handler(val) {
        this.modelData.data.forEach(item=>{
          let tableName =item.sTable;
          item.aFields.forEach(list=>{
            list.alias=list.alias||list.field,
            list.sameFlag=false;
            list.tbl = tableName;
          })
        })
      }
    },
    "modelData.showSamename"(val){
      if(!val){
        this.modelData.data.forEach(item=>{
          item.aFields.forEach(list=>{
            list.sameFlag=false
          })
        })
      }
    }
  }
};
</script>
