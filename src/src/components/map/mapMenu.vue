<template>
      <div class="g_map_menuWrap"> 
        <div class="menu">
          <div class="navli" v-for="(item,index) in menuData" :key="index">
            <label class="title" :for="'nav_'+index">
              <span class="icon" :class="item.sIcon"></span>
              <span>{{item.sName}}</span>
            </label>
            <input type="checkbox" class="checkinput" :id="'nav_'+index">
            <div class="ulinfo" @click="setParentsClass">
               <router-link  class="slink" v-for="(appm,ids) in item.data" :key="ids" :to="appm.sUrl">{{appm.sName}}</router-link>
            </div>
            <span class="rightrow el-icon-caret-bottom"></span>
          </div>
        </div>
      </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {
    //根据当前路由设置父级选中颜色
    this.setParentsClass();
  },
  props: {
    menuData: {
      type: Array,
      default() {
        return [
          {
            sIcon: "map",
            sName: "城市进入",
            data: [
              {
                sName: "全国城市分析",
                sUrl: "/map/city"
              }
            ]
          },
          {
            sIcon: "location",
            sName: "板块进入",
            data: [
              {
                sName: "板块分析",
                sUrl: "/map/block"
              }
            ]
          },
          {
            sIcon: "block",
            sName: "土地分析",
            data: [
              {
                sName: "地块分析",
                sUrl: "/map/land"
              }
            ]
          }
        ];
      }
    }
  },
  methods: {
    setParentsClass() {
      setTimeout(() => {
        let sclass = document.getElementsByClassName("slink");
        for (let i = 0; i < sclass.length; i++) {
          if (sclass[i].classList.contains("current")) {
            sclass[i].parentNode.parentNode.classList.add("current");
          } else {
            sclass[i].parentNode.parentNode.classList.remove("current");
          }
        }
      }, 320);
    }
  },
  watch: {}
};
</script>