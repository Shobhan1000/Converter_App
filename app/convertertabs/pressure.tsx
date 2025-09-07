import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const pressureUnits = ['Pascals', 'Bars', 'Millibars', 'Atmospheres', 'Torr', 'Inches of Mercury', 'Pounds per Square Inch', 'Pounds per Square Foot', 'Kilopascals', 'Megapascals', 'Inches of Water', 'Millimeters of Mercury'];

const Pressure: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Pascals');
  const [toUnit, setToUnit] = useState('Bars');
  const [result, setResult] = useState('');

    const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) { setResult(''); return; }

    // Convert input to Pascals
    let pascals: number;
    switch (from) {
        case 'Pascals': pascals = val; break;
        case 'Bars': pascals = val * 1e5; break;
        case 'Millibars': pascals = val * 100; break;
        case 'Atmospheres': pascals = val * 101325; break;
        case 'Torr': pascals = val * 133.322368; break;
        case 'Inches of Mercury': pascals = val * 3386.389; break;
        case 'Pounds per Square Inch': pascals = val * 6894.75729; break;
        case 'Pounds per Square Foot': pascals = val * 47.880258; break;
        case 'Kilopascals': pascals = val * 1000; break;
        case 'Megapascals': pascals = val * 1e6; break;
        case 'Inches of Water': pascals = val * 249.08891; break;
        case 'Millimeters of Mercury': pascals = val * 133.322368; break;
        default: pascals = val;
    }

    // Convert Pascals to target unit
    let converted: number;
    switch (to) {
        case 'Pascals': converted = pascals; break;
        case 'Bars': converted = pascals / 1e5; break;
        case 'Millibars': converted = pascals / 100; break;
        case 'Atmospheres': converted = pascals / 101325; break;
        case 'Torr': converted = pascals / 133.322368; break;
        case 'Inches of Mercury': converted = pascals / 3386.389; break;
        case 'Pounds per Square Inch': converted = pascals / 6894.75729; break;
        case 'Pounds per Square Foot': converted = pascals / 47.880258; break;
        case 'Kilopascals': converted = pascals / 1000; break;
        case 'Megapascals': converted = pascals / 1e6; break;
        case 'Inches of Water': converted = pascals / 249.08891; break;
        case 'Millimeters of Mercury': converted = pascals / 133.322368; break;
        default: converted = pascals;
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
            {pressureUnits.map(unit => (
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
            {pressureUnits.map(unit => (
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

export default Pressure;

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