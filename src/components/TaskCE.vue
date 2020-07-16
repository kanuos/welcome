<template>
    <form @submit.prevent="handleSubmit">
    <transition name="appear">
        <h6 :class="error && 'error'" v-if="error.length > 0">{{error}}</h6>
    </transition>
    <input v-model="task" type="text" placeholder="Add task here">
    <!-- <select v-model="priority" >
        <option value="1">High</option>
        <option selected value="2">Medium</option>
        <option value="3">Low</option>
    </select> -->
    <v-select v-model="priority" options="[`High`,`Medium`,`Low`]" />
    <button>Add</button>
    </form>
</template>

<script>
import { v4 as uuid } from 'uuid';
export default {
    name : "TaskCE",
    props : ['add'],
    data(){
        return {
            task : "",
            priority : "Medium",
            message : "",
            error : false
        }
    },
    methods : {
        handleSubmit () {
            if (this.task.trim().length > 0 && parseInt(this.priority) > 1){
                const newTask = {
                    id : uuid(),
                    task : this.task.trim(),
                    priority : parseInt(this.priority),
                    time : Date.now(),
                    isComplete : false,
                    isDeleted : false
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
    h6 {
        text-align: center;
        color: teal;
    }
    h6.error {
        color: orangered;
    }
</style>