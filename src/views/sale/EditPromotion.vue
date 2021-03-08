<template>
  <FormPromotion :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormPromotion from "@/components/Form/FormSale/FormPromotion";
export default {
  name: "EditPromotion",
  components: {
    FormPromotion
  },
  data: () => ({
    CreateorEdittype: false
  })
};
</script>

<style></style>
