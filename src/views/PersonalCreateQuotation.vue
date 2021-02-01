<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
            สร้างรายชื่อลูกค้าประเภทบุคคล
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <!-- Tap เมนู ข้อมูลใบกำกับภาษี --> 
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
                  <div class="sizehead">{{ link.text }}</div>
                </v-tab>
              </v-tabs>
            </v-col>
          </v-row>
          <!-- ชื่อใบกำกับภาษี -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ชื่อใบกำกับภาษี</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="name"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- รหัสประจำตัวผู้เสียภาษี -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">รหัสประจำตัวผู้เสียภาษี</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="telephone_number"
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
                  v-model="mobile_phone_number"
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
                  v-model="type_id"
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
                  v-model="mobile_phone_number"
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
                  v-model="type_id"
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
                  v-model="mobile_phone_number"
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
                  v-model="mobile_phone_number"
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
                  v-model="type_id"
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
                  v-model="mobile_phone_number"
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
                  v-model="type_id"
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
  name: "PersonalCreateQuotation",

  data: () => ({
    links: [
      { text: "ข้อมูลลูกค้า", route: "/Personneltype" },
      { text: "ข้อมูลใบกำกับภาษี", route: "/PersonalCreateQuotation" },
    ],
  }),

  methods: {
    submit() {
      if (this.inModul.length <= 1) {
        alert("กรุณากรอกข้อมูลให้ครบ");
      } else {
        axios
          .post(`${process.env.VUE_APP_API_URL}/bibdata/bulkadd`, this.inModul)
          .then((res) => {
            alert("บันทึกข้อมูลเรียบร้อยแล้ว", res);
          });
      }
    },
  },
};
</script>

<style scoped>

</style>
