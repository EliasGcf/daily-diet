import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { ArrowUpRight, Plus } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '../../components/Avatar';
import { Box } from '../../components/Box';
import { Button } from '../../components/Button';
import { Meal } from '../../components/Meal';
import { Text } from '../../components/ui/Text';

const MEALS = [
  {
    id: '1',
    title: 'Pão com ovo',
    isOnDiet: true,
    date: new Date('2021-09-10T13:00:00'),
  },
  {
    id: '2',
    title: 'Panqueca',
    isOnDiet: false,
    date: new Date('2021-09-10T14:00:00'),
  },
  {
    id: '3',
    title: 'Omelete',
    isOnDiet: true,
    date: new Date('2021-09-11T13:00:00'),
  },
  {
    id: '4',
    title: 'Tapioca',
    isOnDiet: true,
    date: new Date('2021-09-12T13:00:00'),
  },
];

export default function HomePage() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <Text>Logo</Text>
        <Avatar url="https://github.com/eliasgcf.png" />
      </View>

      <Box brand="green" icon={ArrowUpRight}>
        <Text weight="bold" size="2xl" color="gray.100">
          90,86%
        </Text>

        <Text size="sm" color="gray.200">
          das refeições dentro da dieta
        </Text>
      </Box>

      <View style={styles.listHeader}>
        <Text color="gray.100">Refeições</Text>
        <Button title="Nova refeição" icon={Plus} />
      </View>

      <FlashList
        data={MEALS}
        estimatedItemSize={65700}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item, index }) => {
          const isFirstOfTheDay =
            index === 0 || item.date.getDate() !== MEALS[index - 1].date.getDate();

          if (isFirstOfTheDay) {
            return (
              <View style={{ gap: 8, marginTop: 32 }}>
                <Text size="lg" weight="bold" color="gray.100">
                  {dayjs(item.date).format('DD.MM.YYYY')}
                </Text>
                <Meal meal={item} />
              </View>
            );
          }

          return <Meal meal={item} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },

  listHeader: {
    marginTop: 40,
    gap: 8,
  },
});
