<template>
  <v-container class="menu-homemainadmin">
    <div class="menu-homemainadmin-core">
      <div class="menu-title-homemainadmin">
        เลือกเมนู
      </div>
      <div class="menu-box-homemainadmin">
        <div class="menu-box-size-homemainadmin">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pagesale"
            >
              <div class="menu-img">
                <!-- <img src="@/assets/Eventteaminfo.svg" /> -->
              </div>
              <v-card-text class=" text-center black--text" @click="Pagesale">
                <span class="front-menu">SALE</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-size-homemainadmin">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pageteambnp"
            >
              <div class="menu-img">
                <!-- <img src="@/assets/Eventteaminfo.svg" /> -->
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="Pageteambnp"
              >
                <span class="front-menu">TEAM BNP</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-size-homemainadmin">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pageteamhong"
            >
              <div class="menu-img">
                <!-- <img src="@/assets/Eventteaminfo.svg" /> -->
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="Pageteamhong"
              >
                <span class="front-menu">TEAM HONG</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-size-homemainadmin">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pageteamkitchen"
            >
              <div class="menu-img">
                <!-- <img src="@/assets/Eventteaminfo.svg" /> -->
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="Pageteamkitchen"
              >
                <span class="front-menu">TEAM KITCHEN</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>


        <div class="menu-box-size-homemainadmin">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pagestaffmenger"
            >
              <div class="menu-img">
                <!-- <img src="@/assets/Eventteaminfo.svg" /> -->
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="Pagestaffmenger"
              >
                <span class="front-menu">STAFF MENAGER</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-size-homemainadmin">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pageadminmenger"
            >
              <div class="menu-img">
                <!-- <img src="@/assets/Eventteaminfo.svg" /> -->
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="Pageadminmenger"
              >
                <span class="front-menu">ADMIN MENGER</span>
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
  name: "HomeMainAdmin",
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push({ name: "HomeMainAdmin" }).catch(() => {});
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
    Pagesale() {
      this.$router.push({ name: "menusale" });
      window.location.reload();
    },
    Pageteambnp() {
      this.$router.push({ name: "menuTeambnp" });
      window.location.reload();
    },
    Pageteamhong() {
      this.$router.push({ name: "menuTeamhong" });
      window.location.reload();
    },
    Pageteamkitchen() {
      this.$router.push({ name: "menuTeamkitchen" });
      window.location.reload();
    },
    Pagestaffmenger() {
      this.$router.push({ name: "menuStaffmanager" });
      window.location.reload();
    },
    Pageadminmenger() {
      this.$router.push({ name: "menuAdminmenger" });
      window.location.reload();
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


