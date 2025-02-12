import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import { ListType } from '../../types';
import { useListContext } from '../../app/list/context/ListContext';
import { ListsPoster } from './ListsPoster';
import { ListsTitle } from './ListsTitle';

type ListsItemProps = {
  list: ListType;
};

export const ListsItem: React.FC<ListsItemProps> = ({ list }) => {
  const { setSelectedList, selectedList } = useListContext();

  const handlePress = () => {
    setSelectedList({
      id: list.id,
      name: list.name,
      isPrivate: list.isPrivate,
      creatorId: list.creatorId,
    });
  };

  return (
    <Link href={`/list/${list.id}`} asChild onPress={handlePress}>
      <TouchableOpacity>
        <View className="mx-auto">
          <View className="bg-secondary rounded-xl overflow-hidden p-2 w-44">
            <ListsPoster
              src={list.posterUrl}
              movies={list.movies}
              sharees={list.sharees}
            />
            <ListsTitle title={list.name} />
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};
