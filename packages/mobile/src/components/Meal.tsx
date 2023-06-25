import { StyleSheet, View } from 'react-native';

import { theme } from '../shared/theme';
import { formatTime } from '../shared/utils/format-time';
import { Dot } from './Dot';
import { Text } from './ui/Text';

type MealProps = {
  meal: {
    title: string;
    date: Date;
    isOnDiet: boolean;
  };
};

export function Meal({ meal }: MealProps) {
  const formattedHour = formatTime(meal.date);

  return (
    <View style={styles.container}>
      <Text size="xs" weight="bold">
        {formattedHour}
      </Text>

      <View style={styles.verticalLine} />

      <Text size="md" color="gray.200" numberOfLines={1} style={styles.title}>
        {meal.title}
      </Text>

      <Dot
        size={14}
        color={meal.isOnDiet ? theme.colors.green.mid : theme.colors.red.mid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.colors.gray[500],
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: theme.colors.white,
  },

  verticalLine: {
    width: 1,
    backgroundColor: theme.colors.gray[400],
    height: 14,
  },

  title: {
    flex: 1,
  },
});