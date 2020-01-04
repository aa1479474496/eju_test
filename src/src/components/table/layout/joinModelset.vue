<template>
 <div>
     <div class="join_dragArea" id="join_dragArea" ref="join_dragArea">
     </div>
   <div class="dataShow">
      <el-tabs v-model="activeName">
        <el-tab-pane label="数据预览"  name="first">
          <div class="join-data-detail" ref="joinDataDetail">
           <div class="showDatabtn" @click="showDatafn()" v-if="!dataShowFlag">点击预览数据</div>
           <div class="showDatabtn2" @click="showDatafn()" v-if="dataShowFlag">点击刷新数据</div>
          <el-table
            :data="tableInfo"
            border
            v-if="dataShowFlag"
            v-loading="loading" 
            element-loading-background="#191a2c"
            element-loading-text="拼命加载中..."
            :height="tableHeight"
            style="width: 100%">
            <el-table-column
             v-for="(item,index) in aFields"
             :key="index"
            :prop="item.title"
            :label="item.title"
            :type="item.type"
            sortable
            :render-header="renderHeader"
            width="180">
            </el-table-column>
          </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="异常报告" name="second">
         <span class="errortipsshow"> {{errorData}}</span>
        </el-tab-pane>
      </el-tabs>
   </div>
  <el-alert
    :title="errorTips.title"
    type="error"
    style="width:45%;margin:0 auto;"
    v-show="errorTips.show"
    show-icon>
  </el-alert>
   <joinChange :joinchangeData ="joinchangeData" :modelData="modelData" :errorTips="errorTips"></joinChange>
 </div>

</template>
<script>
import Vue from "vue";
import G6 from "@antv/g6";
import api from "@/server/api";
import joinChange from "@/components/table/dialog/joinChange";
export default {
  data() {
    return {
      eleDrag: {},
      joinchangeData: {
        showdialog: false,
        netReload: false,
        lineData: {},
        position: {}
      },
      net: null,
      errorTips: {
        show: false,
        title: ""
      },
      container: {
        id: "join_dragArea",
        fitView: "tc",
        height: 400,
        grid: null
      },
      flag: false,
      firstFlag: false,
      mouseOverOrnot: false,
      activeName: "first",
      dataShowFlag: false,
      tableInfo: [],
      loading: true,
      aFields: [],
      tableHeight: 200,
      sameParent: false,
      errorData: "暂无异常"
    };
  },
  mounted() {
    let _this = this;
    _this.container.height = this.$refs.join_dragArea.clientHeight;
    _this.firstFlag = _this.$route.query.id ? true : false;
    let net = (_this.net = new G6.Net(_this.container));
    _this.netGridRender(net);
    net.on("itemclick", _this.netClick);
    net.on("itemmouseenter", ev => {
      if (_this.flag && _this.eleDrag) {
        const item = ev.item;
        if (item._attrs.model.iDbID != _this.eleDrag.dataset.db) {
          _this.sameParent = true;
          setTimeout(() => {
            _this.sameParent = false;
          }, 1000);
          return false;
        }
        _this.sameParent = false;
        let nodesData = {
            id: _this.eleDrag.dataset.id,
            name: _this.eleDrag.dataset.name,
            table: _this.eleDrag.dataset.table,
            iDbID: _this.eleDrag.dataset.db,
            x: Math.floor(Math.random() * 480 + 150),
            y: Math.floor(Math.random() * 200 + 100)
          },
          edgeData = {
            source: _this.eleDrag.dataset.id,
            target: item._attrs.model.id,
            id: `line${_this.eleDrag.dataset.id}-${item._attrs.model.id}`,
            color: "rgba(81, 130, 228, 0.5)",
            relation: "left join",
            precent: 80
          };
        net.add("node", nodesData);
        net.add("edge", edgeData);
        _this.modelData.chart.nodes.push(nodesData);
        _this.modelData.chart.edges.push(edgeData);
        _this.eleDrag.classList.add("tree-current");
        _this.eleDrag.removeAttribute("draggable");
        _this.modelData.list.push(_this.eleDrag.dataset.id);
        _this.modelData.showSamename = false;
        api.tableLoad({ id: _this.eleDrag.dataset.id }).then(res => {
          if (res.status) {
            res.data.aFields.forEach(item => {
              item.checked = true;
            });
            _this.modelData.data.push(res.data);
            _this.morenQueryon(
              _this.eleDrag.dataset.id,
              item._attrs.model.id,
              _this.eleDrag.dataset.table,
              item._attrs.model.table
            );
          }
        });

        _this.mouseOverOrnot = true;
        setTimeout(() => {
          _this.mouseOverOrnot = false;
        }, 2000);
      }
    });
    _this.leftTreeDrag(net);
  },
  props: {
    modelData: Object,
    tableName: String
  },
  methods: {
    netGridRender(net) {
      // console.log(this.modelData, "accept");
      let _this = this;
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
            const botton = Util.createDOM(
              `<i class="iconfont icon-close"></i>`
            );
            botton.addEventListener("click", function() {
              _this.modelData.showSamename = false;
              net.remove(net.find(model.id));
              // console.log(model.id);
              _this.removeNodeids(model.id);
              let eleDrags = document.getElementsByClassName("table-tree-leaf"),
                lDrags = eleDrags.length;
              setTimeout(() => {
                for (let i = 0; i < lDrags; i++) {
                  if (eleDrags[i].dataset.id == model.id) {
                    eleDrags[i].classList.remove("tree-current");
                    eleDrags[i].setAttribute("draggable", true);
                    let indexs = _this.modelData.list.indexOf(model.id);
                    _this.modelData.data.splice(indexs, 1);
                    if (indexs == 0) {
                      _this.modelData.query.splice(indexs, 1);
                      if (
                        _this.modelData.query[0] &&
                        _this.modelData.query[0].name1
                      ) {
                        _this.modelData.query[0].name =
                          _this.modelData.query[0].name1;
                        // console.log(_this.modelData.query[0]);
                        delete _this.modelData.query[0].name1;
                        delete _this.modelData.query[0].type;
                        delete _this.modelData.query[0].on;
                      }
                    } else {
                      _this.modelData.query.splice(indexs, 1);
                    }

                    _this.modelData.list.splice(indexs, 1);
                    if (_this.modelData.list.length == 0) {
                      _this.firstFlag = false;
                    }
                  }
                }
              }, 500);
            });
            container.appendChild(botton);
            return container;
          }
        },
        "html"
      );
      net.removeBehaviour(["wheelZoom", "resizeNode"]);
      net.source(_this.modelData.chart.nodes, _this.modelData.chart.edges);
      net
        .node()
        .shape("customNode")
        .style({
          stroke: null // 去除默认边框
        });
      net.edge().shape("arrow");
      net.edge().label("relation");
      net.render();
    },
    netClick(ev) {
      let data = ev.item.get("model");
      this.joinchangeData.lineData = data;
      if (data.relation) {
        if (data.controlPoints) {
          this.joinchangeData.position = data.controlPoints[1];
        } else {
          this.joinchangeData.position.x = ev.x;
          this.joinchangeData.position.y = ev.y;
        }
        this.joinchangeData.showdialog = true;
      }
    },
    leftTreeDrag(net) {
      let _this = this;
      //左侧拖拽
      let eleDrags = document.getElementsByClassName("table-tree-leaf"),
        lDrags = eleDrags.length;
      for (let i = 0; i < lDrags; i++) {
        eleDrags[i].ondragend = function(ev) {
          _this.eleDrag = ev.target;
          if (!_this.firstFlag) {
            let nodeData = {
              id: ev.target.dataset.id,
              name: ev.target.dataset.name,
              table: ev.target.dataset.table,
              iDbID: ev.target.dataset.db,
              x: Math.floor(Math.random() * 380 + 200),
              y: Math.floor(Math.random() * 200 + 100)
            };
            net.add("node", nodeData);
            _this.modelData.chart.nodes.push(nodeData);
            _this.firstFlag = true;
            ev.target.classList.add("tree-current");
            ev.target.removeAttribute("draggable");
            _this.modelData.list.push(ev.target.dataset.id);
            _this.modelData.query.push({ name: ev.target.dataset.table });
            _this.modelData.showSamename = false;
            api.tableLoad({ id: ev.target.dataset.id }).then(res => {
              if (res.status) {
                res.data.aFields.forEach(item => {
                  item.checked = true;
                });
                _this.modelData.data.push(res.data);
              }
            });
          } else {
            _this.flag = true;
            setTimeout(() => {
              if (!_this.mouseOverOrnot) {
                if (_this.sameParent) {
                  _this.errorTipsfn("必须拖拽相同文件夹下面的数据！");
                } else {
                  _this.errorTipsfn("请拖拽到相应节点上！");
                }
              }
              _this.flag = false;
            }, 300);
          }
        };
      }
    },
    morenQueryon(fromid, toid, name1, name) {
      let _this = this,
        tempArray = [];
      let sindex = this.modelData.list.indexOf(fromid),
        tindex = this.modelData.list.indexOf(toid);
      if (sindex > -1) {
        this.modelData.data[sindex].aFields.forEach(item => {
          tempArray.push(item.field);
        });
      }
      if (tindex > -1) {
        this.modelData.data[tindex].aFields.forEach(item => {
          tempArray.push(item.field);
        });
      }
      let sameArray = tempArray.filter((item, index, tempA) => {
        return tempA.indexOf(item) != index;
      });
      if (sameArray.length > 0) {
        let sameName = sameArray[0];
        let on = {};
        on[sameArray[0]] = sameArray[0];
        _this.modelData.query.push({
          name1: name1,
          name: name,
          type: "left join",
          on: on
        });
      } else {
        let leftName = this.modelData.data[sindex].aFields[0].field,
          rightName = this.modelData.data[tindex].aFields[0].field;
        let on = {};
        on[leftName] = rightName;
        _this.modelData.query.push({
          name1: name1,
          name: name,
          type: "left join",
          on: on
        });
      }
    },
    removeNodeids(id) {
      let toids = `line${id}`,
        fromids = `-${id}`;
      this.modelData.chart.edges.forEach((item, index) => {
        if (item.id.indexOf(toids) != -1 || item.id.indexOf(fromids) != -1) {
          this.modelData.chart.edges.splice(index, 1);
        }
      });
      this.modelData.chart.nodes.forEach((item, index) => {
        if (item.id == id) {
          this.modelData.chart.nodes.splice(index, 1);
        }
      });
    },
    showDatafn() {
      if (this.modelData.data.length > 0) {
        this.dataShowFlag = true;
        this.tableHeight = this.$refs.joinDataDetail.clientHeight - 20;
        this.aFields.splice(0);
        this.modelData.data.forEach(item => {
          let temp = item.aFields.filter(list => {
            return list.checked;
          });
          this.aFields.push(...temp);
        });
        // console.log(this.aFields);
        let param = {
          sName: this.tableName,
          iDbID: this.modelData.data[0].iDbID,
          iNodeID: this.modelData.data[0].iNodeID,
          sComment: this.modelData.data[0].sComment,
          aFields: this.aFields,
          aJoin: {
            g6Data: this.modelData.chart,
            tables: this.modelData.query
          }
        };

        api.tablePreview(param).then(res => {
          if (res.status) {
            this.tableInfo = res.data;
            // console.log(this.tableInfo);
            this.loading = false;
          } else {
            this.loading = false;
            this.errorData = res.data;
            this.errorTipsfn("出错，请查看异常报告！");
          }
        });
      } else {
        this.errorTipsfn("暂无数据预览，请先拖拽字段！");
      }
    },
    errorTipsfn(tip) {
      this.errorTips.show = true;
      this.errorTips.title = tip;
      setTimeout(() => {
        this.errorTips.show = false;
      }, 2000);
      return false;
    },
    renderHeader(h, { column, $index }) {
      let _module = require("@/components/table/com/editField");
      Vue.component("editField", _module.default);
      return h(
        "div",
        {
          style: {
            minHeight: "24px",
            width: "100%"
          }
        },
        [
          h("editField", {
            props: {
              fieldData: {
                label: column.label,
                type: column.type
              }
            }
          })
        ]
      );
    }
  },
  components: {
    joinChange
  },
  watch: {
    joinchangeData: {
      deep: true,
      handler(val, old) {
        if (this.joinchangeData.netReload) {
          this.net.remove(this.net.find(val.lineData.id));
          this.net.add("edge", val.lineData);
        }
      }
    }
  }
};
</script>


