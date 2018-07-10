<template>
  <div id="app">
    <!--创建一个echarts的容器-->
    <!--<el-input v-model="agentId" placeholder="请输入内容"></el-input>-->
    <br>
    <div style="margin-left: 25px; padding-left: 25px">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="代理ID"
                v-model="agentId">
      </el-input>
      &nbsp;&nbsp;
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
    </div>
    <div id="echartContainer" style="width:90%; height:500px;"></div>
  </div>
</template>

<script>
  import {delegateRel} from "../../api/tree";
  // import {echar}
  var echarts = require('echarts')
  var myChart = null

  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val)
      }
    },
    mounted() {
      this.fetchDelegates()
    },
    methods: {
      fetchDelegates() {
        delegateRel(0).then(response => {
          console.log(response)
          this.dataDict = response.data;
          console.log(this.dataDict.toString())
          // alert(this.dataDict.toString());
          // alert(this.dataDict)
          this.setupCharts(this.dataDict)
        })
      },
      handleFilter(){
        // alert('1')
        delegateRel(this.agentId).then(response => {
          console.log(response)
          this.dataDict = response.data;
          console.log(this.dataDict.toString())
          // alert(this.dataDict.toString());
          // alert(this.dataDict)
          this.setupCharts(this.dataDict)
        })
      },
      setupCharts(da){
        // alert(da.toString())

        myChart = echarts.init(document.getElementById('echartContainer'));

        myChart.clear()
        // myChart.showLoading();

        // echarts.util.each(data.children, function (datum, index) {
        //   index % 2 === 0 && (datum.collapsed = true);
        // });

        myChart.setOption({
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove'
          },
          series: [
            {
              type: 'tree',

              data: [da],

              top: '1%',
              left: '7%',
              bottom: '1%',
              right: '20%',

              symbolSize: 7,

              label: {
                normal: {
                  position: 'left',
                  verticalAlign: 'middle',
                  align: 'right',
                  fontSize: 9
                }
              },

              leaves: {
                label: {
                  normal: {
                    position: 'right',
                    verticalAlign: 'middle',
                    align: 'left'
                  }
                }
              },

              expandAndCollapse: true,
              animationDuration: 550,
              animationDurationUpdate: 750
            }
          ]
        });
      }
    },

    data() {
      return {
        filterText: '',
        agentId: '',
        counter: 0,
        dataDict: {},
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
