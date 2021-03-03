<template>
  <FormPromotion :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormPromotion from "@/components/Form/FormPromotion";
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
