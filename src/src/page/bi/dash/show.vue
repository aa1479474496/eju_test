<template>
  <div class="dash-show-fullscreen">
    <dashMain></dashMain>
  </div>
</template>

<script>
import dashMain from '@/components/dash/com/dashMain';
import '@/style/default/dashLayout';
import '@/style/theme/black/dashLayout';
export default {
  components: {
    dashMain
  },
  watch:{
    '$route'(){
      document.getElementsByClassName('protal-main-content')[0].scrollTop = 0;
    }
  }
};
</script>
