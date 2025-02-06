import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ListPoster } from './ListPoster';
import { ListTitle } from './ListTitle';

type ListCardProps = {
  id: string;
  title: string;
  movies: number;
  sharees: number;
  imageUrl?: string;
};

export const ListItem: React.FC<ListCardProps> = ({
  id,
  title,
  movies,
  sharees,
  imageUrl,
}) => {
  return (
    <TouchableOpacity onPress={() => console.log('ListItem listId:', id)}>
      <View className="mx-auto">
        <View className="bg-secondary rounded-xl overflow-hidden p-2 w-44">
          <ListPoster src={imageUrl} movies={movies} sharees={sharees} />
          <ListTitle title={title} />
        </View>
      </View>
    </TouchableOpacity>
  );
};
