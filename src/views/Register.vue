<template>
    <div class="container ms">
        <div class="col-8 err" v-if="message">
      <span>{{message}}</span>
    </div>
        <div class="need-validation">
            <center>
                <h2><u> Join Us</u></h2>
            </center>
            <hr>
            <!-- personal Details -->
            <div class="container">
                <div class="form-row">
                    <div class="col-md-4 mb-3">
                        <label for="firstName">First Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="firstName" placeholder="First name" name="firstName"
                           autocomplete="off" required v-model="firstName">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="lastName">Last Name <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="lastName" placeholder="Last name" name="lastName"
                        autocomplete="off" required v-model="lastName">
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="mobile">Contact Number <span class="text-danger">*</span></label>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <div class="input-group-text">@</div>
                            </div>
                          <input type="text" class="form-control" id="mobile" name="mobile" placeholder="Contact Number" minlength="10" maxlength="10"
                        autocomplete="off" required v-model="contact">
                        </div>
                    </div>                    
                </div>
                <div class="form-row">
                    <div class="col-md-4 mb-3">
                        <label for="email">Email<span class="text-danger">*</span></label>
                        <div class="input-group">
                          <div class="input-group-prepend">
          <div class="input-group-text">@</div>
        </div>
                        <input type="email" class="form-control" placeholder="E-mail ID" name="email"
                           autocomplete="off" required v-model="email">
                        </div>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="password">Password <span class="text-danger">*</span></label>
                        <input type="password" class="form-control" placeholder="Password" name="password"
                        autocomplete="off" v-model="password" required>
                    </div>
                    <div class="col-md-4 mb-3">
                        <label for="cnfPassword">Confirm Passwoord<span class="text-danger">*</span></label>
                        <input type="password" class="form-control" name="cnfPassword" placeholder="Confirm Pasword"
                        autocomplete="off" required v-model="cnfPassword">
                    </div>                    
                </div>
            </div>
            <button class="btn btn-primary" @click.prevent="register()">Submit</button>
        </div>
    </div>
</template>

<style scoped>
.ms{
    margin-top: 8%;
    padding: 5%;
    color: cornsilk
  }

.err{
  position: absolute;
padding: 5px;
border: 1px solid green;
justify-content: center;
text-align: center;
background: #2b7b3f;
margin-top: 2%;
margin-left: 40px;
z-index: +1;
}
</style>


<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import user from '@/store/module/user'
@Component
export default class Register extends Vue {
    firstName = ''
    lastName = ''
    email = ''
    password = ''
    cnfPassword = ''
    contact = ''
    message = ""
    register(){
        //console.log(this.firstName + this.email)
        user.register({
            username : this.firstName + this.lastName,
            email : this.email,
            password : this.password,
            contact : this.contact
        }).then(response => { //console.log(response.message);
            return (this.message = response.message)})
        .catch(err =>{ return err});     
    }
}
</script>