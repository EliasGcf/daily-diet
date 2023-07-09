import React from 'react';
import { StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { Dot } from '@components/Dot';
import { Text } from '@components/ui/Text';

import { theme } from '@shared/theme';

type OnDietSelectProps = Omit<RectButtonProps, 'style'> & {
  isOnDiet: boolean;
  selected?: boolean;
};

export function OnDietSelect({ isOnDiet, selected = false, ...rest }: OnDietSelectProps) {
  return (
    <RectButton
      {...rest}
      underlayColor={isOnDiet ? theme.colors.green.light : theme.colors.red.light}
      activeOpacity={1}
      style={styles.container}
    >
      <View
        style={[
          styles.content,
          selected && {
            borderColor: isOnDiet ? theme.colors.green.dark : theme.colors.red.dark,
            backgroundColor: isOnDiet ? theme.colors.green.light : theme.colors.red.light,
          },
        ]}
      >
        <Dot
          size={8}
          color={isOnDiet ? theme.colors.green.dark : theme.colors.red.dark}
        />
        <Text size="sm" weight="bold" color="gray.100">
          {isOnDiet ? 'Sim' : 'Não'}
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
