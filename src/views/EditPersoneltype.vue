<template >
  <FormPersonaltype :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormPersonaltype from '@/components/Form/FormPersonaltype.vue'

export default {
  name: "EditPersoneltype",
  components: { 
    FormPersonaltype 
    },

  data: () => ({
    CreateorEdittype:false,
  }),

}
</script>

<style>

</style>