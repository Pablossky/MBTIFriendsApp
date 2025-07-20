import { useRouter } from 'expo-router';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { mbtiTypes } from '../../data/mbtiData';


const screenWidth = Dimensions.get('window').width;
const CARD_MARGIN = 12;
const NUM_COLUMNS = 2;
const cardWidth = (screenWidth - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;

const groupOrder = ['Strażnicy (SJ)', 'Dyplomaci (NF)', 'Analitycy (NT)', 'Rzemieślnicy (SP)'];

const groupedMbti = groupOrder.map((groupName) => ({
  name: groupName,
  items: mbtiTypes.filter((m) => m.communicationGroup === groupName),
}));

export default function MbtiListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scroll}>
        {groupedMbti.map(({ name, items }) => (
          <View key={name} style={styles.groupContainer}>
            <Text style={styles.groupTitle}>{name}</Text>
            <View style={styles.cardsContainer}>
              {items.map(({ type, shortDesc, backgroundColor }) => (
                <TouchableOpacity
                  key={type}
                  style={[styles.card, { backgroundColor: backgroundColor || '#444', width: cardWidth }]}
                  onPress={() => router.push(`/mbti/${type}`)}  // <- tutaj nawigacja
                >
                  <Text style={styles.type}>{type}</Text>
                  <Text style={styles.desc}>{shortDesc}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5E1C9', // ciepły beż tła
    paddingVertical: 40,
  },
  scroll: {
    flex: 1,
  },
  groupContainer: {
    marginBottom: 24,
    paddingHorizontal: CARD_MARGIN,
  },
  groupTitle: {
    fontSize: 24,          // większa czcionka
    fontWeight: 'bold',
    color: '#6B4F26',      // ceglasty kolor tytułu grupy
    marginBottom: 12,
    textAlign: 'center',   // wyśrodkowanie tekstu
  },

  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: CARD_MARGIN,
    minHeight: 120,
    justifyContent: 'center',

    backgroundColor: '#F9E2B3', // jasny musztardowy
    shadowColor: '#C1440E',     // cień ceglasty
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  type: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4B2E05',  // ciemny brąz, ciepły i czytelny
  },
  desc: {
    fontSize: 14,
    color: '#6B4F26', // cieplejszy brąz dla opisu
  },
});
