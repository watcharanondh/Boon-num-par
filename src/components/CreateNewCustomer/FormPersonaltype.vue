<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
            สร้างรายชื่อลูกค้าประเภท{{formTitle}}
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined >
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
     >
      <v-row justify="center">
        <v-col lg="6" md="6" sm="12" cols="12">
          <v-row>
            <v-col>
             <div class="sizetitle">ข้อมูลลูกค้าประเภท{{formTitle}}</div>
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
                <v-text-field
                  v-model="Personaltype_telephone_number"
                  placeholder="02-1234567"
                  dense
                  solo
                  outlined
                  clearable
                  :rules="Personaltype_telephone_numberRules"
                  :disabled="btn"
                  required
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>

          <!-- มือถือ -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">มือถือ</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Personaltype_mobile_phone_number"
                  placeholder="081-2345678"
                  dense
                  solo
                  outlined
                  clearable
                  :disabled="btn"
                ></v-text-field>
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
        
        <div v-if="pasoneltype==2">
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
        <v-col lg="11" md="12" sm="12" cols="12">
          <v-row>
            <v-col>
             <div class="sizetitle">ข้อมูลใบกำกับภาษี</div>
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
                <v-text-field
                  v-model="Taxinvoiceinfo_id"
                  placeholder="1234567890"
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
                <v-text-field
                  v-model="Taxinvoiceinfo_telephone_number"
                  placeholder="053-123456"
                  dense
                  solo
                  outlined
                  clearable
                  :disabled="btn"
                ></v-text-field>
              </v-row>
            </v-col>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">มือถือ</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Taxinvoiceinfo_mobile_phone_number"
                  placeholder="081-2345678"
                  dense
                  solo
                  outlined
                  clearable
                  :disabled="btn"
                ></v-text-field>
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
                      :true-value="0" 
                      :false-value="1"
                      :disabled="btn"
                    ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>

            <!--ใช้ที่อยู่ข้อมูลใบกำกับภาษี -->
            <div v-if="Same_address == 1">
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
                  v-on:change="FindDistrict_Zipcode_TaxinvoiceinfoSelectedSelected()"
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
                  v-on:change="FindProv_idSelected_TaxinvoiceinfoSelected()"
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
            <v-col cols="3">
              <v-btn
                block
                large
                rounded
                outlined
                @click="$router.push('/Customer')"
                >ปิด</v-btn
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3">
              <v-btn
                block
                color="#29CC97"
                dark
                large
                rounded
                :disabled="btn"
                @click="submit"
                ><span class="white--text">{{Changesubmit}}</span></v-btn
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
  
  props: ['monitortype','CreateorEdittype','type_id','Edits_fullname','Edits_telephone_number','Edits_mobile_phone_number','Edits_line_id','Edits_address','Edits_province','Edits_province_code','Edits_amphoe','Edits_amphoe_code','Edits_district','Edits_district_code','Edits_zipcode','Edits_district_id',
          'Taxinvoiceinfo_Edits_vat_type','Taxinvoiceinfo_Edits_company','Taxinvoiceinfo_Edits_tax_id','Taxinvoiceinfo_Edits_fax_number','Taxinvoiceinfo_Edits_email','Taxinvoiceinfo_Edits_telephone_number','Taxinvoiceinfo_Edits_mobile_phone_number','Taxinvoiceinfo_Edits_address','Taxinvoiceinfo_Edits_province','Taxinvoiceinfo_Edits_province_code','Taxinvoiceinfo_Edits_amphoe' ,'Taxinvoiceinfo_Edits_amphoe_code','Taxinvoiceinfo_Edits_district' ,'Taxinvoiceinfo_Edits_district_code' ,'Taxinvoiceinfo_Edits_zipcode','Taxinvoiceinfo_Edits_district_id'],

async created() {
          await this.loadDataProvince();
          await this.loadDataType();
          await this.$store.dispatch({
          type: "inputRoutepath",
          RT: this.$route.path,
        });

  },

  data: () => ({
    valid:true,
    btn:false,

    pasoneltype:null,
    CreateorEdit:true,

    vat_selected:0,
    Same_address:0,

    //ข้อมูลลูกค้า ประเภทบุคคลและนิติบุคคล
    Personaltype_fullname: "",
    Personaltype_type_id: "",
    Personaltype_telephone_number: "",
    Personaltype_mobile_phone_number: "",
    Personaltype_line_id: "",
    Personaltype_address: "",
    Personaltype_district_id: "",

    //ข้อมูลใบกำกับภาษี ประเภทบริษัท
    Taxinvoiceinfo_fullname:null,
    Taxinvoiceinfo_id:null,
    Taxinvoiceinfo_fax:null,
    Taxinvoiceinfo_email:null,
    Taxinvoiceinfo_telephone_number:null,
    Taxinvoiceinfo_mobile_phone_number: null,
    Taxinvoiceinfo_address:null,
    Taxinvoiceinfo_district_id: null,

    //ข้อมูลจังหวัดลูกค้า ประเภทบุคคลและนิติบุคคล
    Personaltype_SelectProvinces:{},
    Personaltype_GatProvince: [],
    Personaltype_SelectAmphoe: {},
    Personaltype_GatAmphoe: [],
    Personaltype_SelectDistrict: {},
    Personaltype_GatDistrict: [],
    Personaltype_SelectZipcode: null,

    //ข้อมูลจังหวัดใบกำกับภาษี ประเภทบริษัท
    Taxinvoiceinfo_SelectProvinces:{},
    Taxinvoiceinfo_GatProvince: [],
    Taxinvoiceinfo_SelectAmphoe: {},
    Taxinvoiceinfo_GatAmphoe: [],
    Taxinvoiceinfo_SelectDistrict: {},
    Taxinvoiceinfo_GatDistrict: [],
    Taxinvoiceinfo_SelectZipcode: null,


    Personaltype_fullnameRules:[v1=>!!v1 || "กรุณากรอกชื่อและนามสกุล",],
    Personaltype_telephone_numberRules:[v1=>!!v1 || "กรุณากรอกเบอร์โทรศัพท์",],
    Personaltype_addressRules:[v1=>!!v1 || "กรุณากรอกที่อยู่",],

    // Taxinvoiceinfo_fullnameRules:[v1=>!!v1 || "กรุณากรอกชื่อและนามสกุลใบกำกับภาษี",],
    // Taxinvoiceinfo_idRules:[v1=>!!v1 || "กรุณากรอกรหัสประจำตัวผู้เสียภาษี",],
    // Taxinvoiceinfo_telephone_numberRules:[v1=>!!v1 || "กรุณากรอกเบอร์โทรศัพท์ใบกำกับภาษี",],

  }),

  computed: {
      formTitle () {
        return this.pasoneltype===1 ? 'บุคคล' : 'บริษัท'
      },
      Changesubmit () {
        return this.CreateorEdit==true ? 'บันทึก' : 'แก้ไข'
      },
    },


  methods: {
   async loadDataType(){
        this.pasoneltype = this.type_id
        this.CreateorEdit = this.CreateorEdittype
        this.btn = this.monitortype
        console.log('ประเภท',this.type_id);

    if(this.CreateorEdit == false){
        this.Personaltype_fullname= this.Edits_fullname,
        this.Personaltype_type_id= this.type_id,
        this.Personaltype_telephone_number= this.Edits_telephone_number,
        this.Personaltype_mobile_phone_number= this.Edits_mobile_phone_number,
        this.Personaltype_line_id= this.Edits_line_id,
        this.Personaltype_address= this.Edits_address,
        this.Personaltype_SelectProvinces = {province_Name: this.Edits_province ,province_Code: this.Edits_province_code};
        this.Personaltype_GatAmphoe.push({amphoe_Name: this.Edits_amphoe ,amphoe_Code: this.Edits_amphoe_code});
        this.Personaltype_SelectAmphoe= {amphoe_Name: this.Edits_amphoe ,amphoe_Code: this.Edits_amphoe_code};
        this.Personaltype_GatDistrict.push({district_Name: this.Edits_district ,amphoe_Code: this.Edits_district_code});
        this.Personaltype_SelectDistrict= {district_Name: this.Edits_district ,amphoe_Code: this.Edits_district_code};
        this.Personaltype_SelectZipcode= this.Edits_zipcode,
        this.Personaltype_district_id = this.Edits_district_id,
        this.Taxinvoiceinfo_fullname= this.Taxinvoiceinfo_Edits_company,
        this.Taxinvoiceinfo_id= this.Taxinvoiceinfo_Edits_tax_id,
        this.Taxinvoiceinfo_fax= this.Taxinvoiceinfo_Edits_fax_number,
        this.Taxinvoiceinfo_email= this.Taxinvoiceinfo_Edits_email,
        this.Taxinvoiceinfo_telephone_number= this.Taxinvoiceinfo_Edits_telephone_number,
        this.Taxinvoiceinfo_mobile_phone_number= this.Taxinvoiceinfo_Edits_mobile_phone_number,
        this.Taxinvoiceinfo_address= this.Taxinvoiceinfo_Edits_address,
        this.vat_selected = this.Taxinvoiceinfo_Edits_vat_type
        this.Taxinvoiceinfo_SelectProvinces = {province_Name: this.Taxinvoiceinfo_Edits_province ,province_Code: this.Taxinvoiceinfo_Edits_province_code};
        this.Taxinvoiceinfo_GatAmphoe.push({amphoe_Name: this.Taxinvoiceinfo_Edits_amphoe ,amphoe_Code: this.Taxinvoiceinfo_Edits_amphoe_code});
        this.Taxinvoiceinfo_SelectAmphoe= {amphoe_Name: this.Taxinvoiceinfo_Edits_amphoe ,amphoe_Code: this.Taxinvoiceinfo_Edits_amphoe_code};
        this.Taxinvoiceinfo_GatDistrict.push({district_Name: this.Taxinvoiceinfo_Edits_district ,amphoe_Code: this.Taxinvoiceinfo_Edits_district_code});
        this.Taxinvoiceinfo_SelectDistrict= {district_Name: this.Taxinvoiceinfo_Edits_district ,amphoe_Code: this.Taxinvoiceinfo_Edits_district_code};
        this.Taxinvoiceinfo_SelectZipcode= this.Taxinvoiceinfo_Edits_zipcode,
        this.Taxinvoiceinfo_district_id = this.Taxinvoiceinfo_Edits_district_id
    }

    },

    async loadDataProvince() {
      let result = await api.getProvinces();
      let provinces = result.data.result;
      let _this = this;
      provinces.forEach(function(value) {
        _this.Personaltype_GatProvince.push({
          province_Name: `${value.province}`,
          province_Code: `${value.province_code}`,
        });
      });
      provinces.forEach(function(value) {
        _this.Taxinvoiceinfo_GatProvince.push({
          province_Name: `${value.province}`,
          province_Code: `${value.province_code}`,
        });
      });
    },

    async FindAmphoeSelected() {
      this.Personaltype_GatAmphoe=[],
      this.Personaltype_GatDistrict=[]

      //console.log( this.Personaltype_SelectProvinces.province_Code);
      //console.log( this.Personaltype_SelectProvinces.province_Name);
      let PersonaltypeProv = {
          province_code: this.Personaltype_SelectProvinces.province_Code,
          province: this.Personaltype_SelectProvinces.province_Name,
      };
      let resultPersonaltypeProv = await api.getAmphoe(PersonaltypeProv);
      let AmphoePersonaltype = resultPersonaltypeProv.data.result;
      let _this = this;
        AmphoePersonaltype.forEach(function(value) {
          _this.Personaltype_GatAmphoe.push({
              amphoe_Name: `${value.amphoe}`,
              amphoe_Code: `${value.amphoe_code}`,
        });
      });
    },

    async FindAmphoe_TaxinvoiceinfoSelected() {
      this.Taxinvoiceinfo_GatAmphoe=[],
      this.Taxinvoiceinfo_GatDistrict=[]
      let TaxinvoiceinfoProv = {
          province_code: this.Taxinvoiceinfo_SelectProvinces.province_Code,
          province: this.Taxinvoiceinfo_SelectProvinces.province_Name,
      };
      let resultTaxinvoiceinfoProv = await api.getAmphoe(TaxinvoiceinfoProv);
      let AmphoeTaxinvoiceinfoProv = resultTaxinvoiceinfoProv.data.result;
      let _this = this;
        AmphoeTaxinvoiceinfoProv.forEach(function(value) {
          _this.Taxinvoiceinfo_GatAmphoe.push({
              amphoe_Name: `${value.amphoe}`,
              amphoe_Code: `${value.amphoe_code}`,
        });
      });
    },

    async FindDistrict_Zipcode_Selected() {
      this.Personaltype_GatDistrict = [];
      this.Personaltype_SelectZipcode = [];
      let PersonaltypeAmphoe = {
          amphoe_code: this.Personaltype_SelectAmphoe.amphoe_Code,
          amphoe: this.Personaltype_SelectAmphoe.amphoe_Name,
      };
      let resultPersonaltypeAmphoe = await api.getDistrict(PersonaltypeAmphoe);
      let DistrictPersonaltypeAmphoe = resultPersonaltypeAmphoe.data.result;
      let _this = this;
          DistrictPersonaltypeAmphoe.forEach(function(value) {
            _this.Personaltype_GatDistrict.push({
              district_Name: `${value.district}`,
              zipcode: `${value.zipcode}`,
              prov_id: `${value.id}`,
            });
          });
    },
    async FindDistrict_Zipcode_TaxinvoiceinfoSelectedSelected() {
      this.Taxinvoiceinfo_GatDistrict = [];
      this.Taxinvoiceinfo_SelectZipcode = [];

      let TaxinvoiceinfoAmphoe = {
          amphoe_code: this.Taxinvoiceinfo_SelectAmphoe.amphoe_Code,
          amphoe: this.Taxinvoiceinfo_SelectAmphoe.amphoe_Name,
      };
      let resultTaxinvoiceinfoAmphoe = await api.getDistrict(TaxinvoiceinfoAmphoe);
      let DistrictTaxinvoiceinfoAmphoe = resultTaxinvoiceinfoAmphoe.data.result;
      let _this = this;
          DistrictTaxinvoiceinfoAmphoe.forEach(function(value) {
            _this.Taxinvoiceinfo_GatDistrict.push({
              district_Name: `${value.district}`,
              zipcode: `${value.zipcode}`,
              prov_id: `${value.id}`,
            });
          });
    },

    FindProv_idSelected() {
      this.Personaltype_SelectZipcode = this.Personaltype_SelectDistrict.zipcode;
      this.Personaltype_district_id = this.Personaltype_SelectDistrict.prov_id;
      // console.log(this.Personaltype_SelectZipcode);
      // console.log(this.Personaltype_district_id);
    },
    FindProv_idSelected_TaxinvoiceinfoSelected(){
      this.Taxinvoiceinfo_SelectZipcode = this.Taxinvoiceinfo_SelectDistrict.zipcode;
      this.Taxinvoiceinfo_district_id = this.Taxinvoiceinfo_SelectDistrict.prov_id;
      // console.log(this.Taxinvoiceinfo_SelectZipcode);
      // console.log(this.Taxinvoiceinfo_district_id);
    },

    BackpageCustomer() {
      this.$router.push("/Customer");
    },


async submit() {
      //console.log(this.$refs.form.validate());
      if(this.$refs.form.validate() == true){
        //สร้างรายชื่อลูกค้าใหม่
        if(this.CreateorEdit==true){
            //สร้างลูกค้าประเภทบุคคล
            if(this.pasoneltype == 1 ){
              let DataPersonaltypeCreate = {
                            name: this.Personaltype_fullname,
                            type_id: this.Personaltype_type_id,
                            telephone_number: this.Personaltype_telephone_number,
                            mobile_phone_number: this.Personaltype_mobile_phone_number,
                            line_id: this.Personaltype_line_id,
                            address: this.Personaltype_address,
                            district_id: this.Personaltype_district_id,
                            cti_title:null,
                            cti_tax_id:null,
                            cti_flash_number:null,
                            cti_email:null,
                            cti_telephone_number:null,
                            cti_mobile_phone_number:null,
                            cti_address:null,
                            cti_district_id:null,
                            cti_vat_type:this.vat_selected,
                          };
                      //console.log('ที่อยู่แบบเดิม',DataPersonaltypeCreate);
                      let result = await api.addNewpersonnal(DataPersonaltypeCreate);
                      //console.log(result);
                      if (result.data.response =='OK'){
                            alert('บันทึกข้อมูลลูกค้าประเภทบุคคลเรียบร้อยแล้ว')
                            this.$router.push('/Customer')
                          }
            }else{
                //สร้างลูกค้าประเภทบริษัท
                //สร้างลูกค้าประเภทบริษัท สร้างที่อยู่แบบเดิม
                if(this.Same_address==0){
                      let DataCompanytypeCreate_Old_address = {
                            name: this.Personaltype_fullname,
                            type_id: this.Personaltype_type_id,
                            telephone_number: this.Personaltype_telephone_number,
                            mobile_phone_number: this.Personaltype_mobile_phone_number,
                            line_id: this.Personaltype_line_id,
                            address: this.Personaltype_address,
                            district_id: this.Personaltype_district_id,
                            cti_title:this.Taxinvoiceinfo_fullname,
                            cti_tax_id:this.Taxinvoiceinfo_id,
                            cti_flash_number:this.Taxinvoiceinfo_fax,
                            cti_email:this.Taxinvoiceinfo_email,
                            cti_telephone_number:this.Taxinvoiceinfo_telephone_number,
                            cti_mobile_phone_number:this.Taxinvoiceinfo_mobile_phone_number,
                            //สร้างที่อยู่เดิม,จังหวัดเดิม
                            cti_address:this.Personaltype_address,
                            cti_district_id:this.Personaltype_district_id,
                            cti_vat_type: this.vat_selected,
                          };
                      //console.log('สร้างที่อยู่แบบเดิม',DataCompanytypeCreate_Old_address);
                      let result = await api.addNewpersonnal(DataCompanytypeCreate_Old_address);
                      //console.log(result);
                      if (result.data.response =='OK'){
                            alert('บันทึกข้อมูลลูกค้าประเภทบริษัทเรียบร้อยแล้ว')
                            this.$router.push('/Customer')
                          }
                //สร้างลูกค้าประเภทบริษัท สร้างที่อยู่แบบใหม่
                }else{
                      let DataCompanytypeCreate_New_address = {
                            name: this.Personaltype_fullname,
                            type_id: this.Personaltype_type_id,
                            telephone_number: this.Personaltype_telephone_number,
                            mobile_phone_number: this.Personaltype_mobile_phone_number,
                            line_id: this.Personaltype_line_id,
                            address: this.Personaltype_address,
                            district_id: this.Personaltype_district_id,
                            cti_title:this.Taxinvoiceinfo_fullname,
                            cti_tax_id:this.Taxinvoiceinfo_id,
                            cti_flash_number:this.Taxinvoiceinfo_fax,
                            cti_email:this.Taxinvoiceinfo_email,
                            cti_telephone_number:this.Taxinvoiceinfo_telephone_number,
                            cti_mobile_phone_number:this.Taxinvoiceinfo_mobile_phone_number,
                            //สร้างที่อยู่ใหม่,จังหวัดใหม่
                            cti_address:this.Taxinvoiceinfo_address,
                            cti_district_id:this.Taxinvoiceinfo_district_id,
                            cti_vat_type: this.vat_selected,
                          };
                      //console.log('สร้างที่อยู่แบบใหม่',DataCompanytypeCreate_New_address);
                      let result = await api.addNewpersonnal(DataCompanytypeCreate_New_address);
                      if (result.data.response =='OK'){
                            alert('บันทึกข้อมูลประเภทบริษัทเรียบร้อยแล้ว')
                            this.$router.push('/Customer')
                          }
                }
            }
        }else{
            //แก้ไขรายชื่อลูกค้า
            //แก้ไขลูกค้าประเภทบุคคล 
            if(this.pasoneltype == 1 ){
              let DataPersonaltypeEdit = {
                            name: this.Personaltype_fullname,
                            type_id: this.Personaltype_type_id,
                            telephone_number: this.Personaltype_telephone_number,
                            mobile_phone_number: this.Personaltype_mobile_phone_number,
                            line_id: this.Personaltype_line_id,
                            address: this.Personaltype_address,
                            district_id: this.Personaltype_district_id,
                            cti_title:null,
                            cti_tax_id:null,
                            cti_flash_number:null,
                            cti_email:null,
                            cti_telephone_number:null,
                            cti_mobile_phone_number:null,
                            cti_address:null,
                            cti_district_id:null,
                            cti_vat_type:this.vat_selected,
                          };
                      //console.log('แบบที่อยู่เดิม',DataPersonaltypeEdit);
                      let result = await api.putEditcustomer(DataPersonaltypeEdit);
                      //console.log(result);
                      if (result.data.response =='OK'){
                            alert('แก้ไขข้อมูลลูกค้าประเภทบุคคลเรียบร้อยแล้ว')
                            this.$router.push('/Customer')
                          }
            }else{
                //แก้ไขลูกค้าประเภทบริษัท
                //แก้ไขลูกค้าประเภทบริษัท แบบที่อยู่เดิม
                if(this.Same_address==0){
                      let DataCompanytypeEdit_Old_address = {
                            name: this.Personaltype_fullname,
                            type_id: this.Personaltype_type_id,
                            telephone_number: this.Personaltype_telephone_number,
                            mobile_phone_number: this.Personaltype_mobile_phone_number,
                            line_id: this.Personaltype_line_id,
                            address: this.Personaltype_address,
                            district_id: this.Personaltype_district_id,
                            cti_title:this.Taxinvoiceinfo_fullname,
                            cti_tax_id:this.Taxinvoiceinfo_id,
                            cti_flash_number:this.Taxinvoiceinfo_fax,
                            cti_email:this.Taxinvoiceinfo_email,
                            cti_telephone_number:this.Taxinvoiceinfo_telephone_number,
                            cti_mobile_phone_number:this.Taxinvoiceinfo_mobile_phone_number,
                            //แก้ไขที่อยู่เดิม,จังหวัดเดิม
                            cti_address:this.Personaltype_address,
                            cti_district_id:this.Personaltype_district_id,
                            cti_vat_type: this.vat_selected,
                          };
                      //console.log('แก้ไขที่อยู่แบบเดิม',DataCompanytypeEdit_Old_address);
                      let result = await api.putEditcustomer(DataCompanytypeEdit_Old_address);
                      //console.log(result);
                      if (result.data.response =='OK'){
                            alert('แก้ไขข้อมูลลูกค้าประเภทบริษัทเรียบร้อยแล้ว')
                            this.$router.push('/Customer')
                          }
                //แก้ไขลูกค้าประเภทบริษัท แก้ไขที่อยู่แบบใหม่
                }else{
                      let DataCompanytypeEdit_New_address = {
                            name: this.Personaltype_fullname,
                            type_id: this.Personaltype_type_id,
                            telephone_number: this.Personaltype_telephone_number,
                            mobile_phone_number: this.Personaltype_mobile_phone_number,
                            line_id: this.Personaltype_line_id,
                            address: this.Personaltype_address,
                            district_id: this.Personaltype_district_id,
                            cti_title:this.Taxinvoiceinfo_fullname,
                            cti_tax_id:this.Taxinvoiceinfo_id,
                            cti_flash_number:this.Taxinvoiceinfo_fax,
                            cti_email:this.Taxinvoiceinfo_email,
                            cti_telephone_number:this.Taxinvoiceinfo_telephone_number,
                            cti_mobile_phone_number:this.Taxinvoiceinfo_mobile_phone_number,
                            //แก้ไขที่อยู่แบบใหม่,จังหวัดใหม่
                            cti_address:this.Taxinvoiceinfo_address,
                            cti_district_id:this.Taxinvoiceinfo_district_id,
                            cti_vat_type: this.vat_selected,
                          };
                      //console.log(แก้ไขที่อยู่แบบใหม่',DataCompanytypeEdit_New_address);
                      let result = await api.putEditcustomer(DataCompanytypeEdit_New_address);
                      if (result.data.response =='OK'){
                            alert('แก้ไขข้อมูลประเภทบริษัทเรียบร้อยแล้ว')
                            this.$router.push('/Customer')
                          }
                }
            }
        }
      }
    },
  },
};
</script>

<style scoped></style>