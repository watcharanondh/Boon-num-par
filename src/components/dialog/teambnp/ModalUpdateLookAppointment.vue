<template>
  <v-dialog
    :retain-focus="false"
    transition="dialog-top-transition"
    persistent
    width="25%"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-bind="attrs" v-on="on" block rounded outlined small>
        <span>อัพเดทนัดดูสถานที่</span>
      </v-btn>
    </template>

    <template v-slot:default="dialogSelectStatus">
      <v-card>
        <v-card-title>
          <v-row>
            <v-col>
              <div class="update-head-title">
                จัดทีม
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-title>
          <v-row>
            <v-col>
              <div class="update-sub-title">
                กิจกรรม
              </div>
              <div class="update-sub-activity">
                นัดดูสถานที่
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-title>
          <v-row>
            <v-col>
              <div class="update-sub-title">
                เลือกทีม
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              <v-select
                v-model="SelectTeams"
                :items="Teams"
                item-text="name"
                item-value="team_code"
              >
              </v-select>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-title>
          <v-row>
            <v-col>
              <div class="update-sub-title">
                เลือกคนรถ
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-row class="justify-center">
            <v-col class="justify-center">
              <v-select
                v-model="SelectDrivings"
                :items="Drivings"
                item-text="nickname"
                item-value="user_code"
              >
              </v-select>

              <v-card-actions class="justify-center pa-0 mb-0">
                <v-col lg="6" md="6" sm="12" cols="12">
                  <v-btn
                    color="#29CC97"
                    block
                    large
                    rounded
                    @click="ManageAllteam()"
                  >
                    <span class=" white--text">อัพเดท</span></v-btn
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
      SelectTeams: null,
      SelectDrivings: null,
      Teams: [],
      Drivings: [],
    };
  },
  methods: {
    async getStatus() {
      let result = await api.getupdatelookandmanageappointment();
      this.Teams = result.data.result.teams;
      this.SelectTeams = result.data.result.teams[0].team_code;
      this.Drivings = result.data.result.drivers;
      this.SelectDrivings = result.data.result.drivers[0].user_code;
    },


    async ManageAllteam() {
      console.log("a SelectTeams", this.SelectTeams);
      console.log("a SelectDrivings", this.SelectDrivings);

      let submitmanage = {
        quotation_code: this.quotation_code,
        team_code: this.SelectTeams,
        user_code: this.SelectDrivings,
        team_type: "0",
      };
      let result = await api.AssignTeamtoWork(submitmanage);
      console.log(result.data.response);
      if (result.data.response == "OK") {
        // this.$swal.fire("อัพเดทนัดดูสถานที่เรียบร้อย", "", "success");
        window.location.reload();
      } else {
        this.$swal.fire(
          "เกิดข้อผิดพลาด",
          `อัพเดทนัดดูสถานที่ไม่สำเร็จ ${result.data.response} เนื่องจาก ${result.data.result} `,
          "error"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
