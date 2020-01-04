<template>
  <div>
    <homeHeader :activeIndex="2"></homeHeader>
    <div class="table-main-wrap">
      <tableLeft :listType="listType" :statusObj="statusObj"></tableLeft>
      <tableMain :statusObj="statusObj"></tableMain>
    </div>

  </div>
</template>
<script>
import homeHeader from "@/components/home/homeHeader";
import tableLeft from "@/components/table/layout/tableLeft";
import tableMain from "@/components/table/layout/tableMain";
import "@/style/default/tableLayout";
import "@/style/theme/black/tableLayout";


export default {
  data() {
    return {
      listType:true,
      statusObj:{
        status:false,
        loading:false
      }
    };
  },
  created() {
  },
  methods: {

  },
  components: {
    homeHeader,
    tableLeft,
    tableMain
  },
  watch:{


  }
};
</script>




