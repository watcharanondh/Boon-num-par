<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col class="ma-9">
      <v-row>
        <v-card flat color="#E5E5E5"> 
          <h1 class="headline font-weight-bold text--black">
            ใบเสนอราคา
          </h1>
        </v-card>
      </v-row>
    </v-col>
    <v-col class="ma-9">
      <v-row>
    <v-btn color="#29CC97" @click="$router.push('/QuotationCreate')" rounded>
        <span class="font-weight-bold white--text">สร้างใบเสนอราคา</span></v-btn>
      </v-row>
    </v-col>

    <v-row class="ma-9">
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- ใบเสนอราคา -->
        <v-card>
          <v-data-table :headers="headers_table_customer" class="elevation-1">
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title class="headline font-weight-bold text--black"
                  >ใบเสนอราคา</v-toolbar-title
                >
                <h5 class="gray--text mt-2">1024 รายการ</h5>
              </v-toolbar>
            </template>
            <!-- <template v-slot:item="{ item }"> -->
            <tr>
              <td>BNPQU0000001</td>
              <td>บริษัท ทวีสตูดิโอ จำกัด, คุณพรีม <div>update 24.05.2019</div></td>
              <td>วันที่จัดงาน <div>May 26, 2019 6:30 PM</div> วันนัดดูพื้นที่ <div>May 26, 2019 6:30 PM</div></td>
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
  name: "Customer",
  components: {
    ModalCreateQuotation,
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

<style></style>
