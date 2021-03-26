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
    <v-col>
      <v-row justify="end">
        <v-btn
          color="#C4C4C4"
          @click="$router.push({ name: 'menuWorkprogressteambnp' })"
          rounded
        >
          <span class="white--text">ย้อนกลับ</span></v-btn>
      </v-row>
    </v-col>
    <br />
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- รายชื่อที่ออกงาน -->
        <v-card>
          <!-- ปฎิทิน -->

          <v-row class="mx-2">
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
                  วันเดือนปีที่เลือก
                  <v-text-field
                    v-model="dateRangeText"
                    label="ค้นหาวันที่มีงาน"
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
                              @click="
                                $refs.menu.save(dates);
                                BetweenDate();
                              "
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
            <v-col sm="3" cols="12">
              กิจกรรม
              <v-select
                v-model="activity"
                :items="activity_item"
                item-text="activityname"
                item-value="value"
                return-object
              ></v-select>
            </v-col>
          </v-row>
          <v-data-table
            :search="search"
            :headers="headers_table_JobWorkprogressteambnp"
            :items="table_JobWorkprogressteambnp_item"
            class="elevation-1"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span class="header-table-title">รายชื่องาน</span></v-toolbar-title>
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
                  {{ item.quotation_code }}
                </td>
                <td>
                  {{ item.customer_tax_invoices }}<br/>
                  <span class="quotation-font-color">{{
                    item.update
                  }}</span>
                </td>
                <td>
                  {{ item.area_viewing_date }}<br/>
                <span class="quotation-font-color">{{
                    item.area_viewing_date_datetime
                  }}</span>
                </td>
                <td>
                  {{ item.area_viewing_team }}<br />
                  <span class="quotation-font-color">{{
                    item.area_viewing_date_datetime
                  }}</span>
                </td>
                <td>
                  {{ item.event_date }}<br/>
                  <span class="quotation-font-color">{{
                    item.event_date_datetime
                  }}</span>
                </td>
                  <td>
                  {{ item.event_team }}<br/>
                  <span class="quotation-font-color">{{
                    item.event_driver
                  }}</span>
                </td>
                  <td>
                  {{ item.progress_status }}
                </td>
                <td>
                    <v-btn 
                      @click="MoniterJobWorkprogressteambnp(item)"
                      fab
                      icon
                      outlined
                      small
                    >
                      <v-icon>visibility</v-icon>
                    </v-btn>
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
  name: "JobWorkprogressteambnp",
  mounted() {
    this.loadJobWorkprogressteambnp();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },
  data: () => ({
    dates: [],
    menu: false,
    search: "",
    activity:1,
    activity_item:[{activityname:'นัดดูสถานที่',value:1},{activityname:'จัดสถานที่',value:2}],
    typeID:null,
    total: null,
    table_JobWorkprogressteambnp_item: [],
    headers_table_JobWorkprogressteambnp: [
      { text: "รหัสทีม", value: "quotation_code", sortable: false, align: "start" },
      { text: "ชื่อออกใบกำกับภาษี", value: "customer_tax_invoices", sortable: false, align: "start" },
      { text: "วันเวลานัดดูสถานที่", value: "area_viewing_date", sortable: false, align: "start",},
      { text: "ทีมนัดดูสถานที่", value: "area_viewing_team", sortable: false, align: "start", },
      { text: "วันเวลาจัดสถานที่", value: "event_date", sortable: false, align: "start" },
      { text: "จัดสถานที่", value: "event_team", sortable: false, align: "start" },
      { text: "สถานะ", value: "progress_status", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],
  }),

  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },

  methods: {
    async loadJobWorkprogressteambnp() {
      let Datemoment = { startdate: "", enddate: "",type:this.activity };
      let result = await api.getListAllTasksteambnp(Datemoment);
      this.table_JobWorkprogressteambnp_item = result.data.result;
      this.total = result.data.total;
    },

    async BetweenDate() {
      let Datemoment = { startdate: this.dates[0], enddate: this.dates[1] ,type:this.activity}
      let result = await api.getListAllTasksteambnp(Datemoment);
      //console.log('ช่วงเวลา',result);
      if (result.data.response == "OK") {
        this.table_JobWorkprogressteambnp_item = [];
        this.table_JobWorkprogressteambnp_item = result.data.result;
        this.total = result.data.total;
      } else {
        this.$swal.fire(
          "ไม่พบช่วงเวลาดังกล่าว",
          `กรุณาค้นหาช่วงเวลาใหม่อีกครั้ง ${result.data.response} ${result.data.result} `,
          "error"
        );
      }
    },

    async MoniterJobWorkprogressteambnp(item) {
      //console.log(item);
      await this.$store.dispatch({
        type: "setBNPDATA",
        bnpdata: item.quotation_code,
      });
      await this.$store.dispatch({
        type: "setBNPDATATYPEID",
        bnptypeID: item.type,
      });
      await this.$router.push({ name: "menuMonitorWorkprogressteambnp" });
    },
  },
};
</script>

<style scoped></style>
