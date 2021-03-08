<template>
  <FormManageteam :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormManageteam from "@/components/Form/FormTeambnp/FormManageteam.vue";
export default {
  name: "EditManageteam",
  components: {
    FormManageteam
  },
  data: () => ({
    CreateorEdittype: false
  })
};
</script>

<style></style>