<template>
  <div class="ms">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign In To Your Account</h1>
          <p class="text-xs-center">
            <router-link to="/register">Need an Account</router-link>
          </p>

          <ul class="error-messages" v-if="loginError">
            <li style="list-type : none;">{{ loginError }}</li>
          </ul>

          <form>
            <div class="form-group input-group">
              <div class="input-group-prepend">
                <div class="input-group-text">@</div>
              </div>
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="email"
              />
            </div>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right" @click="login()">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ms{
    margin-top: 8%;
    padding: 5%;
    color: cornsilk
  }

</style>
<script>
import { Vue, Component } from "vue-property-decorator";
import user from "@/store/module/user";
@Component
export default class Login extends Vue {
  email = "";
  password = "";
  loginError = "";
  async login() {
    console.log(this.email + "  " + this.password);
    if (this.email == "" || this.password == "") {
      this.loginError = "Please fill this fields";
      return
    } else {
      user.login({
        email: this.email,
        password: this.password
      }).then(res => {
        if(res == "success")
          this.$router.push('/dashboard')
        else
          this.loginError = "Invalid Credentials"
      })
    }

    // })
    // .then(()=>this.$router.push('/'))
    // .catch((e)=>{
    //   this.loginError = "Incorrect Credentials"
    // })
  }
}
</script>
