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
  @Mutation
  Register(resp: any) {
    this.resp = resp;
  }
  @Mutation
  Login(resp: any) {
    this.resp = resp;
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
