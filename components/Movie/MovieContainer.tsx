import React from 'react';
import { View } from 'react-native';
import { MovieType } from '../../types';
import { MovieItem } from './MovieItem';

type MovieContainerProps = {
  movies: MovieType[];
};

export const MovieContainer: React.FC<MovieContainerProps> = ({ movies }) => {
  return (
    <View>
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </View>
  );
};
