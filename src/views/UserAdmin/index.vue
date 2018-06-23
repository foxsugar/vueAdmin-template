<template>
  <div>
    <br>
    <div style="margin-left: 35px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="">
          <el-input v-model="formInline.user" placeholder="请输入用户ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div style="width: 50%; margin-left: 35px">
      <span class="cspan">用户账号:</span>   <span>{{this.userAccount}}</span>
      <br>
      <br>
      <span class="cspan">游戏昵称:{{this.userNick}}</span>
      <br>
      <br>
      <span class="cspan">游戏昵称:{{this.userNick}}</span>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: 'zbb',
          region: 'tj'
        },
        userAccount: '123',
        userNick: '小东东'
      }
    }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 95%;
  }

  .common {
    font-size: 14px;
  }

  .cspan {
    margin-top: 10px;
    margin-bottom: 10px;
  }

</style>
