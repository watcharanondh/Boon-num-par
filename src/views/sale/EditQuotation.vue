<template>
  <FormQuotation :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormQuotation from "@/components/Form/FormQuotation";
export default {
  name: "CreateQuotation",
  components: {
    FormQuotation
  },
  data: () => ({
    CreateorEdittype: false
  })
};
</script>

<style></style>
