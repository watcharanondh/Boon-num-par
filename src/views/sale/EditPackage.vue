<template>
  <FormPackage :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormPackage from "@/components/Form/FormSale/FormPackage";
export default {
  name: "EditPackage",
  components: {
    FormPackage
  },
  data: () => ({
    CreateorEdittype: false
  })
};
</script>

<style></style>
