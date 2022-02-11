<template>
  <div>
    <h3>home</h3>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
// import homeApi from "../../api/home";
import homeApi from "@/api/home";

// console.log("homeApi:", homeApi);

onMounted(async () => {
  await getList();
});

async function getList() {
  let res = await homeApi.getHouseStockRank();
  console.log("res:", res);
}
</script>