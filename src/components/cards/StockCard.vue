<template>
  <v-card class="rounded-lg justify-center" ripple id="StockCard">
    <v-list-item two-line >
      <v-list-item-content class="text-center">
        <v-list-item-subtitle><div>{{subtitle}}</div></v-list-item-subtitle>
        <v-list-item-title class="headline mb-1"><h1>{{title}}</h1> </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  name: "StockCard",
  props: ["title", "subtitle"],
};
</script>

<style scoped>
div{
   font-size: 36px;
}

h1 { 
    font-family: 'Mulish';
    font-style: normal;
    font-weight: bold;
    font-size: 72px;
    text-align: center;
    letter-spacing: 1px;
  }
</style>
