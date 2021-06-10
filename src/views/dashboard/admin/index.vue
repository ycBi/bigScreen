<template>
  <div class="dashboard-style">
    <h1>欢迎使用盛帆大屏展示系统</h1>
  </div>
</template>

<script>
  export default {
    name: 'DashboardAdmin',
    data() {
      return {
      }
    },
    mounted() {
      this.loadData()
    },
    created() {
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .dashboard-style {
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
