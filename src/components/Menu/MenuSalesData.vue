<template>
  <v-navigation-drawer app>
    <router-link to="/" exact>
      <!-- (Logo) -->
      <v-img
        src="https://cdn.logo.com/hotlink-ok/logo-social.png"
        alt=""
        width="100%"
      />
    </router-link>

    <v-list>
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="tile"
          v-for="([title, route], i) in menus"
          :key="i"
          @click="onClickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon color="white"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title
              >{{ title }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>

    <v-list-item
      v-for="([title, route], i) in Backmenu"
      :key="i"
      @click="onClickMenu(route)"
    >
      <v-list-item-icon>
        <v-icon color="white"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title><h4>{{ title }}</h4></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>

export default {
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
  },
  // mounted() {
  //   this.selectedMenu = this.menus.findIndex(
  //     menu => menu[2] == this.$route.path
  //   );
  // },
  data() {
    return {
      selectedMenu: 0,
      menus: [
        ["แสดงผลรวม", "/stock"],
        ["รายชื่อลูกค้า", "/report"],
        ["ใบเสนอราคา", "/about"],
      ],
      Backmenu: [["ย้อนกลับ", "/about"]],
    };
  },
  watch: {
    $route(to, from) {
      this.selectedMenu = this.menus.findIndex((menu) => menu[1] == to.path);
    },
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css? family=Oxygen:300,400,700&display=swap');
@import url('https://fonts.googleapis.com/css? family=Comfortaa&display=swap');
/* .v-list-item-group .v-list-item--active{
  color: #fff !important;
  font-weight: bold;
} */

/* .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  opacity: 0.7;
} */

.tile{
    font-family: Mulish;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
}

/* .tile:hover {
  background:  white;
} */

/* .tile:active {
  background: #05ab71;
} */
</style>
