<template>
  <div>
    <div>这是减法组件-----{{ $store.state.count }}========={{ count }}======{{newCount}}</div>
    <button @click="sub">-</button>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Subtraction",
  computed: {
    ...mapState(["count"]),
    ...mapGetters(['newCount'])
  },
  methods: {
    sub() {
      this.$store.commit('sub')
    }
  }
  // created() {
  //   console.log('****', ...mapState(['count']))
  // }
};
</script>

<style></style>
