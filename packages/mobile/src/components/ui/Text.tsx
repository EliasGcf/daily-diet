import { getProperty } from 'dot-prop';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

import { Theme, theme } from '../../shared/theme';
import { Path } from '../../shared/types/dot-path';

type TextProps = RNTextProps & {
  /**
   * @default md
   */
  size?: keyof Theme['fontSizes'] | Theme['fontSizes'][keyof Theme['fontSizes']];
  /**
   * @default regular
   */
  weight?: 'regular' | 'bold';
  /**
   * @default gray.200
   */
  color?: Path<Theme['colors']>;
};

export function Text({
  weight = 'regular',
  size = 'md',
  color,
  style,
  ...rest
}: TextProps) {
  return (
    <RNText
      style={[
        styles.base,
        weight && styles[weight],
        color && {
          color: getProperty<Theme['colors'], string>(theme.colors, color),
        },
        { fontSize: typeof size === 'number' ? size : theme.fontSizes[size] },
        style,
      ]}
      {...rest}
    />
  );
}

Text.size = theme.fontSizes;

const styles = StyleSheet.create({
  base: {
    color: theme.colors.gray[200],
  },

  regular: {
    fontFamily: theme.fonts.regular,
  },

  bold: {
    fontFamily: theme.fonts.bold,
  },
});
