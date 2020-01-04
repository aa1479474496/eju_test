<template>
  <div class="editField">
    <div class="show">
      <div class="leftdown">
        <i class="typeicon iconfont " :class="typeIcon"></i>
        <!-- <i class="iconfont icon-unfold downIcon" v-show="editFlag"></i> -->
        <!-- <span class="changeBox">
          <span class="boxselect">数值</span>
          <span class="boxselect">日期</span>
          <span class="boxselect">文本</span>
        </span> -->
      </div>
      <input v-model="fieldData.label" v-show="editFlag" />
      <i class="iconfont icon-check" v-show="editFlag"></i>
      <i class="iconfont icon-close" v-show="editFlag" @click.stop="cancleEdit"></i>
      <span v-show="!editFlag">{{fieldData.label}}</span>
    </div>
    <!-- <i class="editicon iconfont icon-write" @click.stop="editIt"></i> -->
  </div>

</template>
<script>
export default {
  data() {
    return {
      editFlag: false
    };
  },
  methods: {
    editIt() {
      this.editFlag = true;
    },
    cancleEdit() {
      this.editFlag = false;
    }
  },
  props: {
    fieldData: Object
  },
  watch: {},
  computed: {
    typeIcon(){
      if(this.fieldData.type=='date'){
        return 'icon-riqi2'
      }else if(this.fieldData.type=='number'){
        return 'icon-iconjing'
      }else{
        return 'icon-T'
      }
    }

  }
};
</script>

<style lang="scss" scoped>
$editBx-ul_shadow:  0 0 6px 0 rgba(0, 0, 0, 0.1), 0 12px 12px 0 rgba(0, 0, 0, 0.3);
$editBx-ul_backgroundcolor: #2e324d;
$editBx-ulHover:rgba(81, 130, 228, 0.1);
.editField {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 5px;
  font-size: 12px;
  overflow: visible;
  &:hover {
    .editicon {
      display: inline-block;
    }
  }
  .editicon {
    position: absolute;
    font-size: 12px;
    top: 0px;
    right: 0;
    display: none;
    cursor: pointer;
  }
  .show {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    .leftdown {
      cursor: pointer;
      position: relative;
      .typeicon {
        color: #5182e4;
        font-size: 12px;
      }
      .downIcon {
        color: #fff;
        font-size: 12px;
      }
    }
    .icon-check {
      position: absolute;
      right: 40px;
      z-index: 100;
      width: 16px;
      height: 16px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    .icon-close {
      position: absolute;
      right: 20px;
      z-index: 100;
      width: 16px;
      height: 16px;
      cursor: pointer;
      &:hover {
        color: #fff;
      }
    }
    input {
      position: absolute;
      width: 40%;
      bottom: 4px;
      left: 50px;
      font-size: 12px;
      border: none;
      background-color: transparent;
      outline: 0;
      display: block;
      margin: 0 auto;
      height: 16px;
      line-height: 16px;
      color: #fff;
      border-bottom: 1px solid rgba(81, 130, 228, 0.5);
      &:focus {
        border-bottom: 1px solid rgba(81, 130, 228, 1);
      }
    }
  }
}

.changeBox {
  position: absolute;
  left: 0;
  z-index: 9999;
  padding: 8px 0;
  top: 0px;
  box-shadow: $editBx-ul_shadow;
  background-color: $editBx-ul_backgroundcolor;
  .boxselect {
    cursor: pointer;
    padding: 0 16px;
    min-width: 50px;
    line-height: 32px;
    display: block;
    white-space: nowrap;
    text-align: center;
    &:hover {
      background-color: $editBx-ulHover;
    }
  }
}


</style>




