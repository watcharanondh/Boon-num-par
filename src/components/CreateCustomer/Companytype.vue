<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
            สร้างรายชื่อลูกค้าประเภทบริษัท
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <v-form
        ref="form"
        v-model="valid"
        lazy-validation
     >
      <v-row justify="center">
        <v-col lg="6" md="6" sm="12" cols="12">
          <v-row>
            <v-col>
             <div class="sizetitle">ข้อมูลลูกค้าประเภทบริษัท</div>
            </v-col>
          </v-row>

          <!-- ชื่อ-นามสกุล -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ชื่อ-นามสกุล</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Newcompanytype_fullname"
                  placeholder="ชื่อ และ นามสกุล"
                  dense
                  solo
                  outlined
                  clearable
                  :rules="Newcompanytype_fullnameRules"
                  required
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- โทรศัพท์ -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">โทรศัพท์</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Newcompanytype_telephone_number"
                  placeholder="02-1234567"
                  dense
                  solo
                  outlined
                  clearable
                  :rules="Newcompanytype_telephone_numberRules"
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
                  v-model="Newcompanytype_mobile_phone_number"
                  placeholder="081-2345678"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- ไอดีไลน์ -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ID Line</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Newcompanytype_line_id"
                  dense
                  solo
                  outlined
                  clearable
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
                  v-model="Newcompanytype_address"
                  placeholder="หมู่บ้าน/อาคาร เลขที่ 99 ถนน. ซอย. "
                  dense
                  solo
                  outlined
                  clearable
                  :rules="Newcompanytype_addressRules"
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
                  v-model="Newcompanytype_SelectProvinces"
                  :items="Newcompanytype_GatProvince"
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
                  v-model="Newcompanytype_SelectAmphoe"
                  :items="Newcompanytype_GatAmphoe"
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
                  v-model="Newcompanytype_SelectDistrict"
                  :items="Newcompanytype_GatDistrict"
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
                  v-model="Newcompanytype_SelectZipcode"
                  placeholder="รหัสไปรษณีย์"
                  dense
                  solo
                  outlined
                  disabled
                ></v-text-field>
              </v-row>
            </v-col>
            </v-row>

          <!-- VAT 7% -->
           <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-row class="no-gutters">
                    <v-checkbox
                      @click="OnVat"
                      label="ต้องการ VAT 7%"
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
                  clearable
                  :rules="Taxinvoiceinfo_fullnameRules"
                  required
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
                  clearable
                  :rules="Taxinvoiceinfo_idRules"
                  required
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
                  :rules="Taxinvoiceinfo_telephone_numberRules"
                  required
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
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          
            <!--ใช้ที่อยู่เดียวกับข้อมูลลูกค้าประเภทบริษัท -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-row class="no-gutters">
                    <v-checkbox
                      input-value="true"
                      label="ใช้ที่อยู่เดียวกับข้อมูลลูกค้าประเภทบริษัท"
                      @click="Same_address = !Same_address"
                    ></v-checkbox>
                </v-row>
              </v-col>
            </v-row>

            <!--ใช้ที่อยู่ข้อมูลใบกำกับภาษี -->
            <div v-if="Same_address">
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
                @click="submit"
                ><span class="white--text">บันทึก</span></v-btn
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
  name: "CompanytypeCreate",

async mounted() {
    this.loadDataProvince();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },

  data: () => ({
    vat:false,
    vattype:'0',
    valid:true,
    Same_address:false,

    //ข้อมูลลูกค้าประเภทบริษัท
    Newcompanytype_fullname: "",
    Newcompanytype_type_id: "",
    Newcompanytype_telephone_number: "",
    Newcompanytype_mobile_phone_number: "",
    Newcompanytype_line_id: "",
    Newcompanytype_address: "",
    Newcompanytype_district_id: "",

    //ข้อมูลใบกำกับภาษี ประเภทบริษัท
    Taxinvoiceinfo_fullname: "",
    Taxinvoiceinfo_id:"",
    Taxinvoiceinfo_fax:"",
    Taxinvoiceinfo_email:"",
    Taxinvoiceinfo_telephone_number:null,
    Taxinvoiceinfo_mobile_phone_number: null,
    Taxinvoiceinfo_address:"",
    Taxinvoiceinfo_district_id: null,

    //ข้อมูลจังหวัดลูกค้าประเภทบริษัท
    Newcompanytype_SelectProvinces: [],
    Newcompanytype_GatProvince: [],
    Newcompanytype_SelectAmphoe: [],
    Newcompanytype_GatAmphoe: [],
    Newcompanytype_SelectDistrict: [],
    Newcompanytype_GatDistrict: [],
    Newcompanytype_SelectZipcode: null,

    //ข้อมูลจังหวัดใบกำกับภาษี ประเภทบริษัท
    Taxinvoiceinfo_SelectProvinces: [],
    Taxinvoiceinfo_GatProvince: [],
    Taxinvoiceinfo_SelectAmphoe: [],
    Taxinvoiceinfo_GatAmphoe: [],
    Taxinvoiceinfo_SelectDistrict: [],
    Taxinvoiceinfo_GatDistrict: [],
    Taxinvoiceinfo_SelectZipcode: null,


    Newcompanytype_fullnameRules:[v1=>!!v1 || "กรุณากรอกชื่อและนามสกุล",],
    Newcompanytype_telephone_numberRules:[v1=>!!v1 || "กรุณากรอกเบอร์โทรศัพท์",],
    Newcompanytype_addressRules:[v1=>!!v1 || "กรุณากรอกที่อยู่",],

    Taxinvoiceinfo_fullnameRules:[v1=>!!v1 || "กรุณากรอกชื่อและนามสกุลใบกำกับภาษี",],
    Taxinvoiceinfo_idRules:[v1=>!!v1 || "กรุณากรอกรหัสประจำตัวผู้เสียภาษี",],
    Taxinvoiceinfo_telephone_numberRules:[v1=>!!v1 || "กรุณากรอกเบอร์โทรศัพท์ใบกำกับภาษี",],

  }),


  methods: {
    async loadDataProvince() {
      this.Newcompanytype_type_id = this.$store.getters["Newpersonal_type_id"].type_id
      
      let result = await api.getProvinces();
      let provinces = result.data.result;
      let _this = this;
      provinces.forEach(function(value) {
        _this.Newcompanytype_GatProvince.push({
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
      this.Newcompanytype_GatAmphoe=[],
      this.Newcompanytype_GatDistrict=[]
      let NewcompanytypeProv = {
          province_code: this.Newcompanytype_SelectProvinces.province_Code,
          province: this.Newcompanytype_SelectProvinces.province_Name,
      };
      let resultNewcompanytypeProv = await api.getAmphoe(NewcompanytypeProv);
      let AmphoeNewcompanytype = resultNewcompanytypeProv.data.result;
      let _this = this;
        AmphoeNewcompanytype.forEach(function(value) {
          _this.Newcompanytype_GatAmphoe.push({
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
      this.Newcompanytype_GatDistrict = [];
      this.Newcompanytype_SelectZipcode = [];

      let NewcompanytypeAmphoe = {
          amphoe_code: this.Newcompanytype_SelectAmphoe.amphoe_Code,
          amphoe: this.Newcompanytype_SelectAmphoe.amphoe_Name,
      };
      let resultNewcompanytypeAmphoe = await api.getDistrict(NewcompanytypeAmphoe);
      let DistrictNewcompanytypeAmphoe = resultNewcompanytypeAmphoe.data.result;
      let _this = this;
          DistrictNewcompanytypeAmphoe.forEach(function(value) {
            _this.Newcompanytype_GatDistrict.push({
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
      this.Newcompanytype_SelectZipcode = this.Newcompanytype_SelectDistrict.zipcode;
      this.Newcompanytype_district_id = this.Newcompanytype_SelectDistrict.prov_id;
      // console.log(this.Newcompanytype_SelectZipcode);
      // console.log(this.Newcompanytype_district_id);
    },
    FindProv_idSelected_TaxinvoiceinfoSelected(){
      this.Taxinvoiceinfo_SelectZipcode = this.Taxinvoiceinfo_SelectDistrict.zipcode;
      this.Taxinvoiceinfo_district_id = this.Taxinvoiceinfo_SelectDistrict.prov_id;
      // console.log(this.Taxinvoiceinfo_SelectZipcode);
      // console.log(this.Taxinvoiceinfo_district_id);
    },

    OnVat(){
        this.vat = !this.vat
        if(this.vat == true){
          this.vattype = '1'
        }else{
          this.vattype = '0'
        }
    },

    BackpageCustomer() {
      this.$router.push("/Customer");
    },


async submit() {
      console.log(this.$refs.form.validate());
      if(this.$refs.form.validate() == true){
         console.log(this.Same_address);
        if(this.Same_address==false){
          console.log('addres',this.Same_address);
           let DataCompanytypeCreate = {
            name: this.Newcompanytype_fullname,
            type_id: this.Newcompanytype_type_id,
            telephone_number: this.Newcompanytype_telephone_number,
            mobile_phone_number: this.Newcompanytype_mobile_phone_number,
            line_id: this.Newcompanytype_line_id,
            address: this.Newcompanytype_address,
            district_id: this.Newcompanytype_district_id,
            cti_title:this.Taxinvoiceinfo_fullname,
            cti_tax_id:this.Taxinvoiceinfo_id,
            cti_flash_number:this.Taxinvoiceinfo_fax,
            cti_email:this.Taxinvoiceinfo_email,
            cti_telephone_number:this.Taxinvoiceinfo_telephone_number,
            cti_mobile_phone_number:this.Taxinvoiceinfo_mobile_phone_number,
            cti_address:this.Newcompanytype_address,
            cti_district_id:this.Newcompanytype_district_id,
            cti_vat_type: this.vattype,
       };
       console.log(DataCompanytypeCreate);

          let result = await api.addNewpersonnal(DataCompanytypeCreate);
          console.log(result);
          if (result.data.response =='OK'){
            console.log(result);
            alert('บันทึกข้อมูลเรียบร้อยแล้ว')
            this.$router.push('/Customer')
          }

        }else{
          let DataCompanytypeCreate = {
            name: this.Newcompanytype_fullname,
            type_id: this.Newcompanytype_type_id,
            telephone_number: this.Newcompanytype_telephone_number,
            mobile_phone_number: this.Newcompanytype_mobile_phone_number,
            line_id: this.Newcompanytype_line_id,
            address: this.Newcompanytype_address,
            district_id: this.Newcompanytype_district_id,
            cti_title:this.Taxinvoiceinfo_fullname,
            cti_tax_id:this.Taxinvoiceinfo_id,
            cti_flash_number:this.Taxinvoiceinfo_fax,
            cti_email:this.Taxinvoiceinfo_email,
            cti_telephone_number:this.Taxinvoiceinfo_telephone_number,
            cti_mobile_phone_number:this.Taxinvoiceinfo_mobile_phone_number,
            cti_address:this.Taxinvoiceinfo_address,
            cti_district_id:this.Taxinvoiceinfo_district_id,
            cti_vat_type: this.vattype,
       };

          let result = await api.addNewpersonnal(DataCompanytypeCreate);
          if (result.data.response =='OK'){
            console.log('ล่าง',result);
            alert('บันทึกข้อมูลเรียบร้อยแล้ว')
            this.$router.push('/Customer')
          }

          // <v-alert type="success">บันทึกข้อมูลลูกค้าสำเร็จ</v-alert>;
        }
       

      }
  

    },
  },
};
</script>

<style scoped></style>