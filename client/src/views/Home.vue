<template>
  <div class="container ms">
    <center><h2>Welcome to Click Tracker</h2>
    <router-link to="/login" class="btn btn-primary pr">
      Login
    </router-link>
    <router-link to="/register" class="btn btn-primary pr">
      Register
    </router-link>
    </center>
  </div>
</template>

<style>
  .ms{
    margin-top: 10%;
    padding: 5%;
    color: cornsilk
  }

  .pr{
    width: 150px;
    margin: 3%;
    border: 2px solid grey;
    padding: 5px;
  }

  .pr:hover{
    background: #187367;
    border: 2px solid white;
    font-size: 1.2em;
    justify-content: center
  }
</style>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import user from "@/store/module/user";
import createClick from "@/components/CreateClick.vue";
@Component({
  components: {
    createClick
  }
})
export default class extends Vue {
  
}
</script>
