<template>
    <div class="container">
        <CreateClick></CreateClick>
    </div>
</template>

<script lang="ts">
import {Vue, Component } from 'vue-property-decorator'
import CreateClick from '@/components/CreateClick.vue'
@Component({
    components :{
        CreateClick
    }
})
export default class Dashboard extends Vue{

}
</script>