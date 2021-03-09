<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            ความคืบหน้างาน
          </div>
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
      <v-card class="mx-10 pa-5 rounded-lg" outlined>
        <v-card width="1000" height="auto" class="mx-auto">
          <v-container>
            <v-row>
              <v-col lg="12" md="12" sm="12" cols="12">
                <v-card class="mx-10 pa-5 rounded-lg">
                  <v-card-title>
                    บริษัท ทวีสตูดิโอจำกัด
                  </v-card-title>
                  <v-card-subtitle>วันเดือนปี:ธันวาคม 23, 2564</v-card-subtitle>
                  <v-row justify="end">
                    <v-card-text>
                      TEAM
                    </v-card-text>
                    <v-card-actions>
                      <v-btn color="green" class="white--text">
                        สำเร็จ
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-card>
                <v-card class="mx-10 pa-5 rounded-lg">
                  <v-card-title>
                    บริษัท ทวีสตูดิโอจำกัด
                  </v-card-title>
                  <v-card-subtitle>วันเดือนปี:ธันวาคม 23, 2564</v-card-subtitle>
                  <v-row justify="end">
                    <v-card-actions>
                      <v-btn color="green" class="white--text">
                        สำเร็จ
                      </v-btn>
                    </v-card-actions>
                  </v-row>
                </v-card>
                <v-card class="mx-10 pa-5 rounded-lg">
                  <v-card-title>
                    บริษัท ทวีสตูดิโอจำกัด
                  </v-card-title>
                  <v-card-subtitle>วันเดือนปี:ธันวาคม 23, 2564</v-card-subtitle>
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

      <figure class="highcharts-figure">
        <div id="container"></div>
      </figure>
    </v-row>
  </v-container>
</template>

<script>
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
  }),
  mounted() {
    // console.log("test::", window.Highcharts);
    this.test();
  },
  methods: {
    test() {
      // Build the chart
      window.Highcharts.chart("container", {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "งานทั้งหมด",
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
          },
        },
        series: [
          {
            name: "Brands",
            colorByPoint: true,
            data: [
              {
                name: "สำเร็จ",
                y: 61.41,
                sliced: true,
                selected: true,
              },
              {
                name: "ดำเนินการอยู่",
                y: 11.84,
              },
              {
                name: "ไม่สำเร็จ",
                y: 10.85,
              },
            ],
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
.highcharts-figure,
.highcharts-data-table table {
  min-width: 320px;
  max-width: 660px;
  margin: 1em auto;
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
