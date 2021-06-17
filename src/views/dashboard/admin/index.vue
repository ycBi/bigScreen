<template>
  <div class="dashboard-style">
    <h1>欢迎使用盛帆大屏展示系统</h1>
    <div style="display: block">
      <ul>
        <li>大屏介绍</li>
        <li>注意事项</li>
        <li>大屏教程</li>
        <li>1111</li>
        <li>2222</li>
      </ul>
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
