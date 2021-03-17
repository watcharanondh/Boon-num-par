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
            v-model="dialogCreateStaffuser"
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
                      v-model="CreateFullnameStaffuser"
                      clearable>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-sub-title">
                      ชื่อเล่น
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="CreateNicknameStaffuser"
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
                      เบอร์โทรศัพท์
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row class="justify-center">
                  <v-col class="justify-center">
                      <v-text-field-integer
                        v-model="CreatePhoneStaffuser"
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
                          @click="CreateStaffuser()"
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
                          @click="dialogCreateStaffuser = false"
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
            v-model="dialogEditStaffuser"
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
                      v-model="EditFullnameStaffuser"
                      clearable>
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-title>
                <v-row>
                  <v-col>
                    <div class="update-sub-title">
                      ชื่อเล่น
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="EditNicknameStaffuser"
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
                      เบอร์โทรศัพท์
                    </div>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-row class="justify-center">
                  <v-col class="justify-center">
                      <v-text-field-integer
                        v-model="EditPhoneStaffuser"
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
                          @click="EditStaffuser()"
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
                          @click="dialogEditStaffuser = false"
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
            :headers="headers_table_Staffusermanager"
            :items="table_Staffusermanager_item"
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
                  {{ item.user_code }}
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  {{ item.nickname }}
                </td>
                <td>
                  {{ item.telephone_number }}
                </td>
                <td>
                  {{ item.position_name }}
                </td>
                <td>
                  <v-row>
                    <v-btn
                      @click="MonitorStaffusermanager(item)"
                      fab
                      icon
                      outlined
                      small
                    >
                      <v-icon>visibility</v-icon>
                    </v-btn>
                    <v-btn @click="EditStaffusermanager(item)" fab icon outlined small>
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      @click="DeleteStaffusermanager(item)" fab icon outlined small>
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
  name: "Staffusermanager",
  mounted() {
    this.loadStaffusermanager();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },
  data: () => ({
    dialogCreateStaffuser: false,
    dialogEditStaffuser: false,

    CreateFullnameStaffuser:null,
    CreateNicknameStaffuser:null,
    CreatePhoneStaffuser:null,
    EditFullnameStaffuser:null,
    EditNicknameStaffuser:null,
    EditPhoneStaffuser:null,
    SelectPositionStaffuser:null,
    positionStaffuser:[],

    EditStaffusermanagerID:null,

    search: "",
    total: null,
    table_Staffusermanager_item: [],
    headers_table_Staffusermanager: [
      { text: "รหัสงาน", value: "user_code", sortable: false, align: "start" },
      { text: "ชื่อพนักงาน", value: "name", sortable: false, align: "start",},
      { text: "ชื่อเล่น", value: "nickname", sortable: false, align: "start",},
      { text: "เบอร์โทรศัพท์",value: "telephone_number",sortable: false,align: "start",},
      { text: "ตำแหน่ง", value: "position_name", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],
  }),

  methods: {
    async loadStaffusermanager() {
      let result = await api.getListallstaffuser();
      //console.log('ข้อมูลstaff',result);
      this.table_Staffusermanager_item = result.data.result;
      this.total = result.data.total;
      let resultposition = await api.getListsetinmodalstaffuser();
      //console.log('ข้อมูลตำแหน่งstaff',resultposition.data.result);
      this.positionStaffuser = resultposition.data.result
      let position = resultposition.data.result[0]
      this.SelectPositionStaffuser=position.id
    },

  async MonitorStaffusermanager(item){
      console.log(item.id);
    },

  async CreateStaffuser(){
        let CreateStaffusermanagerID = {name:this.CreateFullnameStaffuser,nickname:this.CreateNicknameStaffuser ,position_id:this.SelectPositionStaffuser ,telephone_number:this.CreatePhoneStaffuser}
        let result = await api.addstaffuser(CreateStaffusermanagerID);
        // console.log('resultCreateStaffusermanager',result);
        if (result.data.response == "OK") {
          this.loadStaffusermanager();
          this.CreateFullnameStaffuser=null;
          this.CreateNicknameStaffuser=null;
          this.CreatePhoneStaffuser=null;
          this.$swal.fire("สร้างสมาชิกใหม่เรียบร้อย", "", "success");
          this.dialogCreateStaffuser=false
         }else{
          this.$swal.fire(
              "สร้างสมาชิกไม่สำเร็จ",
              `เนื่องจาก ${result.data.response} ${result.data.result} `,
              "error"
            );
        }  
  },


  async EditStaffusermanager(item){
        let EditStaffusermanagerIDs = { id: item.id };
        // console.log('id to edit',this.EditStaffusermanagerID);
        let result = await api.getEditstaffuser(EditStaffusermanagerIDs);
        // console.log('resultEditStaffusermanager',result);
        if (result.data.response == "OK") {
          this.EditStaffusermanagerID = result.data.result.id;
          this.EditFullnameStaffuser = result.data.result.name;
          this.EditNicknameStaffuser = result.data.result.nickname;
          this.EditPhoneStaffuser = result.data.result.telephone_number;
          this.SelectPositionStaffuser = result.data.result.position_id;
          this.dialogEditStaffuser=true
        }  
    },

      async EditStaffuser(){
        let EditStaffusermanagerIDs = {id:this.EditStaffusermanagerID ,nickname:this.EditNicknameStaffuser ,name:this.EditFullnameStaffuser, telephone_number:this.EditPhoneStaffuser, position_id:this.SelectPositionStaffuser}
        //console.log('EditStaffusermanagerIDs',EditStaffusermanagerIDs);
        let result = await api.editstaffuser(EditStaffusermanagerIDs);
        //console.log('editStaffuser',result);
        if (result.data.response == "OK") {
          this.loadStaffusermanager();
          this.EditFullnameStaffuser=null;
          this.EditNicknameStaffuser=null;
          this.EditPhoneStaffuser=null;
          this.$swal.fire("สร้างสมาชิกใหม่เรียบร้อย", "", "success");
          this.dialogEditStaffuser=false
        }  
  },

    async DeleteStaffusermanager(item) {
      this.$swal
        .fire({
          title: `ต้องการลบผู้ใช้รายนี้ใช่หรือไม่ ?`,
          showDenyButton: true,
          confirmButtonText: `ยืนยัน`,
          denyButtonText: `ยกเลิก`
        })
        .then(async result => {
          if (result.isConfirmed) {
            let delStaffuser = { id: item.id };
            let resultdel = await api.delstaffuser(delStaffuser);
            if (resultdel.data.response == "OK") {
              this.$swal.fire("ยืนยันการลบเรียบร้อย", "", "success");
              this.loadStaffusermanager();
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
