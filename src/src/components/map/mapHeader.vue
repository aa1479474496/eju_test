<template>
      <div class="g_map_header"> 
        <router-link class="h_name" :to="sUrl">
          <div class="icon" :class="icon"></div>
          <div class="font">{{headerTitle}}</div>
        </router-link>
        <div class="user">
          <div class="h_img"><img :src="userObj.img"></div>
          <span class="s_down el-icon-arrow-down"></span>
        </div>
      </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  props:{
    headerTitle:{
      type:String,
      default:"地产云图"
    },
    icon:{
      type:String,
      default:"yunicon"
    },
    sUrl:{
      type:String,
      default:"/"
    },
    userObj:{
      type:Object,
      default(){
        return {
          img:"/static/man.png",
          username:"admin"
        }
      }
    }
  }
};
</script>
