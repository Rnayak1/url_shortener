<template>
  <div id="app" class="container">
    <AppNavbar />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import AppNavbar from '@/components/AppNavbar.vue'
@Component({
  components : {
    AppNavbar
  }
})

export default class App extends Vue{

}
</script>