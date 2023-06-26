import { useRouter } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@components/Button';
import { DatePicker } from '@components/DatePicker';
import { Select } from '@components/Select';
import { TextInput } from '@components/TextInput';
import { Text } from '@components/ui/Text';

import { theme } from '@shared/theme';

export default function CreatePage() {
  const [isOnDiet, setIsOnDiet] = useState<boolean | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());

  const safeAreaInsets = useSafeAreaInsets();
  const router = useRouter();

  function handleSubmit() {
    if (isOnDiet === undefined) return;

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
        <TextInput label="Nome" />
        <TextInput label="Descrição" multiline />

        <View style={styles.formTime}>
          <View style={{ flex: 1 }}>
            <DatePicker
              mode="date"
              label="Data"
              value={selectedDate}
              onChange={setSelectedDate}
            />
          </View>

          <View style={{ flex: 1 }}>
            <DatePicker
              mode="time"
              label="Hora"
              value={selectedTime}
              onChange={setSelectedTime}
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
          <Button onPress={handleSubmit} title="Cadastrar refeição" />
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
