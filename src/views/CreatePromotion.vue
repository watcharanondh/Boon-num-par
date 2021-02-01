<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
   <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
            สร้างโปรโมชั่น
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <!-- Tap เมนู ข้อมูลโปรโมชั่น -->
      <v-row justify="center">
        <v-col lg="6" md="12" sm="12" cols="12">
          <v-row>
            <v-col>
              <div class="sizetitle">
                  ข้อมูลโปรโมชั่น
              </div>
            </v-col>
          </v-row>
          <!-- ข้อมูลโปรโมชั่น -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ชื่อโปรโมชั่น</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Promotion_Name"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>
        
          <!-- ลดราคา -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ลดราคา
                 <span class="text-sm-body-2 red--text">(ใส่เป็นจำนวนตัวเลข)</span>
              </div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Promotion_Price"
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
  name: "CreatePromotion",

  data: () => ({

    Promotion_Name:'',
    Promotion_Price:null,

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
