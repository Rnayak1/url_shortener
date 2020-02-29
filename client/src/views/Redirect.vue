<template>
  <div>
    <h3 v-if="url" class="error">{{url}}</h3>
  </div>
</template>
<style scoped>
.error {
  width: 60%;
  margin-top: 10%;
  margin-left: 20%;
  background: #ca2828;
  padding: 5px;
  justify-content: center;
  text-align: center;
  color: cornsilk;
}
</style>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import link from "@/store/module/link";
@Component
export default class Redirect extends Vue {
  url = "";
  created() {
    console.log(this.$route.params.customUrl);
    link.getUrl(this.$route.params.customUrl).then(res => {
      if (res.status == "success") return (window.location.href = res.message);
      else return (this.url = res.message);
    });
  }
}
</script>