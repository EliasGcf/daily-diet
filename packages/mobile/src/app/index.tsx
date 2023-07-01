import { View } from 'react-native';

import Logo from '@assets/logo.svg';

export default function IndexPage() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Logo width="40%" height="10%" />
    </View>
  );
}
