<template>
  <div>
    <h3>home</h3>
     <!-- <el-button type="primary">Offset top 120px</el-button> -->
    <!-- <el-backtop @click="toTop" /> -->
    <companyGroup @setGroupId="setGroupId" :iGroupID="iGroupID"></companyGroup>
    <!-- <div style="height: 1800px;border: 1px solid red">
        
    </div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import companyGroup from "/@/components/companyGroup/index.vue"

const iGroupID = ref<number>(0);

function toTop(event:Event) {
    // console.log('top', event.height);
}

function setGroupId(id: number) {
    iGroupID.value = id
}

</script>4o