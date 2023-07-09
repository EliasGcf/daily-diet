import dayjs from 'dayjs';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Pencil, Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@components/Button';
import { ConfirmDialog } from '@components/ConfirmDialog';
import { Dialog } from '@components/Dialog';
import { Tag } from '@components/Tag';
import { Text } from '@components/ui/Text';

import { useDeleteMeal, useMeal } from '@hooks/useMeals';

import { theme } from '@shared/theme';

type Stage = 'dialog-open' | 'dialog-closed' | 'deleting';

export default function MealDetail() {
  const safeAreaInsets = useSafeAreaInsets();
  const params = useLocalSearchParams<'/(private)/meals/[id]/'>();
  const [stage, setStage] = useState<Stage>('dialog-closed');

  const query = useMeal(params.id);
  const deleteMealMutation = useDeleteMeal(params.id);

  async function handleDelete() {
    setStage('deleting');

    await deleteMealMutation.mutateAsync();

    router.replace('meals');
  }

  if (!query.data || query.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={theme.colors.green.dark} />
      </View>
    );
  }

  const formattedDate = dayjs(query.data.date).format('DD/MM/YYYY [às] HH:mm');

  return (
    <View
      style={[
        styles.container,
        { paddingTop: safeAreaInsets.top + 12 },
        query.data.isOnDiet
          ? { backgroundColor: theme.colors.green.light }
          : { backgroundColor: theme.colors.red.light },
      ]}
    >
      <View style={styles.header}>
        <RectButton style={styles.goBackButton} onPress={router.back}>
          <ArrowLeft size={24} color={theme.colors.gray[200]} />
        </RectButton>

        <Text color="gray.100" weight="bold" size="lg">
          Refeição
        </Text>
      </View>

      <View style={[styles.content, { paddingBottom: safeAreaInsets.bottom + 12 }]}>
        <View style={{ gap: 8 }}>
          <Text color="gray.100" weight="bold" size="xl">
            {query.data.name}
          </Text>
          <Text color="gray.200" size="md">
            {query.data.description}
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text color="gray.100" weight="bold" size="sm">
            Data e hora
          </Text>
          <Text color="gray.200" size="md">
            {formattedDate}
          </Text>
        </View>

        {query.data.isOnDiet ? (
          <Tag title="dentro da dieta" color={theme.colors.green.dark} />
        ) : (
          <Tag title="fora da deita" color={theme.colors.red.dark} />
        )}

        <View style={[styles.footer]}>
          <Link asChild href={`/meals/${params.id}/edit`}>
            <Button icon={Pencil} title="Editar refeição" />
          </Link>

          <Dialog.Root
            open={stage === 'dialog-open'}
            onOpenChange={(isOpen) => setStage(isOpen ? 'dialog-open' : 'dialog-closed')}
          >
            <Dialog.Portal center>
              <ConfirmDialog
                title="Deseja realmente excluir o registro da refeição?"
                confirmText="Sim, excluir"
                onConfirm={handleDelete}
              />
            </Dialog.Portal>

            <Dialog.Trigger asChild>
              <Button
                isLoading={stage === 'deleting'}
                onPress={() => setStage('dialog-open')}
                icon={Trash}
                variant="outline"
                title="Excluir refeição"
              />
            </Dialog.Trigger>
          </Dialog.Root>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 24,
  },

  goBackButton: {
    position: 'absolute',
    left: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
  },

  content: {
    flex: 1,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
    gap: 24,
  },

  footer: {
    marginTop: 'auto',
    gap: 8,
  },
});
