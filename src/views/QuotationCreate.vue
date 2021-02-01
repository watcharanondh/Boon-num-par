<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
   <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
            สร้างใบเสนอราคา
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <!-- สร้างใบเสนอราคา -->
      <v-row justify="center">
        <v-col lg="6" md="12" sm="12" cols="12">
          <v-row>
            <v-col>
              <v-tabs left color="black">
                <v-tab
                  v-for="link in links"
                  :key="link.text"
                  router
                  :to="link.route"
                >
                  <div>{{ link.text }}</div>
                </v-tab>
              </v-tabs>
            </v-col>
          </v-row>
          <!-- ค้นหารายชื่อลูกค้า หรือ ค้นหาหมายเลขลูกค้า -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <div class="sizehead">ค้นหารายชื่อลูกค้า หรือ ค้นหาหมายเลขลูกค้า</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="SearchNames_Codes"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>

          <!-- หมายเลขผู้เสียภาษี -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">หมายเลขผู้เสียภาษี</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Taxpayer_Number"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- ชื่อผู้เสียภาษี -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ชื่อผู้เสียภาษี</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Taxpayer_Name"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>

          <!-- แฟลช -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">แฟลช</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="flash"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- อีเมล์ -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">อีเมล์</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Email"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>

          <!-- โทรศัพท์ -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">โทรศัพท์</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="phone"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- มือถือ -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">มือถือ</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="mobile_phone"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>

          <!-- วันจัดงาน -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">วันจัดงาน</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="eventdate"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- วันนัดดูพื้นที่ -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">วันนัดดูพื้นที่</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="areaviewingdate"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>

          <!-- ที่อยู่ -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <div class="sizehead">ที่อยู่</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Address"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>

          <!-- จังหวัด -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">จังหวัด</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="province"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- เขต/อำเภอ -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">เขต/อำเภอ</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="county"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>

          <!-- แขวง/ตำบล -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">แขวง/ตำบล</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="district"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- รหัสไปรษณีย์ -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">รหัสไปรษณีย์</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="postalcode"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-btn
                block
                large
                rounded
                outlined
                @click="$router.push('/Customer')"
                >ยกเลิก</v-btn
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3">
              <v-btn
                block
                color="#29CC97"
                dark
                large
                rounded
                @click="selectPage(SelectCustomerType.value)"
                ><span class="white--text">บันทึก</span></v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "QuotationCreate",

  data: () => ({
    links: [
      { text: "ข้อมูลลูกค้า", route: "/QuotationCreate" },
      { text: "เลือกแพ็กเกจ", route: "/QuotationCreateSelectPackage" },
      { text: "เลือกโปรโมชั่น", route: "/QuotationCreateSelectPromotion" },
    ],
  }),

  methods: {
    submit() {

        axios
          .post(`${process.env.VUE_APP_API_URL}/bibdata/bulkadd`, this.inModul)
          .then((res) => {
            alert("บันทึกข้อมูลเรียบร้อยแล้ว", res);
          });
      
    },
  },
};
</script>

<style scoped>

</style>
