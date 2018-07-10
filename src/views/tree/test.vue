<template>
  <div id="app">
    <!--创建一个echarts的容器-->
    <div id="echartContainer" style="width:500px; height:500px; margin-left: 30px"></div>
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
        title : {
          text: '代理关系',
          subtext: '线、节点样式'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{b}: {c}"
        },
        toolbox: {
          show : true,
          feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
          }
        },
        calculable : false,

        series : [
          {
            name:'树图',
            type:'tree',
            orient: 'horizontal',  // vertical horizontal
            rootLocation: {x: 100, y: '60%'}, // 根节点位置  {x: 'center',y: 10}
            nodePadding: 20,
            symbol: 'circle',
            symbolSize: 40,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: 'inside',
                  textStyle: {
                    color: '#cc9999',
                    fontSize: 15,
                    fontWeight:  'bolder'
                  }
                },
                lineStyle: {
                  color: '#000',
                  width: 1,
                  type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'
                }
              },
              emphasis: {
                label: {
                  show: true
                }
              }
            },
            data: [
              {
                name: '手机',
                value: 6,
                symbolSize: [110, 60],
                symbol: '',
                itemStyle: {
                  normal: {
                    label: {
                      show: true
                    }
                  }
                },
                children: [
                  {
                    name: '小米',
                    value: 4,
                    symbol: '',
                    itemStyle: {
                      normal: {
                        label: {
                          show: true
                        }
                      }
                    },
                    symbolSize: [110, 50],
                    children: [
                      {
                        name: '小米1',
                        symbol: 'circle',
                        symbolSize: [110, 50],
                        value: 4,
                        itemStyle: {
                          normal: {
                            color: '#fa6900',
                            label: {
                              show: true,
                              position: 'right'
                            },

                          },
                          emphasis: {
                            label: {
                              show: false
                            },
                            borderWidth: 0
                          }
                        }
                      },
                      {
                        name: '小米2哒哒哒哒哒哒',
                        value: 4,
                        symbol: 'circle',
                        symbolSize: [110, 50],
                        itemStyle: {
                          normal: {
                            label: {
                              show: true,
                              position: 'right',
                              formatter: "{b}"
                            },
                            color: '#fa6900',
                            borderWidth: 2,
                            borderColor: '#cc66ff'

                          },
                          emphasis: {
                            borderWidth: 0
                          }
                        }
                      },
                      {
                        name: '小米3',
                        value: 2,
                        symbol: 'circle',
                        symbolSize: [110, 50],
                        itemStyle: {
                          normal: {
                            label: {
                              position: 'right'
                            },
                            color: '#fa6900',
                            brushType: 'stroke',
                            borderWidth: 1,
                            borderColor: '#999966',
                          },
                          emphasis: {
                            borderWidth: 0
                          }
                        }
                      }
                    ]
                  },
                  {
                    name: '苹果',
                    symbol: '',
                    symbolSize: [110, 50],
                    itemStyle: {
                      normal: {
                        label: {
                          show: false
                        }

                      }
                    },
                    value: 4
                  },
                  {
                    name: '华为',
                    symbol: '',
                    symbolSize: [110, 50],
                    itemStyle: {
                      normal: {
                        label: {
                          show: false
                        }

                      }
                    },
                    value: 2
                  },
                  {
                    name: '联想',
                    symbol: '',
                    symbolSize: [110, 50],
                    itemStyle: {
                      normal: {
                        label: {
                          show: false
                        }

                      }
                    },
                    value: 2
                  }
                ]
              }
            ]
          }
        ]
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
