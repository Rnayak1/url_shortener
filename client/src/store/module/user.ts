import {
  VuexModule,
  Module,
  getModule,
  Mutation,
  Action,
  MutationAction
} from "vuex-module-decorators";
import store from "@/store";
import * as model from "@/store/model";
import { RegisterUser, LoginUser, VerifyUser } from "./api";

@Module({
  namespaced: true,
  dynamic: true,
  name: "user",
  store
})
class UserModule extends VuexModule {
  resp = "";
  user = "";
  /* 
      return current logged in user username
      {
          status : "error/success"
          message : "response return by server"
      }
  */
  get GetUsername() {
    if (this.user && this.user != "") {
      return this.user
    }
    else {
      if (localStorage.u && localStorage.u != "")
        return localStorage.u
      else
        return null;
    }
  }
  /* 
     set username from localStorage to user
  */
  @Mutation
  Login(resp: any) {
    this.user = localStorage.u
    return (this.resp = resp);
  }
  /* 
        return registeration status
        {
            status : "error/success"
            message : "response return by server"
        }
    */
  @Action
  async register(user: model.User) {
    const response = await RegisterUser(user);
    console.log(response);
    return response;
  }
  /* 
        return user name and token sent by server for accessing protected routes
        {
            status : "error/success"
            message : "response return by server"
        }
    */
  @Action({ commit: "Login" })
  async login(user: model.Login) {
    const response = await LoginUser(user);
    console.log(response);
    return response;
  }

  @Action
  async verifyUser(token: any) {
    const response = await VerifyUser(token);
    return response;
  }
}
export default getModule(UserModule);
