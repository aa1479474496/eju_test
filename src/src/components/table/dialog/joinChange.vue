<template>
  <div class="joindialog" v-show="joinchangeData.showdialog" :style="styleObj">
    <div class="clear join-type-title">
      <span class="left">关联方式：</span>
      <div class="join-type">
        <select class="dialog-select" v-model="joinchangeData.lineData.relation">
          <option value="left join">left join</option>
          <option value="inner join">inner join</option>
          <option value="full join">full join</option>
        </select>
      </div>
     </div>

     <div class="left-column" ref="appendcloneHtml" v-loading="loading" 
    element-loading-background="#24273E"
    element-loading-text="拼命加载中...">
       <div class="clear onelist">
         <p>{{fromData.sName}}</p>
         <p>{{toData.sName}}</p>
       </div>
       <div class="clear onelist" v-for="(item,index) in fieldArray" :key="index">
          <select class="dialog-select" v-model="fieldArray[index]['name1']">
            <option v-for="(optionlist,indx) in fromData.aFields " :value="optionlist.field" :key="indx">{{optionlist.field}}</option>
          </select>
          <span class="inlineblock xiangdeng">=</span>
          <select class="dialog-select" v-model="fieldArray[index]['name']">
            <option v-for="(optionlist,indx) in toData.aFields " :value="optionlist.field" :key="indx">{{optionlist.field}}</option>
          </select>
          <i class="clickbtn iconfont icon-add1" @click="copyOneline(index)"></i>
          <i class="clickbtn iconfont icon-move" @click="deleteonline($event,index)"></i>
       </div>
     </div>
    <div class="dialog-buttons">
      <button type="button" class="ngdialog-button" @click="confirmbtn()">确定</button> 
      <button type="button" class="ngdialog-button" @click="joinchangeData.showdialog=false">取消</button>
    </div>


  </div>
</template>

<script>
export default {
  data() {
    return {
      fromData: [],
      loading: true,
      toData: [],
      query: {},
      queryindex: 0,
      fieldArray: [{ name: "", name1: "" }]
    };
  },
  mounted() {
  },
  props: {
    joinchangeData: Object,
    errorTips: Object,
    modelData: Object
  },
  computed: {
    styleObj() {
      return {
        top: `${this.joinchangeData.position.y}px`,
        left: `${this.joinchangeData.position.x}px`
      };
    }
  },
  methods: {
    copyOneline(index) {
      let _length = this.fieldArray.length;
      if (
        this.fieldArray[_length - 1].name != "" &&
        this.fieldArray[_length - 1].name1 != ""
      ) {
        this.fieldArray.push({ name: "", name1: "" });
      } else {
        this.errorTips.show = true;
        this.errorTips.title = "请确保所有关联字段不能为空！";
        setTimeout(() => {
          this.errorTips.show = false;
        }, 2000);
      }
    },
    deleteonline(e, index) {
      if (this.fieldArray.length > 1) {
        // this.$refs.appendcloneHtml.removeChild(e.target.parentNode);
        this.fieldArray.splice(index, 1);
      }
    },
    confirmbtn() {
      let onArray = {};
      let _length = this.fieldArray.length;
      if (
        this.fieldArray[_length - 1].name == "" &&
        this.fieldArray[_length - 1].name1 == ""
      ) {
        this.errorTips.show = true;
        this.errorTips.title = "请确保所有关联字段不能为空！";
        setTimeout(() => {
          this.errorTips.show = false;
        }, 2000);
        return false
      }
      this.joinchangeData.netReload = true;
      this.joinchangeData.showdialog = false;
      this.query = this.modelData.query.find(item => {
        return (
          item.name == this.toData.sName && item.name1 == this.fromData.sName
        );
      });
      this.queryindex = this.modelData.query.findIndex(item => {
        return (
          item.name == this.toData.sName && item.name1 == this.fromData.sName
        );
      });
      this.fieldArray.forEach((item, index) => {
        onArray[item.name] = item.name1;
      });
      this.query.on = onArray;
      this.query.type =this.joinchangeData.lineData.relation;
      this.modelData.query[this.queryindex]=this.query;
      // console.log(this.modelData.query);
    }
  },
  watch: {
    'joinchangeData.lineData.id'(val) {
      let tempArray=[];
      let pureid = val.replace("line", ""),
        source = pureid.split("-")[0],
        target = pureid.split("-")[1];
      let sindex = this.modelData.list.indexOf(source),
        tindex = this.modelData.list.indexOf(target);
      if (sindex > -1) {
        this.fromData = this.modelData.data[sindex];
        this.fromData.aFields.forEach(item=>{
          tempArray.push(item.field);
        })

        this.loading = false;
      }
      if (tindex > -1) {
        this.toData = this.modelData.data[tindex];
        this.loading = false;
        this.toData.aFields.forEach(item=>{
          tempArray.push(item.field);
        })
      }
      if(tempArray.length>0){
        let sameArray=tempArray.filter((item,index,tempA)=>{
          return tempA.indexOf(item)!=index
        })
        if(sameArray.length>0){
          this.fieldArray[0].name=sameArray[0];
          this.fieldArray[0].name1=sameArray[0];
        }else{
          this.fieldArray[0].name=this.fromData.aFields[0].field;
          this.fieldArray[0].name1=this.toData.aFields[0].field;
        }

      }
    }
  }
};
</script>