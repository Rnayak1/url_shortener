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
import { GenerateUrl } from "./api";

@Module({
    namespaced: true,
    dynamic: true,
    name: "link",
    store
})
class LinkModule extends VuexModule {
    resp = ""

    @Mutation
    Generate(resp: any) {
        return this.resp = resp;
    }
    @Action({ commit: 'Generate' })
    async generate(Generate: model.Generate) {
        const response = await GenerateUrl(Generate)
        console.log(response);
        return response;
    }
}
export default getModule(LinkModule);
