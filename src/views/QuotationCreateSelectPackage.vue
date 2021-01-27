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
            <v-tab
              v-for="link in links"
              :key="link.text"
              router
              :to="link.route"
            >
              <h3>{{ link.text }}</h3>
            </v-tab>
          </v-tabs>

          <!-- แพ็กเกจ -->

          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <h3>แพ็กเกจ</h3>
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
                        <v-col>
                        <v-row></v-row>
                        </v-col>
                      <v-row>
                        <v-text-field
                          v-model="searchPackage"
                          v-on:keyup.enter="Get_API_Databook"
                          clearable
                          solo
                          rounded
                          prepend-inner-icon="mdi-magnify"
                          label="ค้นหาแพ็กเกจ"
                        ></v-text-field>
                      </v-row>
            
                      <v-col>
                        <v-row>
                          <v-toolbar-title class="text--black"
                            >แพ็กเกจ</v-toolbar-title
                          >
                        </v-row>
                      </v-col>
                      <v-divider class="mx-5" inset vertical></v-divider>
                      <v-spacer></v-spacer>
                    </v-toolbar>
                  </template>
                  <!-- table tr section -->
                  <template v-slot:item="{ item }">
                    <tr v-on:click="InfoBookclick(item)">
                      <td>
                        <v-img
                          :src="item.PicPath"
                          width="100"
                          height="100"
                        ></v-img>
                      </td>
                      <td>{{ item.Title }}</td>
                      <td>{{ item.Author }}</td>
                      <td>{{ item.Publish }}</td>
                      <td>{{ item.CallNo }}</td>
                    </tr>
                  </template>
                </v-data-table>
              </v-row>
            </v-col>
          </v-row>

          <!-- แพ็กเกจที่ท่านเลือก (เลือกได้แค่แพ็กเกจเดียว) -->

          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <h3>แพ็กเกจ</h3>
              <v-row class="no-gutters"> </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <v-row class="no-gutters">
                <h3>
                  เลือกอาหารแพ็กเกจ (ถ้าลูกค้ายังไม่คอนเฟิร์มยังไม่ต้องใส่)
                </h3>
              </v-row>
            </v-col>
          </v-row>
          <!-- เลือกอาหารแพ็กเกจ (ถ้าลูกค้ายังไม่คอนเฟิร์มยังไม่ต้องใส่) -->
          <!-- อาหารคาว -->
          <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <h3>อาหารคาว</h3>
              <h5>เลือก 0 เหลือ 3</h5>
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
              <h3>อาหารหวาน</h3>
              <h5>เลือก 0 เหลือ 2</h5>
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
              <h3>เครื่องดืม</h3>
              <h5>เลือก 0 เหลือ 1</h5>
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
.pointer {
  cursor: pointer;
}
</style>
