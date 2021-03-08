<template>
  <FormEquipment :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormEquipment from "@/components/Form/FormSale/FormEquipment";
export default {
  name: "EditEquipment",
  components: {
    FormEquipment
  },
  data: () => ({
    CreateorEdittype: false
  })
};
</script>

<style></style>
