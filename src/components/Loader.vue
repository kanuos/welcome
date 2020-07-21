<template>
    <figure>
        <h4 v-if="message">
            {{message}}
        </h4>
        <h4 v-else>
            Loading
        </h4>
        <img src="../assets/loader.gif" >
    </figure>
</template>

<script>
export default {
    name: "Loader",
    props : ["message"]
}
</script>

<style>
    img {
        display: block;
        height: 10rem;
        width: 10rem;
        margin: auto;
        object-fit: cover;
        object-position: center;
    }
    h4 {
        text-align: center;
        text-transform: uppercase;
        margin-bottom: -3.5rem;
        font-size: 1.5rem;
    }
</style>