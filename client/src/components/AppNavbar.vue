<template>
      <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <!-- Add "active" class when you're on that page" -->
            <router-link to="/" class="nav-link">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              Login
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              Sign Up
            </router-link>
          </li>
        </ul>
      </div>
    </nav>      
</template>

<script lang="ts">
import {Vue,Component, Prop}from 'vue-property-decorator'

@Component
export default class AppNavBar extends Vue{
UserName = true
}
</script>