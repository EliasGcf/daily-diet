import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import LogoSvg from '@assets/logo.svg';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { KeyboardController } from '@components/KeyboardController';

const formSchema = z
  .object({
    email: z
      .string({ required_error: 'E-mail é obrigatório' })
      .email('E-mail inválido')
      .nonempty('E-mail é obrigatório'),
    password: z
      .string({ required_error: 'Senha é obrigatório' })
      .nonempty('Senha é obrigatório'),
    passwordConfirmation: z
      .string({ required_error: 'Confirme a senha' })
      .nonempty('Confirme a senha'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['passwordConfirmation'],
  });

type FormData = z.infer<typeof formSchema>;

export default function SignUpPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(formData: FormData) {
    console.log('SignUpPage ~ formData:', formData);
  }

  return (
    <KeyboardController>
      <View style={styles.container}>
        <LogoSvg width={300} height={60} />
        <View style={styles.content}>
          <Form.TextInput
            label="E-mail"
            name="email"
            control={form.control}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="email"
            placeholder="example@email.com"
            returnKeyType="default"
            onSubmitEditing={() => form.handleSubmit(handleSubmit)()}
          />
          <Form.TextInput
            name="password"
            control={form.control}
            placeholder="••••••••"
            label="Senha"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            secureTextEntry
            onSubmitEditing={() => form.handleSubmit(handleSubmit)()}
          />
          <Form.TextInput
            name="passwordConfirmation"
            control={form.control}
            placeholder="••••••••"
            label="Senha"
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            secureTextEntry
            onSubmitEditing={() => form.handleSubmit(handleSubmit)()}
          />
          <Button title="Cadastrar" onPress={() => form.handleSubmit(handleSubmit)()} />
          <Link asChild href="/login" replace>
            <Button variant="outline" title="Já tenho conta" />
          </Link>
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
