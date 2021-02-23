<template>
<v-hover>
  <v-card class="StCard pointer rounded-lg justify-center"  id="StockCard">
    <v-list-item two-line >
      <v-list-item-content class="text-center vcc">
        <v-list-item-subtitle><div class="vcsubtitle ">{{subtitle}}</div></v-list-item-subtitle>
        <v-list-item-title class="vctitle ">{{title}}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "StockCard",
  props: ["title", "subtitle"],
};
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}

.vcc {
  height: 134px;
}

.StCard:hover{
  box-shadow: 0px 0px 8px 2px #ffc805;
  border: solid 1px #ffc805;
  color: #ffc805;

  .vcsubtitle{
    color: #FFC805;
  }

  .vctitle{
    color: #FFC805;
  }
}
</style>
