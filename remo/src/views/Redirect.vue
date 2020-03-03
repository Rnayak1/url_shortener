<template>
    <div>
        Welcome to redirect
        <br>
        <h3 v-if="url">{{url}}</h3>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import link from '@/store/module/link'
@Component
export default class Redirect extends Vue{
    url = '';
    created(){
        console.log(this.$route.params.customUrl)
        link.getUrl(this.$route.params.customUrl).then(res=>{
            if(res.status == "success")
                return window.location.href = res.message
            else
                return this.url = res.message
        })
        
    }
    
}
</script>