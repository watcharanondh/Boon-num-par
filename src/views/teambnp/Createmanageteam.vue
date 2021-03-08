<template>
  <FormManageteam :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormManageteam from "@/components/Form/FormTeambnp/FormManageteam.vue";
export default {
  name: "CreateManageteam",
  components: {
    FormManageteam
  },
  data: () => ({
    CreateorEdittype: true
  })
};
</script>

<style></style>
