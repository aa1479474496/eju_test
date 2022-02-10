<template>
  <div>
    <h3>home</h3>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import homeApi from "@/api/home";

console.log("homeApi:", homeApi);

onMounted(() => {
  getList();
});

async function getList() {
  homeApi.getHouseStockRank();
}
</script>