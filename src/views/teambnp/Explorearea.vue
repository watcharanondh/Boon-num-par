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
    <v-row>
      <!-- ปฎิทิน -->
      <ModalCalendar />
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
            :headers="headers_table_explorearea"
            :items="table_explorearea_item"
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
                  {{ item.area_viewing_date }}<br />
                  <span class="quotation-font-color">{{item.area_viewing_date_datetime}}</span>
                </td>
                <td>
                    <v-btn
                        @click="$router.push({ name: 'menuCheckLocation' })"
                        rounded>
                        <span class="#606771--text">อัพเดทสถานะงาน</span></v-btn>
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
import ModalCalendar from "@/components/dialog/ModalCalendar.vue";
import api from "@/services/api";

export default {
  name: "Explorearea",
  components: {
    ModalCalendar
  },
  mounted() {
    this.loadExplorearea();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path
    });
  },
  data: () => ({
    search: "",
    idq: null,
    total: null,
    table_explorearea_item: [],
    headers_table_explorearea: [
      { text: "รหัสทีม",value: "team_code", sortable: true, align: "start"},
      { text: "ชื่อทีม",value: "team_name",sortable: false, align: "start"},
      { text: "สถานที่จัดงาน", value: "address", sortable: true, align: "start" },
      { text: "วันเวลานัดดูสถานที่", value: "area_viewing_date", sortable: true,  align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ]
  }),

  methods: {
    async loadExplorearea() {
      let result = await api.TeamSurvey();
      this.table_explorearea_item = result.data.result;
      this.total = result.data.total;
    },

    async MonitorTeaminformation() {
    //   await this.$store.dispatch({
    //     type: "doEditBNPID",
    //     BNP_ID: item.quotation_code
    //   });
      await this.$router.push({ name: "menuMonitorteaminformation" });
    },

  }
};
</script>

<style scoped>

</style>
