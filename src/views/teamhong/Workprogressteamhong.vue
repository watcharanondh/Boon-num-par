<template>
  <v-container style="background: #e5e5e5; color: white; height: 100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">ความคืบหน้างาน</div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row justify="end">
      <v-btn
        class="mx-10"
        color="#C4C4C4"
        @click="$router.push({ name: 'menuTeambnp' })"
        rounded
      >
        <span class="white--text">ย้อนกลับ</span></v-btn
      >
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col>
        <v-card
          elevation="0"
          width="1000"
          height="auto"
          class="mx-10 pa-5 rounded-lg"
        >
          <v-container>
            <v-row>
              <v-col lg="12" md="12" sm="12" cols="12">
                <v-card elevation="0" class="mx-10 pa-5 rounded-lg">
                  <v-row>
                    <v-card-title>{{ progressingData }}</v-card-title>
                    <v-spacer></v-spacer>
                    <span class="mt-10">แสดง :</span>  
                    <v-col sm="2">
                    <v-select
                      v-model="selectdateTime"
                      :items="dateTimeitems"
                      item-text="dateTimes"
                      item-value="value"
                      v-on:change="Changetabdate"
                      return-object
                    ></v-select>
                  </v-col>
                  </v-row>
                  <v-progress-linear
                    color="#2ED47A"
                    height="10"
                    :value="workProgress"
                  ></v-progress-linear>
                  <div v-if="tabdate==1">
                  <v-date-picker
                    v-model="date"
                    full-width
                    class="mt-4"
                    landscape
                    color="orange"
                    locale="th"
                  ></v-date-picker>
                  </div>
                  <div v-if="tabdate==2">
                  <!-- <v-date-picker
                    type="month"
                    ref="picker"
                    v-model="months"
                    :max="new Date().toISOString().substr(0, 7)"
                    min="1950-01"
                    full-width
                    class="mt-4"
                    color="orange"
                    locale="th"
                    @change="Findmonth(months)"
                  ></v-date-picker> -->
                  </div>
                </v-card>
                <v-col>
                  <v-row> </v-row>
                </v-col>
                <v-col v-for="(item, i) in Data_items" :key="i" cols="12">
                  <v-card class="mx-10 pa-5 rounded-lg">
                    <v-card-title v-text="item.customer_tax_invoices"></v-card-title>
                    <v-card-subtitle v-text="item.event_date"></v-card-subtitle>
                    <v-row>
                      <v-card-subtitle class="pa-7" v-text="item.area_viewing_team"></v-card-subtitle>
                      <v-spacer></v-spacer>
                      <v-card-actions>
                        <div v-if="item.progress_status == 0">
                          <v-btn
                            v-text="item.progress_status_name"
                            color="red"
                            class="white--text"
                          ></v-btn>
                        </div>
                        <div v-if="item.progress_status == 1">
                          <v-btn
                            v-text="item.progress_status_name"
                            color="orange"
                            class="white--text"
                          ></v-btn>
                        </div>
                        <div v-if="item.progress_status == 2">
                          <v-btn
                            v-text="item.progress_status_name"
                            color="green"
                            class="white--text"
                          ></v-btn>
                        </div>
                      </v-card-actions>
                    </v-row>
                  </v-card>
                </v-col>
                <v-col>
                  <v-row justify="center">
                      <span @click=" $router.push({ name: 'menuJobWorkprogressteambnp' })" class="showmore">Show more</span>
                  </v-row>
                </v-col>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <figure class="highcharts-figure">
            <div id="container"></div>
          </figure>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  data: () => ({
    dates: ['2019-09-10', '2019-09-20'],
    months: null,
    selectdateTime:1,
    dateTimeitems:[{dateTimes:'วัน/สัปดาห์' ,value:1},{dateTimes:'เดือน' ,value:2},{dateTimes:'ปี' ,value:3}],
    tabdate:1,

    Data_items: [],
    progressingData: 0,
    workProgress: 0,
  }),
  mounted() {
    this.londWorkProgressListDoneTask();
    this.londWorkProgressListTaskChart();
  },
  //  computed: {
  //   dateRangeText() {
  //     return this.date.join(" ~ ");
  //   },
  // },
  methods: {
    async londWorkProgressListDoneTask() {
      let workProgressDATE = { startdate: "", enddate: "" };
      let result = await api.getListDoneTaskteamhong(workProgressDATE);
      if (result.data.response == "OK") {
        this.progressingData = result.data.progressing;
        this.Data_items = result.data.result;
      }
    },
    async londWorkProgressListTaskChart() {
      let workProgressDATE = { startdate: "", enddate: "" };
      let result = await api.getListTaskChartteamhong(workProgressDATE);
      console.log(result.data.result[0].y);
      if (result.data.response == "OK") {
        this.workProgress = result.data.result[0].y;
      }

      // Build the chart
      window.Highcharts.chart("container", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
          width: 540,
        },
        title: {
          text: "งานทั้งหมด",
          align: "left",
        },
        subtitle: {
          text: this.workProgress.toFixed(0) + "%",
          style: {
            color: "#2ED47A",
            fontSize: "90px",
          },
          align: "center",
          verticalAlign: "middle",
          floating: true,
          y: 100,
          x: -50,
        },
        legend: {
          layout: "vertical",
          align: "right",
          verticalAlign: "middle",
          itemMarginTop: 10,
          itemMarginBottom: 10,
          // borderWidth:1,
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: false,
            },
            showInLegend: true,
            startAngle: -130,
          },
        },
        series: [
          {
            name: "Progress",
            colorByPoint: true,
            innerSize: "93%",
            data: result.data.result,
          },
        ],
      });
    },
    Changetabdate(){
        this.tabdate = this.selectdateTime.value;
        console.log('tap',this.tabdate);
    },
    // Finddayweek() {
    //       console.log(this.date);
    // },
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  height: 100%;
}
.highcharts-container {
  position: absolute !important;
}
.highcharts-figure,
.highcharts-data-table table {
  min-width: 320px;
  max-width: 660px;
}
.highcharts-credits {
  display: none;
}
.highcharts-exporting-group {
  display: none;
}
.highcharts-a11y-proxy-container {
  display: none;
}
.highcharts-data-table table {
  font-family: Verdana, sans-serif;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  margin: 10px auto;
  text-align: center;
  width: 100%;
  max-width: 500px;
}
.highcharts-data-table caption {
  padding: 1em 0;
  font-size: 1.2em;
  color: #555;
}
.highcharts-data-table th {
  font-weight: 600;
  padding: 0.5em;
}
.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
  padding: 0.5em;
}
.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
  background: #f8f8f8;
}
.highcharts-data-table tr:hover {
  background: #f1f7ff;
}
</style>
