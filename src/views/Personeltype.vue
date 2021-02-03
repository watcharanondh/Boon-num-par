<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">
            สร้างรายชื่อลูกค้าประเภทบุคคล
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <v-row justify="center">
        <v-col lg="6" md="12" sm="12" cols="12">
          <!-- Tap เมนู ข้อมูลลูกค้า -->
          <v-row>
            <v-col>
              <v-tabs left color="black">
                <v-tab
                  v-for="link in links"
                  :key="link.text"
                  router
                  :to="link.route"
                >
                  <div class="sizehead">{{ link.text }}</div>
                </v-tab>
              </v-tabs>
            </v-col>
          </v-row>
          <!-- ชื่อ-นามสกุล -->
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">ชื่อ-นามสกุล</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Newpersonal_name"
                  dense
                  solo
                  outlined
                  clearable
                ></v-text-field>
              </v-row>
            </v-col>

            <!-- โทรศัพท์ -->
            <v-col lg="6" md="6" sm="12" cols="12">
              <div class="sizehead">โทรศัพท์</div>
              <v-row class="no-gutters">
                <v-text-field
                  v-model="Newpersonal_telephone_number"
                  dense
                  solo
                  outlined
                  clearable
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
                  v-model="Newpersonal_mobile_phone_number"
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
                  v-model="Newpersonal_line_id"
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
                  v-model="Newpersonal_address"
                  dense
                  solo
                  outlined
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
                  v-model="SelectProvinces"
                  :items="GatProvince"
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
                  v-model="SelectAmphoe"
                  :items="GatAmphoe"
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
                  v-model="SelectDistrict"
                  :items="GatDistrict"
                  item-text="district_Name"
                  item-value="zipcode"
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
                  v-model="SelectZipcode"
                  placeholder="รหัสไปรษณีย์"
                  dense
                  solo
                  outlined
                  disabled
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-btn block large rounded outlined @click="BackpageCustomer"
                >ปิด</v-btn
              >
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3">
              <v-btn block color="#29CC97" dark large rounded @click="submit"
                ><span class="white--text">บันทึก</span></v-btn
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Personneltype",

  async mounted() {
    this.loadDataProvince();

    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });

    this.Newpersonal_type_id = this.$store.getters["Newpersonal_type_id"],
    this.Newpersonal_name = this.$store.getters["Newpersonal_name"],
    this.Newpersonal_telephone_number = this.$store.getters["Newpersonal_telephone_number"],
    this.Newpersonal_mobile_phone_number = this.$store.getters["Newpersonal_mobile_phone_number"],
    this.Newpersonal_line_id = this.$store.getters["Newpersonal_line_id"],
    this.Newpersonal_address = this.$store.getters["Newpersonal_address"],
    this.Newpersonal_district_id = this.$store.getters["Newpersonal_district_id"];

    console.log(this.$store.getters["currentUser"]);
  },

  data: () => ({
    links: [
      { text: "ข้อมูลลูกค้า", route: "/Personeltype" },
      { text: "ข้อมูลใบกำกับภาษี", route: "/PersonalCreateQuotation" },
    ],
    Newpersonal_type_id: "",
    Newpersonal_name: "",
    Newpersonal_telephone_number: "",
    Newpersonal_mobile_phone_number: "",
    Newpersonal_line_id: "",
    Newpersonal_address: "",
    Newpersonal_district_id: "",

    SelectProvinces: [],
    GatProvince: [],
    SelectAmphoe: [],
    GatAmphoe: [],
    SelectDistrict: [],
    GatDistrict: [],
    SelectZipcode: null,

  }),

  methods: {
    async loadDataProvince() {
      let result = await api.getProvinces();
      let provinces = result.data.result;
      let _this = this;
      provinces.forEach(function(value) {
        _this.GatProvince.push({
          province_Name: `${value.province}`,
          province_Code: `${value.province_code}`,
        });
      });
    },

    async FindAmphoeSelected() {
      this.GatAmphoe = [];
      this.GatDistrict = [];
      let Prov = {
        province_code: this.SelectProvinces.province_Code,
        province: this.SelectProvinces.province_Name,
      };
      let result = await api.getAmphoe(Prov);
      let Amphoe = result.data.result;
      let _this = this;
      Amphoe.forEach(function(value) {
        _this.GatAmphoe.push({
          amphoe_Name: `${value.amphoe}`,
          amphoe_Code: `${value.amphoe_code}`,
        });
      });
    },

    async FindDistrict_Zipcode_Selected() {
      this.GatDistrict = [];
      this.SelectZipcode = [];

      let Amphoe = {
        amphoe_code: this.SelectAmphoe.amphoe_Code,
        amphoe: this.SelectAmphoe.amphoe_Name,
      };
      let result = await api.getDistrict(Amphoe);
      let District = result.data.result;
      let _this = this;
      District.forEach(function(value) {
        _this.GatDistrict.push({
          district_Name: `${value.district}`,
          zipcode: `${value.district_code}`,
          prov_id: `${value.id}`,
        });
      });
    },

    FindProv_idSelected() {
      this.SelectZipcode = this.SelectDistrict.zipcode;
      this.Newpersonal_district_id = this.SelectDistrict.prov_id;
    },

    BackpageCustomer() {
      this.$router.push("/Customer");
    },

    submit() {
      let DataNewCustomer = {
        type_id: "2",
        name: this.Newpersonal_name,
        telephone_number: this.Newpersonal_telephone_number,
        mobile_phone_number: this.Newpersonal_mobile_phone_number,
        line_id: this.Newpersonal_line_id,
        address: this.Newpersonal_address,
        district_id: this.Newpersonal_district_id,
      };

      this.$store.dispatch({
        type: "testsss",
        data: DataNewCustomer,
      });

      // await this.$store.dispatch({
      //       type: "fromPersonneltype",
      //         type_id: "2",
      //         name:this.Newpersonal_name,
      //         telephone_number:this.Newpersonal_telephone_number,
      //         mobile_phone_number: this.Newpersonal_mobile_phone_number,
      //         line_id: this.Newpersonal_line_id,
      //         address: this.Newpersonal_address,
      //         district_id: this.Newpersonal_district_id
      //     });

      <v-alert type="success">บันทึกข้อมูลลูกค้าสำเร็จ</v-alert>;

      this.$router.push("/PersonalCreateQuotation");
    },
  },
};
</script>

<style scoped></style>
