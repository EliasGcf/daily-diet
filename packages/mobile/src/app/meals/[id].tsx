import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Pencil, Trash } from 'phosphor-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '../../components/Button';
import { ConfirmDeleteDialog } from '../../components/ConfirmDeleteDialog';
import { Dialog } from '../../components/Dialog';
import { Tag } from '../../components/Tag';
import { Text } from '../../components/ui/Text';
import { MEALS } from '../../shared/meals';
import { theme } from '../../shared/theme';

type Params = {
  id: string;
};

type Stage = 'dialog-open' | 'dialog-closed' | 'deleting';

export default function ViewMeal() {
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams() as Params;
  const [stage, setStage] = useState<Stage>('dialog-closed');

  const meal = MEALS.find((fMeal) => fMeal.id === params.id);

  if (!meal) {
    return router.replace('/404');
  }

  function handleDelete() {
    setStage('deleting');

    setTimeout(() => {
      setStage('dialog-closed');
    }, 1000);
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: safeAreaInsets.top + 12 },
        meal.isOnDiet
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
            {meal.title}
          </Text>
          <Text color="gray.200" size="md">
            {meal.description}
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Text color="gray.100" weight="bold" size="sm">
            Data e hora
          </Text>
          <Text color="gray.200" size="md">
            12/08/2022 às 16:00
          </Text>
        </View>

        {meal.isOnDiet ? (
          <Tag title="dentro da dieta" color={theme.colors.green.dark} />
        ) : (
          <Tag title="fora da deita" color={theme.colors.red.dark} />
        )}

        <View style={[styles.footer]}>
          <Button icon={Pencil} title="Editar refeição" />

          <Dialog.Root
            open={stage === 'dialog-open'}
            onOpenChange={(isOpen) => setStage(isOpen ? 'dialog-open' : 'dialog-closed')}
          >
            <Dialog.Portal center>
              <ConfirmDeleteDialog handleConfirm={handleDelete} />
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
