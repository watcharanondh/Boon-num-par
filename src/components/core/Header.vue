<template>
  <v-card>
    <v-app-bar
      app
      color="white"
      elevate-on-scroll
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }} Phase {{ version }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="false">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <div class="ma-4">
        <v-btn v-if="false" icon>
          <v-badge bordered dot>
            <v-icon>notifications</v-icon>
          </v-badge>
        </v-btn>
      </div>

      <v-divider vertical> </v-divider>

      <div class="ma-6">{{ $store.getters["username"] }}</div>

      <v-avatar color="grey lighten-2" size="40">
        <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
      </v-avatar>

      <v-btn icon @click="onClickLogOff">
        <v-icon>logout</v-icon>
      </v-btn>
    </v-app-bar>

    <div v-if="RouterPath == 1">
      <!-- MenuSalesData -->
      <v-navigation-drawer v-model="drawer" app>
        <div @click="onClicksale" class="justify-center d-flex pointer">
          <v-img
            :src="require('@/assets/AW-Logo-Boonumpar.webp')"
            max-height="100%"
            max-width="60%"
          />
        </div>

        <v-list flat>
          <v-list-item-group v-model="selectedMenu" mandatory color="primary">
            <v-list-item
              class="tile"
              v-for="([title, route], index) in menusSale"
              :key="index"
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
        <v-list flat>
          <v-list-item
            v-for="([title, route], index) in BackMenusale"
            :key="index"
            @click="onClickBacksale(route)"
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
        </v-list>
      </v-navigation-drawer>
    </div>
    <div v-else-if="RouterPath == 2">
      <!-- MenuManageSystem -->
      <v-navigation-drawer v-model="drawer" app>
        <div @click="onClicksale" class="justify-center d-flex pointer">
          <v-img
            :src="require('@/assets/AW-Logo-Boonumpar.webp')"
            max-height="100%"
            max-width="60%"
          />
        </div>

        <v-list>
          <v-list-item-group v-model="selectedMenu" mandatory color="primary">
            <v-list-item
              class="tile"
              v-for="([title, route], i) in menusSaleEquipment"
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
          v-for="([title, route], i) in BackMenusale"
          :key="i"
          @click="onClickBacksale(route)"
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
    </div>
    <div v-else-if="RouterPath == 3">
      <!-- MenusteambnpCustomizethesyste -->
      <v-navigation-drawer v-model="drawer" app>
        <div @click="onClickteambnp" class="justify-center d-flex pointer">
          <v-img
            :src="require('@/assets/AW-Logo-Boonumpar.webp')"
            max-height="100%"
            max-width="60%"
          />
        </div>

        <v-list>
          <v-list-item-group v-model="selectedMenu" mandatory color="primary">
            <v-list-item
              class="tile"
              v-for="([title, route], i) in menusEventteaminformation"
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
          v-for="([title, route], i) in BackMenuteambnp"
          :key="i"
          @click="onClickBackteambnp(route)"
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
    </div>
    <div v-else-if="RouterPath == 4">
      <!-- MenusteambnpCustomizethesyste -->
      <v-navigation-drawer v-model="drawer" app>
        <div @click="onClickteambnp" class="justify-center d-flex pointer">
          <v-img
            :src="require('@/assets/AW-Logo-Boonumpar.webp')"
            max-height="100%"
            max-width="60%"
          />
        </div>

        <v-list>
          <v-list-item-group v-model="selectedMenu" mandatory color="primary">
            <v-list-item
              class="tile"
              v-for="([title, route], i) in menusteambnpCustomizethesyste"
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
          v-for="([title, route], i) in BackMenuteambnp"
          :key="i"
          @click="onClickBackteambnp(route)"
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
    </div>
    <div v-else-if="RouterPath == 5">
      <!-- MenuAdminmanager -->
      <v-navigation-drawer v-model="drawer" app>
        <div @click="onClickBackMenuaMainadmin" class="justify-center d-flex pointer">
          <v-img
            :src="require('@/assets/AW-Logo-Boonumpar.webp')"
            max-height="100%"
            max-width="60%"
          />
        </div>

        <v-list>
          <v-list-item-group v-model="selectedMenu" mandatory color="primary">
            <v-list-item
              class="tile"
              v-for="([title, route], i) in menusAdminmanager"
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
          v-for="([title, route], i) in BackMenuaMainadmin"
          :key="i"
          @click="onClickBackMenuaMainadmin(route)"
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
    </div>
    <div v-else-if="RouterPath == 6">
      <!-- MenuStaffmanager -->
      <v-navigation-drawer v-model="drawer" app>
        <div @click="onClickBackMenuaMainadmin" class="justify-center d-flex pointer">
          <v-img
            :src="require('@/assets/AW-Logo-Boonumpar.webp')"
            max-height="100%"
            max-width="60%"
          />
        </div>

        <v-list>
          <v-list-item-group v-model="selectedMenu" mandatory color="primary">
            <v-list-item
              class="tile"
              v-for="([title, route], i) in menusStaffmanager"
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
          v-for="([title, route], i) in BackMenuaMainadmin"
          :key="i"
          @click="onClickBackMenuaMainadmin(route)"
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
    </div>
     <div v-else-if="RouterPath == 7">
      <!-- MenuManageSystem -->
      <v-navigation-drawer v-model="drawer" app>
        <div @click="onClickteamhong" class="justify-center d-flex pointer">
          <v-img
            :src="require('@/assets/AW-Logo-Boonumpar.webp')"
            max-height="100%"
            max-width="60%"
          />
        </div>

        <v-list>
          <v-list-item-group v-model="selectedMenu" mandatory color="primary">
            <v-list-item
              class="tile"
              v-for="([title, route], i) in menusShipping"
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
          v-for="([title, route], i) in BackMenuteamhong"
          :key="i"
          @click="onClickteamhong(route)"
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
    </div>
    <div v-else-if="RouterPath == 8">
      <!-- MenusteambnpCustomizethesyste -->
      <v-navigation-drawer v-model="drawer" app>
        <div @click="onClickteamhong" class="justify-center d-flex pointer">
          <v-img
            :src="require('@/assets/AW-Logo-Boonumpar.webp')"
            max-height="100%"
            max-width="60%"
          />
        </div>

        <v-list>
          <v-list-item-group v-model="selectedMenu" mandatory color="primary">
            <v-list-item
              class="tile"
              v-for="([title, route], i) in menusteamhongCustomizethesyste"
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
          v-for="([title, route], i) in BackMenuteamhong"
          :key="i"
          @click="onClickBackteamhong(route)"
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
    </div>


    <div v-else></div>
  </v-card>
</template>

<script>
export default {
  name: "Header",

  created() {
    if (window.innerWidth <= 768) {
      this.drawer = false;
    }
  },

  mounted() {
    this.RouterPath = this.$store.getters["Route_path"];
    if (
      this.RouterPath == "/sale/Home" ||
      this.RouterPath == "/sale/Customer" ||
      this.RouterPath == "/sale/CreatePersoneltype" ||
      this.RouterPath == "/sale/EditPersoneltype" ||
      this.RouterPath == "/sale/Quotation" ||
      this.RouterPath == "/sale/CreateQuotation" ||
      this.RouterPath == "/sale/EditQuotation" ||
      this.RouterPath == "/sale/QuotationPrint"
    ) {
      return (this.RouterPath = 1);
    } else if (
      this.RouterPath == "/sale/Equipment" ||
      this.RouterPath == "/sale/CreateEquipment" ||
      this.RouterPath == "/sale/EditEquipment" ||
      this.RouterPath == "/sale/Package" ||
      this.RouterPath == "/sale/CreatePackage" ||
      this.RouterPath == "/sale/EditPackage" ||
      this.RouterPath == "/sale/Promotion" ||
      this.RouterPath == "/sale/CreatePromotion" ||
      this.RouterPath == "/sale/EditPromotion"
    ) {
      return (this.RouterPath = 2);
    } else if (
      this.RouterPath == "/teambnp/Eventteaminformation"
      // this.RouterPath == "/teambnp/Createmanageteam"||
    ) {
      return (this.RouterPath = 3);
    } else if (
      this.RouterPath == "/teambnp/Manageteamlists"||
      this.RouterPath == "/teambnp/Createmanageteam"||
      this.RouterPath == "/teambnp/Customizecheck" 
    ) {
      return (this.RouterPath = 4);
    } else if (
      this.RouterPath == "/adminmanager/Adminmanager"||
      this.RouterPath == "/adminmanager/Adminmanager"
    ) {
      return (this.RouterPath = 5);
    } else if (
      this.RouterPath == "/staffmanager/Staffmanager"||
      this.RouterPath == "/staffmanager/Staffpositionmanager"
    ) {
      return (this.RouterPath = 6);
    }else if(
      this.RouterPath == "/teamhong/Shipping"
    ){
      return (this.RouterPath = 7);
    }else if(
      this.RouterPath == "/teamhong/Manageteamhong"||
      this.RouterPath == "/teamhong/Customizecheckhong"
    ){
      return (this.RouterPath = 8);
    } else {
      return (this.RouterPath = -1);
    }
  },
  data() {
    return {
      RouterPath: true,

      drawer: true,
      selectedMenu: 0,
      menusSale: [
        ["แสดงผลรวม", "/sale/Home"],
        ["รายชื่อลูกค้า", "/sale/Customer"],
        ["ใบเสนอราคา", "/sale/Quotation"],
      ],
      menusSaleEquipment: [
        ["รายการอุปกรณ์", "/sale/Equipment"],
        ["รายการแพ็คเกจ", "/sale/Package"],
        ["รายการโปรโมชั่น", "/sale/Promotion"],
      ],
      menusEventteaminformation: [
        ["รายการจัดทีม", "/teambnp/Eventteaminformation"],
      ],
      menusShipping: [
        ["รายการจัดทีม", "/teamhong/Shipping"],
      ],
      menusteamhongCustomizethesyste: [
        ["ปรับแต่งทีม", "/teamhong/Manageteamhong"],
        ["ปรับแต่งการตรวจสอบ", "/teamhong/Customizecheck"],
      ],
      menusteambnpCustomizethesyste: [
        ["ปรับแต่งทีม", "/teambnp/Manageteamlists"],
        ["ปรับแต่งการตรวจสอบ", "/teambnp/Customizecheck"],
      ],
      menusAdminmanager: [
        ["รายชื่อแอดมิน", "/adminmanager/Adminmanager"],
        ["ตารางแอดมิน", "/adminmanager/Adminmanager"],
      ],
      menusStaffmanager: [
        ["รายการสมาชิก", "/staffmanager/Staffmanager"],
        ["รายการตำแหน่ง", "/staffmanager/Staffpositionmanager"],
      ],
      BackMenusale: [["ย้อนกลับ", "/sale/Menusale"]],
      BackMenuteambnp: [["กลับสู่เมนูหลัก", "/team/Menuteambnp"]],
      BackMenuteamhong: [["กลับสู่เมนูหลัก", "/team/Menuteamhong"]],
      BackMenuaMainadmin: [["กลับสู่เมนูหลัก", "/team/Menuteambnp"]],
    };
  },

  computed: {
    version() {
      return process.env.VUE_APP_VERSION;
    },
    title() {
      return process.env.VUE_APP_TITLE;
    },
  },
  methods: {
    
    onClickLogOff() {
      this.$store.dispatch("doLogout");
    },
    onClickMenu(link) {
      this.$router.push(link).catch(() => {});
    },

    onClicksale() {
      this.$router.push("/sale/Menusale");
      window.location.reload();
    },

    onClickBacksale() {
      this.$router.push("/sale/Menusale");
      window.location.reload();
    },

    onClickteambnp() {
      this.$router.push("/teambnp/Menuteambnp");
      window.location.reload();
    },

    onClickteamhong() {
      this.$router.push("/teamhong/Menuteamhong");
      window.location.reload();
    },

    onClickBackMenuaMainadmin(){
      this.$router.push("/HomeMainAdmin");
      window.location.reload();
    },
    
    onClickBackteambnp() {
      this.$router.push("/teambnp/Menuteambnp");
      window.location.reload();
    },

    onClickBackteamhong() {
      this.$router.push("/teamhong/Menuteamhong");
      window.location.reload();
    },

  },

  // watch: {
  //   $route(to) {
  //     console.log(to);
  //      this.selectedMenu = this.menus.findIndex((menu) => menu[1] == to.path);
  //      console.log(this.selectedMenu);
  //     // this.selectedMenu = 2
  //   },
  // },
};
</script>

<style scoped>
.pointer {
  cursor: pointer;
}
</style>
