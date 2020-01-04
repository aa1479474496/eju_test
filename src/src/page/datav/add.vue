<template>
  <div class="add-datav">
    <backHeader :headTitle="headTitle" :goBack="true"></backHeader>
    <div class="datav-template">
      <div class="temList">

        <div class="li" v-for="(item,index) in temList" :key="index" :class="{active:index == selectedIndex}" @click="checkTemp(index)">
          <div class="temPic">
            <img v-if="item.src" :src="item.src">
          </div>
          <div class="temInfo">
            <div class="sName">{{item.sName}}</div>
            <div class="sDesc">
              <div class="detail" v-if="item.sDesc">{{item.sDesc}}</div>
              <div class="detail" v-if="item.ratio">{{item.ratio}}</div>
              <div class="detail" v-if="item.sSize">{{item.sSize}}</div>
            </div>

          </div>
        </div>

      </div>
      <div class="temArea">

        <div class="create-block">
          <div class="temp-block">
            <img v-if="temList[selectedIndex].src" :src="temList[selectedIndex].src">
            <div class="img"></div>
            <div class="blockHref">
              <el-button class="btn" type="primary" @click="setName()">创建</el-button>
            </div>
          </div>

          <div class="temp-info">
            <div class="desinf"> {{temList[selectedIndex].comments}}</div>
            <div class="botm-box">
              <el-button class="btn" type="primary" @click="setName()">创建</el-button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import backHeader from "@/components/common/backHeader";
export default {
  data() {
    return {
      headTitle: "选择模板",
      temList: [
        {
          iAutoID: 1,
          src: "",
          sName: "空白",
          sDesc: "尺寸自定",
          comments: "在空白画布上尽情施展您的创意吧！"
        }
      ],
      selectedIndex: 0
    };
  },
  components: {
    backHeader
  },
  methods: {
    checkTemp(index) {
      this.selectedIndex = index;
    },
    setName() {
      this.$prompt("数据大屏名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^\S.{1,20}$/,
        inputErrorMessage: "数据大屏名称格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "数据大屏名称: " + value
          });
          this.$router.push("/datav/edit/0");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入数据大屏名称"
          });
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.add-datav {
  .datav-template {
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    top: 64px;
    display: flex;
    .temList {
      width: 300px;
      height: 100%;
      background: #373d41;
      overflow-y: scroll;
      cursor: pointer;
      .li {
        position: relative;
        width: 100%;
        height: 105px;
        padding: 10px 20px;
        box-sizing: border-box;
        align-items: center;
        justify-content: center;
        display: flex;
        color: #fff;
        .temPic {
          position: relative;
          width: 120px;
          height: 85px;
          overflow: hidden;
          box-sizing: border-box;
          background-color: #0f2a42;
          img {
            width: 100%;
          }
        }
        .temInfo {
          flex: 1;
          text-align: left;
          padding-left: 15px;
          .sName {
            line-height: 20px;
            font-size: 14px;
          }
          .sDesc {
            font-size: 12px;
            color: #999;
            line-height: 1.5;
          }
        }
      }
      .li.active {
        background: #4d5459;
        .temPic {
          border: 2px solid #00c1de;
          border-collapse: collapse;
        }
      }
      .li:hover {
        .temPic {
          border: 2px solid #00c1de;
          border-collapse: collapse;
        }
      }
    }
    .temArea {
      flex: 1;
      background: #2b2f32;
      .create-block {
        width: 100%;
        min-width: 740px;
        height: 100%;
        text-align: center;
        padding: 10px 50px 50px 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        flex-wrap: wrap;
        position: relative;
      }
      .temp-block {
        position: relative;
        width: 100%;
        max-width: 1000px;
        height: auto;
        max-height: calc(100% - 100px);
        overflow: hidden;
        img {
          width: 100%;
          height: auto;
          display: block;
        }
        .img {
          width: 100%;
          height: 400px;
          max-height: 100%;
          background: #0f2a42;
        }
        .blockHref {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          left: 0;
          height: 100%;
          width: 100%;
          z-index: 2;
          background: rgba(0, 0, 0, 0.4);
          top: 0;
          cursor: pointer;
          display: none;
          .btn {
            width: 125px;
          }
        }
        &:hover {
          .blockHref {
            display: flex;
          }
        }
      }
      .temp-info {
        position: absolute;
        max-width: 1000px;
        display: flex;
        align-self: flex-end;
        width: 100%;
        color: rgba(255, 255, 255, 0.8);
        font-size: 14px;
        width: 100%;
        .botm-box {
          width: 125px;
          .btn {
            width: 125px;
          }
        }
        .desinf {
          flex: 1;
          text-align: left;
        }
      }
    }
  }
}
</style>
