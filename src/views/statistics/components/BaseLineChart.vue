<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chart_data: {
      type: Object,
      xName:[],
      d1: [],
      d2: ''
    },

    linecolor:'red'

  },
  data() {
    return {
      chart: null,

    }
  },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    }

    // 监听侧边栏的变化
    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHanlder)
    }

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

    this.chart.dispose()
    this.chart = null
  },
  watch: {
    chart_data: {
      deep: true,
      handler(val) {
        this.setOptions(val.xName,val.d1,val.d2)
      }
    }
  },
  methods: {
    setOptions(xName, d1 ,d2) {
      this.chart.setOption({
        xAxis: {
          data: xName,
          boundaryGap: true,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: [d2]//曲线说明
        },
        series: [{
          name: d2, itemStyle: {
            normal: {
              color: this.linecolor,
              lineStyle: {
//                color: '#FF005A',
                width: 2
              }
            }
          },
          smooth: true,//是否平滑
          type: 'line',
          data: d1,
          animationDuration: 2800,
          animationEasing: 'cubicInOut'
        },
      ]
      })
    },
    initChart() {
        console.log(this.$el)
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chart_data.xName, this.chart_data.d1, this.chart_data.d2)
    }
  }
}
</script>
