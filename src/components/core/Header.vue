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
      <MenuSalesData v-if="drawer" />
    </div>
    <div v-else>
      <MenuManageSystem v-if="drawer" />
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

import MenuSalesData from "@/components/Menu/MenuSalesData"
import MenuManageSystem from "@/components/Menu/MenuManageSystem"

export default {
  name: "Header",
  components: {
    MenuSalesData,
    MenuManageSystem,
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
      drawer:false
    }
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
      }
    }
};

</script>

<style></style>
