<template>
  <h1>
      Weather BOOM!!
  </h1>
</template>

<script>
import axios from 'axios'
export default {
    name: "Weather",
    created(){
       // this.fetchWeather();
        
// const result = await fetch(`${proxy}https://api.darksky.net/forecast/${key}/${latitude},${longitude}`);
        
    },
    methods : {
    
        async fetchWeather(){
            const latitude = 42.4440, longitude = 76.5019;
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const API_KEY= `f25a03061accf012c304571dd55115fa`;
            const result = await axios(`${proxy}https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`);
            console.log(result.data)
        }
    }

}
</script>

<style scoped>

</style>