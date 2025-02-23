import React from 'react';
import { View } from 'react-native';
import { Poster } from '../shared/Poster';

type MoviePosterProps = {
  src?: string;
  watched: boolean;
};

export const MoviePoster: React.FC<MoviePosterProps> = ({ src, watched }) => {
  return (
    <View
      className={`relative rounded-xl mb-2 mx-auto w-full h-60 ${watched ? '' : 'opacity-25'}`}
    >
      <Poster src={src} />
    </View>
  );
};
