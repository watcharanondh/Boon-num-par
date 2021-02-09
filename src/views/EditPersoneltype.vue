<template >
  <FormPersonaltype :CreateorEdittype="CreateorEdittype" :type_id="type_id" :Edits_fullname="Edits_fullname" :Edits_telephone_number="Edits_telephone_number"  :Edits_mobile_phone_number="Edits_mobile_phone_number" :Edits_line_id="Edits_line_id" :Edits_address="Edits_address" :Edits_province="Edits_province" :Edits_province_code="Edits_province_code" :Edits_amphoe="Edits_amphoe" :Edits_amphoe_code="Edits_amphoe_code" :Edits_district="Edits_district"  :Edits_district_code="Edits_district_code" :Edits_zipcode="Edits_zipcode" :Edits_district_id="Edits_district_id"
                    :Taxinvoiceinfo_Edits_vat_type="Taxinvoiceinfo_Edits_vat_type" :Taxinvoiceinfo_Edits_check_same_address="Taxinvoiceinfo_Edits_check_same_address" :Taxinvoiceinfo_Edits_company="Taxinvoiceinfo_Edits_company" :Taxinvoiceinfo_Edits_tax_id="Taxinvoiceinfo_Edits_tax_id" :Taxinvoiceinfo_Edits_fax_number="Taxinvoiceinfo_Edits_fax_number" :Taxinvoiceinfo_Edits_email="Taxinvoiceinfo_Edits_email" :Taxinvoiceinfo_Edits_telephone_number="Taxinvoiceinfo_Edits_telephone_number" :Taxinvoiceinfo_Edits_mobile_phone_number="Taxinvoiceinfo_Edits_mobile_phone_number" :Taxinvoiceinfo_Edits_address="Taxinvoiceinfo_Edits_address" :Taxinvoiceinfo_Edits_province="Taxinvoiceinfo_Edits_province" :Taxinvoiceinfo_Edits_province_code="Taxinvoiceinfo_Edits_province_code" :Taxinvoiceinfo_Edits_amphoe="Taxinvoiceinfo_Edits_amphoe" :Taxinvoiceinfo_Edits_amphoe_code="Taxinvoiceinfo_Edits_amphoe_code" :Taxinvoiceinfo_Edits_district="Taxinvoiceinfo_Edits_district" :Taxinvoiceinfo_Edits_district_code="Taxinvoiceinfo_Edits_district_code" :Taxinvoiceinfo_Edits_zipcode="Taxinvoiceinfo_Edits_zipcode" :Taxinvoiceinfo_Edits_district_id="Taxinvoiceinfo_Edits_district_id" />
</template>

<script>
import FormPersonaltype from '@/components/Form/FormPersonaltype.vue'
import api from "@/services/api";
export default {
  name: "EditPersoneltype",
  components: { 
    FormPersonaltype 
    },
  async created() {
   await this.londDataEdit();
  },

  data: () => ({
    CreateorEdittype:false,
    id: null,
    type_id:'',
    Edits_fullname:'',
    Edits_telephone_number: "",
    Edits_mobile_phone_number: "",
    Edits_line_id: "",
    Edits_address: "",
    Edits_province: "",
    Edits_province_code: "",
    Edits_amphoe: "",
    Edits_amphoe_code: "",
    Edits_district: "",
    Edits_district_code: "",
    Edits_zipcode: "",
    Edits_district_id: "",

    Taxinvoiceinfo_Edits_vat_type:'',
    Taxinvoiceinfo_Edits_check_same_address:'',

    Taxinvoiceinfo_Edits_company:'',
    Taxinvoiceinfo_Edits_tax_id:'',
    Taxinvoiceinfo_Edits_fax_number:'',
    Taxinvoiceinfo_Edits_email:'',
    Taxinvoiceinfo_Edits_telephone_number:'',
    Taxinvoiceinfo_Edits_mobile_phone_number:'',
    Taxinvoiceinfo_Edits_address:'',
    Taxinvoiceinfo_Edits_province:'',
    Taxinvoiceinfo_Edits_province_code:'',
    Taxinvoiceinfo_Edits_amphoe:'',
    Taxinvoiceinfo_Edits_amphoe_code:'',
    Taxinvoiceinfo_Edits_district:'',
    Taxinvoiceinfo_Edits_district_code:'',
    Taxinvoiceinfo_Edits_zipcode:'',
    Taxinvoiceinfo_Edits_district_id:'',


  }),
  methods: {
  async londDataEdit(){
        this.id = this.$store.getters["Newpersonal_BNP_ID"].BNP_ID
        console.log(this.id );
        let BNP_ID_Edit = { id:this.id }
        let result = await api.getListEditcustomers(BNP_ID_Edit);
        this.type_id=result.data.result[0].type_id
        this.Edits_fullname=result.data.result[0].name
        this.Edits_telephone_number=result.data.result[0].telephone_number
        this.Edits_mobile_phone_number=result.data.result[0].mobile_phone_number
        this.Edits_line_id=result.data.result[0].line_id
        this.Edits_address=result.data.result[0].address
        this.Edits_province=result.data.result[0].province
        this.Edits_province_code=result.data.result[0].province_code
        this.Edits_amphoe=result.data.result[0].amphoe
        this.Edits_amphoe_code=result.data.result[0].amphoe_code
        this.Edits_district=result.data.result[0].district
        this.Edits_district_code=result.data.result[0].district_code
        this.Edits_zipcode=result.data.result[0].zipcode
        this.Edits_district_id=result.data.result[0].district_id
        this.Taxinvoiceinfo_Edits_vat_type=result.data.result[0].cti_vat_type
        this.Taxinvoiceinfo_Edits_company=result.data.result[0].cti_title,
        this.Taxinvoiceinfo_Edits_tax_id=result.data.result[0].cti_tax_id,
        this.Taxinvoiceinfo_Edits_fax_number=result.data.result[0].cti_flash_number,
        this.Taxinvoiceinfo_Edits_email=result.data.result[0].cti_email,
        this.Taxinvoiceinfo_Edits_telephone_number=result.data.result[0].cti_telephone_number,
        this.Taxinvoiceinfo_Edits_mobile_phone_number=result.data.result[0].cti_mobile_phone_number,
        this.Taxinvoiceinfo_Edits_address=result.data.result[0].cti_address,
        this.Taxinvoiceinfo_Edits_province=result.data.result[0].cti_province,
        this.Taxinvoiceinfo_Edits_province_code=result.data.result[0].cti_province_code,
        this.Taxinvoiceinfo_Edits_amphoe=result.data.result[0].cti_amphoe,
        this.Taxinvoiceinfo_Edits_amphoe_code=result.data.result[0].cti_amphoe_code,
        this.Taxinvoiceinfo_Edits_district=result.data.result[0].cti_district,
        this.Taxinvoiceinfo_Edits_district_code=result.data.result[0].cti_district_code,
        this.Taxinvoiceinfo_Edits_zipcode=result.data.result[0].cti_zipcode
        this.Taxinvoiceinfo_Edits_district_id=result.data.result[0].cti_district_id
        this.Taxinvoiceinfo_Edits_check_same_address=result.data.result[0].check_same_address
    }
  },
}
</script>

<style>

</style>