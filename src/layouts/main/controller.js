import { reactive, computed } from 'vue'
const menu = reactive({
    minifyMenuWidth:80,
    menuWidth:250,
    status:true,
    statusSelected:true,
    menuDetail:true,
    pinned:true,
    mobileBreakPoint:1000,
    windowWidth:0,
})
var navbar = reactive({
    height:90,
});
const memory = {
    status:true,
}
 
const menuTotalSpace = computed(() => {
    if(menu.windowWidth < menu.mobileBreakPoint && menu.status == true){
        return 0;
    }else{
        if(menu.status == true && menu.pinned == true){
            return menu.menuWidth + menu.minifyMenuWidth;
        }else if(menu.status == true && menu.pinned == false){
            return menu.minifyMenuWidth;
        }else{
            return 0;
        }
    }
})
const floatingShadow = computed(() => 
{
    if(menu.windowWidth < menu.mobileBreakPoint && menu.status == true){
        return true;
    }else{
        if(menu.menuDetail == true && menu.pinned == false  && menu.status == true){
            return true;
        }
    }
    return false;
})

const pindetail = () => {
    if(menu.pinned == true){
       menu.pinned = false;
       menu.menuDetail = false;
    }else{
        menu.pinned = true;
    }
}
const toggleMenu = () => {
    menu.status == true ?  menu.status = false : menu.status = true
}

const resizeController = () => {
    menu.windowWidth = window.innerWidth;
    if(window.innerWidth < menu.mobileBreakPoint){
        menu.status = false;
    }else{
        if(memory.status == true){
            menu.status = true;
        }
    }
}

const innitialLoader = () => {
    menu.windowWidth = window.innerWidth;
    memory.status = menu.status;

    if(window.innerWidth < menu.mobileBreakPoint){
        menu.status = false;
    }
}

export default {
    //Variables
    menu,
    navbar,

    //Computed Properties
    floatingShadow,
    menuTotalSpace,

    //Functions
    resizeController,
    innitialLoader,
    pindetail,
    toggleMenu,
}