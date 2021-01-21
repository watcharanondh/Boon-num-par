<template>
  <v-app>
    <Header />
    <Content />
  </v-app>
</template>

<script>
import Header from "./components/core/Header";
import Content from "./components/core/Content";

export default {
  name: "App",
  components: {
    Header,
    Content,
  },

  data: () => ({
    //
  }),
};
</script>
