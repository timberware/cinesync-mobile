import React, { useRef } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { View, Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Feather from '@expo/vector-icons/Feather';
import { MovieType } from '../../types';
import { getPosterUrl } from '../../constants';
import { MovieWatched } from './MovieWatched';
import { MovieDelete } from './MovieDelete';
import { MoviePoster } from './MoviePoster';
import { useListMovies } from '../../hooks/useListMovies';

type MovieItemProps = {
  movie: MovieType;
};

export const MovieItem: React.FC<MovieItemProps> = ({ movie }) => {
  const { id } = useLocalSearchParams();
  const swipeableRef = useRef<any>(null);
  const { deleteMovie, toggleWatched } = useListMovies(id.toString());

  const watchedToast = (title: string) => {
    Toast.show({
      type: 'success',
      text1: `${movie.watched ? 'Marked as Unwatched' : 'Marked as Watched'}`,
      text2: `${title}`,
    });
  };

  const deleteToast = (title: string) => {
    Toast.show({
      type: 'error',
      text1: 'Removed from list',
      text2: `${title}`,
    });
  };

  const renderLeftActions = () => {
    return (
      <View className="w-20 flex justify-center items-center">
        {movie.watched ? (
          <Feather name="eye-off" size={24} color="green" />
        ) : (
          <Feather name="eye" size={24} color="green" />
        )}

        <Text className="text-text mt-1 text-center">
          {movie.watched ? 'Mark Unwatched' : 'Mark Watched'}
        </Text>
      </View>
    );
  };

  const renderRightActions = () => {
    return (
      <View className="w-20 flex justify-center items-center bg-transparent">
        <Feather name="trash" size={24} color="red" />
        <Text className="text-text mt-1 text-center">Remove</Text>
      </View>
    );
  };

  const handleSwipeableOpen = async (
    direction: 'left' | 'right',
    title: string,
  ) => {
    if (direction === 'left') {
      await toggleWatched(movie.id);
      watchedToast(title);
    }

    if (direction === 'right') {
      await deleteMovie(movie.id);
      deleteToast(title);
    }

    swipeableRef.current?.reset();
  };

  const handleSwipeableClose = () => {
    swipeableRef.current?.reset();
  };

  const handleWatchedButtonPress = async (title: string) => {
    swipeableRef.current?.openLeft();
    await toggleWatched(movie.id);
    watchedToast(title);
    swipeableRef.current?.reset();
  };

  const handleDeleteButtonPress = async (title: string) => {
    swipeableRef.current?.openRight();
    await deleteMovie(movie.id);
    deleteToast(title);
    swipeableRef.current?.reset();
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeableRef}
        friction={1}
        leftThreshold={40}
        rightThreshold={40}
        renderLeftActions={renderLeftActions}
        renderRightActions={renderRightActions}
        onSwipeableOpen={(direction, swipeable) =>
          handleSwipeableOpen(direction, movie.title)
        }
        onSwipeableClose={handleSwipeableClose}
      >
        <View className="relative flex flex-row bg-secondary p-3 rounded-xl mb-4">
          <View className="w-44 mr-3 rounded-xl overflow-hidden">
            <MoviePoster
              watched={movie.watched}
              src={getPosterUrl(movie.posterUrl)}
            />
          </View>

          <View className="flex-1">
            <Text className="text-sm mb-1 text-text">
              <Text className="font-bold">Title: </Text>
              {movie.title}
            </Text>
            <Text className="text-sm mb-1 text-text">
              <Text className="font-bold">Genre: </Text>
              {movie.genre.join(', ')}
            </Text>
            <Text className="text-sm mb-1 text-text">
              <Text className="font-bold">Released: </Text>
              {new Date(movie.releaseDate).getFullYear()}
            </Text>
            <Text className="text-sm mb-1 text-text">
              <Text className="font-bold">Rating: </Text>
              {movie.rating.toFixed(1)}
            </Text>
            <Text className="text-sm text-text">
              <Text className="font-bold">Description: </Text>
              {movie.description}
            </Text>
          </View>

          <View className="absolute bottom-2 left-2 px-1 py-0.5 rounded-xl bg-accent">
            <MovieWatched
              watched={movie.watched}
              onPress={() => handleWatchedButtonPress(movie.title)}
            />
          </View>
          <View className="absolute bottom-2 right-2">
            <View className="px-1 py-0.5 rounded-xl bg-accent">
              <MovieDelete
                onPress={() => handleDeleteButtonPress(movie.title)}
              />
            </View>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  );
};
