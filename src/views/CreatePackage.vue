<template>
  <FormPackage :CreateorEdittype="CreateorEdittype"/>
</template>

<script>
import FormPackage from '@/components/Form/FormPackage';
export default {
  name: "CreateEquipment",
  components: { 
     FormPackage
    },
  data: () => ({
    CreateorEdittype:true
  }),
}
</script>

<style>

</style>