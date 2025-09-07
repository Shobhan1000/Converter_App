import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const torqueUnits = [
  'Newton-meter',
  'Newton-centimeter',
  'Kilogram-force meter',
  'Kilogram-force centimeter',
  'Pound-foot',
  'Pound-inch',
  'Ounce-inch',
  'Dyne-centimeter',
  'Dyne-meter',
  'Kilonewton-meter',
  'Millinewton-meter',
  'Gram-force meter',
  'Kilopound-foot'
];

const Torque: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Newton-meter');
  const [toUnit, setToUnit] = useState('Kilogram-force meter');
  const [result, setResult] = useState('');

    const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) { setResult(''); return; }

    // Convert input to Newton-meter
    let nm: number;
    switch (from) {
        case 'Newton-meter': nm = val; break;
        case 'Newton-centimeter': nm = val * 0.01; break;
        case 'Kilogram-force meter': nm = val * 9.80665; break;
        case 'Kilogram-force centimeter': nm = val * 0.0980665; break;
        case 'Pound-foot': nm = val * 1.3558179483; break;
        case 'Pound-inch': nm = val * 0.112984829; break;
        case 'Ounce-inch': nm = val * 0.0070615518; break;
        case 'Dyne-centimeter': nm = val * 1e-7; break;
        case 'Dyne-meter': nm = val * 1e-5; break;
        case 'Kilonewton-meter': nm = val * 1000; break;
        case 'Millinewton-meter': nm = val * 0.001; break;
        case 'Gram-force meter': nm = val * 0.00980665; break;
        case 'Kilopound-foot': nm = val * 1355.8179483; break;
        default: nm = val;
    }

    // Convert Newton-meter to target unit
    let converted: number;
    switch (to) {
        case 'Newton-meter': converted = nm; break;
        case 'Newton-centimeter': converted = nm / 0.01; break;
        case 'Kilogram-force meter': converted = nm / 9.80665; break;
        case 'Kilogram-force centimeter': converted = nm / 0.0980665; break;
        case 'Pound-foot': converted = nm / 1.3558179483; break;
        case 'Pound-inch': converted = nm / 0.112984829; break;
        case 'Ounce-inch': converted = nm / 0.0070615518; break;
        case 'Dyne-centimeter': converted = nm / 1e-7; break;
        case 'Dyne-meter': converted = nm / 1e-5; break;
        case 'Kilonewton-meter': converted = nm / 1000; break;
        case 'Millinewton-meter': converted = nm / 0.001; break;
        case 'Gram-force meter': converted = nm / 0.00980665; break;
        case 'Kilopound-foot': converted = nm / 1355.8179483; break;
        default: converted = nm;
    }

    setResult(converted.toFixed(6));
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
      // Prevent multiple dots
      if (key === '.' && inputValue.includes('.')) return;

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
            {torqueUnits.map(unit => (
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
            {torqueUnits.map(unit => (
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

export default Torque;

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f6f6f6' },
  displayContainer: { padding:20, alignItems:'center' },
  label: { fontSize:16, color:'#666' },
  inputText: { fontSize:40, fontWeight:'bold', marginVertical:5 },
  resultText: { fontSize:30, fontWeight:'bold', color:'#6200ee', marginVertical:5 },

  unitsContainer: { flexDirection:'row', justifyContent:'space-around', flex:1, paddingHorizontal:10 },
  unitColumn: { flex:1, alignItems:'center', marginHorizontal: 5 },
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
  unitText: { fontSize:14, color:'#000', textAlign:'center' },
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