<template>
<div>
  <transition name="fade">
      <article v-if="todo">
          <span>{{todo.task}}</span>
          <small>{{todo.date}}</small>
          <button>Delete</button>
          <button>Edit</button>
      </article>
  </transition>
</div>
</template>

<script>
export default {
    props : ["todo"]
}
</script>

<style scoped>
    .fade-enter,.fade-leave-to {
        opacity: 0;
        transform: scale(0) translateX(200%);
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease-out;
    }
</style>