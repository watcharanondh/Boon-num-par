<template>
  <v-navigation-drawer 
      v-model="drawer" 
      app>
    <router-link to="/Homemenu" exact>
      <!-- (Logo) -->
      <div class="justify-center d-flex">
        <v-img
          :src="require('@/assets/AWLogoBoonumpar.svg')"
          alt=""
          max-height="100%"
          max-width="60%"
        />
      </div>
    </router-link>

    <v-list>
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="tile"
          v-for="([title, route], i) in menusEquipment"
          :key="i"
          @click="onClickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon color="white"></v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-divider></v-divider>

    <v-list-item
      v-for="([title, route], i) in BackmenuEquipment"
      :key="i"
      @click="onClickMenu(route)"
    >
      <v-list-item-icon>
        <v-icon color="white"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title
          ><span>{{ title }}</span></v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
export default {
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch(() => {});
    },
  },
  // mounted() {
  //   this.selectedMenu = this.menus.findIndex(
  //     menu => menu[1] == this.$route.path
  //   );
  // },
  data() {
    return {
      selectedMenu: 0,
      menusEquipment: [
        ["รายการอุปกรณ์", "/Equipment"],
        ["รายการแพ็คเกจ", "/Package"],
        ["รายการโปรโมชั่น", "/Promotion"],
      ],
      BackmenuEquipment: [["ย้อนกลับ", "/Homemenu"]],
    };
  },
  watch: {
    $route(to) {
      this.selectedMenu = this.menus.findIndex((menu) => menu[1] == to.path);
    },
  },
};
</script>

<style>
/* .v-list-item-group .v-list-item--active{
  color: #fff !important;
  font-weight: bold;
} */

/* .theme--dark.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled){
  opacity: 0.7;
} */

.tile {
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
