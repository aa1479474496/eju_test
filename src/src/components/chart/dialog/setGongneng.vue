<template>
  <el-dialog
    title="条件格式"
    custom-class="bi-dialog setgongnengdialog"
    :visible="colorption.gongnnegShow"
    @close="colorption.gongnnegShow=false">
    <div class="gongnengdialog clear">
      <div class="notiaojian" v-if="!colorption.list">
        <div>当前还没有设置条件</div>
        <div class="addbtn" @click="addone()">点此添加</div>
      </div>
      <div class="tjlist" v-if="colorption.list" v-for="(oitem,idx) in tjList" :key="idx">
        <select class="dialog-select" v-model="oitem.fields">
          <option v-for="(item,index) in fieldsSelect" :key="index" :value="item.field">{{item.title}}</option>
        </select>
        <select class="dialog-select" v-model="oitem.fuhao">
          <option value=">">大于</option>
          <option value="<">小于</option>
          <option value="=">等于</option>
          <option value="!=">不等于</option>
          <option value=">=">大于等于</option>
          <option value="<=">小于等于</option>
          <option value="~">区间</option>
        </select>
        <input class="dialog-input" v-model="oitem.valueNum" v-if="oitem.fuhao !='~'">
        <input class="dialog-input" v-model="oitem.firstnum" style="width:60px" v-if="oitem.fuhao =='~'">
        <span  v-if="oitem.fuhao =='~'"> ~</span>
        <input class="dialog-input" v-model="oitem.lastnum"  style="width:60px" v-if="oitem.fuhao =='~'">

        <div class="inlineblock rowys">样式<i class="sricon iconfont" :class="oitem.icon"></i>
          <div class="iconchange">
            <div class="iconlist iconfont icon-unfold" @click="SetIcon('icon-unfold',idx)"></div>
            <div class="iconlist iconfont icon-move" @click="SetIcon('icon-move',idx)"></div>
            <div class="iconlist iconfont icon-fold" @click="SetIcon('icon-fold',idx)"></div>
            <div class="iconlist iconfont icon-check" @click="SetIcon('icon-check',idx)"></div>
            <div class="iconlist iconfont icon-close" @click="SetIcon('icon-close',idx)"></div>
            <div class="iconlist iconfont icon-gantanhao" @click="SetIcon('icon-gantanhao',idx)"></div>
            <div class="oneline"></div>
            <div class="iconlist iconfont icon-jinzhi" @click="SetIcon('icon-jinzhi',idx)"></div>
            <span class="left mt2" @click="SetIcon('icon-jinzhi',idx)">无样式</span>
          </div>

        </div>
        <i class="clickbtn iconfont icon-add1" @click="addone()"></i>
        <i class="clickbtn iconfont icon-move" @click="remove(idx,oitem.fields)"></i>
      </div>
      <span slot="footer" class="dialog-buttons right">
          <button type="button" class="ngdialog-button" @click="saveGongneng()">确定</button>
          <button type="button" class="ngdialog-button" @click="colorption.gongnnegShow=false">取消</button>
      </span>
    </div>
  </el-dialog>
</template>

<script>
import defaultStyle from "@/config/style";
export default {
  data() {
    return {
      chartData: bi.chart.data,
      tjList:[],
      fieldsSelect:[]
    };
  },
  props: {
    colorption: Object
  },
  mounted() {
    this.fieldsSelect=[...this.chartData.query.fields1,...this.chartData.query.fields2];
     this.fieldsSelect.forEach(item=>{
      if(item.tiaojian){
        this.tjList.push(item.tiaojian)
      }
    })
    if(this.tjList.length==0){
      this.tjList.push({
        fields:this.fieldsSelect[0].field,
        fuhao:">",
        valueNum:0,
        firstnum:0,
        lastnum:0,
        icon:"icon-fold"
      })
    }
  },
  components: {},
  computed: {},
  methods: {
    SetIcon(icons,index){
      this.$set(this.tjList[index],'icon',icons);
    },
    addone(){
      this.tjList.push({
        fields:this.fieldsSelect[0].field,
        fuhao:">",
        valueNum:0,
        firstnum:0,
        lastnum:0,
        icon:"icon-fold"
      })
      this.colorption.list =true;
    },
    remove(index,fields){
      this.tjList.splice(index,1);
      this.fieldsSelect.forEach((itm,idx)=>{
        if(fields== itm.field){
          if(itm.tiaojian){
             this.$set(itm,"tiaojian","");
          }
        }
      })
      if(this.tjList.length ==0){
        this.colorption.list =false
      }
    },
    saveGongneng(){
      let _this =this;
      this.tjList.forEach((item,index)=>{
        this.fieldsSelect.forEach((itm,idx)=>{
          if(item.fields == itm.field){
            _this.$set(itm,"tiaojian",item);
          }
        })
      })
      this.colorption.gongnnegShow=false;
    }
  },
  watch: {}
};
</script>
<style langue="sass" scoped>

</style>
