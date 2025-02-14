import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { getPosterUrl, LIST_PLACEHOLDER } from '../../constants';

type MoviePosterProps = {
  src?: string;
};

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export const MoviePoster: React.FC<MoviePosterProps> = ({ src }) => {
  return (
    <View className="relative rounded-xl mb-2 mx-auto w-full h-60">
      <Image
        style={styles.image}
        source={src ? getPosterUrl(src) : LIST_PLACEHOLDER}
        placeholder={{ blurhash }}
        contentFit="cover"
        transition={1000}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    aspectRatio: 2 / 3,
    width: '100%',
    borderRadius: 10,
  },
});
