import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { RadioGroup } from '@components/RadioGroup';
import { OnDietSelect } from '@components/Select';
import { Text } from '@components/ui/Text';

import { useCreateMeal } from '@hooks/useMeals';

import { theme } from '@shared/theme';

const inputFormSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  description: z.string({ required_error: 'Descrição é obrigatória' }),
  date: z.date(),
  time: z.date(),
  onDiet: z.enum(['on-diet', 'off-diet'], {
    required_error: 'É preciso informar um dos valores.',
  }),
});

type FormData = z.infer<typeof inputFormSchema>;

export default function CreatePage() {
  const safeAreaInsets = useSafeAreaInsets();
  const createMealMutation = useCreateMeal();

  const form = useForm<FormData>({
    resolver: zodResolver(inputFormSchema),
    defaultValues: {
      date: new Date(),
      time: new Date(),
    },
  });

  async function handleSubmit(formData: FormData) {
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

    router.push({
      pathname: '/create/feedback',
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
        <Form.TextInput label="Nome" name="name" control={form.control} />
        <Form.TextInput
          label="Descrição"
          name="description"
          multiline
          control={form.control}
        />

        <View style={styles.formTime}>
          <View style={{ flex: 1 }}>
            <Form.DatePicker
              name="date"
              control={form.control}
              mode="date"
              label="Data"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Form.DatePicker
              name="time"
              control={form.control}
              mode="time"
              label="Hora"
            />
          </View>
        </View>

        <View style={{ gap: 8 }}>
          <Text color="gray.200" weight="bold" size="sm">
            Está dentro da dieta?
          </Text>

          <Controller
            control={form.control}
            name="onDiet"
            render={({ field, fieldState }) => (
              <>
                <RadioGroup.Root
                  value={field.value}
                  onValueChange={field.onChange}
                  style={{ flexDirection: 'row', gap: 8 }}
                >
                  <RadioGroup.Item asChild value="on-diet">
                    <OnDietSelect isOnDiet />
                  </RadioGroup.Item>

                  <RadioGroup.Item asChild value="off-diet">
                    <OnDietSelect isOnDiet={false} />
                  </RadioGroup.Item>
                </RadioGroup.Root>

                {fieldState.error && (
                  <Text size="sm" color="red.dark">
                    {fieldState.error.message}
                  </Text>
                )}
              </>
            )}
          />
        </View>

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
