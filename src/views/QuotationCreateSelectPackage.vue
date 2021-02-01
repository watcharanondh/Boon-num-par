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
      <!--Tap เมนูเลือกแพ็คเก็จ -->
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
          <v-col><v-row> </v-row></v-col>

          <v-col lg="12" md="12" sm="12" cols="12">
            <v-row class="no-gutters">
              <v-data-table
                :search="searchPackage"
                :headers="headers"
                :items="mDataArray"
                :items-per-page="5"
                class="elevation-1"
              >
                <!-- table top section -->
                <template v-slot:top>
                  <v-toolbar flat>
                    <!-- ค้นหาแพ็กเกจ -->
                    <v-row>
                      <v-col class="mt-5">
                        <v-text-field
                          v-model="searchPackage"
                          clearable
                          solo
                          rounded
                          prepend-inner-icon="mdi-magnify"
                          label="ค้นหาแพ็กเกจ"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-spacer></v-spacer>
                    <v-divider class="mx-5" inset vertical></v-divider>
                    <v-row class="ma-2">
                      <div>
                        <svg
                          width="14"
                          height="12"
                          viewBox="0 0 14 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.128568 2.26839L2.31563 0.125478C2.48647 -0.0418526 2.7636 -0.0417991 2.93434 0.125478L5.12132 2.26839C5.39667 2.53812 5.20059 3.00001 4.81195 3.00001H3.5V11.5714C3.5 11.8081 3.30414 12 3.0625 12H2.1875C1.94586 12 1.75 11.8081 1.75 11.5714V3.00001H0.437935C0.0485329 3.00001 -0.146209 2.53758 0.128568 2.26839ZM6.5625 1.7143H13.5625C13.8041 1.7143 14 1.52243 14 1.28573V0.428584C14 0.191879 13.8041 1.34454e-05 13.5625 1.34454e-05H6.5625C6.32086 1.34454e-05 6.125 0.191879 6.125 0.428584V1.28573C6.125 1.52243 6.32086 1.7143 6.5625 1.7143ZM6.125 4.71429V3.85715C6.125 3.62045 6.32086 3.42858 6.5625 3.42858H11.8125C12.0541 3.42858 12.25 3.62045 12.25 3.85715V4.71429C12.25 4.951 12.0541 5.14287 11.8125 5.14287H6.5625C6.32086 5.14287 6.125 4.951 6.125 4.71429ZM6.125 11.5714V10.7143C6.125 10.4776 6.32086 10.2857 6.5625 10.2857H8.3125C8.55414 10.2857 8.75 10.4776 8.75 10.7143V11.5714C8.75 11.8081 8.55414 12 8.3125 12H6.5625C6.32086 12 6.125 11.8081 6.125 11.5714ZM6.125 8.14286V7.28572C6.125 7.04901 6.32086 6.85715 6.5625 6.85715H10.0625C10.3041 6.85715 10.5 7.04901 10.5 7.28572V8.14286C10.5 8.37957 10.3041 8.57143 10.0625 8.57143H6.5625C6.32086 8.57143 6.125 8.37957 6.125 8.14286Z"
                            fill="#C5C7CD"
                          />
                        </svg>
                        Sort
                      </div>
                    </v-row>
                    <v-row>
                      <div>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4369 0H0.563154C0.0635131 0 -0.188604 0.606234 0.165419 0.960258L4.5 5.29549V10.125C4.5 10.3085 4.58955 10.4805 4.73993 10.5858L6.61493 11.8979C6.98484 12.1568 7.5 11.8944 7.5 11.437V5.29549L11.8347 0.960258C12.188 0.606937 11.9376 0 11.4369 0Z"
                            fill="#C5C7CD"
                          />
                        </svg>
                        Filter
                      </div>
                    </v-row>
                  </v-toolbar>
                </template>
                <!-- table tr section -->
                <template v-slot:item="{ item }">
                  <tr v-on:click="InfoBookclick(item)">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </template>
              </v-data-table>
            </v-row>
          </v-col>

          <!-- แพ็กเกจที่ท่านเลือก (เลือกได้แค่แพ็กเกจเดียว) -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <v-row class="no-gutters">
                <div class="sizehead">
                  แพ็กเกจที่ท่านเลือก
                  <span class="text-sm-body-2 red--text"
                    >(เลือกได้แค่แพ็กเกจเดียว)</span
                  >
                </div>
              </v-row>
            </v-col>
          </v-row>

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
                  <td>แพ็คเกจ บุญนำพาสุดอิ่มใจ update 24.05.2019</td>
                  <td>อาหารคาว 3 , อาหารหวาน 2 , เครื่องดื่ม 1</td>
                  <td>ลบ</td>
                </tr>
                <!-- </template> -->

                ></v-data-table
              >
            </v-row>
          </v-col>

          <!-- เลือกอาหารแพ็กเกจ (ถ้าลูกค้ายังไม่คอนเฟิร์มยังไม่ต้องใส่) -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <v-row class="no-gutters">
                <div class="sizehead">
                  เลือกอาหารแพ็กเกจ
                  <span class="text-sm-body-2 red--text"
                    >(ถ้าลูกค้ายังไม่คอนเฟิร์มยังไม่ต้องใส่)</span
                  >
                </div>
              </v-row>
            </v-col>
          </v-row>
          <!-- อาหารคาว -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <div class="sizehead">
                อาหารคาว
                <span class="text-sm-body-2 grey--text">เลือก 0 เหลือ 3</span>
              </div>
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

          <!-- อาหารหวาน -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <div class="sizehead">
                อาหารหวาน
                <span class="text-sm-body-2 grey--text">เลือก 0 เหลือ 2</span>
              </div>
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
          </v-row>
          <!-- เครื่องดืม -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <div class="sizehead">
                เครื่องดืม
                <span class="text-sm-body-2 grey--text">เลือก 0 เหลือ 1</span>
              </div>
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
  name: "QuotationCreateSelectPackage",

  data: () => ({
    links: [
      { text: "ข้อมูลลูกค้า", route: "/QuotationCreate" },
      { text: "เลือกแพ็กเกจ", route: "/QuotationCreateSelectPackage" },
      { text: "เลือกโปรโมชั่น", route: "/QuotationCreateSelectPromotion" },
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

<style scoped></style>
