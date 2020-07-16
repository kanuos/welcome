<template>
    <main>
        <Navbar />
        <h1>
            My Tasks
        </h1>
        <TaskCE :add="addTodo"/>
        <hr>
        <TodoItem v-for="todo in todos" :todo="todo" :key="parseInt(todo.id)"/>
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
        addTodo(todo){
            console.log("Main : ",todo);
        },
        editTodo(){

        },
        deleteTodo(){

        },
        completeTodo(){

        }
    },
    created(){

    }
}
</script>

<style scoepd>

</style>