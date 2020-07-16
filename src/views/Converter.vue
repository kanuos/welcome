<template>
<main>
    <Navbar />
    <div>
        <section>
            <article class="converter">
                <h1 v-if="tabText.length > 0">
                    {{tabText}} Converter
                </h1>
            </article>
        </section>
        <aside>
            <button :class="tab == 1 && 'active'" @click="tabSelector(1)">Length</button>
            <button :class="tab== 2 && 'active'" @click="tabSelector(2)">Area</button>
            <button :class="tab== 3 && 'active'" @click="tabSelector(3)">Volume</button>
            <button :class="tab== 4 && 'active'" @click="tabSelector(4)">Mass</button>
            <button :class="tab== 5 && 'active'" @click="tabSelector(5)">Speed</button>
            <button :class="tab== 6 && 'active'" @click="tabSelector(6)">Temperature</button>
            <button :class="tab== 7 && 'active'" @click="tabSelector(7)">Time</button>
            <button :class="tab== 8 && 'active'" @click="tabSelector(8)">Currency</button>
        </aside>
    </div>
</main>
</template>

<script>
import Navbar from '../components/Navbar.vue'
export default {
    components : {Navbar},
    data(){
        return {
            tab : 1,
            tabText : "Length",
        }
    },
    methods : {
        tabSelector(tab){
            this.tab = tab;
            switch(tab){
                case 1 : this.tabText = "Length"; break;
                case 2 : this.tabText = "Area"; break;
                case 3 : this.tabText = "Volume"; break;
                case 4 : this.tabText = "Mass/Weight"; break;
                case 5 : this.tabText = "Speed"; break;
                case 6 : this.tabText = "Temperature"; break;
                case 7 : this.tabText = "Time"; break;
                case 8 : this.tabText = "Currency"; break;
                default: this.tabText = "Length"; break;
            }
        }
    }
}
</script>

<style scoped>
    li {
        color: white;
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
        display: grid;
        padding: 1.5rem;
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