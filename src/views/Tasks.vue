<template>
    <main>
        <Navbar />
        <h1>
            My Tasks
        </h1>
        <TaskCE :add="addTodo" :complete="completeTodo"/>
        <div class="todos-container">
            <TodoItem v-for="todo in todos" :todo="todo" :key="todo.id"/>
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
            todos : []
        }
    },
    methods : {
        addTodo(todo){
            this.todos.push(todo);
            this.updateStorage();
        },
        editTodo(){

        },
        deleteTodo(){

        },
        completeTodo(id){
            console.log(id)
        },
        updateStorage(){
            console.log(`Local Storage will be updated`)
        }
    },
    created(){

    }
}
</script>

<style scoepd>
    h1 {
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
</style>