<template>
  <nav>
    <button class="toggler" @click="toggleNavbar">&equiv;</button>
    <transition name="fade">
    <div class="nav-expand" v-if="navExpand">
      <button class="close-btn" @click="toggleNavbar">&times;</button>
      <ul>
          <li>Tasks</li>
          <li>Converter</li>
          <li>News</li>
          <li>Weather</li>
      </ul>
    </div>
    </transition>
  </nav>
</template>

<script>
export default {
    name : "Navbar",
    data(){
      return {
        navExpand : false
      }
    },
    methods : {
      toggleNavbar() {
        this.navExpand = !this.navExpand;
      }
    }
}
</script>

<style scoped>
  nav {
    position: fixed;
    top : 1rem;
    right: 2rem;
    z-index: 10;
  }
  .nav-expand {
    height: 100vh;
    width: 100vw;
    max-width: 45rem;
    position: fixed;
    top: 0;
    right: 0;
    background-image: linear-gradient(to right,rgba(255,255,255,.87) 30%, rgba(0,0,0,.97) 30% );
  }
  .toggler {
    font-weight: bold;
    color: grey;
    background: transparent;
    font-size: 3rem;
    line-height: 3rem;
    border: none;
    backface-visibility: hidden;
    transition: all .4s ease;
    transform-origin: center;
    cursor: pointer;
    outline: none;
  }
  .toggler:hover {
    color: white;
    transform: rotate(180deg);
  }
  ul {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 50vh;
    list-style: none;
    transform: translateY(30%) translateX(5%);
  }
  li, li > a {
    color: grey;
    font-size: 3.5rem;
    text-align: right;
    border-bottom: 1.2px solid transparent;
    transition: all .4s ease;
    cursor: pointer;
  }
  li:hover, li > a:hover {
    color: white;
    border-bottom: 1.2px solid white;
  }
  .close-btn {
    position: absolute;
    top: 2rem;
    right: 2rem;
    background: transparent;
    border: none;
    color: grey;
    font-size: 4rem;
    cursor: pointer;
    transition: all .4s ease;
    outline: none;
  }
  .close-btn:hover {
    color: white;
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(200%);
    opacity: 0;
  }
  .fade-enter-active, .fade-leave-active {
    transition : all .4s ease;
  }
  @media (min-width: 700px){
    ul {
      transform: translateY(30%) translateX(0%);
    }
  }
</style>