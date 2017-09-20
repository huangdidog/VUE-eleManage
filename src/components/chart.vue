<template>
    <div id="chart">
        <div id="line"></div>
    </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')

require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/markPoint')
require('echarts/lib/component/tooltip')

export default {
    name: 'chart',
    props: ['sevenDate', 'sevenDay'],
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    mounted() {
        this.initData();
        console.log(this.sevenDate,this.sevenDay,123456);
    },
    watch: {
        sevenDate() {
            this.initData();
        },
        sevenDay() {
            this.initData();
        }
    },
    methods: {
        initData() {
        // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('line'));
          // 绘制图表
            myChart.setOption({
                color:['#d14a61', '#5793f3', '#675bba', '#13CE66'],
                title: {
                    text: '走势图',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['API请求量', '新注册用户', '新增订单', '新增管理员']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['bar', 'line']},
                        restore: {},
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: this.sevenDay
                },
                yAxis: [
                    {
                      type: 'value',
                      name: 'API请求量',
                      min: 0,
                      max: 200000,
                      position: 'left',
                      axisLine: {
                          lineStyle: {
                              color: '#999'
                          }
                      },
                      axisLabel: {
                          formatter: '{value}'
                      }
                    },
                    {
                      type: 'value',
                      name: '用户、订单',
                      min: 0,
                      max: 400,
                      position: 'right',
                      axisLine: {
                          lineStyle: {
                              color: '#999'
                          }
                      },
                      axisLabel: {
                          formatter: '{value}'
                      }
                    },
                ],
                series: [
                    {
                        name:'API请求量',
                        type:'line',
                        data:this.sevenDate[0],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    },
                    {
                        name:'新注册用户',
                        type:'line',
                        data:this.sevenDate[1],
                        yAxisIndex: 1,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    },
                    {
                        name:'新增订单',
                        type:'line',
                        data:this.sevenDate[2],
                        yAxisIndex: 1,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    },
                    {
                        name:'新增管理员',
                        type:'line',
                        data:this.sevenDate[3],
                        yAxisIndex: 1,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                    }
                ]
            });
        }
    }
}
</script>

<style>
#line{
    width:90%;
    height: 450px;
    margin:30px auto 0;
}
</style>

