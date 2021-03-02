<template>
  <FormPromotion :CreateorEdittype="CreateorEdittype"/>
</template>

<script>
import FormPromotion from '@/components/Form/FormPromotion';
export default {
  name: "CreatePromotion",
  components: { 
     FormPromotion
    },
  data: () => ({
    CreateorEdittype:true
  }),
}
</script>

<style>

</style>