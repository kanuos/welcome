<template>
  <div>
    <main>
      <div class="news-container">
        <Navbar />
        <div id="news">
          <NewsCard v-for="(news,index) in articles" :news="news" :key="index"/>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import NewsCard from '../components/NewsCard'

// const API_KEY = `ddf78e74832f4abb9087eae5bf4aca94`

export default {
  name: "News",
  components : {Navbar, NewsCard},
  data(){
    return {
      articles : 
    [
      {
      "source": {
      "id": null,
      "name": "TMZ"
      },
      "author": "TMZ Staff",
      "title": "Joe Jonas, Sophie Turner Welcome Baby Girl Named Willa - TMZ",
      "description": "Joe Jonas and Sophie Turner welcomed their first baby.",
      "url": "https://www.tmz.com/2020/07/27/joe-jonas-sophie-turner-welcome-baby-girl/",
      "urlToImage": "https://imagez.tmz.com/image/b0/16by9/2020/07/27/b0f1209e05464c60a3b0b1b2e4dacfdf_xl.jpg",
      "publishedAt": "2020-07-27T17:14:00Z",
      "content": "10:13 AM PT -- We're told the baby's name is Willa.\r\nJoe Jonas and Sophie Turner's 2020 just got exponentially better -- they've welcomed their first baby, and it's a girl ... TMZ has learned.\r\nThe \"… [+840 chars]"
      },
      {
      "source": {
      "id": "google-news",
      "name": "Google News"
      },
      "author": null,
      "title": "Perseverance Mars Rover Pre-Launch News Conference - NASA",
      "description": null,
      "url": "https://news.google.com/__i/rss/rd/articles/CBMiK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9VjBkdzBod0JZVHPSAQA?oc=5",
      "urlToImage": null,
      "publishedAt": "2020-07-27T17:05:49Z",
      "content": null
      },
      {
      "source": {
      "id": null,
      "name": "Variety"
      },
      "author": "Rebecca Rubin",
      "title": "‘Tenet’ Will Release Internationally Ahead of U.S. Debut - Variety",
      "description": "“Tenet” may still be able to salvage a summer release after all — at least outside of the United States. Christopher Nolan’s sci-fi thriller, from Warner Bros., will debut internationally starting on Aug. 26 before opening in select cities in North America ov…",
      "url": "https://variety.com/2020/film/box-office/tenet-release-date-international-movie-theaters-1234717187/",
      "urlToImage": "https://pmcvariety.files.wordpress.com/2020/04/tenet.jpg?w=1000",
      "publishedAt": "2020-07-27T17:00:00Z",
      "content": "“Tenet” may still be able to salvage a summer release after all — at least outside of the United States. Christopher Nolan’s sci-fi thriller, from Warner Bros., will debut internationally starting on… [+5191 chars]"
      },
      {
      "source": {
      "id": "cbs-news",
      "name": "CBS News"
      },
      "author": "Bo Erickson",
      "title": "Swastika masks worn at my Minnesota hometown Walmart. What's going on? - CBS News",
      "description": "On the first day of Minnesota's mandatory mask mandate, a man and a woman tried to make a statement about Joe Biden. Here's what happened.",
      "url": "https://www.cbsnews.com/news/swastika-masks-minnesota-walmart-customers/",
      "urlToImage": "https://cbsnews2.cbsistatic.com/hub/i/r/2020/07/26/6bdf381a-7074-4296-b9af-fbc386621a28/thumbnail/1200x630/b3350ae8b108b005eb3b013e442978c3/raphaela-mueller-nazi-masks-walmart-store-minnesota.jpg",
      "publishedAt": "2020-07-27T16:24:00Z",
      "content": "What is going on at my hometown Walmart? On Saturday, the first day of Minnesota's mandatory mask mandate, a man and a woman went shopping at the Walmart in Marshall — population 15,000 — wearing mas… [+4825 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "CNBC"
      },
      "author": "Berkeley Lovelace Jr.",
      "title": "Dr. Anthony Fauci isn't 'particularly concerned' about safety of Moderna coronavirus vaccine - CNBC",
      "description": "White House coronavirus advisor Dr. Anthony Fauci said he is \"not particularly concerned\" about the safety risk of a potential coronavirus vaccine by Moderna, despite the fact that it uses new technology to fight the virus.",
      "url": "https://www.cnbc.com/2020/07/27/dr-anthony-fauci-isnt-particularly-concerned-about-safety-of-moderna-coronavirus-vaccine.html",
      "urlToImage": "https://image.cnbcfm.com/api/v1/image/106533365-1589287080444gettyimages-1220454319.jpeg?v=1591133246",
      "publishedAt": "2020-07-27T16:24:00Z",
      "content": "White House coronavirus advisor Dr. Anthony Fauci said Monday he is \"not particularly concerned\" about the safety risk of a potential coronavirus vaccine by Moderna, despite the fact that it uses new… [+3671 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "Gizmodo.com"
      },
      "author": "Ed Cara",
      "title": "The Coronavirus May Shut Down Our Sense of Smell in an Unexpected Way - Gizmodo",
      "description": "Scientists might be closer to understanding one of the most common symptoms of even mild covid-19: the loss of smell and taste. A new study suggests that infection by the novel coronavirus can damage important cells that support the nerve cells responsible fo…",
      "url": "https://gizmodo.com/the-coronavirus-may-shut-down-our-sense-of-smell-in-an-1844518266",
      "urlToImage": "https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/jaarzx6yd5ctcledlhxp.jpg",
      "publishedAt": "2020-07-27T16:05:00Z",
      "content": "Scientists might be closer to understanding one of the most common symptoms of even mild covid-19: the loss of smell and taste. A new study suggests that infection by the novel coronavirus can damage… [+3288 chars]"
      },
      {
      "source": {
      "id": "the-washington-post",
      "name": "The Washington Post"
      },
      "author": "Erica Werner, Jeff Stein, Seung Min Kim",
      "title": "GOP, White House aim to temporarily reduce weekly unemployment benefit from $600 to $200 - The Washington Post",
      "description": "House Democrats have proposed keeping the $600 benefit in place through January, but the program is set to expire later this week; $200 would be a bridge as states move to a new system.",
      "url": "https://www.washingtonpost.com/us-policy/2020/07/27/senate-stimulus-coronavirus/",
      "urlToImage": "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://d1i4t8bqe7zgj6.cloudfront.net/07-26-2020/t_e5184b38158e42528a39b6e308e0748a_name_sunday_show_thumbnail.jpg&w=1440",
      "publishedAt": "2020-07-27T15:52:00Z",
      "content": "Senate Republicans want to reduce the $600 payment to $200 until states can implement a new approach that would pay workers 70 percent of the income they collected before they lost their jobs. The st… [+6184 chars]"
      },
      {
      "source": {
      "id": "fox-news",
      "name": "Fox News"
      },
      "author": "Barnini Chakraborty",
      "title": "Israel, Hezbollah trade fire in 'security incident' near Lebanese border - Fox News",
      "description": "The Israeli military confirmed on Monday there had been a \"security incident\" on the country's northern border with Lebanon and said its forces were engaged in \"ongoing combat\" with Hezbollah militants.",
      "url": "https://www.foxnews.com/world/israel-hezbollah-trade-fire-near-lebanese-border",
      "urlToImage": "https://cf-images.us-east-1.prod.boltdns.net/v1/static/694940094001/58190171-bdd5-476e-8114-c101243cf182/0acd7452-a178-4c69-9b31-49fbdc8de29f/1280x720/match/image.jpg",
      "publishedAt": "2020-07-27T15:41:08Z",
      "content": "The Israeli military confirmed on Monday there had been a \"security incident\" on the country's northern border with Lebanon and said its forces were engaged in \"ongoing combat\" with Hezbollah militan… [+2326 chars]"
      },
      {
      "source": {
      "id": "fox-news",
      "name": "Fox News"
      },
      "author": "Robert Gearty",
      "title": "Austin police release man who says he fatally shot protester - Fox News",
      "description": "A man who admitted fatally shooting an armed police brutality protester in Austin Saturday night was taken into custody and then released pending further investigation, the Texas city's police chief said.",
      "url": "https://www.foxnews.com/us/austin-police-release-man-who-says-he-shot-armed-protester",
      "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2020/07/gettyimages-Garrett-Foster.jpg",
      "publishedAt": "2020-07-27T15:22:23Z",
      "content": "A man who admitted to fatally shooting an armed Black Lives Matter protester in Austin on Saturday night was taken into custody and then released pending further investigation, the Texas city's polic… [+3267 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "TribLIVE"
      },
      "author": "Chris Pastrick",
      "title": "New hospitalizations for covid-19 remain low for Allegheny County - TribLIVE",
      "description": "For a fifth straight day, the Allegheny County Health Department announced a new covid-19 case count below the 200 mark. On Monday, officials reported 180 new cases, the ninth time in the past 10 days the count has been in the 100s; there were 96 cases report…",
      "url": "https://triblive.com/local/pittsburgh-allegheny/new-hospitalizations-for-covid-19-remain-low-for-allegheny-county/",
      "urlToImage": "https://triblive.com/wp-content/uploads/2020/07/2858069_web1_PTR-LO-maskDownTown016.jpg",
      "publishedAt": "2020-07-27T15:03:21Z",
      "content": "TribLIVE's Daily and Weekly email newsletters deliver the news you want and information you need, right to your inbox.\r\nFor a fifth straight day, the Allegheny County Health Department announced a ne… [+3216 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "New York Times"
      },
      "author": "Cara Giaimo",
      "title": "Can Trees Live Forever? New Kindling for an Immortal Debate - The New York Times",
      "description": "Some trees can live for thousands of years, but we may not be around long enough to really know whether they can die of old age.",
      "url": "https://www.nytimes.com/2020/07/27/science/trees-immortality.html",
      "urlToImage": "https://static01.nyt.com/images/2020/07/27/science/27TB-IMMORTALTREES1/27TB-IMMORTALTREES1-facebookJumbo.jpg",
      "publishedAt": "2020-07-27T15:02:00Z",
      "content": "Dr. Munné-Bosch points to some potential limits. For instance, the vascular tissue that ginkgos produce gets thinner and thinner each year. At some point, it could become too thin to function, killin… [+1257 chars]"
      },
      {
      "source": {
      "id": "google-news",
      "name": "Google News"
      },
      "author": null,
      "title": "The OnePlus Nord is just another mid-range smartphone. But running OxygenOS! (review) - Android Authority",
      "description": null,
      "url": "https://news.google.com/__i/rss/rd/articles/CBMiK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9NW5fWDdtQl9kQVXSAQA?oc=5",
      "urlToImage": null,
      "publishedAt": "2020-07-27T15:00:36Z",
      "content": null
      },
      {
      "source": {
      "id": "ars-technica",
      "name": "Ars Technica"
      },
      "author": "Sam Machkovech",
      "title": "Analogue Pocket’s FPGA-fueled features revealed: $200 pre-order on Aug. 3 - Ars Technica",
      "description": "More specs for Pocket’s pair of FPGA boards, plus “original display modes” feature.",
      "url": "https://arstechnica.com/gaming/2020/07/analogue-pockets-fpga-fueled-features-revealed-200-pre-order-on-aug-3/",
      "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2020/07/analogue-black-and-white-760x380.png",
      "publishedAt": "2020-07-27T15:00:00Z",
      "content": "37 with 28 posters participating, including story author\r\nAfter its reveal last October, Analogue's portable, retro powerhouse system, the Analogue Pocket, is getting closer to reaching our hands. To… [+6991 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "CBS Sports"
      },
      "author": "",
      "title": "Seahawks' Jamal Adams reportedly lobbied Cowboys players to fuel possible trade to Dallas, tanking his chances - CBS Sports",
      "description": "Seahawks' Jamal Adams reportedly lobbied Cowboys players to fuel possible trade to Dallas, tanking his chances",
      "url": "https://www.cbssports.com/nfl/news/seahawks-jamal-adams-reportedly-lobbied-cowboys-players-to-fuel-possible-trade-to-dallas-tanking-his-chances/",
      "urlToImage": "https://sportshub.cbsistatic.com/i/r/2020/07/24/6f30ad95-48f2-46f0-b5f1-c4532119705e/thumbnail/1200x675/4a4306faf759fc61210dfca3c4a886f1/new-team.jpg",
      "publishedAt": "2020-07-27T14:56:00Z",
      "content": "Jamal Adams wanted a longterm deal with the New York Jets, but when talks got tabled until 2021, he became furious. What happened next was a plastering of angst by the All-Pro safety across social me… [+4081 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "ESPN"
      },
      "author": null,
      "title": "Brooklyn Nets' Kyrie Irving commits $1.5M to help pay WNBA players who opted out - ESPN",
      "description": "Nets star Kyrie Irving is committing $1.5 million to supplement the income of WNBA players who choose not to play this season, whether because of coronavirus concerns or social justice reasons.",
      "url": "https://www.espn.com/wnba/story/_/id/29547214/brooklyn-nets-kyrie-irving-commits-15m-help-pay-wnba-players-opted-out",
      "urlToImage": "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2019%2F1024%2Fr617616_1296x729_16%2D9.jpg",
      "publishedAt": "2020-07-27T14:51:17Z",
      "content": "NEW YORK -- Kyrie Irving is helping to make sure WNBA players can sit out the season and not stress about a paycheck.\r\nThe Brooklyn Nets star is committing $1.5 million to supplement the income of pl… [+2039 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "Los Angeles Times"
      },
      "author": "Noah Bierman, Chris Megerian",
      "title": "Robert C. O’Brien, Trump's NSA director, has COVID-19 - Los Angeles Times",
      "description": "Robert O'Brien, Trump's national security advisor, is the highest-ranking presidential aide to get the virus.",
      "url": "https://www.latimes.com/politics/story/2020-07-27/trump-national-security-advisor-tests-positive-covid-19",
      "urlToImage": "https://ca-times.brightspotcdn.com/dims4/default/8e8fb18/2147483647/strip/true/crop/4579x2404+0+325/resize/1200x630!/quality/90/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F4b%2Fd6%2F57acf3b54ffb83951d2f7eaa43c5%2Fvirus-outbreak-national-security-adviser-01621.jpg",
      "publishedAt": "2020-07-27T14:36:00Z",
      "content": "National security advisor Robert OBrien has tested positive for COVID-19, the White House announced Monday, making him the highest-ranking member of President Trumps inner circle known to have contra… [+5235 chars]"
      },
      {
      "source": {
      "id": "fox-news",
      "name": "Fox News"
      },
      "author": "Stephanie Nolasco",
      "title": "Prince William feared Prince Harry was ‘blindsided by lust’ for Meghan Markle, leading to rift, book claims - Fox News",
      "description": "Prince William allegedly infuriated Prince Harry after advising his younger brother to slow down his relationship with Meghan Markle, fearing he was “blindsided by lust.”",
      "url": "https://www.foxnews.com/entertainment/prince-william-prince-harry-blindsided-by-lust",
      "urlToImage": "https://a57.foxnews.com/media2.foxnews.com/BrightCove/694940094001/2019/02/05/931/524/694940094001_5998834282001_5998838959001-vs.jpg?ve=1&tl=1",
      "publishedAt": "2020-07-27T14:32:36Z",
      "content": "Prince William allegedly infuriated Prince Harry after advising his younger brother to slow down his relationship with Meghan Markle, fearing he was “blindsided by lust.”\r\nThe claim is being made in … [+6475 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "BBC News"
      },
      "author": "https://www.facebook.com/bbcnews",
      "title": "Coronavirus: UK in talks with Spain over air bridges for Balearic and Canary Islands - BBC News",
      "description": "A government source says no immediate decision is expected as No 10 warns \"no travel is risk free\".",
      "url": "https://www.bbc.com/news/business-53552888",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/212F/production/_113659480_majorca_rtr.jpg",
      "publishedAt": "2020-07-27T14:26:15Z",
      "content": "Image copyrightReuters\r\nTalks are under way with Spain about easing quarantine rules for the Balearic and Canary Islands, a government source has said.\r\nThe potential move would mean people arriving … [+6014 chars]"
      },
      {
      "source": {
      "id": "cnn",
      "name": "CNN"
      },
      "author": "Brian Fung, CNN",
      "title": "Google will let employees work from home until at least next summer - CNN",
      "description": "Google will let employees work from home until at least July 2021, a company spokesperson said on Monday.",
      "url": "https://www.cnn.com/2020/07/27/tech/google-work-from-home-extension/index.html",
      "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/200727100550-google-ny-offices-file-super-tease.jpg",
      "publishedAt": "2020-07-27T14:25:00Z",
      "content": "(CNN)Google(GOOG) will let employees work from home until at least July 2021, a company spokesperson said on Monday.\r\nThe company had previously said most employees would be working remotely through … [+994 chars]"
      },
      {
      "source": {
      "id": null,
      "name": "Billboard"
      },
      "author": "Glenn Rowley",
      "title": "Taylor Swift Gifted Kobe Bryant's Daughter a 'Folklore' Cardigan - Billboard",
      "description": "",
      "url": "https://www.billboard.com/articles/columns/pop/9424927/natalia-bryant-receives-cardigan-taylor-swift-folklore",
      "urlToImage": "https://static.billboard.com/files/2020/07/03-taylor-swift-cr-Beth-Garrabrant-press-photo-2020-billboard-1548-1595547189-1024x677.jpg",
      "publishedAt": "2020-07-27T14:03:56Z",
      "content": "An act of kindness. On Saturday (July 25), Vanessa Bryant took to social media to reveal Taylor Swift sent her daughter, Natalia, a cardigan from her latest line of Folklore merch.\r\n\"Thank you @taylo… [+843 chars]"
}
]
      }
  },
  created(){

  }
}
</script>

<style scoped>
  p.text {
    font-size: 3rem;
    color: white;
  }
  .news-container {
    position: absolute;
    top: 0;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
  #news {
    margin: 5rem 2rem 2rem 2rem;
    height: 90vh;
    width: 90vw;
    max-width: 120rem;
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
</style>
