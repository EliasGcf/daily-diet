import { Modal, ModalProps, View } from 'react-native';

import { useDialog } from './DialogContext';

type DialogContentProps = Omit<ModalProps, 'visible' | 'transparent'>;

export function DialogContent({ children, style, ...rest }: DialogContentProps) {
  const { open } = useDialog();

  return (
    <Modal visible={open} transparent {...rest}>
      <View style={[{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.25)' }, style]}>
        {children}
      </View>
    </Modal>
  );
}

DialogContent.displayName = 'DialogContent';
