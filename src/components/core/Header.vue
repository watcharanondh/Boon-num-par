<template>
<v-card>
  <v-app-bar
    app
    color="white"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-app-bar-nav-icon @click="drawer=!drawer" ></v-app-bar-nav-icon>

    <v-toolbar-title>{{title}} V{{ version }}</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon v-if="false">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <div class="ma-4">
      <v-btn icon>
        <v-badge bordered dot>
          <v-icon>notifications</v-icon>
        </v-badge>
      </v-btn>
    </div>

    <v-divider vertical> </v-divider>

    <div class="ma-6">{{$store.getters["username"]}}</div>

    <v-avatar color="grey lighten-2" size="40">
      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
    </v-avatar>
    
      <v-btn icon @click="onClickLogOff">
        <v-icon>logout</v-icon>
      </v-btn>

  </v-app-bar>

<div v-if="RouterPath!=='/Homemenu'">
    <div v-if="RouterPath==true">
      <v-navigation-drawer 
      v-model="drawer"
      app
  >
    <router-link to="/Homemenu" exact>
       <div class="justify-center d-flex" >
        <v-img
        :src="require('@/assets/AWLogoBoonumpar.svg')"
        max-height="100%"
        max-width="60%"
      />
      </div>
    </router-link>

    <v-list flat >
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="tile"
          v-for="([title, route], index) in menus"
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
      v-for="([title, route], index) in Backmenu"
      :key="index"
      @click="onClickMenu(route)"
    >
      <v-list-item-icon>
        <v-icon color="white"></v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title><span>{{ title }}</span></v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    </v-list>
  </v-navigation-drawer>
      <!-- <MenuSalesData v-if="drawer" /> -->
    </div>
    <div v-else>
      <!-- <MenuManageSystem v-if="drawer" /> -->
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
      v-for="([title, route], i) in Backmenu"
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
    </div>
</div>

<!-- <div v-if="RouterPath!=='/Homemenu'" v-if="drawer" >
</div> -->
<!-- <div v-if="RouterPath!=='/Home'&&'/Customer'&&'/Quotation'" >
      <MenuSalesData  />

</div> 
<div v-else-if="RouterPath!=='/Equipment'&&'/Package'&&'/Promotion'">
      <MenuManageSystem  />

</div>  -->

</v-card>
</template>

<script>

//import MenuSalesData from "@/components/Menu/MenuSalesData"
//import MenuManageSystem from "@/components/Menu/MenuManageSystem"

export default {
  name: "Header",
  components: {
    //MenuSalesData,
    //MenuManageSystem,
  },
   mounted() {

   this.RouterPath = this.$store.getters['Route_path'];
   if(this.RouterPath=='/Home' || this.RouterPath=='/Customer' || this.RouterPath=='/Quotation' ){
        return this.RouterPath =true
    }else if(this.RouterPath=='/Equipment' || this.RouterPath=='/Package' || this.RouterPath=='/Promotion'){
         return this.RouterPath =false
    }

  },
  data(){
    return{
      RouterPath:true,
      Manu:'sale',

      drawer:false,
      selectedMenu: 0,
      menus: [
        ["แสดงผลรวม", "/Home"],
        ["รายชื่อลูกค้า", "/Customer"],
        ["ใบเสนอราคา", "/Quotation"],
      ],
      menusEquipment: [
        ["รายการอุปกรณ์", "/Equipment"],
        ["รายการแพ็คเกจ", "/Package"],
        ["รายการโปรโมชั่น", "/Promotion"],
      ],
      Backmenu: [["ย้อนกลับ", "/Homemenu"]]
    };
  },
  
  computed: {
    version(){
      return process.env.VUE_APP_VERSION
    },
    title(){
      return process.env.VUE_APP_TITLE
    }
  },
   methods: {
      onClickLogOff(){
        this.$store.dispatch('doLogout')
      },
      onClickMenu(link) {
        this.$router.push(link).catch(() => {});
    },
    },
  
  watch: {
       $route(to) {
      this.selectedMenu = this.menus.findIndex((menu) => menu[1] == to.path);
    }
  },
};

</script>

<style></style>
