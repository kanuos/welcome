<template>
<div class="task-box">
  <transition name="fade">
      <article v-if="todo">
          <div class="text" @click="complete(todo.id)">
            <span 
            :class="`priority-${todo.priority} ${todo.isComplete && 'complete'}`">
                {{todo.task}}
            </span>
            <small>{{todo.time | getDate}}</small>
          </div>
          <div class="btns">
            <button @click="deleteTodo(todo.id)" class="delete">Delete</button>
            <button @click="edit(todo.id)" class="edit">Edit</button>
          </div>
      </article>
  </transition>
</div>
</template>

<script>
export default {
    props : ["todo","edit","deleteTodo", "complete"],
    filters : {
        getDate(date){
            return new Date(date).toDateString();
        }
    }
}
</script>

<style scoped>
    .task-box{
        margin-top: 1.5rem;
    }
    article {
        width: 40rem;
        background: white;
        margin: 0 auto;
        padding: 1rem 1.5rem;
        border-radius: .25rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        word-wrap: break-word;
    }
    .text {
        display: flex;
        flex-direction: column;
        flex-basis: 80%;
    }
    .priority-1 {
        color: orangered;
    }
    .priority-2 {
        color : teal;
    }
    article:hover {
        border-radius: .25rem;
    }
    .fade-enter,.fade-leave-to {
        opacity: 0;
        transform: scale(0) translateX(200%);
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease-out;
    }
    span {
        font-size: 1.75rem;
        text-align: left;
        font-weight: bold;
    }
    small {
        font-size: 1.25rem;
        align-self: start;
    }
    button {
        background: black;
        color: white;
        border:none;
        margin: 0 .25rem;
        padding: .25rem .5rem;
        border-radius: .15rem;
        cursor: pointer;
        transition: background-color .4s ease;
    }
    .delete:hover {
        background-color: orangered;
    }
    .edit:hover {
        background-color: teal;
    }
    .complete {
        color: grey !important;
        font-weight: lighter;
        text-decoration: line-through;
    }
</style>