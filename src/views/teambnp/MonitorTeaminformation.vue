<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-col>
      <v-row>
        <v-card flat color="#E5E5E5">
          <div class="header-title">
            รายการจัดทีม
          </div>
        </v-card>
      </v-row>
    </v-col>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <v-col>
      <v-row  justify="end">
          <span class="mt-3 black--text justify--center ">ตารางงาน / <span>BNPT000001</span></span>
          <v-spacer></v-spacer>
        <v-btn
          class="mx-10"
          color="#C4C4C4"
          @click="$router.push({ name: 'menuEventteaminformation' })"
          rounded
        >
          <span class="white--text">ย้อนกลับ</span></v-btn>
      </v-row>
    </v-col>
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
                  ข้อมูลพื้นฐาน
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col lg="4" md="4" sm="12" cols="12">
            <!-- รหัสทีม -->
                <div>รหัสทีม</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Name"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- ชื่อใบกำกับภาษี -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>ชื่อใบกำกับภาษี</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Stock_IN"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- สถานที่จัดงาน -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>สถานที่จัดงาน</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Stock_IN"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  ข้อมูลวันเวลา
                </div>
              </v-col>
            </v-row>
            <v-row>
            <!-- จัดงาน -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>จัดงาน</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Name"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- นัดดูสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>นัดดูสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Stock_IN"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- จัดสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>จัดสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Stock_IN"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div class="create-edit-title">
                  ข้อมูลทีม
                </div>
              </v-col>
            </v-row>
            <v-row>
            <!-- ทีมดูสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>ทีมดูสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Name"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- ทีมจัดสถานที่ -->
              <v-col lg="4" md="4" sm="12" cols="12">
                <div>ทีมจัดสถานที่</div>
                <v-row class="no-gutters">
                  <v-text-field
                    v-model="Equipment_Stock_IN"
                    disabled
                  ></v-text-field>
                </v-row>
              </v-col>
              <!-- จัดสถานที่ -->
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
  name: "Equipment",
  async mounted() {
    this.loadEquipment();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },

  data: () => ({
    total: null,
    table_customer: [],
    headers_table_customer: [
      {
        text: "หมายเลขอุปกรณ์",
        value: "equipment_code",
        sortable: true,
        align: "start",
        color: "black",
      },
      {
        text: "รายชื่ออุปกรณ์",
        value: "name",
        sortable: false,
        align: "start",
      },
      { text: "ถูกใช้", value: "stock_out", sortable: false, align: "start" },
      {
        text: "คงเหลือ",
        value: "balance_stock",
        sortable: false,
        align: "start",
      },
      { text: "", value: "", sortable: false, align: "start" },
      { text: "", value: "", sortable: false, align: "start" },
    ],
  }),

  methods: {
    async loadEquipment() {
      let result = await api.getEquipment();
      this.table_customer = result.data.result;
      this.total = result.data.count_total;
    },
    async EditEquipment(item) {
      await this.$store.dispatch({
        type: "doEditBNPID",
        BNP_ID: item.equipment_code,
      });
      await this.$router.push({ name: "saleEditEquipment" });
    },

    async DelEquipment(item) {
      this.$swal
        .fire({
          title: `ต้องการลบอุปกรณ์นี้ใช่หรือไม่ ?`,
          showDenyButton: true,
          confirmButtonText: `ยืนยัน`,
          denyButtonText: `ยกเลิก`,
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let delEquipment = { equipment_code: item.equipment_code };
            let resultdel = await api.delEquipment(delEquipment);
            if (resultdel.data.response == "OK") {
              this.$swal.fire("ยืนยันการลบเรียบร้อย", "", "success");
              await this.loadEquipment();
            }
          } else if (result.isDenied) {
            this.$swal.fire("ยกเลิกการลบ", "", "error");
          }
        });
    },
  },
};
</script>

<style scoped></style>
