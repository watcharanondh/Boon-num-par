<template>
  <FormPersonaltype  :type_id="type_id" />
</template>

<script>
import FormPersonaltype from '@/components/CreateNewCustomer/FormPersonaltype.vue';
export default {
  name: "CreatePersoneltype",
  components: { 
    FormPersonaltype 
    },
  async created() {
   await this.londDataCreate();
  },

  data: () => ({
    CreateorEdittype:true,
    type_id: null,

  }),
  methods: {
   async londDataCreate(){
          this.type_id = this.$store.getters["Newpersonal_type_id"].type_id
      },
  },

}
</script>

<style>

</style>