<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Pathway+Gothic+One&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Pathway Gothic One', sans-serif;
}
html {
  font-size: 62.5%;
  scroll-behavior: smooth;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
main {
    height: 100vh;
    width: 100vw;
    background-image: linear-gradient(rgba(0,0,0,.85),rgba(0,0,0,.85)),
                        url('./assets/background.jpg');
    background-position: center;
    background-size: cover;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: rotate(180deg);
  transform-origin: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease;
}
</style>
