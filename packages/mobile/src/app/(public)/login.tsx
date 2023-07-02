import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import LogoSvg from '@assets/logo.svg';

import { Button } from '@components/Button';
import { Form } from '@components/Form';
import { KeyboardController } from '@components/KeyboardController';

import { useAuth } from '@hooks/useAuth';

const formSchema = z.object({
  email: z
    .string({ required_error: 'E-mail é obrigatório' })
    .email('E-mail inválido')
    .nonempty('E-mail é obrigatório'),
  password: z
    .string({ required_error: 'Senha é obrigatório' })
    .nonempty('Senha é obrigatório'),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { signIn } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  async function handleSubmit(formData: FormData) {
    try {
      setIsLoading(true);

      await signIn({
        email: formData.email,
        password: formData.password,
      });

      form.reset();
    } catch {
      // TODO: handle error
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <KeyboardController>
      <View style={styles.container}>
        <LogoSvg width={300} height={60} />
        <View style={styles.content}>
          <Form.TextInput
            editable={!isLoading}
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
            editable={!isLoading}
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            secureTextEntry
            onSubmitEditing={() => form.handleSubmit(handleSubmit)()}
          />
          <Button
            isLoading={isLoading}
            title="Entrar"
            onPress={() => form.handleSubmit(handleSubmit)()}
          />
          <Link asChild href="/signup" replace>
            <Button variant="outline" enabled={!isLoading} title="Não tenho conta" />
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
