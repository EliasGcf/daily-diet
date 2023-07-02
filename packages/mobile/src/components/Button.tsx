import { exhaustive } from 'exhaustive';
import type { Icon as PhosphorIcon } from 'phosphor-react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { Text } from '@components/ui/Text';

import { theme } from '@shared/theme';

export type ButtonProps = Omit<RectButtonProps, 'style'> & {
  variant?: 'primary' | 'outline' | 'danger';
  title: string;
  icon?: PhosphorIcon;
  isLoading?: boolean;
};

export function Button({
  variant = 'primary',
  title,
  icon,
  isLoading,
  ...rest
}: ButtonProps) {
  const Icon = icon;

  const variantProps = exhaustive(variant, {
    primary: () => ({
      styles: primaryStyles,
      textColor: theme.colors.white,
      iconColor: theme.colors.white,
      activeColor: theme.colors.gray[100],
      loadingColor: theme.colors.green.mid,
    }),
    outline: () => ({
      styles: outlineStyles,
      textColor: theme.colors.gray[100],
      iconColor: theme.colors.gray[100],
      activeColor: theme.colors.gray[500],
      loadingColor: theme.colors.green.dark,
    }),
    danger: () => ({
      styles: dangerStyles,
      textColor: theme.colors.red.dark,
      iconColor: theme.colors.red.dark,
      activeColor: theme.colors.red.mid,
      loadingColor: theme.colors.red.dark,
    }),
  });

  return (
    <View
      style={[
        baseStyles.container,
        variantProps.styles.container,
        (rest.enabled === false || isLoading) && baseStyles.disabled,
      ]}
    >
      <RectButton
        {...rest}
        underlayColor={variantProps.activeColor}
        activeOpacity={1}
        style={baseStyles.button}
      >
        {isLoading ? (
          <ActivityIndicator color={variantProps.loadingColor} />
        ) : (
          <>
            {Icon && (
              <Icon
                size={18}
                color={variantProps.iconColor}
                style={{ marginRight: 12 }}
              />
            )}
            <Text size="sm" weight="bold" color={variantProps.textColor}>
              {title}
            </Text>
          </>
        )}
      </RectButton>
    </View>
  );
}

const baseStyles = StyleSheet.create({
  container: {
    borderRadius: 6,
    borderWidth: 1,
    width: '100%',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 6,
  },

  disabled: {
    opacity: 0.5,
  },
});

const primaryStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.gray[200],
    borderColor: theme.colors.gray[200],
  },
});

const outlineStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.gray[100],
  },
});

const dangerStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.red.light,
    borderColor: theme.colors.red.dark,
  },
});
