import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

const STORAGE_FRIENDS_KEY = 'friends_list';

export default function StatsScreen() {
  const [allData, setAllData] = useState([]);
  const [femaleData, setFemaleData] = useState([]);
  const [maleData, setMaleData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_FRIENDS_KEY);
        const friends = json ? JSON.parse(json) : [];

        const colors = [
          '#4a90e2', '#50e3c2', '#f5a623', '#d0021b',
          '#8b572a', '#417505', '#9013fe', '#b8e986',
          '#f8e71c', '#7ed321', '#bd10e0', '#ff3366',
          '#00aaff', '#ffcc00', '#00cc99', '#9966ff',
        ];

        const calcChartData = (list) => {
          const counts = {};
          for (const friend of list) {
            if (friend.mbti) {
              counts[friend.mbti] = (counts[friend.mbti] || 0) + 1;
            }
          }
          const totalCount = list.length || 1;
          return Object.entries(counts).map(([mbti, count], index) => ({
            name: mbti,
            population: count,
            color: colors[index % colors.length],
            legendFontColor: '#333',
            legendFontSize: 14,
            percentage: ((count / totalCount) * 100).toFixed(1),
          }));
        };

        setAllData(calcChartData(friends));
        setFemaleData(calcChartData(friends.filter(f => f.gender === 'Kobieta')));
        setMaleData(calcChartData(friends.filter(f => f.gender === 'Mężczyzna')));
      } catch (e) {
        console.warn('Błąd ładowania statystyk', e);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ padding: 20 }}>Ładowanie statystyk...</Text>
      </SafeAreaView>
    );
  }


  const chartWidth = Dimensions.get('window').width - 64;

  const renderChartCard = (title, data) => (
    <View style={styles.card} key={title}>
      <Text style={styles.cardTitle}>{title}</Text>
      {data.length === 0 ? (
        <Text>Brak danych</Text>
      ) : (
        <PieChart
          data={data}
          width={chartWidth}
          height={220}
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}
      {/* Lista legendy */}
      <View style={{ marginTop: 16 }}>
        {data.map((item, idx) => (
          <View style={styles.legendRow} key={item.name || `legend-${idx}`}>
            <View style={[styles.colorBox, { backgroundColor: item.color || '#ccc' }]} />
            <Text>
              {item.name
                ? `${item.name}: ${item.population} (${item.percentage}%)`
                : 'Brak nazwy'}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {renderChartCard('Wszyscy znajomi', allData)}
        {renderChartCard('Kobiety', femaleData)}
        {renderChartCard('Mężczyźni', maleData)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#F5E1C9', // ciepły beż - tło
  },
  card: {
    width: Dimensions.get('window').width - 64,
    backgroundColor: '#F9E2B3', // jasny musztardowy
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 32,
    marginVertical: 52,

    shadowColor: '#C1440E',   // cień ceglasty
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#C1440E', // ceglasty tytuł
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  colorBox: {
    width: 18,
    height: 18,
    marginRight: 8,
    borderRadius: 4,
  },
  legendText: {
    color: '#4B2E05', // ciemny brąz
  },
  swipeHint: {
    textAlign: 'center',
    paddingVertical: 10,
    color: '#6B4F26', // cieplejszy brąz
    fontStyle: 'italic',
  },
});
