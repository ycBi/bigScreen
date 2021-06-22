<script src="../../router/index.js"></script>
<template>
  <div class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>

    </transition>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  /*min-height: calc(100vh - 50px);*/
  height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  display: flex;
  background-color: #2c3e50;
  /*overflow: hidden;*/


}
::v-deep .dashboard-container{
  width: 100%;
  height: 100%;
  /*border: 1px solid #000;*/
}
</style>
