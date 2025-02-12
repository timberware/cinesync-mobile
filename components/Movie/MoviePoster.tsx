import React from 'react';
import { View } from 'react-native';
import { Poster } from '../shared/Poster';

type MoviePosterProps = {
  src?: string;
};

export const MoviePoster: React.FC<MoviePosterProps> = ({ src }) => {
  return (
    <View className="relative rounded-xl mb-2 mx-auto w-full h-60">
      <Poster src={src} />
    </View>
  );
};
