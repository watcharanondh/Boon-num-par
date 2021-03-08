<template>
  <FormPersonaltype :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormPersonaltype from "@/components/Form/FormSale/FormPersonaltype.vue";

export default {
  name: "EditPersoneltype",
  components: {
    FormPersonaltype
  },

  data: () => ({
    CreateorEdittype: 2
  })
};
</script>

<style></style>
