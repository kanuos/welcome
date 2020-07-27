<template>
<main>
    <Navbar />
    <div>
        <section>
            <ConverterUI 
                :unit="tabText"
                :currency = "currencyConverter"
                :output="Object.keys(units[tabText.toLowerCase()])"
                :input="Object.keys(units[tabText.toLowerCase()])"/>
        </section>
        <aside>
            <button :class="tab == 1 && 'active'" @click="tabSelector(1)">Length</button>
            <button :class="tab== 2 && 'active'" @click="tabSelector(2)">Area</button>
            <button :class="tab== 3 && 'active'" @click="tabSelector(3)">Mass</button>
            <button :class="tab== 4 && 'active'" @click="tabSelector(4)">Temperature</button>
            <button :class="tab== 5 && 'active'" @click="tabSelector(5)">Time</button>
            <button :class="tab== 6 && 'active'" @click="tabSelector(6)">Currency</button>
        </aside>
    </div>
</main>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import ConverterUI from '../components/ConverterUI'
import units from '../conversion';
import axios from 'axios';

export default {
    components : {Navbar, ConverterUI},
    data(){
        return {
            tab : 1,
            tabText : "Length",
            units,
            currency : {},
        }
    },
methods : {
    tabSelector(tab){
        this.tab = tab;
        switch(tab){
            case 1 : this.tabText = "Length"; break;
            case 2 : this.tabText = "Area"; break;
            case 3 : this.tabText = "Mass"; break;
            case 4 : this.tabText = "Temperature"; break;
            case 5 : this.tabText = "Time"; break;
            case 6 : this.tabText = "Currency"; break;
            default: this.tabText = "Length"; break;
        }
    },
        currencyConverter(from,to,amount){
            const value = parseFloat(amount);
            const result =  value * this.currency[to] / this.currency[from];
            return result;
        },
        async requestCurrencyChart(){
            this.isLoading = true;
            const URL = `https://api.exchangeratesapi.io/latest`
            const response = await axios(URL);
            const {date, base, rates} = response.data;
            rates[base] = 1;
            sessionStorage.setItem('welcome-data',JSON.stringify({rates,date}));
            this.currency = rates;
            this.isLoading = false;
            this.units.currency =  this.currency;
        }
    },
    created() {
        const currencyRates = JSON.parse(sessionStorage.getItem('welcome-data'));
        
        if (currencyRates){
            const {date} = currencyRates;
            
            if (new Date(Date.now()).toDateString() !== new Date(date).toDateString()) {
                this.requestCurrencyChart();
            }
            else {
                this.currency = currencyRates.rates;
            }
        }
        else{
            this.requestCurrencyChart();
        }
    },
    updated(){
        if (this.errorMessage && this.errorMessage.length > 0){
            setTimeout(()=> {
                this.errorMessage = "";
            },1500)
        }
    }
}
</script>

<style scoped>
    div {
        display: grid;
        grid-template-rows: calc(100vh - 5rem) 5rem;
    }
    section {
        grid-row: 1/1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    aside {
        grid-row: 2/2;
        display: flex;
        width: 100%;
        background: black;
        border-top: 1px solid grey;
    }
    aside > button {
        flex-grow: 1;
        padding: 1.5rem 1rem;
        cursor: pointer;
        background: black;
        color: grey;
        border: none;
        text-transform: uppercase;
        transition: all .4s ease;
        outline: none;
    }
    aside > button:hover {
        color: white;
    }
   .active {
        color: white;
        border-top: 1px solid white;
    }

    
    @media (min-width: 750px){
        div {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 10rem calc(100vw - 10rem);
        }
        section {
            grid-row: 1/1;
            grid-column: 2/2;
            height: 100vh;
        }
        aside {
            grid-row: 1/1;
            grid-column: 1/1;
            flex-direction: column;
        }
        .active {
        color: white;
        font-weight: bold;
        border-top: none;
    }
    }
</style>