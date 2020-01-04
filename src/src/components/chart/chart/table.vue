<template>
  <div :class="'chart-box-wrap chart-theme-' + chartInfotheme" :style="charttop">
    <el-table
      v-show="chartInfo.list.length>0"
      :data="chartInfo.list"
      :size="optionSize"
      :border="optionBorder"
      :stripe="optionStripe"
      :default-sort="optionDefaultSort"
      :max-height="maxHeight"
      :show-summary="optionShowSummary"
      :show-header="optionShowHeader"
      :header-row-style="optionHeaderRowStyle"
      :header-cell-style="optionHeaderCellStyle"
      :span-method="spanMethod"
      @row-click="rowClick"
      @header-dragend="headerDrag"
      @sort-change="sortChange"
    >
      <el-table-column v-if="optionIndex" type="index" :index="indexMethod">
      </el-table-column>
      <el-table-column
        :width="item.width||width"
        v-for="(item,index) in headerData"
        :fixed="item.fixed || optionFixed[item.title]"
        :key="index"
        :prop="item.title"
        :label="item.title"
        :align="item.align"
        :render-header="renderHeader"
        :sortable="true">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import optionCompile from "@/components/chart/com/compile";
export default {
  data() {
    return {
      maxHeight: 0,
      width: 180
    };
  },
  props: {
    chartInfo: Object
  },
  computed: {
    chartInfotheme() {
      return bi.dash.getTheme();
    },
    option() {
      return optionCompile.run(this.chartInfo);
    },
    optionSize() {
      return this.option["size"] || "";
    },
    optionBorder() {
      return typeof this.option["border"] == "boolean"
        ? this.option["border"]
        : true;
    },
    optionStripe() {
      return typeof this.option["stripe"] == "boolean"
        ? this.option["stripe"]
        : false;
    },
    optionFixed() {
      let _fixed = this.option["fixed"] || {};
      if (typeof _fixed == "object" && !(_fixed instanceof Array)) {
        return _fixed;
      }

      return {};
    },
    optionDefaultSort() {
      //获取field中sort
      let fildSort = {};
      let _temp = [
        ...this.chartInfo.data.query.group,
        ...this.chartInfo.data.query.fields1,
        ...this.chartInfo.data.query.fields2
      ];
      _temp.forEach(item => {
        if (item.order) {
          fildSort.order = item.order;
          fildSort.prop = item.title;
        }
      });
      let _sort = this.option["default-sort"] || {};
      if (typeof _sort == "object" && !(_sort instanceof Array)) {
        _sort = fildSort.order
          ? Object.assign(_sort, fildSort)
          : Object.assign(fildSort, _sort);
        return _sort;
      }
      return fildSort;
    },
    optionShowSummary() {
      return typeof this.option["show-summary"] == "boolean"
        ? this.option["strishow-summarype"]
        : false;
    },
    optionShowHeader() {
      return typeof this.option["show-header"] == "boolean"
        ? this.option["show-header"]
        : true;
    },
    optionHeaderRowStyle() {
      let _style = this.option["header-row-style"] || {};
      if (typeof _style == "object" && !(_style instanceof Array)) {
        return _style;
      }

      return {};
    },
    optionHeaderCellStyle() {
      let _style = this.option["header-cell-style"] || {};
      if (typeof _style == "object" && !(_style instanceof Array)) {
        return _style;
      }
      return {};
    },
    optionIndex() {
      return typeof this.option["index"] == "boolean"
        ? this.option["index"]
        : false;
    },
    headerData() {
      let _tmp = [];
      _tmp.push(
        ...this.chartInfo.data.query.group,
        ...this.chartInfo.data.query.fields1,
        ...this.chartInfo.data.query.fields2
      );
      return _tmp;
    },
    charttop() {
      return this.chartInfo.data.filters2.length > 0 ? "top:48px" : "";
    }
  },
  components: {},
  mounted() {
    var _this = this;
    _this.heightCals();
    _this.cellWidth();
    window.onresize = () => {
      _this.cellWidth();
      _this.heightCals();
    };
    _this.dataFormat();
  },
  methods: {
    dataFormat() {
      let format = this.headerData.filter((item, index) => {
        return item.dataformat;
      });
      format.length > 0 &&
        this.chartInfo.list.forEach(item => {
          format.forEach(itm => {
            let type = itm.dataformat.type;
            if (type == "number") {
              item[itm.title] = Number(item[itm.title]).toFixed(
                itm.dataformat.number.digitNum
              );
              if (itm.dataformat.number.split) {
                item[itm.title] = Number(item[itm.title]).toLocaleString(
                  "en-US"
                );
              }
              if (itm.dataformat.number.unit != 0) {
                if (itm.dataformat.number.split) {
                  item[itm.title] = item[itm.title].replace(",", "");
                }
                switch (itm.dataformat.number.unit) {
                  case "万":
                    item[itm.title] =
                      (Number(item[itm.title]) / 10000).toFixed(
                        itm.dataformat.number.digitNum
                      ) + itm.dataformat.number.unit;
                    break;
                  case "亿":
                    item[itm.title] =
                      (Number(item[itm.title]) / 1000000000).toFixed(
                        itm.dataformat.number.digitNum
                      ) + itm.dataformat.number.unit;
                    break;
                  default:
                    item[itm.title] =
                      item[itm.title] + itm.dataformat.number.unit;
                    break;
                }
              }
            } else {
              item[itm.title] =
                (parseFloat(item[itm.title]) * 100).toFixed(
                  itm.dataformat.percentage.digitNum
                ) + "%";
            }
          });
        });
    },
    cellWidth() {
      this.$nextTick(() => {
        let aLength = [
          ...this.chartInfo.data.query.group,
          ...this.chartInfo.data.query.fields1,
          ...this.chartInfo.data.query.fields2
        ].length;
        let tableWidth = this.$el.clientWidth;
        if (180 * aLength < tableWidth) {
          this.width = tableWidth / aLength;
        } else {
          this.width = 180;
        }
      });
    },
    heightCals() {
      let _clientHeight = 0;
      if (this.$el.clientHeight) {
        _clientHeight = this.$el.clientHeight - 30;
      }

      this.maxHeight = _clientHeight * 1;
      // console.log("maxHeight:" + this.maxHeight);
    },
    rowClick(row, event, column) {
      //TODO
      if (this.option["row-click"] != "") {
        try {
          eval(this.option["row-click"]);
        } catch (exception) {
          bi.log(exception);
        }
      }
    },
    indexMethod(index) {
      let _index = 0;
      if (this.option.index) {
        _index = index + 1;
      }

      return _index;
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      if (this.option.merge) {
        //TODO
      }
      // if (rowIndex % 2 === 0) {
      //   if (columnIndex === 0) {
      //     return [1, 2];
      //   } else if (columnIndex === 1) {
      //     return [0, 0];
      //   }
      // }
    },
    headerDrag(newWidth, oldWidth, column, event) {
      this.headerData.find(item => {
        if (item.title == column.label) {
          this.$set(item, "width", column.width);
        }
      });
    },
    sortChange(obj) {
      this.headerData.forEach(item => {
        if (item.title == obj.prop) {
          this.$set(item, "order", obj.order);
        } else {
          this.$set(item, "order", false);
        }
      });
    },
    clickHandler(e) {
      e.target.classList.toggle("active");
      if (e.target.classList.contains("active")) {
        if (e.target.dataset.index == this.headerData.length - 1) {
          this.headerData.find(item => {
            if (item.title == e.target.dataset.label) {
              this.$set(item, "fixed", "right");
            }
          });
        } else {
          this.headerData.find(item => {
            if (item.title == e.target.dataset.label) {
              this.$set(item, "fixed", "left");
            }
          });
        }
      } else {
        this.headerData.find(item => {
          if (item.title == e.target.dataset.label) {
            this.$set(item, "fixed", false);
          }
        });
      }
      e.stopPropagation();
    },
    renderHeader(h, { column, $index }) {
      return h(
        "div",
        {
          class: "hoverFixed"
        },
        [
          column.label,
          h("i", {
            class: {
              iconfont: true,
              "icon-fixed": true,
              headicon: true,
              active: column.fixed
            },
            attrs: {
              "data-label": column.label,
              "data-index": $index
            },
            on: {
              click: this.clickHandler
            }
          })
        ]
      );
    }
  },
  watch: {
    "chartInfo.data.query": {
      deep: true,
      handler(val) {
        this.cellWidth();
      }
    }
  }
};
</script>
<style lang="scss">
.chart-box-wrap {
  .el-table th > .cell {
    min-height: 34px;
  }
  .el-table {
    .caret-wrapper {
      position: absolute;
      left: 3px;
      top: 0;
    }
    .hoverFixed {
      position: absolute;
      left: 24px;
      font-size: 12px;
      right: 0px;
      top: 0;
      bottom: 0;
      &:hover {
        .headicon {
          display: inline-block;
        }
      }
      .headicon {
        position: absolute;
        right: 0px;
        font-size: 12px;
        width: 20px;
        z-index: 1;
        display: none;
      }
      .active {
        color: #5182e4;
        transform: rotate(-45deg);
        display: inline-block;
      }
    }
  }

  .el-table th div.hoverFixed {
    line-height: 32px;
  }
  .el-table th.is-hidden > *,
  .el-table td.is-hidden > * {
    visibility: visible;
  }
}
</style>


