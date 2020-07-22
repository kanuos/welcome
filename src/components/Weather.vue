<template>
  <div class="weather-box" v-if="hasPermission && !isLoading && Object.keys(weather)">
      Weather BOOM!!
        <p>
            Latitude : {{latitude}}
            Longitude : {{longitude}}
        </p>
  </div>
  <div class="weather-box" v-else-if="!hasPermission && isLoading">
      <Loader message="locating"/>
  </div>
</template>

<script>
import Loader from './Loader'
import axios from 'axios'
export default {
    name: "Weather",
    components : {Loader},
    data(){
        return {
            hasPermission : false,
            isLoading : true,
            latitude : null,
            longitude : null,
            timeOfFetch : null,
            weather : null
        }
    },
    methods : {
    
        async fetchWeather(latitude, longitude){
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const API_KEY= `f25a03061accf012c304571dd55115fa`;
            const result = await axios(`${proxy}https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`);
            console.log(result.data)
            this.weather = result.data;
            this.timeOfFetch = Date.now();
        }
    },
    created(){
        // check if weather in localstorage
        // check if weather info is more than 1hr old
        // if not get geolocation and get weather
        this.$getLocation()
        .then(coordinates => {
            const {lat,lng} = coordinates;
            this.isLoading = false;
            this.hasPermission = true;
            this.latitude = lat;
            this.longitude = lng;

            // fetchWeather(this.latitude,this.longitude);
        })
        .catch(err =>{
            this.isLoading = false;
            this.hasPermission = false;
            console.log(err)
        })
    }

}
</script>

<style scoped>

</style>