<template>
  <div class='chart-container'>
    <chart height='100%' width='100% ' :onlineInfo='onlineDate'></chart>
  </div>
</template>

<script>
//  import Chart from '@/components/Charts/mixChart'
  import {onlineInfo} from '@/api/statistics'
  import {parseTime} from '@/utils/index'


  import Chart from '@/components/Charts/lineMarker'



  export default {
    name: 'lineChart',
    components: {Chart},


    data() {

      return {
        onlineDate: {
          xName:[],
          d1: [],
          d2: []
        }


      }
    },


    methods: {


      getOnlineInfo(){


        const data = []
        for (let i = 0; i < 24; i++) {
          data.push(i + 'hour')
//          this.$set(this.onlineDate.d1,i,0)
        }
        this.onlineDate.xName = data;

        var date = parseTime(new Date(), '{y}-{m}-{d}')
        date = '2018-06-12'




        onlineInfo(date).then(response=>{

          var d = JSON.parse(response.data);
          var online = d.onlineData.info;
            for(var hour in online) {
              var hi = parseInt(hour)
              this.$set(this.onlineDate.d1,hi,online[hi].user)
              this.$set(this.onlineDate.d2,hi,online[hi].room)
              console.log(this.onlineDate.d1)
            }
        });

        console.log(this.onlineDate.d1)

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

