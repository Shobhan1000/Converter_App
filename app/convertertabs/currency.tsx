import React, { useEffect, useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { apikey } from './APIkey';
import { currencies } from './currencies';

// Function to get country flag emoji
const getFlagEmoji = (countryCode: string) =>
  countryCode
    .toUpperCase()
    .replace(/./g, char => String.fromCodePoint(127397 + char.charCodeAt(0)));

const Currency: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState('');
  const [rates, setRates] = useState<{ [key: string]: number }>({});
  const [fromSearch, setFromSearch] = useState('');
  const [toSearch, setToSearch] = useState('');

  // Fetch rates every 5 minutes
  useEffect(() => {
    const fetchRates = () => {
      fetch(`https://api.currencyapi.com/v3/latest?apikey=${apikey}&base_currency=USD`)
        .then(res => res.json())
        .then(data => {
          if (data?.data) {
            const parsedRates: { [key: string]: number } = { USD: 1 };
            for (const key in data.data) {
              parsedRates[key] = data.data[key].value;
            }
            setRates(parsedRates);
          }
        })
        .catch(err => console.error('Error fetching exchange rates:', err));
    };

    fetchRates();
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Convert whenever input or currencies or rates change
  useEffect(() => {
    if (inputValue !== '' && rates[fromCurrency] && rates[toCurrency]) {
      convert(inputValue, fromCurrency, toCurrency);
    } else {
      setResult('');
    }
  }, [inputValue, fromCurrency, toCurrency, rates]);

  // Conversion function
  const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val) || !rates[from] || !rates[to]) {
      setResult('');
      return;
    }

    const valueInUSD = from === 'USD' ? val : val / rates[from];
    const converted = to === 'USD' ? valueInUSD : valueInUSD * rates[to];

    setResult(converted.toFixed(4));
  };

  // Keypad handling
  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      setInputValue(inputValue.slice(0, -1));
    } else if (key === '↔') {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
    } else {
      // Allow leading decimal
      if (key === '.' && inputValue.includes('.')) return;
      setInputValue(inputValue + key);
    }
  };

  // Filter currencies based on search
  const filteredFrom = currencies.filter(
    c =>
      c.code.toLowerCase().includes(fromSearch.toLowerCase()) ||
      c.name.toLowerCase().includes(fromSearch.toLowerCase())
  );
  const filteredTo = currencies.filter(
    c =>
      c.code.toLowerCase().includes(toSearch.toLowerCase()) ||
      c.name.toLowerCase().includes(toSearch.toLowerCase())
  );

  const keypad = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
    ['↔'],
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.label}>You are converting:</Text>
        <Text style={styles.inputText}>
          {inputValue || '0'} {fromCurrency}
        </Text>
        <Text style={styles.label}>Result:</Text>
        <Text style={styles.resultText}>
          {result !== '' ? `${result} ${toCurrency}` : '--'}
        </Text>
      </View>

      {/* Currency selectors */}
      <View style={styles.unitsContainer}>
        {/* From */}
        <View style={styles.unitColumn}>
          <Text style={styles.unitLabel}>From</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={fromSearch}
            onChangeText={setFromSearch}
          />
          <FlatList
            data={filteredFrom}
            keyExtractor={item => item.code}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  item.code === fromCurrency && styles.activeUnit,
                ]}
                onPress={() => setFromCurrency(item.code)}>
                <Text
                  style={[
                    styles.unitText,
                    item.code === fromCurrency && styles.activeUnitText,
                  ]}>
                  {getFlagEmoji(item.country)} {item.code} - {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* To */}
        <View style={styles.unitColumn}>
          <Text style={styles.unitLabel}>To</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={toSearch}
            onChangeText={setToSearch}
          />
          <FlatList
            data={filteredTo}
            keyExtractor={item => item.code}
            initialNumToRender={20}
            maxToRenderPerBatch={20}
            windowSize={10}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  item.code === toCurrency && styles.activeUnit,
                ]}
                onPress={() => setToCurrency(item.code)}>
                <Text
                  style={[
                    styles.unitText,
                    item.code === toCurrency && styles.activeUnitText,
                  ]}>
                  {getFlagEmoji(item.country)} {item.code} - {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      {/* Keypad */}
      <View style={styles.keypadContainer}>
        {keypad.map((row, i) => (
          <View key={i} style={styles.keypadRow}>
            {row.map(key => (
              <TouchableOpacity
                key={key}
                style={[styles.key, key === '↔' && styles.swapKey]}
                onPress={() => handleKeyPress(key)}>
                <Text style={[styles.keyText, key === '↔' && styles.swapKeyText]}>
                  {key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Currency;

// Styles (unchanged)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f6f6' },
  displayContainer: { padding: 20, alignItems: 'center' },
  label: { fontSize: 16, color: '#666' },
  inputText: { fontSize: 40, fontWeight: 'bold', marginVertical: 5 },
  resultText: { fontSize: 30, fontWeight: 'bold', color: '#6200ee', marginVertical: 5 },

  unitsContainer: { flexDirection: 'row', justifyContent: 'space-around', flex: 1, paddingHorizontal: 10 },
  unitColumn: { flex: 1, alignItems: 'center', marginHorizontal: 4 },
  unitLabel: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  searchInput: { width: '90%', backgroundColor: '#fff', borderRadius: 8, padding: 6, marginBottom: 6, borderColor: '#ddd', borderWidth: 1 },
  unitButton: { backgroundColor: '#fff', padding: 8, marginVertical: 3, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2, elevation: 2 },
  activeUnit: { backgroundColor: '#6200ee' },
  unitText: { fontSize: 14, color: '#000' },
  activeUnitText: { color: '#fff', fontWeight: 'bold' },

  keypadContainer: { backgroundColor: '#eaeaea', padding: 10, borderTopLeftRadius: 20, borderTopRightRadius: 20 },
  keypadRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  key: { flex: 1, marginHorizontal: 4, backgroundColor: '#fff', borderRadius: 12, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
  swapKey: { backgroundColor: '#6200ee' },
  keyText: { fontSize: 22, fontWeight: 'bold', color: '#6200ee' },
  swapKeyText: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
});