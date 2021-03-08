<template>
  <FormPackage :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormPackage from "@/components/Form/FormSale/FormPackage";
export default {
  name: "CreatePackage",
  components: {
    FormPackage
  },
  data: () => ({
    CreateorEdittype: true
  })
};
</script>

<style></style>
