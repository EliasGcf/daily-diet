import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import { ArrowUpRight, Plus } from 'phosphor-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Logo from '@assets/logo.svg';

import { Avatar } from '@components/Avatar';
import { Box } from '@components/Box';
import { Button } from '@components/Button';
import { ConfirmDialog } from '@components/ConfirmDialog';
import { Dialog } from '@components/Dialog';
import { Meal } from '@components/Meal';
import { Text } from '@components/ui/Text';

import { useAuth, useUser } from '@hooks/useAuth';
import { useMeals } from '@hooks/useMeals';

import { MEALS } from '@shared/meals';
import { theme } from '@shared/theme';

const IS_ON_DIET = true;

export default function HomePage() {
  const [dialogOpen, setDialogOpen] = useState<'signout' | null>(null);
  const meals = useMeals();

  const { signOut } = useAuth();
  const user = useUser();
  const { top } = useSafeAreaInsets();

  const avatarURL =
    user.avatar || `https://ui-avatars.com/api/?background=EFF0F0&name=${user.name}`;

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <Logo />

        <Dialog.Root
          open={dialogOpen === 'signout'}
          onOpenChange={(isOpen) => setDialogOpen(isOpen ? 'signout' : null)}
        >
          <Dialog.Trigger style={styles.profile}>
            <Text weight="bold">{user.name.split(' ')[0]}</Text>
            <Avatar url={avatarURL} />
          </Dialog.Trigger>

          <Dialog.Portal center>
            <ConfirmDialog
              title="Deseja realmente sair?"
              confirmText="Sim, sair"
              onConfirm={() => {
                signOut();
                setDialogOpen(null);
              }}
            />
          </Dialog.Portal>
        </Dialog.Root>
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

      {meals.isLoading && (
        <ActivityIndicator style={{ marginTop: 40 }} color={theme.colors.green.dark} />
      )}

      <FlashList
        data={meals.data}
        estimatedItemSize={65700}
        // eslint-disable-next-line react/no-unstable-nested-components
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        renderItem={({ item, index }) => {
          const isFirstOfTheDay =
            index === 0 ||
            new Date(item.date).getDate() !== MEALS[index - 1].date.getDate();

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
