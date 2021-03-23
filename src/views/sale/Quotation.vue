<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            ใบเสนอราคา
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col>
        <v-btn
          color="#29CC97"
          @click="$router.push({ name: 'saleCreateQuotation' })"
          rounded
        >
          <span class="white--text">สร้างใบเสนอราคา</span></v-btn
        >
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- ใบเสนอราคา -->
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
                <v-toolbar-title
                  ><span class="header-table-title"
                    >ใบเสนอราคา</span
                  ></v-toolbar-title
                >
                <v-toolbar-title
                  ><span class="order">{{ total }}</span></v-toolbar-title
                >
                <v-spacer></v-spacer>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="ค้นหาชื่อลูกค้าบุคคล/บริษัท"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>{{ item.quotation_code }}</td>
                <td>
                  {{ item.customer_tax_invoices }}<br />
                  <span class="quotation-font-color"
                    >update {{ item.update }}</span
                  >
                </td>
                <td>
                  <span class="quotation-font-color">วันที่จัดงาน</span><br />
                  {{ item.event_date }}
                  <span class="quotation-font-color">{{
                    item.event_date_datetime
                  }}</span
                  ><br />
                  <span class="quotation-font-color">วันนัดดูพื้นที่</span
                  ><br />
                  {{ item.area_viewing_date }}
                  <span class="quotation-font-color">{{
                    item.area_viewing_date_datetime
                  }}</span>
                </td>
                <td class="size14">
                  <div
                    v-if="item.quotation_status == 'คอนเฟิร์ม'"
                    class="success--text "
                  >
                    {{ item.quotation_status }}
                  </div>
                  <div
                    v-else-if="item.quotation_status == 'ไม่คอนเฟิร์ม'"
                    class="warning--text "
                  >
                    {{ item.quotation_status }}
                  </div>
                  <div v-else class="error--text ">
                    {{ item.quotation_status }}
                  </div>
                </td>
                <td>
                  <ModalCreateQuotation :quotation_code="item.quotation_code" />
                </td>
                <td>
                  <v-row>
                    <!-- <v-btn  fab icon outlined small>
                      <v-icon>lock_open</v-icon>
                    </v-btn> -->
                    <v-btn
                      @click="PrintQuotation(item)"
                      fab
                      icon
                      outlined
                      small
                    >
                      <v-icon>visibility</v-icon>
                    </v-btn>
                    <v-btn @click="EditQuotation(item)" fab icon outlined small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      @click="DeleteQuotation(item)"
                      fab
                      icon
                      outlined
                      small
                    >
                      <v-icon>delete</v-icon>
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
import ModalCreateQuotation from "@/components/dialog/ModalCreateQuotation.vue";
import api from "@/services/api";

export default {
  name: "Quotation",
  components: {
    ModalCreateQuotation
  },
  mounted() {
    this.loadQuotation();
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
      { text: "หมายเลขใบเสร็จ", value: "quotation_code", sortable: true, align: "start"},
      { text: "ชื่อใบกำกับภาษี", value: "customer_tax_invoices", sortable: false, align: "start"},
      { text: "วันเดือนปี", value: "event_date", sortable: true,align: "start"},
      { text: "สถานะ", value: "quotation_status", sortable: true, align: "start"},
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" }
    ]
  }),

  methods: {
    async loadQuotation() {
      let result = await api.getQuotation();
      this.table_quotation_item = result.data.result;
      this.total = result.data.total;
    },

    async PrintQuotation(item) {
      await this.$store.dispatch({
        type: "doEditBNPID",
        BNP_ID: item.quotation_code
      });
      await this.$router.push({ name: "saleQuotationPrint" });
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
