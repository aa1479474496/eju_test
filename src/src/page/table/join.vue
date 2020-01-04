<template>
  <div>
    <backHeader head-title="多表关联" go-back='true'></backHeader>
    <div class="table-main-wrap">
      <tableLeft :listType="listType" :statusObj="statusObj"></tableLeft>
      <joinMain :statusObj="statusObj"></joinMain>
    </div>

  </div>
</template>
<script>
import backHeader from "@/components/common/backHeader";
import tableLeft from "@/components/table/layout/tableLeft";
import joinMain from "@/components/table/layout/joinMain";
import { MessageBox } from 'element-ui';

import "@/style/default/tableLayout";
import "@/style/theme/black/tableLayout";

export default {
  data() {
    return {
      listType: false,
      statusObj:{
        status:false,
        loading:true
      }
    };
  },
  created() {

  },
  methods: {

  },
  components: {
    backHeader,
    tableLeft,
    joinMain
  },
  watch: {},
  beforeRouteLeave (to, from , next) {
    if(from.path=="/table/join"){
        MessageBox.confirm('返回之后数据会清空，请确认是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          next()
        }).catch(() => {
          next(false)
        });
    }else{
      next()
    }
  }
};
</script>
