<template>
  <FormEquipment :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormEquipment from "@/components/Form/FormSale/FormEquipment";
export default {
  name: "CreateEquipment",
  components: {
    FormEquipment
  },
  data: () => ({
    CreateorEdittype: true
  })
};
</script>

<style></style>
