<template>
  <div>
    <svg-icon icon-class="fullscreen" @click="click" />
  </div>
</template>

<script>
import Bus from '@/api/bus.js'
export default {
  name: 'Screenfull',
  data() {
    return {
      isFullscreen: false,
      elValue: '全屏通知',
    }
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    click() {
      // Bus.$emit('page',this.elValue)
      // Bus.$emit('dashboard', this.elValue)
      // Bus.$emit('role',this.elValue)
      // Bus.$emit('directive',this.elValue)
      // Bus.$emit('full',this.elValue)
      this.$store.dispatch('carousel/changeScreenStatus',true)
    },
  }
}
</script>

<style scoped>
.screenfull-svg {
  display: inline-block;
  cursor: pointer;
  fill: #5a5e66;;
  width: 20px;
  height: 20px;
  vertical-align: 10px;
}
</style>
