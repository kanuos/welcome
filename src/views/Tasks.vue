<template>
<transition name="fade">
    <main>
        <h1>
            My Tasks
        </h1>
        <form @submit.prevent="handleSubmit">
            <input v-model="task" type="text" placeholder="Add task here">
            <select v-model="priority">
                <option value="1">High</option>
                <option value="2">Medium</option>
                <option value="3">Low</option>
            </select>
            <button>Add</button>
        </form>
        <hr>
        <TodoItem v-for="todo in todos" :todo="todo" :key="parseInt(todo.id)"/>
    </main>
</transition>
</template>

<script>
// import { v4 as uuid } from 'uuid';
import TodoItem from '../components/TodoItem';
export default {
    name : "Tasks",
    components : {TodoItem},
    data () {
        return {
            task : "",
            priority : "",
            todos : [
                {
                    id : 1,
                    task : "Clean Room",
                    time : Date.now(),
                    priority : 3,
                    isComplete : false
                },
                {
                    id : 2,
                    task : "Do the laundry",
                    time : Date.now(),
                    priority : 2,
                    isComplete : false
                },
                {
                    id : 3,
                    task : "Complete the navbar",
                    time : Date.now(),
                    priority : 1,
                    isComplete : false
                },
                {
                    id : 4,
                    task : "Complete the home screen",
                    time : Date.now(),
                    priority : 3,
                    isComplete : true
                },
            ]
        }
    },
    methods : {
        handleSubmit(){
            console.log(`TASK : ${this.task} has priority : ${this.priority}`);
        },
        addTodo(){

        },
        editTodo(){

        },
        deleteTodo(){

        },
        completeTodo(){

        }
    }
}
</script>

<style scoepd>
    main {
        height: 100vh;
        width: 100vw;
        background-image: url('../assets/background.jpg');
        background-position: center;
        background-size: cover;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
        transform: scale(0);
        filter: sepia(100%);
        transform-origin: center;
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: all .5s ease-out;
    }
</style>