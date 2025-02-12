import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import { useListContext } from './context/ListContext';
import { BackHeader } from '../../components/Navigation/BackHeader';
import { useListMovies } from '../../hooks/useListMovies';
import { MovieContainer } from '../../components/Movie/MovieContainer';

export const List = () => {
  const { id: listId } = useLocalSearchParams();
  const { movies } = useListMovies(listId.toString());
  const { selectedList, setSelectedList } = useListContext();

  return (
    <>
      <BackHeader />
      <SafeAreaView className="flex-1 bg-background">
        <View className="p-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-text">
            {selectedList?.name}
          </Text>

          <View className="flex-row space-x-4">
            <TouchableOpacity className="rounded-xl p-2">
              <Feather name="edit" size={20} color="#f7f7f7" />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-xl p-2">
              <Entypo name="add-to-list" size={20} color="#f7f7f7" />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-xl p-2">
              <Feather name="share-2" size={20} color="#f7f7f7" />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-xl p-2">
              <Feather name="lock" size={20} color="#f7f7f7" />
            </TouchableOpacity>
            <TouchableOpacity className="rounded-xl p-2">
              <Feather name="trash" size={20} color="#f7f7f7" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="px-3 rounded-xl">
          <MovieContainer movies={movies} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default List;
