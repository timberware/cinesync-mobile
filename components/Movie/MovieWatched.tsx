import React from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type MovieWatchedComponentProps = {
  movieId: string;
  watched: boolean;
  onPress?: () => void;
};

export const MovieWatched: React.FC<MovieWatchedComponentProps> = ({
  movieId,
  watched,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="p-2"
      accessibilityLabel="Toggle Watched Status"
      onPress={onPress}
    >
      <Feather name={watched ? 'eye-off' : 'eye'} size={18} color="#f7f7f7" />
    </TouchableOpacity>
  );
};
