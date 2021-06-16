<template>
  <div>
    <svg-icon class-name="swiper-icon" icon-class="swiper" @click="dialogVisible = true"/>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span style="font-size: 20px">时间单位为：ms</span>
      <el-input
        v-model="carouselTime"
        placeholder="轮播时间"
        name="carouselTime"
        type="text"
        tabindex="1"
        autocomplete="on"
      />
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="enterFullScreen">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Bus from '@/api/bus.js'

  export default {
    name: 'HeaderSwiper',

    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      },
      routes() {
        return this.$store.state.permission.routes
      }
    },
    data() {
      return {
        dialogVisible: false,
        carouselTime: 1000
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      enterFullScreen() {
        this.dialogVisible = false
        this.$store.dispatch('carousel/changeSwipperStatus')
        this.$store.dispatch('carousel/changeCarouselTime',this.carouselTime)
        console.log(this.visitedViews)
        console.log(this.visitedViews.length)
      }
    }
  }
</script>

<style scoped>

</style>
