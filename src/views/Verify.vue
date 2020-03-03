<template>
  <div>
    <div v-if="this.$route.query.token && this.$route.query.token != '' && verify">
      <div class="message">
        <div class="spinner-border text-success" role="status" style="margin 5px"></div>
        <h4 style="margin : 5px 7px; color:cornsilk">Verifying User</h4>
      </div>
    </div>
    <div v-if="errorMessage" class="text-error error">{{errorMessage}}</div>
  </div>
</template>
<style scoped>
.message {
  margin-top: 10%;
  width: 80%;
  justify-content: center;
  display: flex;
  margin-left: 10%;
}
.error {
  margin: 5% auto;
  position: relative;
  color: #fffeef;
  background: #ca2828;
  width: 50%;
  padding: 5px 3px;
  text-align: center;
}
</style>


<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import user from "@/store/module/user";
@Component
export default class Verify extends Vue {
  errorMessage = "";
  verify = true;
  created() {
    //console.log(typeof this.$route.query.token);
    user.verifyUser(this.$route.query.token).then(response => {
      if (response.status == "success") {
        window.location.href = "/login";
      } else {
        this.verify = false;
        return (this.errorMessage = response.message);
      }
    });
  }
}
</script>