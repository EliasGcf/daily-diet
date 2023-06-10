import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { theme } from '../shared/theme';

const blurHash = `|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[`;

type AvatarProps = {
  url: string;
};

export function Avatar({ url }: AvatarProps) {
  return (
    <Image
      style={styles.image}
      source={url}
      contentFit="cover"
      placeholder={blurHash}
      transition={1000}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.gray[200],
  },
});
