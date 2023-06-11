import { getProperty } from 'dot-prop';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';

import { theme } from '../../shared/theme';
import { Path } from '../../shared/types/dot-path';

type TextProps = RNTextProps & {
  /**
   * @default md
   */
  size?: keyof typeof theme.fontSizes;
  /**
   * @default regular
   */
  weight?: 'regular' | 'bold';
  /**
   * @default gray.200
   */
  color?: Path<(typeof theme)['colors']>;
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
          color: getProperty<(typeof theme)['colors'], string>(theme.colors, color),
        },
        { fontSize: theme.fontSizes[size] },
        style,
      ]}
      {...rest}
    />
  );
}

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
