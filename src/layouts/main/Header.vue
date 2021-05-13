<template>
    <div class="layout--main-header" :style="{left:menuTotalSpace+'px',height:navbar.height+'px'}">
        <div style="flex:3">
            <CcMainsearch v-model="select" label="Search" />
        </div>
        <div style="flex:2; display:flex">
            <div style="flex:1"></div>
            <div class="header-notification-container">
                <CcNotification :iconWIdth="20" :totalNotification="3" />
            </div>
            <div class="header-propic-container">
                <CcProfileImage :height="45" image="https://avatars.githubusercontent.com/u/4?v=4" status="active" title="James Anderson" />
            </div>            
        </div>


    </div>
</template>
 
<script setup>
    import CcMainsearch from '../../components/cc-mainsearch.vue'
    import CcProfileImage from '../../components/cc-profile-image.vue'
    import CcNotification from '../../components/cc-notification.vue'

    import controller from './controller.js'
    const { menu, navbar, toggleMenu, menuTotalSpace} = controller;
    import { ref  } from 'vue'
    const select = ref(null)
</script>

<style lang="scss">
    .header-notification-container{
        display: flex;
        align-items: center;
        padding: 0px 30px;
    }
    .header-propic-container{
        display: flex;
        align-items: center;
    }
</style>