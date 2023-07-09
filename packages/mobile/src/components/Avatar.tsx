import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { theme } from '@shared/theme';

const blurHash = `|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[`;

type AvatarProps = {
  url: string;
  size?: number;
};

export function Avatar({ url, size = 40 }: AvatarProps) {
  return (
    <Image
      style={[styles.image, { width: size, height: size }]}
      source={url}
      contentFit="cover"
      placeholder={blurHash}
      transition={1000}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 99999,
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
  },
});
