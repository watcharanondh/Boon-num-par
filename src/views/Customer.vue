<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col class="ma-9">
      <v-row>
        <v-card flat color="#E5E5E5"> 
          <h1 class="headline font-weight-bold text--black">
            รายชื่อลูกค้าทั้งหมด
          </h1>
         
        </v-card>
        <v-icon> keyboard_arrow_down</v-icon>
      </v-row>
    </v-col>
    <v-col class="ma-9">
      <v-row>
        <ModalCreateCustomers />
      </v-row>
    </v-col>

    <v-row class="ma-9">
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- รายชื่อลูกค้าทั้งหมด -->
        <v-card>
          <v-data-table :headers="headers_table_customer" class="elevation-1">
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title class="headline font-weight-bold text--black"
                  >รายชื่อลูกค้า</v-toolbar-title
                >
                <h5 class="gray--text mt-2">1024 รายการ</h5>
              </v-toolbar>
            </template>
            <!-- <template v-slot:item="{ item }"> -->
            <tr>
              <td>BNPQU0000001</td>
              <td>บริษัท ทวีสตูดิโอ จำกัด, คุณพรีม</td>
              <td>คอนเฟิร์ม</td>
            </tr>
            <!-- </template> -->
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ModalCreateCustomers from "@/components/dialog/ModalCreateCustomers.vue";
export default {
  name: "Customer",
  components: {
    ModalCreateCustomers,
  },

  data: () => ({
    table_customer: [],
    headers_table_customer: [
      { text: "รหัสลูกค้า", value: "sku", align: "start" },
      { text: "ชื่อลูกค้า", value: "quotationName", align: "start" },
      { text: "ชื่อออกใบกำกับภาษี", value: "status", align: "start" },
      { text: "ประเภทลูกค้า", value: "status", align: "start" },
      { text: "วันเวลาที่สร้าง", value: "status", align: "start" },
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
