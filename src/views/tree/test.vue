<template>
  <div id="app">
    <!--创建一个echarts的容器-->
    <div id="echartContainer" style="width:500px; height:500px"></div>
  </div>
</template>

<script>
  var echarts = require('echarts')
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },

    mounted() {
// 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('echartContainer'));
// 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    },

    data() {
      return {
        filterText: '',
        data2: [{
          id: 1,
          label: 'Level one 1',
          children: [{
            id: 4,
            label: 'Level two 1-1',
            children: [{
              id: 9,
              label: 'Level three 1-1-1'
            }, {
              id: 10,
              label: 'Level three 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: 'Level one 2',
          children: [{
            id: 5,
            label: 'Level two 2-1'
          }, {
            id: 6,
            label: 'Level two 2-2'
          }]
        }, {
          id: 3,
          label: 'Level one 3',
          children: [{
            id: 7,
            label: 'Level two 3-1'
          }, {
            id: 8,
            label: 'Level two 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    }
  }
</script>
