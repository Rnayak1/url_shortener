<template>
  <nav class="navbar sticky-top navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">
      ClickTrack
    </router-link>
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
      <ul class="navbar-nav mr-auto">
      </ul>
      <div class="navbar-nav my-3 my-lg-1">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">
            DashBoard
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            Login
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            Register
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            Profile
          </router-link>
        </li>
        
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class AppNavBar extends Vue {}
</script>
