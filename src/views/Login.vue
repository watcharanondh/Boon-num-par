<template>
  <v-container class="login-container">
    <div class="login-box">
      <v-row class="justify-center">
        <v-card style="width:400px;">
          <v-card-text>
            <form>
              <!-- Username -->
            <div lg="12" md="12" sm="12" cols="12">
              <div class="sizehead">Username</div>
              <v-row class="no-gutters">
              <v-text-field
                v-model="account.username"
                :error-messages="usernameErrors"
                dense
                solo
                outlined
                required
                @input="$v.account.username.$touch()"
                @blur="$v.account.username.$touch()"
              ></v-text-field>
              </v-row>
            </div>

              <!-- Password -->
              <div lg="12" md="12" sm="12" cols="12">
                <div class="sizehead">Username</div>
                  <v-row class="no-gutters">
                  <v-text-field
                    v-model="account.password"
                    dense
                    solo
                    outlined
                    clearable
                    :error-messages="passwordErrors"
                    @input="$v.account.password.$touch()"
                    @blur="$v.account.password.$touch()"
                    :append-icon="isShowPassword ? 'visibility' : 'visibility_off'"
                    @click:append="isShowPassword = !isShowPassword"
                    :type="isShowPassword ? 'text' : 'password'"
                    v-on:keyup.enter="submit"
                  />
              </v-row>
            </div>
              <!-- <span>{{account}}</span> -->
              <div class="button-login">
                <v-btn class="bttn" color="#29CC97" dark large rounded @click="submit">Login</v-btn>
              </div>

            </form>
          </v-card-text>
        </v-card>
      </v-row>
    </div>
  </v-container>
</template>

<script>
//import api from "@/services/api";
import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  mounted() {
    // if (api.isLoggedIn()) {
    //   this.$router.push("/Homemenu");
    // }
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
  },
};
</script>

<style lang="scss" scoped>
.button-login{
  width: 100%;
  display: flex;
  justify-content: center;
    .bttn{
        width: 220px;
        height: 50px;
    }
}
</style>
