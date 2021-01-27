<template>
  <v-dialog transition="dialog-top-transition" max-width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" fab icon outlined small>
        <v-icon>visibility</v-icon>
        </v-btn>
    </template>
    <template v-slot:default="dialogSelectStatus">
      <v-card>
        <v-card-text>
          <div class="pa-3 mr-15 font-weight-bold black--text">
            <h2>ปรับเปลี่ยนสถานะ</h2>
          </div>
          <v-select
            v-model="SelectStatus"
            :items="StatusType"
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
              @click="selectPage(SelectStatus.value)"><span class="font-weight-bold white--text">ตกลง</span></v-btn>
            </v-col>
            <v-col cols="2">
            <v-btn
              rounded
              outlined
              color="warning"
              @click="dialogSelectStatus.value = false">ปิด</v-btn>
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
      SelectStatus: { name: "คอนเฟิร์ม", value: "Personneltype" },
      StatusType: [
        { name: "ไม่คอนเฟิร์ม", value: "Personneltype" },
        { name: "ยกเลิก", value: "Companytype" },
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
