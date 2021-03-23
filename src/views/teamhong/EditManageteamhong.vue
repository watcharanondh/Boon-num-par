<template>
  <FormManageteamhong :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormManageteamhong from "@/components/Form/FormTeamhong/FormManageteamhong.vue";
export default {
  name: "EditManageteamhong",
  components: {
    FormManageteamhong
  },
  data: () => ({
    CreateorEdittype: false
  })
};
</script>

<style></style>
