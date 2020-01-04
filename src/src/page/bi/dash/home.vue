<template>  
  <div>
      <div class="dash-home-header">
        <homeHeader></homeHeader>
      </div>
      <div class="dash-home-nav">
        <homeLeft></homeLeft>
      </div>
      <div class="dash-home-content">
        <div class="dash-home-tsmain">
            <div class="dash-home-banner">
                <span>仪表盘</span>
                <router-link  v-if="$bi.user.hasDashAuth()" class="dash-home-editbtn" :to="`/dash/edit/${$route.params.id}`"><i class="el-icon-edit" style="padding-right:10px;"></i>设计</router-link>
                <router-link class="dash-home-showbtn" :to="`/dash/show/${$route.params.id}`"><i class="el-icon-rank" style="padding-right:10px;"></i>全屏</router-link>
            </div>
            <dashMain ref="dashmain"></dashMain>
        </div>
      </div>
  </div>
</template>

<script>
import dashMain from '@/components/dash/com/dashMain';
import homeLeft from '@/components/home/homeLeft';
import homeHeader from '@/components/home/homeHeader';
import '@/style/default/dashLayout';
import '@/style/theme/black/dashLayout';
export default {
  data() {
    return {
    };
  },
  components: {
    homeLeft,
    homeHeader,
    dashMain
  },
  methods: {
  }
};
</script>