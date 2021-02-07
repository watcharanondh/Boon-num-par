<template>
  <FormPersonaltype  :title="Types" subtitle="คอนเฟิร์ม" />
</template>

<script>
import FormPersonaltype from '@/components/CreateNewCustomer/FormPersonaltype.vue'
export default {
  components: { 
    FormPersonaltype 
    },
  async mounted() {
    await this.londDataTypes();
   
  },

  data: () => ({
    Types: null,
    unconfirm: "",

  }),
  methods: {
   londDataTypes(){
        this.Types = this.$store.getters["Newpersonal_type_id"].type_id
         console.log(this.Types);
   }
  },

}
</script>

<style>

</style>