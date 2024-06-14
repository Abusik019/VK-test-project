import styles from './style.module.css'
import logo from '../../assets/logo.png'

export const Header = () => {
  return (
    <ul className={styles.header}>
        <li><img src={logo} alt='logo'/></li>
        <li className={styles.navbar}>  
          <div>Главная</div>
          <div>Фильмы</div>
          <div>Избранное</div>
        </li>
    </ul>
  )
}
