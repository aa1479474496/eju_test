<template>
  <div>
    <backHeader :headTitle="headTitle" :goBack="true"></backHeader>

    <div class="source-addlist">

      <div class="items" v-for="(item,index) in dataSource" :key="index">
        <div class="icons">
          <img :src="'/static/source/'+item.iconImg" >
        </div>
        <p class="block-name">{{item.name}}</p>
        <p class="block-desc">{{item.describe}}</p>

        <div class="hovers" @click="addHandler(item.type)">
          <i class="iconfont icon-add_light"></i>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
import backHeader from "@/components/common/backHeader";
import sourceType from "@/config/sourceType";
export default {
  data() {
    return {
      headTitle: "添加数据源",
      dataSource: sourceType.dataSource
    };
  },
  components: {
    backHeader
  },
  methods: {
    addHandler(type) {
      if (type == "mysql") {
        this.$router.push(`/source/${type}/0`);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.source-addlist {
  color: rgba(255, 255, 255, 0.7);
  padding: 104px 105px 0;
  box-sizing: border-box;
  .items {
    position: relative;
    display: inline-block;
    background: rgba(36, 39, 62, 1);
    width: 180px;
    padding: 16px;
    box-sizing: border-box;
    margin-right: 33px;
    margin-bottom: 20px;
    .icons {
      padding-bottom: 16px;
      box-shadow: 0 1px 0 0 rgba(81, 130, 228, 0.1);
      img {
        width: 148px;
        height: auto;
      }
    }
    .block-name {
      margin: 0;
      color: #fff;
      margin-top: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 14px;
    }
    .block-desc {
      margin: 0;
      margin-top: 4px;
      font-size: 12px;
    }
    .hovers {
      display: none;
      position: absolute;
      background: rgba(36, 39, 62, 0.8);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3),
        0 16px 24px 0 rgba(0, 0, 0, 0.3);
      width: 180px;
      top: 0;
      left: 0;
      bottom: 0;
      text-align: center;
      cursor: pointer;
      .iconfont {
        position: relative;
        display: inline-block;
        font-size: 60px;
        top: 50%;
        margin-top: -35px;
      }
    }
  }
  .items:hover {
    .hovers {
      display: block;
    }
  }
}
</style>
