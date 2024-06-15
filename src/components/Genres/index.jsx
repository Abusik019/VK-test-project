import styles from './style.module.css'

export const Genres = ({ genres }) => {
  return (
    <ul className={styles.genresList}>
        {genres && (
            genres.map(genre => (
                genre.genre && (
                  <li key={genre.id}>
                    <input type='checkbox'/>
                    <label>{genre.genre}</label>
                  </li>
                )
            ))
        )}
    </ul>
  )
}
