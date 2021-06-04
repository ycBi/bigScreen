<template>
  <div class="app-container">
    <div id="chartTest" style="width: 600px;height:400px;"></div>
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
  .app-container {
    .roles-table {
      margin-top: 30px;
    }
  }
</style>
