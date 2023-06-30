import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import { ArrowUpRight, Plus } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Logo from '@assets/logo.svg';

import { Avatar } from '@components/Avatar';
import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { Meal } from '@components/Meal';
import { Text } from '@components/ui/Text';

import { useAuth } from '@hooks/useAuth';

import { MEALS } from '@shared/meals';

const IS_ON_DIET = true;

export default function HomePage() {
  const { signOut } = useAuth();
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <Logo />
        <TouchableOpacity onPress={signOut}>
          <Avatar url="https://github.com/eliasgcf.png" />
        </TouchableOpacity>
      </View>

      <Link href="/statistics" asChild>
        <RectButton activeOpacity={0}>
          <Box brand={IS_ON_DIET ? 'green' : 'red'} icon={ArrowUpRight}>
            <Text weight="bold" size="3xl" color="gray.100">
              90,86%
            </Text>

            <Text size="sm" color="gray.200">
              das refeições dentro da dieta
            </Text>
          </Box>
        </RectButton>
      </Link>

      <View style={styles.listHeader}>
        <Text color="gray.100">Refeições</Text>
        <Link asChild href="/create/">
          <Button title="Nova refeição" icon={Plus} />
        </Link>
      </View>

      <FlashList
        data={MEALS}
        estimatedItemSize={65700}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item, index }) => {
          const isFirstOfTheDay =
            index === 0 || item.date.getDate() !== MEALS[index - 1].date.getDate();

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

  listHeader: {
    marginTop: 40,
    gap: 8,
  },
});
