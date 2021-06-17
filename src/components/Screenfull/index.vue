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
      Bus.$emit('role',this.elValue)
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
