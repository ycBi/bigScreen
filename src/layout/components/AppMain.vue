<template>
  <div>
    <navbar/>
    <div class="app-main">
      <el-tabs v-model="activeName" class="tab-style">
        <el-tab-pane label="一号大厅展示" name="first">
          <iframe
            id="first"
            src="http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/" frameborder="no"
            class="frameStyle"
            name="frameName"
            allowFullScreen
            scrolling="yes"></iframe>
        </el-tab-pane>
        <el-tab-pane label="二号大厅展示" name="second">
          <iframe
            id="second"
            src="http://localhost:50401/analysis/dashboard/show/05cd39547179a1a1b489/" frameborder="no"
            class="frameStyle"
            name="frameName"
            allowFullScreen
            scrolling="yes"></iframe>
        </el-tab-pane>
        <el-tab-pane label="三号大厅展示" name="third">
          <iframe
            id="third"
            src="http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/" frameborder="no"
            class="frameStyle"
            name="frameName"
            allowFullScreen
            scrolling="yes"></iframe>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
  import Navbar from './Navbar'
  import screenfull from 'screenfull'
  import Bus from '@/api/bus'

  export default {
    name: 'AppMain',
    components: {
      Navbar
    },
    data() {
      return {
        activeName: 'first',
        tabList: ['first', 'second', 'third']
      }
    },
    computed: {
      isFullscreen: {
        get() {
          return this.$store.state.carousel.isFull
        },
        set() {

        }
      },
      isSwipper: {
        get() {
          return this.$store.state.carousel.isSwipper
        },
        set() {
        }
      }
    },
    watch: {
      //监测到这个值变化了就触发
      isFullscreen(value) {
        if (value) {
          this.click()
        }
      },
      isSwipper(value) {
        if (value) {
          console.log('watch carousel')
          this.goToNewTab(this.tabList)
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      click() {
        const element = document.getElementById(this.activeName)
        console.log('111111' + element)
        if (!screenfull.enabled) {
          this.$message({
            message: '你的浏览器无法支持部分区域全屏',
            type: 'warning'
          })
          return false
        }
        console.log('打印前' + element)
        screenfull.toggle(element)
        this.$store.dispatch('carousel/changeScreenStatus', false)
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
      },
      goToNewTab(tabs) {
        console.log('enter')
        for (let i = 0; i <tabs.length ; i++) {
          this.activeName = tabs[i]
          console.log(this.activeName)
          this.sleep(1500)
          if (i+1 === tabs.length)
            i = 0
        }
        // console.log('1111')
        // if (index < tabs.length) {
        //   setTimeout(() => {
        //     this.activeName = tabs[index]
        //     console.log(this.activeName)
        //     index++
        //     this.goToNewTab(index, tabs)
        //   }, 1500)
        // } else {
        //   this.goToNewTab(0, tabs)
        // }
      },
      sleep(delay) {
        let start = (new Date()).getTime()
        while ((new Date()).getTime() - start < delay) {
          continue
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .app-main {
    /* 50= navbar  50  */
    /*min-height: calc(100vh - 50px);*/
    height: calc(100vh - 50px);
    width: 100%;
    position: relative;
    display: flex;
    /*overflow: hidden;*/
    .tab-style {
      width: 100%;
      height: 100%;

      .frameStyle {
        /*height: 100%;*/
        height: 1000px;
        width: 100%;
      }
    }


  }

  ::v-deep .dashboard-container {
    width: 100%;
    height: 100%;
    /*border: 1px solid #000;*/
  }
</style>
