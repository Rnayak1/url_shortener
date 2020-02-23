<template>
    <div class="container">
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
                        <input type="text" class="form-control" id="mobile" name="mobile" placeholder="Contact Number" minlength="10" maxlength="10"
                        autocomplete="off" required v-model="contact">
                    </div>                    
                </div>
                <div class="form-row">
                    <div class="col-md-4 mb-3">
                        <label for="email">Email<span class="text-danger">*</span></label>
                        <input type="email" class="form-control" placeholder="E-mail ID" name="email"
                           autocomplete="off" required v-model="email">
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
            <button class="btn btn-primary" @click="register()">Submit</button>
        </div>
    </div>
</template>

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

    async register(){
        console.log(this.firstName + this.email)
        const response = await user.register({
            username : this.firstName + this.lastName,
            email : this.email,
            password : this.password,
            contact : this.contact
        })
        console.log(`res => ${response}`)
    }
}
</script>