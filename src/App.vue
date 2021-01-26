<template>
  <v-app>
    <Header v-if="$store.state.isLogged" />
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
   mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
  },
  data: () => ({
    //
  }),
 
};
</script>
