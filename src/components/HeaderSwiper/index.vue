<template>
  <div>
    <svg-icon icon-class="swiper" @click="dialogVisible = true"/>
    <el-dialog
      title="轮播时间间隔"
      :visible.sync="dialogVisible"
      width="30%"
     >
      <span style="font-size: 15px">时间单位为S：</span>
      <input v-model="carouselTime" type="number" id="interval" name="interval" list="timeOption" autocomplete="on" style="width:250px;height: 40px;margin-left: 10px">
      <datalist id="timeOption" >
        <option id="option1">30</option>
        <option id="option2">60</option>
        <option id="option3">180</option>
        <option id="option4">300</option>
        <option id="option5">600</option>
      </datalist>
<!--      <el-input-->
<!--        v-model="carouselTime"-->
<!--        placeholder="轮播时间"-->
<!--        name="carouselTime"-->
<!--        type="text"-->
<!--        tabindex="1"-->
<!--        autocomplete="on"-->
<!--      />-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="enterFullScreen">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

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
        carouselTime: 30,
      }
    },
    methods: {
      enterFullScreen() {
        this.dialogVisible = false
        this.$store.dispatch('carousel/changeSwipperStatus',true)
        this.$store.dispatch('carousel/changeCarouselTime',this.carouselTime)
      }
    }
  }
</script>

<style scoped>
  /*::v-deep .el-dialog__body{*/
  /*  background-color: #051C4E;*/
  /*}*/
  /*::v-deep .el-dialog__header {*/
  /*  background: #051C4E;*/
  /*  color: #ffffff;*/
  /*}*/
  /*::v-deep .el-dialog__footer {*/
  /*  background-color: #051C4E;*/
  /*}*/
</style>
