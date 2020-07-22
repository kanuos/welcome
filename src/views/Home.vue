<template>
  <main>
    <Navbar />
    <section v-if="currentTime.length">
      <!-- The weather componenet -->
      <Weather />
      <!-- The welcome message and time -->
      <h1 :key="currentTime">{{currentTime}}</h1>
      <h4 class="welcome-msg">
        Good <span>{{message}}</span> 
        <span v-if="user.length">,&nbsp;{{user}}.</span>
      </h4>
      <!-- The quote componenet -->
      <Quote/>
      <!-- Tasks button -->
      <router-link to="/tasks" class="cta">Tasks</router-link>
    </section>
    
    <section v-else>
      <Loader message=" "/>
    </section>
  </main>
</template>

<script>
import Quote from '../components/Quote'
import Weather from '../components/Weather';
import Loader from '../components/Loader';
import Navbar from '../components/Navbar.vue'

export default {
  name: 'Home',
  components : {Quote, Weather, Loader, Navbar},
  data(){
    return {
      currentHour : "",
      currentMin : "",
      timeOfDay : "",
      currentTime :"",
      message : "",
      user : "",
    }
  },
  methods : {
    ensureDoubleDigits(number){
      return number < 10 ? `0${number}` : number;
    },
    amPm(time){
      const hour = time.getHours();
      if (hour >= 0 && hour <=11){
        return "AM"
      }
      return "PM";
    },

  },
  created(){
    const storedData = JSON.parse(localStorage.getItem('welcome-data'));
    this.user = storedData.name;   

    setInterval(()=> {
      const timeNow = new Date(Date.now());
      
      this.currentHour = timeNow.getHours() > 12 ? timeNow.getHours() % 12 : timeNow.getHours();

      this.currentMin  = timeNow.getMinutes();
      this.timeOfDay   = this.amPm(timeNow)

      this.currentTime = `${this.ensureDoubleDigits(this.currentHour)} : ${this.ensureDoubleDigits(this.currentMin)} ${this.timeOfDay}`;

      if (this.timeOfDay === "AM" && (this.currentHour >= 4 && this.currentHour <= 10)){
        this.message = "morning";
      }
      else if ((this.timeOfDay === "AM" && this.currentHour > 11 ) || (this.timeOfDay === "PM" && (this.currentHour === 12 || this.currentHour < 5))){
          this.message = "afternoon";
      }
      else if (this.timeOfDay === "PM" && this.currentHour >= 5 && this.currentHour <= 8){
      this.message = "evening";
      }
      else {
        this.message = "night";
      }


   },1000)
  }
}
</script>

<style scoped>
  main{
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-image: linear-gradient(to right bottom, rgba(0,0,0,.8), rgba(0,0,0,.8)),url(../assets/landing.jpg);
    background-position: center;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h1 {
    font-size: 5.5rem;
    color: white;
  }
  h4.welcome-msg {
    font-size: 4rem;
    color: white;
    text-transform: capitalize;
    font-weight: lighter;
  }
  span {
    text-transform: capitalize;
  }
  .cta {
    display: inline-block;
    padding: .5rem 1.5rem;
    border: none;
    background: white;
    text-decoration: none;
    font-size: 1.5rem;
    text-transform: uppercase;
    color: black;
    font-weight: bolder;
    border-radius: .15rem;
    position: relative;
    backface-visibility: hidden;
    transform: translateZ(0);
    transition: all .5s ease;
  }
  .cta::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: grey;
    z-index: -5;
    transition: all .6s ease-out;
  }
  .cta:hover::before {
    transform: scale(2);
    opacity: 0;
  }
  .cta:hover{
    transform: translateY(-2px);
  }
</style>