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
    <!-- ปฎิทิน -->
    <v-row>
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
          <v-text-field
            v-model="dateRangeText"
            label="ค้นหาวันที่มีงาน"
            prepend-icon="mdi-calendar"
            dense
            solo
            outlined
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
                      @click="$refs.menu.save(dates); BetweenDate()"
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
            :headers="headers_table_Teaminglist"
            :items="table_Teaminglist_item"
            class="elevation-1"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span class="header-table-title">รายชื่องาน</span></v-toolbar-title>
                <v-toolbar-title><span class="order">{{ total }}</span></v-toolbar-title>
                <v-spacer></v-spacer>
               <!-- <v-divider class="mx-4" inset vertical></v-divider>
                 <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="ค้นหาช่วงเวลาที่ต้องการ"
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
                  {{ item.event_date }}<br />
                  <span class="quotation-font-color">{{item.event_date_datetime}}</span>
                </td>
                <td>
                  {{ item.lineup_food_team }}<br />
                  <span class="quotation-font-color">{{item.lineup_food_driver}}</span>
                </td>
                <td>
                  <br />
                  <ModalUpdateManagefood :quotation_code="item.quotation_code" /><br />
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
import api from "@/services/api";
import ModalUpdateManagefood from "@/components/dialog/teamhong/ModalUpdateManagefood.vue";

export default {
  name: "Shipping",
  components: {
    ModalUpdateManagefood
  },
  mounted() {
    this.loadShipping();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path
    });
  },
  data: () => ({
    dates: [],
    menu: false,
    search: "",
    total: null,
    table_Teaminglist_item: [],
    headers_table_Teaminglist: [
      { text: "รหัสงาน",value: "quotation_code",sortable: true,align: "start"},
      { text: "ชื่อใบกำกับภาษี", value: "customer_tax_invoices", sortable: false,align: "start"},
      { text: "วันเวลาจัดไลน์อาหาร", value: "event_date",sortable: true, align: "start"},
      { text: "ทีมจัดไลน์อาหาร",value: "quotation_status",sortable: true,align: "start"},
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ]
  }),

  computed: {
    dateRangeText() {
      return this.dates.join(" ~ ");
    },
  },

  methods: {
    async loadShipping() {
      let Datemoment ={ startdate:"" , enddate:"" }
      let result = await api.Listshippinglineupfoods(Datemoment);
      //console.log('loadShipping',result.data.result);
      this.table_Teaminglist_item = result.data.result;
      this.total = result.data.total;
    },

  async BetweenDate(){
      let Datemoment ={ startdate:this.dates[0] , enddate:this.dates[1] }
      let result = await api.Findmomentlineupfood(Datemoment);
      //console.log('ช่วงเวลา',result);
      if(result.data.response=="OK"){
      this.table_Teaminglist_item = [];
      this.table_Teaminglist_item = result.data.result;
      this.total = result.data.total;
      }else{
             this.$swal.fire(
              "ไม่พบช่วงเวลาดังกล่าว",
              `กรุณาค้นหาช่วงเวลาใหม่อีกครั้ง ${result.data.response} ${result.data.result} `,
              "error"
            );
      }
    },

    async MonitorTeaminformation(item) {
      await this.$store.dispatch({
        type: "setBNPDATA",
        databnp: item.quotation_code
      });
      await this.$router.push({ name: "menuMonitorTeaminformationfood" });
    },
  }
};
</script>

<style scoped></style>
