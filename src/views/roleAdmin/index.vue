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
      title="赠送房卡或金币"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      center>

      <div style="text-align: center">
        <template>
          <el-radio v-model="radio2" label="1">房卡</el-radio>
          <el-radio v-model="radio2" label="2">金币</el-radio>
        </template>
      </div>
      <br>

      <el-input v-model="presentMoney" placeholder="请输入"></el-input>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doCharge">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="详情"
      :visible.sync="detailVisible"
      width="30%"
      :before-close="handleClose"
      center>
      <!--<el-input v-model="presentMoney" placeholder="请输入赠送房卡数"></el-input>-->
      <div style="text-align: center">
        <el-radio v-model="radio" label="1">玩家</el-radio>
        <el-radio v-model="radio" label="2">代理</el-radio>
        <el-radio v-model="radio" label="3">合伙人</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="detailVisible = false">取 消</el-button>
    <el-button type="primary" @click="doChangeRel">确 定</el-button>
      </span>
    </el-dialog>

    <!--//timer-->
    <el-dialog
      title="高级搜索"
      :visible.sync="timerDialogVisible"
      width="40%"
      center>
      <div class="block">
        <div style="padding-bottom: 10px">
          按注册时间:
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
      <div class="block">
        <div style="padding-bottom: 10px">
          按最近登录时间:
        </div>
        <el-date-picker
          v-model="valueLog"
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
          prop="id"
          label="用户ID"
          width="120">
        </el-table-column>

        <el-table-column
          prop="account"
          label="用户账号"
          width="120">
        </el-table-column>

        <el-table-column
          prop="username"
          label="用户昵称"
          width="120">
        </el-table-column>

        <el-table-column
          prop="registDate"
          label="注册时间"
          width="160">
        </el-table-column>

        <el-table-column
          prop="gold"
          label="金币"
          width="120">
        </el-table-column>

        <el-table-column
          prop="money"
          label="房卡"
          width="120">
        </el-table-column>

        <el-table-column
          prop="ipConfig"
          label="登录IP"
          width="120">
        </el-table-column>

        <el-table-column
          prop="lastLoginDate"
          label="上次登录时间"
          width="160">
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="small" @click="awardRoomCard(scope)" round>赠送房卡</el-button>
            <br>
            <br>
            <el-button type="small" @click="detailInfo(scope)" round>更多操作</el-button>
          </template>
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
  import { fetchAllPlayers, fetchPlayer, doCharge, doChargeNew, doSearchTime, roleInfo, toAgent, toPartner, toUser} from '../../api/roleAdmin'
  export default {
    methods: {
      fetchAll() {
        fetchAllPlayers(this.listQuery.limit, this.listQuery.page).then(response => {
          console.log(response)
          this.tableData = response.data.list
          this.total = response.data.total
        })
      },
      fetchOne() {
      },
      handleFilter() {
        if (this.searchMode === 1) {
          this.searchMode = 0
          this.listQuery.page = 0
        }
        fetchPlayer(this.userId).then(response => {
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

        doChargeNew(this.currentId, this.presentMoney, this.radio2).then(response => {
          this.tableData.forEach(td => {
            if (td.id === this.currentId) {
              if (response.data.type == '1'){
                td.money = response.data.money + td.money
              }else {
                td.gold += response.data.money
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
        // alert(this.listQuery.page)
        // doSearch( this.valueReg + '', this.valueLog + '').then(response => {
        //   console.log(response)
        //   this.tableData = response.data.list
        //   this.total = response.data.total
        // })
        // this.valueReg = undefined
        // this.valueLog = undefined
        // alert(this.curPage)
        doSearchTime(this.valueReg + '', this.valueLog + '', this.listQuery.page).then(response => {
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
        radio2: "1",
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
        // tableData3: [{
        //   date: '2016-05-03',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-02',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-04',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-01',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-08',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-06',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-07',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-07',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-07',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }, {
        //   date: '2016-05-07',
        //   name: '王小虎',
        //   province: '上海',
        //   city: '普陀区',
        //   address: '上海市',
        //   zip: 200333
        // }]
      }
    }
  }
</script>

<style scoped>
  .block{
    text-align: center;
  }
</style>
