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
          <v-data-table 
          :headers="headers_table_quotation" 
          :items="table_quotation_item"
          class="elevation-1">
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span>ใบเสนอราคา</span></v-toolbar-title>
                <v-toolbar-title><span class="text-caption grey--text">{{total}}</span></v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
            <tr>
              <td>{{item.id}}</td>
              <td>{{item.customer_tax_invoices}}
                <div>update {{item.update}}</div>
              </td>
              <td>
                วันที่จัดงาน
                <div>{{item.event_date}} {{item.event_date_datetime}}</div>
                วันนัดดูพื้นที่
                <div>{{item.area_viewing_date}} {{item.area_viewing_date_datetime}}</div>
              </td>
              <td>{{item.quotation_status}}</td>
              <td><ModalCreateQuotation /></td>
              <td>
                  <v-row>
                    <!-- <v-btn  fab icon outlined small>
                      <v-icon>lock_open</v-icon>
                    </v-btn> -->
                    <v-btn @click="MonitorQuotation(item)" fab icon outlined small>
                      <v-icon>visibility</v-icon>
                    </v-btn>
                    <v-btn @click="EditQuotation(item)" fab icon outlined small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn @click="DeleteQuotation(item)" fab icon outlined small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-row>
                </td>
                <td>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
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
import ModalCreateQuotation from "@/components/dialog/ModalCreateQuotation.vue";
import api from "@/services/api";

export default {
  name: "Quotation",
  components: {
    ModalCreateQuotation,
  },
    mounted() {
      this.loadQuotation();
      this.$store.dispatch({
            type: "inputRoutepath",
            RT: this.$route.path,
          });
    },
  data: () => ({
    total:null,
    table_quotation_item: [],
    headers_table_quotation: [
      { text: "หมายเลขใบเสร็จ", value: "id", align: "start" },
      { text: "ชื่อใบกำกับภาษี", value: "customer_tax_invoices", align: "start" },
      { text: "วันเดือนปี", value: "event_date", align: "start" },
      { text: "สถานะ", value: "status", align: "start" },
      { text: "", value: "", align: "start" },
      { text: "", value: "", align: "start" },
      { text: "", value: "", align: "start" },
    ],
  }),

  methods: {
      async loadQuotation(){
      let result = await api.getQuotation();
      this.table_quotation_item = result.data.result;
      this.total = result.data.total;
    },

    async EditQuotation(item){
      await this.$store.dispatch({
          type: "doEditBNPID",
          BNP_ID: item.id,
        });
      await this.$router.push('/EditPersoneltype');
    },

    async DeleteQuotation(item){
      let delQuotation ={"id":item.id}
      let result = await api.delQuotation(delQuotation);
       if (result.data.response =='OK'){
        alert('ลบใบเสนอราคาเรียบร้อยแล้ว')
        await this.loadQuotations()
      }
    },


    // dialogCreateQuotations() {
    //   this.dialogSelectQuotation = true;
    // },
  },
};
</script>

<style scoped>

</style>
