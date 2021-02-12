<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="sizetitle">{{ Changesubmit }}โปรโมชั่น</div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>

    <v-card class="mx-10 pa-5 rounded-lg" outlined>
      <!-- ข้อมูลโปรโมชั่น -->
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center">
          <v-col lg="6" md="12" sm="12" cols="12">
            <v-row>
              <v-col>
                <div class="sizetitle">{{ Changesubmit }}ข้อมูลโปรโมชั่น</div>
              </v-col>
            </v-row>
            <!-- ข้อมูลโปรโมชั่น -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <div class="sizehead">ชื่อโปรโมชั่น</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Promotion_Name"
                    type="text"
                    dense
                    solo
                    outlined
                    clearable
                  ></v-text-field>
                </v-row>
              </v-col>

              <!-- จำนวน -->
              <v-col lg="3" md="6" sm="12" cols="12">
                <div class="sizehead">ส่วนลด</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Promotion_discount"
                    type="number"
                    min="1"
                    dense
                    solo
                    outlined
                    clearable
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- ประเภทส่วนลด -->
              <v-col lg="3" md="6" sm="12" cols="12">
                <div class="sizehead">ประเภทส่วนลด</div>
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
              <v-col cols="3">
                <v-btn
                  block
                  large
                  rounded
                  outlined
                  @click="$router.push('/Promotion')"
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
  name: "FormPromotion",

  props: ["CreateorEdittype"],

  async mounted() {
      await this.loadDataEdit();
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
    CreateorEdit:null,


    PromotionEdit_ID: null,
    PromotiontoEdit_ID: null,

    Promotion_Name: null,
    Promotion_discount: null,

    Getdiscounttype:null,

  
    Promotion_discount_type_selected:{ text: "บาท", value: "1" },
    Promotion_discount_type:[ { text: "บาท", value: "1" },{text: "%", value: "2"}],
  }),

  methods: {
    async loadDataEdit() {
      this.CreateorEdit = this.CreateorEdittype
      if (this.CreateorEdit == false) {
        this.PromotionEdit_ID = {id:this.$store.getters["Newpersonal_BNP_ID"].BNP_ID}
        let result = await api.getEditpromotion(this.PromotionEdit_ID);
        this.PromotiontoEdit_ID = result.data.result[0].id
        this.Promotion_Name = result.data.result[0].name
        this.Promotion_discount = result.data.result[0].discount
        let discounttype = result.data.result[0].discount_type
        this.Discounttype(discounttype) 
      }
    },

    Discounttype(discounttype){
      if(discounttype ==1){
            this.Promotion_discount_type_selected = { text: "บาท", value: "1"}
      }else{
            this.Promotion_discount_type_selected = { text: "%", value: "2"}
      }
    },

    async submit() {
      if (this.CreateorEdit == true) {
        let DataNewPromotion = {
          name: this.Promotion_Name,
          discount: this.Promotion_discount,
          discount_type: this.Promotion_discount_type_selected.value,
        };
        console.log(DataNewPromotion);
        let result = await api.addPromotion(DataNewPromotion);
        if (result.data.response == "OK") {
          alert("บันทึกโปรโมชั่นเรียบร้อยแล้ว");
          this.$router.push("/Promotion");
        }
      } else {
        let DataEditPromotion = {
          id: this.PromotiontoEdit_ID,
          name: this.Promotion_Name,
          discount: this.Promotion_discount,
          discount_type: this.Promotion_discount_type_selected.value,
        };
        let result = await api.editPromotion(DataEditPromotion);
        if (result.data.response == "OK") {
          alert("แก้ไขโปรโมชั่นเรียบร้อยแล้ว");
          this.$router.push("/Promotion");
        }
      }
    },
  },
};
</script>

<style scoped></style>
