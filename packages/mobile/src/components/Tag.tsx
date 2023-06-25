import { StyleSheet, View } from 'react-native';

import { theme } from '../shared/theme';
import { Dot } from './Dot';
import { Text } from './ui/Text';

type TagProps = {
  title: string;
  color: string;
};

export function Tag({ title, color }: TagProps) {
  return (
    <View style={styles.container}>
      <Dot size={8} color={color} />
      <Text size={Text.size.sm} color="gray.100">
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[600],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 10000,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
  },
});
