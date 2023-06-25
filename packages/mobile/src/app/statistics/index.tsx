import { useRouter } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import { StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '../../components/Box';
import { Text } from '../../components/ui/Text';
import { theme } from '../../shared/theme';

const IS_ON_DIET = true;

export default function StatisticsPage() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top + 24 },
        IS_ON_DIET
          ? { backgroundColor: theme.colors.green.light }
          : { backgroundColor: theme.colors.red.light },
      ]}
    >
      <RectButton
        onPress={router.back}
        style={[styles.backButton, { top: top + 12, left: 24 }]}
      >
        <ArrowLeft
          size={24}
          color={IS_ON_DIET ? theme.colors.green.dark : theme.colors.red.dark}
        />
      </RectButton>

      <View style={styles.header}>
        <Text weight="bold" size="3xl" color="gray.100">
          90,86%
        </Text>

        <Text size="sm" color="gray.200">
          das refeições dentro da dieta
        </Text>
      </View>

      <View style={styles.content}>
        <Text color="gray.100" weight="bold" size="sm" style={{ textAlign: 'center' }}>
          Estatísticas gerais
        </Text>

        <View style={styles.cards}>
          <Box>
            <Text weight="bold" size="2xl" color="gray.100">
              22
            </Text>

            <Text size="sm" color="gray.200">
              melhor sequência de pratos dentro da dieta
            </Text>
          </Box>

          <Box>
            <Text weight="bold" size="2xl" color="gray.100">
              109
            </Text>

            <Text size="sm" color="gray.200">
              refeições registradas
            </Text>
          </Box>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Box brand="green" style={{ flex: 1 }}>
              <Text weight="bold" size="2xl" color="gray.100">
                99
              </Text>

              <Text size="sm" color="gray.200" style={{ textAlign: 'center' }}>
                refeições dentro da dieta
              </Text>
            </Box>

            <Box brand="red" style={{ flex: 1 }}>
              <Text weight="bold" size="2xl" color="gray.100">
                10
              </Text>

              <Text size="sm" color="gray.200" style={{ textAlign: 'center' }}>
                refeições fora da dieta
              </Text>
            </Box>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },

  backButton: {
    borderRadius: 6,
    padding: 8,
    position: 'absolute',
  },

  header: {
    alignItems: 'center',
  },

  content: {
    flex: 1,
    backgroundColor: theme.colors.white,
    marginTop: 34,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 34,
    paddingHorizontal: 24,
  },

  cards: {
    gap: 12,
    marginTop: 24,
  },
});
