<template>
  <FormPersonaltype :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormPersonaltype from "@/components/Form/FormSale/FormPersonaltype.vue";
export default {
  name: "CreatePersoneltype",
  components: {
    FormPersonaltype
  },

  data: () => ({
    CreateorEdittype: 1
  })
};
</script>

<style></style>
