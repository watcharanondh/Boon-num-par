<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">{{ Changesubmit }}รายการชุดอุปกรณ์</div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <!-- รายการชุดอุปกรณ์ -->
        <v-row justify="center">
          <v-col lg="6" md="12" sm="12" cols="12">
            <v-row>
              <v-col>
                <div class="sizetitle">{{ Changesubmit }}รายการชุดอุปกรณ์ </div>
              <input type="text" v-model="SetEquipment_Name">
              </v-col>
            </v-row>
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
                  :headers="headers_SetEquipment_table_item"
                  :items="SetEquipment_table_item"
                  :items-per-page="10"
                  hide-default-header
                  class="elevation-1"
                >
                  <template v-slot:item="{ item }">
                  <tr>
                    <td>{{item.name}}</td>
                    <td><v-btn small elevation="1" @click="selectedEquipment(item)">เลือก</v-btn></td>
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
                    <td>{{item.name}}</td>
                    <td><v-btn small elevation="1" @click="DeleteEquipment(item)">ลบ</v-btn></td>
                  </tr>
                   </template> 

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
                  @click="$router.push('/SetEquipment')"
                  >ยกเลิก</v-btn
                >
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="3">
                <v-btn block color="#29CC97" dark large rounded @click="submit"
                  ><span class="white--text">{{ Changesubmit }}</span></v-btn
                >
              </v-col>
            </v-row>
        </v-col>
    </v-row>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "FormSetEquipment",

  props: [
    "CreateorEdittype",
  ],

   created() {
    this.loadData();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },


  data: () => ({

    CreateorEdit: null,
    searchSetEquipment:'',
    SetEquipmentEdit_id: null,
    editedIndex: -1,
    
    SetEquipment_Name: null,
    SetEquipment_Stock: null,

    //รายการอุปกรณ์
    SetEquipment_table_item: [],
    headers_SetEquipment_table_item: [
      { text: "ชุดอุปกรณ์", value: "name", sortable: false, align: "start", color: "black"},
      { text: "เลือก", value: "", sortable: false, align: "start", color: "black"},
    ],
    //รายการอุปกรณ์ที่เลือก
    SetEquipment_selected_items: [],
    headers_SetEquipment_select_item: [
      { text: "รายการอุปกรณ์ที่เลือก", value: "name", sortable: false, align: "start", color: "black"},
      { text: "ลบ", value: "", sortable: false, align: "start", color: "black"},
    ],
  }),

  computed: {
    Changesubmit() {
      return this.CreateorEdit == true ? "บันทึก" : "แก้ไข";
    },
  },

  methods: {
    async loadData() {
      this.CreateorEdit = this.CreateorEdittype;
      if (this.CreateorEdit == true) {
        let result = await api.getSetEquipmentmini();
        this.SetEquipment_table_item=result.data.result
      }else{
        let result = await api.getEditSetEquipmentmini();
        this.SetEquipment_table_item=result.data.result[0].equipment_set_equipments
      }
    },

    selectedEquipment(item){
        this.SetEquipment_selected_items.push(item)
        this.editedIndex = this.SetEquipment_table_item.indexOf(item)
        this.SetEquipment_table_item.splice(this.editedIndex, 1)
    },
    DeleteEquipment(item){
        this.editedIndex = this.SetEquipment_selected_items.indexOf(item)
        this.SetEquipment_selected_items.splice(this.editedIndex, 1)
        this.SetEquipment_table_item.push(item)
    },
    

    async submit() {
      console.log(this.CreateorEdit);
      if (this.CreateorEdit == true) {
        let DataNewSetEquipment = {
          name: this.SetEquipment_Name,
          stock_in: this.SetEquipment_Stock_IN,
        };
        let result = await api.addSetEquipment(DataNewSetEquipment);
        console.log(result);
        if (result.data.response == "OK") {
          alert("บันทึกอุปกรณ์เรียบร้อยแล้ว");
          this.$router.push("/SetEquipment");
        }
      } else {
        let DataEditSetEquipment = {
          id: this.SetEquipmentEdit_id,
          name: this.SetEquipment_Name,
          stock_in: this.SetEquipment_Stock_IN,
        };
        let result = await api.editSetEquipment(DataEditSetEquipment);
        if (result.data.response == "OK") {
          alert("แก้ไขอุปกรณ์เรียบร้อยแล้ว");
          this.$router.push("/SetEquipment");
        }
      }
    },
  },
};
</script>

<style scoped></style>
