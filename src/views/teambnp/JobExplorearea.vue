<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            ตารางงานของคุณ
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row justify="end">
      <v-btn
        class="mx-13"
        color="#C4C4C4"
        @click="$router.push({ name: 'menuExplorearea' })"
        rounded
      >
        <span class="white--text">ย้อนกลับ</span></v-btn>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <v-card class="mx-10 pa-5 rounded-lg" outlined>
          <v-row justify="center">
            <v-col lg="12" md="12" sm="12" cols="12">
              <v-row>
                <v-col>
                  <div class="create-edit-title">
                    รายละเอียดพื้นที่
                  </div>
                </v-col>
              </v-row>
              <v-row>
                <!-- รหัสทีม -->
                <v-col lg="4" md="4" sm="12" cols="12">
                  <div>รหัสทีม</div>
                  <v-row class="no-gutters">
                    <v-text-field v-model="team_code" disabled></v-text-field>
                  </v-row>
                </v-col>
                <!-- ชื่อใบกำกับภาษี -->
                <v-col lg="4" md="4" sm="12" cols="12">
                  <div>ชื่อใบกำกับภาษี</div>
                  <v-row class="no-gutters">
                    <v-text-field
                      v-model="Tax_invoice_name"
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
                <!-- สถานที่จัดงาน -->
                <v-col lg="4" md="4" sm="12" cols="12">
                  <div>สถานที่จัดงาน</div>
                  <v-row class="no-gutters">
                    <v-text-field v-model="Event_venue" disabled></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <!-- นัดดูสถานที่ -->
                <v-col lg="4" md="4" sm="12" cols="12">
                  <div>นัดดูสถานที่</div>
                  <v-row class="no-gutters">
                    <v-text-field
                      v-model="look_location"
                      disabled
                    ></v-text-field>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <!-- รายการที่ต้องตรวจสอบ -->
        <v-card class="mx-10 pa-5 rounded-lg" outlined>
          <span v-if="Allchk==0">
            <v-btn @click="chk_all_list()" outlined rounded><span><v-icon>done</v-icon> ทำเครื่องหมายเสร็จสมบูรณ์</span></v-btn>
          </span>
          <span v-if="Allchk==1">
            <v-btn color="#606771" rounded><span class="white--text">เสร็จสมบูรณ์</span></v-btn>
          </span>
          <br />
          <br />
          <v-data-table
            :headers="headers_table_checklocation"
            :items="table_checklocation_item"
            class="elevation-1"
          >
            <!-- table top section -->
            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title><span class="header-table-title">รายการที่ต้องตรวจสอบ</span></v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- สร้างรายการตรวจสอบ -->
                <v-dialog
                  v-model="dialogCreatChecklistJobExplorearea"
                  :retain-focus="false"
                  transition="dialog-top-transition"
                  persistent
                  width="25%"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs" v-on="on" color="#29CC97" rounded>
                      <span class="white--text">สร้างรายการตรวจสอบ</span>
                    </v-btn>
                  </template>

                  <v-card>
                    <v-card-title>
                      <v-row>
                        <v-col>
                          <div class="update-head-title">
                            เพิ่มรายการตรวจสอบ
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-title>
                      <v-row>
                        <v-col>
                          <div class="update-sub-title">
                            รายการตรวจสอบ
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-text>
                      <v-row class="justify-center">
                        <v-col class="justify-center">
                          <v-text-field
                            v-model="Create_checklists_JobExplorearea"
                            clearable
                          >
                          </v-text-field>

                          <v-card-actions class="justify-center pa-0 mb-0">
                            <v-col lg="6" md="6" sm="12" cols="12">
                              <v-btn
                                color="#29CC97"
                                block
                                large
                                rounded
                                @click="CreatecheckListsJobExplorearea()"
                                ><span class=" white--text">อัพเดท</span></v-btn>
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
                                @click="dialogCreatChecklistJobExplorearea = false"
                              >
                                ปิด</v-btn>
                            </v-col>
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-dialog>
                <!-- แก้ไขรายการตรวจสอบ -->
                <v-dialog
                  v-model="dialogEditchecklistJobExplorearea"
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
                            แก้ไขรายการตรวจสอบ
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-title>
                      <v-row>
                        <v-col>
                          <div class="update-sub-title">
                            รายการตรวจสอบ
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-title>
                    <v-card-text>
                      <v-row class="justify-center">
                        <v-col class="justify-center">
                          <v-text-field v-model="Edit_checklists_JobExplorearea" clearable> </v-text-field>

                          <v-card-actions class="justify-center pa-0 mb-0">
                            <v-col lg="6" md="6" sm="12" cols="12">
                              <v-btn
                                color="#29CC97"
                                block
                                large
                                rounded
                                @click="EditChacklist_submit_JobExplorearea()"
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
                                @click="dialogEditchecklistJobExplorearea = false"
                              >
                                ปิด
                              </v-btn>
                            </v-col>
                          </v-card-actions>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-dialog>
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
                  {{ item.name }}
                  <div v-if="item.isEdit==true" style="font-size: 12px;color: #A4A6B3;">รายการตรวจสอบเพิ่มเติม</div>
                </td>
                <td align="center">
                  <button
                    class="button-left"
                    :class="{ 'active': item.status == 1 }"
                    @click="past(item, 1)">
                    ผ่าน
                  </button>
                  <button
                    class="button-right"
                    :class="{ 'active': item.status == 2 }"
                    @click="Notpass(item, 2)"
                  >
                    ไม่ผ่าน
                  </button>
                </td>
                <td>
                  <v-row v-if="item.isEdit==true">
                    <v-btn
                      @click="EditChacklist_JobExplorearea(item)"
                      fab
                      icon
                      outlined
                      small
                    >
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <v-btn
                      @click="DeleteChacklist_JobExplorearea(item)"
                      fab
                      icon
                      outlined
                      small
                    >
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
    <v-row>
      <v-col lg="12" md="12" sm="12" cols="12">
        <v-card class="mx-10 pa-5 rounded-lg" outlined>
          <v-row>
            <v-col>
              <div class="create-edit-title">
                รูปภาพ
              </div>
            </v-col>
          </v-row>
          <br/>
          <div class="clearfix">
            <a-upload
              style="zoom:2; padding: 0px;"
              list-type="picture-card"
              :file-list="fileList"
              :customRequest="uploadSinglePic"
              @preview="handlePreview"
              @change="handleChange"
            >
              <a-icon type="plus" />
              <div class="ant-upload-text">
                  Upload
              </div>
            </a-upload>
            <a-modal
              :visible="previewVisible"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

import api from "@/services/api";
import axios from "axios";
export default {
  name: "JobExplorearea",
  mounted() {
    this.loadJobExplorearea();
    
  },
  data: () => ({
    //รายละเอียดพื้นที่
    team_code: null,
    Tax_invoice_name: null,
    Event_venue: null,
    look_location: null,
    
    qc:null,
    Allchk:null,

    dialogCreatChecklistJobExplorearea: false,
    dialogEditchecklistJobExplorearea: false,
    
    Create_checklists_JobExplorearea: null,
    Edit_checklists_JobExplorearea: null,
    EditChkID:null,

    table_checklocation_item: [],
    headers_table_checklocation: [
      { text: "รายการ", value: "name", sortable: true, align: "start" },
      { text: "สถานะ", value: "", sortable: false, align: "center" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],

    previewVisible: false,
    previewImage: "",
    fileList: [],
    sentimg:null,
  }),

  methods: {
    async loadJobExplorearea() {
      this.qc = this.$store.getters["BNP_DATA"].bnpdata;
      let JobExploreareaID = {
        quotation_code: this.qc,
      };
      if (!JobExploreareaID.quotation_code) {
        window.location.href = `${process.env.VUE_APP_SUB_PATH}/teambnp/Explorearea`;
        //this.$router.push({name:'menuExplorearea'})
        return;
      }
      let result = await api.ListmanagetaskTeamSurvey(JobExploreareaID);
      //รายละเอียดพื้นที่
      this.team_code = result.data.result.info.quotation_code;
      this.Tax_invoice_name = result.data.result.info.team_name;
      this.Event_venue = result.data.result.info.address;
      this.look_location = result.data.result.info.area_viewing_date;
      //รายการที่ต้องตรวจสอบ
      this.table_checklocation_item = result.data.result.checklists;
      //เข็ครายการตรวจสอบ
      this.Allchk=result.data.result.checklist_check_all;
      //รูป
      this.fileList=result.data.result.img
    },

    async chk_all_list() {
      this.Allchk=1
      let recheckLists = [];
      this.table_checklocation_item.forEach(value => {recheckLists.push({
          id: `${value.id}`,
          status: `1`,
        });
      })
      let result = await api.RecheckTeamSurvey(recheckLists);
      if (result.data.response == "OK") {
        this.loadJobExplorearea();
      } 
    },

    async past(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckTeamSurvey(recheckLists);
      if (result.data.response == "OK") {
        this.loadJobExplorearea();
      } 
    },

    async Notpass(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckTeamSurvey(recheckLists);
      if (result.data.response == "OK") {
        this.loadJobExplorearea();
      }
    },

    async CreatecheckListsJobExplorearea() {
      let checkLists = {
        quotation_code: this.qc,
        name: this.Create_checklists_JobExplorearea,
      };
      let result = await api.ListchkcreateTeamSurvey(checkLists);
      if (result.data.response == "OK") {
        this.loadJobExplorearea();
        this.$swal.fire("สร้างรายการตรวจสอบเรียบร้อยแล้ว", "", "success");
        this.Create_checklists_JobExplorearea = null;
        this.dialogCreatChecklistJobExplorearea = false;
      } else {
        this.$swal.fire(
          "สร้างรายการตรวจสอบไม่สำเร็จ",
          `${result.data.response} ${result.data.result} `,
          "error"
        );
      }
    },

  async EditChacklist_JobExplorearea(item){
        let EditChkshowID = { id: item.id };
        this.EditChkID = item.id;
        let result = await api.getListchkTeamSurvey(EditChkshowID);
        if (result.data.response == "OK") {
          this.Edit_checklists_JobExplorearea = result.data.result[0].name;
          this.dialogEditchecklistJobExplorearea= true
        }  
    },

  async EditChacklist_submit_JobExplorearea(){
      let checkLists = { id: this.EditChkID, name: this.Edit_checklists_JobExplorearea };;
      let result = await api.EditchklistTeamSurvey(checkLists);
        if (result.data.response == "OK") {
          this.$swal.fire("แก้ไขรายการตรวจสอบเรียบร้อย", "", "success");
          this.loadJobExplorearea();
          this.dialogEditchecklistJobExplorearea= false
        } else {
          this.$swal.fire(
            "เกิดข้อผิดพลาด",
            `แก้ไขรายการตรวจสอบไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
            "error"
          );
        }
    },

    async DeleteChacklist_JobExplorearea(item) {
      this.$swal
        .fire({
          title: `ต้องการลบรายการตรวจสอบนี้ใช่หรือไม่ ?`,
          showDenyButton: true,
          confirmButtonText: `ยืนยัน`,
          denyButtonText: `ยกเลิก`,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let delCustomizecheck = { id: item.id };
            let resultdel = await api.DelchklistTeamSurvey(delCustomizecheck);
            if (resultdel.data.response == "OK") {
              this.$swal.fire("ยืนยันการลบเรียบร้อย", "", "success");
              this.loadJobExplorearea();
            }
          } else if (result.isDenied) {
            this.$swal.fire("ยกเลิกการลบ", "", "error");
          }
        });
    },

    // รูป
    async handlePreview(file) {
    if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },

    handleChange({ file, fileList }) {
      this.fileList = fileList;
      console.log("ไฟล์", file);
      console.log("ไฟล์ลิดส", fileList);
    
    },

    async uploadSinglePic({ file, onSuccess }) {
      console.log('ไฟล์ssssssss',file);
      const reader = new FileReader();
          reader.readAsDataURL(file);
          let data = new FormData();
          data.append('image', file)

      var config = {
        method: 'post',
        url: 'https://api.imgur.com/3/image',
        headers: {
          'Authorization': 'Client-ID 546c25a59c58ad7', 
        },
        data : data
      };

      await axios(config).then((response ) => {
      alert('อัพโหลดรูปเรียบร้อยแล้ว')
      this.Put_Users.profile_img = response.data.data.link;
      //console.log(this.Put_Users.profile_img);
    });
      onSuccess('Ok')
    },
  },
};
</script>

<style scoped>
</style>
