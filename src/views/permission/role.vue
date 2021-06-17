<template>
  <div class="container">
    <div class="main">
      <iframe
        id="role"
        :src=src frameborder="no"
        class="frameStyle"
        name="frameName"
        allowFullScreen
        scrolling="yes"></iframe>
    </div>
  </div>
</template>

<script>
  import screenfull from 'screenfull'
  import Bus from '@/api/bus'

  export default {
    data() {
      return {
        isFullscreen: false,
        src:''
      }
    },
    computed:{
      isSwipper() {
        return this.$store.state.carousel.isSwipper
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          console.log(route)
        },
        immediate: true
      }
    },
    mounted() {
      this.src = this.$route.meta.src
      this.init()
      // 用$on监听全屏事件并接受数据
      Bus.$on('role', (data) => {
        console.log('receive' + data)
        this.click()
      })
    },
    methods: {
      click() {
        const element = document.getElementById('role')
        console.log('111111' + element)
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
        console.log('打印前' + element)
        screenfull.toggle(element)
      },
      change() {
        this.isFullscreen = screenfull.isFullscreen
      },
      init() {
        if (screenfull.enabled) {
          screenfull.on('change', this.change)
        }
      },
      destroy() {
        if (screenfull.enabled) {
          screenfull.off('change', this.change)
          console.log('73====================退出全屏')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .container {
    /*height: 100%;*/
    flex: 1;
    display: flex;
    flex-direction: column;

    .main {
      /*flex: 1;*/
      height: 100%;
      overflow-y: auto;

      .frameStyle {
        height: 100%;
        width: 100%;
      }
    }
  }

</style>
