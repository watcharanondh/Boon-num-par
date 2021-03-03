<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="header-title">{{ Changesubmit }}โปรโมชั่น</div>
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
                  {{ Changesubmit }}ข้อมูลโปรโมชั่น
                </div>
              </v-col>
            </v-row>
            <!-- ข้อมูลโปรโมชั่น -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div>ชื่อโปรโมชั่น</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Promotion_Name"
                    type="text"
                    :rules="Promotion_nameRules"
                    dense
                    solo
                    outlined
                    clearable
                  ></v-text-field>
                </v-row>
              </v-col>

              <!-- ส่วนลด -->
              <v-col lg="3" md="6" sm="12" cols="12">
                <span>ส่วนลด</span
                ><span class="promotion">( ใส่เป็นจำนวน )</span>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Promotion_discount"
                    type="number"
                    min="1"
                    :rules="Promotion_discountRules"
                    dense
                    solo
                    outlined
                    clearable
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- ประเภทส่วนลด -->
              <v-col lg="3" md="6" sm="12" cols="12">
                <div>ประเภทส่วนลด</div>
                <v-row class="no-gutters">
                  <v-select
                    v-model="Promotion_discount_type_selected"
                    :items="Promotion_discount_type"
                    item-text="text"
                    item-value="value"
                    return-object
                    filled
                    dense
                    solo
                    outlined
                  ></v-select>
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
                  @click="$router.push({ name: 'salePromotion' })"
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
  name: "FormPromotion",

  props: ["CreateorEdittype"],

  async mounted() {
    await this.loadDataEdit();
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
    CreateorEdit: null,

    PromotionEdit_ID: null,
    PromotiontoEdit_ID: null,

    Promotion_Name: null,
    Promotion_discount: null,

    Getdiscounttype: null,

    Promotion_discount_type_selected: { text: "บาท", value: "1" },
    Promotion_discount_type: [
      { text: "บาท", value: "1" },
      { text: "%", value: "2" }
    ],

    Promotion_nameRules: [v1 => !!v1 || "กรุณากรอกชื่อโปรโมชั่น"],
    Promotion_discountRules: [v1 => !!v1 || "กรุณากรอกส่วนลด"]
  }),

  methods: {
    async loadDataEdit() {
      this.CreateorEdit = this.CreateorEdittype;
      if (this.CreateorEdit == false) {
        this.PromotionEdit_ID = {
          promotion_code: this.$store.getters["Newpersonal_BNP_ID"].BNP_ID
        };
        let result = await api.getEditpromotion(this.PromotionEdit_ID);
        if (!result.data.result.length) {
          window.location.href = `${process.env.VUE_APP_SUB_PATH}/sale/Promotion`;
          //this.$router.push({name:'Promotion'})
          return;
        }
        this.PromotiontoEdit_ID = result.data.result[0].promotion_code;
        this.Promotion_Name = result.data.result[0].name;
        this.Promotion_discount = result.data.result[0].discount;
        let discounttype = result.data.result[0].discount_type;
        this.Discounttype(discounttype);
      }
    },

    Discounttype(discounttype) {
      if (discounttype == 1) {
        this.Promotion_discount_type_selected = { text: "บาท", value: "1" };
      } else {
        this.Promotion_discount_type_selected = { text: "%", value: "2" };
      }
    },

    async submit() {
      if (this.$refs.form.validate() == true) {
        if (this.CreateorEdit == true) {
          let DataNewPromotion = {
            name: this.Promotion_Name,
            discount: this.Promotion_discount,
            discount_type: this.Promotion_discount_type_selected.value
          };
          console.log(DataNewPromotion);
          let result = await api.addPromotion(DataNewPromotion);
          if (result.data.response == "OK") {
            this.$swal.fire(
              "สำเร็จ",
              "บันทึกโปรโมชั่นเรียบร้อยแล้ว",
              "success"
            );
            this.$router.push({ name: "salePromotion" });
          } else {
            this.$swal.fire(
              "เกิดข้อผิดพลาด",
              `บันทึกโปรโมชั่นไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
              "error"
            );
          }
        } else {
          let DataEditPromotion = {
            promotion_code: this.PromotiontoEdit_ID,
            name: this.Promotion_Name,
            discount: this.Promotion_discount,
            discount_type: this.Promotion_discount_type_selected.value
          };
          let result = await api.editPromotion(DataEditPromotion);
          if (result.data.response == "OK") {
            this.$swal.fire("สำเร็จ", "แก้ไขโปรโมชั่นเรียบร้อยแล้ว", "success");
            this.$router.push({ name: "salePromotion" });
          } else {
            this.$swal.fire(
              "เกิดข้อผิดพลาด",
              `แก้ไขโปรโมชั่นไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
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
