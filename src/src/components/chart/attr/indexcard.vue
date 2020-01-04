
<template>
  <div>
    <attrCommon>
      <setcolor slot="colorlist" :colorption="colorption"></setcolor>
      <setColorDialog slot="colordialog" v-if="colorption.show" :colorption="colorption"></setColorDialog>
      <div class="oneblock">
        <div class="sdisplay">
          <span class="attr-span">功能配置:</span>
          <i class="el-icon-edit editdialog" @click="colorption.gongnnegShow=true"></i>
        </div>
        <div class="sdisplay">
          <div class="row sgongneng" v-for="(item,index) in tiaojian" :key="index">
            <span class="leftname">{{item.title}}{{fuhaozhuanbian(item.tiaojian)}}</span>
            <span class="sicons">
              <i class="iconfont" :class="item.tiaojian.icon"></i> Aa
            </span>
          </div>
        </div>
      </div>
      <setGongneng slot="colorgongnengdialog" v-if="colorption.gongnnegShow" :colorption="colorption"></setGongneng>
    </attrCommon>
  </div>
</template>

<script>
import attrCommon from "@/components/chart/attr/common";
import attrOption from "@/components/chart/attr/option";
import setcolor from "@/components/chart/attr/setcolor";
import setColorDialog from "@/components/chart/dialog/setColor";
import setGongneng from "@/components/chart/dialog/setGongneng";
export default {
  data() {
    return {
      colorption: {
        show: false,
        gongnnegShow: false,
        list: false
      },
      tiaojian: [],
      afields:[
        ...bi.chart.data.query.fields1,
        ...bi.chart.data.query.fields2
      ]
    };
  },
  methods: {
    fuhaozhuanbian(item) {
      switch (item.fuhao) {
        case ">":
          return `大于${item.valueNum}`;
          break;
        case "<":
          return `小于${item.valueNum}`;
          break;
        case "=":
          return `等于${item.valueNum}`;
          break;
        case "!=":
          return `不等于${item.valueNum}`;
          break;
        case ">=":
          return `大于等于${item.valueNum}`;
          break;
        case "<=":
          return `小于等于${item.valueNum}`;
          break;
        case "~":
          return `介于${item.firstnum}和${item.lastnum}之间`;
          break;
        default:
          return `大于${item.valueNum}`;
      }
    },
    setInittiaojian() {
      let _this = this;
       _this.tiaojian.splice(0);
      _this.afields.forEach(item => {
        if (item.tiaojian) {
          _this.tiaojian.push(item);
          _this.colorption.list = true;
        }
      });
    }
  },
  components: {
    attrCommon,
    attrOption,
    setcolor,
    setColorDialog,
    setGongneng
  },
  watch:{
    afields:{
      immediate:true,
      deep:true,
      handler(val){
        this.setInittiaojian()
      }
    }
  }
};
</script>