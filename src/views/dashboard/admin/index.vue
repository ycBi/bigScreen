<template>
  <div class="dashboard-style">
    <h1>欢迎使用盛帆大屏展示系统</h1>
    <div style="display: block">
      <i class="el-icon-edit"></i>
      <i class="el-icon-share"></i>
      <i class="el-icon-delete"></i>
      <i>111</i>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DashboardAdmin',
    data() {
      return {
        carouselOption: true
      }
    },
    mounted() {
    },
    created() {
      // document.addEventListener('mousemove',function (e) {
      //   //mousemove 只要鼠标一移动，就会触发事件
      //   //获取鼠标最新的坐标
      //   console.log(e.pageY)
      //   console.log(e.pageX);
      //   console.log('================================================================')
      // })
    },
    methods: {
      showOption() {
        console.log('enter')
      },
      hiddenOption() {
        console.log('leave')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .dashboard-style {
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
  }
</style>
