<template>
  <div class="dashboard-editor-container">
    <div id="chartTest" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>

    import echarts from 'echarts'
    export default {
        name: 'DashboardAdmin',
        data() {
            return {
                // chartDom: '',
                myChart: null,
                // option: ''
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                debugger
                this.myChart = echarts.init(document.getElementById("chartTest"));
                console.log(this.myChart)
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
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    position: relative;

    .github-corner {
      position: absolute;
      top: 0px;
      border: 0;
      right: 0;
    }

    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }

  @media (max-width: 1024px) {
    .chart-wrapper {
      padding: 8px;
    }
  }
</style>
