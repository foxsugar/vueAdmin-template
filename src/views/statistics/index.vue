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

    <panel-group @handleSetLineChartData="handleSetLineChartData" :paneldata="panelData"></panel-group>

    <el-row style="background:#fff;padding:16px 16px 0;margin-bottom:32px;">
      <line-chart :chart_data="onlineInfo"></line-chart>
    </el-row>

    <el-row :gutter="32">
      <!--<el-col :xs="24" :sm="24" :lg="8">-->
      <!--<div class="chart-wrapper">-->
      <!--<raddar-chart ></raddar-chart>-->
      <!--</div>-->
      <!--</el-col>-->
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart :charge="chargeData"></pie-chart>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <bar-chart :chartdata="gameDistribution"></bar-chart>
        </div>
      </el-col>
    </el-row>

    <!--<el-row :gutter="8">-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">-->
    <!--<transaction-table></transaction-table>-->
    <!--</el-col>-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}" style="margin-bottom:30px;">-->
    <!--<todo-list>-->
    <!---->
    <!--</todo-list>-->
    <!--</el-col>-->
    <!--<el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 5}" style="margin-bottom:30px;" >-->
    <!--<box-card></box-card>-->
    <!--</el-col>-->
    <!--</el-row>-->

  </div>
</template>

<script>
  import PanelGroup from './components/PanelGroup'
  import LineChart from './components/LineChart'
  import RaddarChart from './components/RaddarChart'
  import PieChart from './components/PieChart'
  import BarChart from './components/BarChart'

  import {onlineInfo} from '@/api/statistics'
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
      RaddarChart,
      PieChart,
      BarChart,
//    TransactionTable,
//    TodoList,
//    BoxCard
    },
    data() {
      return {
        lineChartData: lineChartData.newVisitis,
        panelData: {
          chargeRebate: 0,
          goldIncome: 0,
          gameNum: 0,
          registerUser: 0,
          chargeIncome: 0,
          takeOutNum: 0
        },
        dateValue: null,
        onlineInfo: {
          xName: [],
          d1: [],
          d2: []
        },
        chargeData: {
          wxCard: 0,
          wxGold: 0,
          appleCard: 0,
          appleGold: 0
        },
        gameDistribution: {
          xName: [],
          d1: [],
        }
      }
    },

    mounted(){
      this.getOnlineInfo(new Date())
    },

    methods: {
      handleSetLineChartData(type) {
        this.lineChartData = lineChartData[type]
      },

      dateChange(){
        this.getOnlineInfo(this.dateValue)
      },

      getGameName(model){

        console.log("======================",model)
        let o = JSON.parse(model)
        let t = o.goldRoomType === 0 ? '房卡' : '元宝';
        return t + '|' + o.gameType + '|' + o.gameNumber + '局'
      },
      getOnlineInfo(date){
        const data = [];
        for (let i = 0; i < 24; i++) {
          data.push(i + 'hour')
        }
        //在线数据
        this.onlineInfo.xName = data;

        var dateStr = parseTime(date, '{y}-{m}-{d}');
//      date = '2018-06-12'

        onlineInfo(dateStr).then(response => {
          let key;
          this.showChart = true;
          let d = JSON.parse(response.data);
          let online = d.onlineData.info;
          for (let hour in online) {
            let hi = parseInt(hour);
            this.$set(this.onlineInfo.d1, hi, online[hi].user);
            this.$set(this.onlineInfo.d2, hi, online[hi].room);
          }

          // chargeRebate
          let goldIncome = 0;
          for (key in d.goldRoomIncomeData.info) {
            goldIncome += d.goldRoomIncomeData.info[key]
          }

          let gameNum = 0;
          console.log(d.gameNumData.info)
          this.gameDistribution.xName = []
          this.gameDistribution.d1 = []
          for (key in d.gameNumData.info) {
            gameNum += parseInt(d.gameNumData.info[key])
            let name = this.getGameName(key)
            this.gameDistribution.xName.push(name)
            this.gameDistribution.d1.push(d.gameNumData.info[key])
          }
          console.log(this.gameDistribution)

          //充值返利
          this.panelData.chargeRebate = d.chargeRebate;
          //金币收入
          this.panelData.goldIncome = parseInt(goldIncome);
          //牌局数
          this.panelData.gameNum = parseInt(gameNum);


          if (d.logInfo !== undefined) {
            this.panelData.registerUser = d.logInfo.registerUser;
//
            this.panelData.takeOutNum = d.logInfo.takeOutNum;

            let allCharge = 0;
            for (key in d.logInfo.chargeInfo) {
              allCharge += parseInt(d.logInfo.chargeInfo[key])
            }

            //总金额
            this.panelData.chargeIncome = allCharge;
            //充值分布
            this.chargeData.wxCard = d.logInfo.chargeInfo['1|0'] | 0;
            this.chargeData.wxGold = d.logInfo.chargeInfo['1|1'] | 0;
            this.chargeData.appleCard = d.logInfo.chargeInfo['8|0'] | 0;
            this.chargeData.appleGold = d.logInfo.chargeInfo['8|1'] | 0;
          } else {
            this.panelData.registerUser = 0;
            this.panelData.takeOutNum = 0;
            this.panelData.chargeIncome = 0;
            this.chargeData.wxCard = 0;
            this.chargeData.wxGold = 0;
            this.chargeData.appleCard = 0;
            this.chargeData.appleGold = 0;
          }


        });
      },
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
