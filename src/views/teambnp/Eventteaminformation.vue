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
    <v-row>
      <v-col>
        <!-- ปฎิทิน -->
        <ModalCalendar/>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- รายชื่องาน -->
        <v-card>
          <v-data-table
            :search="search"
            :headers="headers_table_quotation"
            :items="table_quotation_item"
            class="elevation-1"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span class="header-table-title">รายชื่องาน</span></v-toolbar-title>
                <v-toolbar-title><span class="order">{{ total }}</span></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-divider class="mx-4" inset vertical></v-divider>
                <!-- <v-text-field
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
                <td>{{ item.quotation_code }}</td>
                <td>
                  {{ item.customer_tax_invoices }}<br />
                  <span class="quotation-font-color">update {{ item.update }}</span>
                </td>
                <td>
                  {{ item.area_viewing_date }}<br />
                  <span class="quotation-font-color">{{item.area_viewing_date_datetime}}</span>
                </td>
                <td>
                  {{ item.area_viewing_team }}<br />
                  <span class="quotation-font-color">{{item.area_viewing_driver}}</span>
                </td>
                <td>
                  {{ item.event_date }}<br />
                  <span class="quotation-font-color">{{item.event_date_datetime}}</span>
                </td>
                <td>
                  {{ item.event_team }}<br />
                  <span class="quotation-font-color">{{item.event_driver}}</span>
                </td>
                <td>
                  <br />
                  <ModalUpdateLookAppointment :quotation_code="item.quotation_code" /><br />
                  <ModalUpdateManageAppointment :quotation_code="item.quotation_code" /><br />
                </td>
                <td>
                  <v-row>
                    <!-- <v-btn  fab icon outlined small>
                      <v-icon>lock_open</v-icon>
                    </v-btn> -->
                    <v-btn
                      @click="MonitorTeaminformation(item)"
                      fab
                      icon
                      outlined
                      small
                    >
                      <v-icon>visibility</v-icon>
                    </v-btn>
                  </v-row>
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
import ModalUpdateLookAppointment from "@/components/dialog/ModalUpdateLookAppointment.vue";
import ModalUpdateManageAppointment from "@/components/dialog/ModalUpdateManageAppointment.vue";
import ModalCalendar from "@/components/dialog/ModalCalendar.vue";
import api from "@/services/api";

export default {
  name: "Eventteaminformation",
  components: {
    ModalUpdateLookAppointment,
    ModalUpdateManageAppointment,
    ModalCalendar
  },
  mounted() {
    this.loadEventteaminformation();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path
    });
  },
  data: () => ({
    search: "",
    idq: null,
    total: null,
    table_quotation_item: [],
    headers_table_quotation: [
      {
        text: "รหัสงาน",
        value: "quotation_code",
        sortable: true,
        align: "start"
      },
      {
        text: "ชื่อใบกำกับภาษี",
        value: "customer_tax_invoices",
        sortable: false,
        align: "start"
      },
      {
        text: "วันเวลานัดดูสถานที่",
        value: "area_viewing_date",
        sortable: true,
        align: "start"
      },
      {
        text: "ทีมนัดดูสถานที่",
        value: "quotation_status",
        sortable: true,
        align: "start"
      },
      { text: "วันเวลาจัดสถานที่", value: "", sortable: false, align: "start" },
      { text: "จัดสถานที่", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ]
  }),

  methods: {
    async loadEventteaminformation() {
      let result = await api.getEventteaminformation();
      this.table_quotation_item = result.data.result;
      this.total = result.data.total;
    },

    async MonitorTeaminformation(item) {
      await this.$store.dispatch({
        type: "doEditBNPID",
        BNP_ID: item.quotation_code
      });
      await this.$router.push({ name: "menuMonitorteaminformation" });
    },

    async EditQuotation(item) {
      await this.$store.dispatch({
        type: "doEditBNPID",
        BNP_ID: item.quotation_code
      });
      await this.$router.push({ name: "saleEditQuotation" });
    },
    async DeleteQuotation(item) {
      this.$swal
        .fire({
          title: `ต้องการลบใบเสนอราคานี้ใช่หรือไม่ ?`,
          showDenyButton: true,
          confirmButtonText: `ยืนยัน`,
          denyButtonText: `ยกเลิก`
        })
        .then(async result => {
          if (result.isConfirmed) {
            let delQuotations = { quotation_code: item.quotation_code };
            let resultdel = await api.delQuotation(delQuotations);
            if (resultdel.data.response == "OK") {
              this.$swal.fire("ยืนยันการลบเรียบร้อย", "", "success");
              await this.loadQuotation();
            }
          } else if (result.isDenied) {
            this.$swal.fire("ยกเลิกการลบ", "", "error");
          }
        });
    }
  }
};
</script>

<style scoped></style>
