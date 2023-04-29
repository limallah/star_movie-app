import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie} style={{ backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)), url(/starwar-images/new-hope-2.jpg)"}}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <span><a href='#'>More Info</a></span>
    </li>
  );
};
export default Movie;
