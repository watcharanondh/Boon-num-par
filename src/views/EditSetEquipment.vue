<template>
  <FormSetEquipment :CreateorEdittype="CreateorEdittype"/>
</template>

<script>
import FormSetEquipment from '@/components/Form/FormSetEquipment';
export default {
  name: "EditSetEquipment",
  components: { 
     FormSetEquipment
    },
  data: () => ({
    CreateorEdittype:false
  }),
}
</script>

<style>

</style>