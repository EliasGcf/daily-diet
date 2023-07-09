import { Controller, UseFormReturn } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import { Form } from '@components/Form';
import { RadioGroup } from '@components/RadioGroup';
import { OnDietSelect } from '@components/Select';
import { Text } from '@components/ui/Text';

export const mealFormSchema = z.object({
  name: z.string({ required_error: 'Nome é obrigatório' }),
  description: z.string({ required_error: 'Descrição é obrigatória' }),
  date: z.date(),
  time: z.date(),
  onDiet: z.enum(['on-diet', 'off-diet'], {
    required_error: 'É preciso informar um dos valores.',
  }),
});

export type MealFormData = z.infer<typeof mealFormSchema>;

type MealFormProps = {
  form: UseFormReturn<MealFormData>;
};

export function MealForm({ form }: MealFormProps) {
  return (
    <View style={{ flex: 1, gap: 24 }}>
      <Form.TextInput label="Nome" name="name" control={form.control} />
      <Form.TextInput
        label="Descrição"
        name="description"
        multiline
        control={form.control}
      />

      <View style={styles.formTime}>
        <View style={{ flex: 1 }}>
          <Form.DatePicker name="date" control={form.control} mode="date" label="Data" />
        </View>

        <View style={{ flex: 1 }}>
          <Form.DatePicker name="time" control={form.control} mode="time" label="Hora" />
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
    </View>
  );
}

const styles = StyleSheet.create({
  formTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
});
