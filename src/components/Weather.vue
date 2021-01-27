<template>
<div id="weather" class="weather-box" 
    v-if="hasPermission && Object.keys(weather)">
    <Skycon 
        v-if="!isLoading && weather.icon"
        color = "white"
        size = "90"
        :condition="weather.icon" />
    <article class="weather-box" v-if="hasPermission && !isExpired && !isLoading && Object.keys(weather).length > 0">
        <h1 @click="toggleUnits">{{ weather.temperature }}&deg; {{temp_unit}} </h1>
        <p class="city" v-if="weather.timezone">
            {{weather.timezone}}
        </p>
        <p>
            {{weather.summary}}
        </p>
        <p>
            <span class="high">
                {{weather.high}} &deg; {{temp_unit}} &nbsp;
            </span>
            <span class="low">
                &nbsp;/ {{weather.low}} &deg; {{temp_unit}}
            </span>
        </p>
        <ul class="welcome-list">
            <li>
                <span class="_key">
                    Feels Like 
                </span>
                <span class="_value">
                    {{ weather.feelsLike }} &deg; {{ temp_unit }}
                </span>
            </li>
            <li>
                <span class="_key smaller">
                    Humidity
                </span>
                <span class="_value smaller">
                    {{Math.round(weather.humidity * 100)}}%                     
                </span>
            </li>
        </ul>
    </article>
  </div>
   <div class="weather-box" v-else-if="isLoading">
      <Loader message="locating"/>
  </div>
</template>

<script>
import Loader from './Loader'
import {Skycon} from 'vue-skycons'
import Converter from 'unit-converter-pro'
import axios from 'axios'

export default {
    name: "Weather",
    components : {
        Loader,
        Skycon
    },
    data(){
        return {
            hasPermission : false,
            isLoading : true,
            latitude : null,
            longitude : null,
            timeZone: "",
            weather : {},
            temp_unit : "F",
            isExpired : false,
        }
    },
    methods : {
        async fetchWeather(latitude, longitude){
            const proxy = `https://cors-anywhere.herokuapp.com/`;
            const API_KEY= `f25a03061accf012c304571dd55115fa`;
            const result = await axios(`${proxy}https://api.darksky.net/forecast/${API_KEY}/${latitude},${longitude}`);
            if (result.status === 200){
                this.weather.feelsLike = result.data.currently.apparentTemperature;
                this.weather.temperature = result.data.currently.temperature;
                this.weather.summary = result.data.currently.summary;
                this.weather.humidity = result.data.currently.humidity;
                this.weather.icon = result.data.currently.icon.toLowerCase().replace(" ","-"); 
                this.weather.low = result.data.daily.data[result.data.daily.data.length - 1].temperatureHigh;
                this.weather.high = result.data.daily.data[result.data.daily.data.length - 1].temperatureHigh;
                this.weather.timezone = result.data.timezone;
                this.weather.timeOfFetch = Date.now();
                this.$router.go();
            }

            // store the weather info in LS
            const LS_CONTENT =  JSON.parse(localStorage.getItem('welcome-data'));
            if (LS_CONTENT){
                LS_CONTENT.weather = this.weather;
                localStorage.setItem('welcome-data', JSON.stringify(LS_CONTENT));
            }
        },
        async getCoordinates(){
            this.$getLocation()
            .then(coordinates => {
                const {lat,lng} = coordinates;
                this.latitude = lat;
                this.longitude = lng;
                this.fetchWeather(this.latitude,this.longitude);
            })
            .then(() => {
                this.hasPermission = true;
                this.isLoading = false;
                this.isExpired = false;
            })
            .catch(() =>{
                this.isLoading = false;
                this.hasPermission = false;
            })
        },
        convertTemperature(value){
            const temp = new Converter.Temperature();
            if (this.temp_unit === "F"){
                return temp.fahrenheit(parseFloat(value)).celsius().toFixed(2);
            }
            else{
                return temp.celsius(parseFloat(value)).fahrenheit().toFixed(2);
            }

        },
        toggleUnits(){
            this.weather.low = this.convertTemperature(this.weather.low);
            this.weather.high = this.convertTemperature(this.weather.high);
            this.weather.feelsLike = this.convertTemperature(this.weather.feelsLike);
            this.weather.temperature = this.convertTemperature(this.weather.temperature)
            this.temp_unit =  this.temp_unit === "F" ? "C" : "F";
        },
        checkForExpiry(){
            const lsWeather = JSON.parse(localStorage.getItem('welcome-data'));
            if (lsWeather && lsWeather.weather){
            // check if weather info is more than 1hr old
            const previousFetchTime = lsWeather.weather.timeOfFetch;

                if (Date.now() - previousFetchTime > 1000*60*60){
                    this.isExpired = true;
                    if (this.latitude && this.longitude)
                        this.fetchWeather(this.latitude,this.longitude);
                    else 
                        this.getCoordinates();
                }
                else {
                    this.weather = lsWeather.weather
                    this.hasPermission = true;
                    this.isLoading = false;
                }
            }
            else {
                // if not get geolocation and get weather
                this.getCoordinates();
            }
        }
    },

    created(){
        // check if weather in localstorage
        this.checkForExpiry();
        setInterval(()=> {
            this.checkForExpiry();
        }, 1000*60*30)
    },
}
</script>

<style scoped>
    .weather-box {
        color: white;
        cursor: default;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .weather-box > h1 {
        font-size: 4rem;
        padding-top: 1rem;
        font-weight: lighter;
        width: max-content;
        cursor: pointer;
    }
    p{
        font-size: 2rem;
    }
    .high, .low {
        font-weight: lighter;
        font-size: 1.25rem;
    }
    .low {
        color:grey;
    }
    .welcome-list {
        list-style-type: none;
        max-width: max-content;
        margin: 1rem auto;
        display: flex;
        opacity: 0;
        transform: translateY(-100%);
        justify-content: center;
        font-size: 1.25rem;
        align-items: center;
        transition: all .4s ease;
    }
    .welcome-list > li:first-child {
        margin-right: 1rem;
    }
    .weather-box >h1:hover ~ .welcome-list{
        opacity: 1;
        transform: translateY(0);
    }
    .city {
        font-weight: lighter;
        color: grey;
        font-size: 1.5rem;
    }
</style>