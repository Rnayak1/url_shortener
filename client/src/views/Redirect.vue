<template>
    <div>
        Welcome to redirect
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import link from '@/store/module/link'
@Component
export default class Redirect extends Vue{
    url = ""

    created(){
        console.log(this.$route.params.customUrl)
        link.getUrl(this.$route.params.customUrl).then(res=>{
            if(res.status == "success")
                return window.location.href = res.message
            else
                return this.url = res.message
        })
        //console.log(this.url)
    }
    //localhost:
    // beforeMount() {
    //     return (this.url = link.getUrl(this.$route.params.customUrl))
    // }
    // mounted() {
    //     console.log(this.url)  
    // }
    
}
</script>