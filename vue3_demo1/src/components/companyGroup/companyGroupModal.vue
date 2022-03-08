<template>
  <div>modal</div>
  <div>{{groupPro.renderText}}</div>
</template>

<script lang="ts">
import {
  defineComponent,
  inject,
  reactive,
  ref,
  computed,
  onMounted,
} from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "companyGroupModal",

  setup(props, { emit }) {
    const groupPro:any = inject("companyGroup");

    return {
      groupPro,
    };
  },
});
</script>