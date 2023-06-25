import { Modal, ModalProps, Pressable, StyleSheet, View } from 'react-native';

import { useDialog } from './DialogContext';

type DialogPortalProps = Omit<ModalProps, 'visible' | 'transparent' | 'animationType'>;

export function DialogPortal({ children, style, ...rest }: DialogPortalProps) {
  const { isOpen, handleClose } = useDialog();

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={handleClose}
      {...rest}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <View style={style}>
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
});
