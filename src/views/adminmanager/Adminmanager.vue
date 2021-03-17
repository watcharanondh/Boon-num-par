<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            ตารางรายชื่อ ADMIN
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <!-- ค้นหา -->
    <v-row>
      <v-col sm="3" cols="12">
        <v-text-field
          v-model="search"
          label="ค้นหา"
          dense
          solo
          outlined
          clearable
        ></v-text-field>
      </v-col>

      <v-col>
        <v-row class="mt-1 mr-1" justify="end">
          <!-- สร้างผู้ใช้งาน -->
          <v-dialog
            v-model="dialogCreateAdminuser"
            :retain-focus="false"
            transition="dialog-top-transition"
            persistent
            width="25%"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="#29CC97" rounded>
                <span class="white--text">เพิ่มสมาชิก</span>
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
                      ชื่อ-นามสกุล
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="CreateFullnameAdminuser"
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
                      v-model="SelectPositionAdmin"
                      :items="positionAdmin"
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
                      เบอร์โทรศัพท์
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row class="justify-center">
                  <v-col class="justify-center">
                      <v-text-field-integer
                        v-model="CreatePhoneAdminuser"
                        v-bind:properties="{
                          clearable: true,
                          placeholder: '099-999-9999',
                          required: true,
                        }"
                        v-bind:options="{
                          inputMask: '###-###-####',
                          outputMask: '##########',
                          empty: null,
                          alphanumeric: true,
                        }"
                        class="w-100"
                      />
                    <v-card-actions class="justify-center pa-0 mb-0">
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-btn
                          color="#29CC97"
                          block
                          large
                          rounded
                          @click="CreateAdminuser()"
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
                          @click="dialogCreateAdminuser = false"
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
            v-model="dialogEditAdminuser"
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
                      ชื่อ-นามสกุล
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="EditFullnameAdminuser"
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
                      v-model="SelectPositionAdmin"
                      :items="positionAdmin"
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
                      เบอร์โทรศัพท์
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row class="justify-center">
                  <v-col class="justify-center">
                      <v-text-field-integer
                        v-model="EditPhoneAdminuser"
                        v-bind:properties="{
                          clearable: true,
                          placeholder: '099-999-9999',
                          required: true,
                        }"
                        v-bind:options="{
                          inputMask: '###-###-####',
                          outputMask: '##########',
                          empty: null,
                          alphanumeric: true,
                        }"
                        class="w-100"
                      />
                    <v-card-actions class="justify-center pa-0 mb-0">
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-btn
                          color="#29CC97"
                          block
                          large
                          rounded
                          @click="EditAdminuser()"
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
                          @click="dialogEditAdminuser = false"
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
            :headers="headers_table_adminmanager"
            :items="table_adminmanager_item"
            class="elevation-1"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span class="header-table-title">รายชื่อที่งาน</span></v-toolbar-title>
                <v-toolbar-title><span class="order">{{ total }}</span></v-toolbar-title>
                <v-spacer></v-spacer>
                  <!-- <v-divider class="mx-4" inset vertical></v-divider>
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
                  {{ item.user_code }}
                </td>
                <td>
                  {{ item.username }}
                </td>
                <td>
                  <v-icon>visibility</v-icon><span>********</span>
                </td>
                <td>
                  {{ item.position_name }}
                </td>
                <td>
                  <v-row>
                    <v-btn
                      @click="MonitorAdminmanager(item)"
                      fab
                      icon
                      outlined
                      small
                    >
                      <v-icon>visibility</v-icon>
                    </v-btn>
                    <v-btn @click="EditAdminmanager(item)" fab icon outlined small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      @click="DeleteAdminmanager(item)" fab icon outlined small>
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
  name: "Adminmanager",
  mounted() {
    this.loadAdminmanager();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },
  data: () => ({
    dialogCreateAdminuser: false,
    dialogEditAdminuser: false,

    CreateFullnameAdminuser:null,
    CreatePhoneAdminuser:null,
    EditFullnameAdminuser:null,
    EditPhoneAdminuser:null,
    SelectPositionAdmin:null,
    positionAdmin:[],

    EditAdminmanagerID:null,

    search: "",
    total: null,
    table_adminmanager_item: [],
    headers_table_adminmanager: [
      { text: "รหัสงาน", value: "user_code", sortable: false, align: "start" },
      { text: "ชื่อผู้ใช้งาน", value: "username", sortable: false, align: "start",},
      { text: "รหัสผู้ใช้งาน", value: "", sortable: false, align: "start",},
      { text: "ระดับผู้ใช้งาน",value: "position_name",sortable: false,align: "start",},
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],
  }),

  methods: {
    async loadAdminmanager() {
      let result = await api.getListalladminuser();
      // console.log('ข้อมูลแอดมิน',result);
      this.table_adminmanager_item = result.data.result;
      this.total = result.data.total;
      let resultposition = await api.getListsetinmodaladminuser();
      // console.log('ข้อมูลตำแหน่ง',resultposition.data.result);
      this.positionAdmin = resultposition.data.result
      let position = resultposition.data.result[0]
      this.SelectPositionAdmin=position.id
    },

  async MonitorAdminmanager(item){
      console.log(item.id);
    },

  async CreateAdminuser(){
        let CreateAdminmanagerID = {name:this.CreateFullnameAdminuser,position_id:this.SelectPositionAdmin,telephone_number:this.CreatePhoneAdminuser}
        let result = await api.addadminuser(CreateAdminmanagerID);
        // console.log('resultCreateAdminmanager',result);
        if (result.data.response == "OK") {
          this.loadAdminmanager();
          this.CreateFullnameAdminuser=null;
          this.CreatePhoneAdminuser=null;
          this.$swal.fire("สร้างสมาชิกใหม่เรียบร้อย", "", "success");
          this.dialogCreateAdminuser=false
        }else{
          this.$swal.fire(
              "สร้างสมาชิกไม่สำเร็จ",
              `เนื่องจาก ${result.data.response} ${result.data.result} `,
              "error"
            );
        } 
  },


  async EditAdminmanager(item){
        let EditAdminmanagerIDs = { id: item.id };
        //console.log('id to edit',this.EditAdminmanagerIDs);
        let result = await api.getEditadminuser(EditAdminmanagerIDs);
        //console.log('resultEditAdminmanager',result);
        if (result.data.response == "OK") {
          this.EditAdminmanagerID = result.data.result.id;
          this.EditFullnameAdminuser = result.data.result.name;
          this.EditPhoneAdminuser = result.data.result.telephone_number;
          this.SelectPositionAdmin = result.data.result.position_id;
          this.dialogEditAdminuser=true
        }else{
             this.$swal.fire(
              "แก้ไขไม่สำเร็จ",
              `เนื่องจาก ${result.data.response} ${result.data.result} `,
              "error"
            );
        }   
    },

      async EditAdminuser(){
        let EditAdminmanagerIDs = {id:this.EditAdminmanagerID, name:this.EditFullnameAdminuser, telephone_number:this.EditPhoneAdminuser, position_id:this.SelectPositionAdmin}
        //console.log('EditAdminmanagerIDs',EditAdminmanagerIDs);
        let result = await api.editadminuser(EditAdminmanagerIDs);
        // console.log('editadminuser',result);
        if (result.data.response == "OK") {
          this.loadAdminmanager();
          this.EditFullnameAdminuser=null;
          this.EditPhoneAdminuser=null;
          this.dialogEditAdminuser=false
        }else{
             this.$swal.fire(
              "แก้ไขไม่สำเร็จ",
              `เนื่องจาก ${result.data.response} ${result.data.result} `,
              "error"
            );
        }  
  },

    async DeleteAdminmanager(item) {
      this.$swal
        .fire({
          title: `ต้องการลบผู้ใช้รายนี้ใช่หรือไม่ ?`,
          showDenyButton: true,
          confirmButtonText: `ยืนยัน`,
          denyButtonText: `ยกเลิก`
        })
        .then(async result => {
          if (result.isConfirmed) {
            let deladminuser = { id: item.id };
            let resultdel = await api.deladminuser(deladminuser);
            if (resultdel.data.response == "OK") {
              this.$swal.fire("ยืนยันการลบเรียบร้อย", "", "success");
              this.loadAdminmanager();
            }
          } else if (result.isDenied) {
            this.$swal.fire("ยกเลิกการลบ", "", "error");
          }
        });
    },

    async updatejobstatus(item) {
      //console.log(item);
      await this.$store.dispatch({
        type: "setBNPDATA",
        bnpdata: item.quotation_code,
      });
      await this.$router.push({ name: "menuJobExplorearea" });
    },
  },
};
</script>

<style scoped></style>
