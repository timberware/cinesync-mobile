import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { getPosterUrl, LIST_PLACEHOLDER, BLUR_HASH } from '../../constants';

interface PosterProps {
  src?: string;
}

export const Poster = ({ src }: PosterProps) => {
  return (
    <Image
      style={styles.image}
      source={src ? getPosterUrl(src) : LIST_PLACEHOLDER}
      placeholder={{ BLUR_HASH }}
      contentFit="cover"
      transition={1000}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    width: '100%',
    borderRadius: 10,
  },
});
