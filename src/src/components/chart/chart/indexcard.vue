<template>
  <div :class="'chart-box-wrap chart-theme-' + chartInfo.data.theme">
      <div class="chart-text-box">
        <div class="chart-text-box-inner">
          <div class="chart-text-item">
            <div class="chart-text-base">
              <div class="chart-text-title" :style="{'font-size':fontSizeObj.mid}">
                <span class="nick-name-value nowrap" :style="optionStyle" v-if="nameList[0]">{{nameList[0].name}}</span>
              </div>
              <div class="chart-text-value nowrap" v-if="nameList[0]" :style="{'color':settingColor[0],'font-size':fontSizeObj.big}"><i class="iconfont" v-if="nameList[0].icon" :class="nameList[0].icon"></i>{{nameList[0].value}}<sub></sub></div>
            </div>
            <div class="chart-text-updown nowrap" :style="{'font-size':fontSizeObj.smal}" v-if="nameList[1]"><span class="hd nowrap" :style="optionStyle">{{nameList[1].name}}</span><span class="bd up" :style="{'color':settingColor[1]}"><i class="iconfont" v-if="nameList[1].icon" :class="nameList[1].icon"></i>{{nameList[1].value}}</span></div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import optionCompile from "@/components/chart/com/compile";
export default {
  data() {
    return {
      nameList:[],
      settingColor: [],
      fontSizeObj: {
        big: "32px",
        mid: "16px",
        smal: "12px"
      }
    };
  },
  props: {
    chartInfo: Object
  },
  computed: {
    option() {
      return optionCompile.run(this.chartInfo);
    },
    optionStyle() {
      return this.option["style"] || "";
    }
  },
  components: {},
  mounted() {
    let _this = this;
    this.initData();
    this.getFontSize();
    setTimeout(() => {
      window.onresize = () => {
        _this.getFontSize();
      };
    }, 600);
  },
  methods: {
    initData() {
      this.settingColor = this.chartInfo.data.setting.indexcard.color;
      let allfields = [
        ...this.chartInfo.data.query.fields1,
        ...this.chartInfo.data.query.fields2
      ];
      this.nameList.splice(0);
      if (allfields.length > 2 || this.chartInfo.data.query.group.length > 0) {
        this.$set(this.chartInfo.data, "type", "table");
      } else {
        let keys = Object.keys(this.chartInfo.list[0]),
          values = Object.values(this.chartInfo.list[0]);
          if(allfields.length == values.length ){
              allfields.forEach((item,index)=>{
                this.nameList.push({
                  name:keys[index],
                  value:values[index].toLocaleString("en-US")
                })

                if(item.tiaojian){
                  if(!isNaN(values[index])){
                    let fuhao =item.tiaojian.fuhao;
                    switch (fuhao){
                      case ">":
                      if(parseFloat(values[index])>item.tiaojian.valueNum){
                        this.nameList[index].icon =item.tiaojian.icon
                      }
                      break;
                    case "<":
                      if(parseFloat(values[index])<item.tiaojian.valueNum){
                        this.nameList[index].icon =item.tiaojian.icon
                      }
                      break;
                    case "=":
                      if(parseFloat(values[index])==item.tiaojian.valueNum){
                        this.nameList[index].icon =item.tiaojian.icon
                      }
                      break;
                    case "!=":
                      if(parseFloat(values[index])!=item.tiaojian.valueNum){
                        this.nameList[index].icon =item.tiaojian.icon
                      }
                      break;
                    case ">=":
                      if(parseFloat(values[index])>=item.tiaojian.valueNum){
                        this.nameList[index].icon =item.tiaojian.icon
                      }
                      break;
                    case "<=":
                      if(parseFloat(values[index])<=item.tiaojian.valueNum){
                        this.nameList[index].icon =item.tiaojian.icon
                      }
                      break;
                    case "~":
                      if(parseFloat(values[index])>item.tiaojian.firstnum && parseFloat(values[index])<item.tiaojian.lastnum){
                        this.nameList[index].icon =item.tiaojian.icon
                      }
                      break;
                    default:
                      this.nameList[index].icon =""
                    }
                  }
                }
              })
         }
      }
    },
    getFontSize() {
      let _this = this;
      let wrapdiv = _this.$el.clientWidth / 18;
      // console.log(wrapdiv,"ewrewrewr")
      if (wrapdiv < 60 && wrapdiv > 11) {
        this.$set(this.fontSizeObj, "big", `${wrapdiv}px`);
        if (wrapdiv - 16 > 11) {
          if (wrapdiv - 16 < 24) {
            this.$set(this.fontSizeObj, "mid", `${wrapdiv - 16}px`);
          } else {
            this.$set(this.fontSizeObj, "mid", "24px");
          }
        } else {
          this.$set(this.fontSizeObj, "mid", "12px");
        }
        if (wrapdiv - 20 > 11) {
          if (wrapdiv - 20 < 18) {
            this.$set(this.fontSizeObj, "smal", `${wrapdiv - 20}px`);
          } else {
            this.$set(this.fontSizeObj, "smal", "18px");
          }
        } else {
          this.$set(this.fontSizeObj, "smal", "12px");
        }
      } else {
        if (wrapdiv > 60) {
          this.$set(this.fontSizeObj, "big", "60px");
          this.$set(this.fontSizeObj, "mid", "24px");
          this.$set(this.fontSizeObj, "smal", "18px");
        }
        if (wrapdiv < 12) {
          this.$set(this.fontSizeObj, "big", "12px");
          this.$set(this.fontSizeObj, "mid", "12px");
          this.$set(this.fontSizeObj, "smal", "12px");
        }
      }
    }
  },
  watch: {
    "chartInfo.list": {
      deep: true,
      handler(val) {
        this.initData();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.chart-text-box {
  text-align: center;
  overflow: hidden;
  position: absolute;
  width: 50%;
  right: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(2);
  .chart-text-box-inner {
    margin: 0 auto;
    .chart-text-item {
      padding: 4px 0;
      display: inline-block;
      text-align: left;
      max-width: 100%;
      .chart-text-base {
        .chart-text-title {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 700;
          .nick-name-value {
            display: inline-block;
            padding-right: 2px;
          }
        }
        .chart-text-value {
          font-size: 32px;
          font-family: Avenir, wf_SegoeUI, "Segoe UI", Segoe, "Segoe WP", Tahoma,
            Verdana, Arial, sans-serif;
          font-weight: lighter;
          white-space: nowrap;
          text-overflow: ellipsis;
          vertical-align: middle;
          sub {
            font-size: 13px;
            position: relative;
            font-weight: 400;
            vertical-align: baseline;
            margin-left: 4px;
          }
        }
      }
      .chart-text-updown {
        font-size: 12px;
        display: flex;
        .hd {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 700;
          margin-right: 8px;
          padding-right: 2px;
          max-width: 70%;
        }
        .bd {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          min-width: 20%;
        }
      }
    }
  }
}
.nowrap {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>



