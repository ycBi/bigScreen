<template>
  <div class="app-container">
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        name: 'PagePermission',
        data() {
            return{
                myChart: null,
            }
        },
        mounted(){
            let chartDom = document.getElementById('main');
            let myChart = echarts.init(chartDom);
            myChart.setOption({
                title: {
                    text: '某站点用户访问来源',
                    subtext: '纯属虚构',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            {value: 1048, name: '搜索引擎'},
                            {value: 735, name: '直接访问'},
                            {value: 580, name: '邮件营销'},
                            {value: 484, name: '联盟广告'},
                            {value: 300, name: '视频广告'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]}
            );
        },
        methods: {}
    }
</script>
