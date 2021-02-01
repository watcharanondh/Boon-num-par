<template>
  <v-dialog
    :retain-focus="false"
    transition="dialog-top-transition"
    persistent
    width="25%"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#29CC97" v-bind="attrs" v-on="on" rounded>
        <span class="white--text">สร้างรายชื่อลูกค้า</span></v-btn>
    </template>

    <template v-slot:default="dialogSelectCustomer">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              <div class="black--text">
                ประเภทลูกค้า
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row class="justify-center">
            <v-col class="justify-center">
              <v-select
                v-model="SelectCustomerType"
                :items="CustomerTypePage"
                item-text="name"
                item-value="value"
                return-object
                solo
                dense
                outlined
              >
              </v-select>

              <v-card-actions class="justify-center pa-0 mb-0">
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-btn
                    color="#29CC97"
                    block
                    large
                    rounded
                    @click="selectPage(SelectCustomerType.value)"
                    ><span class=" white--text">ตกลง</span></v-btn>
                </v-col>
              </v-card-actions>
              <v-card-actions class="justify-center pa-0">
                <v-col lg="6" md="6" sm="12" cols="12">
                <v-btn
                  block
                  large
                  rounded
                  outlined
                  color="warning"
                  @click="dialogSelectCustomer.value = false">
                  ปิด
                </v-btn>
                </v-col>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      SelectCustomerType: { name: "บุคคล", value: "Personneltype" },
      CustomerTypePage: [
        { name: "บุคคล", value: "Personneltype" },
        { name: "บริษัท", value: "Companytype" },
      ],
    };
  },
  methods: {
    selectPage() {
      this.$router.push(`/${this.SelectCustomerType.value}`);
    },
  },
};
</script>

<style scoped>

</style>
