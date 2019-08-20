<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
@Component
export default class AppComponent extends Vue {
  public items = [
    { icon: "home", title: "Home", to: "/" },
    { icon: "bubble_chart", title: "View 1", to: "/view1" },
    { icon: "contacts", title: "View 1", to: "/view2" }
  ];
  public miniVariant = true;
  public right = true;
  public name = "";
  mounted() {
    this.$cookies.get("test");
  }
}
</script>

<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
