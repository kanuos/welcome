<template>
  <article class="news" v-if="Object.keys(news)">
		<header>
			<figure>
				<img class="news-image" :src="news.urlToImage">
				<figcaption>
					{{news.source.name}}
				</figcaption>
			</figure>
		</header>
		<section>
			<div class="article-info">
				<span class="date">{{formattedDate}}</span>
				<span class="author">{{news.author}}</span>
			</div>
			<h1 class="title">
				{{news.title | newsTitle}}
			</h1>
			<p class="summary">
				{{news.content | limitWords}}
			</p>
			<div class="link-box">				
				<a :href="news.url" 
				target="_blank" 
				class="news-link">
					<span class="link-text">
						Read More
					</span>
					<span class="link-icon">
						&raquo;					
					</span>
				</a>
			</div>
		</section>
	</article>
</template>

<script>
export default {
    name: "NewsCard",
    props : ['news'],
    computed : {
        formattedDate(){
            if (this.news && this.news.publishedAt){
                const day = new Date(this.news.publishedAt).toDateString();
                return day;
            }
            return ""
        }
	},
	filters : {
		newsTitle(title){
			return title.split("-")[0]
		},
		limitWords(sentence){
			console.log(sentence.length)
			if (sentence.length > 160){
				return `${sentence.slice(0,160)}...`
			}	
			return sentence
		}
	}
}
</script>

<style scoped>
.news {
    background: white;
	height: 40rem;
	width: 25rem;
	margin: 4rem auto;
    border: none;
	border-radius: .75rem;
	box-shadow: 0 1px .5rem grey;
	display: grid;
	grid-template-rows: 20rem 20rem;
	overflow: hidden;
	cursor: default;
	backface-visibility: hidden;
	transform: translateZ(0);
	transition: all .4s ease-in;
}
.news:hover{
	box-shadow: 0 1px 1rem lightgrey;
}
.news > header {
	grid-row: 1/1;
	height: 100%;
	width: 25rem;
}
.news > header > figure {
	height: 100%;
	width: 100%;
	position: relative;
	overflow: hidden;
}
figcaption {
	position: absolute;
	top: 5%;
	left: 5%;
	text-transform: uppercase;
	color: white;
	background-color: orangered;
	padding: .25rem .5rem;
	font-size: 1.15rem;
}
.news-image{
	display: block;
    width: 100%;
    height: 100%;
	object-fit: cover;
	object-position: center;
    filter: grayscale(100%);
    transition: all .4s ease;
}
.news-image:hover{
    transform: scale(1.1);
    filter: grayscale(0%);
}

/*CARD BODY SECTION*/
.news > section {
	grid-row: 2/2;
	height: 100%;
	padding: 1rem 2rem;
	display: grid;
	grid-template-rows: 2rem 1fr 2fr 4rem;
}
.article-info{
	grid-row: 1/1;
	color: grey;
	display: flex;
	justify-content: flex-start;
	-ms-align-items: center;
	align-items: center;
	font-size: 1rem;
}
.date {
	flex-basis: 25%;
}
.author {
	text-transform: capitalize;
	padding-left: 1.25rem;
}
.title {
	grid-row: 2/2;
	font-size: 1.75rem;
	text-transform: capitalize;
    text-align: left;
    word-wrap: break-word;
}
p.summary {
	font-size: 1.25rem;
	margin: 1rem 0;
	color: lightgrey;
	transition: color .4s ease;
	padding: 0;
	text-align: left;
}
p.summary:hover {
	color: grey;
}
.link-box {
	display: flex;
	justify-content: flex-start;
	-ms-align-items: center;
	align-items: center;
	width: max-content;
}
.link-box > * {
	text-decoration: none;
	padding: .25rem .5rem;
	font-size: 1.5rem;
	color: teal;
	transition: all .4s ease; 
}
.link-box > *:hover {
	color: white;
	background: teal;
}
</style>