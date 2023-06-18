import { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { theme } from '../shared/theme';
import { Text } from './ui/Text';

type TextInputProps = RNTextInputProps & {
  label: string;
  onChange?: (text: string) => void;
};

export function TextInput({ label, onChange, ...rest }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleOnChangeText(text: string) {
    setIsFilled(!!text.trim());

    if (onChange) onChange(text);
  }

  return (
    <View style={styles.container}>
      <Text size="sm" weight="bold" color="gray.200">
        {label}
      </Text>

      <RNTextInput
        {...rest}
        placeholderTextColor={theme.colors.gray[400]}
        style={[
          styles.input,
          isFocused && styles.focused,
          isFilled && styles.filled,
          rest.multiline && styles.multilineInput,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChangeText={handleOnChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[500],
    borderRadius: 6,
    padding: 16,
    fontFamily: theme.fonts.regular,
    fontSize: theme.fontSizes.md,
  },

  multilineInput: {
    minHeight: 120,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },

  focused: {
    borderColor: theme.colors.gray[300],
  },

  filled: {
    borderColor: theme.colors.gray[300],
  },
});
