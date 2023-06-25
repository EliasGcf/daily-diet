import { StyleSheet, View } from 'react-native';

import { theme } from '../shared/theme';
import { Button } from './Button';
import { Dialog } from './Dialog';
import { Text } from './ui/Text';

export function ConfirmDeleteDialog() {
  return (
    <Dialog.Content animationType="fade" style={styles.container}>
      <View style={styles.content}>
        <Text size="lg" weight="bold" color="gray.200" style={styles.title}>
          Deseja realmente excluir o registro da refeição?
        </Text>

        <View style={styles.footer}>
          <View style={styles.button}>
            <Dialog.Close asChild>
              <Button variant="outline" title="Cancelar" />
            </Dialog.Close>
          </View>

          <View style={styles.button}>
            <Button variant="primary" title="Sim, excluir" />
          </View>
        </View>
      </View>
    </Dialog.Content>
  );
}

const styles = StyleSheet.create({
  container: {
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
