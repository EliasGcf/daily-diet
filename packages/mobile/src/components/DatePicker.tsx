import dayjs from 'dayjs';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { TextInput } from '@components/ui/TextInput';

import { Platform } from '@shared/platform';
import { theme } from '@shared/theme';

export type DatePickerProps = {
  value?: Date;
  label: string;
  onChange?: (date: Date) => void;
  mode: 'date' | 'time';
};

const SETTINGS = {
  ios: {
    date: {
      display: 'inline',
    },
    time: {
      display: 'spinner',
    },
  },
  android: {
    date: {
      display: 'inline',
    },
    time: {
      display: 'default',
    },
  },
} as const;

export function DatePicker({ value, label, onChange, mode }: DatePickerProps) {
  const [show, setShow] = useState(false);

  const formattedDate = value
    ? dayjs(value).format(mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm')
    : '';

  function handleConfirm(date: Date) {
    setShow(false);
    if (onChange) onChange(date);
  }

  const platformSettings = SETTINGS[Platform.OS][mode];

  return (
    <View>
      <Pressable onPress={() => setShow(true)}>
        <TextInput
          pointerEvents="none"
          value={formattedDate}
          label={label}
          caretHidden
          isFocused={show}
          showSoftInputOnFocus={false}
        />
      </Pressable>

      <DateTimePickerModal
        isVisible={show}
        mode={mode}
        display={platformSettings.display}
        date={value}
        themeVariant="light"
        accentColor={theme.colors.green.dark}
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        onConfirm={handleConfirm}
        onCancel={() => setShow(false)}
        modalStyleIOS={{ paddingBottom: 16 }}
        pickerComponentStyleIOS={{ paddingBottom: 8 }}
      />
    </View>
  );
}
