import { StyleSheet, View } from 'react-native';

import LogoSvg from '@assets/logo.svg';

import { Button } from '@components/Button';
import { KeyboardController } from '@components/KeyboardController';
import { TextInput } from '@components/ui/TextInput';

export default function SignUpPage() {
  return (
    <KeyboardController>
      <View style={styles.container}>
        <LogoSvg width={300} height={60} />
        <View style={styles.content}>
          <TextInput label="E-mail" placeholder="example@email.com" />
          <TextInput placeholder="••••••••" label="Senha" secureTextEntry />
          <TextInput placeholder="••••••••" label="Confirme a senha" secureTextEntry />
          <Button title="Cadastrar" variant="outline" />
        </View>
      </View>
    </KeyboardController>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 96,
  },

  content: {
    width: '100%',
    gap: 16,
  },
});
