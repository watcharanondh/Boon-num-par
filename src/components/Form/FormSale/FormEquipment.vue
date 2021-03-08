<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="header-title">{{ Changesubmit }}อุปกรณ์</div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center">
          <v-col lg="9" md="9" sm="12" cols="12">
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  {{ Changesubmit }}ข้อมูลอุปกรณ์
                </div>
              </v-col>
            </v-row>
            <!-- ข้อมูลอุปกรณ์ -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div>ชื่ออุปกรณ์</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Name"
                    :rules="equipment_nameRules"
                    type="text"
                    dense
                    solo
                    outlined
                    clearable
                  ></v-text-field>
                </v-row>
              </v-col>

              <!-- จำนวน -->
              <v-col lg="6" md="6" sm="12" cols="12">
                <div>จำนวน</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Stock_IN"
                    :rules="equipment_amountRules"
                    type="number"
                    min="1"
                    dense
                    solo
                    outlined
                    clearable
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col xl="3" lg="3" md="6" sm="12" cols="12">
                <v-btn
                  block
                  large
                  rounded
                  outlined
                  @click="$router.push({ name: 'saleEquipment' })"
                  >ยกเลิก</v-btn
                >
              </v-col>
              <v-spacer></v-spacer>
              <v-col xl="3" lg="3" md="6" sm="12" cols="12">
                <v-btn block color="#29CC97" dark large rounded @click="submit"
                  ><span class="white--text">{{ Changesubmit }}</span></v-btn
                >
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "FormEquipment",

  props: ["CreateorEdittype"],

  created() {
    this.loadDataEdit();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path
    });
  },

  computed: {
    Changesubmit() {
      return this.CreateorEdit == true ? "บันทึก" : "แก้ไข";
    }
  },

  data: () => ({
    valid: true,
    EditEquipment_ID: null,
    CreateorEdit: null,
    EquipmentEdit_id: null,

    Equipment_Name: null,
    Equipment_Stock_IN: null,

    equipment_nameRules: [v1 => !!v1 || "กรุณากรอกชื่ออุปกรณ์"],
    equipment_amountRules: [v1 => !!v1 || "กรุณากรอกจำนวนอุปกรณ์"]
  }),

  methods: {
    async loadDataEdit() {
      this.CreateorEdit = this.CreateorEdittype;

      if (this.CreateorEdit == false) {
        this.EditEquipment_ID = this.$store.getters["Newpersonal_BNP_ID"].BNP_ID;
        let Equipment_ID_Edits = { equipment_code: this.EditEquipment_ID };
        let result = await api.getEditequipment(Equipment_ID_Edits);

        if (!result.data.result.length) {
          window.location.href = `${process.env.VUE_APP_SUB_PATH}/sale/Equipment`;
          //this.$router.push({name:'saleEquipment'})
          return;
        }
        this.EquipmentEdit_id = result.data.result[0].equipment_code;
        this.Equipment_Name = result.data.result[0].name;
        this.Equipment_Stock_IN = result.data.result[0].stock_in;
      }
    },

    async submit() {
      if (this.$refs.form.validate() == true) {
        //สร้างอุปกรณ์
        if (this.CreateorEdit == true) {
          let DataNewEquipment = {
            name: this.Equipment_Name,
            stock_in: this.Equipment_Stock_IN
          };
          let result = await api.addEquipment(DataNewEquipment);
          if (result.data.response == "OK") {
            this.$swal.fire("สำเร็จ", "บันทึกอุปกรณ์เรียบร้อยแล้ว", "success");
            this.$router.push({ name: "saleEquipment" });
          } else {
            this.$swal.fire(
              "เกิดข้อผิดพลาด",
              `บันทึกอุปกรณ์ไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
              "error"
            );
          }
        } else {
          //แก้ไขอุปกรณ์
          let DataEditEquipment = {
            equipment_code: this.EquipmentEdit_id,
            name: this.Equipment_Name,
            stock_in: this.Equipment_Stock_IN
          };
          let result = await api.editEquipment(DataEditEquipment);
          if (result.data.response == "OK") {
            this.$swal.fire("สำเร็จ", "แก้ไขอุปกรณ์เรียบร้อยแล้ว", "success");
            this.$router.push({ name: "saleEquipment" });
          } else {
            this.$swal.fire(
              "เกิดข้อผิดพลาด",
              `แก้ไขอุปกรณ์ไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
              "error"
            );
          }
        }
      }
    }
  }
};
</script>

<style scoped></style>
