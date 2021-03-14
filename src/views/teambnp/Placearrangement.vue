<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            ตารางงานของคุณ
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <!-- ปฎิทิน -->
    <v-row>
      <v-row>
      <v-col sm="3" cols="12">
      <v-menu
        ref="menu"
        class="menupick"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        offset-y
        min-width="auto"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="dateRangeText"
            label="ค้นหาวันที่มีงาน"
            prepend-icon="mdi-calendar"
            dense
            solo
            outlined
            readonly
            clearable
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-row cols="12" sm="12">
          <v-col>
            <v-date-picker
              v-model="dates"
              locale="th"
              color="yellow darken-3"
              range
              no-title
              scrollable
            >
              <v-col>
                <v-row justify="center">
                  <v-col cols="12" sm="12">
                    <v-btn
                      color="#29CC97"
                      block
                      large
                      rounded
                      small
                      @click="$refs.menu.save(dates); BetweenDate()"
                    >
                      ตกลง
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" sm="12">
                    <v-btn
                      block
                      large
                      rounded
                      outlined
                      small
                      color="warning"
                      @click="menu = false"
                    >
                      ปิด
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-date-picker>
          </v-col>
        </v-row>
      </v-menu>
    </v-col>
    </v-row>
      <v-btn
        class="mx-10"
        color="#C4C4C4"
        @click="$router.push({ name: 'menuTeambnp_eapa' })"
        rounded
      >
        <span class="white--text">ย้อนกลับ</span></v-btn>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- รายชื่อที่ออกงาน -->
        <v-card>
          <v-data-table
            :search="search"
            :headers="headers_table_placearrangement"
            :items="table_placearrangement_item"
            class="elevation-1"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span class="header-table-title">รายชื่อที่ออกงาน</span></v-toolbar-title>
                <v-toolbar-title><span class="order">{{ total }}</span></v-toolbar-title>
                <v-spacer></v-spacer>
              <!--   <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="ค้นหาชื่อลูกค้าบุคคล/บริษัท"
                  single-line
                  hide-details
                ></v-text-field> -->
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  {{ item.team_code }}
                </td>
                <td>
                  {{ item.team_name }}
                </td>
                <td>
                  {{ item.address }}
                </td>
                <td>
                  {{ item.event_date }}<br />
                  <span class="quotation-font-color">{{item.event_date_datetime}}</span>
                </td>
                <td>
                  {{ item.progress }}
                </td>
                <td>
                  <div v-if="item.progress_status == 0">
                    <v-btn outlined rounded  @click="updatejobstatus(item)">
                        <span class="#606771--text">อัพเดทสถานะงาน</span>
                    </v-btn>
                 </div>
                  <div v-if="item.progress_status == 1">
                    <v-btn  rounded  color="#E4E4E4" @click="updatejobstatus(item)">
                        <span class="#606771--text">กำลังดำเนินงาน</span>
                    </v-btn>
                  </div>
                  <div v-if="item.progress_status == 2">
                    <v-btn  rounded color="#C4C4C4" @click="updatejobstatus(item)">
                        <span class="#606771--text">เสร็จสมบูรณ์</span>
                    </v-btn>
                  </div>
                </td>
                <td>
                  <!-- <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn> -->
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Placearrangement",
  mounted() {
    this.loadPlacearrangement();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path
    });
  },
  data: () => ({
    dates: [],
    menu: false,
    search: "",
    total: null,
    table_placearrangement_item: [],
    headers_table_placearrangement: [
      { text: "รหัสทีม",value: "team_code", sortable: false, align: "start"},
      { text: "ชื่อทีม",value: "team_name",sortable: false, align: "start"},
      { text: "สถานที่จัดงาน", value: "address", sortable: false, align: "start" },
      { text: "วันเวลานัดดูสถานที่", value: "area_viewing_date", sortable: false,  align: "start" },
      { text: "ความคืบหน้างาน", value: "progress", sortable: false,  align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ]
  }),

    computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },

  methods: {
    async loadPlacearrangement() {
      let Datemoment ={ startdate:"" , enddate:"" }
      let result = await api.TeamSetup(Datemoment);
      this.table_placearrangement_item = result.data.result;
      this.total = result.data.total;
    },

    async BetweenDate(){
      let Datemoment ={ startdate:this.dates[0] , enddate:this.dates[1] }
      let result = await api.TeamSetup(Datemoment);
      //console.log('ช่วงเวลา',result);
      if(result.data.response=="OK"){
      this.table_placearrangement_item = [];
      this.table_placearrangement_item = result.data.result;
      this.total = result.data.total;
      }else{
             this.$swal.fire(
              "ไม่พบช่วงเวลาดังกล่าว",
              `กรุณาค้นหาช่วงเวลาใหม่อีกครั้ง ${result.data.response} ${result.data.result} `,
              "error"
            );
      }
    },

      async updatejobstatus(item) {
      //console.log(item);
      await this.$store.dispatch({
        type: "setBNPDATA",
        bnpdata: item.quotation_code
      });
      await this.$router.push({ name: "menuJobPlacearrangement" });
    },
  }
};
</script>

<style scoped>

</style>
