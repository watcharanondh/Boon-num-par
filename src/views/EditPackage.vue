<template>
  <FormPackage :CreateorEdittype="CreateorEdittype"/>
</template>

<script>
import FormPackage from '@/components/Form/FormPackage';
export default {
  name: "EditPackage",
  components: { 
     FormPackage
    },
  data: () => ({
    CreateorEdittype:false
  }),
}
</script>

<style>

</style>