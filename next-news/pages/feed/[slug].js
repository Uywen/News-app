import styles from "../../styles/Feed.module.css"
import { useRouter } from "next/router"
import { Toolbar } from "@/components/toolbar"

// the function that runs my news feed
export const Feed = ({pageNumber, articles}) =>{
    
    // used to route to different pages
    const router = useRouter()
    
    return (
      <div className="page-container">
        {/* displays the navbar  */}
        <Toolbar />
  
         {/* if you click on the heading of the article you will be taken to the article webpage */}
        {/* used to render information on webpage */}
          <div className={styles.main}>
         {articles.map((article,index) => (
            <div key={index} className={styles.post}>
                <h1 onClick={() =>(window.location.href = article.url)}>{article.title}</h1>
                <p>Author: {article.author}</p>
                <p>{article.description}</p>
                {!!article.urlToImage && <img src={article.urlToImage} />}
            </div>
         ))}
         </div>

         {/* used to navigate to the previous page on a feed */}
         {/* you will not be able to got to the previous page once on page 1 */}
         {/* it minuses from each page number to go to the previous one */}
         <div className={styles.paginator}>
         <div onClick={() => {
            if(pageNumber > 1){
             router.push(`/feed/${pageNumber - 1}`)
            }
         }} className={pageNumber === 1 ? styles.disabled : styles.active}>
            Previous page
         </div>

         {/* displays the page number */}
         <div>
            #{pageNumber}
         </div>

         {/* used to navigate to the next page */}
         {/* the news feed will only render a max of 5 pages */}
         {/* once on page 5 you will not be able to go to the next page */}
         <div onClick={() => {
            if(pageNumber < 5){
             router.push(`/feed/${pageNumber + 1}`)
            }
         }} className={pageNumber === 5 ? styles.disabled : styles.active}>
            Next Page
         </div>
         </div>
        </div>
    )
}

// used to set how many page numbers can be displayed
export const getServerSideProps = async pageContext => {
    const pageNumber =pageContext.query.slug;
    
    if(!pageNumber || pageNumber < 1 || pageNumber >5){
        return{
            props: {
                articles: [],
                pageNumber : 1
            }
        }
    }

    // the api that i used to fetch the data from
    // api key is in the .env file
    const apiResponse = await fetch(
        `https://newsapi.org/v2/everything?q=apple&from=2023-02-06&to=2023-02-06&sortBy=popularity&pageSize=5&page=${pageNumber}`,
        {
          headers:{
            Authorization:`Bearer ${process.env.NEXT_PUBLIC_NEWS_KEY}`
          }
        }
    )
    // displays the information in json format
    const apiJson = await apiResponse.json()

    // renders the information in the pageNumbers
    const {articles} = apiJson;

    return{
        props:{
            articles,
            pageNumber: Number.parseInt(pageNumber)
        }
    }
}

export default Feed