<template>
 <div>
   <div class="editit" @click="gotoEdit()">编辑</div>
   <div class="join_dragArea  showG6s" id="showG6s" ref="showG6s">
   </div>
 </div>
</template>
<script>
import G6 from "@antv/g6";
export default {
  data() {
    return {
      container: {
        id: "showG6s",
        fitView: "tc",
        height: 600,
        grid: null
      }
    };
  },
  mounted() {
    this.initG6data();
  },
  props: {
    tableDatas: Object
  },
  methods: {
    initG6data() {
      // console.log(this.tableDatas);
      let _this = this;
      _this.container.height = this.$refs.showG6s.clientHeight;
      let net = new G6.Net(_this.container);
      const Util = G6.Util;
      G6.registerNode(
        "customNode",
        {
          cssSize: true, // 不使用内部 size 作为节点尺寸
          getHtml: function(cfg) {
            const model = cfg.model;
            const container = Util.createDOM(
              `<div  class="node-container">${model.name}</div>`
            );
            return container;
          }
        },
        "html"
      );
      net.removeBehaviour(["wheelZoom", "resizeNode"]);
      if (_this.tableDatas.aJoin.g6Data) {
        net.source(
          _this.tableDatas.aJoin.g6Data.nodes,
          _this.tableDatas.aJoin.g6Data.edges
        );
      } else {
        net.source([], []);
      }
      net
        .node()
        .shape("customNode")
        .style({
          stroke: null // 去除默认边框
        });
      net.edge().shape("arrow");
      net.edge().label("relation");
      net.render();
      net.on("itemclick", ev => {
        let sitems = ev.item.get("model");
        if (sitems.table) {
          window.location.href = `/table/list/${sitems.id}`;
        }
      });
    },
    gotoEdit(){
      this.$router.push(`/table/join?id=${this.$route.params.id}`)
    }
  },
  components: {},
  watch: {}
};
</script>

