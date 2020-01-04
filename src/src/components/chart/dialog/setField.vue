<template>
    <div class="editBx-ul">
        <div class="editbx-li" v-if="item.type=='all'" v-for="(item , index) in showItems" :key="index" @click="choosed(item)">
          {{item.name}}<i v-if="item.children" style="font-size:12px;float:right;margin-top:2px;" class="iconfont icon-right"></i>
          <div v-if="item.children" class="editBx-ulinner">
            <div class="editbx-li" v-for="(itm,ids) in item.children" @click="innerchoosed(itm,item.value)" :key="ids"> {{itm.name}}</div>
          </div>
        </div>
        <div class="editbx-li" v-if="item.type==doOperate.type" v-for="(item , index) in showItems" :key="index" @click="choosed(item)">
          {{item.name}}<i v-if="item.children" style="font-size:12px;float:right;margin-top:2px;" class="iconfont icon-right"></i>
          <div v-if="item.children" class="editBx-ulinner">
            <div class="editbx-li" v-for="(itm,ids) in item.children" @click="innerchoosed(itm,item.value)" :key="ids"> {{itm.name}}</div>
          </div>
        </div>
    </div>
</template>
<script>

import defaultStyle from '@/config/style';
export default {
  data() {
    return {
      settings: defaultStyle.chartFieldFun
    };
  },
  props: {
    zditem: Object,
    group: String,
    doOperate:Object
  },
  computed: {
    showItems() {
      return this.settings[this.zditem.type];
    }
  },
  mounted(){
    this.$set(this.doOperate,'type',bi.chart.data.type);

  },
  methods: {
    choosed(item) {
      if(item.children){
        return
      }
      if (item.name == "设置名称") {
        this.$emit("setAlias", this.zditem);
      }else if(item.name == "数值显示格式"){
        this.$emit("setFormat", this.zditem);
      } else {
        this.zditem.fun = item.value;
      }
        this.$el.style.display = "none";
    },
    innerchoosed(item,value){
      this.$set(this.zditem,value,item.value);
      this.$set(this.doOperate,"status",false);
      this.$el.style.display = "none";
    }
  }
};
</script>

