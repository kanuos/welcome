<template>
    <transition name="appear">
        <div class="container">
            <span id="close" @click="close()">&times;</span>
        <section v-if="list.length > 0">
            <ul>
                <li>Total Tasks      : {{list.length}}</li>
                <li>Tasks completed  : {{completeCount}}</li>
                <li>Tasks incomplete : {{list.length - completeCount}}</li>
            </ul>
            <form>
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
            <article v-if="result.length > 0">
                You should start with "{{result}}"
            </article>
            <!-- <article v-else>
                <img src="../assets/loader.gif">
            </article> -->
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
            mode : "random",
            result : ""
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

        },
        hardMode(){

        },
        randomMode(){

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
        color: white;
    }
</style>