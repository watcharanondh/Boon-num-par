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
          <v-tabs v-model="tab" left color="black">
            <v-tab href="#tab-1">
              ข้อมูลแพ็คเกจ
            </v-tab>
            <v-tab href="#tab-2">
              อุปกรณ์แพ็กเกจ
            </v-tab>
            <v-tab-item value="tab-1">
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
                          v-model="Package_price"
                          type="number"
                          min="1"
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
                          min="1"
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
                          min="1"
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
                          min="1"
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
              <v-row>
                <v-col cols="3">
                  <v-btn
                    block
                    large
                    rounded
                    outlined
                    @click="$router.push('/Package')"
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
                    @click="changetoTab2()"
                    ><span class="white--text">ถัดไป</span></v-btn
                  >
                </v-col>
              </v-row>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <!-- สร้างชื่อรายการชุดอุปกรณ์ -->
              <!-- <v-row>
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
                </v-row> -->

              <!-- รายการอุปกรณ์ -->
              <v-row>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <h3>รายการอุปกรณ์</h3>
                    <span class="text-caption grey--text mt-2">{{Equipment_table_all_total}} รายการ</span>
                  </v-row>
                </v-col>

                <!-- อุปกรณ์ที่เลือก -->
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <h3>อุปกรณ์ที่เลือก</h3>
                    <span class="text-caption grey--text mt-2">{{Equipment_table_selected_total}} รายการ</span>
                  </v-row>
                </v-col>
              </v-row>

              <!-- รายการอุปกรณ์ -->
              <v-row>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <v-data-table
                      :headers="headers_equipment_data"
                      :items="equipment_data_items"
                      :items-per-page="10"
                      hide-default-header
                      class="elevation-1"
                    >
                      <template v-slot:item="{ item }">
                          <tr>
                            <td>{{ item.name }}</td>
                            <td>
                              <v-btn small elevation="1" @click="selectedEquipment(item)" >เลือก</v-btn>
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
                      :headers="headers_equipment_selected_data"
                      :items="equipment_selected_items"
                      :items-per-page="10"
                      hide-default-header
                      class="elevation-1"
                    >
                      <template v-slot:item="{ item }">
                          <tr>
                            <td>{{ item.name }}</td>
                            <td>
                              <v-btn small elevation="1" @click="DeleteEquipment(item)"  >ลบ</v-btn>
                            </td>
                          </tr>
                        </template>
                    </v-data-table>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-btn block large rounded outlined @click="changetoTab1()"
                    >ย้อนกลับ</v-btn
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
                    @click="submit"
                    ><span class="white--text">{{Changesubmit}}</span></v-btn
                  >
                </v-col>
              </v-row>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "FormPackage",
  props:['CreateorEdittype'],

  created() {
    this.loadData();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },

  data: () => ({
    tab: "tab-1",
    Package_Name: "",
    Package_price: null,
    Savoryfood_amount: null,
    Dessert_amount: null,
    Drinks_amount: null,
    package_equipset_ID:[],

    Editpackage_ID: null,
    searchPackage: "",

    Equipment_table_all_total:0,
    Equipment_table_selected_total:0,

    equipment_data_items: [],
    headers_equipment_data: [
      {text: "",value: "name",sortable: false,align: "start",color: "black", },
      {text: "",value: "",sortable: false,align: "start",color: "black",},
      { text: "", value: "", sortable: false, align: "start", color: "black" },
    ],

    equipment_selected_items: [],
    headers_equipment_selected_data: [
      { text: "",value: "name",sortable: false,align: "start",color: "black",},
      { text: "",value: "",sortable: false,align: "start",color: "black",},
      { text: "", value: "", sortable: false, align: "start", color: "black" },
    ],
  }),
  computed: {
    Changesubmit() {
      return this.CreateorEdit == true ? "บันทึก" : "แก้ไข";
    },
  },

  methods: {
    changetoTab1() {
      this.tab = "tab-1";
    },
    changetoTab2() {
      this.tab = "tab-2";
    },
    async loadData() {
      this.CreateorEdit = this.CreateorEdittype;
      if (this.CreateorEdit == true) {
        let result = await api.getlistEquipmentToPackage();
        this.equipment_data_items=result.data.result
        this.Equipment_table_all_total= this.equipment_data_items.length
      }else{
        let res = await api.getlistEquipmentToPackage();
        this.equipment_data_items=res.data.result
        this.Equipment_table_all_total= this.equipment_data_items.length
        let EditPackageID = {id:this.$store.getters["Newpersonal_BNP_ID"].BNP_ID}
        let result = await api.getEditPackage(EditPackageID);
        this.Editpackage_ID = result.data.result[0].id,
        this.Package_Name = result.data.result[0].name,
        this.Package_price = result.data.result[0].price,
        this.Savoryfood_amount = result.data.result[0].amount_savory_food,
        this.Dessert_amount= result.data.result[0].amount_sweet_food,
        this.Drinks_amount= result.data.result[0].amount_drink,
        this.equipment_selected_items=result.data.result[0].package_equipment_sets
        let DataSeleted = result.data.result[0].package_equipment_sets
        this.package_equipset_ID=DataSeleted.map( val =>{
          return val.id
        })
        let total =result.data.result[0].package_equipment_sets
        this.Equipment_table_selected_total = total.length

      }
    },

    selectedEquipment(item){
        this.equipment_selected_items.push(item)
        this.editedIndex = this.equipment_data_items.indexOf(item)
        this.equipment_data_items.splice(this.editedIndex, 1)
        this.Equipment_table_all_total = this.equipment_data_items.length
        this.Equipment_table_selected_total = this.equipment_selected_items.length
        let DataSeleted =item.id
        this.package_equipset_ID.push(DataSeleted)

    },
    DeleteEquipment(item){
        this.editedIndex = this.equipment_selected_items.indexOf(item)
        this.equipment_selected_items.splice(this.editedIndex, 1)
        this.equipment_data_items.push(item)
        this.Equipment_table_all_total = this.equipment_data_items.length
        this.Equipment_table_selected_total = this.equipment_selected_items.length
        let DelSeleted =item.id
        this.package_equipset_ID.pop(DelSeleted)

    },


    async submit() {
      //สร้างแพ็กเก็จ
      if (this.CreateorEdittype == true) {
        let CreateNewPackage = {
          name: this.Package_Name,
          price: this.Package_price,
          amount_savory_food: this.Savoryfood_amount,
          amount_sweet_food: this.Dessert_amount,
          amount_drink: this.Drinks_amount,
          package_equipset: this.package_equipset_ID,
        };
        let resultCreateNewPackage = await api.addPackage(CreateNewPackage);
        if (resultCreateNewPackage.data.response == "OK") {
          alert("สร้างแพ็กเก็จสำเร็จเรียบร้อยแล้ว");
          this.$router.push("/Package");
        } else {
          alert("สร้างแพ็กเก็จราคาไม่สำเร็จ");
        }
      } else {
        //แก้ไขแพ็กเก็จ
        let EditPackage = {
          id: this.Editpackage_ID,
          name: this.Package_Name,
          price: this.Package_price,
          amount_savory_food: this.Savoryfood_amount,
          amount_sweet_food: this.Dessert_amount,
          amount_drink: this.Drinks_amount,
          package_equipset: this.package_equipset_ID,
        };
        let resultEditPackage = await api.editPackage(EditPackage);
        if (resultEditPackage.data.response == "OK") {
          alert("แก้ไขแพ็กเก็จราคาสำเร็จเรียบร้อยแล้ว");
          this.$router.push("/Package");
        } else {
          alert("แก้ไขแพ็กเก็จราคาไม่สำเร็จ");
        }
      }
    },
  },
};
</script>

<style scoped></style>
