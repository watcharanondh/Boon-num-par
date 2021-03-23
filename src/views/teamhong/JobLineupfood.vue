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
        @click="$router.push({ name: 'menuLineupfood' })"
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
        <v-btn  @click="between()" :color="active2 ? '#606771' : undefined" class="ma-2" rounded><span>ตรวจเช็ควันจัดไลน์อาหาร</span></v-btn>
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
            <div class="header-title">
              ประเภทการจัดเตรียม
            </div>
            <br />
             <v-row>
                  <v-btn @click="tabfood()"  :color="activefood ? '#606771' : undefined" class="ma-2" rounded><span>อาหาร</span></v-btn>
                  <v-btn @click="tabequipment()" :color="activeequipment ? '#606771' : undefined" class="ma-2" rounded><span>อุปกรณ์</span></v-btn>
            </v-row>
            <br />
            <br />
             <!-- tablefood -->
              <div v-if="table==1">
              <v-data-table
                :headers="headers_table_managefood_before"
                :items="table_managefood_before_item"
                class="elevation-1"
              >
                <!-- table top section -->
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title><span class="header-table-title">รายการที่ต้องตรวจสอบ - ก่อนจัดงาน</span></v-toolbar-title>
                    <v-spacer></v-spacer>
                  <!-- สร้างรายการตรวจสอบอาหาร -->
                  <v-dialog
                    v-model="dialogCreatChecklistJobLineupfood"
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
                              v-model="Create_checklists_JobLineupfood"
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
                                  @click="CreatecheckListsJobLineupfood()"
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
                                  @click="dialogCreatChecklistJobLineupfood = false"
                                >
                                  ปิด</v-btn>
                              </v-col>
                            </v-card-actions>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <!-- แก้ไขรายการตรวจสอบอาหาร -->
                  <v-dialog
                    v-model="dialogEditchecklistJobLineupfood"
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
                            <v-text-field v-model="Edit_checklists_JobLineupfood" clearable> </v-text-field>

                            <v-card-actions class="justify-center pa-0 mb-0">
                              <v-col lg="6" md="6" sm="12" cols="12">
                                <v-btn
                                  color="#29CC97"
                                  block
                                  large
                                  rounded
                                  @click="EditChacklist_submit_JobLineupfood()"
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
                                  @click="dialogEditchecklistJobLineupfood = false"
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
                        @click="past_chkfood_before(item, 1)">
                        ผ่าน
                      </button>
                      <button
                        class="button-right"
                        :class="{ 'active': item.status == 2 }"
                        @click="Notpass_chkfood_before(item, 2)"
                      >
                        ไม่ผ่าน
                      </button>
                    </td>
                  <td>
                    <v-row v-if="item.isEdit==true">
                      <v-btn
                        @click="EditChacklist_JobLineupfood(item)"
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
              </div>
             <!-- tableequipment-->
              <div v-if="table==2">
              <v-data-table
                :headers="headers_table_manageequipment_before"
                :items="table_manageequipment_before_item"
                class="elevation-1"
              >
                <!-- table top section -->
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-toolbar-title><span class="header-table-title">รายการที่ต้องตรวจสอบ - ก่อนจัดงาน</span></v-toolbar-title>
                    <v-spacer></v-spacer>
                      <v-btn v-on:Cilck="getChklistEquipment()" color="#29CC97" rounded>
                          <span class="white--text">สร้างรายการตรวจสอบ</span>
                      </v-btn>
                  <!-- สร้างรายการตรวจสอบอุปกรณ์ -->
                  <v-dialog
                    v-model="dialogCreatChecklistJobEquipment"
                    :retain-focus="false"
                    transition="dialog-top-transition"
                    persistent
                    width="25%"
                  >
                    <!-- <template v-slot:activator="{ on, attrs }">
                      <v-btn color="#29CC97" rounded>
                        <span class="white--text">สร้างรายการตรวจสอบ</span>
                      </v-btn>
                    </template> -->

                    <v-card>
                      <!-- สร้างรายการอุปกรณ์ -->
                      <v-row>
                        <v-col lg="6" md="6" sm="12" cols="12">
                          <v-row class="no-gutters">
                            <h3>รายการอุปกรณ์</h3>
                            <span class="order mt-2">{{ Equipment_table_all_total }} รายการ</span>
                          </v-row>

                          <!-- สร้างรายการอุปกรณ์ -->
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

                        <!-- สร้างอุปกรณ์ที่เลือก -->
                        <v-col lg="6" md="6" sm="12" cols="12">
                          <v-row class="no-gutters">
                            <h3>อุปกรณ์ที่เลือก</h3>
                            <span class="order mt-2"
                              >{{ Equipment_table_selected_total }} รายการ</span
                            >
                          </v-row>

                          <!-- สร้างอุปกรณ์ที่เลือก -->
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
                      <v-card-text>
                        <v-row class="justify-center">
                          <v-col class="justify-center">
                            <v-card-actions class="justify-center pa-0 mb-0">
                              <v-col lg="6" md="6" sm="12" cols="12">
                                <v-btn
                                  color="#29CC97"
                                  block
                                  large
                                  rounded
                                  @click="CreatecheckListsJobEquipment()"
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
                                  @click="dialogCreatChecklistJobEquipment = false"
                                >
                                  ปิด</v-btn>
                              </v-col>
                            </v-card-actions>
                          </v-col>
                        </v-row>
                      </v-card-text>
                    </v-card>
                  </v-dialog>
                  <!-- แก้ไขรายการตรวจสอบอุปกรณ์ -->
                  <v-dialog
                    v-model="dialogEditchecklistJobEquipment"
                    :retain-focus="false"
                    transition="dialog-top-transition"
                    persistent
                    width="25%"
                  >
                    <v-card>
                      <!-- แก้ไขรายการอุปกรณ์ -->
                      <v-row>
                        <v-col lg="6" md="6" sm="12" cols="12">
                          <v-row class="no-gutters">
                            <h3>รายการอุปกรณ์</h3>
                            <span class="order mt-2">{{ Equipment_table_all_total }} รายการ</span
                            >
                          </v-row>

                          <!-- แก้ไขรายการอุปกรณ์ -->
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

                        <!-- แก้ไขอุปกรณ์ที่เลือก -->
                        <v-col lg="6" md="6" sm="12" cols="12">
                          <v-row class="no-gutters">
                            <h3>อุปกรณ์ที่เลือก</h3>
                            <span class="order mt-2"
                              >{{ Equipment_table_selected_total }} รายการ</span
                            >
                          </v-row>

                          <!-- แก้ไขอุปกรณ์ที่เลือก -->
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
                      <v-card-text>
                        <v-row class="justify-center">
                          <v-col class="justify-center">
                            <v-card-actions class="justify-center pa-0 mb-0">
                              <v-col lg="6" md="6" sm="12" cols="12">
                                <v-btn
                                  color="#29CC97"
                                  block
                                  large
                                  rounded
                                  @click="EditChacklist_submit_JobEquipment()"
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
                                  @click="dialogEditchecklistJobEquipment = false"
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
                        @click="past_chkequipment_before(item, 1)">
                        ผ่าน
                      </button>
                      <button
                        class="button-right"
                        :class="{ 'active': item.status == 2 }"
                        @click="Notpass_chkequipment_before(item, 2)"
                      >
                        ไม่ผ่าน
                      </button>
                    </td>
                  <td>
                    <v-row v-if="item.isEdit==true">
                      <v-btn
                        @click="EditChacklist_JobEquipment(item)"
                        fab
                        icon
                        outlined
                        small
                      >
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <v-btn
                        @click="DeleteChacklist_JobEquipment(item)"
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
              </div>
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
                      accept="image/*"
                      style="zoom:2; padding: 0px;"
                      list-type="picture-card"
                      :file-list="fileList_before"
                      :customRequest="uploadbefore"
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

        <!-- <v-row>
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
    </v-row> -->
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
                  accept="image/*"
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
                      <v-btn @click="chk_all_between_list(1)" outlined rounded><span><v-icon>done</v-icon> ทำเครื่องหมายเสร็จสมบูรณ์</span></v-btn>
                    </span>
                    <span v-if="Allchk_between==1">
                      <v-btn @click="chk_all_between_list(2)" color="#606771" rounded><span class="white--text">เสร็จสมบูรณ์</span></v-btn>
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
                      accept="image/*"
                      style="zoom:2; padding: 0px;"
                      list-type="picture-card"
                      :file-list="fileList_between"
                      :customRequest="uploadbetween"
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
            <!-- <v-row>
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
            </v-row> -->
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
                        @click="past_chkfood_before(item, 1)">
                        ผ่าน
                      </button>
                      <button
                        class="button-right"
                        :class="{ 'active': item.status == 2 }"
                        @click="Notpass_chkfood_before(item, 2)"
                      >
                        ไม่ผ่าน
                      </button>
                    </td>
                 <td>
                     <!-- <v-row v-if="item.isEdit==true">
                      <v-btn
                        @click="EditChacklist_JobLineupfood(item)"
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
                      accept="image/*"
                      style="zoom:2; padding: 0px;"
                      list-type="picture-card"
                      :file-list="fileList_after"
                      :customRequest="uploadafter"
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

        <!-- <v-row>
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
    </v-row> -->
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
  name: "JobLineupfood",
  mounted() {
    this.JobLineupfood();
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

    //tab_table
    activefood:true,
    activeequipment:false,
    table:1,

    //tab1=>before
    Allchk_before:null,
    //JobLineupfood
    dialogCreatChecklistJobLineupfood: false,
    dialogEditchecklistJobLineupfood: false,
    Create_checklists_JobLineupfood: null,
    Edit_checklists_JobLineupfood: null,
    //JobEquipment
    dialogCreatChecklistJobEquipment: false,
    dialogEditchecklistJobEquipment: false,
    Create_checklists_JobEquipment: null,
    Edit_checklists_JobEquipment: null,

    EditChkID:null,
    description_before:null,
    totalbefore: null,

    table_managefood_before_item: [],
    headers_table_managefood_before: [
      { text: "รายการ", value: "name", sortable: true, align: "start" },
      { text: "สถานะ", value: "", sortable: false, align: "center" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],

    table_manageequipment_before_item: [],
    headers_table_manageequipment_before: [
      { text: "รายการ", value: "name", sortable: true, align: "start" },
      { text: "สถานะ", value: "", sortable: false, align: "center" },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],

    //inModuleEuipment
    Equipment_table_all_total: 0,
    Equipment_table_selected_total: 0,

    equipment_data_items: [],
    headers_equipment_data: [
      { text: "ชื่ออุปกรณ์", value: "name", sortable: false, align: "start", color: "black"},
      { text: "จำนวน",value: "stock_balance", sortable: false, align: "start", color: "black"},
      { text: "", value: "", sortable: false, align: "start", color: "black" }
    ],

    equipment_selected_items: [],
    headers_equipment_selected_data: [
      { text: "ชื่ออุปกรณ์", value: "name",sortable: false,align: "start", color: "black"},
      { text: "จำนวน", value: "stock_balance", sortable: false,align: "start", color: "black"},
      { text: "", value: "", sortable: false, align: "start", color: "black" }
    ],

    //tab2=>between
    description_between: null,
    Allchk_betweenid: null,
    Isactive:null,


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
    async JobLineupfood() {
      this.qc = this.$store.getters["BNP_DATA"].bnpdata;
      let JobLineupfoodID = {
        quotation_code:this.qc,
      };
      if (!JobLineupfoodID.quotation_code) {
        window.location.href = `${process.env.VUE_APP_SUB_PATH}/teamhong/Lineupfood`;
        //this.$router.push({name:''})
        return;
      }
      let result = await api.ListmanagetaskLineupfood(JobLineupfoodID);
      console.log('ไลน์',result);
      //รายละเอียดพื้นที่
      this.team_code = result.data.result.info.quotation_code;
      this.Tax_invoice_name = result.data.result.info.customer_name;
      this.Event_venue = result.data.result.info.address;
      this.look_location = result.data.result.info.area_viewing_date;


      //รายการที่ต้องตรวจสอบของ-นำไป
      this.table_managefood_before_item = result.data.result.before.checklists.foods;
      this.table_manageequipment_before_item = result.data.result.before.checklists.equiptments;
      //console.log('ouj',this.table_managefood_before_item);
      //เข็ครายการตรวจสอบ
      this.Allchk_before=result.data.result.before.checklist_check_all;
      console.log('เช็ครายการตรวจสอบ',this.Allchk_before);
      //เพิ่มเติม
      this.description_before=result.data.result.before.description;
      //รูป
      this.fileList_before=result.data.result.before.img;

      //ตรวจเช็ควันจัดสถานที่
      this.Allchk_between=result.data.result.between.checklists.status;
      this.Allchk_betweenid=result.data.result.between.checklists.id;
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
      // this.Allchk_before=1
      // let recheckLists = [];
      // this.table_managefood_before_item.forEach(value => {recheckLists.push({
      //     id: `${value.id}`,
      //     status: `1`,
      //   });
      // })
      // let result = await api.RecheckbeforeLineupfood(recheckLists);
      // if (result.data.response == "OK") {
      //   this.JobLineupfood();
      // } 
    },

    async chk_all_between_list(Isactive) {
      if(Isactive==1){
        //console.log(Isactive);
          let recheckLists = {id:this.Allchk_betweenid,status: 1}
      let result = await api.RecheckbeforeLineupfood(recheckLists);
        if (result.data.response == "OK") {
          this.JobLineupfood();
        } 
      }else if(Isactive==2){
          let recheckLists = {id:this.Allchk_betweenid,status: 0}
      let result = await api.RecheckbeforeLineupfood(recheckLists);
        if (result.data.response == "OK") {
          this.JobLineupfood();
        } 
      }
    },


    async chk_all_after_list() {
      // this.Allchk_after=1
      // let recheckLists = [];
      // this.table_manageplace_after_item.forEach(value => {recheckLists.push({
      //     id: `${value.id}`,
      //     status: `1`,
      //   });
      // })
      // let result = await api.RecheckafterTeamSetup(recheckLists);
      // if (result.data.response == "OK") {
      //   this.JobLineupfood();
      // } 
    },

    async past_chkfood_before(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckbeforeTeamSetup(recheckLists);
      //console.log(result);
      if (result.data.response == "OK") {
        this.JobLineupfood();
      } 
    },
    async past_chkequipment_before(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckbeforeTeamSetup(recheckLists);
      //console.log(result);
      if (result.data.response == "OK") {
        this.JobLineupfood();
      } 
    },
    async past_chkequipment_after(item, status) {
      let recheckLists = {id:item.id ,status:status};
      // console.log(recheckLists);
      let result = await api.RecheckafterTeamSetup(recheckLists);
      // console.log(result);
      if (result.data.response == "OK") {
        this.JobLineupfood();
      } 
    },

    async Notpass_chkfood_before(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckbeforeTeamSetup(recheckLists);
      if (result.data.response == "OK") {
        this.JobLineupfood();
      }
    },
    async Notpass_chkequipment_before(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckbeforeTeamSetup(recheckLists);
      if (result.data.response == "OK") {
        this.JobLineupfood();
      }
    },
    async Notpass_chkequipment_after(item, status) {
      let recheckLists = {id:item.id ,status:status};
      let result = await api.RecheckafterTeamSetup(recheckLists);
      if (result.data.response == "OK") {
        this.JobLineupfood();
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

    tabfood(){
      this.activefood = true;
      this.activeequipment = false;
      this.table=1;
    },
    tabequipment(){
      this.activefood = false;
      this.activeequipment = true;
      this.table=2;
    },

    async CreatecheckListsJobLineupfood() {
      let checkLists = {
        quotation_code: this.qc,
        name: this.Create_checklists_JobLineupfood,
      };
      console.log(checkLists);
      let result = await api.ListchkcreateLineupfood(checkLists);
      if (result.data.response == "OK") {
        this.JobLineupfood();
        this.$swal.fire("สร้างรายการตรวจสอบเรียบร้อยแล้ว", "", "success");
        this.Create_checklists_JobLineupfood = null;
        this.dialogCreatChecklistJobLineupfood = false;
      } else {
        this.$swal.fire(
          "สร้างรายการตรวจสอบไม่สำเร็จ",
          `${result.data.response} ${result.data.result} `,
          "error"
        );
      }
    },

  async EditChacklist_JobLineupfood(item){
        let EditChkshowID = { id: item.id };
        this.EditChkID = item.id;
        let result = await api.ListchktoEditLineupfood(EditChkshowID);
        console.log('ดูแก้ไข',result.data.response);
        if (result.data.response == "OK") {
          this.Edit_checklists_JobLineupfood = result.data.result[0].name;
          this.dialogEditchecklistJobLineupfood= true
        }  
    },

  async EditChacklist_submit_JobLineupfood(){
      let checkLists = { id: this.EditChkID, name: this.Edit_checklists_JobLineupfood };;
      let result = await api.EditchklistLineupfood(checkLists);
        if (result.data.response == "OK") {
          this.$swal.fire("แก้ไขรายการตรวจสอบเรียบร้อย", "", "success");
          this.JobLineupfood();
          this.dialogEditchecklistJobLineupfood= false
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
              this.JobLineupfood();
            }
          } else if (result.isDenied) {
            this.$swal.fire("ยกเลิกการลบ", "", "error");
          }
        });
    },

   async getChklistEquipment(){
      let getChklistEquipmentID = {quotation_code:this.qc }
      let result = await api.getChklistEquipmentteamhong(getChklistEquipmentID);
      if (result.data.response == "OK") {
          this.dialogCreatChecklistJobEquipment=true;
      } 
   },

// async  updatedescription_before(){
//       let setdescription = {quotation_code:this.qc ,description:this.description_before ,description_type:0}
//       let result = await api.descriptionTeamSetup(setdescription);
//       if (result.data.response == "OK") {
//         this.$swal.fire("บันทึกเพิ่มเติมเรียบร้อยแล้ว", "", "success");
//         this.JobLineupfood();
//       } 

//     },
//  async  updatedescription_between(){
//       let setdescription = {quotation_code:this.qc ,description:this.description_between ,description_type:1}
//       let result = await api.descriptionTeamSetup(setdescription);
//       if (result.data.response == "OK") {
//         this.$swal.fire("บันทึกเพิ่มเติมเรียบร้อยแล้ว", "", "success");
//         this.JobLineupfood();
//       } 
//     },
  // async  updatedescription_after(){
  //     let setdescription = {quotation_code:this.qc ,description:this.description_after ,description_type:2}
  //     let result = await api.descriptionTeamSetup(setdescription);
  //     if (result.data.response == "OK") {
  //       this.$swal.fire("บันทึกเพิ่มเติมเรียบร้อยแล้ว", "", "success");
  //       this.JobLineupfood();
  //     } 

  //   },

    
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

   async handleChange({ file, fileList }) {
      this.fileList = fileList;
      // console.log("ไฟล์", file);
      // console.log("ไฟล์ลิดส", fileList);
      if(file.status=="removed"){
        this.$swal
        .fire({
          title: `ต้องการลบรายการตรวจสอบนี้ใช่หรือไม่ ?`,
          showDenyButton: true,
          confirmButtonText: `ยืนยัน`,
          denyButtonText: `ยกเลิก`,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let deluplondimg = {uid:file.uid}
            let resultdel = await api.DELimgTeamSetup(deluplondimg);
            
            if (resultdel.data.response == "OK") {
              this.$swal.fire("ยืนยันการลบรูปเรียบร้อย", "", "success");
              this.JobLineupfood();
            }
          } else if (result.isDenied) {
            this.$swal.fire("ทำการลบรูปนี้เรียบร้อยแล้ว", "", "error");
          }
        });
      }

      // if(file.status=="removed"){
      //   let uplondimg = {uid:file.uid}
      //   let result = await api.DELimgTeamSetup(uplondimg);
      //   // console.log('ลบ',result);
      //   if (result.data.response == "OK") {
      //     this.$swal.fire("ทำการลบรูปนี้เรียบร้อยแล้ว", "", "error");
      //     this.JobLineupfood();
      //   }   
      // }
   
    
    },

    async uploadbefore({ file, onSuccess }) {
      // console.log('ไฟล์ssssssss',file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","lkp8jzgy");
      axios.post(`https://api.cloudinary.com/v1_1/digisolution/image/upload`,formData).then(async(res) => {
        // console.log('ได้',res.data);
        this.fileList_before=[...this.fileList_before, {name:res.data.original_filename, uid:res.data.asset_id, url:res.data.url}]
      let uplondimg = {quotation_code:this.qc ,name:res.data.original_filename, url:res.data.url, img_type:4}
      let result = await api.CreateimgLineupfood(uplondimg);
      console.log('ds',result);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
        this.JobLineupfood();
      }   
      });
      onSuccess('Ok')
    },
    async uploadbetween({ file, onSuccess }) {
      // console.log('ไฟล์ssssssss',file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","lkp8jzgy");
      axios.post(`https://api.cloudinary.com/v1_1/digisolution/image/upload`,formData).then(async(res) => {
        console.log('ได้',res.data);
        this.fileList_between=[...this.fileList_between, {name:res.data.original_filename, uid:res.data.asset_id, url:res.data.url}]
      let uplondimg = {quotation_code:this.qc ,name:res.data.original_filename, url:res.data.url, img_type:5}
      let result = await api.CreateimgLineupfood(uplondimg);
      // console.log('ds',result);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
        this.JobLineupfood();
      } 
        
      });
      onSuccess('Ok')
    },
    async uploadbetween_viwe({ file, onSuccess }) {
      // console.log('ไฟล์ssssssss',file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","lkp8jzgy");
      axios.post(`https://api.cloudinary.com/v1_1/digisolution/image/upload`,formData).then(async(res) => {
        // console.log('ได้',res.data);
        this.fileList_between=[...this.fileList_between, {name:res.data.original_filename, uid:res.data.asset_id, url:res.data.url}]
      let uplondimg = {quotation_code:this.qc ,name:res.data.original_filename, url:res.data.url, img_type:6}
      let result = await api.CreateimgLineupfood(uplondimg);
      // console.log('ds',result);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
        this.JobLineupfood();
      } 
        
      });
      onSuccess('Ok')
    },
    async uploadafter({ file, onSuccess }) {
      // console.log('ไฟล์ssssssss',file);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset","lkp8jzgy");
      axios.post(`https://api.cloudinary.com/v1_1/digisolution/image/upload`,formData).then(async(res) => {
        // console.log('ได้',res.data);
        this.fileList_after=[...this.fileList_after, {name:res.data.original_filename, uid:res.data.asset_id, url:res.data.url}]
      let uplondimg = {quotation_code:this.qc ,name:res.data.original_filename, url:res.data.url, img_type:6}
      let result = await api.CreateimgLineupfood(uplondimg);
      // console.log('ds',result);
      if (result.data.response == "OK") {
        this.$swal.fire("บันทึกรูปเรียบร้อยแล้ว", "", "success");
        this.JobLineupfood();
      } 
        
      });
      onSuccess('Ok')
    },
  },
};
</script>

<style scoped>
</style>
