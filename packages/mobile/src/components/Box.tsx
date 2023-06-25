import { Icon as PhosphorIcon } from 'phosphor-react-native';
import { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { theme } from '@shared/theme';

type BoxProps = ViewProps & {
  icon?: PhosphorIcon;
  brand?: 'green' | 'red';
};

export function Box({
  icon,
  brand,
  children,
  style,
  ...rest
}: PropsWithChildren<BoxProps>) {
  const Icon = icon;

  return (
    <View
      style={[
        styles.container,
        brand && { backgroundColor: theme.colors[brand].light },
        style,
      ]}
      {...rest}
    >
      {Icon && (
        <Icon
          size={24}
          style={styles.icon}
          color={brand ? theme.colors[brand].dark : theme.colors.gray[300]}
        />
      )}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    position: 'relative',
    borderRadius: 6,
    alignItems: 'center',
    gap: 8,
    backgroundColor: theme.colors.gray[600],
  },
  icon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});
