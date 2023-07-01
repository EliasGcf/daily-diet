import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { z } from 'zod';

import LogoSvg from '@assets/logo.svg';

import { Button } from '@components/Button';
import { KeyboardController } from '@components/KeyboardController';
import { TextInput } from '@components/TextInput';

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
  const { signIn } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(formData: FormData) {
    signIn({
      email: formData.email,
      password: formData.password,
    });
  }

  return (
    <KeyboardController>
      <View style={styles.container}>
        <LogoSvg width={300} height={60} />
        <View style={styles.content}>
          <Controller
            control={form.control}
            name="email"
            render={({ field }) => (
              <TextInput
                error={form.formState.errors.email?.message}
                label="E-mail"
                autoCapitalize="none"
                autoCorrect={false}
                autoComplete="email"
                placeholder="example@email.com"
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                returnKeyType="default"
                onSubmitEditing={() => form.handleSubmit(handleSubmit)()}
              />
            )}
          />
          <Controller
            control={form.control}
            name="password"
            render={({ field }) => (
              <TextInput
                error={form.formState.errors.password?.message}
                placeholder="••••••••"
                label="Senha"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                secureTextEntry
                onChange={field.onChange}
                onBlur={field.onBlur}
                value={field.value}
                onSubmitEditing={() => form.handleSubmit(handleSubmit)()}
              />
            )}
          />
          <Button title="Entrar" onPress={() => form.handleSubmit(handleSubmit)()} />
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
