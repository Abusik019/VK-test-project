import styles from './style.module.css'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <ul className={styles.header}>
        <li><img src={logo} alt='logo'/></li>
        <li className={styles.navbar}>  
          <NavLink to='/'><div>Главная</div></NavLink>
          <NavLink to='/films'><div>Фильмы</div></NavLink>
          <NavLink to='/favorites'><div>Избранное</div></NavLink>
        </li>
    </ul>
  )
}
