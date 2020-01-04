
<template>
  <attrCommon>
    <div class="oneblock">
      <div class="attr-block-title" onclick="bi.toggle()">
        <span class="el-icon-arrow-down"></span>指标参数
        <i class="el-icon-plus editdialog" @click="addQoption()"></i>
        <i class="iconfont icon-refresh_light editdialog" @click="makeQoption()"></i>
      </div>
      <div class="sdisplay">
        <div class="row" v-for="(zditem,index) in qoptionList" :key="index">
          <!-- <span class="attr-span0">名称:</span> -->
          <input type="text" class="attr-input" style="width:130px;margin-left:20px" :value="zditem.name" @blur="zditem.name=$event.target.value.trim()" placeholder="指标名称">
          <!-- <span class="attr-span0">字段:</span> -->
          <select class="attr-select" style="width:120px" @change="zditem.field=$event.target.value.trim()">
            <option v-for="(item,index) in chartInfo.data.query.fields1" :key="index" :value="item.field" :selected="item.field==zditem.field">{{item.title}}</option>
          </select>
          <i class="el-icon-delete editdialog" @click="removeQoption(index)"></i>
        </div>
      </div>
    </div>
    <div class="oneblock">
      <div class="attr-block-title" onclick="bi.toggle()"><span class="el-icon-arrow-down"></span>地图参数</div>
      <div class="sdisplay" v-tip.dark.transition.bottom="'数值第一个字段'">
          <span class="attr-span">边界字段:</span>
          <input type="text" class="attr-input" :value="lng" disabled>
      </div>
      <div class="sdisplay" v-tip.dark.transition.bottom="'数值第二个字段'">
          <span class="attr-span">提示标题:</span>
          <input type="text" class="attr-input" :value="tiptitle" disabled>
      </div>
      <div class="sdisplay">
          <span class="attr-span">提示内容:</span>
          <input type="text" class="attr-input" value="数值从第三个字段开始逐行显示" disabled>
      </div>
      <div class="sdisplay">
        <span class="attr-span">中心位置:</span>
        <input type="text" class="attr-input" :value="$bi.chart.getSetting('center', '')" @blur="$bi.chart.setSetting('center', $event.target.value, _this)">
      </div>
      <div class="sdisplay">
        <span class="attr-span">地图级别:</span>
        <select class="attr-select" :value="$bi.chart.getSetting('zoom', 5)" @change="$bi.chart.setSetting('zoom', $event.target.value, _this, 'number')">
          <option v-for="(option,index) in zooms" :value="option.value" :key="index">{{ option.name }}</option>
        </select>
      </div>
      <div class="sdisplay">
        <span class="attr-span">鼠标滚动:</span>
        <el-switch class="attr-input"
          :value="$bi.chart.getSetting('scrollWheel', false)"
          active-text="有效"
          inactive-text="无效" @change="$bi.chart.setSetting('scrollWheel', $event, _this)">
        </el-switch>
      </div>
      <div class="sdisplay">
        <span class="attr-span">跳转地址:</span>
        <input type="text" placeholder="为空时不跳转" class="attr-input" :value="$bi.chart.getSetting('url', '')" @blur="$bi.chart.setSetting('url', $event.target.value, _this)">
      </div>
      <div class="sdisplay">
        <span class="attr-span">开新窗口:</span>
        <el-switch class="attr-input"
          :value="$bi.chart.getSetting('target', false)"
          active-text="是"
          inactive-text="否" @change="$bi.chart.setSetting('target', $event, _this)">
        </el-switch>
      </div>
    </div>
  </attrCommon>
</template>

<script>
import attrCommon from '@/components/chart/attr/common';
import defaultStyle from '@/config/style';
export default {
  data() {
    return {
      chartInfo: bi.chart,
      zooms: defaultStyle.chartAmapZooms
    };
  },
  components: {
    attrCommon
  },
  computed: {
    _this() {
      return this;
    },
    qoptionList() {
      return bi.chart.data.qoption || [];
    },
    lng() {
      if (bi.chart.data.query.fields1.length > 0) {
        return bi.chart.data.query.fields1[0].title;
      }
      return '';
    },
    tiptitle() {
      if (bi.chart.data.query.fields1.length > 1) {
        return bi.chart.data.query.fields1[1].title;
      }
      return '';
    }
  },
  methods: {
    addQoption() {
      if (! bi.isArray(this.chartInfo.data.qoption)) {
        this.chartInfo.data.qoption = [];
      }
      let _fields = this.chartInfo.data.query.fields1;
      if (_fields.length == 0) {
        return false;
      }
      let _tmp = {name:'', field:_fields[0].field};
      this.chartInfo.data.qoption.push(_tmp);
    },
    makeQoption() {
       this.$confirm("你确定要生成指标吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        //this.chartInfo.data.qoption = [];
        let _fields = this.chartInfo.data.query.fields1;
        let _list = [];
        for (let i = 1; i < _fields.length; i++) {
          let _name = _fields[i].title;
          _list.push({name:_name, field:_fields[i].field});
        }
        this.chartInfo.data.qoption = _list;
       }).catch(() => {});
    },
    removeQoption(index) {
      this.chartInfo.data.qoption.splice(index, 1);
    }
  }
}
</script>