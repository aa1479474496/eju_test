<template>
 <div>
    <div class="table-info" v-if="$bi.user.hasAuth(tableDatas.iUserID)">
      <div class="t-edit" v-show="!editFlag" @click="editField"><i class="iconfont icon-write"></i>编辑</div>
      <div class="t-save"  v-show="editFlag" @click="saveTabledata"><i class="iconfont icon-check"></i>保存</div>
      <div class="t-cancle" v-show="editFlag" @click="cancleEdit">取消</div>
    </div>
   
    <div class="table-data-detail">
      <div class="data-set-wrap">
        <div class="data-set-title">
          <div class="li">字段</div>
          <div class="li">字段标题</div>
          <div class="li sw130">字段类型</div>
          <div class="li">字段描述</div>
          <div class="li">是否显示</div>
        </div>
        <draggable  v-model="tableDatas.aFields"  v-if="editFlag">
          <div  class="data-set-ul" v-for="(item,index) in tableDatas.aFields" :key="index">
            <div class="li">{{item.field}}</div>
            <div class="li">
              <input class="editinput" v-model="item.title" v-show="editFlag" type="text"  />
            </div>
            <div class="li sw130">
              <span class="showlabel" :class="{showdown:editFlag}" @mouseover.stop="removeShide($event)">
                <i class="iconfont" :class="showType(item.type,'icon')"></i>{{showType(item.type,"text")}}
                <i class="iconfont icon-triangledownfill sdown"></i>
                <span class="changeType">
                  <span class="boxselect"  @click="changeTypefn($event,index,'string')"> <i class="iconfont icon-T"></i>文本</span>
                  <span class="boxselect"  @click="changeTypefn($event,index,'number')"> <i class="iconfont icon-iconjing"></i>数值</span>
                  <span class="boxselect"  @click="changeTypefn($event,index,'date')"> <i class="iconfont icon-riqi2"></i>日期</span>
                </span>
              </span>
            </div>
            <div class="li">
              <input class="editinput" v-model="item.comment" v-show="editFlag" type="text"  />
            </div>
            <div class="li">
              <span class="showlabel">{{item.checked}}</span>
            </div>
          </div>
       </draggable>
        <div  class="data-set-ul" v-for="(item,index) in tableDatas.aFields" :key="index" v-if="!editFlag">
          <div class="li">{{item.field}}</div>
          <div class="li">
            <span class="showlabel">{{item.title}}</span>
          </div>
          <div class="li sw130">
            <span class="showlabel" :class="{showdown:editFlag}">
              <i class="iconfont" :class="showType(item.type,'icon')"></i>{{showType(item.type,"text")}}
            </span>
          </div>
          <div class="li">
            <span class="showlabel" >{{item.comment}}</span>
          </div>
          <div class="li">
            <span class="showlabel">{{item.checked}}</span>
          </div>
       </div>
    </div>
   </div>
 </div>
</template>
<script>
import api from "@/server/api";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      editFlag: false,
      fieldData: {}
    };
  },
  created() {
    this.fieldData = bi.copy(this.tableDatas);
  },
  props: {
    tableDatas: Object,
  },
  methods: {
    editField() {
      this.editFlag = true;
    },
    cancleEdit() {
      this.editFlag = false;
      this.tableDatas.aFields = JSON.parse(
        JSON.stringify(this.fieldData.aFields)
      );
    },
    changeTypefn(el, index, _type) {
      el.target.parentNode.classList.toggle("shide");
      this.tableDatas.aFields[index].type = _type;
    },
    removeShide(el) {
      if (el.target.classList.contains("showdown")) {
        let elements = el.target.querySelectorAll(".changeType")[0];
        elements && elements.classList.remove("shide");
      }
    },
    saveTabledata() {
      let param = {
        iAutoID: this.tableDatas.iAutoID,
        sName: this.tableDatas.sName,
        sComment: this.tableDatas.sComment,
        aFields: this.tableDatas.aFields
      };
      api.tableSave(param);
      this.editFlag = false;
    },
    showType(type, flag) {
      if (type == "number") {
        if (flag == "icon") {
          return "icon-iconjing";
        } else {
          return "数值";
        }
      }
      if (type == "string") {
        if (flag == "icon") {
          return "icon-T";
        } else {
          return "文本";
        }
      }
      if (type == "date") {
        if (flag == "icon") {
          return "icon-riqi2";
        } else {
          return "日期";
        }
      }
    }
  },
  components: {
    draggable
  }
};
</script>
