<template>
    <div>
        <div class="body-header">
            <div class="flx">
                <div><CcPropicList :height="40" :list="userList" listTarget="avatar_url" /></div>
                <div class="body-header-invite"><CcButton label="Invite People" :border="2" :textSize="16" icon="add-user" :padding=".8" /></div>
            </div>
            <div class="body-header-status-container">
                <div class="body-header-status"><CcTitle :fontSize="14" status="Importent" title="Importent" /></div>
                <div class="body-header-status"><CcTitle :fontSize="14" status="Irrelevant" title="Irrelevant" /></div>
                <div class="body-header-status"><CcTitle :fontSize="14" status="Default" title="Default" /></div>
            </div>
        </div>

        <div style="height:30px"></div>
        <div class="todo-items flx block-lg w100-lg">
            <!-- Item Container -->
            <div class="w30 w100-lg">
                <div class="todo-items-header">
                    <div class="f-16 f-bold flx-auto h-center">
                        To Do <span class="todo-items-title-count">({{toDoCount}})</span>
                    </div>
                    <div><CcButton label="New Task" color="#E0E2E8" :textSize="12" icon="plus" @click="newTaskEvent('todo')" :padding="1.2" /></div>
                </div>
                <div class="dragable-box">
                    <draggable class="dragArea list-group" :list="toDo" group="task" item-key="id" >
                        <template #item="{ element }">
                            <div class="list-group-item todo-todo">
                                <CcTaskCard :cardDetail="element" :userList="userList" />
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
            <!-- Item Container -->
            <div class="w30 w100-lg">
                <div class="todo-items-header">
                    <div class="f-16 f-bold flx-auto h-center">
                        In progress <span class="todo-items-title-count">({{inPogressCount}})</span>
                    </div>
                    <div><CcButton label="New Task" color="#E0E2E8" :textSize="12" icon="plus" @click="newTaskEvent('prog')" :padding="1.2" /></div>
                </div>
                <div class="dragable-box">
                    <draggable class="dragArea list-group inPogress" :list="inPogress" group="task" item-key="id" >
                        <template #item="{ element }">
                            <div class="list-group-item progress-todo">
                                <CcTaskCard :cardDetail="element" :userList="userList" />
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
            <!-- Item Container -->
            <div class="w30 w100-lg">
                <div class="todo-items-header">
                    <div class="f-16 f-bold flx-auto h-center">
                        Done <span class="todo-items-title-count">({{doneTaskCount}})</span>
                    </div>
                    <div></div>
                </div>
                <div class="dragable-box">
                    <draggable class="dragArea list-group" :list="doneTask" group="task" item-key="id" >
                        <template #item="{ element }">
                            <div class="list-group-item done-todo">
                                <div><CcTaskCard :cardDetail="element" :userList="userList" /></div>
                            </div>
                        </template>
                    </draggable>
                </div>
            </div>
        </div>

        <CcModal v-model="modal" :width="500">
            <div class="tsm">
                <div class="tsm-name">Create New Task</div>
                <CcDivider />
                <div class="tsm-button">
                    <div class="tsm-button-spacer"></div>
                    <div class="tsm-button-container">
                        <div class="tsm-button-name" @click="newTaskPage = 'gen'" :style="{color: newTaskPage == 'gen' ? '#0049C6' : '#5D5D7A'}">General Info</div>
                        <div class="tsm-button-marker-container">
                            <div class="tsm-button-marker" :style="{backgroundColor: newTaskPage == 'gen' ? '#0049C6' : '#F5F8FC'}"></div>
                        </div>
                    </div>
                    <div class="tsm-button-spacer"></div>
                    <div class="tsm-button-container">
                        <div class="tsm-button-name" @click="newTaskPage = 'assign'" :style="{color: newTaskPage == 'assign' ? '#0049C6' : '#5D5D7A'}">Assigned To</div>
                        <div class="tsm-button-marker-container">
                            <div class="tsm-button-marker" :style="{backgroundColor: newTaskPage == 'assign' ? '#0049C6' : '#F5F8FC'}"></div>
                        </div>
                    </div>
                    <div class="tsm-button-spacer"></div>
                </div>
                <div v-if="newTaskPage == 'gen'">
                    <div class="tsm-title">
                        <CcInput v-model="taskItem.title" label="Title" placeHolder="Web Design"  />
                    </div>
                    <div class="tsm-description">
                        <CcTextarea v-model="taskItem.description" :rows="4" label="Description" />
                    </div>
                    <div class="tsm-project-type">
                        <CcSelect v-model="taskItem.type" :options="options" :rows="10" label="Project Type" />
                    </div>     
                </div>
                <div  v-if="newTaskPage == 'assign'">
                  <div class="tsm-employee-search">
                      <CcSearch v-model="srcEmployeeInput" @select="eployeeSelected" label="Search" :options="srcEmployeeOptions" />
                  </div>
                  <div class="tsm-employee-list">
                      <div v-for="(item, index) in taskItem.assignedUser" :key="index" class="tsm-employee-list-item">
                          <div  class="tsm-employee-list-image"><img :src="item.avatar_url" style="width:40px" /></div>
                          <div class="tsm-employee-list-text">{{item.login}}</div>
                          <div class="tsm-employee-list-delete">
                              <img src="/icons/close.svg" style="width:10px" />
                          </div>
                      </div>
                  </div>
                </div>
                <div class="tsm-save-button">
                    <CcButton :label="newTaskPage == 'gen' ? 'Next' : 'save'" @click="savetaskItem()" color="#0049C6" :textSize="14" textColor="#FFFFFF" :padding="1.5" />
                </div> 
            </div>
        </CcModal>

    </div>
</template>
<script setup>
    import CcPropicList from '../components/cc-propic-list.vue'
    import CcTitle from '../components/cc-title.vue'
    import CcTaskCard from '../components/cc-task-card.vue'

    import CcModal from '../components/cc-modal.vue'
    import CcDivider from '../components/cc-divider.vue'
    import CcSearch from '../components/cc-search.vue'
    import CcButton from '../components/cc-button.vue'
    import CcInput from '../components/cc-input.vue'
    import CcTextarea from '../components/cc-textarea.vue'
    import CcSelect from '../components/cc-select.vue'

    import axios from 'axios'
    import draggable from 'vuedraggable'
    import lodash from 'lodash'

    import { ref, reactive, onMounted, computed, watch  } from 'vue'
    import {useStore} from 'vuex'

    const store = useStore()

    const userList = reactive([]);
    const modal = ref(false);

    const toDo = computed(() =>  store.state.toDo) 
    const inPogress = computed(() => store.state.inPogress) 
    const doneTask = computed(() => store.state.doneTask) 
    const toDoCount = computed(() => store.state.toDo.length) 
    const inPogressCount = computed(() => store.state.inPogress.length) 
    const doneTaskCount = computed(() => store.state.doneTask.length) 

    //New Task Create
    const newTaskPage = ref('gen');
    const srcEmployeeInput = ref('');
    const selectedEmployeeList = reactive([]);
    const options = reactive(['Importent','Irrelevant', 'Default']);
    const taskItem = reactive({
        title:null,
        description: null,
        type:'Importent',
        source:null,
        assignedUser: [],
    })
    const srcEmployeeOptions = computed(()=>{
        var re = new RegExp(srcEmployeeInput.value, "i");
        return userList.filter((item) => {
            return re.test(item.login)
        })

    })

    const newTaskEvent = (source) => {
        modal.value = true;
        taskItem.assignedUser.length = 0;
        taskItem.title = null;
        taskItem.description = null;
        taskItem.source = source;
        taskItem.type = 'Importent';
        newTaskPage.value = 'gen';
    }
    const eployeeSelected = (e) => {
        taskItem.assignedUser.push(e)
    }
    const savetaskItem = () => {
        if(newTaskPage.value == 'gen'){
            newTaskPage.value = 'assign';
        }else{
            if(taskItem.source == 'todo'){
                var newToDO = toDo.value;
                newToDO.push(lodash.cloneDeep(taskItem));
                store.commit('toDoUpdate', newToDO)
            }
            if(taskItem.source == 'prog'){
                var newInPogress = inPogress.value;
                newInPogress.push(lodash.cloneDeep(taskItem));
                store.commit('inPogressUpdate', newInPogress)
            }
            modal.value = false;            
        }

    }
    watch([store.state.toDo, store.state.inPogress, store.state.doneTask], () => {
        store.commit('callSave')
    })

    //Load innitials
    const requestUserList = async () =>{
        try{
            var req = await axios.get('https://api.github.com/users')
            userList.push(...req.data);
        }catch(err){console.log(err)}
    }

    onMounted(()=>{
        requestUserList();
    })
</script>

<style lang="scss">
    .body-header{
        display: flex;
        padding: 30px 0px;
        &-status{
            padding: 0px 10px;
            display: flex;
            align-items: center;
        }
        &-invite{
            padding: 0px 20px;
        }
        &-status-container{
            padding-top: 0px;
            display: flex;
            justify-content: flex-end;
            flex:auto;
        }
    }
    @media (max-width:850px) {
        .body-header{
            display: block;
            &-status-container{
                padding-top: 30px;
                justify-content: flex-start;
            }
        }
    }
    .todo-items{
        justify-content: space-between;
        &-header{
            display: flex;
            height: 35px;
        }
        &-title-count{
            font-size:18px;
            color:#8F909F;
            padding-left:10px ;
        }
    }
    .dragable-box{
        padding-top: 25px;
        padding-bottom: 25px;
    }
    .list-group{
        min-height: 250px;
    }
    .list-group-item{
        padding: 10px 0px;
    }
    @media (max-width:1000px) {
        .dragable-box{
            padding-top: 5px;
            padding-bottom: 35px;
        }
    }





</style>