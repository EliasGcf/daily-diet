import { StyleSheet, Text, View } from 'react-native';

import { theme } from '../shared/theme';
import { formatTime } from '../shared/utils/format-time';
import { Dot } from './Dot';

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
      <Text style={styles.hour}>{formattedHour}</Text>
      <View style={styles.verticalLine} />
      <Text style={styles.title} numberOfLines={1}>
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
  },

  hour: {
    fontFamily: theme.fonts.bold,
    fontSize: theme.fontSizes.xs,
  },

  verticalLine: {
    width: 1,
    backgroundColor: theme.colors.gray[400],
    height: 14,
  },

  title: {
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
    color: theme.colors.gray[200],
    flex: 1,
  },
});
