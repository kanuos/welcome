<template>
  <div id="app">
    <transition name="fade">
      <router-view/>
    </transition>
  </div>
</template>

<style>

@font-face {
  font-family: 'Pathway Gothic One';
  font-style: normal;
  font-weight: 400;
  src: url('./fonts/pathway-gothic-one-v8-latin-regular.eot'); /* IE9 Compat Modes */
  src: local('Pathway Gothic One Regular'), local('PathwayGothicOne-Regular'),
       url('./fonts/pathway-gothic-one-v8-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
       url('./fonts/pathway-gothic-one-v8-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
       url('./fonts/pathway-gothic-one-v8-latin-regular.woff') format('woff'), /* Modern Browsers */
       url('./fonts/pathway-gothic-one-v8-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
       url('./fonts/pathway-gothic-one-v8-latin-regular.svg#PathwayGothicOne') format('svg'); /* Legacy iOS */
}

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
  overflow: hidden;
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
  transform:translateY(100%);
}
.fade-enter-active,
.fade-leave-active {
  transition: transform .5s ease;
}


</style>
