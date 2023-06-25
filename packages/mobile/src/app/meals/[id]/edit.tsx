import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@components/Button';
import { Select } from '@components/Select';
import { TextInput } from '@components/TextInput';
import { Text } from '@components/ui/Text';

import { MEALS } from '@shared/meals';
import { theme } from '@shared/theme';

type Params = {
  id: string;
};

export default function EditPage() {
  const params = useLocalSearchParams() as Params;
  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();

  const meal = MEALS.find((fMeal) => fMeal.id === params.id)!;

  const [isOnDiet, setIsOnDiet] = useState<boolean>(meal.isOnDiet);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit() {
    setIsLoading(true);

    // TODO: update meal, show toast, and navigate back

    setTimeout(() => {
      setIsLoading(false);
      router.back();
    }, 1000);
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top + 12 }]}>
      <View style={styles.header}>
        <RectButton style={styles.goBackButton} onPress={router.back}>
          <ArrowLeft size={24} color={theme.colors.gray[200]} />
        </RectButton>

        <Text color="gray.100" weight="bold" size="lg">
          Editar refeição
        </Text>
      </View>

      <View style={[styles.content, { paddingBottom: safeAreaInsets.bottom + 12 }]}>
        <TextInput label="Nome" defaultValue={meal.title} />
        <TextInput label="Descrição" multiline defaultValue={meal.description} />

        <View style={styles.formTime}>
          <View style={{ flex: 1 }}>
            <TextInput
              label="Data"
              placeholder="DD/MM/YYYY"
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={meal.date
                .toLocaleDateString()
                .split('/')
                .map((date) => date.padStart(2, '0'))
                .join('/')}
            />
          </View>

          <View style={{ flex: 1 }}>
            <TextInput
              label="Hora"
              placeholder="hh:mm"
              autoCapitalize="none"
              autoCorrect={false}
              defaultValue={meal.date
                .toLocaleTimeString()
                .split(':')
                .map((date) => date.padStart(2, '0'))
                .join(':')
                .replace(':00 PM', '')
                .replace(':00 AM', '')}
            />
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text color="gray.200" weight="bold" size="sm">
            Está dentro da dieta?
          </Text>

          <View style={{ flexDirection: 'row', gap: 8 }}>
            <Select
              value
              onPress={() => setIsOnDiet(true)}
              selected={isOnDiet === true}
            />
            <Select
              onPress={() => setIsOnDiet(false)}
              value={false}
              selected={isOnDiet === false}
            />
          </View>
        </View>

        <View style={[styles.footer]}>
          <Button
            isLoading={isLoading}
            onPress={handleSubmit}
            title="Salvar alterações"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[500],
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
    backgroundColor: theme.colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 40,
    gap: 24,
  },

  formTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },

  footer: {
    marginTop: 'auto',
  },
});
