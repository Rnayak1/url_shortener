<template >
    <div class="container-fluid row">
        <br>
        <UserLink></UserLink>
    </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import user from '@/store/module/user'
import UserLink from '@/components/UserLink.vue'
@Component({
    components : {
        UserLink
        }
})
export default class Profile extends Vue {
    get username(){
        return user.GetUsername;
    } 
}
</script>