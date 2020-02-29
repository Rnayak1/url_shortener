<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">URL-SHORTNER</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto"></ul>
      <div class="navbar-nav my-3 my-lg-1">
        <li class="nav-item">
          <router-link to="/" class="nav-link" v-if="!username">Home</router-link>
        </li>
        <li class="nav-item" v-if="username">
          <router-link to="/dashboard" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="username">
          <router-link to="/dashboard" class="nav-link">DashBoard</router-link>
        </li>
        <li class="nav-item" v-if="username">
          <router-link to="/profile" class="nav-link">Welcome {{username}}</router-link>
        </li>
        <li class="nav-item" v-if="username">
          <router-link to="/logout" class="nav-link">LogOut</router-link>
        </li>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import user from "@/store/module/user";
@Component
export default class AppNavBar extends Vue {
  // To get current user
  get username() {
    return user.GetUsername;
  }
}
</script>
