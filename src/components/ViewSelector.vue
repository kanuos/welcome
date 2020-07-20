<template>
  <form>
    <div>
        <input type="radio" name="view" id="1" value="all" v-model="value"/>
        <span></span>
        <label for="1">All Tasks</label>
    </div>
    <div>
        <input type="radio" name="view" id="2" value="inc" v-model="value"/>
        <span></span>
        <label for="2">Incomplete Tasks</label>
    </div>
    <div>
        <input type="radio" name="view" id="3" value="com" v-model="value"/>
        <span></span>
        <label for="3">Completed Tasks</label>
    </div>
  </form>
</template>

<script>
export default {
    name : "ViewSelector",
    props : ['view'],
    data(){
        return  {
            value : "all" 
        }
    },
    created(){
        this.view(this.value);
    },
    updated(){
        this.view(this.value);
    }
}
</script>

<style scoped>
    form{
        margin: 0 auto;
        width: 100%;
        display: flex;
        justify-content: space-around;
        max-width: 40rem;
        background: white;
        padding: 1rem 0;
        border-bottom-left-radius: .25rem;
        border-bottom-right-radius: .25rem;
    }
    div {
        display: flex;
        align-items: center;
    }
    label {
        display: inline-block;
        padding-left: .5rem;
        font-size: 1.5rem;
        text-transform: capitalize;
    }
</style>