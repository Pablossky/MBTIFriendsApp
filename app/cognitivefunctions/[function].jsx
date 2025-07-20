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
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <Text style={styles.title}>{func.name}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Charakterystyka</Text>
        <Text style={styles.sectionText}>{func.description}</Text>
      </View>

      {func.theory && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Teoria</Text>
          <Text style={styles.sectionText}>{func.theory}</Text>
        </View>
      )}

      {func.examples && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Przykłady</Text>
          <Text style={styles.sectionText}>{func.examples}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF3E0',
  },
  scrollContent: {
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginBottom: 24,
    marginTop: 20,
  },
  section: {
    backgroundColor: '#FFF9F0',
    borderRadius: 14,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#B36B00',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B4513',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#D3A762',
    paddingBottom: 4,
  },
  sectionText: {
    fontSize: 16,
    color: '#4A3B24',
    lineHeight: 24,
  },
  errorText: {
    marginTop: 40,
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
  },
});
