<template>
    <form @submit.prevent="handleSubmit">
    <input v-model="task" type="text" placeholder="Add task here">
    <select v-model="priority" >
        <option value="1">High</option>
        <option value="2">Medium</option>
        <option value="3">Low</option>
    </select>
    <button>Add</button>
    <transition name="appear">
        <small :class="error && 'error'" v-if="message.length > 0" v-text="message"/>
    </transition>
    </form>
</template>

<script>
import { v4 as uuid } from 'uuid';
export default {
    name : "TaskCE",
    props : ['add',"existingTask","existingPriority" ],
    data(){
        return {
            task : this.existingTask ? this.existingTask : "",
            priority : this.existingPriority ? `${this.existingPriority}`:"2",
            message : "",
            error : false
        }
    },
    methods : {
        handleSubmit () {
            if (this.task.trim().length > 0 && parseInt(this.priority) > 0){
                const newTask = {
                    id : uuid(),
                    task : this.task.trim(),
                    priority : parseInt(this.priority),
                    time : Date.now(),
                    isComplete : false,
                    isDeleted : false,
                }
                this.add(newTask);
                this.task = "";
                this.message = "Task added successfully";
            }
            else {
                this.message = "Task or Priority cannot be empty";
                this.error = true;
            }
            setTimeout(()=> {
                this.message = "";
                this.error = false;
            }, 1200)
        }
    }
}
</script>

<style scoped>
    form{
        background: white;
        width: 100%;
        max-width: 40rem;
        margin: 1rem auto 0 auto;
        padding: 2rem 1rem 1rem 1rem;
        border-top-left-radius: .25rem;
        border-top-right-radius: .25rem;
    } 
    form > * {
        padding: .25rem;
        outline: none;
    }
    input {
        min-width: 23rem;
    }
    button{
        background: black;
        color: white;
        min-width: 5rem;
        border-color: transparent;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.4s ease;
    }
    small {
        margin: 1.25rem 0;
        display: block;
        font-size: 2rem;
        text-align: center;
        color: teal;
        text-transform: uppercase;
    }
    .error {
        color: orangered;
    }
    .appear-enter,.appear-leave-to {
        opacity: 0;
        transform: scale(0);
        transform-origin: center;
    }
    .appear-enter-active,.appear-leave-active {
        transition: all .3s ease-out;
    }

</style>