import { StyleSheet, View } from "react-native";
import { Button } from "../components/Button";
import { ArrowLeft, Trash } from "phosphor-react-native";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Button icon={ArrowLeft} title="Editar" />
        <Button icon={Trash} variant="outline" title="Editar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    gap: 12,
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
