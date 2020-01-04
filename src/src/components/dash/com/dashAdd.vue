<template>
  <div class="dash-edit-addnav">
      <span>添加元素</span>
      <el-tooltip v-for="(item,type) in coms" v-if="item.icon" :key="type" :content="item.name" placement="top" effect="light">
        <i class="icon iconfont" :class="item.icon" :style="{'font-size':item.iconSize}"  @click="addItem(type)"></i>
      </el-tooltip>
  </div>
</template>

<script>
export default {
  data() {
    return {
      coms: bi.dash.components
    };
  },
  methods: {
    async addItem(type) {
      let _pageType = bi.dash.info.iType;
      bi.log("dash add item: " + type);

      let layout = bi.dash.getLayout();
      let index = 0;
      if (layout.length > 0) {
        let _arr = layout.map(el => el.i);
        index = Math.max.apply(null, _arr) + 1;
      }
      let conf = bi.dash.components[type];

      let defaultData = null;
      //非大屏数据添加
      if (_pageType != 2) {
        let maxHeight = 0;
        if (layout.length > 0) {
          let _arr = layout.map(el => el.y);
          maxHeight = Math.max.apply(null, _arr) + 40;
        }
        // 读取初始数据
        let _width = bi.dash.info.iType == "0" ? conf.wh[1] : conf.wh[2];
        defaultData = {
          x: 0,
          y: maxHeight,
          w: conf.wh[0],
          h: _width,
          i: index + "",
          type: type,
          data: {},
          css: {}
        };
       let scrollflag= setTimeout(()=>{
            document.getElementById("maindashGrid").scrollTop=document.getElementById("maindashGrid").scrollHeight;
           clearTimeout(scrollflag)
        },300)
      } 
      //大屏数据添加
      else {
        defaultData = {
          i:index + "",
          w: conf.dataV.wh[0],
          h: conf.dataV.wh[1],
          x: 0,
          y: 0,
          minw: conf.dataV.minw,
          minh: conf.dataV.minh,
          sName: `${conf.dataV.sTitle}-${index}`,
          type: type,
          data: {},
          css: {}
        };
      }

      Object.assign(defaultData.css, bi.copy(conf.css || {}));
      Object.assign(defaultData.data, bi.copy(conf.data || {}));

      if (typeof conf.opt.create == "function") {
        await conf.opt.create(defaultData, layout, this.$router);
      }
      _pageType != 2 ? layout.push(defaultData) : layout.unshift(defaultData);

      this.$emit('dashAddHandler',defaultData);

    }
  }
};
</script>