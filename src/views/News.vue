<template>
  <div>
    <main>
      <div class="news-container">
        <Navbar />
        <h1>
          Search News On the Go
        </h1>
    
    
        <form @submit.prevent="handleSubmit" class="search-group">
          <input type="text" v-model="keyword" placeholder="Search News">
          <button type="submit">Search</button>
        </form>
    
        <h1 v-if="isError">
          {{errorMessage}}
        </h1>
        <div id="news" v-else-if="isLoaded">
          <NewsCard v-for="(news,index) in articles" :news="news" :key="index"/>
        </div>
        <div else>
            <Loader/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard'
import Loader from '../components/Loader'
import axios from 'axios'
const API_KEY = `ddf78e74832f4abb9087eae5bf4aca94`
const CORS = `https://cors-anywhere.herokuapp.com/`
const DEFAULT_URL = `${CORS}https://newsapi.org/v2/top-headlines?category=general&apiKey=${API_KEY}`

export default {
  name: "News",
  components : {Navbar, NewsCard, Loader},
  data(){
    return {
      keyword : "",
      isLoaded : false,
      isError : false,
      errorMessage : "",
      searchCount : 0,
      articles : [],
      }
  },
  methods : {
    handleSubmit(){
      if (!this.keyword.trim()){
        this.isError = true;
        this.errorMessage = "Empty search not allowed"
      }
      else {
        this.requestNews(this.keyword.trim())
      }
    },
    async requestNews(keyword){
      const url = keyword ? `${CORS}https://newsapi.org/v2/everything?qInTitle=${keyword}&apiKey=${API_KEY}` : DEFAULT_URL;
      this.searchCount++;
      sessionStorage.setItem('welcome-count', {
        searchCount : this.searchCount
      })

      if (this.searchCount < 100){
        const response = await axios(url);
        if (response.status === 200){
          const {data} = response;
          const {articles} = data 
          console.log(articles)
          if (articles){
            const session = JSON.parse(localStorage.getItem('welcome-data'))
            session.articles = articles;
            session.articleFetchTime = new Date(Date.now()).toDateString();
            localStorage.setItem('welcome-data', JSON.stringify(session))
            this.articles = articles
            this.isLoaded = true
            this.isError = false;
          }
        }
        else {
          this.isError = true;
          this.errorMessage = "Something went wrong."
        }
      }
      else {
        this.errorMessage = "Maximum request limit reached. Please try again tomorrow."
        this.isError = true;
      }
    }
  },
  created(){
    // check session storage
    const {articles} = JSON.parse(localStorage.getItem('welcome-data'));
    const searchCount = sessionStorage.getItem('welcome-count')
    if (articles){
      // get current date
      const timeNow = new Date(Date.now()).toDateString();
      if (timeNow === articles.articleFetchTime){
        this.articles = articles;
        this.isLoaded = true;
        this.searchCount = searchCount >0 ? searchCount : 0
        this.isError = false;
      }
      else {
        sessionStorage.removeItem('welcome-count')
        this.requestNews(undefined);
      }
    }
    else {
      sessionStorage.removeItem('welcome-count')
      this.requestNews(undefined);
    }
  }
}
</script>

<style scoped>
  h1, h6 {
    margin: 2rem 0;
    color: white;
  }
  p.text {
    font-size: 3rem;
    color: white;
  }
  .news-container {
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    padding: 1rem 0;
    overflow: hidden;
  }
  #news {
    height: 86vh;
    width: 90vw;
    max-width: 120rem;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(28rem, 1fr));
    gap: 1rem;
    overflow-y: auto;
  }
  #news::-webkit-scrollbar {
      width: .5rem;
      border-radius: .25rem;
  }
  #news::-webkit-scrollbar-track {
      background: black;
  }
  #news::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,.5);
      cursor: pointer;
      border-radius: .25rem;
      transition: all .4s ease;
  }
  #news::-webkit-scrollbar-thumb:hover {
      background: white;
  }
  .search-group{
    background: white;
    display: flex;
    width: 70%;
    max-width: 60rem;
    margin: 0 auto 1.5rem auto;
    padding: .75rem 1rem;
    border-radius: .25rem;
  }
  .search-group > input {
    border: none;
    outline: none;
    border-bottom: 1.25px solid lightgrey;
    flex: 7;
    transition: all .4s ease;
  }
  .search-group > button {
    flex: 1;
    cursor: pointer;
    background: black;
    color: lightgrey;
    text-transform: uppercase;
    border-color: black;
    outline: none;
    margin-left: .5rem;
    transition: all .4s ease;
    text-decoration: underline;
    text-decoration-color: transparent;
    padding: .25rem;
  }
  .search-group > button:hover{
    text-decoration-color: white;
  }
  .search-group > input:focus {
    border-bottom-color: black;
  }
  .search-group > input:focus + button{
      color: white;
      text-decoration-color: white;
  }
</style>
