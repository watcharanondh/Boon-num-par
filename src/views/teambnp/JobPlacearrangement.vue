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
        @click="$router.push({ name: 'menuPlacearrangement' })"
        rounded>
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
                <v-col lg="4" md="4" sm="12" cols="12">
                  <!-- รหัสทีม -->
                  <div>รหัสทีม</div>
                  <v-row class="no-gutters">
                    <v-text-field
                      v-model="team_code"
                      disabled
                    ></v-text-field>
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
                    <v-text-field
                      v-model="Event_venue"
                      disabled
                    ></v-text-field>
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

    <v-card flat color="#E5E5E5">
      <div class="mx-6 pa-5 header-title">
        กิจกรรม
      </div>
    </v-card>

      <v-row class="mx-4 pa-5">
        <v-btn @click="before()"  :color="active1 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็คของ-นำไป</span></v-btn>
        <v-btn  @click="between()" :color="active2 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็ควันจัดสถานที่</span></v-btn>
        <v-btn @click="after()" :color="active3 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็คของ-นำกลับ</span></v-btn>
      </v-row>
  
      <!-- beforeTab1 -->
      <div v-if="tab==1">
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <!-- รายการที่ต้องตรวจสอบ -->
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
            <span v-if="Allchk_before==0">
              <v-btn @click="chk_all_before_list()" outlined rounded><span><v-icon>done</v-icon> ทำเครื่องหมายเสร็จสมบูรณ์</span></v-btn>
            </span>
            <span v-if="Allchk_before==1">
              <v-btn color="#606771" rounded><span class="white--text">เสร็จสมบูรณ์</span></v-btn>
            </span>
            <br />
            <br />
              <v-data-table
                :headers="headers_table_manageplace_before"
                :items="table_manageplace_before_item"
                class="elevation-1"
              >
                <!-- table top section -->
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title><span class="header-table-title">ตรวจเช็คของ - นำไป</span></v-toolbar-title>
                    <v-spacer></v-spacer>
                  <!-- สร้างรายการตรวจสอบ -->
                  <v-dialog
                    v-model="dialogCreatChecklistJobPlacearrangement"
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
                              v-model="Create_checklists_JobPlacearrangement"
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
                                  @click="CreatecheckListsJobPlacearrangement()"
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
                                  @click="dialogCreatChecklistJobPlacearrangement = false"
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
                    v-model="dialogEditchecklistJobPlacearrangement"
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
                            <v-text-field v-model="Edit_checklists_JobPlacearrangement" clearable> </v-text-field>

                            <v-card-actions class="justify-center pa-0 mb-0">
                              <v-col lg="6" md="6" sm="12" cols="12">
                                <v-btn
                                  color="#29CC97"
                                  block
                                  large
                                  rounded
                                  @click="EditChacklist_submit_JobPlacearrangement()"
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
                                  @click="dialogEditchecklistJobPlacearrangement = false"
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
                        @click="past_before(item, 1)">
                        ผ่าน
                      </button>
                      <button
                        class="button-right"
                        :class="{ 'active': item.status == 2 }"
                        @click="Notpass_before(item, 2)"
                      >
                        ไม่ผ่าน
                      </button>
                    </td>
                  <td>
                    <v-row v-if="item.isEdit==true">
                      <v-btn
                        @click="EditChacklist_JobPlacearrangement(item)"
                        fab
                        icon
                        outlined
                        small
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        @click="DeleteChacklist_JobPlacearrangement(item)"
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
            <br/>
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
                      :file-list="fileList_before"
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
          </v-col>
        </v-row>

        <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  เพิ่มเติม
                </div>
              </v-col>
            </v-row>
            <br />
              <v-textarea v-model="description_before" v-on:blur="updatedescription_before()" solo></v-textarea>
          </v-card>
        </v-col>
    </v-row>
  </div>

      <!-- betweenTab2 -->
      <div v-if="tab==2">
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
              <v-row>
                <v-col>
                  <div class="create-edit-title">
                    รูปภาพสถานที่
                  </div>
                </v-col>
              </v-row>
              <br/>
              <div class="clearfix">
                <a-upload
                  style="zoom:2; padding: 0px;"
                  list-type="picture-card"
                  :file-list="fileList_between_viewing_img"
                  @preview="handlePreview"
                  :showUploadList="{ showPreviewIcon: true, showRemoveIcon: false }"
                >
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
            <br/>
            <v-row>
              <v-col lg="12" md="12" sm="12" cols="12">
                <v-card class="mx-10 pa-5 rounded-lg" outlined>
                  <v-row>
                    <span v-if="Allchk_between==0">
                      <v-btn @click="chk_all_between_list()" outlined rounded><span><v-icon>done</v-icon> ทำเครื่องหมายเสร็จสมบูรณ์</span></v-btn>
                    </span>
                    <span v-if="Allchk_between==1">
                      <v-btn color="#606771" rounded><span class="white--text">เสร็จสมบูรณ์</span></v-btn>
                    </span>
                  </v-row>
                  <br/>
                  <v-row>
                    <v-col>
                      <div class="create-edit-title">
                          วันจัดงาน
                      </div>
                    </v-col>
                  </v-row>
                  <br/>
                  <div class="clearfix">
                    <a-upload
                      style="zoom:2; padding: 0px;"
                      list-type="picture-card"
                      :file-list="fileList_between"
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
            <v-row>
            <v-col lg="12" md="12" sm="12" cols="12">
              <v-card class="mx-10 pa-5 rounded-lg" outlined>
                <v-row>
                  <v-col>
                    <div class="create-edit-title">
                      เพิ่มเติม
                    </div>
                  </v-col>
                </v-row>
                <br />
                  <v-textarea v-model="description_between" v-on:blur="updatedescription_between()" solo></v-textarea>
              </v-card>
            </v-col>
            </v-row>
            </v-col>
        </v-row>
  </div>

      <!-- afterTab3 -->
      <div v-if="tab==3">
      <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <!-- รายการที่ต้องตรวจสอบ ตรวจเช็คของ - นำกลับ -->
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
            <span v-if="Allchk_after==0">
              <v-btn @click="chk_all_after_list()" outlined rounded><span><v-icon>done</v-icon> ทำเครื่องหมายเสร็จสมบูรณ์</span></v-btn>
            </span>
            <span v-if="Allchk_after==1">
              <v-btn color="#606771" rounded><span class="white--text">เสร็จสมบูรณ์</span></v-btn>
            </span>
            <br />
            <br />
              <v-data-table
                :headers="headers_table_manageplace_after"
                :items="table_manageplace_after_item"
                class="elevation-1"
              >
                <!-- table top section -->
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title><span class="header-table-title">ตรวจเช็คของ - นำกลับ</span></v-toolbar-title>
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
                      {{ item.name }}
                      <div v-if="item.isEdit==true" style="font-size: 12px;color: #A4A6B3;">รายการตรวจสอบเพิ่มเติม</div>
                    </td>
                    <td align="center">
                      <button
                        class="button-left"
                        :class="{ 'active': item.status == 1 }"
                        @click="past_after(item, 1)">
                        ผ่าน
                      </button>
                      <button
                        class="button-right"
                        :class="{ 'active': item.status == 2 }"
                        @click="Notpass_after(item, 2)"
                      >
                        ไม่ผ่าน
                      </button>
                    </td>
                 <td>
                     <!-- <v-row v-if="item.isEdit==true">
                      <v-btn
                        @click="EditChacklist_JobPlacearrangement(item)"
                        fab
                        icon
                        outlined
                        small
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        @click="DeleteChacklist_JobPlacearrangement(item)"
                        fab
                        icon
                        outlined
                        small
                      >
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-row>-->
                  </td> 
                    <td>
                      <!-- <v-btn icon>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>  -->
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
            <br/>
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
                      :file-list="fileList_after"
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

          </v-col>
        </v-row>

        <v-row>
        <v-col lg="12" md="12" sm="12" cols="12">
          <v-card class="mx-10 pa-5 rounded-lg" outlined>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  เพิ่มเติม
                </div>
              </v-col>
            </v-row>
            <br />
              <v-textarea v-model="description_after" v-on:blur="updatedescription_after()" solo></v-textarea>
          </v-card>
        </v-col>
    </v-row>
  </div>
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
  name: "JobPlacearrangement",
  mounted() {
    this.loadJobPlacearrangement();
  },
  data: () => ({
    //รายละเอียดพื้นที่
    team_code: null,
    Tax_invoice_name: null,
    Event_venue: null,
    look_location: null,
    qc:null,

    //tab
    tab:1,
    active1: true,
    active2: false,
    active3: false,
    
    //tab1=>before
    Allchk_before:null,
    dialogCreatChecklistJobPlacearrangement: false,
    dialogEditchecklistJobPlacearrangement: false,
    Create_checklists_JobPlacearrangement: null,
    Edit_checklists_JobPlacearrangement: null,
    EditChkID:null,
    description_before:null,
    totalbefore: null,
    table_manageplace_before_item: [],
    headers_table_manageplace_before: [
      { text: "รายการ", value: "name", sortable: true, align: "start" },
      { text: "สถานะ", value: "", sortable: false, align: "center" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],

    //tab2=>between
    description_between: null,


    //tab3=>after
    Allchk_after:null,
    description_after: null,
    totalafter: null,
    table_manageplace_after_item: [],
    headers_table_manageplace_after: [
      { text: "รายการ", value: "name", sortable: true, align: "start" },
      { text: "สถานะ", value: "", sortable: false, align: "center" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],



    previewVisible: false,
    previewImage: "",
    fileList_before: [],
    fileList_between_viewing_img: [],
    fileList_between: [],
    fileList_after: [],
  }),

  methods: { 
    async loadJobPlacearrangement() {
      this.qc = this.$store.getters["BNP_DATA"].bnpdata;
      let JobPlacearrangementID = {
        quotation_code:this.qc,
      };
      if (!JobPlacearrangementID.quotation_code) {
        window.location.href = `${process.env.VUE_APP_SUB_PATH}/teambnp/Placearrangement`;
        //this.$router.push({name:'menuExplorearea'})
        return;
      }
      let result = await api.ListmanagetaskTeamSetup(JobPlacearrangementID);
      //รายละเอียดพื้นที่
      this.team_code = result.data.result.info.quotation_code;
      this.Tax_invoice_name = result.data.result.info.team_name;
      this.Event_venue = result.data.result.info.address;
      this.look_location = result.data.result.info.area_viewing_date;


      //รายการที่ต้องตรวจสอบของ-นำไป
      this.table_manageplace_before_item = result.data.result.before.checklists;
      //เข็ครายการตรวจสอบ
      this.Allchk_before=result.data.result.before.checklist_check_all;
      //เพิ่มเติม
      this.description_before=result.data.result.before.description;
      //รูป
      this.fileList_before=result.data.result.before.img;

      //ตรวจเช็ควันจัดสถานที่
      this.Allchk_between=result.data.result.between.checklist_check_all;
      //เพิ่มเติม
      this.description_between=result.data.result.between.description;
      //รูป
      this.fileList_between_viewing_img=result.data.result.between.viewing_img;
      this.fileList_between=result.data.result.between.img;

      //รายการที่ต้องตรวจสอบของ-นำกลับ
      this.table_manageplace_after_item = result.data.result.after.checklists;
      //เข็ครายการตรวจสอบ
      this.Allchk_after=result.data.result.after.checklist_check_all;
      //เพิ่มเติม
      this.description_after=result.data.result.after.description;
      //รูป
      this.fileList_after=result.data.result.after.img;
    },

    async chk_all_before_list() {
      this.Allchk_before=1
      let recheckLists = [];
      this.table_manageplace_before_item.forEach(value => {recheckLists.push({
          id: `${value.id}`,
          status: `1`,
        });
      })
      let result = await api.RecheckTeamSetup(recheckLists);
      if (result.data.response == "OK") {
        this.loadJobPlacearrangement();
      } 
    },

    async chk_all_after_list() {
      this.Allchk_after=1
      let recheckLists = [];
      this.table_manageplace_after_item.forEach(value => {recheckLists.push({
          id: `${value.id}`,
          status: `1`,
        });
      })
      console.log(recheckLists);
      let result = await api.RecheckafterTeamSetup(recheckLists);
      console.log(result.data.response);
      if (result.data.response == "OK") {
        this.loadJobPlacearrangement();
      } 
    },

    async past_before(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckbeforeTeamSetup(recheckLists);
      //console.log(result);
      if (result.data.response == "OK") {
        this.loadJobPlacearrangement();
      } 
    },

    async past_after(item, status) {
      let recheckLists = {id:item.id ,status:status};
      // console.log(recheckLists);
      let result = await api.RecheckafterTeamSetup(recheckLists);
      // console.log(result);
      if (result.data.response == "OK") {
        this.loadJobPlacearrangement();
      } 
    },

    async Notpass_before(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckbeforeTeamSetup(recheckLists);
      if (result.data.response == "OK") {
        this.loadJobPlacearrangement();
      }
    },
    async Notpass_after(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckafterTeamSetup(recheckLists);
      if (result.data.response == "OK") {
        this.loadJobPlacearrangement();
      }
    },

    before(){
        this.active1 = true ;
        this.active2 = false ;
        this.active3 = false ;
        this.tab=1
    },
    between(){
        this.active1 = false ;
        this.active2 = true ;
        this.active3 = false ;
        this.tab=2
    },
    after(){
        this.active1 = false  ;
        this.active2 = false ;
        this.active3 = true ;
        this.tab=3
    },

    async CreatecheckListsJobPlacearrangement() {
      let checkLists = {
        quotation_code: this.qc,
        name: this.Create_checklists_JobPlacearrangement,
      };
      let result = await api.ListchkcreateTeamSetup(checkLists);
      if (result.data.response == "OK") {
        this.loadJobPlacearrangement();
        this.$swal.fire("สร้างรายการตรวจสอบเรียบร้อยแล้ว", "", "success");
        this.Create_checklists_JobPlacearrangement = null;
        this.dialogCreatChecklistJobPlacearrangement = false;
      } else {
        this.$swal.fire(
          "สร้างรายการตรวจสอบไม่สำเร็จ",
          `${result.data.response} ${result.data.result} `,
          "error"
        );
      }
    },

  async EditChacklist_JobPlacearrangement(item){
        let EditChkshowID = { id: item.id };
        this.EditChkID = item.id;
        let result = await api.ListchkTeamSetup(EditChkshowID);
        console.log('แก้ไจ',result.data.response);
        if (result.data.response == "OK") {
          this.Edit_checklists_JobPlacearrangement = result.data.result[0].name;
          this.dialogEditchecklistJobPlacearrangement= true
        }  
    },

  async EditChacklist_submit_JobPlacearrangement(){
      let checkLists = { id: this.EditChkID, name: this.Edit_checklists_JobPlacearrangement };;
      let result = await api.EditchklistTeamSetup(checkLists);
        if (result.data.response == "OK") {
          this.$swal.fire("แก้ไขรายการตรวจสอบเรียบร้อย", "", "success");
          this.loadJobPlacearrangement();
          this.dialogEditchecklistJobPlacearrangement= false
        } else {
          this.$swal.fire(
            "เกิดข้อผิดพลาด",
            `แก้ไขรายการตรวจสอบไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
            "error"
          );
        }
    },

    async DeleteChacklist_JobPlacearrangement(item) {
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
            let resultdel = await api.DelchklistTeamSetup(delCustomizecheck);
            if (resultdel.data.response == "OK") {
              this.$swal.fire("ยืนยันการลบเรียบร้อย", "", "success");
              this.loadJobPlacearrangement();
            }
          } else if (result.isDenied) {
            this.$swal.fire("ยกเลิกการลบ", "", "error");
          }
        });
    },

async  updatedescription_before(){
      let setdescription = {quotation_code:this.qc ,description:this.description_before ,description_type:0}
      let result = await api.descriptionTeamSetup(setdescription);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกเพิ่มเติมเรียบร้อยแล้ว", "", "success");
        this.loadJobPlacearrangement();
      } 

    },
 async  updatedescription_between(){
      let setdescription = {quotation_code:this.qc ,description:this.description_between ,description_type:1}
      let result = await api.descriptionTeamSetup(setdescription);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกเพิ่มเติมเรียบร้อยแล้ว", "", "success");
        this.loadJobPlacearrangement();
      } 

    },
  async  updatedescription_after(){
      let setdescription = {quotation_code:this.qc ,description:this.description_after ,description_type:2}
      let result = await api.descriptionTeamSetup(setdescription);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกเพิ่มเติมเรียบร้อยแล้ว", "", "success");
        this.loadJobPlacearrangement();
      } 

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
