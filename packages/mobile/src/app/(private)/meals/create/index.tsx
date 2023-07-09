import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@components/Button';
import { MealForm, MealFormData, mealFormSchema } from '@components/MealForm';
import { Text } from '@components/ui/Text';

import { useCreateMeal } from '@hooks/useMeals';

import { theme } from '@shared/theme';

export default function CreatePage() {
  const safeAreaInsets = useSafeAreaInsets();
  const createMealMutation = useCreateMeal();

  const form = useForm<MealFormData>({
    resolver: zodResolver(mealFormSchema),
    defaultValues: {
      date: new Date(),
      time: new Date(),
    },
  });

  async function handleSubmit(formData: MealFormData) {
    formData.date.setHours(formData.time.getHours());
    formData.date.setMinutes(formData.time.getMinutes());
    formData.date.setSeconds(0);
    formData.date.setMilliseconds(0);

    const isOnDiet = formData.onDiet === 'on-diet';

    await createMealMutation.mutateAsync({
      name: formData.name,
      description: formData.description,
      date: formData.date,
      isOnDiet,
    });

    router.replace({
      pathname: '/meals/create/feedback',
      params: { isOnDiet },
    });
  }

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top + 12 }]}>
      <View style={styles.header}>
        <RectButton style={styles.goBackButton} onPress={router.back}>
          <ArrowLeft size={24} color={theme.colors.gray[200]} />
        </RectButton>

        <Text color="gray.100" weight="bold" size="lg">
          Nova refeição
        </Text>
      </View>

      <View style={[styles.content, { paddingBottom: safeAreaInsets.bottom + 12 }]}>
        <MealForm form={form} />

        <View style={styles.footer}>
          <Button
            onPress={() => form.handleSubmit(handleSubmit)()}
            title="Cadastrar refeição"
            isLoading={form.formState.isSubmitting}
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
