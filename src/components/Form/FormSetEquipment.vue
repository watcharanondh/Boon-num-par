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
                  mobile-breakpoint="0"
                  class="elevation-1"
                >
                  <template v-slot:item="{ item }">
                  <tr>
                    <td>{{item.name}}</td>
                    <td class="info--text">{{item.stock_in}}</td>
                    <td><v-btn color="success" small elevation="1" @click="selectedAddSetEquipment(item)">เพิ่ม</v-btn></td>
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
                  mobile-breakpoint="0"
                  class="elevation-1"
                >
                  <template v-slot:item="{ item }">
                  <tr>
                    <td>{{item.name}}</td>
                    <td class="info--text">{{ item.quantity }}</td>
                    <td ><v-btn color="error" small elevation="1" @click="DeleteSetEquipment(item)">ลบ</v-btn></td>
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

 data() {
    return {
      quantity: 1 ,
 

  // data: () => ({
    CreateorEdit: null,
    searchSetEquipment:'',
    SetEquipmentEdit_id: null,
    editedIndex: -1,

    arrayOrder:[],

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
      { text: "จำนวนในคลัง", value: "stock_in", sortable: false, align: "start", color: "black"},
      { text: "", value: "", sortable: false, align: "start", color: "black"},
    ],
    //รายการอุปกรณ์ที่เลือก
    SetEquipment_selected_items: [],
    headers_SetEquipment_select_item: [
      { text: "รายการอุปกรณ์ที่เลือก", value: "name", sortable: false, align: "start", color: "black"},
      { text: "จำนวนที่จะใช้", value: "quantity", sortable: false, align: "start", color: "black"},
      { text: "", value: "", sortable: false, align: "start", color: "black"},
    ],
    };
  },
 
 // }),

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
            this.SetEquipment_table_selectd_total = this.SetEquipment_selected_items.length

        let DataSeleted = result.data.result[0].equipment_set_equipments
        this.SetEquipment_selected_items=DataSeleted.map( val =>{
              return {id:val.id ,name:val.name ,quantity:val.amount}
        })
      }
    },


    selectedAddSetEquipment(item){
      var items = this.SetEquipment_selected_items.find(val => val.id == item.id);
      if (items){
          this.SetEquipment_selected_items.map(val=>{
            if (items.id == val.id) {
                if(  val.quantity < items.stock_in)
                    //console.log('มีจะเข้านี้');
                      val.quantity++
                  }
          })
      }else{
          //console.log('ไม่มีจะเข้านี้');
          this.SetEquipment_selected_items.push({id:item.id ,name:item.name ,stock_in:item.stock_in ,quantity:1})
      
      }
    },
    DeleteSetEquipment(item){
        var items = this.SetEquipment_selected_items.find(val => val.id == item.id);
      if (items){
          this.SetEquipment_selected_items.map(val=>{
            if (items.id == val.id) {
               if(val.quantity > 1){
                      val.quantity--
               }else{
                  this.editedIndex = this.SetEquipment_selected_items.indexOf(item)
                  this.SetEquipment_selected_items.splice(this.editedIndex, 1)
                  this.SetEquipment_table_selectd_total = this.SetEquipment_selected_items.length
              }    
            }
          })
      }
    },
    
    async submit() {
      if (this.CreateorEdit == true) {
       let SetEquipment_last = []
       this.SetEquipment_selected_items.forEach(value => {
              SetEquipment_last.push({
              id: `${value.id}`,
              amount: `${value.quantity}`,
        });
       });
        let DataNewSetEquipment = {
          name: this.SetEquipment_Name,
          equip_in_equipset: SetEquipment_last,
        }
        let result = await api.addSetEquipment(DataNewSetEquipment);
        //console.log(result);
        if (result.data.response == "OK") {
          this.$swal.fire("Success", 'บันทึกชุดอุปกรณ์เรียบร้อยแล้ว', "success");
          this.$router.push("/SetEquipment");
        }else{
          this.$swal.fire("error", `บันทึกชุดอุปกรณ์ไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `, "error");
        }

      } else {
      let SetEquipment_Edit = []
       this.SetEquipment_selected_items.forEach(value => {
              SetEquipment_Edit.push({
              id: `${value.id}`,
              amount: `${value.quantity}`,
        });
       });
        let DataEditSetEquipment = {
          id: this.SetEquipment_ID,
          name: this.SetEquipment_Name,
          equip_in_equipset: SetEquipment_Edit,
        };
        let result = await api.editSetEquipment(DataEditSetEquipment);
        //console.log(result);
        if (result.data.response == "OK") {
          this.$swal.fire("Success", 'แก้ไขชุดอุปกรณ์เรียบร้อยแล้ว', "success");
          this.$router.push("/SetEquipment");
        }else{
          this.$swal.fire("error", `แก้ไขชุดอุปกรณ์ไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `, "error");
        }
      }
    },
  },
};
</script>

<style scoped></style>
