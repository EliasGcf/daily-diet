import { useState } from 'react';
import { Modal, StyleSheet, TextProps, View } from 'react-native';

import { theme } from '../shared/theme';
import { Button } from './Button';
import { Text } from './ui/Text';

export function Dialog() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal visible={isOpen} transparent animationType="fade">
      <View style={styles.container}>
        <View style={styles.content}>
          <Title>Deseja realmente excluir o registro da refeição?</Title>

          <View style={styles.footer}>
            <View style={{ flex: 1 }}>
              <Button variant="outline" title="Cancelar" />
            </View>

            <View style={{ flex: 1 }}>
              <Button variant="primary" title="Sim, excluir" />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function Title(props: TextProps) {
  return (
    <Text
      size="lg"
      weight="bold"
      color="gray.200"
      style={{ textAlign: 'center' }}
      {...props}
    />
  );
}

Dialog.Title = Title;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },

  content: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
    borderRadius: 8,
    gap: 32,
  },

  footer: {
    flexDirection: 'row',
    gap: 12,
  },
});
