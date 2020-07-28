<template>
  <main>
      <form @submit.prevent="handleSubmit">
        <h1>
            Salve 
        </h1>
        <transition name="error">
            <span v-if="error.length">{{error}}</span>
        </transition>
        <div class="input-group">
            <input 
                v-model="name"
                id="name" 
                type="text" 
                placeholder="What is your name?" 
                autocomplete="off"/>
            <label for="name">What is your name?</label>
        </div>
        <button>Submit</button>
        <small class="form-footer">
            Your data will be stored in your browser's storage. This app doesn't collect your data.
            <br>
            This app uses your browser's location for weather updates. 
            Please enable it for uninterrupted service.
        </small>
      </form>
  </main>
</template>

<script>
export default {
    data(){
        return {
            error : "",
            name : "",
        }
    },
    methods : {
        handleSubmit(){
            if (this.name.trim().length > 0){
                const data = {
                    name : this.name.trim(),
                }
                localStorage.setItem('welcome-data', JSON.stringify(data))
                this.$router.push("/home");
            }
            else{
                if (this.name.trim().length <= 0)
                    this.error = "Invalid Name";
               
                setTimeout(()=> {
                    this.error = "";
                },2000) 
            }
        }
    }
}
</script>

<style scoped>
    main {
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        background-image: linear-gradient(to right, rgba(0,0,0,.8), rgba(0,0,0,.8)), url('../assets/landing.jpg');
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    form {
        background: rgba(255,255,255,1);
        min-height: 45vh;
        width: 60%;
        max-width: 35rem;
        margin: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding:2rem  1rem;
        border-radius: .5rem;
        box-shadow: 0 1px 1.5rem black;
        position: relative;
    }
    h1 {
        font-size: 4rem;
        color: black;
        text-transform: uppercase;
        font-weight: 100;
        letter-spacing: -2px;
        margin-bottom: 2rem;
        text-shadow: 1px 1px grey;
        display: flex;
        flex-direction: column;
    }
    span{
        display: inline-block;
        margin-bottom: 1rem;
        color: orangered;
        font-size: 1.25rem;
        font-weight: bold;
        text-align: center;
    }
    .input-group{
        display: flex;
        flex-direction: column;
        margin: 1.25rem auto;
        width: 90%;
        text-align: center;
    }
    label {
        opacity: 0;
        font-size: 1.25rem;
        position: absolute;
        transition: all .3s ease-in;
    }
    input::placeholder{
        font-size: 1.25rem;
    }
    input {
        font-size: 1.5rem;
        border: none;
        padding: .25rem;
        border-bottom: 1.15px solid grey;
        transition: all .5s ease;
        outline: none;
    }
    input:focus + label{
        opacity: 1;
        transform: translateY(-100%);
        color: black;
    }
    input:focus::placeholder{
        opacity: 0;
    }
    input:focus {
        border-bottom-color: black;
    }
    button {
        margin-top: 1.2rem;
        font-size: 1.5rem;
        display: inline-block;
        padding: .5rem 1.5rem;
        color: white;
        background: black;
        text-transform: uppercase;
        outline: none;
        border: none;
        cursor: pointer;
        backface-visibility: hidden;
        transition: all .3s ease-out;
    }
    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 1.2px 1.25rem black;
    }
    button:focus {
        box-shadow: 0 1px .5rem black;
    }
    .error-enter,
    .error-leave-to {
        opacity: 0;
        transform: scale(0);
        transform-origin: top;
    }
    .error-enter-active,
    .error-leave-active {
        transition: all .5s ease-in;
    }
    .form-footer{
        position: absolute;
        bottom: 5rem;
        left: 0;
        display: block;
        text-align: center;
        width: 100%;
        font-size: 1rem;
    }
</style>