import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFilms, getGenres } from '../../store/slices/films';
import styles from './style.module.css';
import openArrow from '../../assets/open-arrow.png';
import closeArrow from '../../assets/close-arrow.png';
import { NavLink } from 'react-router-dom';
import { Genres } from '../../components/Genres';
import RatingRange from '../../components/RatingRange';

function Films() {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.list);
  const {genres} = useSelector((state) => state.films.genres);
  const loading = useSelector((state) => state.films.loading);
  const error = useSelector((state) => state.films.error);
  const { items } = films;
  const [openGenre, setOpenGenre] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  console.log(items);
  console.log(genres);

  useEffect(() => {
    dispatch(getFilms(currentPage));
    dispatch(getGenres());
  }, [dispatch, currentPage]);

  if (error) return <h2>{error}</h2>;

  if (loading === false && items?.length === 0) {
    return <h1>No data</h1>;
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={styles.films}>
      <h1>Все фильмы</h1>
      <div className={styles.filmsContent}>
        <div className={styles.category}>
          <div className={styles.genre} style={{ backgroundImage: openGenre ? `url(${openArrow})` : `url(${closeArrow})` }} onClick={() => setOpenGenre(openGenre ? false : true)}>Жанр</div>
          {openGenre && <Genres genres={genres}/>}
          <div className={styles.rating} style={{ backgroundImage: openRating ? `url(${openArrow})` : `url(${closeArrow})` }} onClick={() => setOpenRating(openRating ? false : true)}>Рейтинг</div>
          {openRating && <RatingRange />}
          <div className={styles.date} style={{ backgroundImage: openDate ? `url(${openArrow})` : `url(${closeArrow})` }} onClick={() => setOpenDate(openDate ? false : true)}>Дата выхода</div>
          <button>Найти</button>
        </div>
        <div className={styles.filmsListContainer}>
          <ul className={styles.filmsList}>
            {items && (
              items.map((film, index) => (
                <li key={index}>
                  <img src={film.posterUrl}/>
                  <NavLink>{film.nameRu ? film.nameRu : film.nameOriginal}</NavLink>
                  <h1>{film.year}</h1>
                  <div className={styles.ratingFilm}>{film.ratingKinopoisk}</div>
                </li>
              ))
            )}
          </ul>
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Назад</button>
            <span>Страница {currentPage}</span>
            <button onClick={handleNextPage} disabled={items?.length < 40}>Вперед</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Films;
