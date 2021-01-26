 <template>
 <v-container style="background:#E5E5E5;color:white;height:100%">
    <!-- Summary section -->
    <v-row justify="center">
      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="60"
          subtitle="คอนเฟิร์ม"
        />
      </v-col> 

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="16"
          subtitle="ไม่คอนเฟิร์ม"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="43"
          subtitle="ยกเลิก"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <StockCard
          title="119"
          subtitle="ทั้งหมด"
        />
      </v-col>
    </v-row>
   <v-row>
      <v-col lg="6" md="6" sm="12" cols="12">
           </v-col>
     </v-row>      
    <v-row>
      <v-col lg="6" md="6" sm="12" cols="12">
        <!-- สถานะใบเสนอราคาล่าสุด -->
            <v-card>
              <v-data-table
                :headers="headers_latest_quotation"
                :items="items"
                disable-pagination
                hide-default-header
                hide-default-footer
                class="elevation-1"
              >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title class="text--black">สถานะใบเสนอราคาล่าสุด</v-toolbar-title>
              </v-toolbar>
            </template>
                <!-- <template v-slot:item="{ item }"> -->
                  <tr>
                    <td>BNPQU0000001</td>
                    <td>บริษัท ทวีสตูดิโอ จำกัด, คุณพรีม</td>
                    <td>คอนเฟิร์ม
                        <!-- <div v-if="item.status == 'คอนเฟิร์ม'" class="success--text text--darken-2">
                                                      {{ item.status }}
                        </div>
                        <div v-else-if="item.status == 'ไม่คอนเฟิร์ม'" class="warning--text text--darken-2">
                                                      {{ item.status }}
                        </div>
                        <div v-else class="error--text text--darken-2">
                                                      {{ item.status }}
                        </div> -->
                      </td>
                  </tr>
                <!-- </template> -->
              </v-data-table>
            </v-card>
      </v-col>
      <v-col lg="6" md="6" sm="12" cols="12">
        <!-- รายชื่อลูกค้าล่าสุด -->
          <v-card>
            <v-data-table
              :headers="headers_latest_customer_list"
              :items="Latest_customer_list"
              disable-pagination
              hide-default-header
              hide-default-footer
              class="elevation-1"
            >
        <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title class="text--black">รายชื่อลูกค้าล่าสุด</v-toolbar-title>
              </v-toolbar>
            </template>
              <!-- <template v-slot:item="{ item }"> -->
                <tr>
                    <td>BNPQU0000001</td>
                    <td>บริษัท ทวีสตูดิโอ จำกัด, คุณพรีม</td>
                    <td>14-06-2563</td>
                  </tr>
              <!-- </template> -->
            </v-data-table>
          </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import StockCard from "@/components/cards/StockCard";
export default {
   name: "Home",
   components: {
    StockCard
  },
  data: () => ({

    Latest_quotation: [],
    headers_latest_quotation: [
      { text: "sku", value: "sku", align: "start" },
      { text: "quotationName", value: "quotationName", align: "start" },
      { text: "status", value: "status", align: "start" },
    ],

    Latest_customer_list: [],
    headers_latest_customer_list: [
      { text: "sku", value: "Field", align: "start" },
      { text: "customer_list", value: "customer_list", align: "start" },
      { text: "Daymonthyear", value: "Daymonthyear", align: "start" },
    ],
  }),

}
</script>

<style>

</style>