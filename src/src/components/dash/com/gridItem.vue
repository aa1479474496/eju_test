<script>
import Vue from "vue";
import dashOpt from "./dashOpt";
export default {
  data() {
    return {};
  },
  props: {
    itemData: Object,
    layout: Array,
    mode: String,
    bPoint: Boolean
  },
  components: {
    dashOpt
  },
  render: function(createElement) {
    let _type = "" + this.itemData.type;
    let _optConf = bi.dash.components[_type]["opt"];
    let _conf = bi.dash.components[_type];
    let _node = bi.dash.components[_type]["grid"] || {
      name: _type + "Dash",
      file: _type
    };
    let _module = require("@/components/dash/grid/" + _node.file);
    bi.log("createDashItem:" + _type + ":" + _node.name);

    Vue.component(_node.name, _module.default);

    if (bi.dash.info.iType != 2) {
      return createElement(
        "div",
        {
          attrs: {
            class: "dash-grid-item"
          }
        },
        [
          createElement(_node.name, {
            props: {
              mode: this.mode,
              itemData: this.itemData
            }
          }),
          createElement("dashOpt", {
            props: {
              itemData: this.itemData,
              bPoint: this.bPoint,
              layout: this.layout,
              option: _optConf
            }
          })
        ]
      );
    } else {
      return createElement(
        "div",
        {
          attrs: {
            class: "dash-grid-item"
          }
        },
        [
          createElement(_node.name, {
            props: {
              mode: this.mode,
              itemData: this.itemData
            }
          })
        ]
      );
    }
  }
};
</script>