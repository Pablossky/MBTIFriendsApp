import { useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { cognitiveFunctions } from '../../data/functionsData';

export default function CognitiveFunctionDetail() {
  const { function: funcId } = useLocalSearchParams();
  const func = cognitiveFunctions.find((f) => f.id === funcId);

  if (!func) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Nie znaleziono takiej funkcji.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{func.name}</Text>
      <Text style={styles.description}>{func.description}</Text>

      {func.examples && (
        <>
          <Text style={styles.subtitle}>Przykłady:</Text>
          <Text style={styles.examples}>{func.examples}</Text>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
    padding: 20,
    paddingVertical: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 8,
  },
  examples: {
    fontSize: 16,
    color: '#444',
    lineHeight: 22,
  },
  errorText: {
    marginTop: 40,
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});
