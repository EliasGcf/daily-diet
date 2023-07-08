import { router } from 'expo-router';
import { ArrowLeft } from 'phosphor-react-native';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box } from '@components/Box';
import { Text } from '@components/ui/Text';

import { useMetrics } from '@hooks/useMetrics';

import { theme } from '@shared/theme';

export default function StatisticsPage() {
  const { top } = useSafeAreaInsets();
  const query = useMetrics();

  if (!query.data || query.isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator color={theme.colors.green.dark} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top + 24 },
        query.data.isOnDiet
          ? { backgroundColor: theme.colors.green.light }
          : { backgroundColor: theme.colors.red.light },
      ]}
    >
      <View style={styles.header}>
        <RectButton style={styles.goBackButton} onPress={router.back}>
          <ArrowLeft
            size={24}
            color={query.data.isOnDiet ? theme.colors.green.dark : theme.colors.red.dark}
          />
        </RectButton>

        <Text weight="bold" size="3xl" color="gray.100">
          {query.data.percentage}%
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
              {query.data.bestOnDietSequence}
            </Text>

            <Text size="sm" color="gray.200">
              melhor sequência de pratos dentro da dieta
            </Text>
          </Box>

          <Box>
            <Text weight="bold" size="2xl" color="gray.100">
              {query.data.total}
            </Text>

            <Text size="sm" color="gray.200">
              refeições registradas
            </Text>
          </Box>

          <View style={{ flexDirection: 'row', gap: 12 }}>
            <Box brand="green" style={{ flex: 1 }}>
              <Text weight="bold" size="2xl" color="gray.100">
                {query.data.onDiet}
              </Text>

              <Text size="sm" color="gray.200" style={{ textAlign: 'center' }}>
                refeições dentro da dieta
              </Text>
            </Box>

            <Box brand="red" style={{ flex: 1 }}>
              <Text weight="bold" size="2xl" color="gray.100">
                {query.data.offDiet}
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

  goBackButton: {
    position: 'absolute',
    left: 16,
    top: -8,
    padding: 8,
    borderRadius: 6,
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
