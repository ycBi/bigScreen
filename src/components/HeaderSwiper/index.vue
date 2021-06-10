<template>
  <div>
    <!--    <svg-icon class-name="swiper-icon" :icon-class="flag?'swiper':'pause'" @click="click"/>-->
    <!--    <svg-icon class-name="swiper-icon" icon-class="swiper" @click="click"/>-->
    <svg-icon class-name="swiper-icon" icon-class="swiper" @click="dialogVisible = true"/>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="30%"
      @close="click"
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
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
        flag: false,
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
      click() {
        this.flag = !this.flag
        console.log('head swipper: ' + this.flag)
        this.$store.dispatch('carousel/changeSwipperStatus')
        this.$store.dispatch('carousel/changeCarouselTime',this.carouselTime)
        // Bus.$emit('startSwipper',this.flag)
        console.log(this.visitedViews)
        console.log(this.visitedViews.length)
        // this.goToNewPage(1, this.visitedViews)
      },

      goToNewPage(index, routes) {
        if (this.flag) {
          if (index < routes.length) {
            setTimeout(() => {
              this.$router.replace({ name: routes[index].name })
              index++
              this.goToNewPage(index, routes)
            }, 1500)
          } else {
            this.goToNewPage(1, routes)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
