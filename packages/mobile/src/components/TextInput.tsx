import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
} from 'react-native';

import { Text } from '@components/ui/Text';

import { theme } from '@shared/theme';

type TextInputProps = RNTextInputProps & {
  label: string;
  onChange?: (text: string) => void;
};

export function TextInput({ label, onChange, pointerEvents, ...rest }: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<RNTextInput>(null);

  function handleOnChangeText(text: string) {
    if (onChange) onChange(text);
  }

  return (
    <View style={styles.container} pointerEvents={pointerEvents}>
      <Text size="sm" weight="bold" color="gray.200">
        {label}
      </Text>

      <RNTextInput
        {...rest}
        ref={ref}
        placeholderTextColor={theme.colors.gray[400]}
        style={[
          styles.input,
          isFocused && styles.focused,
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
});
