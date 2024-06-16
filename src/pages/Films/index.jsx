import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getFilms, getFilmsByRating, getGenres, clearFilms } from '../../store/slices/films'; 
import styles from './style.module.css';
import openArrow from '../../assets/open-arrow.png';
import closeArrow from '../../assets/close-arrow.png';
import { NavLink } from 'react-router-dom';
import { Genres } from '../../components/Genres';
import RatingRange from '../../components/RatingRange';
import DateRange from '../../components/DateRange';
import { ratingConvertor } from '../../components/RatingConvertor/index.js';

function Films() {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.list);
  const { genres } = useSelector((state) => state.films.genres);
  const loading = useSelector((state) => state.films.loading);
  const error = useSelector((state) => state.films.error);
  const { items, total } = films;
  const [openGenre, setOpenGenre] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [convertRating, setConvertRating] = useState({ ratingFrom: 0, ratingTo: 0 });

  const handleRatingChange = (value) => {
    setRating(value);
    const converted = ratingConvertor(value);
    setConvertRating(converted);
  };

  const handleFilterChange = () => {
    console.log(convertRating);
    dispatch(clearFilms());
    dispatch(getFilmsByRating({ rating: convertRating, page: 1 })); 
    setCurrentPage(1); 
  };

  const handleResetFilters = () => {
    setCurrentPage(1); 
    dispatch(clearFilms()); 
    dispatch(getFilms(1));
  };

  useEffect(() => {
    dispatch(clearFilms());
    dispatch(getFilms(currentPage));
    dispatch(getGenres());
  }, [dispatch, currentPage]);

  if (error) return <h2>{error}</h2>;

  if (loading === false && items?.length === 0) {
    return <h1>No data</h1>;
  }

  const handleNextPage = () => {
    if (items.length < 40) return;
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
          <div
            className={styles.genre}
            style={{ backgroundImage: openGenre ? `url(${openArrow})` : `url(${closeArrow})` }}
            onClick={() => setOpenGenre(!openGenre)}
          >
            Жанр
          </div>
          {openGenre && <Genres genres={genres} />}
          <div
            className={styles.rating}
            style={{ backgroundImage: openRating ? `url(${openArrow})` : `url(${closeArrow})` }}
            onClick={() => setOpenRating(!openRating)}
          >
            Рейтинг
          </div>
          {openRating && <RatingRange onChange={handleRatingChange} />}
          <div
            className={styles.date}
            style={{ backgroundImage: openDate ? `url(${openArrow})` : `url(${closeArrow})` }}
            onClick={() => setOpenDate(!openDate)}
          >
            Дата выхода
          </div>
          {openDate && <DateRange />}
          <section className={styles.filtersBtnContainer}>  
            <button onClick={handleResetFilters} className={styles.resetChanges}>Сбросить изменения</button>
            <button onClick={handleFilterChange} className={styles.confirmChanges}>Найти</button>
          </section>
        </div>
        <div className={styles.filmsListContainer}>
          <ul className={styles.filmsList}>
            {items && items.map((film, index) => (
              <li key={index}>
                <img src={film.posterUrl} alt={film.nameRu ? film.nameRu : film.nameOriginal} />
                <NavLink to="#">{film.nameRu ? film.nameRu : film.nameOriginal}</NavLink>
                <h1>{film.year}</h1>
                <div className={styles.ratingFilm}>{film.ratingKinopoisk}</div>
              </li>
            ))}
          </ul>
          <div className={styles.pagination}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Назад</button>
            <span>Страница {currentPage}</span>
            <button onClick={handleNextPage} disabled={items?.length < 40 || items?.length >= total}>Вперед</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Films;
