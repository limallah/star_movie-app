import React from 'react';
import classes from './Movie.module.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Movie = (props) => {
  console.table(props);
  return (
    <li className={classes.movie} style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(/starwar-images/new-hope-2.jpg)"}}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <p>{props.director}</p>
      <span><a href={`/movies/${props.mid}`}>More Info</a></span>
    </li>

  );
};

function MovieDetail(props) {
  const [movie, setMovie] = useState(null);
  const movieId = props.match.params.id;

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`https://swapi.dev/api/films/${movieId}/`);
      const data = await res.json();
      setMovie(data);
    }
    fetchData();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>Director: {movie.director}</p>
      <p>Producer: {movie.producer}</p>
      <p>Release date: {movie.release_date}</p>
      <h3>Characters</h3>
      <ul>
        {movie.characters.map((character) => (
          <li key={character}>{character}</li>
        ))}
      </ul>
      <h3>Planets</h3>
      <ul>
        {movie.planets.map((planet) => (
          <li key={planet}>{planet}</li>
        ))}
      </ul>
      <h3>Starships</h3>
      <ul>
        {movie.starships.map((starship) => (
          <li key={starship}>{starship}</li>
        ))}
      </ul>
      <Link to="/">Back to movie list</Link>
    </div>
  );
};
export default Movie;
