import React from 'react';
import { TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

type MovieDeleteComponentProps = {
  onPress?: () => void;
};

export const MovieDelete: React.FC<MovieDeleteComponentProps> = ({
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="p-2"
      accessibilityLabel="Delete Movie"
      onPress={onPress}
    >
      <Feather name="trash-2" size={18} color="#f7f7f7" />
    </TouchableOpacity>
  );
};
