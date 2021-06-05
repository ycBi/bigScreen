<template>
  <div class="container">
    <div class="main">
      <iframe
        id="frame"
        src="http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/" frameborder="no"
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
        isFullscreen: false
      }
    },

    created() {

    },
    mounted() {
      this.init()
      // 用$on监听事件并接受数据
      Bus.$on('role', (data) => {
        console.log('receive' + data)
        setTimeout(this.click(), 1000)
      })
    },
    methods: {
      click() {
        const element = document.getElementById('frame')
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

    /*.main{*/
    /*  flex: 1;*/
    /*  background-color: red;*/
    /*  .frameStyle {*/
    /*    height: 90px;*/
    /*    width: 1680px;*/
    /*    margin-top: 5px;*/
    /*    margin-left: 5px;*/
    /*    overflow: Scroll;*/
    /*    overflow-y: hidden;*/
    /*    overflow-x: hidden*/
    /*  }*/
    /*}*/
  }

</style>
