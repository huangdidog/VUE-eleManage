<template>
    <div id="chart">
        <div id="line" style="width: 90%;height:450px;"></div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/title')
require('echarts/lib/component/legend')

export default {
    name: 'chart',
    props: ['disData'],
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
  },
  mounted() {
    this.drawLine();
  },
  watch:{
    disData: function (){
        this.drawLine();
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('line'))
      // 绘制图表
      myChart.setOption({
        title : {
          text: '用户分布',
          subtext: '纯属虚构',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['北京','上海','深圳','杭州','其他']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:this.disData.beijing, name:'北京'},
              {value:this.disData.shanghai, name:'上海'},
              {value:this.disData.shenzhen, name:'深圳'},
              {value:this.disData.hangzhou, name:'杭州'},
              {value:this.disData.qita, name:'其他'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      });
    }
  }
}
</script>

<style>

</style>

