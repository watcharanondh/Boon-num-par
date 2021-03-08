<template>
  <v-dialog
    :retain-focus="false"
    transition="dialog-top-transition"
    persistent
    width="25%"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" color="#29CC97" rounded>
        <span class="white--text">สร้างเคสตรวจสอบ</span>
      </v-btn>
    </template>

    <template v-slot:default="dialogSelectStatus">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              <div class="update-head-title">
                เพิ่มรายการตรวจสอบ
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-title>
          <v-row>
            <v-col>
              <div class="update-sub-title">
                รายการตรวจสอบ
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <!-- <v-card-title>
          <v-row>
            <v-col>
              <div class="update-sub-title">
                
              </div>
            </v-col>
          </v-row>
        </v-card-title> -->
        <v-card-text>
          <v-row class="justify-center">
            <v-col class="justify-center">
              <v-text-field
                v-model="SelectStatus"
              >
              </v-text-field>

              <v-card-actions class="justify-center pa-0 mb-0">
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-btn
                    color="#29CC97"
                    block
                    large
                    rounded
                    @click="changeStatus(SelectStatus)"
                    ><span class=" white--text">อัพเดท</span></v-btn
                  >
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
                    @click="dialogSelectStatus.value = false"
                  >
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
import api from "@/services/api";
export default {
  name: "ModalUpdateLookAppointment",
  props: ["quotation_code"],
  mounted() {
    this.getStatus();
  },
  data() {
    return {
      SelectTeams: { name: "คอนเฟิร์ม", id: "1" },
      Teams: [],
    };
  },
  methods: {
    async getStatus() {
      let result = await api.getupdatelookandmanageappointment();
      let TeamALL = result.data.result.teams;
      this.Teams.push(TeamALL);
      
      // let _this = this;
      // TeamALL.forEach((value) => {
      //   _this.StatusType.push({
      //     id: `${value.id}`,
      //     name: `${value.name}`,
      //   });
      // });
    },
    async changeStatus(SelectStatus) {
      let StatusID = SelectStatus.id;
      let updateStatus = {
        quotation_code: this.quotation_code,
        status: StatusID,
      };
      console.log(updateStatus);
      let result = await api.updateStatusQuotation(updateStatus);
      console.log(result);
      if (result.data.response == "OK") {
        window.location.reload();
      }
    },

    async loadQuotations() {
      let result = await api.getQuotation();
      this.table_quotation_item = result.data.result;
      this.total = result.data.total;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
