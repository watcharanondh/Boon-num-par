<template>
  <v-container class="menu-teambnp-eapa">
    <div class="menu-core-teambnp">
      <div class="menu-title-teambnp">
        เลือกเมนู
      </div>
      <div class="menu-box-teambnp-eapa">
        <div class="menu-box-sizeteambnp-eapa">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="PageExplorearea"
            >
              <div class="menu-img">
                <img src="@/assets/Exploreandmanagementarea.svg" />
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="PageExplorearea"
              >
                <span class="front-menu">ดูพื้นที่</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-sizeteambnp-eapa">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="PagePlacearrangement"
            >
              <div class="menu-img">
                <!-- <img src="@/assets/Placearrangement.svg" /> -->
              </div>
              <v-card-text
                class=" text-center black--text"
                @click="PagePlacearrangement"
              >
                <span class="front-menu">จัดสถานที่</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-box-sizeteambnp-eapa">
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
//import api from "@/services/api";

export default {
  name: "Menuteambnp",
  mounted() {
    // if (api.isLoggedIn()) {
    //   this.$router.push({ name: "menuteambnp_eapa" }).catch(() => {});
    // }

    this.$store.dispatch({
      type: "inputRoutepath",
      RT: this.$route.path,
    });
  },
  data() {
    return {};
  },

  methods: {
    PageExplorethearea() {
      this.$router.push({ name: "menuexplorearea" });
      window.location.reload();
    },
    PagePlacearrangement() {
      this.$router.push({ name: "menuplacearrangement" });
      window.location.reload();
    },
    PageBack() {
      this.$router.push({ name: "menuteambnp" });
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

<style lang="scss" scoped>
.menu-main-core-teambnp-eapa {
  width: 685px;
}

.menu-main-box-teambnp-eapa {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  grid-gap: 26px 17px;
  margin-top: 48px !important;
}

.menu-img {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 60%;
  img {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: -30px;
  }
}
</style>
