import { Link } from 'expo-router';
import { ArrowLeft, ArrowUpRight, Trash } from 'phosphor-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Avatar } from '../components/Avatar';
import { Box } from '../components/Box';
import { Button } from '../components/Button';
import { Meal } from '../components/Meal';
import { Select } from '../components/Select';
import { TextInput } from '../components/TextInput';

export default function Page() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.main}>
          <Avatar url="https://github.com/eliasgcf.png" />
          <Link href="/home/">Home</Link>
          <Link href="/login">Sign In</Link>
          <Link href="/signup">Sign Up</Link>
          <Box icon={ArrowUpRight}>
            <Text>asdfd</Text>
          </Box>
          <Box icon={ArrowUpRight} brand="green">
            <Text>asdfd</Text>
          </Box>
          <Box icon={ArrowUpRight} brand="red">
            <Text>asdfd</Text>
          </Box>
          <TextInput label="Label" />
          <Meal meal={{ title: 'X-tudo', isOnDiet: true, date: new Date() }} />
          <Meal
            meal={{
              title: 'Salada cesar com frango grelhado bem boa',
              isOnDiet: false,
              date: new Date(),
            }}
          />
          <Button title="Editar" />
          <Button title="Editar" variant="outline" />
          <Button icon={ArrowLeft} title="Editar" />
          <Button icon={Trash} variant="outline" title="Editar" />
          <Select value />
          <Select value={false} />
          <Select value selected />
          <Select value={false} selected />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    gap: 12,
  },
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 36,
    color: '#38434D',
  },
});
