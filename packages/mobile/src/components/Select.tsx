import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { Dot } from '@components/Dot';
import { Text } from '@components/ui/Text';

import { theme } from '@shared/theme';

type SelectProps = Omit<RectButtonProps, 'style'> & {
  value: boolean;
  selected?: boolean;
};

export function Select({ value, selected = false, ...rest }: SelectProps) {
  return (
    <RectButton
      {...rest}
      underlayColor={value ? theme.colors.green.light : theme.colors.red.light}
      activeOpacity={1}
      style={styles.container}
    >
      <View
        style={[
          styles.content,
          selected && {
            borderColor: value ? theme.colors.green.dark : theme.colors.red.dark,
            backgroundColor: value ? theme.colors.green.light : theme.colors.red.light,
          },
        ]}
      >
        <Dot size={8} color={value ? theme.colors.green.dark : theme.colors.red.dark} />
        <Text size="sm" weight="bold" color="gray.100">
          {value ? 'Sim' : 'Não'}
        </Text>
      </View>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[600],
    borderRadius: 6,
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: theme.colors.gray[600],
  },
});
