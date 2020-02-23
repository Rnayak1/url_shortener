<template>
  <div class="container">
    <createClick></createClick>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import user from "@/store/module/user";
import createClick from "@/components/CreateClick.vue";
@Component({
  components: {
    createClick
  }
})
export default class extends Vue {}
</script>
