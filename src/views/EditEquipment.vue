<template>
  <FormEquipment :CreateorEdittype="CreateorEdittype" :Edit_id="Edit_id" :Edit_Equipment_name="Edit_Equipment_name" :Edit_stock_in="Edit_stock_in"/>
</template>

<script>
import FormEquipment from '@/components/CreateNewCustomer/FormEquipment';
import api from "@/services/api";
export default {
  name: "EditEquipment",
  components: { 
     FormEquipment
    },
async created() {
     await this.londDataEdit();
  },
  data: () => ({
    CreateorEdittype:false,
    Edit_id:null,
    Edit_Equipment_name:"",
    Edit_stock_in:"",

  }),
   methods: {
    async londDataEdit(){
            this.Edit_id = this.$store.getters["Newpersonal_BNP_ID"].BNP_ID
            let Equipment_ID_Edit = { id:this.Edit_id }
            let result = await api.getEditequipment(Equipment_ID_Edit);

                    this.Edit_id=result.data.result[0].id
                    this.Edit_Equipment_name=result.data.result[0].name
                    this.Edit_stock_in=result.data.result[0].stock_in
                        console.log(this.Edit_id);
                        console.log(this.Edit_Equipment_name);
                        console.log(this.Edit_stock_in);
    }
  },
}
</script>

<style>

</style>