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
import { RegisterUser, LoginUser } from "./api";

@Module({
  namespaced: true,
  dynamic: true,
  name: "user",
  store
})
class UserModule extends VuexModule {
  resp = "";
  user = "";

  get GetUsername(){
    if(this.user && this.user != ""){
      return this.user
    }
    else{
      if(localStorage.u && localStorage.u != "")
        return localStorage.u
       else
        return null;
      }  
    }  
  

  @Mutation
  Register(resp: any) {
    if(resp == "success")
      this.user = localStorage.u
    return (this.resp = resp);
  }
  @Mutation
  Login(resp: any) {
    this.user = localStorage.u
    return (this.resp = resp);
  }
  @Action({ commit: "Register" })
  async register(user: model.User) {
    const response = await RegisterUser(user);
    console.log(response);
    return response;
  }
  @Action({ commit: "Register" })
  async login(user: model.Login) {
    const response = await LoginUser(user);
    console.log(response);
    return response;
  }
}
export default getModule(UserModule);
