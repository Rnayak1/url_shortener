import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action
} from "vuex-module-decorators";
import store from "@/store";
import * as model from "@/store/model";
import { GenerateUrl,GetLinksForUser } from "./api";

@Module({
    namespaced: true,
    dynamic: true,
    name: "link",
    store
})
class LinkModule extends VuexModule {
    resp = ""
    links : model.Link[] = []

    get GetLinks(){
        return this.links;
    }
    @Mutation
    SetLink(links:model.Link[]){
        return this.links = links
    }
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
    @Action({commit : 'SetLink'})
    async setlink(){
        const response = await GetLinksForUser();
        return response;
    }
}
export default getModule(LinkModule);
