<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
            สร้างแพ็คเกจ
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <!--Tap เมนูอุปกรณ์แพ็คเกจ -->
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

          <!-- รายการอุปกรณ์ -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-row class="no-gutters">
                <h3>รายการอุปกรณ์</h3>
                <span class="text-caption grey--text mt-2">193 รายการ</span>
              </v-row>
            </v-col>

            <!-- อุปกรณ์ที่เลือก -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-row class="no-gutters">
                <h3>อุปกรณ์ที่เลือก</h3>
                <span class="text-caption grey--text mt-2">2 รายการ</span>
              </v-row>
            </v-col>
          </v-row>

          <!-- รายการอุปกรณ์ -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-row class="no-gutters">
                <v-data-table
                  :headers="headers_promotion_item"
                  :items="promotion_item"
                  :items-per-page="10"
                  hide-default-header
                  hide-default-footer
                  class="elevation-1"
                >
                  <!-- <template v-slot:item="{ item }"> -->
                  <tr>
                    <td>ฟรีค่าขนส่งเหมาติดตั้งและเก็บกลับ</td>
                    <td>เลือก</td>
                  </tr>
                  <!-- </template> -->
                </v-data-table>
              </v-row>
            </v-col>

            <!-- อุปกรณ์ที่เลือก -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-row class="no-gutters">
                <v-data-table
                  :headers="headers"
                  :items="desserts"
                  :items-per-page="10"
                  hide-default-header
                  hide-default-footer
                  class="elevation-1"
                >
                  <!-- <template v-slot:item="{ item }"> -->
                  <tr>
                    <td>ฟรีค่าขนส่งเหมาติดตั้งและเก็บกลับ</td>
                    <td>ลบ</td>
                  </tr>
                  <!-- </template> -->

                  ></v-data-table>
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
  name: "CreatePackageSelectEquipment",

  data: () => ({
    links: [
      { text: "ข้อมูลแพ็กเกจ", route: "/CreatePackage" },
      { text: "อุปกรณ์แพ็กเกจ", route: "/CreatePackageSelectEquipment" },
    ],


    //รายการโปรโมชั่น
    equipment_item: [],
    headers_promotion_item: [
      { text: "รายการอุปกรณ์", value: "equipment_item", sortable: false, align: "start", color: "black"},
    ],
    //โปรโมชั่นที่เลือก
    equipment_select_item: [],
    headers_equipment_select_item: [
      { text: "อุปกรณ์ที่เลือก", value: "equipment_select_item", sortable: false, align: "start", color: "black"},
      { text: "เลือก", value: "select", sortable: false, align: "start", color: "black"},
    ],
  }),

  methods: {
    submit() {

        axios.post(`${process.env.VUE_APP_API_URL}/bibdata/bulkadd`, this.inModul).then((res) => {
            alert("บันทึกข้อมูลเรียบร้อยแล้ว", res);
          });
      
    },
  },
};
</script>

<style scoped></style>
