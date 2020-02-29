<template>
    <div>
    </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
@Component
export default class Logout extends Vue{
    created() {
        localStorage.removeItem('t');
        localStorage.removeItem('u');
        window.location.href = "/"
    }
}
</script>