<template>
  <v-container style="background:#E5E5E5;color:white;height:100%">
    <v-row>
      <v-col>
        <v-card flat color="#E5E5E5">
          <div class="header-title">{{ Changesubmit }}สร้างรายชื่อทีม BNP</div>
          <br />
          <div class="header-subtitle">
            รายการทีม / {{ Changesubmit }}สร้างรายชื่อทีม
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-col>
      <v-row> </v-row>
    </v-col>
    <!-- สร้างรายชื่อทีม BNP -->
    <v-card class=" mx-10 pa-5 rounded-lg" outlined>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row justify="center">
          <v-col lg="4" md="4" sm="12" cols="12">
            <div class="name_team">ชื่อทีม</div>
            <v-row class="no-gutters">
              <v-text-field
                v-model="get_name_team"
                :rules="name_teamRules"
                clearable
              ></v-text-field>
            </v-row>

            <v-row class="no-gutters">
              <h3>รายชื่อพนักงาน</h3>
              <span class="order mt-1">{{ teams_table_all_total }} รายการ</span>
            </v-row>

            <!-- รายชื่อพนักงาน -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-row class="no-gutters">
                  <v-data-table
                    :headers="headers_teams_data"
                    :items="teams_data_staffs"
                    :items-per-page="10"
                    mobile-breakpoint="0"
                    class="elevation-1"
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td>{{ item.nickname }}</td>
                        <td align="center">
                          <v-btn
                            small
                            elevation="1"
                            color="success"
                            @click="selectedAddstaff(item)"
                            >เพิ่ม</v-btn>
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-row>
              </v-col>
            </v-row>
          </v-col>

          <!-- พนักงานที่เลือก -->
          <v-col lg="4" md="4" sm="12" cols="12">
            <div class="name_team">เบอร์โทรศัพท์</div>
            <v-row class="no-gutters">
              <v-text-field-integer
                v-model="phone_team"
                v-bind:properties="{
                  clearable: true,
                  placeholder: '099-999-9999',
                  rules: phone_teamRules,
                  required: true,
                }"
                v-bind:options="{
                  inputMask: '###-###-####',
                  outputMask: '##########',
                  empty: null,
                  alphanumeric: true,
                }"
                class="w-100"
              />
            </v-row>
            <v-row class="no-gutters">
              <h3>พนักงานที่เลือก</h3>
              <span class="order mt-1">{{ teams_table_selected_staff_total }} รายการ</span>
            </v-row>

            <!-- พนักงานที่เลือก -->
            <v-row>
              <v-col lg="6" md="6" sm="12" cols="12">
                <v-row class="no-gutters">
                  <v-data-table
                    :headers="headers_teams_selected_data"
                    :items="teams_selected_staffs"
                    :items-per-page="10"
                    hide-default-footer
                    mobile-breakpoint="0"
                    class="elevation-1"
                  >
                    <template v-slot:item="{ item }">
                      <tr>
                        <td>{{ item.nickname }}</td>
                        <td align="center">
                          <v-btn
                            small
                            elevation="1"
                            color="error"
                            @click="Deletestaff(item)"
                            >ลบ</v-btn
                          >
                        </td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-row>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <br/>
        <br/>
        <v-row justify="center" style="display: flex; grid-gap: 500px;">
            <v-col xl="2" lg="2" md="3" sm="12" cols="12">
                <v-btn block large rounded outlined @click="$router.push({ name: 'menuManageteamlists' })">ยกเลิก</v-btn>
            </v-col>
            <v-col xl="2" lg="2" md="3" sm="12" cols="12">
              <v-btn block large rounded dark color="#29CC97" @click="submit"><span class="white--text">{{ Changesubmit }}</span></v-btn>
            </v-col>
        </v-row>

      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "FormManageteam",
  props: ["CreateorEdittype"],

  created() {
    this.loadTeams();
    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },

  data: () => ({
    valid: true,
    get_name_team: null,
    phone_team: null,

    Editteam_ID: null,
    teams_table_all_total: 0,
    teams_table_selected_staff_total: 0,

    name_teamRules: [(v1) => !!v1 || "กรุณากรอกชื่อทีม"],
    phone_teamRules: [(v1) => !!v1 || "กรุณากรอกเบอร์โทรศัพท์"],

    teams_data_staffs: [],
    headers_teams_data: [
      { text: "ชื่อพนักงาน", value: "nickname", sortable: false, align: "start"},
      { text: "", value: "", sortable: false, align: "center" },
    ],

    teams_selected_staffs: [],
    headers_teams_selected_data: [
      { text: "ชื่อพนักงาน",value: "nickname", sortable: false, align: "start",},
      { text: "", value: "", sortable: false, align: "center" },
    ],
  }),
  computed: {
    Changesubmit() {
      return this.CreateorEdit == true ? "บันทึก" : "แก้ไข";
    },
  },

  methods: {
    async loadTeams() {
      this.CreateorEdit = this.CreateorEdittype;
      if (this.CreateorEdit == true) {
        let result = await api.getListtoCreateTeam();
        this.teams_data_staffs = result.data.result.teams;
        this.teams_table_all_total = this.teams_data_staffs.length;
      } else {
        let res = await api.getListtoCreateTeam();
        this.teams_data_staffs = res.data.result.teams;
        this.teams_table_all_total = this.teams_data_staffs.length;
        let EditTeamCode = {
          team_code: this.$store.getters["BNP_DATA"].databnp
        };
        let result = await api.getListTeamtoEdit(EditTeamCode);
        // console.log(result);
        if (!result.data.result.length) {
          window.location.href = `${process.env.VUE_APP_SUB_PATH}/teambnp/Manageteamlists`;
          //this.$router.push({name:'menuManageteamlists'})
          return;
        }
        this.get_name_team = result.data.result[0].name;
        this.phone_team = result.data.result[0].tel_no;
        this.teams_selected_staffs = result.data.result[0].team_users;
        this.teams_table_selected_staff_total = this.teams_selected_staffs.length;
      }
    },

    selectedAddstaff(item) {
      var chkstaffID = this.teams_selected_staffs.some(
        val => val.id == item.id
      );
      if(!chkstaffID){
          this.teams_selected_staffs.push(item);
      }
      this.teams_table_selected_staff_total = this.teams_selected_staffs.length;
    },

    Deletestaff(item) {
      this.editedIndex = this.teams_selected_staffs.indexOf(item);
      this.teams_selected_staffs.splice(this.editedIndex, 1);
      this.teams_table_selected_staff_total = this.teams_selected_staffs.length;
    },

    async submit() {
      if (this.$refs.form.validate() == true) {
        //สร้างทีม
        if (this.CreateorEdittype == true) {
          let staffs = [];
          this.teams_selected_staffs.forEach((value) => {staffs.push({
              id: `${value.id}`,
              user_code: `${value.user_code}`,
            });
          });
          let CreateNewTeam = {
            name: this.get_name_team,
            tel_no: this.phone_team,
            team_members: staffs,
          };
          let resultCreateNewTeam = await api.addNewTeam(CreateNewTeam);
          if (resultCreateNewTeam.data.response == "OK") {
            this.$swal.fire("สำเร็จ", "สร้างทีมสำเร็จเรียบร้อยแล้ว", "success");
            this.$router.push({ name: "menuManageteamlists" });
          } else {
            this.$swal.fire("เกิดข้อผิดพลาด",`สร้างทีมไม่สำเร็จ ${resultCreateNewTeam.data.response} เนื่องจาก ${resultCreateNewTeam.data.result} `,"error"
            );
          }
        } else {
          //แก้ไขทีม
          let Edit_staffs = [];
          this.teams_selected_staffs.forEach((value) => {
            Edit_staffs.push({
              id: `${value.id}`,
              user_code: `${value.user_code}`,
            });
          });
          let Editstaff = {
            team_code: this.$store.getters["BNP_DATA"].databnp,
            name:this.get_name_team,
            tel_no:this.phone_team,
            team_members: Edit_staffs
          };
          // console.log(Editstaff);
          let resultEditstaff = await api.editTeam(Editstaff);
          if (resultEditstaff.data.response == "OK") {
            this.$swal.fire(
              "สำเร็จ",
              "แก้ไขทีมสำเร็จเรียบร้อยแล้ว",
              "success"
            );
            this.$router.push({ name: "menuManageteamlists" });
          } else {
            this.$swal.fire(
              "เกิดข้อผิดพลาด",
              `แก้ไขทีมไม่สำเร็จ ${resultEditstaff.data.response} เนื่องจาก ${resultEditstaff.data.result} `,
              "error"
            );
          }
        }
      }
    },
  },
};
</script>

<style scoped></style>
