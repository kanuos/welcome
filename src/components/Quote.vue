<template>
<transition name="fade">
    <blockquote v-if="quote">
        <section>
            {{quote.quote}}
        </section>
        <span>
            {{quote.author}}
        </span>
    </blockquote>
</transition>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            quote : undefined
        }
    },
    methods : {
        async getQuoteOfDay(){
            const response = await axios({
                url : `https://quotes.rest/qod?language=en`
            });
            const {data} = response;
            const quote = data.contents.quotes[0];
            this.quote = quote;
            const storedData = JSON.parse(localStorage.getItem('welcome-data'));
            storedData.Quote = {quote : quote.quote, author : quote.author, time : Date.now()}
            localStorage.setItem('welcome-data',JSON.stringify(storedData))
        }
    },
    created(){
        const storedData = JSON.parse(localStorage.getItem('welcome-data'));
        if (storedData.Quote){
            if ((Date.now() - storedData.Quote.time)/(3600000) > 10 )
                this.getQuoteOfDay();
            else 
                this.quote = storedData.Quote
        }
        else 
            this.getQuoteOfDay();
    }
}
</script>

<style scoped>
    blockquote{
        background: white;
        width: 90%;
        max-width: 40rem;
        margin: 5rem auto 2rem auto;
        font-size: 1.5rem;
        display: flex;
        flex-direction: column;
    }
    section {
        text-align: left;
        border-left: 4px solid black;
        padding: .25rem 1rem;
        margin: 1rem 1rem 0 1rem;
        font-style: italic;
    }
    span {
        padding: 0 2rem 2rem 0;
        display: block;
        text-align: right;
    }
    .fade-enter,
    .fade-leave-to{
        opacity: 0;
        transform: scale(0) translateX(100%);
        transform-origin: right;
    }
    .fade-enter-active,
    .fade-leave-active{
        transition: all .4s ease;
    }
</style>