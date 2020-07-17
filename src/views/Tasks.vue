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

        <div class="todos-container">
            <TodoItem 
                v-for="todo in sortedList" 
                :todo="todo" 
                :edit = "editTodo"
                :deleteTodo = "deleteTodo"
                :complete = "completeTodo"
                :key="todo.id"/>
        </div>
    </main>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import TodoItem from '../components/TodoItem';
import TaskCE from '../components/TaskCE'
export default {
    name : "Tasks",
    components : {TodoItem, Navbar, TaskCE},
    data () {
        return {
            todos : [],
            editCounter : 0,
            existingTask : "",
            existingPriority : null,
            showComplete : false,
            showIncomplete : false,
            showAll : true,
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
    },
    computed : {
        sortedList(){
            let array = [...this.todos];
             
             if (this.showComplete){
                array = array.filter(todo => todo.isComplete === true)
             }
             else if (this.showIncomplete){
                array.filter(todo => todo.isComplete !== true)
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

<style scoepd>
    h1 {
        padding-top: 4rem;
        font-size: 3rem;
        font-weight: lighter;
        color: white;
    }
    .todos-container {
        max-height: 80vh;
        width: 90%;
        max-width: 120rem;
        overflow: auto;
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

    label {
        color: red;
    }
</style>