import React, { useEffect,  useState } from 'react'
import NewsItems from './NewsItems'
import Spinner2 from './Spinner2';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


const News = (props) => {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }


  const updateNews = async () => {
    props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8520834ae9c14bf0a52e845226d8cb19&page=1&pageSize=${props.pageSize}`;
    setLoading(true)
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    
    props.setProgress(100);
  }
  useEffect(()=>{
    updateNews()
  },[])

  const fetchMoreData = async () => {
   setPage(page + 1 )
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=8520834ae9c14bf0a52e845226d8cb19&page=${page + 1}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setTimeout(() => {
      setArticles(articles.concat(parsedData.articles))
      setTotalResults(parsedData.totalResults)
    }, 500)
  };



    return (
      <>
        
          <h1 className=' my-5 '>DailyNews - Top {capitalizeFirstLetter(props.category)} headlines</h1>
          {loading && <Spinner2 />}
          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length != totalResults}
            loader={<Spinner2 />}>
              <div className="container">
            <div className="row" >
              {articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 86) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })}
            </div>
            </div>
          </InfiniteScroll>
       

      </>
    )
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general"
}
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}
export default News
