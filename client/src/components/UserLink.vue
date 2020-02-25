<template>
    <div class="container">
        <center>
            <h3> Your Short URL(s)</h3>
        </center>
        <div v-for="(link,index) in links"
            :key="index"
        >
            {{link}}
        </div>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import link from '@/store/module/link'
import Link from '@/store/model'
@Component
export default class UserLink extends Vue{
    get links(){
        return link.GetLinks
    }
}
</script>