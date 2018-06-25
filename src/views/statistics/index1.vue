<template>
  <div class='chart-container'>
    <line-chart height='100%' width='100% ' :chartData.sync='onlineInfo'></line-chart>
  </div>
</template>

<script>
//  import Chart from '@/components/Charts/mixChart'
  import {onlineInfo} from '@/api/statistics'
  import {parseTime} from '@/utils/index'


  import LineChart from '@/views/statistics/lineChart'
//  import Chart from '@/components/Charts/lineMarker'



  export default {
    name: 'lineChart',
    components: {LineChart},


    data() {

      return {
        showChart :false,
        onlineInfo: {
          xName:[],
          d1: [],
          d2: []
        }


      }
    },


    methods: {


      getOnlineInfo(){
          console.log("初始化 parent line")


        const data = []
        for (let i = 0; i < 24; i++) {
          data.push(i + 'hour')
//          this.$set(this.onlineDate.d1,i,100)
        }
        this.onlineInfo.xName = data;

        var date = parseTime(new Date(), '{y}-{m}-{d}')
        date = '2018-06-12'




        onlineInfo(date).then(response=>{

          this.showChart = true;
          var d = JSON.parse(response.data);
          var online = d.onlineData.info;
            for(var hour in online) {
              var hi = parseInt(hour)
              this.$set(this.onlineInfo.d1,hi,online[hi].user)
              this.$set(this.onlineInfo.d2,hi,online[hi].room)
//              console.log(this.onlineDate.d1)
            }
        });

//        console.log(this.onlineDate.d1)

      },


    },

    created() {
//      this.getOnlineInfo()
  },
    mounted(){
      this.getOnlineInfo()
    }


  }
</script>

<style scoped>
  .chart-container {
    position: relative;
    padding: 20px;
    width: 100%;
    height: 85vh;
  }
</style>

