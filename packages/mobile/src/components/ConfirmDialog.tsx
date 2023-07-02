import { Pressable, StyleSheet, View } from 'react-native';

import { Button, ButtonProps } from '@components/Button';
import { Dialog } from '@components/Dialog';
import { Text } from '@components/ui/Text';

import { theme } from '@shared/theme';

type Props = {
  onConfirm: () => void;
  onCancel?: () => void;
  title: string;
  cancelText?: string;
  cancelVariant?: ButtonProps['variant'];
  confirmVariant?: ButtonProps['variant'];
  confirmText: string;
};

export function ConfirmDialog({
  title,
  cancelText,
  cancelVariant = 'outline',
  confirmVariant = 'danger',
  confirmText,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <Dialog.Content style={styles.content}>
      <Text size="lg" weight="bold" color="gray.200" style={styles.title}>
        {title}
      </Text>

      <View style={styles.footer}>
        <View style={styles.button}>
          <Dialog.Close asChild>
            <Pressable>
              <Button
                onPress={onCancel}
                variant={cancelVariant}
                title={cancelText ?? 'Cancelar'}
              />
            </Pressable>
          </Dialog.Close>
        </View>

        <View style={styles.button}>
          <Pressable onPress={onConfirm}>
            <Button variant={confirmVariant} title={confirmText} />
          </Pressable>
        </View>
      </View>
    </Dialog.Content>
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    borderRadius: 8,
    gap: 32,
  },

  title: {
    textAlign: 'center',
  },

  footer: {
    flexDirection: 'row',
    gap: 12,
  },

  button: {
    flex: 1,
  },
});
