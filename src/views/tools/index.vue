<template>
  <div id="app">
    <!--创建一个echarts的容器-->
    <!--<el-input v-model="agentId" placeholder="请输入内容"></el-input>-->
    <br>
    <div style="margin-left: 25px; padding-left: 25px">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="房间号"
                v-model="roomId">
      </el-input>
      &nbsp;&nbsp;
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">解散</el-button>
    </div>

    <br>

    <div style="margin-left: 25px; padding-left: 25px">
      <el-input @keyup.enter.native="dissByUser" style="width: 200px;" class="filter-item" placeholder="玩家id"
                v-model="userId">
      </el-input>
      &nbsp;&nbsp;
      <el-button class="filter-item" type="primary" v-waves icon="search" @click="dissByUser">根据玩家id解散房间</el-button>
    </div>
    <!--<div id="echartContainer" style="width:90%; height:500px;"></div>-->
  </div>
</template>

<script>
  import {dissolveRoom,dissolveRoomByUserId} from "../../api/gameTools";
  // import {echar}
  // var echarts = require('echarts')
  // var myChart = null

  export default {
    // watch: {
    //   filterText(val) {
    //     this.$refs.tree2.filter(val)
    //   }
    // },
    mounted() {
    },
    methods: {
      handleFilter(){
        dissolveRoom(this.roomId).then(response => {
          this.$message({
            message: '解散房间' + '(' + this.roomId + ')' + "成功" ,
            type: 'success'
          });
        })
      },

      dissByUser(){
        dissolveRoomByUserId(this.userId).then(response =>{
          this.$message({
            message: '解散房间' + "成功" ,
            type: 'success'
          });
        })
      }
    },

    data() {
      return {
        roomId:'',
        userId:''
      }
    }
  }
</script>
