<template>
  <FormManageteamhong :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormManageteamhong from "@/components/Form/FormTeamhong/FormManageteamhong.vue";
export default {
  name: "CreateManageteamhong",
  components: {
    FormManageteamhong
  },
  data: () => ({
    CreateorEdittype: true
  })
};
</script>

<style></style>
