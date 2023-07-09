<template>
  <div>
    <div>这是加法组件-----{{ $store.state.count }}+++++++++++++{{ count }}----{{ $store.getters.newCount }}</div>
    <button @click="addNum">+</button>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Addtion",
  methods: {
    // ...mapMutations(['add']),
    ...mapActions(['addSyc']),
    addNum() {
      // this.$store.commit('add', 3)
      // this.add(3)
      // this.$store.dispatch('addSyc', 3)
      this.addSyc(3)
    }
  },
  computed: {
    ...mapState(["count"]),
  },
};
</script>

<style></style>
