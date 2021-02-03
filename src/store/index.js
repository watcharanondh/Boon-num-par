import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";
import { server } from "@/services/constants";
import router from "@/router";


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogged: false,
    username: "",
    Routepath:"",
    

    currentUser: {},

    type_id:'',
    name:'',
    telephone_number:'',
    mobile_phone_number: '',
    line_id: '',
    address: '',
    district_id: '',

  },  
  getters: {
    isLogin(state) {
      return state.isLogged;
    },
    username(state) {
      return state.username;
    },
    Route_path(state) {
      return state.Routepath;
    },
    Newpersonal_type_id(state) {
      return state.type_id;
    },
    Newpersonal_name(state) {
      return state.name;
    },
    Newpersonal_telephone_number(state) {
      return state.telephone_number;
    },
    Newpersonal_mobile_phone_number(state) {
      return state.mobile_phone_number;
    },
    Newpersonal_line_id(state) {
      return state.line_id;
    },
    Newpersonal_address(state) {
      return state.address;
    },
    Newpersonal_district_id(state) {
      return state.district_id;
    },
    currentUser(state) {
      return state.currentUser;
    },


  },
  mutations: {
    SET_LOGGED_IN(state){
      state.isLogged = true
    },
    SET_LOGGED_OUT(state) {
      state.isLogged = false;
    },
    SET_USERNAME(state, value){
      state.username = value
    },
    SET_ROUTE_PATH(state, route){
      state.Routepath = route
    },

    SET_type_id(state, type_id){
      state.type_id = type_id
    },
    SET_name(state, name){
      state.name = name
    },
    SET_telephone_number(state, telephone_number){
      state.telephone_number = telephone_number
    },
    SET_mobile_phone_number(state, mobile_phone_number){
      state.mobile_phone_number = mobile_phone_number
    },
    SET_line_id(state, line_id){
      state.line_id = line_id
    },
    SET_address(state, address){
      state.address = address
    },
    SET_district_id(state, district_id){
      state.district_id = district_id
    },
    setCurrentUser(state, currentUser) {
      state.currentUser = Object.assign ({}, currentUser);
    }
  },
  actions: {
    inputRoutepath({ commit }, { RT }) {
      commit("SET_ROUTE_PATH", RT);
    },
  async doLogin({ commit, dispatch }, { username, password }) {
      let result = await api.login({ username, password });
      if (result == true) {
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
        router.push("/Homemenu");
        window.location.reload();
      } else {
        alert('Login ไม่สำเร็จ');
        dispatch("doLogout", {});
      }
    },
    doLogout({ commit }) {
      api.logoff();
      commit("SET_LOGGED_OUT");
      commit("SET_USERNAME", "");
    },
    restoreLogin({ commit }) {
      if (api.isLoggedIn() == true) {
        let username = localStorage.getItem(server.USERNAME);
        commit("SET_LOGGED_IN");
        commit("SET_USERNAME", username);
      }
    },
    fromPersonneltype({ commit }, {type_id, name, telephone_number, mobile_phone_number, line_id, address, district_id }) {
      commit("SET_type_id", type_id);
      commit("SET_name", name);
      commit("SET_telephone_number", telephone_number);
      commit("SET_mobile_phone_number", mobile_phone_number);
      commit("SET_line_id", line_id);
      commit("SET_address", address);
      commit("SET_district_id", district_id);
    },
    testsss({ commit }, data) {
      commit('setCurrentUser', data);
    }
  },
  modules: {}
});
