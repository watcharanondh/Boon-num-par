<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
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
          @click="$router.push('/QuotationCreate')"
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
          <v-data-table :headers="headers_table_customer" class="elevation-1">
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span>ใบเสนอราคา</span></v-toolbar-title>
                <v-toolbar-title
                  ><span class="text-caption grey--text"
                    >1024
                  </span></v-toolbar-title
                >
                <v-toolbar-title
                  ><span class="text-caption grey--text"
                    >รายการ</span
                  ></v-toolbar-title
                >
              </v-toolbar>
            </template>
            <!-- <template v-slot:item="{ item }"> -->
            <tr>
              <td>BNPQU0000001</td>
              <td>
                บริษัท ทวีสตูดิโอ จำกัด, คุณพรีม
                <div>update 24.05.2019</div>
              </td>
              <td>
                วันที่จัดงาน
                <div>May 26, 2019 6:30 PM</div>
                วันนัดดูพื้นที่
                <div>May 26, 2019 6:30 PM</div>
              </td>
              <td>คอนเฟิร์ม</td>
              <td><ModalCreateQuotation /></td>
            </tr>
            <!-- </template> -->
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalCreateQuotation from "@/components/dialog/ModalCreateQuotation.vue";
export default {
  name: "Quotation",
  components: {
    ModalCreateQuotation,
  },
    mounted() {
    console.log(this.$route.path);
    this.$store.dispatch({
          type: "inputRoutepath",
          RT: this.$route.path,
        });
    },
  data: () => ({
    table_customer: [],
    headers_table_customer: [
      { text: "หมายเลขใบเสร็จ", value: "sku", align: "start" },
      { text: "ชื่อใบกำกับภาษี", value: "quotationName", align: "start" },
      { text: "วันเดือนปี", value: "status", align: "start" },
      { text: "สถานะ", value: "status", align: "start" },
    ],
  }),

  methods: {
    dialogCreateCustomers() {
      this.dialogSelectCustomer = true;
    },
  },
};
</script>

<style scoped>

</style>
