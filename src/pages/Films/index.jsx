import styles from './style.module.css';
import { useEffect } from 'react';
import { getFilms } from '../../store/slices/films';
import { useDispatch, useSelector } from "react-redux";

function Films() {
  const dispatch = useDispatch();
  const films = useSelector((state) => state.films.list);
  const loading = useSelector((state) => state.films.loading);
  const error = useSelector((state) => state.films.error);
  const { docs } = films;

  console.log(docs);

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  if (error) return <h2>{error}</h2>;

  if (loading === false && films.length === 0) {
    return <h1>No data</h1>;
  }

  return (
    <div className={styles.films}>
      {/* <ul className={styles.filmsList}>
        {docs && (
          docs.map(film => (
            <li key={film.id}>{film.name ? film.name : 'No name film'}</li>
          ))
        )}
      </ul> */}
    </div>
  );
}

export default Films;
