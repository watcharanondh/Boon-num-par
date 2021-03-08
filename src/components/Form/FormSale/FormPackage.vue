<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            สร้างแพ็คเกจ
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class=" mx-10 pa-5 rounded-lg" outlined>
      <v-row justify="center">
        <v-col lg="9" md="9" sm="12" cols="12">
          <!-- Tap เมนู ข้อมูลแพ็คเกจ -->
          <v-tabs v-model="tab" left color="black">
            <v-tab class="h-package" href="#tab-1">
              ข้อมูลแพ็คเกจ
            </v-tab>
            <v-tab class="h-package" href="#tab-2">
              อุปกรณ์แพ็กเกจ
            </v-tab>
            <v-tab-item value="tab-1">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-card flat>
                  <v-card-text class="s-package">
                    <v-row>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <div>ชื่อแพ็คเกจ</div>
                        <v-row class="no-gutters">
                          <v-text-field
                            v-model="Package_Name"
                            :rules="package_nameRules"
                            dense
                            solo
                            outlined
                            clearable
                          ></v-text-field>
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <div>ราคา</div>
                        <v-row class="no-gutters">
                          <v-text-field
                            v-model="Package_price"
                            :rules="package_amountRules"
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
                        <div>จำนวนอาหารคาว</div>
                        <v-row class="no-gutters">
                          <v-text-field
                            v-model="Savoryfood_amount"
                            :rules="package_savoryfood_amountRules"
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
                        <div>จำนวนอาหารหวาน</div>
                        <v-row class="no-gutters">
                          <v-text-field
                            v-model="Dessert_amount"
                            :rules="package_sweetfood_amountRules"
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
                        <div>จำนวนเครื่องดื่ม</div>
                        <v-row class="no-gutters">
                          <v-text-field
                            v-model="Drinks_amount"
                            :rules="package_drink_amountRules"
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
                  <v-col xl="3" lg="3" md="6" sm="12" cols="12">
                    <v-btn
                      block
                      large
                      rounded
                      outlined
                      @click="$router.push({ name: 'salePackage' })"
                      >ยกเลิก</v-btn
                    >
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col xl="3" lg="3" md="6" sm="12" cols="12">
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
              </v-form>
            </v-tab-item>
            <v-tab-item value="tab-2">
              <!-- รายการอุปกรณ์ -->
              <v-row>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <h3>รายการอุปกรณ์</h3>
                    <span class="order mt-2">{{ Equipment_table_all_total }} รายการ</span
                    >
                  </v-row>

                  <!-- รายการอุปกรณ์ -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" cols="12">
                      <v-row class="no-gutters">
                        <v-data-table
                          :headers="headers_equipment_data"
                          :items="equipment_data_items"
                          :items-per-page="10"
                          mobile-breakpoint="0"
                          class="elevation-1"
                        >
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.name }}</td>
                              <td class="info--text">
                                {{ item.stock_balance }}
                              </td>
                              <td>
                                <v-btn
                                  small
                                  elevation="1"
                                  color="success"
                                  @click="selectedAddEquipment(item)"
                                  >เพิ่ม</v-btn
                                >
                              </td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- อุปกรณ์ที่เลือก -->
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <h3>อุปกรณ์ที่เลือก</h3>
                    <span class="order mt-2"
                      >{{ Equipment_table_selected_total }} รายการ</span
                    >
                  </v-row>

                  <!-- อุปกรณ์ที่เลือก -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" cols="12">
                      <v-row class="no-gutters">
                        <v-data-table
                          :headers="headers_equipment_selected_data"
                          :items="equipment_selected_items"
                          :items-per-page="10"
                          hide-default-footer
                          mobile-breakpoint="0"
                          class="elevation-1"
                        >
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.name }}</td>
                              <td width="32%" class="info--text pt-6">
                                <v-text-field
                                  v-model="item.amount"
                                  type="number"
                                  :max="item.stock_balance"
                                  min="1"
                                  small
                                  dense
                                  solo
                                  outlined
                                ></v-text-field>
                              </td>
                              <td>
                                <v-btn
                                  small
                                  elevation="1"
                                  color="error"
                                  @click="DeleteEquipment(item)"
                                  >ลบ</v-btn
                                >
                              </td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>

              <v-row>
                <v-col xl="3" lg="3" md="6" sm="12" cols="12">
                  <v-btn block large rounded outlined @click="changetoTab1()"
                    >ย้อนกลับ</v-btn
                  >
                </v-col>
                <v-spacer></v-spacer>
                <v-col xl="3" lg="3" md="6" sm="12" cols="12">
                  <v-btn
                    block
                    color="#29CC97"
                    dark
                    large
                    rounded
                    @click="submit"
                    ><span class="white--text">{{ Changesubmit }}</span></v-btn
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
  props: ["CreateorEdittype"],

  created() {
    this.loadData();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path
    });
  },

  data: () => ({
    valid: true,
    tab: "tab-1",
    Package_Name: "",
    Package_price: null,
    Savoryfood_amount: null,
    Dessert_amount: null,
    Drinks_amount: null,
    package_equipset_ID: [],

    Editpackage_ID: null,
    searchPackage: "",

    Equipment_table_all_total: 0,
    Equipment_table_selected_total: 0,

    equipment_data_items: [],
    headers_equipment_data: [
      {
        text: "ชื่ออุปกรณ์",
        value: "name",
        sortable: false,
        align: "start",
        color: "black"
      },
      {
        text: "จำนวน",
        value: "stock_balance",
        sortable: false,
        align: "start",
        color: "black"
      },
      { text: "", value: "", sortable: false, align: "start", color: "black" }
    ],

    equipment_selected_items: [],
    headers_equipment_selected_data: [
      {
        text: "ชื่ออุปกรณ์",
        value: "name",
        sortable: false,
        align: "start",
        color: "black"
      },
      {
        text: "จำนวน",
        value: "stock_balance",
        sortable: false,
        align: "start",
        color: "black"
      },
      { text: "", value: "", sortable: false, align: "start", color: "black" }
    ],

    package_nameRules: [v1 => !!v1 || "กรุณากรอกชื่อแพ็คเกจ"],
    package_amountRules: [v1 => !!v1 || "กรุณากรอกราคาแพ็คเกจ"],
    package_savoryfood_amountRules: [v1 => !!v1 || "กรุณากรอกจำนวนอาหารคาว"],
    package_sweetfood_amountRules: [v1 => !!v1 || "กรุณากรอกจำนวนอาหารหวาน"],
    package_drink_amountRules: [v1 => !!v1 || "กรุณากรอกจำนวนเครื่องดื่ม"]
  }),
  computed: {
    Changesubmit() {
      return this.CreateorEdit == true ? "บันทึก" : "แก้ไข";
    }
  },

  methods: {
    changetoTab1() {
      this.tab = "tab-1";
    },
    changetoTab2() {
      if (this.$refs.form.validate() == true) {
        this.tab = "tab-2";
      }
    },
    //  increment () {
    //   this.item.amount = parseInt(this.item.amount,10) + 1
    //    append-outer-icon="add"
    //   @click:append-outer="increment(item)"
    // },
    // decrement () {
    //   this.item.amount = parseInt(this.item.amount,10) - 1
    //   prepend-icon="remove"
    //   @click:prepend="decrement(item)"
    // },
    async loadData() {
      this.CreateorEdit = this.CreateorEdittype;
      if (this.CreateorEdit == true) {
        let result = await api.getlistEquipmentToPackage();
        //console.log(result);
        this.equipment_data_items = result.data.result;
        this.Equipment_table_all_total = this.equipment_data_items.length;
      } else {
        let res = await api.getlistEquipmentToPackage();
        this.equipment_data_items = res.data.result;
        this.Equipment_table_all_total = this.equipment_data_items.length;
        let EditPackageID = {
          package_code: this.$store.getters["Newpersonal_BNP_ID"].BNP_ID
        };
        let result = await api.getEditPackage(EditPackageID);
        if (!result.data.result.length) {
          window.location.href = `${process.env.VUE_APP_SUB_PATH}/sale/Package`;
          //this.$router.push({name:'Package'})
          return;
        }
        (this.Editpackage_ID = result.data.result[0].package_code),
          (this.Package_Name = result.data.result[0].name),
          (this.Package_price = result.data.result[0].price),
          (this.Savoryfood_amount = result.data.result[0].amount_savory_food),
          (this.Dessert_amount = result.data.result[0].amount_sweet_food),
          (this.Drinks_amount = result.data.result[0].amount_drink);

        let Data_Seleted_Edit_Equipment =
          result.data.result[0].package_equipments;
        this.equipment_selected_items = Data_Seleted_Edit_Equipment.map(val => {
          return {
            equipment_code: val.equipment_code,
            name: val.name,
            stock_balance: val.stock_balance,
            amount: val.amount
          };
        });
        let total = result.data.result[0].package_equipments;
        this.Equipment_table_selected_total = total.length;
      }
    },

    selectedAddEquipment(item) {
      var items = this.equipment_selected_items.find(
        val => val.equipment_code == item.equipment_code
      );
      if (items) {
        this.equipment_selected_items.map(val => {
          if (items.equipment_code == val.equipment_code) {
            if (val.amount < item.stock_balance) {
              //console.log('มีจะเข้านี้');
              val.amount++;
            }
          }
        });
      } else {
        //console.log('ไม่มีจะเข้านี้');
        this.equipment_selected_items.push({
          equipment_code: item.equipment_code,
          name: item.name,
          stock_balance: item.stock_balance,
          amount: 1
        });
      }
      this.Equipment_table_selected_total = this.equipment_selected_items.length;
    },

    DeleteEquipment(item) {
      this.editedIndex = this.equipment_selected_items.indexOf(item);
      this.equipment_selected_items.splice(this.editedIndex, 1);
      this.Equipment_table_selected_total = this.equipment_selected_items.length;
    },

    async submit() {
      //สร้างแพ็กเก็จ
      if (this.CreateorEdittype == true) {
        let Equipment_last = [];
        this.equipment_selected_items.forEach(value => {
          Equipment_last.push({
            equipment_code: `${value.equipment_code}`,
            amount: `${value.amount}`
          });
        });
        let CreateNewPackage = {
          name: this.Package_Name,
          price: this.Package_price,
          amount_savory_food: this.Savoryfood_amount,
          amount_sweet_food: this.Dessert_amount,
          amount_drink: this.Drinks_amount,
          package_equips: Equipment_last
        };
        let resultCreateNewPackage = await api.addPackage(CreateNewPackage);
        if (resultCreateNewPackage.data.response == "OK") {
          this.$swal.fire(
            "สำเร็จ",
            "สร้างแพ็กเก็จสำเร็จเรียบร้อยแล้ว",
            "success"
          );
          this.$router.push({ name: "salePackage" });
        } else {
          this.$swal.fire(
            "เกิดข้อผิดพลาด",
            `สร้างแพ็กเก็จไม่สำเร็จ ${resultCreateNewPackage.data.response} เนื่องจาก ${resultCreateNewPackage.data.result} `,
            "error"
          );
        }
      } else {
        //แก้ไขแพ็กเก็จ
        let Equipment_last = [];
        this.equipment_selected_items.forEach(value => {
          Equipment_last.push({
            equipment_code: `${value.equipment_code}`,
            amount: `${value.amount}`
          });
        });
        let EditPackage = {
          package_code: this.Editpackage_ID,
          name: this.Package_Name,
          price: this.Package_price,
          amount_savory_food: this.Savoryfood_amount,
          amount_sweet_food: this.Dessert_amount,
          amount_drink: this.Drinks_amount,
          package_equips: Equipment_last
        };
        //console.log(EditPackage);
        let resultEditPackage = await api.editPackage(EditPackage);
        if (resultEditPackage.data.response == "OK") {
          this.$swal.fire(
            "สำเร็จ",
            "แก้ไขแพ็กเก็จสำเร็จเรียบร้อยแล้ว",
            "success"
          );
          this.$router.push({ name: "salePackage" });
        } else {
          this.$swal.fire(
            "เกิดข้อผิดพลาด",
            `แก้ไขแพ็กเก็จไม่สำเร็จ ${resultEditPackage.data.response} เนื่องจาก ${resultEditPackage.data.result} `,
            "error"
          );
        }
      }
    }
  }
};
</script>

<style scoped></style>
