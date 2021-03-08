<template>
  <v-container
    class="main-container"
    style="background:#E5E5E5;color:white;height:100%"
  >
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            {{ Changesubmit }}รายชื่อลูกค้าประเภท{{ formTitle }}
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center">
          <v-col lg="9" md="9" sm="12" cols="12">
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  ข้อมูลลูกค้าประเภท{{ formTitle }}
                </div>
              </v-col>
            </v-row>

            <!-- ชื่อ-นามสกุล -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="sizehead">ชื่อ-นามสกุล</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Personaltype_fullname"
                    placeholder="ชื่อ และ นามสกุล"
                    dense
                    solo
                    outlined
                    clearable
                    :rules="Personaltype_fullnameRules"
                    :disabled="btn"
                    required
                  ></v-text-field>
                </v-row>
              </v-col>

              <!-- โทรศัพท์ -->
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="sizehead">โทรศัพท์</div>
                <v-row class="no-gutters">
                  <v-text-field-integer
                    v-model="Personaltype_telephone_number"
                    v-bind:properties="{
                      disabled: btn,
                      dense: true,
                      solo: true,
                      outlined: true,
                      clearable: true,
                      placeholder: '0 2123 4567 ,0 5312 3456',
                      required: true
                    }"
                    v-bind:options="{
                      inputMask: '# #### ####',
                      outputMask: '#########',
                      empty: null,
                      alphanumeric: true
                    }"
                    class="w-100"
                  />
                </v-row>
              </v-col>
            </v-row>

            <!-- มือถือ -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="sizehead">มือถือ</div>
                <v-row class="no-gutters">
                  <v-text-field-integer
                    v-model="Personaltype_mobile_phone_number"
                    v-bind:properties="{
                      disabled: btn,
                      dense: true,
                      solo: true,
                      outlined: true,
                      clearable: true,
                      placeholder: '08 1123 4567',
                      rules: Personaltype_telemobile_phone_numberRules,
                      required: true
                    }"
                    v-bind:options="{
                      inputMask: '## #### ####',
                      outputMask: '##########',
                      empty: null,
                      alphanumeric: true
                    }"
                    class="w-100"
                  />
                </v-row>
              </v-col>

              <!-- ไอดีไลน์ -->
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="sizehead">ID Line</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Personaltype_line_id"
                    dense
                    solo
                    outlined
                    clearable
                    :disabled="btn"
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>

            <!-- ที่อยู่ -->
            <v-row>
              <v-col lg="12" md="12" sm="12" cols="12">
                <div class="sizehead">ที่อยู่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Personaltype_address"
                    placeholder="หมู่บ้าน/อาคาร เลขที่ 99 ถนน. ซอย. "
                    dense
                    solo
                    outlined
                    clearable
                    :rules="Personaltype_addressRules"
                    :disabled="btn"
                    required
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
                    v-model="Personaltype_SelectProvinces"
                    :items="Personaltype_GatProvince"
                    item-text="province_Name"
                    item-value="province_Code"
                    placeholder="เลือกจังหวัด"
                    v-on:change="FindAmphoeSelected()"
                    return-object
                    filled
                    dense
                    solo
                    outlined
                    :disabled="btn"
                  >
                  </v-select>
                </v-row>
              </v-col>

              <!-- เขต/อำเภอ -->
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="sizehead">เขต/อำเภอ</div>
                <v-row class="no-gutters">
                  <v-select
                    v-model="Personaltype_SelectAmphoe"
                    :items="Personaltype_GatAmphoe"
                    item-text="amphoe_Name"
                    item-value="amphoe_Code"
                    placeholder="เลือกอำเภอ"
                    v-on:change="FindDistrict_Zipcode_Selected()"
                    return-object
                    filled
                    dense
                    solo
                    outlined
                    :disabled="btn"
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
                    v-model="Personaltype_SelectDistrict"
                    :items="Personaltype_GatDistrict"
                    item-text="district_Name"
                    placeholder="เลือกแขวง/ตำบล"
                    v-on:change="FindProv_idSelected()"
                    return-object
                    filled
                    dense
                    solo
                    outlined
                    :disabled="btn"
                  >
                  </v-select>
                </v-row>
              </v-col>

              <!-- รหัสไปรษณีย์ -->
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="sizehead">รหัสไปรษณีย์</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Personaltype_SelectZipcode"
                    placeholder="รหัสไปรษณีย์"
                    dense
                    solo
                    outlined
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>

            <div v-if="pasoneltype == 2">
              <!-- VAT 7% -->
              <v-row>
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-row class="no-gutters">
                    <v-checkbox
                      v-model="vat_selected"
                      label="ต้องการ VAT 7%"
                      :true-value="1"
                      :false-value="0"
                      :disabled="btn"
                    ></v-checkbox>
                  </v-row>
                </v-col>
              </v-row>

              <!-- ข้อมูลใบกำกับภาษี -->
              <v-card class="rounded-lg" outlined>
                <v-row justify="center">
                  <v-col lg="11" md="11" sm="11" cols="11">
                    <v-row>
                      <v-col>
                        <div class="create-edit-title">ข้อมูลใบกำกับภาษี</div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <div class="sizehead">ชื่อใบกำกับภาษี</div>
                        <v-row class="no-gutters">
                          <v-text-field
                            v-model="Taxinvoiceinfo_fullname"
                            placeholder="บริษัท บุญนำพา จำกัด"
                            dense
                            solo
                            outlined
                            :disabled="btn"
                            clearable
                          ></v-text-field>
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <div class="sizehead">รหัสประจำตัวผู้เสียภาษี</div>
                        <v-row class="no-gutters">
                          <v-text-field-integer
                            v-model="Taxinvoiceinfo_id"
                            v-bind:properties="{
                              disabled: btn,
                              dense: true,
                              solo: true,
                              outlined: true,
                              clearable: true,
                              placeholder: '0123456789123',
                              required: true
                            }"
                            v-bind:options="{
                              inputMask: '#############',
                              outputMask: '#############',
                              empty: null,
                              alphanumeric: true
                            }"
                            class="w-100"
                          />
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <div class="sizehead">แฟลช</div>
                        <v-row class="no-gutters">
                          <v-text-field
                            v-model="Taxinvoiceinfo_fax"
                            dense
                            solo
                            outlined
                            :disabled="btn"
                            clearable
                          ></v-text-field>
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <div class="sizehead">อีเมล์</div>
                        <v-row class="no-gutters">
                          <v-text-field
                            v-model="Taxinvoiceinfo_email"
                            placeholder="BNP_01@mail.com"
                            type="email"
                            dense
                            solo
                            outlined
                            :disabled="btn"
                            clearable
                          ></v-text-field>
                        </v-row>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <div class="sizehead">โทรศัพท์</div>
                        <v-row class="no-gutters">
                          <v-text-field-integer
                            v-model="Taxinvoiceinfo_telephone_number"
                            v-bind:properties="{
                              disabled: btn,
                              dense: true,
                              solo: true,
                              outlined: true,
                              clearable: true,
                              placeholder: '0 2123 4567 ,0 5312 3456',
                              required: true
                            }"
                            v-bind:options="{
                              inputMask: '# #### ####',
                              outputMask: '#########',
                              empty: null,
                              alphanumeric: true
                            }"
                            class="w-100"
                          />
                        </v-row>
                      </v-col>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <div class="sizehead">มือถือ</div>
                        <v-row class="no-gutters">
                          <v-text-field-integer
                            v-model="Taxinvoiceinfo_mobile_phone_number"
                            v-bind:properties="{
                              disabled: btn,
                              dense: true,
                              solo: true,
                              outlined: true,
                              clearable: true,
                              placeholder: '08 1123 4567',
                              required: true
                            }"
                            v-bind:options="{
                              inputMask: '## #### ####',
                              outputMask: '##########',
                              empty: null,
                              alphanumeric: true
                            }"
                            class="w-100"
                          />
                        </v-row>
                      </v-col>
                    </v-row>

                    <!--ใช้ที่อยู่เดียวกับข้อมูลลูกค้าประเภทบริษัท -->
                    <v-row>
                      <v-col lg="6" md="6" sm="12" cols="12">
                        <v-row class="no-gutters">
                          <v-checkbox
                            v-model="Same_address"
                            label="ใช้ที่อยู่เดียวกับข้อมูลลูกค้าประเภทบริษัท"
                            :true-value="1"
                            :false-value="0"
                            :disabled="btn"
                          ></v-checkbox>
                        </v-row>
                      </v-col>
                    </v-row>

                    <!--ใช้ที่อยู่ข้อมูลใบกำกับภาษี -->
                    <div v-if="Same_address == 0">
                      <v-row>
                        <v-col lg="12" md="12" sm="12" cols="12">
                          <div class="sizehead">ที่อยู่</div>
                          <v-row class="no-gutters">
                            <v-text-field
                              v-model="Taxinvoiceinfo_address"
                              dense
                              solo
                              outlined
                              clearable
                              :disabled="btn"
                            ></v-text-field>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col lg="6" md="6" sm="12" cols="12">
                          <div class="sizehead">จังหวัด</div>
                          <v-row class="no-gutters">
                            <v-select
                              v-model="Taxinvoiceinfo_SelectProvinces"
                              :items="Taxinvoiceinfo_GatProvince"
                              item-text="province_Name"
                              item-value="province_Code"
                              placeholder="เลือกจังหวัด"
                              v-on:change="FindAmphoe_TaxinvoiceinfoSelected()"
                              return-object
                              filled
                              dense
                              solo
                              outlined
                              :disabled="btn"
                            >
                            </v-select>
                          </v-row>
                        </v-col>
                        <v-col lg="6" md="6" sm="12" cols="12">
                          <div class="sizehead">เขต/อำเภอ</div>
                          <v-row class="no-gutters">
                            <v-select
                              v-model="Taxinvoiceinfo_SelectAmphoe"
                              :items="Taxinvoiceinfo_GatAmphoe"
                              item-text="amphoe_Name"
                              item-value="amphoe_Code"
                              placeholder="เลือกอำเภอ"
                              v-on:change="
                                FindDistrict_Zipcode_TaxinvoiceinfoSelectedSelected()
                              "
                              return-object
                              filled
                              dense
                              solo
                              outlined
                              :disabled="btn"
                            >
                            </v-select>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col lg="6" md="6" sm="12" cols="12">
                          <div class="sizehead">แขวง/ตำบล</div>
                          <v-row class="no-gutters">
                            <v-select
                              v-model="Taxinvoiceinfo_SelectDistrict"
                              :items="Taxinvoiceinfo_GatDistrict"
                              item-text="district_Name"
                              placeholder="เลือกแขวง/ตำบล"
                              v-on:change="
                                FindProv_idSelected_TaxinvoiceinfoSelected()
                              "
                              return-object
                              filled
                              dense
                              solo
                              outlined
                              :disabled="btn"
                            >
                            </v-select>
                          </v-row>
                        </v-col>
                        <v-col lg="6" md="6" sm="12" cols="12">
                          <div class="sizehead">รหัสไปรษณีย์</div>
                          <v-row class="no-gutters">
                            <v-text-field
                              v-model="Taxinvoiceinfo_SelectZipcode"
                              placeholder="รหัสไปรษณีย์"
                              dense
                              solo
                              outlined
                              disabled
                            ></v-text-field>
                          </v-row>
                        </v-col>
                      </v-row>
                    </div>
                  </v-col>
                </v-row>
              </v-card>
            </div>
            <v-row>
              <v-col></v-col>
            </v-row>

            <v-row>
              <v-col xl="3" lg="3" md="6" sm="12" cols="12">
                <v-btn
                  block
                  large
                  rounded
                  outlined
                  @click="$router.push({ name: 'saleCustomer' })"
                  >ปิด</v-btn
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
                  :disabled="btn"
                  @click="submit"
                  ><span class="white--text">{{ Changesubmit }}</span></v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "FormPersonaltype",

  props: ["CreateorEdittype", "monitortypes"],

  mounted() {
    this.loadDataType();
    this.loadDataProvince();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path
    });
  },

  data: () => ({
    valid: true,
    btn: false,

    pasoneltype: null,
    CreateorEdit: true,

    vat_selected: 0,
    Same_address: 1,

    EditPersonaltype_ID: "",

    //ข้อมูลลูกค้า ประเภทบุคคลและนิติบุคคล
    Personaltype_fullname: "",
    Personaltype_type_id: "",
    Personaltype_telephone_number: "",
    Personaltype_mobile_phone_number: "",
    Personaltype_line_id: "",
    Personaltype_address: "",
    Personaltype_district_id: "",

    //ข้อมูลใบกำกับภาษี ประเภทบริษัท
    Taxinvoiceinfo_fullname: null,
    Taxinvoiceinfo_id: null,
    Taxinvoiceinfo_fax: null,
    Taxinvoiceinfo_email: null,
    Taxinvoiceinfo_telephone_number: null,
    Taxinvoiceinfo_mobile_phone_number: null,
    Taxinvoiceinfo_address: null,
    Taxinvoiceinfo_district_id: null,

    //ข้อมูลจังหวัดลูกค้า ประเภทบุคคลและนิติบุคคล
    Personaltype_SelectProvinces: {},
    Personaltype_GatProvince: [],
    Personaltype_SelectAmphoe: {},
    Personaltype_GatAmphoe: [],
    Personaltype_SelectDistrict: {},
    Personaltype_GatDistrict: [],
    Personaltype_SelectZipcode: null,

    //ข้อมูลจังหวัดใบกำกับภาษี ประเภทบริษัท
    Taxinvoiceinfo_SelectProvinces: {},
    Taxinvoiceinfo_GatProvince: [],
    Taxinvoiceinfo_SelectAmphoe: {},
    Taxinvoiceinfo_GatAmphoe: [],
    Taxinvoiceinfo_SelectDistrict: {},
    Taxinvoiceinfo_GatDistrict: [],
    Taxinvoiceinfo_SelectZipcode: null,

    Personaltype_fullnameRules: [v1 => !!v1 || "กรุณากรอกชื่อและนามสกุล"],
    // Personaltype_telephone_numberRules:[
    //   v1=>!!v1 || "กรุณากรอกเบอร์โทรศัพท์",
    //   v1 => (v1 && v1.length >= 11) || "กรุณากรอกเบอร์มือถือให้ครบ 9 หลัก",
    //   ],
    Personaltype_telemobile_phone_numberRules: [
      v1 => !!v1 || "กรุณากรอกมือถือ",
      v1 => (v1 && v1.length >= 12) || "กรุณากรอกเบอร์มือถือให้ครบ 10 หลัก"
    ],
    Personaltype_addressRules: [v1 => !!v1 || "กรุณากรอกที่อยู่"]

    // Taxinvoiceinfo_fullnameRules:[v1=>!!v1 || "กรุณากรอกชื่อและนามสกุลใบกำกับภาษี",],
    // Taxinvoiceinfo_idRules:[v1=>!!v1 || "กรุณากรอกรหัสประจำตัวผู้เสียภาษี",],
    // Taxinvoiceinfo_telephone_numberRules:[v1=>!!v1 || "กรุณากรอกเบอร์โทรศัพท์ใบกำกับภาษี",],
  }),

  computed: {
    formTitle() {
      return this.pasoneltype == 1 ? "บุคคล" : "บริษัท";
    },
    Changesubmit() {
      if (this.CreateorEdittype == 1) {
        return "บันทึก";
      } else if (this.CreateorEdittype == 2) {
        return "แก้ไข";
      } else {
        return "ดู";
      }
    }
  },

  methods: {
    async loadDataType() {
      this.CreateorEdit = this.CreateorEdittype;

      if (this.CreateorEdit == true) {
        //console.log('สร้าง');
        const type_id_customer = this.$store.getters["Newpersonal_type_id"];
        if (!type_id_customer) {
          window.location.href = `${process.env.VUE_APP_SUB_PATH}/Customer`;
          //this.$router.push({name:'Customer'})
          return;
        }
        this.pasoneltype = type_id_customer.type_id;
        //console.log(this.pasoneltype.type_id);
      } else {
        this.btn = this.monitortypes;
        //แก้ไขข้อมูล
        this.EditPersonaltype_ID = this.$store.getters[
          "Newpersonal_BNP_ID"
        ].BNP_ID;
        this.CreateorEdit = this.CreateorEdittype;

        //console.log('ข้อมูลแก้ไขลูกค้าไอดี',this.EditPersonaltype_ID);
        let BNP_ID_Edit = { customer_code: this.EditPersonaltype_ID };
        let result = await api.getListEditcustomers(BNP_ID_Edit);
        //console.log('ข้อมูลที่ต้องแก้ไข',result);

        if (!result.data.result.length) {
          window.location.href = `${process.env.VUE_APP_SUB_PATH}/Customer`;
          //this.$router.push({name:'Customer'})
          return;
        }
        this.pasoneltype = result.data.result[0].type_id;
        this.Personaltype_type_id = result.data.result[0].type_id;
        this.Personaltype_fullname = result.data.result[0].name;
        this.Personaltype_telephone_number =
          result.data.result[0].telephone_number;
        this.Personaltype_mobile_phone_number =
          result.data.result[0].mobile_phone_number;
        this.Personaltype_line_id = result.data.result[0].line_id;
        this.Personaltype_address = result.data.result[0].address;

        this.Personaltype_SelectProvinces = {
          province_Name: result.data.result[0].province,
          province_Code: result.data.result[0].province_code
        };
        this.Personaltype_GatAmphoe.push({
          amphoe_Name: result.data.result[0].amphoe,
          amphoe_Code: result.data.result[0].amphoe_code
        });
        this.Personaltype_SelectAmphoe = {
          amphoe_Name: result.data.result[0].amphoe,
          amphoe_Code: result.data.result[0].amphoe_code
        };
        this.Personaltype_GatDistrict.push({
          district_Name: result.data.result[0].district,
          amphoe_Code: result.data.result[0].district_code
        });
        this.Personaltype_SelectDistrict = {
          district_Name: result.data.result[0].district,
          amphoe_Code: result.data.result[0].district_code
        };
        (this.Personaltype_SelectZipcode = result.data.result[0].zipcode),
          (this.Personaltype_district_id = result.data.result[0].district_id),
          (this.Taxinvoiceinfo_fullname = result.data.result[0].cti_title),
          (this.Taxinvoiceinfo_id = result.data.result[0].cti_tax_id),
          (this.Taxinvoiceinfo_fax = result.data.result[0].cti_flash_number),
          (this.Taxinvoiceinfo_email = result.data.result[0].cti_email),
          (this.Taxinvoiceinfo_telephone_number =
            result.data.result[0].cti_telephone_number),
          (this.Taxinvoiceinfo_mobile_phone_number =
            result.data.result[0].cti_mobile_phone_number),
          (this.Taxinvoiceinfo_address = result.data.result[0].cti_address),
          (this.Same_address = result.data.result[0].check_same_address);
        (this.vat_selected = result.data.result[0].cti_vat_type),
          // console.log(result.data.result[0].cti_vat_type);
          // console.log(this.vat_selected);

          (this.Taxinvoiceinfo_SelectProvinces = {
            province_Name: result.data.result[0].cti_province,
            province_Code: result.data.result[0].cti_province_code
          });
        this.Taxinvoiceinfo_GatAmphoe.push({
          amphoe_Name: result.data.result[0].cti_amphoe,
          amphoe_Code: result.data.result[0].cti_amphoe_code
        });
        this.Taxinvoiceinfo_SelectAmphoe = {
          amphoe_Name: result.data.result[0].cti_amphoe_code,
          amphoe_Code: result.data.result[0].cti_amphoe_code_code
        };
        this.Taxinvoiceinfo_GatDistrict.push({
          district_Name: result.data.result[0].cti_district,
          amphoe_Code: result.data.result[0].cti_district_code
        });
        this.Taxinvoiceinfo_SelectDistrict = {
          district_Name: result.data.result[0].cti_district,
          amphoe_Code: result.data.result[0].cti_district_code
        };
        (this.Taxinvoiceinfo_SelectZipcode = result.data.result[0].cti_zipcode),
          (this.Taxinvoiceinfo_district_id =
            result.data.result[0].cti_district_id);
      }
    },

    async loadDataProvince() {
      let result = await api.getProvinces();
      let provinces = result.data.result;
      let _this = this;
      provinces.forEach(value => {
        _this.Personaltype_GatProvince.push({
          province_Name: `${value.province}`,
          province_Code: `${value.province_code}`
        });
      });
      provinces.forEach(value => {
        _this.Taxinvoiceinfo_GatProvince.push({
          province_Name: `${value.province}`,
          province_Code: `${value.province_code}`
        });
      });
    },

    async FindAmphoeSelected() {
      (this.Personaltype_GatAmphoe = []), (this.Personaltype_GatDistrict = []);

      //console.log( this.Personaltype_SelectProvinces.province_Code);
      //console.log( this.Personaltype_SelectProvinces.province_Name);
      let PersonaltypeProv = {
        province_code: this.Personaltype_SelectProvinces.province_Code,
        province: this.Personaltype_SelectProvinces.province_Name
      };
      let resultPersonaltypeProv = await api.getAmphoe(PersonaltypeProv);
      let AmphoePersonaltype = resultPersonaltypeProv.data.result;
      let _this = this;
      AmphoePersonaltype.forEach(value => {
        _this.Personaltype_GatAmphoe.push({
          amphoe_Name: `${value.amphoe}`,
          amphoe_Code: `${value.amphoe_code}`
        });
      });
    },

    async FindAmphoe_TaxinvoiceinfoSelected() {
      (this.Taxinvoiceinfo_GatAmphoe = []),
        (this.Taxinvoiceinfo_GatDistrict = []);
      let TaxinvoiceinfoProv = {
        province_code: this.Taxinvoiceinfo_SelectProvinces.province_Code,
        province: this.Taxinvoiceinfo_SelectProvinces.province_Name
      };
      let resultTaxinvoiceinfoProv = await api.getAmphoe(TaxinvoiceinfoProv);
      let AmphoeTaxinvoiceinfoProv = resultTaxinvoiceinfoProv.data.result;
      let _this = this;
      AmphoeTaxinvoiceinfoProv.forEach(value => {
        _this.Taxinvoiceinfo_GatAmphoe.push({
          amphoe_Name: `${value.amphoe}`,
          amphoe_Code: `${value.amphoe_code}`
        });
      });
    },

    async FindDistrict_Zipcode_Selected() {
      this.Personaltype_GatDistrict = [];
      this.Personaltype_SelectZipcode = [];
      let PersonaltypeAmphoe = {
        amphoe_code: this.Personaltype_SelectAmphoe.amphoe_Code,
        amphoe: this.Personaltype_SelectAmphoe.amphoe_Name
      };
      let resultPersonaltypeAmphoe = await api.getDistrict(PersonaltypeAmphoe);
      let DistrictPersonaltypeAmphoe = resultPersonaltypeAmphoe.data.result;
      let _this = this;
      DistrictPersonaltypeAmphoe.forEach(value => {
        _this.Personaltype_GatDistrict.push({
          district_Name: `${value.district}`,
          zipcode: `${value.zipcode}`,
          prov_id: `${value.id}`
        });
      });
    },
    async FindDistrict_Zipcode_TaxinvoiceinfoSelectedSelected() {
      this.Taxinvoiceinfo_GatDistrict = [];
      this.Taxinvoiceinfo_SelectZipcode = [];

      let TaxinvoiceinfoAmphoe = {
        amphoe_code: this.Taxinvoiceinfo_SelectAmphoe.amphoe_Code,
        amphoe: this.Taxinvoiceinfo_SelectAmphoe.amphoe_Name
      };
      let resultTaxinvoiceinfoAmphoe = await api.getDistrict(
        TaxinvoiceinfoAmphoe
      );
      let DistrictTaxinvoiceinfoAmphoe = resultTaxinvoiceinfoAmphoe.data.result;
      let _this = this;
      DistrictTaxinvoiceinfoAmphoe.forEach(value => {
        _this.Taxinvoiceinfo_GatDistrict.push({
          district_Name: `${value.district}`,
          zipcode: `${value.zipcode}`,
          prov_id: `${value.id}`
        });
      });
    },

    FindProv_idSelected() {
      this.Personaltype_SelectZipcode = this.Personaltype_SelectDistrict.zipcode;
      this.Personaltype_district_id = this.Personaltype_SelectDistrict.prov_id;
      // console.log(this.Personaltype_SelectZipcode);
      // console.log(this.Personaltype_district_id);
    },
    FindProv_idSelected_TaxinvoiceinfoSelected() {
      this.Taxinvoiceinfo_SelectZipcode = this.Taxinvoiceinfo_SelectDistrict.zipcode;
      this.Taxinvoiceinfo_district_id = this.Taxinvoiceinfo_SelectDistrict.prov_id;
      // console.log(this.Taxinvoiceinfo_SelectZipcode);
      // console.log(this.Taxinvoiceinfo_district_id);
    },

    async submit() {
      //console.log(this.$refs.form.validate());
      if (this.$refs.form.validate() == true) {
        //สร้างรายชื่อลูกค้าใหม่
        if (this.CreateorEdit == true) {
          //สร้างลูกค้าใหม่ประเภทบุคคล
          if (this.pasoneltype == 1) {
            let DataPersonaltypeCreate = {
              name: this.Personaltype_fullname,
              type_id: this.pasoneltype,
              telephone_number: this.Personaltype_telephone_number,
              mobile_phone_number: this.Personaltype_mobile_phone_number,
              line_id: this.Personaltype_line_id,
              address: this.Personaltype_address,
              district_id: this.Personaltype_district_id,
              cti_title: null,
              cti_tax_id: null,
              cti_flash_number: null,
              cti_email: null,
              cti_telephone_number: null,
              cti_mobile_phone_number: null,
              cti_address: null,
              cti_district_id: null,
              cti_vat_type: this.vat_selected
            };
            //console.log('บุคคล',DataPersonaltypeCreate);
            let result = await api.addNewpersonnal(DataPersonaltypeCreate);
            //console.log(result);
            if (result.data.response == "OK") {
              this.$swal.fire(
                "สำเร็จ",
                "บันทึกข้อมูลลูกค้าประเภทบุคคลเรียบร้อยแล้ว",
                "success"
              );
              this.$router.push({ name: "saleCustomer" });
            } else {
              this.$swal.fire(
                "เกิดข้อผิดพลาด",
                `บันทึกข้อมูลลูกค้าประเภทบุคคลไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
                "error"
              );
            }
          } else {
            //สร้างลูกค้าประเภทบริษัท
            //สร้างลูกค้าประเภทบริษัท สร้างที่อยู่แบบเดิม
            if (this.Same_address == 1) {
              let DataCompanytypeCreate_Old_address = {
                name: this.Personaltype_fullname,
                type_id: this.pasoneltype,
                telephone_number: this.Personaltype_telephone_number,
                mobile_phone_number: this.Personaltype_mobile_phone_number,
                line_id: this.Personaltype_line_id,
                address: this.Personaltype_address,
                district_id: this.Personaltype_district_id,
                cti_title: this.Taxinvoiceinfo_fullname,
                cti_tax_id: this.Taxinvoiceinfo_id,
                cti_flash_number: this.Taxinvoiceinfo_fax,
                cti_email: this.Taxinvoiceinfo_email,
                cti_telephone_number: this.Taxinvoiceinfo_telephone_number,
                cti_mobile_phone_number: this
                  .Taxinvoiceinfo_mobile_phone_number,
                //สร้างที่อยู่เดิม,จังหวัดเดิม
                cti_address: this.Personaltype_address,
                cti_district_id: this.Personaltype_district_id,
                cti_vat_type: this.vat_selected
              };
              //console.log('สร้างที่อยู่แบบเดิม',DataCompanytypeCreate_Old_address);
              let result = await api.addNewpersonnal(
                DataCompanytypeCreate_Old_address
              );
              //console.log(result);
              if (result.data.response == "OK") {
                this.$swal.fire(
                  "สำเร็จ",
                  "บันทึกข้อมูลลูกค้าประเภทบริษัทเรียบร้อยแล้ว",
                  "success"
                );
                this.$router.push({ name: "saleCustomer" });
              } else {
                this.$swal.fire(
                  "เกิดข้อผิดพลาด",
                  `บันทึกข้อมูลลูกค้าประเภทบริษัทไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
                  "error"
                );
              }
              //สร้างลูกค้าประเภทบริษัท สร้างที่อยู่แบบใหม่
            } else {
              let DataCompanytypeCreate_New_address = {
                name: this.Personaltype_fullname,
                type_id: this.pasoneltype,
                telephone_number: this.Personaltype_telephone_number,
                mobile_phone_number: this.Personaltype_mobile_phone_number,
                line_id: this.Personaltype_line_id,
                address: this.Personaltype_address,
                district_id: this.Personaltype_district_id,
                cti_title: this.Taxinvoiceinfo_fullname,
                cti_tax_id: this.Taxinvoiceinfo_id,
                cti_flash_number: this.Taxinvoiceinfo_fax,
                cti_email: this.Taxinvoiceinfo_email,
                cti_telephone_number: this.Taxinvoiceinfo_telephone_number,
                cti_mobile_phone_number: this
                  .Taxinvoiceinfo_mobile_phone_number,
                //สร้างที่อยู่ใหม่,จังหวัดใหม่
                cti_address: this.Taxinvoiceinfo_address,
                cti_district_id: this.Taxinvoiceinfo_district_id,
                cti_vat_type: this.vat_selected
              };
              //console.log('สร้างที่อยู่แบบใหม่',DataCompanytypeCreate_New_address);
              let result = await api.addNewpersonnal(
                DataCompanytypeCreate_New_address
              );
              if (result.data.response == "OK") {
                this.$swal.fire(
                  "สำเร็จ",
                  "บันทึกข้อมูลประเภทบริษัทเรียบร้อยแล้ว",
                  "success"
                );
                this.$router.push({ name: "saleCustomer" });
              } else {
                this.$swal.fire(
                  "เกิดข้อผิดพลาด",
                  `บันทึกข้อมูลลูกค้าประเภทบริษัทไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
                  "error"
                );
              }
            }
          }
        } else {
          //แก้ไขรายชื่อลูกค้า
          //แก้ไขลูกค้าประเภทบุคคล
          if (this.pasoneltype == 1) {
            let DataPersonaltypeEdit = {
              customer_code: this.EditPersonaltype_ID,
              name: this.Personaltype_fullname,
              type_id: this.pasoneltype,
              telephone_number: this.Personaltype_telephone_number,
              mobile_phone_number: this.Personaltype_mobile_phone_number,
              line_id: this.Personaltype_line_id,
              address: this.Personaltype_address,
              district_id: this.Personaltype_district_id,
              cti_title: null,
              cti_tax_id: null,
              cti_flash_number: null,
              cti_email: null,
              cti_telephone_number: null,
              cti_mobile_phone_number: null,
              cti_address: null,
              cti_district_id: null,
              cti_vat_type: this.vat_selected
            };
            //console.log('แก้ไขบุคคล',DataPersonaltypeEdit);
            let result = await api.Editcustomer(DataPersonaltypeEdit);
            //console.log('แก้ไขบุคคล',result);
            if (result.data.response == "OK") {
              this.$swal.fire(
                "สำเร็จ",
                "แก้ไขข้อมูลลูกค้าประเภทบุคคลเรียบร้อยแล้ว",
                "success"
              );
              this.$router.push({ name: "saleCustomer" });
            } else {
              this.$swal.fire(
                "เกิดข้อผิดพลาด",
                `แก้ไขข้อมูลลูกค้าประเภทบุคคลไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
                "error"
              );
            }
          } else {
            //แก้ไขลูกค้าประเภทบริษัท
            //แก้ไขลูกค้าประเภทบริษัท แบบที่อยู่เดิม
            if (this.Same_address == 1) {
              let DataCompanytypeEdit_Old_address = {
                customer_code: this.EditPersonaltype_ID,
                name: this.Personaltype_fullname,
                type_id: this.pasoneltype,
                telephone_number: this.Personaltype_telephone_number,
                mobile_phone_number: this.Personaltype_mobile_phone_number,
                line_id: this.Personaltype_line_id,
                address: this.Personaltype_address,
                district_id: this.Personaltype_district_id,
                cti_title: this.Taxinvoiceinfo_fullname,
                cti_tax_id: this.Taxinvoiceinfo_id,
                cti_flash_number: this.Taxinvoiceinfo_fax,
                cti_email: this.Taxinvoiceinfo_email,
                cti_telephone_number: this.Taxinvoiceinfo_telephone_number,
                cti_mobile_phone_number: this
                  .Taxinvoiceinfo_mobile_phone_number,
                //แก้ไขที่อยู่เดิม,จังหวัดเดิม
                cti_address: this.Personaltype_address,
                cti_district_id: this.Personaltype_district_id,
                cti_vat_type: this.vat_selected
              };
              //console.log('แก้ไขที่อยู่บริษัทแบบเดิม',DataCompanytypeEdit_Old_address);
              let result = await api.Editcustomer(
                DataCompanytypeEdit_Old_address
              );
              //console.log(result);
              if (result.data.response == "OK") {
                this.$swal.fire(
                  "สำเร็จ",
                  "แก้ไขข้อมูลลูกค้าประเภทบริษัทเรียบร้อยแล้ว",
                  "success"
                );
                this.$router.push({ name: "saleCustomer" });
              } else {
                this.$swal.fire(
                  "เกิดข้อผิดพลาด",
                  `แก้ไขข้อมูลลูกค้าประเภทบริษัทไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
                  "error"
                );
              }
              //แก้ไขลูกค้าประเภทบริษัท แก้ไขที่อยู่แบบใหม่
            } else {
              let DataCompanytypeEdit_New_address = {
                customer_code: this.EditPersonaltype_ID,
                name: this.Personaltype_fullname,
                type_id: this.pasoneltype,
                telephone_number: this.Personaltype_telephone_number,
                mobile_phone_number: this.Personaltype_mobile_phone_number,
                line_id: this.Personaltype_line_id,
                address: this.Personaltype_address,
                district_id: this.Personaltype_district_id,
                cti_title: this.Taxinvoiceinfo_fullname,
                cti_tax_id: this.Taxinvoiceinfo_id,
                cti_flash_number: this.Taxinvoiceinfo_fax,
                cti_email: this.Taxinvoiceinfo_email,
                cti_telephone_number: this.Taxinvoiceinfo_telephone_number,
                cti_mobile_phone_number: this
                  .Taxinvoiceinfo_mobile_phone_number,
                //แก้ไขที่อยู่แบบใหม่,จังหวัดใหม่
                cti_address: this.Taxinvoiceinfo_address,
                cti_district_id: this.Taxinvoiceinfo_district_id,
                cti_vat_type: this.vat_selected
              };
              //('แก้ไขที่อยู่บริษัทแบบใหม่',DataCompanytypeEdit_New_address);
              let result = await api.Editcustomer(
                DataCompanytypeEdit_New_address
              );
              //console.log(result);
              if (result.data.response == "OK") {
                this.$swal.fire(
                  "สำเร็จ",
                  "แก้ไขข้อมูลประเภทบริษัทเรียบร้อยแล้ว",
                  "success"
                );
                this.$router.push({ name: "saleCustomer" });
              } else {
                this.$swal.fire(
                  "เกิดข้อผิดพลาด",
                  `แก้ไขข้อมูลลูกค้าประเภทบริษัทไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
                  "error"
                );
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style scoped></style>
