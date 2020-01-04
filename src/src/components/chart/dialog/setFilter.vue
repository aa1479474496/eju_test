<template>
  <el-dialog
    title="图表筛选器配置"
    custom-class="bi-dialog"
    :visible="doption.filter"
    @close="doption.filter=false"
    width="60%">
    <div class="chart-filter-box">
      <div class="flex1">
        <div class="chart-worktitle">字段</div>
          <draggable class="chart-zd-ul chart-drag-field" v-model="chartData.fields" :options="{group:{ name:'dragdata', pull:'clone', put:false }}">
            <div class="chart-zd-li" @dragstart="dragstart" @dragend="dragend(zditem)" v-for="(zditem,index) in chartData.fields" :key="index">
              <span class="el-icon-rank"></span>{{zditem.title}}
            </div>
          </draggable>
      </div>
      <div class="flex1" ref="addarea">
          <div class="chart-worktitle">已添加</div>
            <draggable v-model="chartData.filters2" class="chart-zd-ul chart-drag-field"  :options="{group:{ name:'dragdata', animation: 150}}" >
              <div class="field-list" :class="{'current':activeIndex==index}" v-for="(zditem,index) in chartData.filters2" :key="index" @click.stop="showFilterOption(index, zditem)">
                <span>{{zditem.title}}</span>
                <i class="el-icon-delete deletebtn" @click.stop="removeIndex(index)"></i>
              </div>
            </draggable>
      </div>
      <div class="flex1">
        <div class="chart-worktitle">选项</div>
        <div class="chart-zd-ul chart-drag-field" >
          <div class="field-list" v-for="(optionitem,index) in optionResult" :key="index">
            <span>{{optionitem}}</span>
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-buttons">
        <button type="button" class="ngdialog-button" @click="doption.filter=false">确定</button>
        <button type="button" class="ngdialog-button" @click="doption.filter=false">取消</button>
    </span>
  </el-dialog>
</template>

<script>
import draggable from 'vuedraggable';
import api from '@/server/api';
export default {
  data() {
    return {
      chartData: bi.chart.data,
      activeIndex: -1
    };
  },
  props: {
    doption: Object
  },
  components: {
    draggable
  },
  computed: {
    optionResult() {
      if (this.activeIndex >= this.chartData.filters2.length) {
        this.activeIndex = 0;
      }
      return this.chartData.filters2[this.activeIndex] && this.chartData.filters2[this.activeIndex].data || [];
    }
  },
  methods: {
    showFilterOption(index, item) {
      this.activeIndex = index;
    },
    removeIndex(index) {
      let _item = this.chartData.filters2[index];
      delete this.chartData.query.filters2[_item.field];

      this.chartData.filters2.splice(index, 1);
    },
    dragstart() {
      this.$refs.addarea.style.backgroundColor = "#252c49";
    },
    dragend(item) {
      this.$refs.addarea.style.backgroundColor = "";
      let _index = this.chartData.filters2.length - 1;
      this.activeIndex = _index;

      let _query = {
        db: this.chartData.query.db,
        tbl: this.chartData.query.tbl,
        group: [item],
        ftype: 'col'
      };
      //请求数据
      api.query(_query).then(res => {
        if (res.status) {
          this.chartData.filters2[_index].data = res.data;
        }
      });
    }
  }
};
</script>
<style langue="sass" scoped>
.field-list{padding:0 15px;}
</style>
