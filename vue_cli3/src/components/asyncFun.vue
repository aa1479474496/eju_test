<template>
  <div>async --> {{status}}</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      status: state => state.status
    })
  },

  methods: {
    ...mapActions({
      setStatus: "setStatus"
    })
  },

  mounted() {
    if (!this.status.length) {
      setTimeout(() => {
        this.setStatus([1, 2]);
      }, 2000);
    }
  }
};
</script>