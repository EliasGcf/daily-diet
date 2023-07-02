import React from 'react';
import { Modal, ModalProps, Pressable, StyleSheet, View } from 'react-native';

import { useDialog } from './DialogContext';

type DialogPortalProps = Omit<ModalProps, 'visible' | 'transparent' | 'animationType'> & {
  center?: boolean;
};

export function DialogPortal({ children, style, center, ...rest }: DialogPortalProps) {
  const { isOpen, handleClose } = useDialog();

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={handleClose}
      statusBarTranslucent
      {...rest}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <View style={[center && styles.centerModal, style]}>
          <Pressable>{children}</Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

DialogPortal.displayName = 'DialogPortal';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
});
