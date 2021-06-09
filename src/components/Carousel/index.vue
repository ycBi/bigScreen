<template>
  <!--  这里使用v-show把iframe位置占着，因为使用v-if会出现拿到iframe这个对象为null(按道理说在mounted中应该dom已经渲染完成，但是我还是拿不到)-->
  <div class="container" v-show="flag">
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
    name: 'carousel',
    data() {
      return {
        flag: false,//用于该组件的iframe是否显示
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
      isSwipper: {
        get() {
          return this.$store.state.carousel.isSwipper
        },
        set() {
        }
      }
    },
    watch: {
      isSwipper(newValue, oldValue) {
        console.log('old ' + oldValue)
        console.log('new ' + newValue)
        console.log('isSwipper watch ' + this.isSwipper)
        console.log('进入 mounted函数')
        if (newValue) {
          this.flag = true
          this.click()
          this.goToNewPage(0, this.srcList)
        } else {
          this.flag = false
        }

      }
    },
    created() {
    },
    mounted() {
      document.addEventListener('fullscreenchange', this.fullScreenEsc)
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
    beforeDestroy() {
      document.removeEventListener('fullscreenchange', this.fullScreenEsc)
    },
    methods: {
      click() {
        // this.$nextTick(()=>{const element = document.getElementById('frame')})
        const element = document.getElementById('frame')
        console.log('==============================================' + element)
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
        console.log('isswipper ' + this.isSwipper)
        if (this.flag) {
          console.log('跳转URL界面')
          if (index < urlList.length) {
            setTimeout(() => {
              this.src = urlList[index]
              console.log(this.src)
              index++
              this.goToNewPage(index, urlList)
            }, 1500)
          } else {
            this.goToNewPage(0, urlList)
          }
        }
      },
      fullScreenEsc() {
        if (!this.checkFull()) {
          this.isFullscreen = false
          console.log('监听到了退出了全屏事件~~~~~~~~~~~~~~~~~~')
          this.flag = false
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
      }
      /*这个方法无法使用，因为浏览器故意不让全屏下监听ESC键的，跟网页加载时不能用程序使浏览器全屏一样的道理（可以使用screnfull插件让某个dom全屏），避免开发者恶意全屏*/
      // quit(e){
      //   console.log('是否进入quit函数')
      //   let key=e.keyCode;
      //   console.log('this key '+key)
      //   //esc的键码为27，f11的键码为122
      //   if(key===27 || key===122){
      //     console.log('退出全屏')}
      //     this.flag = false
      //     this.isSwipper = false
      // }
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

