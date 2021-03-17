<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            ตารางงาน
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <!-- ค้นหา -->
    <v-row>
      <!-- <v-col sm="3" cols="12">
        <v-text-field
          v-model="search"
          label="ค้นหา"
          dense
          solo
          outlined
          readonly
          clearable
        ></v-text-field>
      </v-col> -->

      <v-col>
        <v-row class="mt-1 mr-1" justify="end">
          <!-- สร้างผู้ใช้งาน -->
          <v-dialog
            v-model="dialogCreatePosition"
            :retain-focus="false"
            transition="dialog-top-transition"
            persistent
            width="25%"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="#29CC97" rounded>
                <span class="white--text">เพิ่มตำแหน่งงาน</span>
              </v-btn>
            </template>

            <v-card>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-head-title">
                      จัดทีม
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-sub-title">
                      ชื่อตำแหน่ง
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="CreatesStaffPosition"
                      clearable>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-sub-title">
                      ตำแหน่ง
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="SelectPositionStaffuser"
                      :items="positionStaffuser"
                      item-text="name"
                      item-value="id"
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-sub-title">
                      รายละเอียดตำแหน่ง
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row class="justify-center">
                  <v-col class="justify-center">
                    <v-text-field
                      v-model="CreateStaffPositionDetail"
                      clearable>
                    </v-text-field>
                    <v-card-actions class="justify-center pa-0 mb-0">
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-btn
                          color="#29CC97"
                          block
                          large
                          rounded
                          @click="CreatePosition()"
                          ><span class=" white--text">อัพเดท</span></v-btn
                        >
                      </v-col>
                    </v-card-actions>
                    <v-card-actions class="justify-center pa-0">
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-btn
                          block
                          large
                          rounded
                          outlined
                          color="warning"
                          @click="dialogCreatePosition = false"
                        >
                          ปิด</v-btn
                        >
                      </v-col>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
          <!-- แก้ไขผู้ใช้งาน -->
          <v-dialog
            v-model="dialogEditPosition"
            :retain-focus="false"
            transition="dialog-top-transition"
            persistent
            width="25%"
          >
            <v-card>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-head-title">
                      จัดทีม
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-sub-title">
                      ชื่อตำแหน่ง
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="EditStaffPosition"
                      clearable>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
                            <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-sub-title">
                      ตำแหน่ง
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-select
                      v-model="SelectPositionStaffuser"
                      :items="positionStaffuser"
                      item-text="name"
                      item-value="id"
                    >
                    </v-select>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-sub-title">
                      รายละเอียดตำแหน่ง
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row class="justify-center">
                  <v-col class="justify-center">
                    <v-text-field
                      v-model="EditStaffPositionDetail"
                      clearable>
                    </v-text-field>
                    <v-card-actions class="justify-center pa-0 mb-0">
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-btn
                          color="#29CC97"
                          block
                          large
                          rounded
                          @click="EditPosition()"
                          ><span class=" white--text">อัพเดท</span></v-btn
                        >
                      </v-col>
                    </v-card-actions>
                    <v-card-actions class="justify-center pa-0">
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-btn
                          block
                          large
                          rounded
                          outlined
                          color="warning"
                          @click="dialogEditPosition = false"
                        >
                          ปิด</v-btn
                        >
                      </v-col>
                    </v-card-actions>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-row>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- รายชื่อที่ออกงาน -->
        <v-card>
          <v-data-table
            :search="search"
            :headers="headers_table_positionmanager"
            :items="table_positionmanager_item"
            class="elevation-1"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span class="header-table-title">รายชื่อที่งาน</span></v-toolbar-title>
                <v-toolbar-title><span class="order">{{ total }}</span></v-toolbar-title>
                <v-spacer></v-spacer>
                <!--   <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  prepend-inner-icon="mdi-magnify"
                  label="ค้นหาชื่อลูกค้าบุคคล/บริษัท"
                  single-line
                  hide-details
                ></v-text-field> -->
              </v-toolbar>
            </template>
            <template v-slot:item="{ item }">
              <tr>
                <td>
                  {{ item.position_code }}
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.position_name }}
                </td>
                <td>
                  <v-row>
                    <v-btn
                      @click="MonitorPositionmanager(item)"
                      fab
                      icon
                      outlined
                      small
                    >
                      <v-icon>visibility</v-icon>
                    </v-btn>
                    <v-btn @click="EditPositionmanager(item)" fab icon outlined small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      @click="DeletePositionmanager(item)" fab icon outlined small>
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-row>
                </td>
                <td>
                  <!-- <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn> -->
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Staffposittionmanger",
  mounted() {
    this.loadStaffposittionmanger();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },
  data: () => ({
    dialogCreatePosition: false,
    dialogEditPosition: false,

    CreatesStaffPosition:null,
    CreateStaffPositionDetail:null,
    EditStaffPosition:null,
    EditStaffPositionDetail:null,
    SelectPositionStaffuser:null,
    positionStaffuser:[],

    EditStaffPositionID:null,

    search: "",
    total: null,
    table_positionmanager_item: [],
    headers_table_positionmanager: [
      { text: "รหัสงาน", value: "user_code", sortable: false, align: "start" },
      { text: "ชื่อตำแหน่งงาน", value: "name", sortable: false, align: "start",},
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],
  }),

  methods: {
    async loadStaffposittionmanger() {
      let result = await api.getListallstaffpositionuser();
      // console.log('ข้อมูลposition',result);
      this.table_positionmanager_item = result.data.result;
      this.total = result.data.total;
      let resultposition = await api.getListsetinmodalstaffpositionuser();
      //console.log('ข้อมูลตำแหน่งposition',resultposition.data.result);
      this.positionStaffuser = resultposition.data.result
      let position = resultposition.data.result[0]
      this.SelectPositionStaffuser=position.id
    },

  async MonitorPositionmanager(item){
      console.log(item.id);
    },

  async CreatePosition(){
        let CreatePositionID = {name:this.CreatesStaffPosition ,description:this.CreateStaffPositionDetail ,role_id:this.SelectPositionStaffuser }
        //console.log('resultCreatePositionID',CreatePositionID);
        let result = await api.addstaffpositionuser(CreatePositionID);
        // console.log('resultCreatePositionID',result);
        if (result.data.response == "OK") {
          this.loadStaffposittionmanger();
          this.CreatesStaffPosition=null;
          this.CreateStaffPositionDetail=null;
          this.$swal.fire("สร้างตำแหน่งใหม่เรียบร้อย", "", "success");
          this.dialogCreatePosition=false
         }else{
          this.$swal.fire(
              "สร้างสมาชิกไม่สำเร็จ",
              `เนื่องจาก ${result.data.response} ${result.data.result} `,
              "error"
            );
        }  
  },


  async EditPositionmanager(item){
        let EditStaffusermanagerIDs = { id: item.id };
        //console.log('id to edit',EditStaffusermanagerIDs);
        this.EditStaffPositionID = item.id
        let result = await api.getEditstaffpositionuser(EditStaffusermanagerIDs);
        //console.log('resultEditStaffusermanager',result);
        if (result.data.response == "OK") {
          this.EditStaffusermanagerID = result.data.result.id;
          this.EditStaffPosition = result.data.result.name;
          this.EditStaffPositionDetail = result.data.result.description;
          // this.EditStaffPositionDetail = result.data.result.position_code;
          this.SelectPositionStaffuser = result.data.result.role_id;
          this.dialogEditPosition=true
        }  
    },

      async EditPosition(){
        let EditStaffusermanagerIDs = {id:this.EditStaffusermanagerID, name:this.EditStaffPosition, description:this.EditStaffPositionDetail, role_id:this.SelectPositionStaffuser}
        // console.log(EditStaffusermanagerIDs);
        let result = await api.editstaffpositionuser(EditStaffusermanagerIDs);
        if (result.data.response == "OK") {
          this.loadStaffposittionmanger();
          this.EditStaffPosition=null;
          this.EditStaffPositionDetail=null;
          this.$swal.fire("แก้ไขตำแหน่งเรียบร้อย", "", "success");
          this.dialogEditPosition=false
        }  
  },

    async DeletePositionmanager(item) {
      this.$swal
        .fire({
          title: `ต้องการลบตำแหน่งรายนี้ใช่หรือไม่ ?`,
          showDenyButton: true,
          confirmButtonText: `ยืนยัน`,
          denyButtonText: `ยกเลิก`
        })
        .then(async result => {
          if (result.isConfirmed) {
            let delPosition = { id: item.id };
            let resultdel = await api.delstaffpositionuser(delPosition);
            if (resultdel.data.response == "OK") {
              this.$swal.fire("ยืนยันการลบเรียบร้อย", "", "success");
              this.loadStaffposittionmanger();
            }
          } else if (result.isDenied) {
            this.$swal.fire("ยกเลิกการลบ", "", "error");
          }
        });
    },

    // async test(item) {
    //   //console.log(item);
    //   await this.$store.dispatch({
    //     type: "setBNPDATA",
    //     bnpdata: item.quotation_code,
    //   });
    //   await this.$router.push({ name: "menuJobExplorearea" });
    // },
  },
};
</script>

<style scoped></style>
