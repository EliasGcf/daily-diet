import { MotiView } from 'moti';
import { StyleSheet, View } from 'react-native';

import { Dot } from '@components/Dot';
import { Text } from '@components/ui/Text';

import type { Meal } from '@lib/api';

import { theme } from '@shared/theme';
import { formatTime } from '@shared/utils/format-time';

type MealProps = {
  meal: Meal;
};

export function Meal({ meal }: MealProps) {
  const formattedHour = formatTime(new Date(meal.date));

  return (
    <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.container}>
      <Text size="xs" weight="bold">
        {formattedHour}
      </Text>

      <View style={styles.verticalLine} />

      <Text size="md" color="gray.200" numberOfLines={1} style={styles.title}>
        {meal.name}
      </Text>

      <Dot
        size={14}
        color={meal.isOnDiet ? theme.colors.green.mid : theme.colors.red.mid}
      />
    </MotiView>
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
