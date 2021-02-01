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
      <!-- Tap เมนู ข้อมูลแพ็คเกจ -->
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
          <!-- ชื่อแพ็คเกจ -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ชื่อแพ็คเกจ</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Package_Name"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
        
          <!-- ราคา -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ราคา</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="price"
                  type="number"
                  min="0"                  
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
            </v-row>

            <!-- จำนวนอาหารคาว -->
            <v-row>
            <v-col lg="4" md="4" sm="12" cols="12">
              <div class="sizehead">จำนวนอาหารคาว</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Savoryfood_amount"
                  type="number"
                  min="0"                  
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

          <!-- จำนวนอาหารหวาน -->
            <v-col lg="4" md="4" sm="12" cols="12">
              <div class="sizehead">จำนวนอาหารหวาน</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Dessert_amount"
                  type="number"
                  min="0"                
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- จำนวนเครื่องดื่ม -->
            <v-col lg="4" md="4" sm="12" cols="12">
              <div class="sizehead">จำนวนเครื่องดื่ม</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Drinks_amount"
                  type="number"
                  min="0"      
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
  name: "CreateEquipment",

  data: () => ({
    links: [
      { text: "ข้อมูลแพ็กเกจ", route: "/CreateEquipment" },
      { text: "อุปกรณ์แพ็กเกจ", route: "/CreatePackageSelectEquipment" },
    ],

    Package_Name:'',
    price:null,
    Savoryfood_amount:null,
    Dessert_amount:null,
    Drinks_amount:null,

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
