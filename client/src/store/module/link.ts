import {
    VuexModule,
    Module,
    getModule,
    Mutation,
    Action
} from "vuex-module-decorators";
import store from "@/store";
import * as model from "@/store/model";
import { GenerateUrl,GetLinksForUser, GetUrl } from "./api";

@Module({
    namespaced: true,
    dynamic: true,
    name: "link",
    store
})
class LinkModule extends VuexModule {
    resp = ""
    links = [];
    @Mutation
    SetLinks(resp:any){
        if(resp.status == "success")    
            return this.links = resp.message
        else
            return this.links =  [];
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
    @Action
    async getUrl(url:string){
        const response = await GetUrl(url);
        console.log(response)
        return response;
    }
    @Action({commit:'SetLinks'})
    async getLinks(){
        const response = await GetLinksForUser();
        return response;
    }
}
export default getModule(LinkModule);
