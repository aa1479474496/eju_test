<template>
 <div>
   <div class="table-filter" ref="tableFilter">
     <div class="filteraction">
       <span class="topspan" @click="filterShowfn()" v-if="!filterShow">数据筛选 <i class="iconfont icon-unfold"></i></span>
       <span class="topspan" @click="filterShowfn()" v-if="filterShow">收起筛选 <i class="iconfont icon-fold"></i></span>
       <span class="topspan" @click="dataShowfn()"  v-if="!dataShow">设置显示字段<i class="iconfont icon-unfold"></i></span>
       <span class="topspan"  @click="dataShowfn()" v-if="dataShow">收起设置<i class="iconfont icon-fold"></i></span>
     </div>
     <div class="preview-filter-wrap" v-if="filterShow">
      <div class="fllist"  v-for="(oitem,idx) in fliterList" :key="idx">
        <select class="common-select" v-model="oitem.field" @change="getChange($event,idx)" >
          <option value="">请选择</option>
          <option v-for="(item,index) in tableDatas.aFields" :key="index" :data-type="item.type" :value="item.field">{{item.title}}</option>
        </select>
        <select class="common-select" v-model="oitem.type" @change="clearval(oitem.type,idx)" v-if="oitem.fieldType!='date'">
          <option value=">">大于</option>
          <option value="<">小于</option>
          <option value=">=">大于等于</option>
          <option value="<=">小于等于</option>
          <option value="!=">不等于</option>
          <option value="=">等于</option>
          <option value="">空</option>
          <option value="!">不为空</option>
          <option value="like">包含</option>
          <option value="not like">不包含</option>
        </select>
        <select class="common-select" v-model="oitem.type"  @change="clearval(oitem.type,idx)" v-if="oitem.fieldType=='date'">
          <option value="~">选择日期范围</option>
          <option value="">空</option>
          <option value="!">不为空</option>
        </select>
        <input class="common-input" placeholder="请输入条件" :disabled="oitem.type==''||oitem.type=='!'" v-model="oitem.val" v-if="oitem.fieldType!='date'" >
        <el-date-picker  v-model="oitem.val"  :disabled="oitem.type==''||oitem.type=='!'" type="datetime" placeholder="选择日期" v-if="oitem.fieldType =='date'"></el-date-picker>
        <el-date-picker  v-model="oitem.val2"  :disabled="oitem.type==''||oitem.type=='!'" type="datetime" placeholder="选择日期" v-if="oitem.fieldType =='date'"></el-date-picker>
        
        <i class="fclickbtn iconfont icon-add1" @click="addone(idx)"></i>
        <i class="fclickbtn iconfont icon-move" @click="remove(idx)" v-show="fliterList.length>1"></i>
        <div class="confrimbtn" @click="filterDatas(idx)" v-show="idx==(fliterList.length-1)">确定</div>
      </div>
     </div>
     <div class="preview-filter-wrap" v-if="dataShow">
       <div class="typeli" v-if="tdate.length>0">
         <div class="fieldType">
           <label>
             <input type="checkbox" :checked="tdate[0].checked" @click="checkAll('tdate',$event)" class="commoncheckbox">
             <i class="iconfont  icon-riqi2"></i>
              日期
           </label>
         </div>
         <div class="clear fieldList">
           <label class="fieldli" v-for="(item,index) in tdate" :key="index"><input type="checkbox" v-model="item.checked"  :checked="item.checked" class="commoncheckbox">{{item.title}}</label>
         </div>
       </div>
       <div class="typeli" v-if="tnumber.length>0">
         <div class="fieldType">
           <label>
             <input type="checkbox" :checked="tnumber[0].checked"  @click="checkAll('tnumber',$event)" class="commoncheckbox">
             <i class="iconfont  icon-iconjing"></i>
              数值
           </label>
         </div>
         <div class="clear fieldList">
           <label class="fieldli"  v-for="(item,index) in tnumber" :key="index"><input type="checkbox" v-model="item.checked" :checked="item.checked" class="commoncheckbox">{{item.title}}</label>
         </div>
       </div>
       <div class="typeli" v-if="tstring.length>0">
         <div class="fieldType">
           <label>
             <input type="checkbox" :checked="tstring[0].checked"  @click="checkAll('tstring',$event)" class="commoncheckbox">
             <i class="iconfont  icon-T"></i>
              文本
           </label>
         </div>
         <div class="clear fieldList">
           <label class="fieldli"  v-for="(item,index) in tstring" :key="index"><input type="checkbox" v-model="item.checked"  :checked="item.checked" class="commoncheckbox">{{item.title}}</label>
         </div>
       </div>
       <div class="fllist clear btntops">
        <div class="confrimbtn right" @click="getTableData()">确定</div>
       </div>
     </div>
   </div>

   <div class="table-info">
     <div class="table-infodetail">显示最新<span>{{demoData}}</span>条数据，共<span>{{totalData}}</span>条数据</div>
     <!-- <span class="split">|</span>
     <span class="changetime">最近更新时间：2018-02-24 14:38:20</span> -->
   </div>
   
   <div class="table-data-detail"
      ref="tableHeight"
      v-loading="loading" 
      element-loading-background="rgba(25,26,44,.5)"
      element-loading-text="拼命加载中..."
      :style="{'padding-top':`${padTop}px`}"
   >
    <el-table
      :data="tableInfo"
      style="width: 100%"
       @sort-change="sortchange"
      :height="height"
      >
      <el-table-column
       v-for="(item,index) in mixFields"
        :key="index"
        :prop="item.title"
        :label="item.title"
        :type="item.type"
        sortable="custom"
        border
        width="180"
        :render-header="renderHeader"
        >
      </el-table-column>
     
    </el-table>
   </div>
    <el-alert
      :title="errorTip.title"
      type="error"
      style="width:45%;margin:0 auto;z-index:999"
      v-show="errorTip.show"
      show-icon>
    </el-alert>

 </div>
</template>
<script>
import api from "@/server/api";
import Vue from "vue";
export default {
  data() {
    return {
      tableInfo: [],
      height: 200,
      padTop: 0,
      totalData:0,
      demoData:0,
      loading: false,
      filterShow: false,
      dataShow: false,
      errorTip: {
        title: "",
        show: false
      },
      tnumber:[],
      tstring:[],
      tdate:[],
      mixFields:[],
      fliterList: [
        {
          fieldType: "",
          field: "",
          type: ">",
          val: "",
          val2: ""
        }
      ]
    };
  },
  mounted() {
    //初始化字段数据
    this.tableDatas.aFields.forEach(item=>{
      if(item.checked ==undefined){
        item.checked =true;
      }
      if(item.type=='date'){
        this.tdate.push(item)
      }
      if(item.type=='number'){
        this.tnumber.push(item)
      }
      if(item.type=='string'){
        this.tstring.push(item)
      }
    })
    this.getTableData(true);
    //获取数量
    let param ={
        db: this.tableDatas.iDbID,
        tbl: this.tableDatas.sTable,
        fields: 'count(*)',
        ftype: 'one'
     }
    api.query(param).then(res => {
      if (res.status) {
        let num =parseFloat(res.data);
        this.demoData =num>200?200:num;
        this.totalData=num.toLocaleString('en-US')
       }
    })
  },
  props: {
    tableDatas: Object,
    activeName:String
  },
  computed: {},
  methods: {
    getTableData(mouted){
      let _this =this;
      if (this.tableDatas.sTable) {
        _this.loading = true;
        let param ={};
        let fields1 =[
          ...this.tnumber,
          ...this.tdate,
          ...this.tstring
        ]
        this.mixFields=fields1.filter(item=>{
         return item.checked
        })
        if(this.filterShow && this.fliterList[0].field){
          param = {
            db: this.tableDatas.iDbID,
            tbl: this.tableDatas.sTable,
            fields1: this.mixFields,
            filters2:this.fliterList
          };
         
        }else{
          param = {
            db: this.tableDatas.iDbID,
            tbl: this.tableDatas.sTable,
            fields1: this.mixFields
          };
        }
        this.tableDatas.aFields =fields1;
        api.query(param).then(res => {
          if (res.status) {
            _this.tableInfo = res.data;
            _this.loading = false;
            if(!mouted){
               _this.saveData();
            }
          }
        })
        .catch(err=>{
          console.log(err)
        });
      }
    },
    saveData(){
      let param = {
        iAutoID: this.tableDatas.iAutoID,
        sName: this.tableDatas.sName,
        sComment: this.tableDatas.sComment,
        aFields: this.tableDatas.aFields
      };
      api.tableSave(param);
    },
    sortchange(column){
      this.mixFields.forEach(item => {
        if (item.title == column.prop) {
          this.$set(item, "order", column.order);
        } else {
          this.$set(item, "order", false);
        }
      });
      this.getTableData();
    },
    checkAll(type,e){
      this[`${type}`].forEach(item=>{
        this.$set(item, "checked", e.target.checked);
      })
      //黑魔法，强制页面显示
      this[`${type}`].splice(0,0);
    },
    filterDatas(index){
      let _this =this;
      this.regFilter(index,this.getTableData);

    },
    getTableHeight() {
      this.$nextTick(() => {
        this.padTop = this.$refs.tableFilter.clientHeight - 20;
        this.height = this.$refs.tableHeight.clientHeight - this.padTop - 10;
      });
    },
    filterShowfn() {
      this.filterShow = !this.filterShow;
      this.dataShow = false;
      this.getTableHeight();
    },
    dataShowfn() {
      this.dataShow = !this.dataShow;
      this.filterShow = false;
      this.getTableHeight();
    },
    regFilter(index,callback){
      if (this.fliterList[index].field != "") {
        if (
          this.fliterList[index].type == "" ||
          this.fliterList[index].type == "!"
        ) {
           callback();
        } else {
          if (this.fliterList[index].val != "") {
            if (this.fliterList[index].fieldType != "date") {
             callback();
            } else {
              if (
                this.fliterList[index].fieldType == "date" &&
                this.fliterList[index].val2 != ""
              ) {
               callback();
              } else {
                this.errorTips("时间字段2为必填！");
              }
            }
          } else {
            this.errorTips("过滤条件必填！");
          }
        }
      } else {
        this.errorTips("请选择字段名称！");
      }
    },
    addone(index) {
      let _this =this;
      this.regFilter(index,()=>{
          _this.fliterList.push({
            fieldType: "",
            field: "",
            type: ">",
            val: "",
            val2: ""
          });
      })
      //计算高度
      this.getTableHeight();
    },
    remove(index) {
      this.fliterList.splice(index, 1);
      //计算高度
      this.getTableHeight();
    },
    getChange(e, index) {
      this.fliterList[index].fieldType =
        e.target[e.target.selectedIndex].dataset.type;
      this.fliterList[index].val = "";
      this.fliterList[index].val2 = "";
      this.fliterList[index].type =
        this.fliterList[index].fieldType == "date" ? "~" : ">";
      // console.log(e.target[e.target.selectedIndex].dataset.type)
    },
    clearval(type, index) {
      if (type == "" || type == "!") {
        this.fliterList[index].val = "";
        this.fliterList[index].val2 = "";
      }
    },
    errorTips(title) {
      let _this = this;
      this.errorTip.show = true;
      this.errorTip.title = title;
      setTimeout(() => {
        _this.errorTip.show = false;
      }, 2000);
      return false;
    },
    renderHeader(h, { column, $index }) {
      let _module = require("@/components/table/com/editField");
      Vue.component("editField", _module.default);
      return h(
        "div",
        {
          style: {
            minHeight: "24px",
            width: "100%"
          }
        },
        [
          h("editField", {
            props: {
              fieldData: {
                label: column.label,
                type: column.type
              }
            }
          })
        ]
      );
    }
  },
  components: {},
  watch:{
    activeName:{
      immediate:true,
      handler(val){
          if(val =="first"){
            this.getTableHeight();
          }
      }
    }
  }
};
</script>
