<template>
    <transition name="appear">
    <div class="container">
        <span id="close" @click="close()">&times;</span>
        <section v-if="list.length > 0">
            <h3 class="underline">
                Let the bot decide for you
            </h3>
            <ul>
                <li>
                    <span class="key">
                        Total Tasks
                    </span>
                    <span class="value">
                        {{list.length}}
                    </span>
                </li>
                <li>
                    <span class="key">
                        Tasks completed  
                    </span>
                    <span 
                        class="value"
                        :class="completeCount > 0 ? 'complete' : 'faded'">
                        {{completeCount}} 
                    </span>
                </li>
                <li>
                    <span class="key">
                        Tasks incomplete 
                    </span>
                    <span 
                        class="value" 
                        :class="list.length - completeCount > 0 ? 'incomplete' : 'faded'">
                        {{list.length - completeCount}}
                    </span>
                </li>
            </ul>
            <form class="radio-form" data-legend="MODE">
                <div>
                    <input 
                        type="radio" 
                        name="mode" 
                        v-model="mode" 
                        value="easy" 
                        id="easy">
                    <label for="easy">Easy First</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="mode" 
                        v-model="mode" 
                        value="hard" 
                        id="hard">
                    <label for="hard">Hard First</label>
                </div>
                <div>
                    <input 
                        type="radio" 
                        name="mode" 
                        v-model="mode" 
                        value="all" 
                        id="all">
                    <label for="all">I'm Feeling Lucky</label>
                </div>
            </form>
            <article v-if="isCalculating">
                <h6>
                    Loading
                </h6>
                <img src="../assets/loader.gif">
            </article>
            <h3 v-show="result" class="result">
                Task title : "
                <span>
                    {{result}}
                </span>
                "
            </h3>
        </section>
        <section v-else>
            You have no tasks left!! 
            <p>
                You have completed all {{list.length}}
            </p>
        </section>
        </div>
    </transition>
</template>

<script>
export default {
    name : "Indecision",
    props : ['list',"close"],
    data(){
        return {
            completeCount : 0,
            mode : "",
            result : "",
            isCalculating : false
        }
    },
    created(){
        let  count=0;
        this.list.forEach(element => {
            if (element.isComplete) count++;
        });
        this.completeCount = count;
    },
    methods : {
        easyMode(){
            let easyArray = [...this.list];
            easyArray.sort((a,b) => b.priority - a.priority);
            easyArray = easyArray.slice(0, easyArray.length / 2);
            return easyArray[Math.floor(Math.random() * easyArray.length)]
        },
        hardMode(){
            let hardArray = [...this.list];
            hardArray.sort((a,b) => a.priority - b.priority);
            hardArray = hardArray.slice(0, hardArray.length / 2);
            return hardArray[Math.floor(Math.random() * hardArray.length)]
        },
        luckyMode(){
            let array = [...this.list];
            return array[Math.floor(Math.random() * array.length)]

        },
        calculateResult(){
            this.isCalculating = true;
            let result;
            switch(this.mode){
                case "easy":
                    result = this.easyMode();
                    break;
                case "hard":
                    result = this.hardMode();
                    break;
                default:
                    result = this.luckyMode();
                    break;
            }
            setTimeout(()=> {
                this.isCalculating = false;
                this.result = result.task;
                this.mode = "";
                setTimeout(()=> {
                    this.result = "";
                }, 2500)
            }, 1800);
        }
    },
    updated() {
        if (this.mode.length > 0){
            this.calculateResult();
        }
    }
}
</script>

<style scoped>
    .appear-enter, .appear-leave-to {
        opacity: 0;
        transform: scale(0);
        transform-origin: center;
    }
    .appear-enter-active, .appear-leave-active {
        transition: all .4s ease;
    }
    .container{
        position: fixed;
        width: 100vw;
        background: rgba(0,0,0,.87);
        height: 100vh;
        display: flex;
        top: 0;
        left: 0;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    section {
        background: white;
        padding: 2rem;
        border-radius: .25rem;
        box-shadow: 0 1px 1rem black;
        height: 50vh;
        width: 70vw;
        max-width: 60rem;
        min-height: 30rem;
    }

    #close {
        font-size: 4.5rem;
        position: absolute;
        top: 2rem;
        right: 3rem;
        color: white;
        filter: brightness(50%);
        cursor: pointer;
        transition: all .4s ease;
        transform: translateZ(0);
        backface-visibility: hidden;
        z-index: 150;
    }
    #close:hover {
        transform: scale(1.1) translateZ(0);
        transform-origin: center;
        filter: brightness(100%);
    }
    h3 {
        font-size: 2rem;
        text-transform: uppercase;
        padding-bottom: .5rem;
        margin-bottom: 2rem;
    }
    .underline {
        border-bottom: 1px solid black;
    }
    ul{
        list-style-type: none;
    }
    li {
        display:flex;
        width: 50%;
        justify-content: space-between;
        align-items: center;
        margin: auto;
    }
    .key,.value {
        font-size: 1.5rem;
        color: black;
        font-weight: bolder;
    }
    .faded {
        color: grey;
    }
    .incomplete {
        color: orangered;
    }
    .complete {
        color: teal;
    }
    .radio-form {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-top: 3rem;
        padding: 2rem 1rem;
        border: 1px solid grey;
        border-radius: .5rem;
        position: relative;
    }
    .radio-form::after {
        position: absolute;
        content: attr(data-legend);
        font-size: 1.5rem;
        color: black;
        top: -3%;
        padding: .5rem;
        background: white;
        right: 3%;
        transform: translateY(-50%);
    }
    article {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        position: relative;
    }
    article > h6 {
        position: absolute;
        top: 20%;
        font-size: 1.2rem;
        text-transform: uppercase;
    }
    .result {
        margin-top: 3rem;
        font-size: 2rem;
        text-transform: uppercase;
    }
    .result > span {
        background-image: linear-gradient(to right, orangered, black);
        background-clip: text;
        color: transparent;
    }
</style>