<template>
  <div>
    <main>
      <Navbar />
      <h1>This is news page</h1>
    </main>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
 
export default {
  name: "News",
  components : {Navbar},
  data(){
    return {

    }
  },
  created(){

  }
}
</script>