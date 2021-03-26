<template>
  <v-container class="menu-teambnp">
    <div class="menu-core-teambnp">
      <div class="menu-title-teambnp">
        เลือกเมนู
      </div>
      <div class="menu-box-teambnp">
        <div class="menu-box-size-teambnp">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="PageShipping"
            >
              <div class="menu-img">
                <img src="@/assets/Eventteaminfo.svg" />
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="PageShipping"
              >
                <span class="front-menu">ข้อมูลทีมจัดงาน</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-size-teambnp">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="PageLineupfood"
            >
              <div class="menu-img">
                <img src="@/assets/Exploreandmanagementarea.svg" />
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="PageLineupfood"
              >
                <span class="front-menu">จัดไลน์อาหาร</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-size-teambnp">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="PageWorkprogress"
            >
              <div class="menu-img">
                <!-- <img
                src="@/assets/workprogress.svg"
              /> -->
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="PageWorkprogress"
              >
                <span class="front-menu">ความคืบหน้างาน</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-size-teambnp">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="PageCustomizethesystem"
            >
              <div class="menu-img">
                <img src="@/assets/Customizethesystem.svg" />
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="PageCustomizethesystem"
              >
                <span class="front-menu">ปรับแต่งระบบ</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-size-teambnp">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="PageBack"
            >
              <div class="menu-img">
                <!-- <img
                src="@/assets/back.svg"
              /> -->
              </div>
              <v-card-text class=" text-center black--text" @click="PageBack">
                <span class="front-menu">ย้อนกลับ</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Menuteamhong",
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push({ name: "menuTeamhong" }).catch(() => {});
    }

    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },
  data() {
    return {};
  },

  methods: {
    PageShipping() {
      this.$router.push({ name: "menuShipping" });
      window.location.reload();
    },
    PageLineupfood() {
      this.$router.push({ name: "menuLineupfood" });
    },
    PageWorkprogress() {
      this.$router.push({ name: "menuWorkprogressteamhong" });
    },
    PageCustomizethesystem() {
      this.$router.push({ name: "menuManageteamhong" });
      window.location.reload();
    },
    PageBack() {
      this.$router.push({ name: "HomeMainAdmin" });

    },
  },
};
</script>
<style lang="sass" scoped>
.v-card.on-hover.theme--dark
  background-color: rgba(#FFF, 0.8)
  >.v-card__text
    color: #000
</style>

