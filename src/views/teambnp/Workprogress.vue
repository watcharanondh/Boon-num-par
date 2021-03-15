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
    <v-row>
      <v-col>
        <v-card class="mx-10 pa-5 rounded-lg" outlined>
          <v-card width="1000" height="auto" class="mx-auto">
            <v-container>
              <v-row>
                <v-col lg="12" md="12" sm="12" cols="12">
                  <v-card class="mx-10 pa-5 rounded-lg">
                    <v-card-title>8/10</v-card-title>
                    <v-progress-linear
                      color="#2ED47A"
                      height="5"
                      v-model="workProgress"
                    ></v-progress-linear>
                    <v-card-title>วันนี้ 23 ธันวาคม , วันอาทิตย์</v-card-title>
                  </v-card>
                  <v-card class="mx-10 pa-5 rounded-lg">
                    <v-card-title> บริษัท ทวีสตูดิโอจำกัด </v-card-title>
                    <v-card-subtitle
                      >วันเดือนปี:ธันวาคม 23, 2564</v-card-subtitle
                    >
                    <v-row justify="end">
                      <v-card-text> TEAM </v-card-text>
                      <v-card-actions>
                        <v-btn color="green" class="white--text">
                          สำเร็จ
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                  </v-card>
                  <v-card class="mx-10 pa-5 rounded-lg">
                    <v-card-title> บริษัท ทวีสตูดิโอจำกัด </v-card-title>
                    <v-card-subtitle
                      >วันเดือนปี:ธันวาคม 23, 2564</v-card-subtitle
                    >
                    <v-row justify="end">
                      <v-card-actions>
                        <v-btn color="green" class="white--text">
                          สำเร็จ
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                  </v-card>
                  <v-card class="mx-10 pa-5 rounded-lg">
                    <v-card-title> บริษัท ทวีสตูดิโอจำกัด </v-card-title>
                    <v-card-subtitle
                      >วันเดือนปี:ธันวาคม 23, 2564</v-card-subtitle
                    >
                    <v-row justify="end">
                      <v-card-actions>
                        <v-btn color="green" class="white--text">
                          สำเร็จ
                        </v-btn>
                      </v-card-actions>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
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
import axios from "axios";
export default {
  data: () => ({
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
    ],
    workProgress: 0,
  }),
  mounted() {
    // console.log("test::", window.Highcharts);
    this.test();
  },
  methods: {
    async test() {
      const result = await axios.post(
        process.env.VUE_APP_NODE_URL + "/bnp/progress/listchart",
        { startdate: "", enddate: "" },
        { headers: { Authorization: `Basic BNP*1234` } }
      );
      console.log(result);
      this.workProgress = result.data.result[0].y;
      console.log(this.workProgress);
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
            data: result.data.result
          },
        ],
      });
    },
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
