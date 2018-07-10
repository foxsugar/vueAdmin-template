<template>
  <div>
    <br>

    <div class="filter-container" style="margin-left: 35px">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="用户名"
                v-model="userId">
      </el-input>
      &nbsp;
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button type="primary" @click="handleTimerFilter">高级查询</el-button>
      <br>
      <br>

    </div>

    <el-dialog
      title="赠送房卡"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center>
      <el-input v-model="presentMoney" placeholder="请输入赠送房卡数"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doCharge">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="高级搜索"
      :visible.sync="timerDialogVisible"
      width="40%"
      center>
      <div class="block">
        <div style="padding-bottom: 10px">
          创建时间:
        </div>
        <el-date-picker
          v-model="valueReg"
          value-format="yyyy-MM-dd"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
      </div>
      <br>
      <!--<div class="block">-->
        <!--<div style="padding-bottom: 10px">-->
          <!--按最近登录时间:-->
        <!--</div>-->
        <!--<el-date-picker-->
          <!--v-model="valueLog"-->
          <!--value-format="yyyy-MM-dd"-->
          <!--type="daterange"-->
          <!--align="right"-->
          <!--unlink-panels-->
          <!--range-separator="-"-->
          <!--start-placeholder="开始日期"-->
          <!--end-placeholder="结束日期"-->
          <!--:picker-options="pickerOptions2">-->
        <!--</el-date-picker>-->
      <!--</div>-->
      <span slot="footer" class="dialog-footer">
    <el-button @click="doCancel">取 消</el-button>
    <el-button type="primary"@click="doSearch">确 定</el-button>

  </span>
    </el-dialog>

    <div style="margin-left: 35px; width: 90%">
      <el-table
        :data="tableData"
        :stripe="true"
        :border="true"
        :fit="true"
        :align="center"
        :header-align="center"
        :show-summary="false"
        :highlight-current-row="true"
        :empty-text="暂无数据"
        style="width: 100%"
        height="450">
        <el-table-column
          prop="orderId"
          label="订单ID"
          width="220">
        </el-table-column>

        <el-table-column
          prop="userid"
          label="用户ID"
          width="120">
        </el-table-column>

        <el-table-column
          prop="username"
          label="用户名称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="createtime"
          label="创建时间"
          width="200">
        </el-table-column>

        <el-table-column
          prop="callbacktime"
          label="结束时间"
          width="200">
        </el-table-column>

        <el-table-column
          prop="money"
          label="充值数值"
          :formatter="moneyFormat"
          width="120">
        </el-table-column>

        <el-table-column
          prop="chargeType"
          label="充值类型"
          :formatter="stateFormat"
          width="120">
        </el-table-column>

        <el-table-column
          prop="recharge_source"
          label="充值来源"
          :formatter="sourceFormat"
          width="120">
        </el-table-column>



        <el-table-column
          prop="status"
          label="订单状态"
          :formatter="statusF"
          width="120">
        </el-table-column>

      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[20]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { fetchAllPlayers, fetchPlayer, doCharge, doSearchTime, roleInfo, toAgent, toPartner, toUser} from '../../api/roleAdmin'
  import {findCharges, findCharge, chargeTimeSearch} from "../../api/charges";

  export default {
    methods: {
      fetchAll() {
        findCharges(this.listQuery.page).then(response => {
          console.log(response)
          this.tableData = response.data.list
          this.total = response.data.total
        })
      },
      stateFormat(row, column) {
        if (row.chargeType === 0) {
          return '房卡充值'
        } else if (row.chargeType === 1) {
          return '金币充值'
        }else {
          return ""
        }
      },
      sourceFormat(row, column) {
        // 1 微信  2 支付宝  3 分享赠送  4 充值卡  5绑定赠送  11.提现
        if (row.recharge_source === '0') {
          return 'o'
        } else if (row.recharge_source === '1') {
          return '微信'
        }else if (row.recharge_source === '2') {
          return "支付宝"
        }else if (row.recharge_source === '2') {
          return "分享赠送"
        }else if (row.recharge_source === '4') {
          return "充值卡"
        }else if (row.recharge_source === '5') {
          return "绑定赠送"
        }else if (row.recharge_source === '11') {
          return "提现"
        }else if (row.recharge_source === '7') {
          return "why?"
        }
        return ''
      },
      moneyFormat(row, column){
        return "￥" + row.money;
      },
      statusF(row, col) {
        if (row.status == 0){
          return "未完成"
        } else if (row.status == 1){
          return "已支付"
        }
        return ""
      },
      fetchOne() {
      },
      handleFilter() {
        if (this.searchMode === 1) {
          this.searchMode = 0
          this.listQuery.page = 0
        }
        findCharge(this.userId).then(response => {
          console.log(response)
          this.tableData = response.data.list
          this.total = response.data.total
        })
      },
      handleTimerFilter() {
        // doSearchTime(this.valueReg, this.valueLog, this.curPage).then(response => {
        //   console.log(response)
        //   this.tableData = response.data.list
        //   this.total = response.data.total
        // })
        // doTimeSearch(this.valueReg, this.valueLog).then(response => {
        //   // this.tableData.forEach(td => {
        //   //   if (td.id === this.currentId) {
        //   //     td.money = response.data
        //   //   }
        //   //   this.$message({
        //   //     message: '',
        //   //     type: 'success'
        //   //   })
        //   // })
        // })
        this.timerDialogVisible = true
      },
      doChangeRel(){
        this.detailVisible = false
        if (this.radio == '1'){
          toUser(this.currentId).then(response => {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          })
        }else if (this.radio == '2'){
          toAgent(this.currentId).then(response => {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          })
        } else if (this.radio == '3') {
          toPartner(this.currentId).then(response => {
            this.$message({
              message: '设置成功',
              type: 'success'
            })
          })
        }
      },
      doCharge() {
        doCharge(this.currentId, this.presentMoney).then(response => {
          this.tableData.forEach(td => {
            if (td.id === this.currentId) {

              var type = response.data.type
              if (type == '1'){
                td.money = response.data.money + td.money
              }else{
                td.gold += response.data.money + td.gold
              }

            }
            this.$message({
              message: '充值成功',
              type: 'success'
            })
          })
        })
        this.dialogVisible = false
        this.presentMoney = 0
      },
      doSearch() {
        this.timerDialogVisible = false
        // this.curPage = 0
        if (this.searchMode === 0) {
          this.searchMode = 1
          this.listQuery.page = 0
        }
        chargeTimeSearch(this.valueReg + "", this.listQuery.page).then(response => {
          console.log(response)
          this.tableData = response.data.list
          this.total = response.data.total
        })
      },
      doCancel() {
        // this.valueReg = undefined
        // this.valueLog = undefined
        this.timerDialogVisible = false
      },
      detailInfo(scope) {
        this.detailVisible = true
        roleInfo(scope.row.id).then(response => {
          console.log(response)

          this.radio = response.data + ''
          this.detailVisible = true
          this.currentId = scope.row.id
          // alert(this.radio + '')

        })
      },
      awardRoomCard(scope) {
        this.dialogVisible = true
        this.currentId = scope.row.id
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        // this.fetchAll()
        if (this.searchMode === 0) {
          this.fetchAll()
        } else {
          this.doSearch()
        }
      }
    },
    created() {
      this.fetchAll()
    },
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        tableData: [],
        // 按照注册时间
        valueReg: undefined,
        // 按照登录时间
        valueLog: undefined,
        // searchModel = 0按照正常模式搜索searchMode = 1按照时间模式搜索
        searchMode: 0,
        userId: 0,
        total: 0,
        money: 0,
        presentMoney: 0,
        currentId: 0,
        dialogVisible: false,
        timerDialogVisible: false,
        detailVisible: false,
        radio: "1",
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id',
          id: undefined,
          account: '',
          password: '',
          username: '',
          ipConfig: '',
          money: 0,
          rebate: '',
          gold: '',
          registDate: '',
          lastLoginDate: ''
        }
      }
    }
  }
</script>

<style scoped>
  .block{
    text-align: center;
  }
</style>
