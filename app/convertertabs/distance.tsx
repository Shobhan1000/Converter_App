import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const distanceUnits = ['Meters', 'Kilometers', 'Miles', 'Yards', 'Feet', 'Inches', 'Nautical Miles', 'Light Years', 'Parsecs', 'Centimeters', 'Millimeters', 'Micrometers', 'Nanometers', 'Decimeters', 'Leagues', 'Furlongs', 'Chains', 'Rod', 'Link', 'Astronomical Units'];

const Distance: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('Meters');
  const [toUnit, setToUnit] = useState('Kilometers');
  const [result, setResult] = useState('');

    const convert = (value: string, from: string, to: string) => {
    const val = parseFloat(value);
    if (isNaN(val)) { setResult(''); return; }

    let meters: number;
    switch (from) {
        case 'Meters': meters = val; break;
        case 'Kilometers': meters = val * 1000; break;
        case 'Miles': meters = val * 1609.344; break;
        case 'Yards': meters = val * 0.9144; break;
        case 'Feet': meters = val * 0.3048; break;
        case 'Inches': meters = val * 0.0254; break;
        case 'Nautical Miles': meters = val * 1852; break;
        case 'Light Years': meters = val * 9.4607e15; break;
        case 'Parsecs': meters = val * 3.0857e16; break;
        case 'Centimeters': meters = val * 0.01; break;
        case 'Millimeters': meters = val * 0.001; break;
        case 'Micrometers': meters = val * 1e-6; break;
        case 'Nanometers': meters = val * 1e-9; break;
        case 'Decimeters': meters = val * 0.1; break;
        case 'Leagues': meters = val * 4828.032; break;
        case 'Furlongs': meters = val * 201.168; break;
        case 'Chains': meters = val * 20.1168; break;
        case 'Rod': meters = val * 5.0292; break;
        case 'Link': meters = val * 0.201168; break;
        case 'Astronomical Units': meters = val * 1.495978707e11; break;
        default: meters = val;
    }

    let converted: number;
    switch (to) {
        case 'Meters': converted = meters; break;
        case 'Kilometers': converted = meters / 1000; break;
        case 'Miles': converted = meters / 1609.344; break;
        case 'Yards': converted = meters / 0.9144; break;
        case 'Feet': converted = meters / 0.3048; break;
        case 'Inches': converted = meters / 0.0254; break;
        case 'Nautical Miles': converted = meters / 1852; break;
        case 'Light Years': converted = meters / 9.4607e15; break;
        case 'Parsecs': converted = meters / 3.0857e16; break;
        case 'Centimeters': converted = meters / 0.01; break;
        case 'Millimeters': converted = meters / 0.001; break;
        case 'Micrometers': converted = meters / 1e-6; break;
        case 'Nanometers': converted = meters / 1e-9; break;
        case 'Decimeters': converted = meters / 0.1; break;
        case 'Leagues': converted = meters / 4828.032; break;
        case 'Furlongs': converted = meters / 201.168; break;
        case 'Chains': converted = meters / 20.1168; break;
        case 'Rod': converted = meters / 5.0292; break;
        case 'Link': converted = meters / 0.201168; break;
        case 'Astronomical Units': converted = meters / 1.495978707e11; break;
        default: converted = meters;
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
            {distanceUnits.map(unit => (
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
            {distanceUnits.map(unit => (
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

export default Distance;

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#f6f6f6' },
  displayContainer: { padding:20, alignItems:'center' },
  label: { fontSize:16, color:'#666' },
  inputText: { fontSize:40, fontWeight:'bold', marginVertical:5 },
  resultText: { fontSize:30, fontWeight:'bold', color:'#6200ee', marginVertical:5 },

  unitsContainer: { flexDirection:'row', justifyContent:'space-around', flex:1, paddingHorizontal:10 },
  unitColumn: { flex:1, alignItems:'center' },
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