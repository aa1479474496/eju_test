<template>
  <el-dialog
    title="设置字段数值显示格式"
    custom-class="bi-dialog setFormat"
    :visible.sync="doption.format"
    @close="doption.format=false"
   >
    <el-radio v-model="showObj.type"  label="number">显示为数值</el-radio>
    <div class="formatDetail">
      <div class="oneline">
        小数位数：<input type="text" class="dialog-input datainput" :disabled="showObj.type!='number'" v-model="showObj.number.digitNum" />
        <label class="inlineblock slabel"><input type="checkbox" :disabled="showObj.type!='number'" :checked="showObj.number.split" class="commoncheckbox" v-model="showObj.number.split" />使用千分隔符</label>
     </div>
     <div class="oneline">
        数值单位: <select class="dialog-select" v-model="showObj.number.unit" :disabled="showObj.type!='number'">
              <option value="0">无</option>
              <option value="万">万</option>
              <option value="亿">亿</option>
              <option value="K">K</option>
              <option value="M">M</option>
              <option value="G">G</option>
          </select>
     </div>
    </div>
    <el-radio v-model="showObj.type"  label="percentage">显示为百分比</el-radio>
    <div class="formatDetail">
      <div class="oneline">
        小数位数：<input type="text" class="dialog-input datainput" :disabled="showObj.type!='percentage'" v-model="showObj.percentage.digitNum" />
     </div>
    </div>
    <span slot="footer" class="dialog-buttons">
        <button type="button" class="ngdialog-button" @click="saveDataformat()" >确定</button>
        <button type="button" class="ngdialog-button" @click="doption.format=false">取消</button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      showObj:{
        type:"number",
        number:{
          unit:0,
          digitNum:0,
          split:false
        },
        percentage:{
          digitNum:0
        }
      },
      chartInfo:bi.chart

    };
  },
  props: {
    doption: Object,
    zditem: Object
  },
  components: {},
  mounted(){
    if(this.zditem.dataformat){
      this.showObj =this.zditem.dataformat;
    }
  },
  computed:{
    headerData() {
      let _tmp = [];
      _tmp.push(
        ...this.chartInfo.data.query.group,
        ...this.chartInfo.data.query.fields1,
        ...this.chartInfo.data.query.fields2
      );
      return _tmp;
    }
  },
  methods: {
    saveDataformat(){
      this.$set(this.zditem,"dataformat",this.showObj);
      this.doption.format =false;
      if(bi.chart.data.type=="table"){
        this.dataFormat();
      }
    },
    dataFormat(){
      let format = this.headerData.filter((item,index)=>{
        return item.dataformat;
      })
      format.length>0 && this.chartInfo.list.forEach(item=>{
        format.forEach(itm=>{
          let type=itm.dataformat.type;
          if(type=="number"){
             item[itm.title] = Number(item[itm.title]).toFixed(itm.dataformat.number.digitNum);
            if(itm.dataformat.number.split){
              item[itm.title] = Number(item[itm.title]).toLocaleString("en-US");
            }
            if(itm.dataformat.number.unit!=0){
              if(itm.dataformat.number.split){
                item[itm.title]=item[itm.title].replace(",","");
              }
              switch (itm.dataformat.number.unit){
                case "万":
                  item[itm.title] = (Number(item[itm.title])/10000).toFixed(itm.dataformat.number.digitNum)+itm.dataformat.number.unit;
                  break
                case "亿":  
                   item[itm.title] = (Number(item[itm.title])/1000000000).toFixed(itm.dataformat.number.digitNum)+itm.dataformat.number.unit;
                  break
                default:
                  item[itm.title] = item[itm.title]+itm.dataformat.number.unit
                  break
              }
            }
          }else{
            item[itm.title] = (parseFloat(item[itm.title])*100).toFixed(itm.dataformat.percentage.digitNum)+"%";
          }
        })
      })
    }
  }
};
</script>

