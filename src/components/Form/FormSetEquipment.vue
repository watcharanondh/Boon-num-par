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
              </v-col>
            </v-row>
        <!-- สร้างชื่อรายการชุดอุปกรณ์ -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-row class="no-gutters">
                <div class="sizehead">สร้างชื่อรายการชุดอุปกรณ์</div>
                <v-text-field
                  v-model="SetEquipment_Name"
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
                <span class="text-caption grey--text mt-2">{{SetEquipment_table_all_total}} รายการ</span>
              </v-row>
            </v-col>

            <!-- อุปกรณ์ที่เลือก -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <v-row class="no-gutters">
                <h3>อุปกรณ์ที่เลือก</h3>
                <span class="text-caption grey--text mt-2">{{SetEquipment_table_selectd_total}} รายการ</span>
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
                  
                  class="elevation-1"
                >
                  <template v-slot:item="{ item }">
                  <tr>
                    <td>{{item.name}}</td>
                    <!-- <td>{{ counter }}</td> -->
                    <td><v-btn small elevation="1" @click="selectedSetEquipment(item)">เพิ่ม</v-btn></td>
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
                    <!-- <td>{{item.stock_in}}</td> -->
                    <td><v-btn small elevation="1" @click="DeleteSetEquipment(item)">ลบ</v-btn></td>
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
    counter: 0,

    SetEquipment_ID:null,
    SetEquipment_Name: null,
    SetEquipment_Stock: null,
    SetEquipment_Stock_IN:[],

    SetEquipment_table_all_total:0,
    SetEquipment_table_selectd_total:0,

    //รายการอุปกรณ์
    SetEquipment_table_item: [],
    headers_SetEquipment_table_item: [
      { text: "ชุดอุปกรณ์", value: "name", sortable: false, align: "start", color: "black"},
      { text: "จำนวน", value: "stock_in", sortable: false, align: "start", color: "black"},
      { text: "", value: "", sortable: false, align: "start", color: "black"},
    ],
    //รายการอุปกรณ์ที่เลือก
    SetEquipment_selected_items: [],
    headers_SetEquipment_select_item: [
      { text: "รายการอุปกรณ์ที่เลือก", value: "name", sortable: false, align: "start", color: "black"},
      { text: "จำนวน", value: "stock_in", sortable: false, align: "start", color: "black"},
      { text: "", value: "", sortable: false, align: "start", color: "black"},
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
        this.SetEquipment_table_all_total = this.SetEquipment_table_item.length
        this.SetEquipment_table_selectd_total = this.SetEquipment_selected_items.length
      }else{
        let res = await api.getSetEquipmentmini();
        this.SetEquipment_table_item=res.data.result
        this.SetEquipment_table_all_total = this.SetEquipment_table_item.length
        let EditSetEquipmentID = {id:this.$store.getters["Newpersonal_BNP_ID"].BNP_ID}
        let result = await api.getEditSetEquipmentmini(EditSetEquipmentID);
            this.SetEquipment_ID = result.data.result[0].id
            this.SetEquipment_Name=result.data.result[0].name
            this.SetEquipment_selected_items=result.data.result[0].equipment_set_equipments
            this.SetEquipment_table_selectd_total = this.SetEquipment_selected_items.length
        let DataSeleted = result.data.result[0].equipment_set_equipments
        this.SetEquipment_Stock_IN=DataSeleted.map( val =>{
              return {id:val.id,amount:val.amount}
        })
      }
    },

    amountEquipment(item){
        return  this.test =item.stock_in
    },

    selectedSetEquipment(item){
        //this.counter= item.stock_in
        //this.counter++;
        this.SetEquipment_selected_items.push(item)
        this.editedIndex = this.SetEquipment_table_item.indexOf(item)
        // this.SetEquipment_table_item.splice(this.editedIndex, 1)
        this.SetEquipment_table_selectd_total = this.SetEquipment_selected_items.length
        let idSEq = item.id
        let amoutSEq = 10
        let DataSeleted ={id:idSEq,amount:amoutSEq}
        this.SetEquipment_Stock_IN.push(DataSeleted)
    },
    DeleteSetEquipment(item){
        this.editedIndex = this.SetEquipment_selected_items.indexOf(item)
        this.SetEquipment_selected_items.splice(this.editedIndex, 1)
        this.SetEquipment_table_item.push(item)
        this.SetEquipment_table_selectd_total = this.SetEquipment_selected_items.length
    },
    

    async submit() {
      if (this.CreateorEdit == true) {
        let DataNewSetEquipment = {
          name: this.SetEquipment_Name,
          equip_in_equipset: this.SetEquipment_Stock_IN,
        };
        let result = await api.addSetEquipment(DataNewSetEquipment);
        console.log(result);
        if (result.data.response == "OK") {
          alert("บันทึกชุดอุปกรณ์เรียบร้อยแล้ว");
          this.$router.push("/SetEquipment");
        }
      } else {
        let DataEditSetEquipment = {
          id: this.SetEquipment_ID,
          name: this.SetEquipment_Name,
          equip_in_equipset: this.SetEquipment_Stock_IN,
        };
        console.log(DataEditSetEquipment);
        let result = await api.editSetEquipment(DataEditSetEquipment);
        console.log(result);
        if (result.data.response == "OK") {
          alert("แก้ไขชุดอุปกรณ์เรียบร้อยแล้ว");
          this.$router.push("/SetEquipment");
        }
      }
    },
  },
};
</script>

<style scoped></style>
