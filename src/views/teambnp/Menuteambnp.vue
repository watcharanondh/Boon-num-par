<template>
  <v-container class="menu-main-container">
    <div class="menu-main-core">
      <div class="menu-main-title">
        เลือกเมนู
      </div>
      <div class="menu-main-box">
        <div class="menu-main-box-size">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="PageEventteaminformation"
            >
              <v-card-text
                class=" text-center black--text"
                @click="PageEventteaminformation"
              >
                <span class="front-menu">ข้อมูลทีมจัดงาน</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-main-box-size">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
               @click="Pageviewareaplacearrangement"
            >
              <v-card-text
                class=" text-center black--text"
                @click="Pageviewareaplacearrangement"
              >
                <span class="front-menu">ดูพื้นที่ | จัดสถานที่</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-main-box-size">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pageworkprogress"
            >
              <v-card-text
                class=" text-center black--text"
                @click="Pageworkprogress"
              >
                <span class="front-menu">ความคืบหน้างาน</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-main-box-size">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pagecustomizethesystem"
            >
              <v-card-text
                class=" text-center black--text"
                @click="Pagecustomizethesystem"
              >
                <span class="front-menu">ปรับแต่งระบบ</span>
              </v-card-text>
            </v-card>
          </v-hover>
        </div>

        <div class="menu-main-box-size">
          <v-hover v-slot="{ hover }">
            <v-card
              :elevation="hover ? 16 : 2"
              :class="{ 'on-hover': hover }"
              class="mx-auto"
              height="150"
              max-width="215"
              @click="Pageback"
            >
              <v-card-text
                class=" text-center black--text"
                @click="Pageback"
              >
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
  name: "Menuteambnp",
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push({name:"menuteambnp"}).catch(() => {});
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
    PageEventteaminformation() {
      this.$router.push({name:"menueventteaminformation"});
      window.location.reload();
    },
    Pageviewareaplacearrangement() {
      this.$router.push({name:"menuviewareaplacearrangement"});
      window.location.reload();
    },
    Pageworkprogress() {
      this.$router.push({name:"menuworkprogress"});
      window.location.reload();
    },
    Pagecustomizethesystem() {
      this.$router.push({name:"menucustomizethesystem"});
      window.location.reload();
    },
    Pageback() {
      this.$router.push({name:"menuteambnp"});
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
