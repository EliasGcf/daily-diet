import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { ArrowLeft, SignOut } from 'phosphor-react-native';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Avatar } from '@components/Avatar';
import { Button } from '@components/Button';
import { ConfirmDialog } from '@components/ConfirmDialog';
import { Dialog } from '@components/Dialog';
import { Form } from '@components/Form';
import { Text } from '@components/ui/Text';
import { TextInput } from '@components/ui/TextInput';

import { useAuth, useUser } from '@hooks/useAuth';

import { theme } from '@shared/theme';

const formSchema = z
  .object({
    name: z
      .string({ required_error: 'O nome é obrigatório' })
      .min(3, 'O nome deve ter no mínimo 3 caracteres'),
    currentPassword: z.string().optional(),
    newPassword: z.string().optional(),
    newPasswordConfirmation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword && !data.currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A senha atual é obrigatória para alterar a senha',
        path: ['currentPassword'],
      });
    }

    if (data.newPassword !== data.newPasswordConfirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'A confirmação da nova senha não confere',
        path: ['newPasswordConfirmation'],
      });
    }
  });

type ProfileFormData = z.infer<typeof formSchema>;

export default function ProfilePag() {
  const [dialogOpen, setDialogOpen] = useState<'signout'>();
  const safeArea = useSafeAreaInsets();

  const user = useUser();

  const { signOut, updateUser } = useAuth();

  const avatarURL =
    user.avatar || `https://ui-avatars.com/api/?background=EFF0F0&name=${user.name}`;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user.name,
    },
  });

  const newPassword = form.watch('newPassword');

  async function handleSubmit(formData: ProfileFormData) {
    try {
      await updateUser({
        name: formData.name,
        newPassword: formData.newPassword,
        newPasswordConfirmation: formData.newPasswordConfirmation,
        currentPassword: formData.currentPassword,
      });

      form.resetField('newPassword');

      if (router.canGoBack()) router.back();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    }
  }

  return (
    <View style={[styles.container, { paddingTop: safeArea.top + 12 }]}>
      <View style={styles.header}>
        <RectButton style={styles.goBackButton} onPress={router.back}>
          <ArrowLeft size={24} color={theme.colors.gray[200]} />
        </RectButton>

        <Text color="gray.100" weight="bold" size="lg">
          Perfil
        </Text>

        <Dialog.Root
          open={dialogOpen === 'signout'}
          onOpenChange={(isOpen) => setDialogOpen(isOpen ? 'signout' : undefined)}
        >
          <Dialog.Trigger asChild>
            <RectButton style={styles.signOutButton}>
              <SignOut size={24} color={theme.colors.red.dark} />

              <Text weight="bold" color="red.dark">
                Sair
              </Text>
            </RectButton>
          </Dialog.Trigger>

          <Dialog.Portal center>
            <ConfirmDialog
              title="Deseja realmente sair?"
              confirmText="Sim, sair"
              onConfirm={() => {
                setDialogOpen(undefined);
                signOut();
              }}
            />
          </Dialog.Portal>
        </Dialog.Root>
      </View>

      <View style={[styles.content, { paddingBottom: safeArea.bottom + 12 }]}>
        <Avatar url={avatarURL} size={60} />

        <Form.TextInput label="Nome" control={form.control} name="name" />
        <TextInput label="E-mail" editable={false} value={user.email} />

        <Form.TextInput
          label="Nova senha"
          placeholder="••••••••"
          control={form.control}
          name="newPassword"
          secureTextEntry
        />
        {newPassword && (
          <>
            <Form.TextInput
              label="Confirmar nova senha"
              control={form.control}
              name="newPasswordConfirmation"
              placeholder="••••••••"
              secureTextEntry
            />
            <Form.TextInput
              label="Senha atual"
              placeholder="••••••••"
              control={form.control}
              name="currentPassword"
              secureTextEntry
            />
          </>
        )}

        <Button
          title="Salvar"
          isLoading={form.formState.isSubmitting}
          onPress={() => form.handleSubmit(handleSubmit)()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray[500],
  },

  header: {
    position: 'relative',
    alignItems: 'center',
    marginBottom: 24,
  },

  goBackButton: {
    position: 'absolute',
    left: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
  },

  signOutButton: {
    position: 'absolute',
    right: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  content: {
    backgroundColor: theme.colors.white,
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 24,
    paddingTop: 80,
    gap: 24,
    alignItems: 'center',
  },
});
