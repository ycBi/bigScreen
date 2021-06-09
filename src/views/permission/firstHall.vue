<template>
  <div class="container">
    <div class="main">
      <iframe
        id="frame"
        :src="src" frameborder="no"
        class="frameStyle"
        name="frameName"
        allowFullScreen
        scrolling="yes"></iframe>
    </div>
  </div>
</template>

<script>
  import screenfull from 'screenfull'
  //只有活着的vue实例才可以通讯监听
  import Bus from '@/api/bus'

  export default {
    name: 'firstHall',
    data() {
      return {
        isFullscreen: false,
        src: 'http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/',
        // isSwipper: false,
        srcList: ['http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/', 'http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/', 'http://localhost:50401/analysis/dashboard/show/05cd39547179a1a1b489/']
      }
    },
    computed: {
      // isFullscreen() {
      //   return this.$store.state.carousel.isFull
      // },
      isSwipper() {
        return this.$store.state.carousel.isSwipper
      }
    },
    watch:{
      // isSwipper(newValue,oldValue){
      //   console.log('old '+oldValue)
      //   console.log('new '+newValue)
      //   console.log('isSwipper watch '+this.isSwipper)
      //   console.log('进入 mounted函数')
      //   if (newValue) {
      //     console.log('进入 mounted函数')
      //     this.click()
      //     this.goToNewPage(0,this.srcList)
      //   }
      // }
    },
    created() {
      console.log(this.isSwipper)
      window.onresize = function () {
        if (!this.checkFull()) {
          // 退出全屏后要执行的动作
          this.isFullscreen = false
          // that.backGo()
          console.log("=========================================exit 全屏")
          // this.isSwipper= false
          // this.$router.back()
          // this.$router.go(-1)
          console.log(this.isSwipper)
          console.log(this.$router)
        }
      }
    },
    mounted() {
      // console.log('init before'+this.isFullscreen)
      // console.log('swipper status '+ this.isSwipper)
      this.init()
      // if (this.isSwipper){
      //   this.click()
      //   // this.click("isswipper role  "+data)
      // }
      // console.log('full screen statsus '+this.isFullscreen)
      // 用$on监听事件并接受数据
      // Bus.$on('role', (data) => {
      //   console.log('receive' + data)
      //   // setTimeout(this.click(), 1000)
      //   this.click()
      // })
      // })
      // Bus.$on('startSwipper', (data) => {
      //   console.log('isswipper role  ' + data)
      //   this.isSwipper = data
      //   console.log(' role swipper status 42 ' + this.isSwipper)
      //   if (this.isSwipper) {
      //     this.click()
      //     this.goToNewPage(0,this.srcList)
      //   }
      // })
      // console.log('进入 mounted函数')
      // this.click()
      // this.goToNewPage(0,this.srcList)
      // if (this.isSwipper){
        console.log('进入 mounted函数')
        // this.click()
      //   this.goToNewPage()
      // }
      // console.log("2222"+this.isFullscreen)
      //   Bus.$on('isSwipper',(data)=>{
      //     console.log("isswipper role  "+data)
      //     this.isSwipper = data
      //   })
      // console.log(" role swipper status "+this.isSwipper)
      // if (this.isSwipper&&this.isFullscreen)
      //   this.click()

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
      },
      goToNewPage(index, urlList) {
        console.log('isswipper '+this.isSwipper)
        if (this.isSwipper) {
          console.log('跳转URL界面')
          if (index < urlList.length) {
            setTimeout(() => {
              // this.$router.replace({ name: routes[index].name })
              this.src= urlList[index]
              console.log(this.src)
              index++
              this.goToNewPage(index, urlList)
            }, 1500)
          } else {
            this.goToNewPage(0, urlList)
          }
        }
      },
      //全屏判断状态 取消
      checkFull() {
        //判断浏览器是否处于全屏状态 （需要考虑兼容问题）
        //火狐浏览器
        let isFull =
          document.mozFullScreen ||
          document.fullScreen ||
          //谷歌浏览器及Webkit内核浏览器
          document.webkitIsFullScreen ||
          document.webkitRequestFullScreen ||
          document.mozRequestFullScreen ||
          document.msFullscreenEnabled
        if (isFull === undefined) {
          isFull = false
        }
        return isFull
      },

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
