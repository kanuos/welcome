<template>
    <main>
        <Navbar />
        <h1>
            My Tasks
        </h1>
        <TaskCE 
            :add="addTodo" 
            :existingTask="existingTask" 
            :existingPriority="existingPriority" 
            :key="editCounter"/>
        <details>
            <summary>Tools</summary> 
            <ul>
                <li class="tool">
                    <small>Show Tasks</small>
                    <ViewSelector :view="selectedView"/>
                </li>
                <li class="tool">
                    <small>Can't decide?</small>
                    <button class="btn-tool" @click="toggleIndecision">Decide!</button>
                </li>
            </ul>

        </details>
        <div class="todos-container">
            <TodoItem 
                v-for="todo in sortedList" 
                :todo="todo" 
                :edit = "editTodo"
                :deleteTodo = "deleteTodo"
                :complete = "completeTodo"
                :key="todo.id"/>
        </div>
    <Indecision v-if="indecision" :close="toggleIndecision" :list="todos" />
    </main>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import TodoItem from '../components/TodoItem';
import TaskCE from '../components/TaskCE'
import ViewSelector from '../components/ViewSelector'
import Indecision from '../components/Indecision'

export default {
    name : "Tasks",
    components : {TodoItem, Navbar, TaskCE, ViewSelector, Indecision},
    data () {
        return {
            todos : [],
            editCounter : 0,
            existingTask : "",
            existingPriority : null,
            showComplete : false,
            showIncomplete : false,
            showAll : true,
            indecision : false
        }
    },
    methods : {
        addTodo(todo){
            this.todos.push(todo);
            this.updateStorage();
        },
        editTodo(id){
            const editTask = this.todos.filter(todo => todo.id === id)[0];
            if (editTask){
                const {task, priority} = editTask;
                this.editCounter++;     // to re-render the TaskCE component
                this.existingTask = task;
                this.existingPriority = priority;
                this.deleteTodo(id);
            }
        },
        deleteTodo(id){
            this.todos = [...this.todos.filter(todo => todo.id !== id)]
            this.updateStorage();
        },
        completeTodo(id){
            this.todos.forEach(todo => {
                if (todo.id === id){
                    todo.isComplete = !todo.isComplete;
                }
            });
            this.updateStorage();
        },
        updateStorage(){
            const LS_KEY = 'welcome-data';
            const localStorageContent = JSON.parse(localStorage.getItem(LS_KEY));

            localStorageContent.todos = [...this.todos];
            
            localStorage.setItem(LS_KEY, JSON.stringify(localStorageContent));
        },
        selectedView(view){
            switch(view){
                case 'inc': 
                    this.showIncomplete = true;
                    this.showComplete = false;
                    this.showAll = false;
                    break;
                case 'com': 
                    this.showIncomplete = false;
                    this.showComplete = true;
                    this.showAll = false;
                    break;
                default : 
                    this.showIncomplete = false;
                    this.showComplete = false;
                    this.showAll = true;
                    break;
            }
        },
        toggleIndecision(){
            this.indecision = !this.indecision;
        }
    },
    computed : {
        sortedList(){
            let array = [...this.todos];
             
             if (this.showComplete){
                array = array.filter(todo => todo.isComplete === true)
             }
             else if (this.showIncomplete){
                 array = array.filter(todo => todo.isComplete === false)
             }

            return array.sort((a,b) => a.priority - b.priority);
        }
    },
    created(){
        const LS_KEY = 'welcome-data';
        const localStorageContent = JSON.parse(localStorage.getItem(LS_KEY));

        this.todos = localStorageContent.todos ? localStorageContent.todos : []
    }
}
</script>

<style>
    h1 {
        padding-top: 4rem;
        font-size: 3rem;
        font-weight: lighter;
        color: white;
    }
    .todos-container {
        max-height: 70vh;
        width: 90%;
        max-width: 120rem;
        overflow-y: scroll;
        margin: 2rem auto;
        justify-content: center;
        padding: 1rem 0;
        display: grid;
        grid-template-columns: repeat(autofit, minmax(40rem));
        grid-template-columns: repeat(auto-fit, 40rem);
        gap: 1rem;
    }
    .todos-container::-webkit-scrollbar {
        width: .5rem;
        border-radius: .25rem;
    }
    .todos-container::-webkit-scrollbar-track {
        background: black;
    }
    .todos-container::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,.5);
        cursor: pointer;
        border-radius: .25rem;
        transition: all .4s ease;
    }
    .todos-container::-webkit-scrollbar-thumb:hover {
        background: white;
    }
    details {
        width: 100%;
        max-width: 40rem;
        margin: auto;
        background: white;
        outline: none;
        padding: 0 1rem;
    }
    summary {
        padding: .5rem 3rem;
        text-align: left;
        outline: none;
        font-size: 1.25rem;
        text-transform: uppercase;
        display: inline-block;
        cursor: pointer;
    }
    .tool {
        font-size: 1.5rem;
        display: flex;
        flex-direction: column;
        align-items: start;
    }
    .btn-tool{
        font-size: 1.5rem;
        display: flex;
        flex-direction: column;
        align-self: center;
        margin-bottom: 1rem;
        padding: .25rem 1.25rem;
        background: black;
        color: white;
        border: none;
        cursor: pointer;
        text-transform: uppercase;
        transition: all 0.4s ease;
    }
    .btn-tool:hover {
        background: white;
        color: black;
        box-shadow: 0 1px 1rem black;
    }
</style>