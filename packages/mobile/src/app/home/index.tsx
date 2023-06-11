import { ArrowUpRight, Plus } from 'phosphor-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '../../components/Avatar';
import { Box } from '../../components/Box';
import { Button } from '../../components/Button';

export default function HomePage() {
  const { top } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: top + 12 }]}>
      <View style={styles.header}>
        <Text>Logo</Text>
        <Avatar url="https://github.com/eliasgcf.png" />
      </View>

      <Box brand="green" icon={ArrowUpRight}>
        <Text>90,86%</Text>
        <Text>das refeições dentro da dieta</Text>
      </Box>

      <View style={styles.listHeader}>
        <Text>Refeições</Text>
        <Button title="Nova refeição" icon={Plus} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },

  listHeader: {
    marginTop: 40,
    gap: 8,
  },
});
