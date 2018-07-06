<template>
  <div class="dashboard-editor-container">
    <!--<github-corner></github-corner>-->

    <div class="block">
      <span class="demonstration">选择日期</span>
      <el-date-picker
        v-model="dateValue"
        type="date"
        placeholder="选择日期" @change="dateChange">
      </el-date-picker>
    </div>

    <!--<panel-group @handleSetLineChartData="handleSetLineChartData" :paneldata="panelData"></panel-group>-->

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart_data="onlineInfo"></line-chart>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart_data="chargeData" ></line-chart>
    </el-row>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart_data="newPlayerData" ></line-chart>
    </el-row>



  </div>
</template>

<script>
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/BaseLineChart'
  //  import RaddarChart from './components/RaddarChart'
  import PieChart from './components/PieChart'
  import BarChart from './components/BarChart'

  import {onlineInfo, getLogByDates} from '@/api/statistics'
  import {parseTime} from '@/utils/index'
  //import TransactionTable from './components/TransactionTable'
  //import TodoList from './components/TodoList'
  //import BoxCard from './components/BoxCard'

  const lineChartData = {
    newVisitis: {
      expectedData: [100, 120, 161, 134, 105, 160, 165],
      actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
      expectedData: [200, 192, 120, 144, 160, 130, 140],
      actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
      expectedData: [80, 100, 121, 104, 105, 90, 100],
      actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
      expectedData: [130, 140, 141, 142, 145, 150, 160],
      actualData: [120, 82, 91, 154, 162, 140, 130]
    }
  }

  export default {
    name: 'dashboard-admin',
    components: {
      PanelGroup,
      LineChart,
//      RaddarChart,
      PieChart,
      BarChart,
//    TransactionTable,
//    TodoList,
//    BoxCard
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        dateValue: null,


        onlineInfo: {
          xName: [],
          d1: [],
          d2: '最大在线人数'
        },
        chargeData: {
          xName: [],
          d1: [],
          d2: '充值金额'
        },
        newPlayerData:{
          xName: [],
          d1: [],
          d2: '新增用户'
        },
        gameDistribution: {
          xName: [],
          d1: [],
        },
        gameData: {}
      }
    },

    mounted(){
      this.initData();
      this.getOnlineInfo(new Date())
    },

    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },

      dateChange(){
        this.getOnlineInfo(this.dateValue)
      },

      initData(){


//        this.onlineInfo = {
//          xName: [],
//          d1: [],
//          d2: ''
//        }
//        this.chargeData = {
//          xName: [],
//          d1: [],
//          d2: ''
//        }
//        this.gameDistribution = {
//          xName: [],
//          d1: [],
//        }
      },

      getMaxOnline(d){
        let online = d.onlineData.info;
        console.log("onleintdata", online)
        let result = 0;
        for (let hour in online) {
          let hi = parseInt(hour);
          let p = online[hi].user;
          if (p > result) {
            result = p;
          }
        }
        return result
      }
      ,

        getOnlineInfo(date)
        {


//          const data = [];
//          for (let i = 0; i < 24; i++) {
//            data.push(i + 'hour')
//          }
//          //在线数据
//          this.onlineInfo.xName = data;

          var dateStr = parseTime(date, '{y}-{m}-{d}');
//      date = '2018-06-12'

          getLogByDates(7).then(response => {

            let d = response.data.result;
            let xName = [];

            for (let index in d) {
              let data = d[index]
              this.onlineInfo.xName.push(data.id)
              this.onlineInfo.d1.push(this.getMaxOnline(data))
              //最高在线人数

              this.chargeData.xName.push(data.id)

              let allCharge = 0;
              for (let key in data.logInfo.chargeInfo) {
                allCharge += parseInt(data.logInfo.chargeInfo[key])
              }
              this.chargeData.d1.push(allCharge)


              this.newPlayerData.xName.push(data.id)
              this.newPlayerData.d1.push(data.logInfo.registerUser)

            }
//            this.onlineInfo.xName.push(0)
            console.log(xName)
//            xName.push()
//            console.log(response)
          })


//          onlineInfo(dateStr).then(response => {
//            let key;
//            this.showChart = true;
//            let d = JSON.parse(response.data);
//
//            if (d === undefined || d === null || JSON.stringify(d) === '{}') {
//              this.initData()
//            } else {
//
//
//              let online = d.onlineData.info;
//              console.log("onleintdata", online)
//              for (let hour in online) {
//                let hi = parseInt(hour);
//                this.$set(this.onlineInfo.d1, hi, online[hi].user);
//                this.$set(this.onlineInfo.d2, hi, online[hi].room);
//              }
//              console.log("onleintdata", this.onlineInfo)
//
//              // chargeRebate
//              let goldIncome = 0;
//              for (key in d.goldRoomIncomeData.info) {
//                goldIncome += d.goldRoomIncomeData.info[key]
//              }
//
//              let gameNum = 0;
//              console.log(d.gameNumData.info)
//              this.gameDistribution.xName = []
//              this.gameDistribution.d1 = []
//              for (key in d.gameNumData.info) {
//                gameNum += parseInt(d.gameNumData.info[key])
//                let name = this.getGameName(key)
//                this.gameDistribution.xName.push(name)
//                this.gameDistribution.d1.push(d.gameNumData.info[key])
//              }
////            console.log(this.gameDistribution)
//
//              //充值返利
//              this.panelData.chargeRebate = d.chargeRebate;
//              //金币收入
//              this.panelData.goldIncome = parseInt(goldIncome);
//              //牌局数
//              this.panelData.gameNum = parseInt(gameNum);
//
//
//              if (d.logInfo !== undefined) {
//                this.panelData.registerUser = d.logInfo.registerUser;
////
//                this.panelData.takeOutNum = d.logInfo.takeOutNum;
//
//                let allCharge = 0;
//                for (key in d.logInfo.chargeInfo) {
//                  allCharge += parseInt(d.logInfo.chargeInfo[key])
//                }
//
//                //总金额
//                this.panelData.chargeIncome = allCharge;
//                //充值分布
//                this.chargeData.wxCard = d.logInfo.chargeInfo['1|0'] | 0;
//                this.chargeData.wxGold = d.logInfo.chargeInfo['1|1'] | 0;
//                this.chargeData.appleCard = d.logInfo.chargeInfo['8|0'] | 0;
//                this.chargeData.appleGold = d.logInfo.chargeInfo['8|1'] | 0;
//              } else {
//                this.panelData.registerUser = 0;
//                this.panelData.takeOutNum = 0;
//                this.panelData.chargeIncome = 0;
//                this.chargeData.wxCard = 0;
//                this.chargeData.wxGold = 0;
//                this.chargeData.appleCard = 0;
//                this.chargeData.appleGold = 0;
//              }
//            }
//
//          });
        }
      ,
      }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
</style>
