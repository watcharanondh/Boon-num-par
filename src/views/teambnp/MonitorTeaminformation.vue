<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            รายการจัดทีม
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-col>
      <v-row  justify="end">
          <span class="mt-3 black--text justify--center ">ตารางงาน / <span>{{Quotation_Code}}</span></span>
          <v-spacer></v-spacer>
        <v-btn
          class="mx-10"
          color="#C4C4C4"
          @click="$router.push({ name: 'menuEventteaminformation' })"
          rounded
        >
          <span class="white--text">ย้อนกลับ</span></v-btn>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-card class="mx-10 pa-5 rounded-lg" outlined>
        <v-row justify="center">
          <v-col lg="9" md="9" sm="12" cols="12">
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  ข้อมูลพื้นฐาน
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="4" md="4" sm="12" cols="12">
            <!-- รหัสทีม -->
                <div>รหัสทีม</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Team_code"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- ชื่อใบกำกับภาษี -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>ชื่อใบกำกับภาษี</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Taxinvoice_name"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- สถานที่จัดงาน -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>สถานที่จัดงาน</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Venue"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  ข้อมูลวันเวลา
                </div>
              </v-col>
            </v-row>
            <v-row>
            <!-- จัดงาน -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>จัดงาน</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Organize_event"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- นัดดูสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>นัดดูสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="See_location"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- จัดสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>จัดสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Place_arrangement"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  ข้อมูลทีม
                </div>
              </v-col>
            </v-row>
            <v-row>
            <!-- ทีมดูสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>ทีมดูสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Venue_view_team"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- ทีมจัดสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>ทีมจัดสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Venue_team"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "MonitorTeaminformation",
  async mounted() {
    this.londDataTeaminformation();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },

  data: () => ({
    Quotation_Code:null,
    Team_code: null,
    Taxinvoice_name: null,
    Venue: null,
    Organize_event: null,
    Organize_event_datetime:null,
    See_location: null,
    See_location_datetime: null,
    Place_arrangement: null,
    Venue_view_team: null,
    Venue_team: null,
  }),

  methods: {
    async londDataTeaminformation() {
      this.Quotation_Code = this.$store.getters["BNP_DATA"].databnp;
      this.Team_code = this.$store.getters["BNP_DATA"].databnp;
      let sentQuotation_code ={quotation_code: this.Quotation_Code}
      let result = await api.List_SHIPPING_TO_SEE(sentQuotation_code);
      if (!result.data.result.length) {
          window.location.href = `${process.env.VUE_APP_SUB_PATH}/teambnp/Eventteaminformation`;
          //this.$router.push({name:'menuEventteaminformation'})
          return;
        }
      this.Taxinvoice_name=result.data.result[0].customer_tax_invoices;
      this.Venue=result.data.result[0].address;
      this.Organize_event=result.data.result[0].event_date;
      this.See_location=result.data.result[0].area_viewing_date;
      this.Place_arrangement=result.data.result[0].update;
      this.Venue_view_team=result.data.result[0].area_viewing_team;
      this.Venue_team=result.data.result[0].event_team;
    },
  },
};
</script>

<style scoped></style>
