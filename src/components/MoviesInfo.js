import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from './MoviesInfo.module.css'

const fetchMovies = async (url) => {
  const results = await Promise.all(url.map(async (url) => axios.get(url)));
  return results.map((result) => result.data);
};

const MoviesInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieData = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/films/${id}/`);
        const moviesData = response.data;
        setLoading(true);

        const [characters, planets, species, starships, vehicles] = await Promise.all([
          fetchMovies(moviesData.characters),
          fetchMovies(moviesData.planets),
          fetchMovies(moviesData.species),
          fetchMovies(moviesData.starships),
          fetchMovies(moviesData.vehicles),
        ]);

        setMovie({
          ...moviesData,
          characters,
          planets,
          species,
          starships,
          vehicles,
        });
      } catch (error) {
        console.error(error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    getMovieData();
  }, [id]);
  

    return (
      <>
        <header>
          <button onClick={() => navigate(-1)}>Back to list</button>
  
          <h2>{movie.title}</h2>
          <p>Director: {movie.director}</p>
          <p>Producer: {movie.producer}</p>
        </header>
  
        <section className={styles.section}>
          <h4 className={styles.heading}>Description</h4>
          <hr className={styles.hr} />
          <p>{movie.opening_crawl}</p>
        </section>
  
        <section className={styles.section}>
          <h4 className={styles.heading}>Characters</h4>
          <hr className={styles.hr} />
          <ul>
            {movie.characters?.map((character) => (
              <li key={character.url}>{character.name}</li>
            ))}
          </ul>
        </section>
  
        <section className={styles.section}>
          <h4 className={styles.heading}>Planets</h4>
          <hr className={styles.hr} />
          <ul>
            {movie.planets?.map((planet) => (
              <li key={planet.url}>{planet.name}</li>
            ))}
          </ul>
        </section>
  
        <section className={styles.section}>
          <h4 className={styles.heading}>Species</h4>
          <hr className={styles.hr} />
          <ul>
            {movie.species?.map((specie) => (
              <li key={specie.url}>{specie.name}</li>
            ))}
          </ul>
        </section>
  
        <section className={styles.section}>
          <h4 className={styles.heading}>Starships</h4>
          <hr className={styles.hr} />
          <ul>
            {movie.starships?.map((starship) => (
              <li key={starship.url}>{starship.name}</li>
            ))}
          </ul>
        </section>
  
        <section className={styles.section}>
          <h4 className={styles.heading}>Vehicles</h4>
          <hr className={styles.hr} />
          <ul>
            {movie.vehicles?.map((vehicle) => (
              <li key={vehicle.url}>{vehicle.name}</li>
            ))}
          </ul>
        </section>
  
        {loading && <div className={styles.loader}>Loading...</div>}
      </>
    );

};
export default MoviesInfo;
