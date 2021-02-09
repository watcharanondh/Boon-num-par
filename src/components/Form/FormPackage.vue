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
        <!-- รายการชุดอุปกรณ์ -->
        <v-row justify="center">
          <v-col lg="6" md="6" sm="12" cols="12">
            <!-- Tap เมนู ข้อมูลแพ็คเกจ -->

            <v-tabs left color="black">
              <v-tab>
                ข้อมูลแพ็คเกจ
              </v-tab>
              <v-tab>
                อุปกรณ์แพ็กเกจ
              </v-tab>

              <v-tab-item>
                <v-card flat>
                  <v-card-text>
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
                  </v-card-text>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <!-- สร้างชื่อรายการชุดอุปกรณ์ -->
                <v-row>
                  <v-col lg="6" md="6" sm="12" cols="12">
                    <v-row class="no-gutters">
                      <div class="sizehead">สร้างชื่อรายการชุดอุปกรณ์</div>
                      <v-text-field
                        v-model="searchSetEquipment"
                        dense
                        solo
                        outlined
                        clearable
                      ></v-text-field>
                    </v-row>
                  </v-col>
                </v-row>

                <!-- รายการอุปกรณ์ -->
                <v-row>
                  <v-col lg="6" md="6" sm="12" cols="12">
                    <v-row class="no-gutters">
                      <h3>รายการอุปกรณ์</h3>
                      <span class="text-caption grey--text mt-2"
                        >193 รายการ</span
                      >
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
                        :headers="headers_SetEquipment_table_item"
                        :items="SetEquipment_table_item"
                        :items-per-page="10"
                        hide-default-header
                        class="elevation-1"
                      >
                        <template v-slot:item="{ item }">
                          <tr>
                            <td>{{ item.name }}</td>
                            <td>
                              <v-btn
                                small
                                elevation="1"
                                @click="selectedEquipment(item)"
                                >เลือก</v-btn
                              >
                            </td>
                          </tr>
                        </template>
                      </v-data-table>
                    </v-row>
                  </v-col>

                  <!-- อุปกรณ์ที่เลือก -->
                  <v-col lg="6" md="6" sm="12" cols="12">
                    <v-row class="no-gutters">
                      <v-data-table
                        :headers="headers_SetEquipment_select_item"
                        :items="SetEquipment_selected_items"
                        :items-per-page="10"
                        hide-default-header
                        class="elevation-1"
                      >
                        <template v-slot:item="{ item }">
                          <tr>
                            <td>{{ item.name }}</td>
                            <td>
                              <v-btn
                                small
                                elevation="1"
                                @click="DeleteEquipment(item)"
                                >ลบ</v-btn
                              >
                            </td>
                          </tr>
                        </template>

                        ></v-data-table
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-tab-item>
            </v-tabs>

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
      

    <!-- ชื่อแพ็คเกจ
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
    </v-card> -->
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "CreateEquipment",

  data: () => ({
    links: [
      { text: "ข้อมูลแพ็กเกจ", route: "/CreatePackage" },
      { text: "อุปกรณ์แพ็กเกจ", route: "/CreatePackageSelectEquipment" },
    ],

    Package_Name: "",
    price: null,
    Savoryfood_amount: null,
    Dessert_amount: null,
    Drinks_amount: null,
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

<style scoped></style>
