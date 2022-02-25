<template>
  <div>
    <h3>home</h3>
    <companyGroup></companyGroup>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Api from "/@/api/home";
import companyGroup from "/@/components/companyGroup/index.vue"

</script>