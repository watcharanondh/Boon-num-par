<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col class="ma-9">
      <v-row>
        <v-card flat color="#E5E5E5">
          <h1 class="headline font-weight-bold text--black">
            สร้างใบเสนอราคา
          </h1>
        </v-card>
      </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <!-- สร้างใบเสนอราคา -->
      <v-row justify="center">
        <v-col lg="6" md="12" sm="12" cols="12">
      
      <v-tabs left color="orange accent-4">
        <v-tab v-for="link in links" :key="link.text" router :to="link.route">
          <h3>{{ link.text }}</h3>
        </v-tab>
      </v-tabs>

          <!-- ค้นหารายชื่อลูกค้า หรือ ค้นหาหมายเลขลูกค้า -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <h3>ค้นหารายชื่อลูกค้า หรือ ค้นหาหมายเลขลูกค้า</h3>
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
              <h3>หมายเลขผู้เสียภาษี</h3>
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
              <h3>ชื่อผู้เสียภาษี</h3>
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
              <h3>แฟลช</h3>
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
              <h3>อีเมล์</h3>
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
              <h3>โทรศัพท์</h3>
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
              <h3>มือถือ</h3>
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
              <h3>วันจัดงาน</h3>
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
              <h3>วันนัดดูพื้นที่</h3>
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
              <h3>ที่อยู่</h3>
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
              <h3>จังหวัด</h3>
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
              <h3>เขต/อำเภอ</h3>
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
              <h3>แขวง/ตำบล</h3>
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
              <h3>รหัสไปรษณีย์</h3>
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
                >ปิด</v-btn
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
                ><span class="font-weight-bold white--text">ตกลง</span></v-btn
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
  name: "Companytype",

  data: () => ({
     links: [
      { text: "ข้อมูลลูกค้า", route: "/QuotationCreate" },
      { text: "เลือกแพ็กเกจ", route: "/QuotationCreateSelectPackage" },
      { text: "เลือกโปรโมชั่น", route: "/QuotationCreateSelectPromotion" },
    ],
  }),

  methods: {
    //บันทึกทั้งหมดตอนสุดท้าย หน้าเพิ่มทรัพยากร
    submit() {
      if (this.inModul.length <= 1) {
        alert("กรุณากรอกข้อมูลให้ครบ");
      } else {
        axios.post(`${process.env.VUE_APP_API_URL}/bibdata/bulkadd`, this.inModul)
          .then((res) => {
            alert("บันทึกข้อมูลเรียบร้อยแล้ว", res);
          });
      }
    },
  },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
