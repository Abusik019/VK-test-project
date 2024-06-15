import styles from './style.module.css'
import spiderman from '../../assets/spiderman.png'
import { NavLink } from 'react-router-dom'

function Home() {
  return (
    <div className={styles.main}>
        <h1 onMouseOver={() => {
          const spiderImage = document.getElementById('spiderman');
          spiderImage.classList.add(styles.active);
        }} onMouseOut={() => {
          const spiderImage = document.getElementById('spiderman');
          spiderImage.classList.remove(styles.active);
        }}>ПРИВЕТ</h1>
        <img id='spiderman' className={styles.spiderman} src={spiderman} alt="Spiderman"/>
        <p>
          У нас на сайте вы можете ознакомиться с большим ассортиментом фильмов. Найдите фильм под свои критерии с помощью наших фильтров, и наслаждайтесь просмотром. А если вам приглянуться несколько фильмов, то вы можете добавить их в избранное.
        </p>
        <NavLink to='/films'><button className={styles.toFilmsBtn}>К фильмам</button></NavLink>
    </div>
  )
}

export default Home
