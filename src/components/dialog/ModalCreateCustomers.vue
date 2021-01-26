<template>
  <v-dialog transition="dialog-top-transition" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="#29CC97" v-bind="attrs" v-on="on" rounded
        ><span class="font-weight-bold white--text"
          >สร้างรายชื่อลูกค้า</span
        ></v-btn
      >
    </template>
    <template v-slot:default="dialogSelectCustomer">
      <v-card>
        <v-card-text>
          <div class="pa-3 mr-15 font-weight-bold black--text">
            <h2>ประเภทลูกค้า</h2>
          </div>
          <v-select
            v-model="SelectCustomerType"
            :items="CustomerTypePage"
            item-text="name"
            item-value="value"
            return-object
            solo
            outlined
          >
          </v-select>
        </v-card-text>

        <v-card-actions class="justify-center">
          <v-row>
          <v-col cols="2">
            <v-btn
              color="#29CC97"
              rounded
              @click="selectPage(SelectCustomerType.value)"><span class="font-weight-bold white--text">ตกลง</span></v-btn>
            </v-col>
            <v-col cols="2">
            <v-btn
              rounded
              outlined
              color="warning"
              @click="dialogSelectCustomer.value = false">ปิด</v-btn>
          </v-col>
          </v-row>
        </v-card-actions>
                   
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

<style></style>
