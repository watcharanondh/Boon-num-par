<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">{{ Changesubmit }}ใบเสนอราคา</div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>

      <v-row justify="center">
        <v-col lg="9" md="9" sm="12" cols="12">
          <!-- Tap เมนู ข้อมูลแพ็คเกจ -->
          <v-tabs v-model="tab" left color="black">
            <v-tab href="#tab-1">
              ข้อมูลลูกค้า
            </v-tab>
            <v-tab href="#tab-2">
              เลือกแพ็กเกจ
            </v-tab>
            <v-tab href="#tab-3">
              เลือกโปรโมชั่น
            </v-tab>
            <v-tab-item value="tab-1">
              <v-form
                  ref="form"
                  v-model="valid"
                  lazy-validation
              >
              <v-card flat>
                <v-card-text>
                  <!-- ค้นหารายชื่อลูกค้า หรือ ค้นหาหมายเลขลูกค้า -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" cols="12">
                      <div class="sizehead">
                        ค้นหารายชื่อลูกค้า หรือ ค้นหาหมายเลขลูกค้า
                      </div>
                      <v-row class="no-gutters">
                        <v-autocomplete
                          v-model="selectListCustomer"
                          :items="itemsListCustomer"
                          :loading="loading"
                          :search-input.sync="searchListCustomer"
                          color="white"
                          cache-items
                          hide-no-data
                          hide-details
                          label="ชื่อลูกค้าและหมายเลขลูกค้า"
                          placeholder="เริ่มค้นหา"
                          v-on:change="FindCustomer(selectListCustomer)"
                          filled
                          dense
                          solo
                          outlined
                          clearable
                          return-object
                        ></v-autocomplete>
                      </v-row>
                    </v-col>
                  </v-row>
                  <!-- ประเภทลูกค้า -->
                  <v-row>
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">ประเภทลูกค้า</div>
                      <v-row class="no-gutters">
                        <v-select
                          v-model="Quotation_Person_type"
                          :items="Quotation_Person_item_type"
                          item-text="name"
                          item-value="value"
                          return-object
                          filled
                          dense
                          solo
                          outlined
                        ></v-select>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- หมายเลขผู้เสียภาษี -->
                  <v-row>
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">หมายเลขผู้เสียภาษี</div>
                      <v-row class="no-gutters">
                        <v-text-field
                          v-model="Quotation_tax_id"
                          dense
                          solo
                          outlined
                          clearable
                        ></v-text-field>
                      </v-row>
                    </v-col>

                    <!-- ชื่อผู้เสียภาษี -->
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">ชื่อผู้เสียภาษี</div>
                      <v-row class="no-gutters">
                        <v-text-field
                          v-model="Quotation_fullname"
                          dense
                          solo
                          outlined
                          :rules="Taxinvoiceinfo_fullnameRules"
                          clearable
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- แฟลช -->
                  <v-row>
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">แฟลช</div>
                      <v-row class="no-gutters">
                        <v-text-field
                          v-model="Quotation_fax"
                          dense
                          solo
                          outlined
                          clearable
                        ></v-text-field>
                      </v-row>
                    </v-col>

                    <!-- อีเมล์ -->
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">อีเมล์</div>
                      <v-row class="no-gutters">
                        <v-text-field
                          v-model="Quotation_email"
                          dense
                          solo
                          outlined
                          clearable
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- โทรศัพท์ -->
                  <v-row>
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">โทรศัพท์</div>
                      <v-row class="no-gutters">
                  <v-text-field-integer
                    v-model="Quotation_telephone_number"
                    v-bind:properties="{
                      dense: true,
                      solo: true,
                      outlined: true,
                      clearable: true,
                      placeholder: '02 1234 567 ,0 5312 3456',
                      required: true,
                      
                    }"
                    v-bind:options="{
                      inputMask: '# #### ####',
                      outputMask: '#########',
                      empty: null,
                      alphanumeric: true,
                    }"
                    class="w-100"
                  />
                      </v-row>
                    </v-col>

                    <!-- มือถือ -->
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">มือถือ</div>
                      <v-row class="no-gutters">
                      <v-text-field-integer
                          v-model="Quotation_mobile_phone_number"
                          v-bind:properties="{                
                            dense: true,
                            solo: true,
                            outlined: true,
                            clearable: true,
                            placeholder: '08 1123 4567',
                            rules:Taxinvoiceinfo_telemobile_phone_numberRules,
                            required: true,
                          }"
                          v-bind:options="{
                            inputMask: '## #### ####',
                            outputMask: '##########',
                            empty: null,
                            alphanumeric: true,
                            applyAfter: false,
                          }"
                          class="w-100"
                        />
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- วันจัดงาน -->
                  <v-row>
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">วันจัดงาน</div>
                      <v-row class="no-gutters">
                        <v-menu
                          v-model="menu_Quotation_event_date"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="Quotation_event_date"
                              label="เลือกวันที่จัดงาน"
                              dense
                              solo
                              outlined
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="Quotation_event_date"
                            @input="menu_Quotation_event_date = false"
                            color="yellow darken-3"
                            locale="th"
                          ></v-date-picker>
                        </v-menu>
                      </v-row>
                    </v-col>

                    <!-- วันนัดดูพื้นที่ -->
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">วันนัดดูพื้นที่</div>
                      <v-row class="no-gutters">
                        <v-menu
                          v-model="menu_Quotation_area_viewing_date"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="Quotation_area_viewing_date"
                              label="เลือกวันนัดดูพื้นที่"
                              dense
                              solo
                              outlined
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="Quotation_area_viewing_date"
                            @input="menu_Quotation_area_viewing_date = false"
                            color="yellow darken-3"
                            locale="th"
                          ></v-date-picker>
                        </v-menu>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- หมายเหตุ -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" cols="12">
                      <div class="sizehead">หมายเหตุ</div>
                      <v-row class="no-gutters">
                        <v-textarea
                          v-model="Quotation_note"
                          rows="2"
                          dense
                          solo
                          outlined
                          clearable
                        ></v-textarea>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- ที่อยู่ -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" cols="12">
                      <div class="sizehead">ที่อยู่</div>
                      <v-row class="no-gutters">
                        <v-text-field
                          v-model="Quotation_address"
                          dense
                          solo
                          outlined
                          :rules="Taxinvoiceinfo_teleaddressRules"
                          clearable
                        ></v-text-field>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- จังหวัด -->
                  <v-row>
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">จังหวัด</div>
                      <v-row class="no-gutters">
                        <v-select
                          v-model="Quotation_SelectProvinces"
                          :items="Quotation_GatProvince"
                          item-text="province_Name"
                          item-value="province_Code"
                          placeholder="เลือกจังหวัด"
                          v-on:change="FindAmphoeSelected()"
                          return-object
                          filled
                          dense
                          solo
                          outlined
                        >
                        </v-select>
                      </v-row>
                    </v-col>

                    <!-- เขต/อำเภอ -->
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">เขต/อำเภอ</div>
                      <v-row class="no-gutters">
                        <v-select
                          v-model="Quotation_SelectAmphoe"
                          :items="Quotation_GatAmphoe"
                          item-text="amphoe_Name"
                          item-value="amphoe_Code"
                          placeholder="เลือกอำเภอ"
                          v-on:change="FindDistrict_Zipcode_Selected()"
                          return-object
                          filled
                          dense
                          solo
                          outlined
                        >
                        </v-select>
                      </v-row>
                    </v-col>
                  </v-row>

                  <!-- แขวง/ตำบล -->
                  <v-row>
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">แขวง/ตำบล</div>
                      <v-row class="no-gutters">
                        <v-select
                          v-model="Quotation_SelectDistrict"
                          :items="Quotation_GatDistrict"
                          item-text="district_Name"
                          placeholder="เลือกแขวง/ตำบล"
                          v-on:change="FindProv_idSelected()"
                          return-object
                          filled
                          dense
                          solo
                          outlined
                        >
                        </v-select>
                      </v-row>
                    </v-col>

                    <!-- รหัสไปรษณีย์ -->
                    <v-col lg="6" md="6" sm="12" cols="12">
                      <div class="sizehead">รหัสไปรษณีย์</div>
                      <v-row class="no-gutters">
                        <v-text-field
                          v-model="Quotation_SelectZipcode"
                          placeholder="รหัสไปรษณีย์"
                          dense
                          solo
                          outlined
                          disabled
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
                    @click="$router.push('/Quotation')"
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
              <!-- ค้นหาแพ็กเกจ -->
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="searchPackage"
                    clearable
                    solo
                    rounded
                    prepend-inner-icon="mdi-magnify"
                    label="ค้นหาแพ็กเกจ"
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- ตารางแพ็กเกจ -->
              <v-col lg="12" md="12" sm="12" cols="12">
                <v-row class="no-gutters">
                  <v-data-table
                    :search="searchPackage"
                    :headers="headers_package_data"
                    :items="package_data_items"
                    :items-per-page="5"
                    hide-default-header
                    mobile-breakpoint="0"
                    class="elevation-1"
                  >
                    <!-- table top section -->
                    <template v-slot:top>
                      <v-toolbar flat>
                        <v-toolbar-title><span>แพ็กเกจ</span></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <!-- <v-divider class="mx-5" inset vertical></v-divider>
                    <v-row class="ma-2">
                      <div>
                        <svg
                          width="14"
                          height="12"
                          viewBox="0 0 14 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.128568 2.26839L2.31563 0.125478C2.48647 -0.0418526 2.7636 -0.0417991 2.93434 0.125478L5.12132 2.26839C5.39667 2.53812 5.20059 3.00001 4.81195 3.00001H3.5V11.5714C3.5 11.8081 3.30414 12 3.0625 12H2.1875C1.94586 12 1.75 11.8081 1.75 11.5714V3.00001H0.437935C0.0485329 3.00001 -0.146209 2.53758 0.128568 2.26839ZM6.5625 1.7143H13.5625C13.8041 1.7143 14 1.52243 14 1.28573V0.428584C14 0.191879 13.8041 1.34454e-05 13.5625 1.34454e-05H6.5625C6.32086 1.34454e-05 6.125 0.191879 6.125 0.428584V1.28573C6.125 1.52243 6.32086 1.7143 6.5625 1.7143ZM6.125 4.71429V3.85715C6.125 3.62045 6.32086 3.42858 6.5625 3.42858H11.8125C12.0541 3.42858 12.25 3.62045 12.25 3.85715V4.71429C12.25 4.951 12.0541 5.14287 11.8125 5.14287H6.5625C6.32086 5.14287 6.125 4.951 6.125 4.71429ZM6.125 11.5714V10.7143C6.125 10.4776 6.32086 10.2857 6.5625 10.2857H8.3125C8.55414 10.2857 8.75 10.4776 8.75 10.7143V11.5714C8.75 11.8081 8.55414 12 8.3125 12H6.5625C6.32086 12 6.125 11.8081 6.125 11.5714ZM6.125 8.14286V7.28572C6.125 7.04901 6.32086 6.85715 6.5625 6.85715H10.0625C10.3041 6.85715 10.5 7.04901 10.5 7.28572V8.14286C10.5 8.37957 10.3041 8.57143 10.0625 8.57143H6.5625C6.32086 8.57143 6.125 8.37957 6.125 8.14286Z"
                            fill="#C5C7CD"
                          />
                        </svg>
                        Sort
                      </div>
                    </v-row>
                    <v-row>
                      <div>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M11.4369 0H0.563154C0.0635131 0 -0.188604 0.606234 0.165419 0.960258L4.5 5.29549V10.125C4.5 10.3085 4.58955 10.4805 4.73993 10.5858L6.61493 11.8979C6.98484 12.1568 7.5 11.8944 7.5 11.437V5.29549L11.8347 0.960258C12.188 0.606937 11.9376 0 11.4369 0Z"
                            fill="#C5C7CD"
                          />
                        </svg>
                        Filter
                      </div>
                    </v-row> -->
                      </v-toolbar>
                    </template>
                    <!-- table tr section -->
                    <template v-slot:item="{ item }">
                      <tr>
                        <td>
                          {{ item.name }}
                          <div>update {{ item.update }}</div>
                        </td>
                        <td>{{ item.food_des }}</td>
                        <td>
                          <v-btn
                            small
                            elevation="1"
                            @click="selectedPackage(item)">เลือก</v-btn>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-row>
              </v-col>
              <!-- แพ็กเกจที่ท่านเลือก (เลือกได้แค่แพ็กเกจเดียว) -->
              <v-row>
                <v-col lg="12" md="12" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <div class="sizehead">
                      แพ็กเกจที่ท่านเลือก<span class="text-sm-body-2 red--text">(เลือกได้แค่แพ็กเกจเดียว)</span>
                    </div>
                  </v-row>
                </v-col>
              </v-row>

              <v-col lg="12" md="12" sm="12" cols="12">
                <v-row class="no-gutters">
                  <v-data-table
                    :headers="headers_package_selected_data"
                    :items="package_selected_items"
                    :items-per-page="5"
                    hide-default-header
                    hide-default-footer
                    mobile-breakpoint="0"
                    class="elevation-1"
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td>
                          {{ item.name }}
                          <div>update {{ item.update }}</div>
                        </td>
                        <td>{{ item.food_des }}</td>
                        <td>
                          <v-btn
                            small
                            elevation="1"
                            @click="DeletePackage(item)">ลบ</v-btn>
                        </td>
                      </tr>
                    </template></v-data-table>
                </v-row>
              </v-col>

              <!-- เลือกอาหารแพ็กเกจ (ถ้าลูกค้ายังไม่คอนเฟิร์มยังไม่ต้องใส่) -->
              <v-row>
                <v-col lg="12" md="12" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <div class="sizehead">
                      เลือกอาหารแพ็กเกจ
                      <span class="text-sm-body-2 red--text">(ถ้าลูกค้ายังไม่คอนเฟิร์มยังไม่ต้องใส่)</span>
                    </div>
                  </v-row>
                </v-col>
              </v-row>
              <!-- อาหารคาว -->
              <v-row>
                <v-col lg="12" md="12" sm="12" cols="12">
                  <div class="sizehead">
                    อาหารคาว
                    <span class="text-sm-body-2 grey--text">เลือก {{ check_select_savory_food }} เหลือ{{ package_amount_savory_food }}</span>
                  </div>
                  <v-row class="no-gutters">
                    <v-combobox
                      v-model="select_savory_food"
                      :items="savory_food_items"
                      :search-input.sync="search_savory_food"
                      hide-selected
                      label="เลือกอาหารคาว"
                      multiple
                      persistent-hint
                      small-chips
                      deletable-chips
                      dense
                      solo
                      outlined
                      clearable
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              "ไม่สามารถเลือกอาหารคาวได้" เนื่องจากของหมดสต๊อก
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-combobox>
                  </v-row>
                </v-col>
              </v-row>

              <!-- อาหารหวาน -->
              <v-row>
                <v-col lg="12" md="12" sm="12" cols="12">
                  <div class="sizehead">
                    อาหารหวาน
                    <span class="text-sm-body-2 grey--text">เลือก {{ check_select_sweet_food }} เหลือ{{ package_amount_sweet_food }}</span>
                  </div>
                  <v-row class="no-gutters">
                    <v-combobox
                      v-model="select_sweet_food"
                      :items="sweet_food_items"
                      :search-input.sync="search_sweet_food"
                      hide-selected
                      label="เลือกอาหารคาว"
                      multiple
                      persistent-hint
                      small-chips
                      deletable-chips
                      dense
                      solo
                      outlined
                      clearable
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              "ไม่สามารถเลือกอาหารหวานได้" เนื่องจากของหมดสต๊อก
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-combobox>
                  </v-row>
                </v-col>
              </v-row>
              <!-- เครื่องดืม -->
              <v-row>
                <v-col lg="12" md="12" sm="12" cols="12">
                  <div class="sizehead">
                    เครื่องดืม
                    <span class="text-sm-body-2 grey--text"
                      >เลือก {{ check_select_drink }} เหลือ
                      {{ package_amount_drink }}</span
                    >
                  </div>
                  <v-row class="no-gutters">
                    <v-combobox
                      v-model="select_drink"
                      :items="drink_items"
                      :search-input.sync="search_drink"
                      :rules="drinkfoodRules"
                      hide-selected
                      label="เลือกเครื่องดืม"
                      multiple
                      persistent-hint
                      small-chips
                      deletable-chips
                      dense
                      solo
                      outlined
                      clearable
                    >
                      <template v-slot:no-data>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              "ไม่สามารถเลือกเครื่องดืมได้" เนื่องจากของหมดสต๊อก
                            </v-list-item-title>
                          </v-list-item-content>
                        </v-list-item>
                      </template>
                    </v-combobox>
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
                    @click="changetoTab3()"
                    ><span class="white--text">ถัดไป</span></v-btn
                  >
                </v-col>
              </v-row>
          </v-tab-item>

            <v-tab-item value="tab-3">
              <!-- ค้นหาโปรโมชั่น -->
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="searchPromotion"
                    clearable
                    solo
                    rounded
                    prepend-inner-icon="mdi-magnify"
                    label="ค้นหาโปรโมชั่น"
                  ></v-text-field>
                </v-row>
              </v-col>

              <!-- รายการโปรโมชั่น -->
              <v-row>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <h3>รายการโปรโมชั่น</h3>
                    <span class="text-caption grey--text pt-1 ml-3">{{ promotion_table_all_total }} รายการ</span>
                  </v-row>
                  <!-- รายการโปรโมชั่น -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" cols="12">
                      <v-row class="no-gutters">
                        <v-data-table
                          :search="searchPromotion"
                          :headers="headers_promotion_table"
                          :items="promotion_table_items"
                          :items-per-page="10"
                          hide-default-header
                          mobile-breakpoint="0"
                          class="elevation-1"
                        >
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.name }}</td>
                              <td>
                                <v-btn
                                  small
                                  elevation="1"
                                  @click="selectedPromotion(item)"
                                  >เลือก</v-btn
                                >
                              </td>
                            </tr>
                          </template>
                        </v-data-table>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-col>

                <!-- โปรโมชั่นที่เลือก -->
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <h3>โปรโมชั่นที่เลือก</h3>
                    <span class="text-caption grey--text pt-1 ml-3 ">{{ promotion_table_select_total }} รายการ</span>
                  </v-row>
                  

                  <!-- โปรโมชั่นที่เลือก -->
                  <v-row>
                    <v-col lg="12" md="12" sm="12" cols="12">
                      <v-row class="no-gutters">
                        <v-data-table
                          :headers="headers_promotion_selected_table"
                          :items="promotion_table_selected_items"
                          :items-per-page="10"
                          hide-default-header
                          hide-default-footer
                          mobile-breakpoint="0"
                          class="elevation-1"
                        >
                          <template v-slot:item="{ item }">
                            <tr>
                              <td>{{ item.name }}</td>
                              <td>
                                <v-btn
                                  small
                                  elevation="1"
                                  @click="deletePromotion(item)"
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
                  <v-btn block large rounded outlined @click="changetoTab2()"
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
  name: "FormQuotation",

  props: ["CreateorEdittype"],

  async created() {
    await this.loadDataCustomer();
    await this.loadDataProvince();
    await this.loadDataPackage();
    await this.loadDataPromotion();
    await this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },
  data: () => ({
    tab: "tab-1",
    pasoneltype: null,
    CreateorEdit: true,
    editedIndex: -1,

    //ค้นหารายชื่อและID
    EditQuotation_ID: null,
    loading: false,
    selectListCustomer: null,
    searchListCustomer: null,
    itemsListCustomer: [],
    DataCustomer: [],

    //ข้อมูลลูกค้าประเภทบุคคลและนิติบุคคล
    menu_Quotation_event_date: false,
    menu_Quotation_area_viewing_date: false,
    Quotation_Person_type: {},
    Quotation_Person_item_type: [],
    Quotation_customer_id: null,
    Quotation_tax_id: "",
    Quotation_fullname: "",
    Quotation_fax: null,
    Quotation_email: null,
    Quotation_telephone_number: "",
    Quotation_mobile_phone_number: "",
    Quotation_event_date: new Date().toISOString().substr(0, 10),
    Quotation_area_viewing_date: new Date().toISOString().substr(0, 10),
    Quotation_note: "",
    Quotation_address: "",
    Quotation_district_id: "",

    //แก้ไขข้อมูลลูกค้าประเภทบุคคลและนิติบุคคล
    EditQuotation_Name: "",

    //ข้อมูลจังหวัดลูกค้าประเภทบุคคลและนิติบุคคล
    Quotation_SelectProvinces: {},
    Quotation_GatProvince: [],
    Quotation_SelectAmphoe: {},
    Quotation_GatAmphoe: [],
    Quotation_SelectDistrict: {},
    Quotation_GatDistrict: [],
    Quotation_SelectZipcode: null,

    //เลือกแพ็กเกจ
    Package_ID: null,
    searchPackage: "",
    package_amount_savory_food: 0,
    package_amount_sweet_food: 0,
    package_amount_drink: 0,
    select_savory_food: [],
    select_sweet_food: [],
    select_drink: [],
    savory_food_items: [
      "ขนมจีนน้ำเงี้ยว",
      "ยำวุ้นเส้น",
      "หมูไข่พะโล้",
      "ลาบหมู",
      "แกงอ่อมไก่",
      "แกงเขียวหวานไก่",
      "แกงจืดหน่อไม้ไก่",
      "ยำถั่วพู",
      "ต้มข่าไก่",
      "ต้มยำกุ้ง",
    ],
    sweet_food_items: [
      "กล้วยเชื่อม",
      "วุ้นกะทิ",
      "บัวลอยไข่หวาน",
      "ฟักทองแกงบวด",
      "สังขยา",
      "สาคูเปียกมะพร้าวอ่อน",
      "ถั่วกวน",
      "ขนมโค",
      "ขนมหยกมณี",
      "ถั่วเขียวต้มน้ำตาล",
    ],
    drink_items: [
      "กาแฟ",
      "น้ำทับทิม",
      "น้ำแตงโม",
      "โอวัลติน",
      "น้ําโค้ก",
      "ชาเย็น",
      "นํ้าส้ม",
      "ชาเขียว",
      "นํ้าใบบัวบก",
      "น้ำอัญชันมะนาว",
    ],
    search_savory_food: null,
    search_sweet_food: null,
    search_drink: null,
    check_select_savory_food: 0,
    check_select_sweet_food: 0,
    check_select_drink: 0,

    package_data_items: [],
    headers_package_data: [
      { text: "", value: "name", sortable: false, align: "start", color: "black",},
      { text: "", value: "food_des", sortable: false,  align: "start", color: "black",},
      { text: "", value: "", sortable: false, align: "start", color: "black" },
    ],

    package_selected_items: [],
    headers_package_selected_data: [
      { text: "", value: "name",sortable: false,align: "start", color: "black",},
      { text: "",value: "food_des", sortable: false, align: "start",color: "black",},
      { text: "", value: "", sortable: false, align: "start", color: "black" },
    ],

    //เลือกโปรโมชั่น
    searchPromotion: "",
    promotion_selectd_id: [],
    promotion_table_all_total: 0,
    promotion_table_select_total: 0,

    promotion_table_items: [],
    headers_promotion_table: [
      { text: "", value: "name", sortable: false, align: "start", color: "black",},
      { text: "", value: "", sortable: false, align: "start", color: "black" },
    ],

    promotion_table_selected_items: [],
    headers_promotion_selected_table: [
      { text: "", value: "name", sortable: false, align: "start",color: "black",},
      { text: "", value: "", sortable: false, align: "start", color: "black" },
    ],

    valid:true,
    Taxinvoiceinfo_fullnameRules:[v1=>!!v1 || "กรุณากรอกชื่อผู้เสียภาษี",],
    Taxinvoiceinfo_telemobile_phone_numberRules:[
      v1=>!!v1 || "กรุณากรอกเบอร์มือถือ",
      v1 => (v1 && v1.length >= 12) || "กรุณากรอกเบอร์มือถือให้ครบ 10 หลัก",
    ],
    Taxinvoiceinfo_teleaddressRules:[v1=>!!v1 || "กรุณากรอกที่อยู่",],

    // savoryfoodRules:[v1=>!!v1 || "กรุณาเลือกอาหารคาว ตามจำนวนแพ็กเกจ",],
    // sweetfoodRules:[v1=>!!v1 || "กรุณาเลือกอาหารหวาน ตามจำนวนแพ็กเกจ",],
    // drinkfoodRules:[v1=>!!v1 || "กรุณาเลือกเครื่องดืม ตามจำนวนแพ็กเกจ",],
    
  }),

  watch: {
    searchListCustomer(val) {
      val && val !== this.select && this.querySelections(val);
    },
    select_savory_food(val) {
      this.check_select_savory_food = val.length;
      if (val.length > this.package_amount_savory_food) {
        this.$nextTick(() => this.select_savory_food.pop());
        this.$swal.fire(
            "แจ้งเตือน",
            `"ไม่สามารถเลือกอาหารคาวได้อีก" เนื่องจากครบจำนวนตามแพ็กเก็จแล้ว`,
            "warning"
          );
      }
    },
    select_sweet_food(val) {
      this.check_select_sweet_food = val.length;
      if (val.length > this.package_amount_sweet_food) {
        this.$nextTick(() => this.select_sweet_food.pop());
        this.$swal.fire(
            "แจ้งเตือน",
            `"ไม่สามารถเลือกอาหารหวานได้อีก" เนื่องจากครบจำนวนตามแพ็กเก็จแล้ว`,
            "warning"
          );
      }
    },
    select_drink(val) {
      this.check_select_drink = val.length;
      if (val.length > this.package_amount_drink) {
        this.$nextTick(() => this.select_drink.pop());
         this.$swal.fire(
            "แจ้งเตือน",
            `"ไม่สามารถเลือกเครื่องดื่มได้อีก" เนื่องจากครบจำนวนตามแพ็กเก็จแล้ว`,
            "warning"
          );
      }
    },
  },

  computed: {
    Changesubmit() {
      return this.CreateorEdittype == true ? "บันทึก" : "แก้ไข";
    },
  },

  methods: {
    changetoTab1() {
        this.tab = "tab-1";
    },
    changetoTab2() {
      if(this.$refs.form.validate() == true){
        this.tab = "tab-2";
       }
    },
    changetoTab3() {
      if(this.package_selected_items.length >0){
              this.tab = "tab-3";
      }else{
          this.$swal.fire(
                    "แจ้งเตือน",
                    `กรุณาเลือกแพ็กเกจ หนึงแพ็กเกจ`,
                    "warning"
                  );
      }
    },
    async loadDataCustomer() {
      let resultgetListcustomer = await api.getListcustomertypeselector();
      resultgetListcustomer.data.result.forEach((element) => {
        this.Quotation_Person_item_type.push({
          name: element.name,
          id: element.id,
        });
      });
      this.Quotation_Person_type = this.Quotation_Person_item_type[0];

      let result = await api.getCustomerQuotation();
      this.DataCustomer = result.data.result;
      if (this.CreateorEdittype == false) {
        this.loadDataPackage();
        this.loadDataPromotion();
        this.EditQuotation_ID = this.$store.getters["Newpersonal_BNP_ID"].BNP_ID;
        let DataEditFindCustomer = { quotation_code: this.EditQuotation_ID };
        let result = await api.getEditQuotation(DataEditFindCustomer);

        this.Quotation_Person_type = {
          id: result.data.result.customers_data[0].customer_type_id,
          name: result.data.result.customers_data[0].customer_type_name,
        };
        this.Quotation_customer_id = result.data.result.customers_data[0].customer_code;

        this.Quotation_tax_id = result.data.result.customers_data[0].tax_id;

        this.Quotation_fullname = result.data.result.customers_data[0].title;
        this.EditQuotation_Name = result.data.result.customers_data[0].name;

        this.Quotation_fax = result.data.result.customers_data[0].flash_number;
        this.Quotation_email = result.data.result.customers_data[0].email;
        this.Quotation_telephone_number = result.data.result.customers_data[0].telephone_number;
        this.Quotation_mobile_phone_number = result.data.result.customers_data[0].mobile_phone_number;
        this.Quotation_event_date = result.data.result.customers_data[0].event_date;
        this.Quotation_area_viewing_date = result.data.result.customers_data[0].area_viewing_date;

        this.Quotation_address = result.data.result.customers_data[0].address;
        this.Quotation_district_id =  result.data.result.customers_data[0].district_id;
        this.Quotation_SelectProvinces = {
          province_Name: result.data.result.customers_data[0].province,
          province_Code: result.data.result.customers_data[0].province_code,
        };
        this.Quotation_GatProvince.push({
          province_Name: result.data.result.customers_data[0].province,
          province_Code: result.data.result.customers_data[0].province_code,
        });
        this.Quotation_SelectAmphoe = {
          amphoe_Name: result.data.result.customers_data[0].amphoe,
          amphoe_Code: result.data.result.customers_data[0].amphoe_code,
        };
        this.Quotation_GatAmphoe.push({
          amphoe_Name: result.data.result.customers_data[0].amphoe,
          amphoe_Code: result.data.result.customers_data[0].amphoe_code,
        });
        this.Quotation_SelectDistrict = {
          district_Name: result.data.result.customers_data[0].district,
          amphoe_Code: result.data.result.customers_data[0].district_code,
        };
        this.Quotation_GatDistrict.push({
          district_Name: result.data.result.customers_data[0].district,
          amphoe_Code: result.data.result.customers_data[0].district_code,
        });
        this.Quotation_SelectZipcode = result.data.result.customers_data[0].zipcode;
        this.Quotation_note = result.data.result.customers_data[0].note;
        this.package_amount_savory_food = result.data.result.customers_data[0].amount_savory_food;
        this.package_amount_sweet_food =
          result.data.result.customers_data[0].amount_sweet_food;
        this.package_amount_drink =
          result.data.result.customers_data[0].amount_drink;

        this.package_selected_items.push(result.data.result.packages_data[0]);
        console.log('package_code',result.data.result.packages_data);
        this.Package_ID = result.data.result.packages_data[0].package_code;

        for (let i = 0; i < this.package_amount_savory_food; i++) {
          this.select_savory_food.push(this.savory_food_items[i]);
        }
        for (let i = 0; i < this.package_amount_sweet_food; i++) {
          this.select_sweet_food.push(this.savory_food_items[i]);
        }
        for (let i = 0; i < this.package_amount_drink; i++) {
          this.select_drink.push(this.savory_food_items[i]);
        }

        //โปรโมชั่น
        let promotion_table_selected = result.data.result.promotions_data
        if(promotion_table_selected.length > 0){
            this.promotion_table_selected_items.push(result.data.result.promotions_data[0]);
            this.promotion_table_select_total = this.promotion_table_selected_items.length;
        }else{
             this.promotion_table_selected_items =[]
        }
    
      }
    },
    async FindCustomer(selectListCustomer) {
      let DataFindCustomer = { iden: selectListCustomer };
      let result = await api.getCreateCustomerQuotation(DataFindCustomer);
      this.Quotation_customer_id = result.data.result[0].customer_code;
      this.Quotation_tax_id = result.data.result[0].tax_id;
      this.Quotation_fullname = result.data.result[0].name;
      this.Quotation_fax = result.data.result[0].flash_number;
      this.Quotation_email = result.data.result[0].email;
      this.Quotation_telephone_number = result.data.result[0].telephone_number;
      this.Quotation_mobile_phone_number =
        result.data.result[0].mobile_phone_number;
      this.Quotation_address = result.data.result[0].address;
      this.Quotation_district_id = result.data.result[0].district_id;
      this.Quotation_SelectProvinces = {
        province_Name: result.data.result[0].province,
        province_Code: result.data.result[0].province_code,
      };
      this.Quotation_GatProvince.push({
        province_Name: result.data.result[0].province,
        province_Code: result.data.result[0].province_code,
      });
      this.Quotation_SelectAmphoe = {
        amphoe_Name: result.data.result[0].amphoe,
        amphoe_Code: result.data.result[0].amphoe_code,
      };
      this.Quotation_GatAmphoe.push({
        amphoe_Name: result.data.result[0].amphoe,
        amphoe_Code: result.data.result[0].amphoe_code,
      });
      this.Quotation_SelectDistrict = {
        district_Name: result.data.result[0].district,
        amphoe_Code: result.data.result[0].district_code,
      };
      this.Quotation_GatDistrict.push({
        district_Name: result.data.result[0].district,
        amphoe_Code: result.data.result[0].district_code,
      });
      this.Quotation_SelectZipcode = result.data.result[0].zipcode;
    },

    async loadDataPackage() {
      let result = await api.getPackageQuotation();
      this.package_data_items = result.data.result;
    },
    selectedPackage(item) {
      if (this.package_selected_items.length <= 0) {
        this.package_selected_items.push(item);
        // this.editedIndex = this.package_data_items.indexOf(item)
        // this.package_data_items.splice(this.editedIndex, 1)
        this.Package_ID = item.package_code;
        this.package_amount_savory_food = item.amount_savory_food;
        this.package_amount_sweet_food = item.amount_sweet_food;
        this.package_amount_drink = item.amount_drink;
      } else {
         this.$swal.fire(
            "แจ้งเตือน",
            `เลือกแพ็กเกจได้แพ็กเกจเดียว`,
            "warning"
          );
      }
    },
    DeletePackage(item) {
      this.editedIndex = this.package_selected_items.indexOf(item);
      this.package_selected_items.splice(this.editedIndex, 1);
      this.Package_ID = null;
      this.package_amount_savory_food = 0;
      this.package_amount_sweet_food = 0;
      this.package_amount_drink = 0;
      this.select_savory_food = [];
      this.select_sweet_food = [];
      this.select_drink = [];
    },

    async loadDataPromotion() {
      let result = await api.getPromotionQuotation();
      this.promotion_table_items = result.data.result;
      this.promotion_table_all_total = this.promotion_table_items.length;
    },
    selectedPromotion(item) {
      if (this.promotion_table_selected_items.length <= 0) {
        this.promotion_table_selected_items.push(item);
        // this.editedIndex = this.promotion_table_items.indexOf(item)
        // this.promotion_table_items.splice(this.editedIndex, 1)
        this.promotion_selectd_id.push(item.promotion_code);
        this.promotion_table_all_total = this.promotion_table_items.length;
        this.promotion_table_select_total = this.promotion_table_selected_items.length;
      } else {
        this.$swal.fire(
            "แจ้งเตือน",
            `เลือกโปรโมชั่นได้โปรโมชั่นเดียว`,
            "warning"
          );
      }
    },
    deletePromotion(item) {
      this.editedIndex = this.promotion_table_selected_items.indexOf(item);
      this.promotion_table_selected_items.splice(this.editedIndex, 1);
      this.promotion_selectd_id = [];
      this.promotion_table_all_total = this.promotion_table_items.length;
      this.promotion_table_select_total = 0;
    },
    async loadDataProvince() {
      let result = await api.getProvinces();
      let provinces = result.data.result;
      let _this = this;
      provinces.forEach((value) => {
        _this.Quotation_GatProvince.push({
          province_Name: `${value.province}`,
          province_Code: `${value.province_code}`,
        });
      });
    },

    async FindAmphoeSelected() {
      (this.Quotation_GatAmphoe = []), (this.Quotation_GatDistrict = []);
      //console.log( this.Quotation_SelectProvinces.province_Code);
      //console.log( this.Quotation_SelectProvinces.province_Name);
      let QuotationProv = {
        province_code: this.Quotation_SelectProvinces.province_Code,
        province: this.Quotation_SelectProvinces.province_Name,
      };
      let resultQuotationProv = await api.getAmphoe(QuotationProv);
      let AmphoeQuotation = resultQuotationProv.data.result;
      let _this = this;
      AmphoeQuotation.forEach((value) => {
        _this.Quotation_GatAmphoe.push({
          amphoe_Name: `${value.amphoe}`,
          amphoe_Code: `${value.amphoe_code}`,
        });
      });
    },

    async FindDistrict_Zipcode_Selected() {
      this.Quotation_GatDistrict = [];
      this.Quotation_SelectZipcode = [];
      let QuotationAmphoe = {
        amphoe_code: this.Quotation_SelectAmphoe.amphoe_Code,
        amphoe: this.Quotation_SelectAmphoe.amphoe_Name,
      };
      let resultQuotationAmphoe = await api.getDistrict(QuotationAmphoe);
      let DistrictQuotationAmphoe = resultQuotationAmphoe.data.result;
      let _this = this;
      DistrictQuotationAmphoe.forEach((value) => {
        _this.Quotation_GatDistrict.push({
          district_Name: `${value.district}`,
          zipcode: `${value.zipcode}`,
          prov_id: `${value.id}`,
        });
      });
    },

    FindProv_idSelected() {
      this.Quotation_SelectZipcode = this.Quotation_SelectDistrict.zipcode;
      this.Quotation_district_id = this.Quotation_SelectDistrict.prov_id;
      // console.log(this.Quotation_SelectZipcode);
      // console.log(this.Quotation_district_id);
    },

    querySelections(v) {
      this.loading = true;
      setTimeout(() => {
        this.itemsListCustomer = this.DataCustomer.filter((e) => {
          return (e || "").toLowerCase().indexOf((v || "").toLowerCase()) > -1;
        });
        this.loading = false;
      }, 500);
    },
    async submit() {
      
      //สร้างใบเสนอราคา
        let Quotation_type_Pid = this.Quotation_Person_type.id;
        if (this.CreateorEdittype == true) {
          let CreateNewQuotation = {
            customer_code: this.Quotation_customer_id,
            type_id: Quotation_type_Pid,
            tax_id: this.Quotation_tax_id,
            name: this.Quotation_fullname,
            flash_number: this.Quotation_fax,
            email: this.Quotation_email,
            telephone_number: this.Quotation_telephone_number,
            mobile_phone_number: this.Quotation_mobile_phone_number,
            address: this.Quotation_address,
            district_id: this.Quotation_district_id,
            note: this.Quotation_note,
            package_code: this.Package_ID,
            promotion_code: this.promotion_selectd_id,
            event_date: this.Quotation_event_date,
            area_viewing_date: this.Quotation_area_viewing_date,
            amount_savory_food: this.package_amount_savory_food,
            amount_sweet_food: this.package_amount_sweet_food,
            amount_drink: this.package_amount_drink,
          };
          console.log(CreateNewQuotation);
          let resultCreateNewQuotation = await api.addQuotation(
            CreateNewQuotation
          );
          console.log(resultCreateNewQuotation);
          if (resultCreateNewQuotation.data.response == "OK") {
            this.$swal.fire(
              "สำเร็จ",
              "สร้างใบเสนอราคาสำเร็จเรียบร้อยแล้ว",
              "success"
            );
            this.$router.push("/Quotation");
          } else {
            this.$swal.fire(
              "เกิดข้อผิดพลาด",
              `สร้างใบเสนอราคาสำเร็จไม่สำเร็จ ${resultCreateNewQuotation.data.response} เนื่องจาก ${resultCreateNewQuotation.data.result} `,
              "error"
            );
          }
        } else {
          //แก้ไขใบเสนอราคา
          let EditQuotation = {
            quotation_code: this.EditQuotation_ID,
            customer_code: this.Quotation_customer_id,
            package_code: this.Package_ID,
            promotion_code: this.promotion_selectd_id,
            event_date: this.Quotation_event_date,
            area_viewing_date: this.Quotation_area_viewing_date,
            amount_savory_food: this.package_amount_savory_food,
            amount_sweet_food: this.package_amount_sweet_food,
            amount_drink: this.package_amount_drink,
            note: this.Quotation_note,
          };
          console.log('quotation_code',EditQuotation);
          let resultEditQuotation = await api.editQuotation(EditQuotation);
          //console.log(resultEditQuotation);
          if (resultEditQuotation.data.response == "OK") {
            this.$swal.fire(
              "สำเร็จ",
              "แก้ไขใบเสนอราคาสำเร็จเรียบร้อยแล้ว",
              "success"
            );
            this.$router.push("/Quotation");
          } else {
            this.$swal.fire(
              "เกิดข้อผิดพลาด",
              `แก้ไขใบเสนอราคาไม่สำเร็จ ${resultEditQuotation.data.response} เนื่องจาก ${resultEditQuotation.data.result} `,
              "error"
            );
          }
        }
    },
  },
};
</script>

<style scoped></style>
