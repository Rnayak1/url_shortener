<template>
  <div class="container h-100">
    <div class="row h-100 justify-content-center align-items-center">
      <div
        class="container-fluid card bg-light mb-3 col-sm-5 col-xs-12"
        style="padding: 0;"
      >
        <div class="card-header">Login</div>
        <div class="card-body">
          <form action="/" method="POST">
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                required
                autofocus
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
          <div class="py-2">
            <a href="/Register">Register with Us</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import user from '@/store/module/user'
@Component
export default class extends Vue {
 
}
</script>
