<template>
  <div class="BI-header">
    <div class="glog"></div>
    <div class="router-group">
      <router-link to="/home" class="items" :class="{active:activeIndex==0}" @click="handleSelect">仪表盘 </router-link>
      <router-link to="/table/list" class="items" :class="{active:activeIndex==2}" @click="handleSelect">工作表 </router-link>
      <router-link to="/source/list" class="items" :class="{active:activeIndex==4}" @click="handleSelect">数据源 </router-link>
      <router-link to="/app/list" class="items" :class="{active:activeIndex==1}" @click="handleSelect">应用 </router-link>
      <router-link to="/datav/list" class="items" :class="{active:activeIndex==5}" @click="handleSelect">数据大屏 </router-link>
      <!-- <router-link to="/user/list" class="items" :class="{active:activeIndex==3}" @click="handleSelect">账号权限 </router-link> -->
    </div>
    <div class="userSet">
      <div class="users">
        <i class="bdp-icon ico-default-photo-32"></i>
        <span class="uText">{{$bi.user.info.sRealName}}</span>
        <!-- <i class="el-icon el-icon-setting"></i>
        <i class="el-icon el-icon-question"></i> -->
        <i class="iconfont icon-logout" @click.self="$bi.user.logout()"></i>
      </div>
    </div>
  </div>
</template>
<script>
import '@/style/default/homeHeader'
import '@/style/theme/black/homeHeader'
export default {
  data() {
    return {
    };
  },
  props: {
    activeIndex: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      bi.log(key, keyPath);
    }
  }
};
</script>