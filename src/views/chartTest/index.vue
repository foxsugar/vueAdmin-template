<template>
  <div>
    <br>
    <div style="margin-left: 35px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-left: 35px; width: 90%">
      <el-table
        :data="tableData3"
        :stripe="true"
        :border="true"
        :fit="true"
        :header-align="center"
        :show-summary="true"
        :highlight-current-row="true"
        :empty-text="暂无数据"
        style="width: 100%"
        height="450">
        <el-table-column
          fixed
          prop="date"
          label="充值时间"
          width="150">
        </el-table-column>

        <el-table-column
          prop="name"
          label="订单编号"
          width="200">
        </el-table-column>

        <el-table-column
          prop="name"
          label="用户名"
          width="120">
        </el-table-column>

        <el-table-column
          prop="province"
          label="充卡类别"
          width="120">
        </el-table-column>

        <el-table-column
          prop="province"
          label="订单金额"
          width="120">
        </el-table-column>

        <el-table-column
          prop="city"
          label="支付方式"
          width="120">
        </el-table-column>

        <el-table-column
          prop="address"
          label="订单进度"
          width="120">
        </el-table-column>

      </el-table>
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市',
          zip: 200333
        }]
      }
    }
  }
</script>

<style scoped>

</style>
