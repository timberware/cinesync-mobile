import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { getPosterUrl } from '../../constants';
import { LIST_PLACEHOLDER, BLUR_HASH } from '../../constants';

type PosterProps = {
  src?: string;
  movies: number;
  sharees: number;
};

export const ListPoster: React.FC<PosterProps> = ({ src, movies, sharees }) => {
  return (
    <View className="relative rounded-xl mb-2 mx-auto w-full h-60">
      <Image
        style={styles.image}
        source={src ? getPosterUrl(src) : LIST_PLACEHOLDER}
        placeholder={{ BLUR_HASH }}
        contentFit="cover"
        transition={1000}
      />
      <View className="absolute px-4 rounded-xl top-1.5 left-1.5 bg-secondary opacity-70 flex-row items-center">
        <FontAwesome6 name="video" size={12} color="white" />
        <Text className="text-white ml-1.5">{`${movies}`}</Text>
        {sharees > 0 ? (
          <>
            <FontAwesome6
              name="users"
              size={12}
              color="white"
              className="ml-2"
            />
            <Text className="text-white ml-1.5">{`${sharees}`}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    borderRadius: 10,
  },
});
