
import styles from '@/styles/Home.module.css'
import { Toolbar } from '@/components/toolbar'


// displays on the home page
export default function Home() {
  return (
  <div className='page-container'>
    <Toolbar />
    <div className={styles.main}>
     <h1>News App</h1>

     <h3>The best news App with the latest news</h3>
    </div>
  </div>
  )
}
