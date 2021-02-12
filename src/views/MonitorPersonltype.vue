<template >
  <FormPersonaltype :monitortypes="monitortype" :CreateorEdittype="CreateorEdittype" />
</template>

<script>
import FormPersonaltype from '@/components/Form/FormPersonaltype.vue'
export default {
  name: "MonitorPersonltype",
  components: { 
    FormPersonaltype 
    },
  data: () => ({
    monitortype:true,
    CreateorEdittype:false,
  }),
}
</script>

<style>

</style>