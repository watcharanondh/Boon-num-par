<template>
  <v-container>
    <v-col></v-col>
    <v-col></v-col>
    <v-col></v-col>
    <v-col></v-col>
    <v-col></v-col>
    <v-col></v-col>
    <v-col></v-col>
    <v-col></v-col>
    <v-col></v-col>
    <v-col>
      <v-row class="justify-center">
        <v-card style="width:400px;">
          <v-img
          class="white--text align-end"
          src="@/assets/login_header.jpg"
          height="200px"
        >
          <v-card-title primary-title>
            Login
          </v-card-title>
        </v-img>
          <v-card-text>
            <form>
              <!-- Username -->
              <v-text-field
                v-model="account.username"
                :error-messages="usernameErrors"
                label="Username"
                required
                @input="$v.account.username.$touch()"
                @blur="$v.account.username.$touch()"
              ></v-text-field>

              <!-- Password -->
              <v-text-field
                v-model="account.password"
                label="Password"
                :error-messages="passwordErrors"
                @input="$v.account.password.$touch()"
                @blur="$v.account.password.$touch()"
                :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
                @click:append="isShowPassword = !isShowPassword"
                :type="isShowPassword ? 'text' : 'password'"
                 v-on:keyup.enter="submit"
              />
              <v-col md="12">
              <span>{{account}}</span>
              <v-row class="justify-space-between px-3 pt-5">
                <v-btn @click="clear">clear</v-btn>
                <v-btn color="success" @click="submit">Login</v-btn>
              </v-row>
              </v-col>
            </form>
          </v-card-text>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
import api from "@/services/api";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/Homemenu");
    }
  },
  data() {
    return {
      isShowPassword: false,
      account: {
        username: "",
        password: "",
      },
    };
  },

  validations: {
    account:{
      username: { required },
      password: { required },
    },
  },

  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.account.username.$dirty) return errors;
      !this.$v.account.username.required && errors.push("username is required.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.account.password.$dirty) return errors;
      !this.$v.account.password.required && errors.push("Password is required.");
      return errors;
    },
  },

  methods: {
    submit() {
      this.$v.account.$touch();
      if(this.$v.account.$invalid == false){
        this.$store.dispatch({
        type: "doLogin",
        username: this.account.username,
        password: this.account.password,
        
      });
      }

    },
     clear () {
        this.$v.account.$reset()
        this.account.username =''
        this.account.password =''
      },
  },
};
</script>

<style></style>
