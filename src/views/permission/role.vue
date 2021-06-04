<template>
  <div class="container">
    <div>
      <el-button @click="click" style="margin-left: 5px">全屏</el-button>
    </div>
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


    import echarts from 'echarts'

    export default {
        data() {
            return {
                myChart: null,
            }
        },

        created() {

        },
        mounted() {
          this.init()
        },
        methods: {
            init() {
                this.myChart = echarts.init(document.getElementById("chartTest"));
                console.log(this.myChart)
                // console.log(option)
                this.myChart.setOption({
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
  .container{
    /*height: 100%;*/
    flex: 1;
    display: flex;
    flex-direction: column;
    .main{
      /*flex: 1;*/
      height: 100%;
      overflow-y: auto;
      .frameStyle{
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
