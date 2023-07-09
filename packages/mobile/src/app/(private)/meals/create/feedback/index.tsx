import { Image } from 'expo-image';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import IsOffDietImg from '@assets/images/is-off-diet-feedback.png';
import IsOnDietImg from '@assets/images/is-on-diet-feedback.png';

import { Button } from '@components/Button';
import { Text } from '@components/ui/Text';

const ITEMS = {
  true: {
    title: (
      <Text size="2xl" weight="bold" color="green.dark">
        Continue assim!
      </Text>
    ),
    headline: (
      <Text size="md" color="gray.100">
        Você continua{' '}
        <Text size="md" color="gray.100" weight="bold">
          dentro da dieta
        </Text>
        . Muito bem!
      </Text>
    ),
    image: IsOnDietImg,
  },
  false: {
    title: (
      <Text size="2xl" weight="bold" color="red.dark">
        Que pena!
      </Text>
    ),
    headline: (
      <Text size="md" color="gray.100" style={{ textAlign: 'center' }}>
        Você{' '}
        <Text size="md" color="gray.100" weight="bold">
          saiu da dieta
        </Text>{' '}
        dessa vez, mas continue se esforçando e não desista!
      </Text>
    ),
    image: IsOffDietImg,
  },
};

export default function FeedbackPage() {
  const params = useLocalSearchParams() as { isOnDiet: string };
  const isOnDiet = JSON.parse(String(params.isOnDiet));

  const { title, headline, image } = ITEMS[isOnDiet ? 'true' : 'false'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {title}
        {headline}
      </View>

      <Image source={image} style={styles.image} />

      <View>
        <Link asChild href="/">
          <Button title="Ir para a página inicial" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 40,
  },

  header: {
    gap: 8,
    alignItems: 'center',
  },

  image: {
    width: 224,
    height: 288,
  },
});
