<template>
  <!--  这里使用v-show把iframe位置占着，因为使用v-if会出现拿到iframe这个对象为null(按道理说在mounted中应该dom已经渲染完成，但是我还是拿不到)-->
  <div v-show="flag" class="container">
    <div id="byc" class="main">
      <!--      <div class="box1" @mouseenter="showOption" @mouseleave="hiddenOption">-->
      <div class="box1">
        <div class="box2">
          <i class="el-icon-caret-left" style="font-size:30px;margin-right: 40px" @click="previousPage"></i>
          <i :class='pauseFlag?"el-icon-video-pause":"el-icon-video-play"' style="font-size:30px"
             @click="changePauseStatus"></i>
          <i class="el-icon-caret-right" style="font-size:30px;margin-left: 40px" @click="nextPage"></i>
        </div>
      </div>
      <iframe
        id="frame"
        :src="src"
        frameborder="no"
        class="frameStyle"
        name="frameName"
        allowFullScreen
        scrolling="yes"
      />
    </div>
  </div>
</template>

<script>
  import screenfull from 'screenfull'
  // 只有活着的vue实例才可以通讯监听
  import Bus from '@/api/bus'

  export default {
    name: 'Carousel',
    data() {
      return {
        pauseFlag: false,
        flag: false, // 用于该组件的iframe是否显示
        isFullscreen: false,
        src:'',
        // isSwipper: false,
        srcList: []
        // srcList: ['http://localhost:50401/analysis/dashboard/show/03590db461799c1f107b/', 'http://localhost:50401/analysis/dashboard/show/09d756e23179a12580fb/', 'http://localhost:50401/analysis/dashboard/show/05cd39547179a1a1b489/']
      }
    },
    computed: {
      visitedViews() {
        return this.$store.state.tagsView.visitedViews
      },
      // isFullscreen() {
      //   return this.$store.state.carousel.isFull
      // },
      isSwipper: {
        get() {
          return this.$store.state.carousel.isSwipper
        },
        set() {
        }
      },
      carouselTime() {
        return this.$store.state.carousel.carouselTime
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
          console.log('carousel time ' + this.carouselTime)
          if (this.$route.meta.hasOwnProperty('src')) {
            this.src = this.$route.meta.src
          }
          let index = this.srcList.map(item => item).indexOf(this.src)
          this.goToNewPage(index, this.srcList)
        } else {
          this.flag = false
        }
      },
      visitedViews(newValue, oldValue) {
        // 监控到到点击了新的路由，visited列表中添加新的值，重新从visitedViews中获取srcList
        this.srcList.length = 0
        console.log(this.visitedViews)
        this.visitedViews.forEach((value, index, arr) => {
          console.log(value)
          if (value.meta.hasOwnProperty('src')) this.srcList.push(value.meta.src)
        })
        console.log(this.srcList)
      }
    },
    created() {
      // window.addEventListener('click', function(e) {
      //   //mousemove 只要鼠标一移动，就会触发事件
      //   //获取鼠标最新的坐标
      //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      //   console.log(e.pageY)
      //   console.log(e.pageX)
      //   console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      // })
      // window.addEventListener('click', function(e) {
      //   //mousemove 只要鼠标一移动，就会触发事件
      //   //获取鼠标最新的坐标
      //   console.log('============================================================')
      //   console.log(e.pageY)
      //   console.log(e.pageX)
      //   console.log('============================================================')
      // })
    },
    mounted() {
      if (this.$route.meta.hasOwnProperty('src')) {
        this.src = this.$route.meta.src
      }
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
        const element = document.getElementById('byc')
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
        if (this.flag && this.pauseFlag === false) {
          console.log('跳转URL界面')
          if (index < urlList.length) {
            setTimeout(() => {
              this.src = urlList[index]
              console.log(this.src)
              index++
              this.goToNewPage(index, urlList)
            }, this.carouselTime)
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
          this.$store.dispatch('carousel/changeSwipperStatus')
        }
      },
      // 全屏判断状态 取消
      checkFull() {
        // 判断浏览器是否处于全屏状态 （需要考虑兼容问题）
        // 火狐浏览器
        let isFull =
          document.mozFullScreen ||
          document.fullScreen ||
          // 谷歌浏览器及Webkit内核浏览器
          document.webkitIsFullScreen ||
          document.webkitRequestFullScreen ||
          document.mozRequestFullScreen ||
          document.msFullscreenEnabled
        if (isFull === undefined) {
          isFull = false
        }
        return isFull
      },
      /* 这个方法无法使用，因为浏览器故意不让全屏下监听ESC键的，跟网页加载时不能用程序使浏览器全屏一样的道理（可以使用screnfull插件让某个dom全屏），避免开发者恶意全屏*/
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
      previousPage() {
        console.log('前一页')
        //首先找到当前页面的src在列表的索引
        let index = this.srcList.map(item => item).indexOf(this.src)
        if (index === 0) {
          this.src = this.srcList[this.srcList.length - 1]
        } else {
          this.src = this.srcList[index - 1]
        }
      },
      nextPage() {
        console.log('后一页')
        //首先找到当前页面的src在列表的索引
        let index = this.srcList.map(item => item).indexOf(this.src)
        //如果为数组末尾
        if (index + 1 === this.srcList.length) {
          this.src = this.srcList[0]
        } else {
          this.src = this.srcList[index + 1]
        }
      },
      changePauseStatus() {
        this.pauseFlag = !this.pauseFlag
        if (this.pauseFlag === false) {
          let index = this.srcList.map(item => item).indexOf(this.src)
          this.goToNewPage(index, this.srcList)
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

    .box1 {
      width: 100%;
      height: 50px;
      position: absolute;
      /*这个border不能去，估计有border就把div在z轴方向放到iframe的前面，没有就把div放在了iframe的后面*/
      border: 0.5px solid transparent;
      /*这个z-index压根就没生效*/
      z-index: 99;
    }

    .box2 {
      display: none;
      width: 100%;
      height: 100%;
      color: deeppink;
      background-color: #0c1f48;
      text-align: center;
    }

    .box1:hover .box2 {
      display: block !important;
    }

    .main {
      /*flex: 1;*/
      height: 100%;
      overflow-y: auto;
      position: absolute;

      .frameStyle {
        height: 100%;
        width: 100%;
      }
    }
  }
</style>

