import dayjs from 'dayjs';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { TextInput } from '@components/TextInput';

import { Platform } from '@shared/platform';

type Props = {
  value: Date;
  label: string;
  onChange: (date: Date) => void;
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

export function DatePicker({ value, label, onChange, mode }: Props) {
  const [show, setShow] = useState(false);

  const formattedDate = dayjs(value).format(mode === 'date' ? 'DD/MM/YYYY' : 'HH:mm');

  function handleConfirm(date: Date) {
    setShow(false);
    onChange(date);
  }

  const platformSettings = SETTINGS[Platform.OS][mode];

  return (
    <View>
      <Pressable onPress={() => setShow(true)}>
        <View pointerEvents="none">
          <TextInput value={formattedDate} label={label} />
        </View>
      </Pressable>

      <DateTimePickerModal
        isVisible={show}
        mode={mode}
        display={platformSettings.display}
        date={value}
        onConfirm={handleConfirm}
        onCancel={() => setShow(false)}
        modalStyleIOS={{ paddingBottom: 16 }}
        pickerComponentStyleIOS={{ paddingBottom: 8 }}
      />
    </View>
  );
}
