<template>
<v-card>
  <v-app-bar
    app
    color="white"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-app-bar-nav-icon @click="drawer=!drawer" ></v-app-bar-nav-icon>

    <v-toolbar-title>BOON NUM PAR</v-toolbar-title>

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

    <div class="ma-6">Jones Ferdinand</div>

    <v-avatar color="grey lighten-2" size="40">
      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
    </v-avatar>

    <div class="ma-2" v-if="false">
      <v-btn icon>
        <v-icon>logout</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
  
<div v-if="Manu=='sale'"><MenuSalesData v-if="drawer" /></div>
<div v-if="Manu=='manage'"><MenuManageSystem v-if="drawer" /></div>
</v-card>
</template>

<script>
import MenuSalesData from "@/components/Menu/MenuSalesData"
import MenuManageSystem from "@/components/Menu/MenuManageSystem"

export default {
   components: {
    MenuSalesData,
    MenuManageSystem,
  },
  data(){
    return{
      Manu:'manage',
      drawer:true
    }
  }

};
</script>

<style></style>
