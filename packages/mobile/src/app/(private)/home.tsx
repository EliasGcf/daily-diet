import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import { ArrowUpRight, Plus } from 'phosphor-react-native';
import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Logo from '@assets/logo.svg';

import { Avatar } from '@components/Avatar';
import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Meal } from '@components/Meal';
import { Text } from '@components/ui/Text';

import { useUser } from '@hooks/useAuth';
import { useMeals } from '@hooks/useMeals';
import { useMetrics } from '@hooks/useMetrics';

import { theme } from '@shared/theme';

export default function HomePage() {
  const mealsQuery = useMeals();
  const metricsQuery = useMetrics();

  const user = useUser();
  const { top, bottom } = useSafeAreaInsets();

  const avatarURL =
    user.avatar || `https://ui-avatars.com/api/?background=EFF0F0&name=${user.name}`;

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <Logo />

        <Link asChild href="/profile">
          <Pressable style={styles.profile}>
            <Text weight="bold">{user.name.split(' ')[0]}</Text>
            <Avatar url={avatarURL} />
          </Pressable>
        </Link>
      </View>

      {metricsQuery.data ? (
        <Link href="/statistics" asChild>
          <RectButton activeOpacity={0}>
            <Box
              brand={metricsQuery.data?.isOnDiet ? 'green' : 'red'}
              icon={ArrowUpRight}
            >
              <Text weight="bold" size="3xl" color="gray.100">
                {metricsQuery.data?.percentage}%
              </Text>

              <Text size="sm" color="gray.200">
                das refeições dentro da dieta
              </Text>
            </Box>
          </RectButton>
        </Link>
      ) : (
        <ActivityIndicator
          style={{ marginVertical: 20 }}
          color={theme.colors.green.dark}
        />
      )}

      <View style={styles.listHeader}>
        <Text color="gray.100">Refeições</Text>
        <Link asChild href="/meals/create/">
          <Button title="Nova refeição" icon={Plus} />
        </Link>
      </View>

      {(mealsQuery.isLoading || mealsQuery.isFetching) && (
        <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.green.dark} />
      )}

      <FlashList
        data={mealsQuery.data}
        estimatedItemSize={65700}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: bottom }}
        renderItem={({ item, index }) => {
          const isFirstOfTheDay =
            index === 0 ||
            new Date(item.date).getDate() !==
              new Date(mealsQuery.data![index - 1].date).getDate();

          const Item = (
            <Link asChild href={`/meals/${item.id}/`}>
              <TouchableOpacity activeOpacity={0.7}>
                <Meal meal={item} />
              </TouchableOpacity>
            </Link>
          );

          if (isFirstOfTheDay) {
            return (
              <View style={{ gap: 8, marginTop: 32 }}>
                <Text size="lg" weight="bold" color="gray.100">
                  {dayjs(item.date).format('DD.MM.YYYY')}
                </Text>

                {Item}
              </View>
            );
          }

          return Item;
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

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  listHeader: {
    marginTop: 40,
    gap: 8,
  },
});
