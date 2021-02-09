<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">{{ Changesubmit }}อุปกรณ์</div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <!-- ข้อมูลอุปกรณ์ -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center">
          <v-col lg="6" md="12" sm="12" cols="12">
            <v-row>
              <v-col>
                <div class="sizetitle">{{ Changesubmit }}ข้อมูลอุปกรณ์ {{Edit_Equipment_name}}</div>
              <input type="text" v-model="Equipment_Name">
              </v-col>
            </v-row>
            <!-- ข้อมูลอุปกรณ์ -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="sizehead">ชื่ออุปกรณ์</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Name"
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
                <div class="sizehead">จำนวน</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Stock"
                    type="number"
                    min="1"
                    dense
                    solo
                    outlined
                    clearable
                  ></v-text-field>
                  {{ Edit_stock_in }}
                </v-row>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="3">
                <v-btn
                  block
                  large
                  rounded
                  outlined
                  @click="$router.push('/Equipment')"
                  >ยกเลิก</v-btn
                >
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="3">
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

  props: [
    "CreateorEdittype",
    "Edit_id",
    "Edit_Equipment_name",
    "Edit_stock_in",
  ],

   created() {
        this.Equipment_Name = this.Edit_Equipment_name;
        this.Equipment_Stock = this.Edit_stock_in;
    console.log("ใน-------", this.Equipment_Name);
    console.log("ใน", this.Edit_stock_in);
    console.log("ใน", this.Edit_id);
     this.loadDataEdit();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },

  computed: {
    Changesubmit() {
      return this.CreateorEdit == true ? "บันทึก" : "แก้ไข";
    },
  },

  data: () => ({
    valid: true,
    CreateorEdit: null,
    EquipmentEdit_id: null,
    
    Equipment_Name: null,
    Equipment_Stock: null,
  }),

  methods: {
    async loadDataEdit() {
      this.CreateorEdit = this.CreateorEdittype;
      if (this.CreateorEdit == false) {
        this.Equipment_Name = this.Edit_Equipment_name;
        this.Equipment_Stock = this.Edit_stock_in;
      }
    },

    async submit() {
      console.log(this.CreateorEdit);
      if (this.CreateorEdit == true) {
        let DataNewEquipment = {
          name: this.Equipment_Name,
          stock_in: this.Equipment_Stock_IN,
        };
        let result = await api.addEquipment(DataNewEquipment);
        console.log(result);
        if (result.data.response == "OK") {
          alert("บันทึกอุปกรณ์เรียบร้อยแล้ว");
          this.$router.push("/Equipment");
        }
      } else {
        let DataEditEquipment = {
          id: this.EquipmentEdit_id,
          name: this.Equipment_Name,
          stock_in: this.Equipment_Stock_IN,
        };
        let result = await api.editEquipment(DataEditEquipment);
        if (result.data.response == "OK") {
          alert("แก้ไขอุปกรณ์เรียบร้อยแล้ว");
          this.$router.push("/Equipment");
        }
      }
    },
  },
};
</script>

<style scoped></style>
