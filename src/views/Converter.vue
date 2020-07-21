<template>
<main>
    <Navbar />
    <div>
        <section>
            <article class="converter">
                <h2 v-if="tabText.length > 0">
                    {{tabText}} Converter
                </h2>
                <form @submit.prevent="convertUnits">
                    <input 
                        type="text" 
                        v-model="inputValue"
                        :placeholder="tabText">
                    <select v-model="input">
                        <option 
                            v-for="(opt,index) in Object.keys(units[tabText.toLowerCase()])"
                            :key="index"
                            :value="opt"
                            >
                            {{opt}}
                        </option>
                    </select>
                    <select v-model="output">
                        <option 
                            v-for="(opt,index) in Object.keys(units[tabText.toLowerCase()])"
                            :key="index"
                            :value="opt"
                            >
                            {{opt}}
                        </option>
                    </select>
                    <button type="submit">Convert</button>
                </form>
                <h5 v-if="errorMessage">
                    {{errorMessage}}
                </h5>
                <img src="../assets/loader.gif" v-if="isLoading">
                <h3 v-else>
                    {{outputValue}}
                </h3>
            </article>
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
import units from '../conversion';
import Converter from 'unit-converter-pro';
import axios from 'axios';

export default {
    components : {Navbar},
    data(){
        return {
            tab : 1,
            tabText : "Length",
            units,
            input : "",
            output : "",
            inputValue : "",
            outputValue: "",
            currency : {},
            errorMessage : "",
            isLoading : false
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
    convertUnits(){
        if (this.inputValue && this.input.length && this.output.length){
            this.isLoading = true;        
            const key = this.tabText.toLowerCase();
            const from = this.units[key][this.input];
            const to = this.units[key][this.output];
            const value = parseFloat(this.inputValue.trim());

            try {
                let obj = {};
                switch(this.tabText){
                    case "Length": 
                        obj = new Converter.Length();
                        this.outputValue = Math.round(obj[from](value)[to]());
                        break;
                    case "Area":
                        obj= new Converter.Area();
                        this.outputValue = Math.round(obj[from](value)[to]());
                         break;
                    case "Mass":
                        obj= new Converter.Mass()
                        this.outputValue = Math.round(obj[from](value)[to]());
                        break;
                    case "Temperature":
                        obj= new Converter.Temperature()
                        this.outputValue = Math.round(obj[from](value)[to]());
                        break;
                    case "Time":
                        obj= new Converter.Temperature()
                        this.outputValue = Math.round(obj[from](value)[to]());
                        break;
                    case "Currency":
                        this.outputValue = this.currencyConverter()
                        break;
                }
                setTimeout(()=> {
                    this.isLoading = false;
                }, 1200)
            }
            catch(e){
                this.errorMessage = "Something went wrong. Try again later."
                }
            }
            else {
                this.errorMessage = "Cannot convert empty values"
            }
        },
        currencyConverter(){
            const value = parseFloat(this.inputValue);
            return value * this.currency[this.output] / this.currency[this.input]
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
        if (this.errorMessage.length > 0){
            setTimeout(()=> {
                this.errorMessage = "";
            },1500)
        }
    }
}
</script>

<style scoped>
    /* li {
        color: white;
    } */
    h2 {
        color: black;
        text-transform: uppercase;
        font-size: 2rem;
        border-bottom: 1px solid black;
        padding-bottom: 1.5rem;
    }
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

    .converter {
        background: white;
        min-height: 60vh;
        width: 70%;
        max-width: 60rem;
        margin: auto;
        border-radius: .25rem;
        box-shadow: inset 0 1px 1rem black;
        padding: 1.5rem;
    }
    form {
        height: 100%;
        background-color: red;
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
    }
</style>