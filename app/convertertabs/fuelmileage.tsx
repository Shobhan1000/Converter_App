import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const fuelMileageUnits = ['Miles per US Gallon', 'Miles per UK Gallon', 'Kilometers per Liter', 'Liters per Kilometer', 'Liters per 100 Kilometers', 'US Gallons per 100 Miles', 'UK Gallons per 100 Kilometers', 'MPGe (US)', 'MPGe (UK)', 'Kwh per Mile', 'Kwh per 100 Miles', 'Kwh per 100 Kilometers', 'Miles per Kwh', 'Kilometers per Kwh'];

const FuelMileage: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Miles per US Gallon');
  const [toUnit, setToUnit] = useState('Kilometers per Liter');
  const [result, setResult] = useState('');

    const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) { setResult(''); return; }

    // Convert input to kilometers per liter (km/L)
    let kmPerLiter: number;
    switch (from) {
        case 'Miles per US Gallon': kmPerLiter = val * 0.425144; break;
        case 'Miles per UK Gallon': kmPerLiter = val * 0.354006; break;
        case 'Kilometers per Liter': kmPerLiter = val; break;
        case 'Liters per Kilometer': kmPerLiter = 1 / val; break;
        case 'Liters per 100 Kilometers': kmPerLiter = 100 / val; break;
        case 'US Gallons per 100 Miles': kmPerLiter = 42.5144 / val; break;
        case 'UK Gallons per 100 Kilometers': kmPerLiter = 100 / (val * 4.54609 / 1.609344); break;
        case 'MPGe (US)': kmPerLiter = val * 0.425144; break;
        case 'MPGe (UK)': kmPerLiter = val * 0.354006; break;
        case 'Kwh per Mile': kmPerLiter = 33.705 / (val * 0.621371); break;
        case 'Kwh per 100 Miles': kmPerLiter = 33.705 / ((val / 100) * 0.621371); break;
        case 'Kwh per 100 Kilometers': kmPerLiter = 33.705 / (val / 100); break;
        case 'Miles per Kwh': kmPerLiter = val * 0.621371; break;
        case 'Kilometers per Kwh': kmPerLiter = val; break;
        default: kmPerLiter = val;
    }

    // Convert km/L to target unit
    let converted: number;
    switch (to) {
        case 'Miles per US Gallon': converted = kmPerLiter / 0.425144; break;
        case 'Miles per UK Gallon': converted = kmPerLiter / 0.354006; break;
        case 'Kilometers per Liter': converted = kmPerLiter; break;
        case 'Liters per Kilometer': converted = 1 / kmPerLiter; break;
        case 'Liters per 100 Kilometers': converted = 100 / kmPerLiter; break;
        case 'US Gallons per 100 Miles': converted = 42.5144 / kmPerLiter; break;
        case 'UK Gallons per 100 Kilometers': converted = 100 / (kmPerLiter * 1.609344 / 4.54609); break;
        case 'MPGe (US)': converted = kmPerLiter / 0.425144; break;
        case 'MPGe (UK)': converted = kmPerLiter / 0.354006; break;
        case 'Kwh per Mile': converted = 33.705 / (kmPerLiter * 0.621371); break;
        case 'Kwh per 100 Miles': converted = 33.705 / (kmPerLiter * 0.621371) * 100; break;
        case 'Kwh per 100 Kilometers': converted = 33.705 / kmPerLiter * 100; break;
        case 'Miles per Kwh': converted = kmPerLiter / 0.621371; break;
        case 'Kilometers per Kwh': converted = kmPerLiter; break;
        default: converted = kmPerLiter;
    }

    setResult(isFinite(converted) ? converted.toFixed(6) : '');
    };

  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      const newValue = inputValue.slice(0, -1);
      setInputValue(newValue);
      convert(newValue, fromUnit, toUnit);
    } else if (key === '↔') {
      const temp = fromUnit;
      setFromUnit(toUnit);
      setToUnit(temp);
      convert(inputValue, toUnit, temp);
    } else {
      const newValue = inputValue + key;
      setInputValue(newValue);
      convert(newValue, fromUnit, toUnit);
    }
  };

  const keypad = [
    ['1','2','3'],
    ['4','5','6'],
    ['7','8','9'],
    ['.','0','⌫'],
    ['↔']
  ];

  return (
    <SafeAreaView style={styles.container}>

      {/* Fixed Display */}
      <View style={styles.displayContainer}>
        <Text style={styles.label}>You are converting:</Text>
        <Text style={styles.inputText}>{inputValue || '0'} {fromUnit}</Text>
        <Text style={styles.label}>Result:</Text>
        <Text style={styles.resultText}>{result ? `${result} ${toUnit}` : '--'}</Text>
      </View>

      {/* Units selection */}
      <View style={styles.unitsContainer}>
        {/* From Units */}
        <View style={styles.unitColumn}>
          <Text style={styles.unitLabel}>From</Text>
          <ScrollView style={styles.unitScroll} showsVerticalScrollIndicator={false}>
            {fuelMileageUnits.map(unit => (
              <TouchableOpacity
                key={unit}
                style={[styles.unitButton, unit === fromUnit && styles.activeUnit]}
                onPress={() => { setFromUnit(unit); convert(inputValue, unit, toUnit); }}
              >
                <Text style={[styles.unitText, unit === fromUnit && styles.activeUnitText]}>{unit}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* To Units */}
        <View style={styles.unitColumn}>
          <Text style={styles.unitLabel}>To</Text>
          <ScrollView style={styles.unitScroll} showsVerticalScrollIndicator={false}>
            {fuelMileageUnits.map(unit => (
              <TouchableOpacity
                key={unit}
                style={[styles.unitButton, unit === toUnit && styles.activeUnit]}
                onPress={() => { setToUnit(unit); convert(inputValue, fromUnit, unit); }}
              >
                <Text style={[styles.unitText, unit === toUnit && styles.activeUnitText]}>{unit}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>

      {/* Space */}
      <View style={{height:10}} />

      {/* Keypad */}
      <View style={styles.keypadContainer}>
        {keypad.map((row, i) => (
          <View key={i} style={styles.keypadRow}>
            {row.map(key => (
              <TouchableOpacity
                key={key}
                style={[styles.key, key === '↔' && styles.swapKey]}
                onPress={() => handleKeyPress(key)}
              >
                <Text style={[styles.keyText, key === '↔' && styles.swapKeyText]}>{key}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

    </SafeAreaView>
  );
};

export default FuelMileage;

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f6f6f6' },
  displayContainer: { padding:20, alignItems:'center' },
  label: { fontSize:16, color:'#666' },
  inputText: { fontSize:40, fontWeight:'bold', marginVertical:5 },
  resultText: { fontSize:30, fontWeight:'bold', color:'#6200ee', marginVertical:5 },

  unitsContainer: { flexDirection:'row', justifyContent:'space-around', flex:1, paddingHorizontal:10 },
  unitColumn: { 
    flex: 1, 
    alignItems: 'center',
    marginHorizontal: 5,
  },
  unitLabel: { fontSize:16, fontWeight:'bold', marginBottom:5 },
  unitScroll: { maxHeight:200 }, // each scrolls independently
  unitButton: {
    backgroundColor:'#fff',
    paddingVertical:8,
    paddingHorizontal:12,
    marginVertical:4,
    borderRadius:10,
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{ width:0, height:1 },
    shadowOpacity:0.1,
    shadowRadius:2,
    elevation:2,
  },
  activeUnit: { backgroundColor:'#6200ee' },
  unitText: { fontSize:14, color:'#000' },
  activeUnitText: { color:'#fff', fontWeight:'bold' },

  keypadContainer: { backgroundColor:'#eaeaea', padding:10, borderTopLeftRadius:20, borderTopRightRadius:20 },
  keypadRow: { flexDirection:'row', justifyContent:'space-between', marginVertical:4 },
  key: {
    flex:1,
    marginHorizontal:4,
    backgroundColor:'#fff',
    borderRadius:12,
    justifyContent:'center',
    alignItems:'center',
    paddingVertical:12,
    shadowColor:'#000',
    shadowOffset:{ width:0, height:2 },
    shadowOpacity:0.1,
    shadowRadius:4,
    elevation:2,
  },
  swapKey: { backgroundColor:'#6200ee' },
  keyText: { fontSize:22, fontWeight:'bold', color:'#6200ee' },
  swapKeyText: { fontSize:22, fontWeight:'bold', color:'#fff' },
});