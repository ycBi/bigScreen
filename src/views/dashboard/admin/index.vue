<template>
  <div class="dashboard-style">
    <div id="chartTest"class="chart-style" allowfullscreen></div>
  </div>
</template>

<script>
  import screenfull from 'screenfull'
  import Bus from '@/api/bus.js'
  import echarts from 'echarts'

  export default {
    name: 'DashboardAdmin',
    data() {
      return {
        isFullscreen: false,
        myChart: null
      }
    },
    mounted() {
      this.loadData()
      this.init()
      // 用$on监听bus事件并接受数据
      // Bus.$on('dashboard', (data) => {
      //   console.log("home"+data)
      //   this.click()
      // })
    },
    created() {
    },
    methods: {
      loadData() {
        this.myChart = echarts.init(document.getElementById('chartTest'))
        console.log("chart load data"+this.myChart)
        // console.log(option)
        this.myChart.setOption({
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }]
        })
      },
      click() {
        const element = document.getElementById('chartTest')
        console.log("chart screen"+element)
        if (!screenfull.enabled) {
          this.$message({
            message: 'you browser can not work',
            type: 'warning'
          })
          return false
        }
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
  .dashboard-style {
    background-color: red !important;
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    /*flex: 1;*/
    .chart-style{
      width: 100%;
      height:100%;
      background-color: #ffffff;
      border: 1px solid #ccc;
    }
  }

  /*::v-deep .dashboard-container{*/
  /*  width: 1000px;*/
  /*  border: 1px solid #000;*/
  /*}*/
</style>
